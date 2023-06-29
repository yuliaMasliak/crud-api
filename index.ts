import * as http from 'http';
require('dotenv').config();
import { handleRquest } from './handleRquests';
import { handleError } from './errorHandler';

function isValidUUID(id: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return typeof id === 'string' && uuidRegex.test(id);
}

const app = http.createServer((req, res) => {
  const db = new handleRquest();
  const { method, url } = req;
  if (url) {
    const userID = url.split('/')[3];

    if (method === 'GET') {
      if (url === '/api/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(db.getAllUsers()));
      } else {
        if (isValidUUID(userID)) {
          try {
            const user = db.getUserById(userID);
            if (user) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(db.getUserById(userID)));
            } else {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify(
                  handleError(
                    `User with id ${userID} doesn't exist`,
                    res.statusCode
                  )
                )
              );
            }
          } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(handleError(`Server Error`, res.statusCode));
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify(
              handleError(
                `UserId ${userID} is invalid (not uuid)`,
                res.statusCode
              )
            )
          );
        }
      }
    }
    if (url === '/api/users' && method === 'POST') {
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
        }
      });
    }
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}/`);
});
