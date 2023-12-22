export enum Gender {Male = 'Male', Female = 'Female', Other = 'Other'}
export type SpecificEntry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>; //type alias for omit utility type (censoring 'ssn')
export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface Entry {
  id: string;
  date: string;
  specialist: string;
}

export interface HospitalEntry extends Entry {
  type: 'Hospital';
  diagnosisCodes: string[];
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends Entry {
  type: 'OccupationalHealthcare';
  employerName: string;
  diagnosisCodes: string[];
  description: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry extends Entry {
  type: 'HealthCheck';
  description: string;
  healthCheckRating: number;
}

export interface PatientEntry {
  id: string;
  name: string;
  gender: Gender;
  occupation: string;
  dateOfBirth: string;
  ssn: string;
  comment?: string;
  entries: SpecificEntry[]
}

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

