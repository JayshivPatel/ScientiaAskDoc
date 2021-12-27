import { test, expect } from '@playwright/test'

test('index page contains welcome greeting', async ({ page }) => {
  // Start from the index page (baseURL is set in the configuration)
  await page.goto('/')
  // Expect page to have the "Welcome" in the heading
  await expect(page.locator('h1')).toContainText('Welcome')
})
