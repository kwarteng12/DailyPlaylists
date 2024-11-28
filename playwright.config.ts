import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // Set the global timeout for all tests (in milliseconds)
  use: {
    headless: true,
  },
});
