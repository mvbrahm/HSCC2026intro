# Testing Framework

This project uses two standard Node.js testing tools:

- Jest with Supertest for backend and route-level integration tests.
- Playwright for browser tests that verify frontend behavior and full page flows.

## Test Layout

- `tests/backend/*.test.js` contains Jest/Supertest tests.
- `tests/e2e/*.spec.js` contains Playwright browser tests.
- `tests/support/testDb.js` resets an isolated SQLite database for tests.
- `tests/support/e2e-server.js` starts the Express app for Playwright without opening a browser.

The test database is written under `.tmp/`, which is ignored by Git. Normal app usage still uses `example.db`.

## Running Tests

The first time Playwright is used on a new machine or container, install the browser runtime:

```bash
npx playwright install chromium
```

Run every test:

```bash
npm test
```

Run only backend tests:

```bash
npm run test:backend
```

Run only browser tests:

```bash
npm run test:e2e
```

## Adding Backend Tests

Add a new file under `tests/backend` with a `.test.js` suffix.

Example:

```js
const request = require('supertest');
const app = require('../../app');
const { resetTestDatabase } = require('../support/testDb');

describe('my backend feature', () => {
  beforeEach(() => {
    resetTestDatabase();
  });

  test('does something useful', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });
});
```

## Adding Browser Tests

Add a new file under `tests/e2e` with a `.spec.js` suffix.

Example:

```js
const { test, expect } = require('@playwright/test');

test('home page loads', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('body')).toContainText('2026 Milwaukee HSCC season');
});
```

Playwright starts the app automatically using `tests/support/e2e-server.js`.
