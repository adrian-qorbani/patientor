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

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">; //type alias for omit utility type (censoring 'ssn')
export type NewPatientEntry = Omit<PatientEntry, "id">;

export interface Entry {
  id: string;
  date: string;
  specialist: string;
  type: string;
}

export interface HospitalEntry extends Entry {
  type: "Hospital";
  diagnosisCodes?: Array<DiagnosesEntry["code"]>;
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends Entry {
  type: "OccupationalHealthcare";
  employerName: string;
  diagnosisCodes?: Array<DiagnosesEntry["code"]>;
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
