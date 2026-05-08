const { test, expect } = require('@playwright/test');

test('logs in with the predefined account and shows the navbar greeting', async ({ page }) => {
  await page.goto('/logout');
  await page.goto('/login');

  await page.locator('#username').fill('mkematt2');
  await page.locator('#password').fill('ABCdef123!@#');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL('/');
  await expect(page.locator('nav')).toContainText('Hello, mkematt2');
});
