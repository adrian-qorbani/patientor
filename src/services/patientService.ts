import { v4 as uuidv4 } from "uuid";
// import patientsData from "../../data/patients_entries";

import { PatientModel } from "../models/patient";

import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
  SpecificEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating
} from "../types/types";

// const entires: PatientEntry[] = patientsData;

const getPatientsEntry = async (): Promise<PatientEntry[]> => {
  try {
    const patientEntries = await PatientModel.find();
    return patientEntries;
  } catch (error) {
    throw new Error('Error retrieving patient entries from the database');
  }
};

const getNonSensitiveEntries = async (): Promise<NonSensitivePatientEntry[]> => {
  try {
    const entries = await PatientModel.find({}, '-ssn');
    console.log(entries)
    return entries.map(({ id, name, gender, occupation, dateOfBirth, entries }) => ({
      id,
      name,
      gender,
      occupation,
      dateOfBirth,
      entries,
    }));
  } catch (error) {
    throw new Error('Error retrieving non-sensitive patient entries from the database');
  }
};

const findById = async (id: string): Promise<PatientEntry | undefined> => {
  try {
    const entry = await PatientModel.findById(id);
    return entry?.toJSON();
  } catch (error) {
    throw new Error('Error retrieving patient entry by ID from the database.');
  }
};

const addPatientEntry = async (entry: NewPatientEntry): Promise<PatientEntry> => {
  try {
    const newPatientEntry = new PatientModel({
      id: uuidv4(),
      ...entry,
    });

    const savedEntry = await newPatientEntry.save();
    return savedEntry.toJSON();
  } catch (error) {
    throw new Error(`Error adding patient entry to the database: ${error}`);
  }
};


const addEntriesEntry = (
  patient: PatientEntry,
  entryData: Omit<SpecificEntry, 'id'>
): SpecificEntry => {

  console.log(patient.comment)

  const newEntry = {
    id: uuidv4(),
    ...entryData,
  };

  if ('type' in entryData) {
    switch (entryData.type) {
      case 'Hospital':
        return {
          ...newEntry,
          type: 'Hospital',
          diagnosisCodes: (entryData as HospitalEntry).diagnosisCodes || [],
          description: (entryData as HospitalEntry).description || '',
          discharge: (entryData as HospitalEntry).discharge || { date: '', criteria: '' },
        };

      case 'OccupationalHealthcare':
        return {
          ...newEntry,
          type: 'OccupationalHealthcare',
          employerName: (entryData as OccupationalHealthcareEntry).employerName || '',
          diagnosisCodes: (entryData as OccupationalHealthcareEntry).diagnosisCodes || [],
          description: (entryData as OccupationalHealthcareEntry).description || '',
          sickLeave: (entryData as OccupationalHealthcareEntry).sickLeave || { startDate: '', endDate: '' },
        };

      case 'HealthCheck':
        return {
          ...newEntry,
          type: 'HealthCheck',
          description: (entryData as HealthCheckEntry).description || '',
          healthCheckRating: (entryData as HealthCheckEntry).healthCheckRating || HealthCheckRating.Healthy,
        };

      default:
        throw new Error('Invalid entry type');
    }
  } else {
    throw new Error('Entry type is missing');
  }
};

export default {
  getPatientsEntry,
  addPatientEntry,
  getNonSensitiveEntries,
  findById,
  addEntriesEntry
};
