export type Gender = "Male" | "Female" | "Other";

export interface PatientEntry {
  id: number;
  name: string;
  gender: Gender;
  occupation: string;
  healthRating: number;
  comment?: string
}
