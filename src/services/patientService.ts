import patientsData from "../../data/patients_entries";
import { PatientEntry } from "../types/types";

const entires: PatientEntry[] = patientsData;

const getPatientsEntry = (): PatientEntry[] => {
  return entires;

};

// const addPatientEntry = () => {
//   return null;
// };

// export default {
//   getPatientsEntry,
//   addPatientEntry,
// };

export default getPatientsEntry
