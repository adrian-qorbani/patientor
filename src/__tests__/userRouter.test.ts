import request from 'supertest';
import app from '../app'; 
// import mongoose, { ConnectOptions } from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { User } from '../models/user';

describe('User Registration', () => {
  test('should register a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(201);

    expect(response.body.message).toBe('User registered successfully');
  });
});