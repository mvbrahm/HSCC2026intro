const http = require('http');
const path = require('path');
const app = require('../../app');
const { resetTestDatabase } = require('./testDb');

const port = Number(process.env.PORT || 3001);
const dbPath = path.join(__dirname, '..', '..', '.tmp', 'e2e.sqlite');

resetTestDatabase(dbPath);

const server = http.createServer(app);

server.listen(port, '127.0.0.1', () => {
  console.log(`E2E server listening on http://127.0.0.1:${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
