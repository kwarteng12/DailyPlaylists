// handlers/standardSong.ts
import { Page } from '@playwright/test';
import { login } from './loginHandler';

export async function startFromDashboard(page: Page, email: string, password: string): Promise<void> {
  console.log("Starting from login and navigating to the dashboard...");

  const loginSuccessful = await login(page, email, password);
  if (!loginSuccessful) {
    throw new Error("Login failed. Cannot proceed to the dashboard.");
  }

  console.log("Post-login flow detected. Closing pop-ups if any...");

  // Pop-up close button selector
  const popupCloseButtonSelector = 'svg[class="Icon__SvgStyled-j3bzl8-0 lgtvED"] use[href$="#x-light"]';

  // Handle pop-ups dynamically
  for (let i = 0; i < 2; i++) { // Max 2 pop-ups to close
    const popUpVisible = await page.isVisible(popupCloseButtonSelector);
    if (popUpVisible) {
      await page.click(popupCloseButtonSelector, { force: true });
      console.log(`Closed pop-up ${i + 1}.`);
      await page.waitForTimeout(1000); // Give time for the UI to stabilize
    } else {
      console.log(`Pop-up ${i + 1} not found. Continuing...`);
      break; // Exit loop if no pop-up is found
    }
  }

  // Ensure user is now on the dashboard
  await page.waitForURL('https://staging.dailyplaylists.com/dashboard', { timeout: 6000 });
  console.log("Successfully landed on the dashboard.");
}

export async function goToSubmitSongForm(page: Page): Promise<void> {
  console.log("Navigating to the 'Submit a song' form...");

  // Click the "Submit a song" button
  await page.click('a[href="/submit-song/add-song"] button.dashboard__SubmitASongButton-winmvq-9', { force: true });

  // Validate navigation to the song submission form
  await page.waitForURL('https://staging.dailyplaylists.com/submit-song/add-song', { timeout: 5000 });

  console.log("Successfully navigated to the 'Submit a song' form.");
}
