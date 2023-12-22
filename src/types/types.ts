// export type Gender = "Male" | "Female" | "Other";
export enum Gender {Male = 'Male', Female = 'Female', Other = 'Other'}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>; //type alias for omit utility type (censoring 'ssn')
export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface Entry {

}

export interface PatientEntry {
  id: string;
  name: string;
  gender: Gender;
  occupation: string;
  dateOfBirth: string;
  ssn: string;
  comment?: string;
  entries: Entry[]
}

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

