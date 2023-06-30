import { isValidUUID } from './validator';
import http from 'http';
import axios, { AxiosError } from 'axios';
require('dotenv').config();

// test('id specified in UUID format', () => {
//   const valid = '23334265-4d51-406d-ae2c-57bed543ca6c';
//   const notValid = 'efwewe32535';
//   expect(isValidUUID(valid)).toBeTruthy();
//   expect(isValidUUID(notValid)).toBeFalsy();
// });

// test('GET should return empty array at start', (done) => {
//   const options = {
//     hostname: 'localhost',
//     port: 3001,
//     path: '/api/users',
//     method: 'GET'
//   };

//   const req = http.request(options, (res) => {
//     let responseData = '';
//     res.on('data', (chunk) => {
//       responseData += chunk;
//     });

//     res.on('end', () => {
//       expect(res.statusCode).toBe(200);
//       expect(JSON.parse(responseData)).toEqual([]);
//       done();
//     });
//   });
//   req.on('error', (error) => {
//     console.error(error);
//   });
//   req.end();
// });

// test('POST should return newly created user', (done) => {
//   const content = JSON.stringify({
//     username: 'John',
//     age: 32,
//     hobbies: ['running', 'fishing']
//   });

//   const options = {
//     hostname: 'localhost',
//     port: 3001,
//     path: '/api/users',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Content-Length': Buffer.byteLength(content)
//     }
//   };

//   const req = http.request(options, (res) => {
//     let responseData = '';

//     res.on('data', (chunk) => {
//       responseData += chunk;
//     });

//     res.on('end', () => {
//       expect(res.statusCode).toBe(201);
//       expect(JSON.parse(responseData)).toEqual({
//         username: 'John',
//         age: 32,
//         hobbies: ['running', 'fishing'],
//         id: JSON.parse(responseData).id
//       });
//       done();
//     });
//   });

//   req.on('error', (error) => {
//     console.error(error);
//   });

//   req.write(content);

//   req.end();
// }, 10000);

test('PUT with valid ID should update user data', async () => {
  const validId = '3d48009d-7c95-4735-b897-2b175e6c9008';
  const content = {
    username: 'Yulia'
  };

  try {
    const response = await axios.put(
      `http://localhost:3001/api/users/${validId}`,
      content
    );
    expect(response.status).toBe(200);
    expect(response.data).toEqual('User was successfuly updated');
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(axiosError.response.data);
    } else {
      console.error(error);
    }
  }
}, 90000);

// test('DELETE with invalid ID should response with status 400', (done) => {
//   const invalidId = 'sfsdv';

//   const options = {
//     hostname: 'localhost',
//     port: 3001,
//     path: `api/users/:${invalidId}`,
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' }
//   };

//   const req = http.request(options, (res) => {
//     let responseData = '';
//     res.on('data', (chunk) => {
//       responseData += chunk;
//     });
//     console.log(responseData);

//     res.on('end', () => {
//       expect(res.statusCode).toBe(400);
//       done();
//     });
//   });
//   req.on('error', (error) => {
//     console.error(error);
//   });
//   req.end();
// }, 90000);
