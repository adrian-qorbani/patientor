import diagnosesData from "../../data/diagnoses_data";
import { DiagnosesEntry } from "../types/types";

const data: DiagnosesEntry[] = diagnosesData;

const getDiagnosesData = (): DiagnosesEntry[] => {
  return data;
};

const addDiagnosesData = () => {
  return null;
};

export default {
  getDiagnosesData,
  addDiagnosesData,
};
