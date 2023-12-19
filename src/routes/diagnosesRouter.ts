import express from 'express';
import getDiagnosesData from "../services/diagnosesService"

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnosesData = getDiagnosesData();
  res.json(diagnosesData); 
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;