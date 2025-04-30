import express from 'express';
import { submitForm, getPreAdmissions } from '../controllers/preAdmissionController.js';

const router = express.Router();

router.post('/submit-form', submitForm);
router.get('/preadmissions', getPreAdmissions);

export default router;
