import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries()); 
});

router.get('/:id', (req, res) => {
  const requestedEntry = patientService.findById(req.params.id);
  if (requestedEntry) {
    res.send(requestedEntry);
  } else {
    res.sendStatus(404);
  }
});

// router.post('/', (_req, res) => {
//   res.send('Saving a patient!');
// });

router.post('/', (req, res) => {
  const { name, gender, occupation, dateOfBirth, ssn } = req.body;
  const addedEntry = patientService.addPatientEntry({
    name,
    gender,
    occupation,
    dateOfBirth,
    ssn
  });
  res.json(addedEntry);
});

export default router;