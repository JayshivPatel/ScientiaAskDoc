// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  // Look for test files here (relative to location of configuration file)
  testDir: 'tests',
  // Each test is given 30 seconds to run
  timeout: 30000,
  use: {
    // Records a trace for each test, but removes it from successful runs
    trace: 'retain-on-failure',
    // Allows navigation using just the path (e.g. page.goto('/modules'))
    baseURL: 'http://localhost:3000',
    // Captures a screenshot after each test failure
    screenshot: 'only-on-failure',
  },
}

export default config
