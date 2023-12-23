import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { DiagnosesEntry, PatientEntry } from "../../types";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

interface PatientInfoProps {
  patients: PatientEntry[];
}

const PatientPage: React.FC<PatientInfoProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientEntry | null>(null);
  const [diagnoses, setDiagnoses] = useState<Record<string, DiagnosesEntry>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        if (id) {
          const patientData = await patientService.getPatientById(id);
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

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        // const diagnoseData = await axios.get<DiagnosesEntry[]>("http://localhost:3001/api/diagnoses");
        const diagnoseData = await diagnosesService.getAll();

        setDiagnoses(
          diagnoseData.reduce((acc, diagnosis) => {
            acc[diagnosis.code] = diagnosis;
            return acc;
          }, {} as Record<string, DiagnosesEntry>)
        );
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
      }
    };

    fetchDiagnoses();
  }, []);

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
      {patient.entries.length > 0 ? (
        <strong>Entries:</strong>
      ) : (
        <>
          <p>no entires submitted.</p>
        </>
      )}
      <ol>
        {patient.entries.map((entry) => (
          <li key={entry.id}>
            <div>{entry.date}:</div>
            <div>{entry.description}</div>
            <div>
              {entry.diagnosisCodes && (
                <div>
                  <strong>Diagnoses:</strong>
                  <ul>
                    {entry.diagnosisCodes.map((code) => (
                      <li key={code}>
                        {diagnoses[code] ? (
                          <span>
                            <strong>{code}:</strong> {diagnoses[code].name}{" "}
                          </span>
                        ) : (
                          <span>{code}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>-{entry.specialist}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PatientPage;
