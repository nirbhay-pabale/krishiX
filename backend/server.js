/* ============================================================
   KrishiX Backend – server.js (Express & Socket.io Entry Point)
   Labour Profiles • Bookings • Fines • Auth • Payments • AI • GPS
   ============================================================ */

const express  = require('express');
const http     = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors     = require('cors');
const dotenv   = require('dotenv');

dotenv.config();

const app    = express();
const server = http.createServer(app);

/* ── Socket.io Setup for Real-time GPS Tracker ─────────── */
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`📡 [Socket.io] Client connected: ${socket.id}`);

  // Broadcast GPS location updates (e.g. from tractor driver app)
  socket.on('update-location', (data) => {
    socket.broadcast.emit('location-updated', data);
  });

  socket.on('disconnect', () => {
    console.log(`📡 [Socket.io] Client disconnected: ${socket.id}`);
  });
});

/* ── Middleware ─────────────────────────────────────────── */
app.use(cors({
  origin: ['http://localhost:8085', 'http://127.0.0.1:5500', 'http://localhost:5500', '*'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

/* ── Routes ─────────────────────────────────────────────── */
app.use('/api/workers',   require('./routes/workers'));
app.use('/api/bookings',  require('./routes/bookings'));
app.use('/api/fines',     require('./routes/fines'));
app.use('/api/machinery', require('./routes/machinery'));
app.use('/api/reviews',   require('./routes/reviews'));
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/payments',  require('./routes/payments'));
app.use('/api/ai',        require('./routes/aiDoctor'));
app.use('/api/upload',    require('./routes/uploads'));

/* ── Health Check ───────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'KrishiX Backend',
    version: '2.0.0',
    socketsActive: io.engine.clientsCount,
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

/* ── Root ───────────────────────────────────────────────── */
app.get('/', (req, res) => {
  res.json({
    message: '🌾 KrishiX API – Kopargaon Labour & Farm Services',
    version: '2.0.0',
    endpoints: {
      auth:      'POST /api/auth/send-otp, POST /api/auth/verify-otp',
      workers:   'GET/POST /api/workers',
      bookings:  'GET/POST /api/bookings',
      fines:     'GET/POST /api/fines',
      machinery: 'GET      /api/machinery',
      reviews:   'POST     /api/reviews/:workerId',
      payments:  'POST     /api/payments/create-order, POST /api/payments/verify',
      aiDoctor:  'POST     /api/ai/diagnose-crop',
      upload:    'POST     /api/upload',
      health:    'GET      /api/health'
    }
  });
});

/* ── 404 & Error Handlers ───────────────────────────────── */
app.use((req, res) => res.status(404).json({ error: 'Route not found', path: req.path }));
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

/* ── Start Server ───────────────────────────────────────── */
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI || MONGO_URI.includes('<username>')) {
  console.log('\n⚠️  MongoDB URI not configured yet.');
  console.log('📋 Running in DEMO / SANDBOX mode with WebSockets active...\n');

  server.listen(PORT, () => {
    console.log(`✅ KrishiX Backend running at http://localhost:${PORT}`);
    console.log(`📡 Socket.io WebSockets active at ws://localhost:${PORT}`);
  });
} else {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB Atlas Connected!');
      server.listen(PORT, () => {
        console.log(`🚀 KrishiX Backend running at http://localhost:${PORT}`);
        console.log(`📡 Socket.io WebSockets active at ws://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.error('❌ MongoDB connection failed:', err.message);
      process.exit(1);
    });
}
