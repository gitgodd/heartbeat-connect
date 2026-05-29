import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

// 提供静态文件 - 前端应用
let staticPath = join(__dirname, '../../app');
if (!existsSync(staticPath)) {
  staticPath = join(__dirname, '../app');
}
console.log(`📂 静态文件路径: ${staticPath}`);
app.use(express.static(staticPath));

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users = new Map();
const pairCodes = new Map();
const lightningStats = new Map();

function generatePairCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function getUserStats(userId) {
  const stats = lightningStats.get(userId) || { sent: 0, received: 0 };
  return stats;
}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('register', (data) => {
    const { name, avatar } = data;
    const user = {
      id: socket.id,
      name: name || 'Anonymous',
      avatar: avatar || '❤️',
      pairCode: null,
      partnerId: null
    };
    users.set(socket.id, user);
    console.log(`User registered: ${user.name}`);
    socket.emit('registered', { id: socket.id, ...user });
  });

  socket.on('generate_code', () => {
    const user = users.get(socket.id);
    if (!user) {
      socket.emit('error', { message: 'User not registered' });
      return;
    }

    const code = generatePairCode();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    
    pairCodes.set(code, {
      userId: socket.id,
      expiresAt
    });
    
    user.pairCode = code;
    console.log(`Generated pair code for ${user.name}: ${code}`);
    socket.emit('code_generated', { code, expiresAt });
  });

  socket.on('join_code', (data) => {
    const { code } = data;
    const user = users.get(socket.id);
    
    if (!user) {
      socket.emit('error', { message: 'User not registered' });
      return;
    }

    const pairData = pairCodes.get(code);
    
    if (!pairData) {
      socket.emit('error', { message: 'Invalid or expired code' });
      return;
    }

    if (pairData.expiresAt < Date.now()) {
      pairCodes.delete(code);
      socket.emit('error', { message: 'Code expired' });
      return;
    }

    if (pairData.userId === socket.id) {
      socket.emit('error', { message: 'Cannot pair with yourself' });
      return;
    }

    const partner = users.get(pairData.userId);
    
    if (!partner) {
      socket.emit('error', { message: 'Partner not found' });
      return;
    }

    if (partner.partnerId) {
      socket.emit('error', { message: 'Partner already paired' });
      return;
    }

    user.partnerId = pairData.userId;
    partner.partnerId = socket.id;

    pairCodes.delete(code);
    lightningStats.set(socket.id, { sent: 0, received: 0 });
    lightningStats.set(pairData.userId, { sent: 0, received: 0 });

    socket.emit('paired', { 
      partner: { id: partner.id, name: partner.name, avatar: partner.avatar },
      stats: getUserStats(socket.id)
    });
    
    io.to(pairData.userId).emit('paired', { 
      partner: { id: user.id, name: user.name, avatar: user.avatar },
      stats: getUserStats(pairData.userId)
    });

    console.log(`Users paired: ${user.name} <-> ${partner.name}`);
  });

  socket.on('heartbeat', (data) => {
    const user = users.get(socket.id);
    if (!user || !user.partnerId) return;

    io.to(user.partnerId).emit('partner_heartbeat', {
      bpm: data.bpm,
      timestamp: data.timestamp || Date.now()
    });
  });

  socket.on('touch', () => {
    const user = users.get(socket.id);
    if (!user || !user.partnerId) {
      socket.emit('error', { message: 'Not paired' });
      return;
    }

    const stats = lightningStats.get(socket.id) || { sent: 0, received: 0 };
    stats.sent += 1;
    lightningStats.set(socket.id, stats);

    const partnerStats = lightningStats.get(user.partnerId) || { sent: 0, received: 0 };
    partnerStats.received += 1;
    lightningStats.set(user.partnerId, partnerStats);

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

  socket.on('chat', (data) => {
    const user = users.get(socket.id);
    if (!user || !user.partnerId) {
      socket.emit('error', { message: 'Not paired' });
      return;
    }

    io.to(user.partnerId).emit('chat_received', {
      from: user.id,
      fromName: user.name,
      message: data.message,
      timestamp: Date.now()
    });

    console.log(`Chat from ${user.name}: ${data.message}`);
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user && user.partnerId) {
      io.to(user.partnerId).emit('partner_disconnected', {
        name: user.name
      });
    }
    users.delete(socket.id);
    lightningStats.delete(socket.id);
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

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Heartbeat Connect Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready`);
  console.log(`🌐 局域网访问地址:`);
  console.log(`   http://192.168.134.126:${PORT}`);
  console.log(`💡 确保手机和电脑在同一WiFi！`);
});
