// for request proofing send requests

import { NewPatientEntry } from "../types/types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  // faking the object (temporary) to get rid of errors till correct types implanted
  console.log(object)
  const newEntry: NewPatientEntry = {
    name: "fake",
    gender: "Female",
    occupation: "faker",
    dateOfBirth: "some fake date",
    ssn: "fakeee"
  };

  return newEntry;
};

export default toNewPatientEntry;