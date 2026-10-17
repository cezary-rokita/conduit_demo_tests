import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
const storageState = process.env.STORAGE_STATE || ".auth/user-session.json";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  timeout: 30_000,
  expect: { timeout: 5000 },
  use: {
    baseURL: process.env.BASE_URL || "https://practicesoftwaretesting.com/",
    testIdAttribute: "data-testid",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: "**/*.setup.ts",
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: storageState,
      },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: storageState,
      },
      dependencies: ["setup"],
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: storageState,
      },
      dependencies: ["setup"],
    },
  ],
});
