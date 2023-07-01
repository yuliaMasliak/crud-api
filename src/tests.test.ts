import { isValidUUID } from './validator';
import http from 'http';
import axios from 'axios';
require('dotenv').config();

test('id specified in UUID format', () => {
  const valid = '23334265-4d51-406d-ae2c-57bed543ca6c';
  const notValid = 'efwewe32535';
  expect(isValidUUID(valid)).toBeTruthy();
  expect(isValidUUID(notValid)).toBeFalsy();
});

test('GET should return empty array of users at start', async () => {
  const response = await axios.get(
    `http://localhost:${process.env.PORT}/api/users`
  );
  expect(response.status).toBe(200);
  expect(response.data).toEqual([]);
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
  const response = await axios.post(
    `http://localhost:${process.env.PORT}/api/users`,
    content,
    { headers }
  );
  expect(response.status).toBe(201);
  expect(response.data).toEqual({
    username: 'John',
    age: 32,
    hobbies: ['running', 'fishing'],
    id: response.data.id
  });
});

test('PUT with valid ID should update user data', async () => {
  let validId = '';
  const newContent = {
    username: 'Yulia'
  };
  const headers = {
    'Content-Type': 'application/json'
  };
  const content = {
    username: 'John',
    age: 32,
    hobbies: ['running', 'fishing']
  };
  const response1 = await axios.post(
    `http://localhost:${process.env.PORT}/api/users`,
    content,
    { headers }
  );
  validId = response1.data.id;

  const response2 = await axios.put(
    `http://localhost:${process.env.PORT}/api/users/${validId}`,
    newContent
  );
  expect(response2.status).toBe(200);
  expect(response2.data).toEqual('User was successfuly updated');
});

test('DELETE with valid ID should delete existing User', async () => {
  let validId = '';

  const headers = {
    'Content-Type': 'application/json'
  };
  const content = {
    username: 'John',
    age: 32,
    hobbies: ['running', 'fishing']
  };
  const response1 = await axios.post(
    `http://localhost:${process.env.PORT}/api/users`,
    content,
    { headers }
  );
  validId = response1.data.id;

  const response2 = await axios.delete(
    `http://localhost:${process.env.PORT}/api/users/${validId}`
  );
  expect(response2.status).toBe(200);
  expect(response2.data).toEqual('User was successfuly deleted');
});

test('DELETE with invalid ID should response with status 400', (done) => {
  const invalidId = 'sfsdv';

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: `api/users/:${invalidId}`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    console.log(responseData);

    res.on('end', () => {
      expect(res.statusCode).toBe(400);
      done();
    });
  });
  req.on('error', (error) => {
    console.error(error);
  });
  req.end();
});
