import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/proxy-preadmissions', async (req, res) => {
  try {
    // Forward the Authorization header if present
    const response = await axios.get(
      'https://servocci-preadmission.onrender.com/api/preadmissions',
      { headers: { Authorization: req.headers['authorization'] } }
    );

    // Relay the exact status and data
    return res.status(response.status).json(response.data);

  } catch (error) {
    console.error('❌ Proxy Error Details:');
    if (error.response) {
      // External API replied with an error status
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    } else {
      // Network or other Axios errors
      console.error(error.message);
      return res.status(502).json({ error: error.message });
    }
  }
});

export default router;
