import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/routersUtility";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const requestedEntry = patientService.findById(req.params.id);
  if (requestedEntry) {
    res.send(requestedEntry);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
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

export default router;
