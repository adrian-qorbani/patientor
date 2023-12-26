import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import { Gender, NewPatientEntry } from "../types/types";
import { PatientModel } from "../models/patient";
import { User } from "../models/user";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await PatientModel.deleteMany({});
  await User.deleteMany({});
});

describe("POST / endpoint", () => {
  it("should add new patient entry", async () => {
    const newUser = {
      username: "John Steinback",
      email: "test@example.com",
      password: "testpassword",
    };

    const userResponse = await request(app)
      .post("/auth/register")
      .send(newUser)
      .expect(201);

    expect(userResponse.body.status).toBe(201);
    console.log(userResponse.body.user.id);
    const validUserId = userResponse.body.user.id;

    expect(userResponse.body.status).toBe(201);
    expect(userResponse.body.success).toBe(true);
    expect(userResponse.body.message).toBe("User created Successfully.");
    expect(userResponse.body.user).toHaveProperty("id");
    expect(userResponse.body.user.name).toBe(newUser.username);
    expect(userResponse.body.user.email).toBe(newUser.email);
    expect(userResponse.body.user).not.toHaveProperty("password");

    const validPatientEntry = {
      name: "Test Patient",
      gender: "Male",
      occupation: "Tester",
      dateOfBirth: "1990-01-01",
      ssn: "123-451-6789",
      entries: [],
      userId: validUserId,
    };

    const response = await request(app)
      .post("/api/patients")
      .send(validPatientEntry);
    console.log("response is", response.body)
    expect(response.body._id).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Patient");
    // Add more specific expects based on the response you expect
  });
});

describe("Patient API", () => {
  it.skip("should create a new patient entry", async () => {
    const newPatient: NewPatientEntry = {
      // userId: "658a9be889b57d919d26f22b",
      name: "John Doe",
      gender: Gender.Male,
      occupation: "Programmer",
      dateOfBirth: "1990-01-01",
      ssn: "554-874-961",
      entries: [],
    };

    const response = await request(app)
      .post("/api/patients")
      .send(newPatient)
      .expect(201);

    expect(response.body).toMatchObject(newPatient);
  });

  // Add more test cases for other endpoints and scenarios
});

describe("Express server main entry", () => {
  it.skip("Should return 404 on non-existing routes", async () => {
    const response = await request(app).get("/api/somethingelse");
    expect(response.status).toBe(404);
  });
});

describe("Patients route and services on api/patients", () => {
  it.skip("should return status 200", async () => {
    const response = await request(app).get("/api/patients");
    expect(response.status).toBe(200);
  });

  it.skip("should return an array of hardcoded patients", async () => {
    const response = await request(app).get("/api/patients");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(5);
  });

  it.skip("should each entry have correct key/value form", async () => {
    const response = await request(app).get("/api/patients");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((entry: any) => {
      // format checking
      expect(entry).toHaveProperty("id");
      expect(entry).toHaveProperty("name");
      expect(entry).toHaveProperty("dateOfBirth");
      expect(entry).toHaveProperty("gender");
      expect(entry).toHaveProperty("occupation");
    });
  });

  it.skip("should each entry have ssn and comment omitted (sensitive data)", async () => {
    const response = await request(app).get("/api/patients");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((entry: any) => {
      expect(entry).not.toHaveProperty("ssn");
      expect(entry).not.toHaveProperty("comment");
    });
  });

  it.skip("should each entry have correct types based on defined /types/types", async () => {
    const response = await request(app).get("/api/patients");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((entry: any) => {
      // type checking
      expect(typeof entry.id).toBe("string");
      expect(typeof entry.name).toBe("string");
      expect(typeof entry.dateOfBirth).toBe("string");
      expect(Object.values(Gender).includes(entry.gender)).toBe(true);
      expect(typeof entry.occupation).toBe("string");
    });
  });

  it.skip("should return status 200 and the added patient entry on POST", async () => {
    // dummy person based on NewPatientEntry
    const newPatientEntry: NewPatientEntry = {
      name: "Jake Joker",
      gender: Gender.Male,
      occupation: "Developer",
      dateOfBirth: "1996-01-01",
      ssn: "333-45-6789",
      entries: [],
    };

    const response = await request(app)
      .post("/api/patients")
      .send(newPatientEntry);

    expect(response.status).toBe(200);

    const addedEntry = response.body;

    // format checking
    expect(addedEntry).toHaveProperty("id");
    expect(addedEntry).toHaveProperty("name", newPatientEntry.name);
    expect(addedEntry).toHaveProperty(
      "dateOfBirth",
      newPatientEntry.dateOfBirth
    );
    expect(addedEntry).toHaveProperty("gender", newPatientEntry.gender);
    expect(addedEntry).toHaveProperty("occupation", newPatientEntry.occupation);
    expect(addedEntry).toHaveProperty("ssn");

    // types checking
    expect(typeof addedEntry.id).toBe("string");
    expect(typeof addedEntry.name).toBe("string");
    expect(typeof addedEntry.dateOfBirth).toBe("string");
    expect(Object.values(Gender).includes(addedEntry.gender)).toBe(true);
    expect(typeof addedEntry.occupation).toBe("string");
    expect(typeof addedEntry.ssn).toBe("string");
  });

  // type script checks NewPatientEntry for typing everytime, so no badly formatted patients are submitted
});

describe("POST /patients/:id/entries", () => {
  test.skip("adds a new entry for an existing patient", async () => {
    const response = await request(app)
      .post("/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries")
      .send({
        date: "2023-01-01",
        specialist: "Dr. Smith",
        type: "HealthCheck",
        description: "Routine checkup",
        healthCheckRating: 0,
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.type).toBe("HealthCheck");
    // expect(data[0].entries.length).toBe(2);
  });

  test.skip("returns 404 for a non-existing patient", async () => {
    const response = await request(app)
      .post("/api/patients/d2773sd6-f723-11e9-8f0b-362b9e155667/entries")
      .send({
        date: "2023-01-01",
        specialist: "Dr. Smith",
        type: "HealthCheck",
        description: "Routine checkup",
        healthCheckRating: 0,
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Patient not found");
  });

  test.skip("adds a new OccupationalHealthcare entry for an existing patient", async () => {
    const response = await request(app)
      .post("/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries")
      .send({
        date: "2023-01-03",
        specialist: "Dr. Anderson",
        type: "OccupationalHealthcare",
        description: "Work-related injury",
        employerName: "Tech Corp",
        diagnosisCodes: ["C789"],
        sickLeave: {
          startDate: "2023-01-03",
          endDate: "2023-01-10",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.type).toBe("OccupationalHealthcare");
    expect(response.body.diagnosisCodes).toEqual(["C789"]);
    expect(response.body.sickLeave.startDate).toBe("2023-01-03");
    expect(response.body.sickLeave.endDate).toBe("2023-01-10");
    // expect(data[0].entries.length).toBe(3);
  });
});
