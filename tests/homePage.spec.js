// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://realworld.app.is/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Conduit/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://realworld.app.is/');

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'conduit' })).toBeVisible();
});
