import { test, expect } from '@playwright/test';
import { landOnWalletPage, buyCredits } from '../handlers/buy10PremiumCredits';

test.describe('10 Premium Credits Purchase Flow', () => {
  const email = 'nana+10@dailyplaylists.com';
  const password = 'Kduffour12$';

  test('User buys 10 Premium Credits', async ({ page }) => {
    console.log("Starting test: User buys 10 Premium Credits...");

    try {
      // Step 1: Log in and land on the wallet page
      console.log("Navigating to wallet page...");
      const initialCredits = await landOnWalletPage(page, email, password);
      console.log(`Initial premium credits: ${initialCredits}`);

      // Verify the initial credits are fetched correctly
      expect(typeof initialCredits).toBe('number');
      console.log("Successfully fetched initial premium credits.");

      // Step 2: Proceed to buy credits
      console.log("Purchasing 10 Premium Credits...");
      await buyCredits(page);

      // Step 3: Validate that credits have increased
      console.log("Re-fetching premium credits...");
      const updatedCredits = await landOnWalletPage(page, email, password);
      console.log(`Updated premium credits: ${updatedCredits}`);

      // Check if the credits increased by 10
      expect(updatedCredits).toBe(initialCredits + 10);
      console.log("Test passed: Premium credits successfully increased by 10.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Test failed: ${error.message}`);
      } else {
        console.error("An unexpected error occurred");
      }
      throw error; // Rethrow to ensure the test fails in Playwright
    }
  });
});
