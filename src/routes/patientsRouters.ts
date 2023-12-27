// import express from "express";
import { Request, Response, Router } from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/routersUtility";
import { User } from "../models/user";
// const router = express.Router();
// import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { authenticateToken } from "../utils/middleware";

const router = Router();
router.use(authenticateToken);

router.get("/", async (_req: Request, res: Response) => {
  try {
    // Now you can directly access the authenticated user from res.locals.user
    const user = res.locals.user as typeof User | undefined;
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const entries = await patientService.getNonSensitiveEntries();
    console.log(entries);
    return res.json(entries);
  } catch (error) {
    console.error("Error in route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const requestedPatient = await patientService.findById(req.params.id);
    if (requestedPatient) {
      res.json(requestedPatient);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findById(body.userId);
    console.log("USER IS: ", user);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    const NewPatientEntry = {
      ...toNewPatientEntry(body),
      user: body.userId, // Add the user's ID to the new patient entry
    };
    const addedEntry = await patientService.addPatientEntry(NewPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "An Error occurred.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// ALERT: POST is broken and needs repair

// router.post('/:id/entries', (req, res) => {
//   const requestedPatient = patientService.findById(req.params.id);

//   if (!requestedPatient) {
//     return res.status(404).json({ error: 'Patient not found' });
//   }

//   const { date, specialist, type, ...entryData } = req.body;

//   // Used addEntriesEntry for existing patient
//   const newEntry = patientService.addEntriesEntry(requestedPatient, {
//     date,
//     specialist,
//     type,
//     ...entryData,
//   });

//   requestedPatient.entries.push(newEntry)
//   res.status(201).json(newEntry);
//   return
// });

router.post("/:id/entries", async (req, res) => {
  try {
    const requestedPatient = await patientService.findById(req.params.id);

    if (!requestedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const { date, specialist, type, ...entryData } = req.body;

    // Used addEntriesEntry for existing patient
    const newEntry = await patientService.addEntriesEntry(requestedPatient, {
      date,
      specialist,
      type,
      ...entryData,
    });
    if (!newEntry) {
      return res
        .status(500)
        .json({ error: "Error adding entry for the patient." });
    }

    requestedPatient.entries.push(newEntry);
    res.status(201).json(newEntry);
    return;
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

export default router;
