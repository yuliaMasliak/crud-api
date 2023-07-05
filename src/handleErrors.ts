import * as http from 'http';

export function handleErrors(
  err: unknown,
  res: http.ServerResponse,
  status = 500,
  errorMessage = 'Internal Server Error'
) {
  console.error('Error:', err);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: errorMessage }));
}
