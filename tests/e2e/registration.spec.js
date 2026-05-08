const { test, expect } = require('@playwright/test');

test.describe('registration page frontend behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/logout');
  });

  test('blocks registration in the browser when the password is shorter than 10 characters', async ({ page }) => {
    await page.goto('/register');

    await page.locator('#username').fill('shortpassuser');
    await page.locator('#email').fill('shortpass@example.com');
    await page.locator('#password').fill('short');
    await page.locator('#birthdate').fill('2010-05-01');
    await page.locator('#gender[value="male"]').check();

    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Password must be more than 10 characters in length');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveURL(/\/register$/);
    await expect(page.locator('body')).not.toContainText('Created?');
  });

  test('updates the password strength label as the user types', async ({ page }) => {
    await page.goto('/register');

    await page.locator('#password').fill('short');
    await expect(page.locator('#pwstrength')).toHaveText('Weak');

    await page.locator('#password').fill('ABCdef123!@#');
    await expect(page.locator('#pwstrength')).toHaveText('Moderate');

    await page.locator('#password').fill('ABCdef123!@#456789');
    await expect(page.locator('#pwstrength')).toHaveText('Strong');
  });
});
