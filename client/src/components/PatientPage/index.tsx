import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import axios from "axios";

import { PatientEntry } from "../../types";

import { getPatientById } from "../../services/patients";

interface PatientInfoProps {
  patients: PatientEntry[];
}

const PatientPage: React.FC<PatientInfoProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        if (id) {
          const patientData = await getPatientById(id);
          setPatient(patientData);
        } else {
          setError("Patient ID is not defined.");
        }
      } catch (err) {
        setError("Error fetching patient information.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div>
      <h1>Patient Information</h1>
      {/* <p>ID: {patient.id}</p> */}
      <p>Name: {patient.name}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Gender: {patient.gender}</p>
      {patient.ssn && <p>SSN: {patient.ssn}</p>}
      {patient.dateOfBirth && <p>Date of Birth: {patient.dateOfBirth}</p>}
      <ol>
        {patient.entries.map((entry) => (
          <li key={entry.id}>
            <div>{entry.date}:</div>
            <div>{entry.description}</div>
            <div>{entry.diagnosisCodes}</div>
            <div>-{entry.specialist}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PatientPage;
