import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/routersUtility";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const requestedPatient = patientService.findById(req.params.id);
  if (requestedPatient) {
    res.send(requestedPatient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    console.log(req.body)
    const NewPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatientEntry(NewPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "An Error occurred.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const requestedPatient = patientService.findById(req.params.id);
  
  if (!requestedPatient) {
    return res.status(404).json({ error: 'Patient not found' });
  }

  const { date, specialist, type, ...entryData } = req.body;

  // Used addEntriesEntry for existing patient
  const newEntry = patientService.addEntriesEntry(requestedPatient, {
    date,
    specialist,
    type,
    ...entryData,
  });

  requestedPatient.entries.push(newEntry)
  res.status(201).json(newEntry);
  return
});

export default router;
