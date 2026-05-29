const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const staticPath = path.join(__dirname, '../app');
app.use(express.static(staticPath));

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const users = new Map();
const pairCodes = new Map();
const touchStats = new Map();

function generatePairCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function getUserStats(userId) {
  const stats = touchStats.get(userId) || { sent: 0, received: 0 };
  return stats;
}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('register', (data) => {
    const { name, deviceType } = data;
    const user = {
      id: socket.id,
      name: name || 'Anonymous',
      deviceType: deviceType || 'unknown',
      partnerId: null,
      partnerName: null,
      heartRate: Math.floor(Math.random() * 20) + 65,
      location: null,
      lastHeartbeat: Date.now()
    };
    users.set(socket.id, user);
    touchStats.set(socket.id, { sent: 0, received: 0 });

    socket.emit('registered', {
      userId: socket.id,
      users: users.size
    });

    io.emit('user_count', users.size);
    console.log(`User registered: ${name} (${socket.id})`);
  });

  socket.on('generate_pair_code', () => {
    const user = users.get(socket.id);
    if (!user) {
      socket.emit('error', { message: 'Please register first' });
      return;
    }

    const pairCode = generatePairCode();
    pairCodes.set(pairCode, socket.id);

    setTimeout(() => {
      if (pairCodes.get(pairCode) === socket.id) {
        pairCodes.delete(pairCode);
      }
    }, 300000);

    socket.emit('pair_code_generated', { pairCode });
    console.log(`Pair code generated: ${pairCode} for ${user.name}`);
  });

  socket.on('join_with_code', (data) => {
    const { pairCode } = data;
    const pairSocketId = pairCodes.get(pairCode);

    if (!pairSocketId) {
      socket.emit('error', { message: 'Invalid or expired pair code' });
      return;
    }

    if (pairSocketId === socket.id) {
      socket.emit('error', { message: 'Cannot pair with yourself' });
      return;
    }

    const user1 = users.get(pairSocketId);
    const user2 = users.get(socket.id);

    if (!user1 || !user2) {
      socket.emit('error', { message: 'User not found' });
      return;
    }

    user1.partnerId = socket.id;
    user1.partnerName = user2.name;
    user2.partnerId = pairSocketId;
    user2.partnerName = user1.name;

    pairCodes.delete(pairCode);

    io.to(pairSocketId).emit('paired', {
      partnerId: socket.id,
      partnerName: user2.name,
      partnerHeartRate: user2.heartRate,
      stats: getUserStats(socket.id)
    });

    socket.emit('paired', {
      partnerId: pairSocketId,
      partnerName: user1.name,
      partnerHeartRate: user1.heartRate,
      stats: getUserStats(pairSocketId)
    });

    console.log(`Users paired: ${user1.name} <3 ${user2.name}`);
  });

  socket.on('heartbeat_update', (data) => {
    const user = users.get(socket.id);
    if (user) {
      user.heartRate = data.heartRate || user.heartRate;
      user.lastHeartbeat = Date.now();

      if (user.partnerId) {
        io.to(user.partnerId).emit('partner_heartbeat', {
          heartRate: user.heartRate,
          timestamp: user.lastHeartbeat
        });
      }
    }
  });

  socket.on('location_update', (data) => {
    const user = users.get(socket.id);
    if (user) {
      user.location = data;
      user.lastHeartbeat = Date.now();

      if (user.partnerId) {
        io.to(user.partnerId).emit('partner_location', {
          latitude: data.latitude,
          longitude: data.longitude,
          distance: data.distance,
          timestamp: Date.now()
        });
      }
    }
  });

  socket.on('touch', () => {
    const user = users.get(socket.id);
    if (!user || !user.partnerId) {
      socket.emit('error', { message: 'Not paired' });
      return;
    }

    const stats = touchStats.get(socket.id) || { sent: 0, received: 0 };
    stats.sent += 1;
    touchStats.set(socket.id, stats);

    const partnerStats = touchStats.get(user.partnerId) || { sent: 0, received: 0 };
    partnerStats.received += 1;
    touchStats.set(user.partnerId, partnerStats);

    io.to(user.partnerId).emit('touch_received', {
      from: user.id,
      fromName: user.name,
      timestamp: Date.now(),
      feedback: 'vibration'
    });

    socket.emit('stats_update', getUserStats(socket.id));
    io.to(user.partnerId).emit('stats_update', getUserStats(user.partnerId));

    console.log(`Touch sent from ${user.name} to partner`);
  });

  socket.on('chat_message', (data) => {
    const user = users.get(socket.id);
    if (!user || !user.partnerId) {
      socket.emit('error', { message: 'Not paired' });
      return;
    }

    io.to(user.partnerId).emit('chat_message', {
      from: user.id,
      fromName: user.name,
      message: data.message,
      timestamp: Date.now()
    });

    socket.emit('message_sent', { success: true });
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user && user.partnerId) {
      io.to(user.partnerId).emit('partner_disconnected', {
        name: user.name
      });
    }
    users.delete(socket.id);
    touchStats.delete(socket.id);
    console.log(`User disconnected: ${socket?.id}`);
  });
});

app.get('/', (req, res) => {
  res.json({
    status: 'running',
    users: users.size,
    message: 'Heartbeat Connect Server is running'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: Date.now() });
});

const PORT = process.env.PORT || 9000;
const SCF_CONTEXT = process.env.SCF_CONTEXT;

function startServer() {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Heartbeat Connect Server running on port ${PORT}`);
    console.log(`📡 WebSocket server ready`);
  });
}

if (SCF_CONTEXT) {
  console.log('📦 Running in SCF environment');
  startServer();
} else {
  startServer();
}

exports.main_handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'running',
      users: users.size,
      message: 'Heartbeat Connect Server is running'
    })
  };
};
