// for request proofing send requests

import { Gender, NewPatientEntry, SpecificEntry } from "../types/types";

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
    "ssn" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      entries: parseEntries(object.entries),
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

const isSpecificEntryArray = (entries: unknown): entries is SpecificEntry[] => {
  if (!Array.isArray(entries)) return false;

  for (const entry of entries) {
    if (!isSpecificEntry(entry)) {
      return false;
    }
  }
  return true;
};

const isSpecificEntry = (entry: unknown): entry is SpecificEntry => {
  if (typeof entry === "object" && entry !== null) {
    if ("discharge" in entry) {
      return true; // HospitalEntry
    }
    if ("employerName" in entry) {
      return true; // OccupationalHealthcareEntry
    }
    if ("healthCheckRating" in entry) {
      return true; // HealthCheckEntry
    }
  }
  return false;
};

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

const parseEntries = (entries: unknown): SpecificEntry[] => {
  if (!isSpecificEntryArray(entries)) {
    throw new Error("Incorrect or missing entries.");
  }
  return entries;
};

export default toNewPatientEntry;
