import { test as setup, expect } from "@playwright/test";

setup("Log in and save browser state", async ({ page }) => {
  const apiUrl = process.env.API_URL;
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;
  const storageState = process.env.STORAGE_STATE;

  if (!apiUrl || !email || !password || !storageState) {
    throw new Error(
      "API_URL, TEST_USER_EMAIL, TEST_USER_PASSWORD, and STORAGE_STATE must be set",
    );
  }

  const loginResponse = await page.request.post(`${apiUrl}/users/login`, {
    data: { email, password },
  });
  expect(loginResponse.status(), await loginResponse.text()).toBe(200);

  const responseBody: unknown = await loginResponse.json();
  if (
    typeof responseBody !== "object" ||
    responseBody === null ||
    !("access_token" in responseBody) ||
    typeof responseBody.access_token !== "string"
  ) {
    throw new Error("Login API response did not contain a string access_token");
  }

  await page.addInitScript((token) => {
    localStorage.setItem("auth-token", token);
  }, responseBody.access_token);
  await page.goto("/account");
  await expect(page.getByRole("heading", { name: "My account" })).toBeVisible();
  await page.context().storageState({ path: storageState });
});
