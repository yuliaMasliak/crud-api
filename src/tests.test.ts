import { isValidUUID } from './validator';
require('dotenv').config();
import request from 'supertest';

const baseURL = `http://localhost:${process.env.PORT}`;

test('GET All should return 200 statusCode', async () => {
  const response = await request(baseURL).get('/api/users');
  expect(response.statusCode).toBe(200);
});

test('GET should return empty array of users at start', async () => {
  const response = await request(baseURL).get('/api/users');
  expect(response.body).toEqual([]);
});

test('POST should return newly created user', async () => {
  const content = {
    username: 'John',
    age: 32,
    hobbies: ['running', 'fishing']
  };

  const headers = {
    'Content-Type': 'application/json'
  };
  const response = await request(baseURL)
    .post('/api/users')
    .set(headers)
    .send(content);
  expect(response.statusCode).toBe(201);
  expect(response.body).toEqual({
    username: 'John',
    age: 32,
    hobbies: ['running', 'fishing'],
    id: response.body.id
  });
});

test('PUT with valid ID should update user data', async () => {
  const newUser = {
    username: 'Yulia',
    age: 32,
    hobbies: ['sing', 'sew']
  };
  const newContent = {
    username: 'Galina'
  };
  const headers = {
    'Content-Type': 'application/json'
  };
  const response = await request(baseURL)
    .post('/api/users')
    .set(headers)
    .send(newUser);
  const validId = response.body.id;

  const responseWithPut = await request(baseURL)
    .put(`/api/users/${validId}`)
    .set(headers)
    .send(newContent);

  expect(responseWithPut.status).toBe(200);
  expect(responseWithPut.body).toEqual({
    message: 'User was successfully updated'
  });
});

test('DELETE with valid ID should delete existing User', async () => {
  const newUser = {
    username: 'Yulia',
    age: 32,
    hobbies: ['sing', 'sew']
  };

  const headers = {
    'Content-Type': 'application/json'
  };
  const response = await request(baseURL)
    .post('/api/users')
    .set(headers)
    .send(newUser);
  const validId = response.body.id;

  const responseWithDelete = await request(baseURL).delete(
    `/api/users/${validId}`
  );

  expect(responseWithDelete.status).toBe(200);
  expect(responseWithDelete.body).toEqual({
    message: 'User was successfuly deleted'
  });
});

test('DELETE with invalid ID should response with status 400', async () => {
  const invalidId = 'sfsdv';
  const response = await request(baseURL).delete(`/api/users/${invalidId}`);
  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    message: `UserId ${invalidId} is invalid (not uuid)`
  });
});

test('id specified in UUID format', () => {
  const valid = '23334265-4d51-406d-ae2c-57bed543ca6c';
  const notValid = 'efwewe32535';
  expect(isValidUUID(valid)).toBeTruthy();
  expect(isValidUUID(notValid)).toBeFalsy();
});
