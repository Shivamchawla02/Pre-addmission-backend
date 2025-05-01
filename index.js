import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import preAdmissionRoutes from './routes/preAdmissionRoutes.js';

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: 'https://servocci.in',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Mount internal API routes
app.use('/api', preAdmissionRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🎓 Pre-Admission API is running');
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('📦 Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
