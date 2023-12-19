import express from "express";
import patientsRouters from "./routes/patientsRouters";
import diagnosesRouters from "./routes/diagnosesRouter";

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/patients", patientsRouters);
app.use("/api/diagnoses", diagnosesRouters);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
