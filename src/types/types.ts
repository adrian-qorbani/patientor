export type Gender = "Male" | "Female" | "Other";

export interface PatientEntry {
  id: string;
  name: string;
  gender: Gender;
  occupation: string;
  // healthRating: number;
  dateOfBirth: string;
  ssn: string;
  comment?: string;
}

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}
