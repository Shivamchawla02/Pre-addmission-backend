import express from 'express';
import { submitForm, getPreAdmissions, getPreAdmissionById } from '../controllers/preAdmissionController.js';

const router = express.Router();

router.post('/submit-form', submitForm);
router.get('/preadmissions', getPreAdmissions);
router.get('/preadmissions/:id', getPreAdmissionById);

export default router;
