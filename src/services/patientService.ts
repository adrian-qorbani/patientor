import { v4 as uuidv4 } from "uuid";
import patientsData from "../../data/patients_entries";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types/types";

const entires: PatientEntry[] = patientsData;

// All entries
const getPatientsEntry = (): PatientEntry[] => {
  return entires;
};

// All entries (-ssn)
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return entires.map(({ id, name, gender, occupation, dateOfBirth }) => ({
    id,
    name,
    gender,
    occupation,
    dateOfBirth,
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = entires.find((d) => d.id === id);
  return entry;
};

// const addPatientEntry = () => {
//   return null;
// };
const addPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEnry = {
    id: uuidv4(),
    ...entry,
  };

  entires.push(newPatientEnry);
  return newPatientEnry;
};

export default {
  getPatientsEntry,
  addPatientEntry,
  getNonSensitiveEntries,
  findById,
};
