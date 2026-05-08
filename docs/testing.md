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

## Testing Packages

Jest is the backend test runner. It finds files that match `tests/backend/**/*.test.js`, runs each `test(...)` block, and reports whether the assertions passed or failed.

Supertest lets backend tests call the Express app without starting a real network server. A test can send requests like `POST /login` or `GET /` directly to `app.js` and then inspect the response status, redirect location, or HTML.

Playwright is the browser test runner. It starts a real browser, visits pages, fills in forms, clicks buttons, handles browser alerts, and checks what appears on the page. This is the right tool for frontend-only JavaScript behavior, such as the registration password length alert.

`better-sqlite3` is the database package used by the app. The test framework sets `DB_PATH` so tests write to a temporary SQLite database under `.tmp/` instead of changing `example.db`.

## Backend Test Workflow

When a backend test runs with `npm run test:backend`:

1. Jest reads `jest.config.js`.
2. Jest finds test files under `tests/backend`.
3. The test imports the Express app from `app.js`.
4. The test calls `resetTestDatabase()` from `tests/support/testDb.js`.
5. `resetTestDatabase()` creates a fresh SQLite test database and seeds known users.
6. Supertest sends HTTP-like requests directly to the Express app.
7. The test checks the response using Jest assertions such as `expect(response.status).toBe(302)`.

Backend tests are fast because they do not open a browser and do not need the app to listen on a port.

## Frontend Test Workflow

When a frontend/browser test runs with `npm run test:e2e`:

1. Playwright reads `playwright.config.js`.
2. Playwright starts the web server using `tests/support/e2e-server.js`.
3. The E2E server creates a fresh SQLite test database.
4. Playwright launches Chromium.
5. Each test gets a `page` object, which represents a browser tab.
6. The test visits real app URLs such as `/register` or `/login`.
7. The test interacts with the page as a user would: filling inputs, clicking buttons, and accepting alerts.
8. Playwright assertions check the browser state, page text, URL, or visible UI.

Browser tests are slower than backend tests, but they are the best way to verify frontend JavaScript and complete user workflows.

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
