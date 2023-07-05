import * as http from 'http';
import { processData } from './processData';
import { isValidUUID, isValidUrl } from './validator';
import { handleErrors } from './handleErrors';

export function handleRequests(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const db = new processData();
  const { method, url } = req;
  if (url) {
    const userID = url.split('/')[3];

    if (isValidUrl(url)) {
      //GET requests
      if (method === 'GET' && url === '/api/users') {
        try {
          const allUsers = db.getAllUsers();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(allUsers));
        } catch (err) {
          handleErrors(err, res);
        }
      } else if (method === 'GET') {
        if (isValidUUID(userID)) {
          try {
            const user = db.getUserById(userID);
            if (user) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(user));
            } else {
              const err = new Error(`User with id ${userID} doesn't exist`);
              handleErrors(
                err,
                res,
                404,
                `User with id ${userID} doesn't exist`
              );
            }
          } catch (err: unknown) {
            handleErrors(err, res);
          }
        } else {
          const err = new Error(`UserId ${userID} is invalid (not uuid)`);
          handleErrors(err, res, 400, err.message);
        }

        //POST request
      } else if (method === 'POST') {
        try {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            const newUser = JSON.parse(body);
            if (newUser.username && newUser.age && newUser.hobbies) {
              const createdUser = db.createNewUser(newUser);
              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(createdUser));
            } else {
              const err = new Error(
                'The request does not contain required fields'
              );
              handleErrors(err, res, 400, err.message);
            }
          });
        } catch (err: unknown) {
          handleErrors(err, res);
        }

        //PUST request
      } else if (method === 'PUT') {
        if (isValidUUID(userID)) {
          try {
            const user = db.getUserById(userID);
            if (user) {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                db.updateUser(userID, JSON.parse(body));
              });

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  message: 'User was successfully updated'
                })
              );
            } else {
              const err = new Error(`User with id ${userID} doesn't exist`);
              handleErrors(err, res, 404, err.message);
            }
          } catch (err: unknown) {
            handleErrors(err, res);
          }
        } else {
          const err = new Error(`UserId ${userID} is invalid (not uuid)`);
          handleErrors(err, res, 400, err.message);
        }
      } else if (method === 'DELETE') {
        if (isValidUUID(userID)) {
          try {
            const user = db.getUserById(userID);
            if (user) {
              db.deleteUser(userID);

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  message: 'User was successfuly deleted'
                })
              );
            } else {
              const err = new Error(`User with id ${userID} doesn't exist`);
              handleErrors(err, res, 404, err.message);
            }
          } catch (err: unknown) {
            handleErrors(err, res);
          }
        } else {
          const err = new Error(`UserId ${userID} is invalid (not uuid)`);
          handleErrors(err, res, 400, err.message);
        }
      }
    } else {
      const err = new Error(`Wrong url (endpoint)`);
      handleErrors(err, res, 404, err.message);
    }
  }
}
