import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import { List, ListItem } from "@mui/material";

import HospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MonitorHeart from "@mui/icons-material/MonitorHeart";

// import { Male, Female } from '@mui/icons-material';

import { DiagnosesEntry, PatientEntry, SpecificEntry } from "../../types";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

import EntryForm from "./AddEntryForm";

interface PatientInfoProps {
  patients: PatientEntry[];
  // entries: SpecificEntry[];
}

const StyledList = styled(List)({
  listStyleType: "none",
  padding: "10px",
});

const StyledListItem = styled(ListItem)({
  border: "1px solid black",
  borderRadius: "8px",
  margin: "8px 0", // Adjust margin as needed
  padding: "16px", // Adjust padding as needed
  display: "flex", // Set to 'flex'
  flexDirection: "column", // Set to 'column'
  alignItems: "flex-start",
  // Ensure each list item content is displayed in separate rows
  "& > div": {
    marginBottom: "8px", // Adjust spacing as needed
  },
});

const getIconStyles = (
  entryType: SpecificEntry["type"]
): React.CSSProperties => {
  switch (entryType) {
    case "Hospital":
      return { color: "blue" }; // Adjust color as needed
    case "OccupationalHealthcare":
      return { color: "orange" }; // Adjust color as needed
    case "HealthCheck":
      return { color: "green" }; // Adjust color as needed
    default:
      return {};
  }
};

const getIconForEntryType = (entryType: SpecificEntry["type"]) => {
  switch (entryType) {
    case "Hospital":
      return <HospitalIcon style={getIconStyles(entryType)} />;
    case "OccupationalHealthcare":
      return <WorkIcon style={getIconStyles(entryType)} />;
    case "HealthCheck":
      return <MonitorHeart style={getIconStyles(entryType)} />;
    default:
      return null;
  }
};

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
  }, [patient]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
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

      <EntryForm patientId={patient.id} />

      <StyledList>
        {patient.entries.map((entry) => (
          <StyledListItem key={entry.id}>
            <div>{entry.date}:</div>
            <div> {getIconForEntryType(entry.type)}</div>
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
            <div>diagnoses by: {entry.specialist}</div>
          </StyledListItem>
        ))}
      </StyledList>
    </div>
  );
};

export default PatientPage;
