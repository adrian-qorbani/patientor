import request from 'supertest';
import app from '../app'; 
import { Gender, NewPatientEntry } from '../types/types';

describe('Express server main entry', () => {
  it('GET /api/ping should return (pong) 200', async () => {
    const response = await request(app).get('/api/ping');
    expect(response.status).toBe(200);
  });

  it('Should return 404 on non-existing routes', async () => {
    const response = await request(app).get('/api/somethingelse');
    expect(response.status).toBe(404);
  });
});

describe('Patients route and services on api/patients', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/api/patients');
    expect(response.status).toBe(200);
  });

  it('should return an array of hardcoded patients', async () => {
    const response = await request(app).get('/api/patients');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(5);
  });

  it('should each entry have correct key/value form', async () => {
    const response = await request(app).get('/api/patients');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((entry: any) => {
      // format checking
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('name');
      expect(entry).toHaveProperty('dateOfBirth');
      expect(entry).toHaveProperty('gender');
      expect(entry).toHaveProperty('occupation');
    });
  });

  it('should each entry have ssn and comment omitted (sensitive data)', async () => {
    const response = await request(app).get('/api/patients');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((entry: any) => {
      expect(entry).not.toHaveProperty('ssn'); 
      expect(entry).not.toHaveProperty('comment'); 
    });
  });

  it('should each entry have correct types based on defined /types/types', async () => {
    const response = await request(app).get('/api/patients');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((entry: any) => {
      // type checking
      expect(typeof entry.id).toBe('string');
      expect(typeof entry.name).toBe('string');
      expect(typeof entry.dateOfBirth).toBe('string');
      expect(Object.values(Gender).includes(entry.gender)).toBe(true);
      expect(typeof entry.occupation).toBe('string');
    });
  });

  it('should return status 200 and the added patient entry on POST', async () => {
    // dummy person based on NewPatientEntry
    const newPatientEntry: NewPatientEntry = {
      name: 'Jake Joker',
      gender: Gender.Male,
      occupation: 'Developer',
      dateOfBirth: '1996-01-01',
      ssn: '333-45-6789',
      entries: []
    };

    const response = await request(app)
      .post('/api/patients')
      .send(newPatientEntry);

    expect(response.status).toBe(200);

    const addedEntry = response.body;

    // format checking
    expect(addedEntry).toHaveProperty('id');
    expect(addedEntry).toHaveProperty('name', newPatientEntry.name);
    expect(addedEntry).toHaveProperty('dateOfBirth', newPatientEntry.dateOfBirth);
    expect(addedEntry).toHaveProperty('gender', newPatientEntry.gender);
    expect(addedEntry).toHaveProperty('occupation', newPatientEntry.occupation);
    expect(addedEntry).toHaveProperty('ssn');

    // types checking
    expect(typeof addedEntry.id).toBe('string');
    expect(typeof addedEntry.name).toBe('string');
    expect(typeof addedEntry.dateOfBirth).toBe('string');
    expect(Object.values(Gender).includes(addedEntry.gender)).toBe(true);
    expect(typeof addedEntry.occupation).toBe('string');
    expect(typeof addedEntry.ssn).toBe('string');

  });

  // type script checks NewPatientEntry for typing everytime, so no badly formatted patients are submitted

});