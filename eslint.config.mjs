import js from "@eslint/js";
import globals from "globals";
import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";

export default [
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs}"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**/*.{js,ts}"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "playwright/no-wait-for-timeout": "error",
      "playwright/missing-playwright-await": "error",
    },
  },
];
