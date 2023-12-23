import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  try {
    const response = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching patient information:", error);
    return null;
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

export default {
  getAll,
  create,
};
