import mongoose, { Schema } from "mongoose";
import { PatientEntry, Gender } from "../types/types";

const PatientSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: Object.values(Gender), required: true },
  occupation: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  ssn: { type: String, required: true, unique: true },
  comment: { type: String },
  entries: [{ type: Schema.Types.ObjectId, ref: "SpecificEntry" }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const PatientModel = mongoose.model<PatientEntry>(
  "Patient",
  PatientSchema
);
