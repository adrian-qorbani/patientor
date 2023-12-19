import express from 'express';
// import getPatientsEntry from "../services/patientService"
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  // const patientsEntry = patientService.getPatientsEntry();
  res.json(patientService.getPatientsEntry()); 
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;