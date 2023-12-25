import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { SpecificEntry } from "../../types";

import patientService from "../../services/patients";

interface EntryFormProps {
  onEntrySubmit: (entry: Omit<SpecificEntry, "id">) => void;
  patientId: string;
}

const EntryForm: React.FC<EntryFormProps> = ({ patientId }) => {
  const [entryType, setEntryType] = useState<
    "Hospital" | "OccupationalHealthcare" | "HealthCheck"
  >("Hospital");
  const [date, setDate] = useState("2023-01-01");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");

  const [diagnosesCode, setDiagnosesCode] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-01-01");
  const [dischargeDate, setDischargeDate] = useState("2023-01-01");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("1");
  const [showForm, setShowForm] = useState(false);

  const handleTypeChange = (
    event: SelectChangeEvent<
      "Hospital" | "OccupationalHealthcare" | "HealthCheck"
    >
  ) => {
    setEntryType(event.target.value as typeof entryType);
  };

  const handleSubmit = async () => {
    // turns diagnoses codes seperated by commas into an array of diagnoses (needs fixing as async function delays its input)
    const newArray = diagnosesCode.split(",").map((item) => item.trim());
    setDiagnosisCodes(newArray);

    // Create entry based on the selected type
    const newEntry: Omit<SpecificEntry, "id"> = {
      type: entryType,
      date,
      specialist,
      description,
      diagnosisCodes: newArray,
      ...(entryType === "Hospital" && {
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      }),
      ...(entryType === "OccupationalHealthcare" && {
        employerName,
        sickLeave: {
          startDate,
          endDate,
        },
      }),
      ...(entryType === "HealthCheck" && {
        healthCheckRating: parseInt(healthCheckRating, 10),
      }),
    };

    console.log("Entry is:", newEntry);



    


    try {
      const response = await patientService.addEntryToPatient(
        patientId,
        newEntry
      );

      if (response.ok) {
        const responseData = await response.json();
        const entryWithId = {
          ...newEntry,
          id: responseData.id,
        } as SpecificEntry;

        console.log("entry with id: ", entryWithId);

        // reset form
        setDate("2023-01-01");
        setSpecialist("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setDischargeDate("");
        setDischargeCriteria("");
        setEmployerName("");
        setHealthCheckRating("1");
      } else {
        console.error("Failed to add entry:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // <form>
    <Box
      border={showForm ? 1 : 0}
      borderRadius={2}
      padding={2}
      margin={1}
      mx="auto"
    >
      {showForm ? (
        <>
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select value={entryType} onChange={handleTypeChange}>
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="OccupationalHealthcare">
                Occupational Healthcare
              </MenuItem>
              <MenuItem value="HealthCheck">Health Check</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Diagnoses Codes"
            value={diagnosesCode}
            onChange={(e) => setDiagnosesCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          {entryType === "Hospital" && (
            <>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Discharge Date"
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Discharge Criteria"
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {entryType === "OccupationalHealthcare" && (
            <>
              <TextField
                label="Employer Name"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Sick Leave Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Sick Leave End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {entryType === "HealthCheck" && (
            <>
              <FormControl>
                <InputLabel>Health Check Rating</InputLabel>
                <Select
                  value={healthCheckRating}
                  onChange={(e) =>
                    setHealthCheckRating(e.target.value as string)
                  }
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Entry
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setShowForm(false)}
          >
            Close
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
        >
          Add Entry
        </Button>
      )}
    </Box>
  );
};

export default EntryForm;
