// for request proofing send requests

import { Gender, NewPatientEntry } from "../types/types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  // guard: type narrowing for object
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "gender" in object &&
    "occupation" in object &&
    "dateOfBirth" in object &&
    "ssn" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
    };

    return newEntry;
  }
  throw new Error("Incorrect Data: some fields are missing");
};

// type guards
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

// const isDate = (date: unknown): date is string => {
//   return typeof date === "string" && Boolean(Date.parse(date));
// };

// object parsers
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn.");
  }
  return ssn;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing ssn.");
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing ssn.");
  }
  return occupation;
};

export default toNewPatientEntry;
