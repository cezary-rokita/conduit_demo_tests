import { test, expect } from "@playwright/test";

test("Verify the saved login state is active", async ({ page }) => {
  await page.goto("/account");
  await expect(page.getByRole("heading", { name: "My account" })).toBeVisible();
});
