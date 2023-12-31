export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
export type SpecificEntry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">; 
export type NewPatientEntry = Omit<PatientEntry, "id">;

export interface Entry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosesEntry["code"]>;
}

export interface HospitalEntry extends Entry {
  type: "Hospital";
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends Entry {
  type: "OccupationalHealthcare";
  employerName: string;
  description: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry extends Entry {
  type: "HealthCheck";
  description: string;
  healthCheckRating: HealthCheckRating;
}

export interface PatientEntry {
  id: string;
  name: string;
  gender: Gender;
  occupation: string;
  dateOfBirth: string;
  ssn: string;
  comment?: string;
  entries: SpecificEntry[];
}

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientFormValues {
  // 
}

export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  name: string;
  token: string
}
