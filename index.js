import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import preAdmissionRoutes from './routes/preAdmissionRoutes.js';
import PreAdmission from './models/PreAdmission.js';
import proxyPreadmissionRoute from './routes/preAdmissionProxy.js';

const app = express();

// ✅ Fix CORS to allow only your frontend
app.use(cors({
  origin: 'https://servocci.in',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

app.use('/api', proxyPreadmissionRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('📦 Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Use routes
app.use('/api', preAdmissionRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🎓 Pre-Admission API is running');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
