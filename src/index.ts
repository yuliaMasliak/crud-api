import * as http from 'http';
require('dotenv').config();
import { handleErrors } from './handleErrors';
import { handleRequests } from './handleRequests';

const app = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      handleRequests(req, res);
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}/`);
});
