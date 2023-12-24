import { v4 as uuidv4 } from "uuid";
import patientsData from "../../data/patients_entries";
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

const entires: PatientEntry[] = patientsData;
// const patientsEntires = patientsData.entries;


// All entries
const getPatientsEntry = (): PatientEntry[] => {
  return entires;
};

// All entries (-ssn)
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return entires.map(({ id, name, gender, occupation, dateOfBirth, entries }) => ({
    id,
    name,
    gender,
    occupation,
    dateOfBirth,
    entries
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

const addEntriesEntry = (
  patient: PatientEntry,
  entryData: Omit<SpecificEntry, 'id'>
): SpecificEntry => {

  console.log(patient);

  const newEntry = {
    id: uuidv4(),
    ...entryData,
  };

  console.log("new entry is:", newEntry)

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
