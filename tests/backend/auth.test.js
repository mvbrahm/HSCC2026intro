const request = require('supertest');
const app = require('../../app');
const { resetTestDatabase } = require('../support/testDb');

describe('authentication routes', () => {
  beforeEach(() => {
    resetTestDatabase();
  });

  test('authenticates the predefined mkematt2 account and renders the home navbar greeting', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .type('form')
      .send({
        username: 'mkematt2',
        password: 'ABCdef123!@#'
      });

    expect(loginResponse.status).toBe(302);
    expect(loginResponse.headers.location).toBe('/');

    const homeResponse = await request(app).get('/');

    expect(homeResponse.status).toBe(200);
    expect(homeResponse.text).toContain('Hello, mkematt2');
  });

  test('rejects an incorrect password for an existing user', async () => {
    const response = await request(app)
      .post('/login')
      .type('form')
      .send({
        username: 'mkematt2',
        password: 'wrong-password'
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Invalid Password');
  });
});
