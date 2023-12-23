import axios from "axios";
import { PatientEntry, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<PatientEntry[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatientById = async (id: string): Promise<PatientEntry | null> => {
  try {
    const response = await axios.get<PatientEntry>(
      `${apiBaseUrl}/patients/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching patient information:", error);
    return null;
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<PatientEntry>(`${apiBaseUrl}/patients`, object);

  return data;
};

export default {
  getAll,
  create,
  getPatientById
};
