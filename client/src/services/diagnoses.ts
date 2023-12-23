import axios from "axios";
import { apiBaseUrl } from "../constants";
import { DiagnosesEntry } from "../types";

export const getAll = async (): Promise<DiagnosesEntry[]> => {
  const response = await axios.get<DiagnosesEntry[]>(`${apiBaseUrl}/diagnoses`);
  return response.data;
};

export default {
  getAll,
};
