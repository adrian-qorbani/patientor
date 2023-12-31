import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import { User } from "../models/user";
import bcrypt from "bcrypt";

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
  await User.deleteMany({});
});

describe("User Registration", () => {
  test("should register a new user", async () => {
    const newUser = {
      username: "Test User",
      email: "test@example.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/auth/register")
      .send(newUser)
      .expect(201);

    expect(response.body.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User created Successfully.");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.name).toBe(newUser.username);
    expect(response.body.user.email).toBe(newUser.email);
    expect(response.body.user).not.toHaveProperty("password");
  });

  test("should return an error for duplicate email", async () => {
    // Add a user with the same email to the database
    const existingUser = {
      username: "Existing User",
      email: "test@example.com",
      password: "existingpassword",
    };

    await User.create(existingUser);

    const newUser = {
      username: "Test User",
      email: "test@example.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/auth/register")
      .send(newUser)
      .expect(400);

    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe("Email already taken. Try another.");
  });
});

describe("Login Route", () => {
  it("should authenticate a user and return a valid token", async () => {
    // Create a test user
    const newUser = {
      username: "testuser",
      password: await bcrypt.hash("testpassword", 10), 
      email: "myemail@gmail.com",
    };
    await User.create(newUser);
    const response = await request(app)
      .post("/auth/login")
      .send({
        username: "testuser",
        password: "testpassword",
      })
      .expect(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("username", "testuser");
    expect(response.body).toHaveProperty("name"); 

  });

  it("should return a 401 for an invalid username or password", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        username: "nonexistentuser",
        password: "invalidpassword",
      })
      .expect(401);

    expect(response.body).toHaveProperty(
      "error",
      "Invalid username or password."
    );
  });
});
