import patientsData from "../../data/patients_entries";
import { NonSensitivePatientEntry ,PatientEntry } from "../types/types";

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

const addPatientEntry = () => {
  return null;
};

export default {
  getPatientsEntry,
  addPatientEntry,
  getNonSensitiveEntries
};
