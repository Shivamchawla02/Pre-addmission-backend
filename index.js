import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import preAdmissionRoutes from './routes/preAdmissionRoutes.js';
import proxyPreadmissionRoute from './routes/preAdmissionProxy.js';

const app = express();

// ✅ CORS: allow only your frontend and handle preflight requests
app.use(cors({
  origin: 'https://servocci.in',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Body parser for JSON
app.use(bodyParser.json());

// Mount proxy route before other API routes
app.use('/api', proxyPreadmissionRoute);

// Mount internal pre-admission API routes
app.use('/api', preAdmissionRoutes);

// Root health-check endpoint
app.get('/', (req, res) => {
  res.send('🎓 Pre-Admission API is running');
});

// Connect to MongoDB
ingoreDeprecation: true,
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('📦 Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
