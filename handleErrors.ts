import * as http from 'http';

export function handleErrors(
  err: any,
  res: http.ServerResponse,
  status = 500,
  message = 'Internal Server Error'
) {
  console.error('Error:', err);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  console.error('Error:', err);
  res.end(message);
}
