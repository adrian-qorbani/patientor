import express from 'express';
import getPatientsEntry from "../services/patientService"

const router = express.Router();

router.get('/', (_req, res) => {
  const patientsEntry = getPatientsEntry();
  res.json(patientsEntry); 
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;