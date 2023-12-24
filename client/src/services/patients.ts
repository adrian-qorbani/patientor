import axios from "axios";
import { PatientEntry, PatientFormValues, SpecificEntry } from "../types";

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

const addEntryToPatient = async (
  patientId: string,
  newEntry: object
): Promise<Response> => {
  try {
    const response = await fetch(`${apiBaseUrl}/patients/${patientId}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    if (!response.ok) {
      throw new Error('Failed to add entry to patient.');
    }

    return response;
  } catch (error) {
    console.error('Error adding entry to patient:', error);
    throw error;
  }
};

export default {
  getAll,
  create,
  getPatientById,
  addEntryToPatient
};
