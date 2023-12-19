import diagnosesData from "../../data/diagnoses_data";
import { DiagnosesEntry } from "../types/types";

const data: DiagnosesEntry[] = diagnosesData;

const getDiagnosesData = (): DiagnosesEntry[] => {
  return data;
};

// const addPatientEntry = () => {
//   return null;
// };

// export default {
//   getDiagnosesData,
//   addPatientEntry,
// };

export default getDiagnosesData
