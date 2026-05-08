const fs = require('fs');
const path = require('path');
const { createUserTable } = require('../../utils/sqltest');

const tmpDir = path.join(__dirname, '..', '..', '.tmp');
const testDbPath = path.join(tmpDir, 'test.sqlite');

function resetTestDatabase(dbPath = testDbPath) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }

  process.env.DB_PATH = dbPath;
  process.env.BEARER_TOKEN = process.env.BEARER_TOKEN || 'test-secret';
  process.env.PRODUCTION = 'true';
  global.userToken = null;

  createUserTable();

  return dbPath;
}

module.exports = {
  resetTestDatabase,
  testDbPath
};
