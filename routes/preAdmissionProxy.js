import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/proxy-preadmissions', async (req, res) => {
  try {
    const response = await axios.get('https://servocci-preadmission.onrender.com/api/preadmissions', {
      headers: {
        Authorization: req.headers['authorization'], // Forward auth header if needed
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from external preadmission API' });
  }
});

export default router;
