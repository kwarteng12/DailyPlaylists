// src/loginHandler.ts
import { Page } from '@playwright/test';

const loginUrl = "https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%2F%3Fclient_id%3D81f7e6abb75a496a9814e889fab42c70%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fstaging.dailyplaylists.com%252Fcallback%26scope%3Duser-read-private%2520user-read-email%2520playlist-modify-public%2520playlist-modify-private%2520user-follow-modify%2520user-library-modify%2520user-read-recently-played%26state%3D34fFs29kd09%26show_dialog%3Dtrue";

export async function login(page: Page, email: string, password: string): Promise<boolean> {
  await page.goto(loginUrl);

  // Fill in the credentials
  await page.fill('input[data-testid="login-username"]', email);
  await page.fill('input[data-testid="login-password"]', password);
  await page.click('button[data-testid="login-button"]');

  console.log("Clicked login button. Waiting for response...");

  // Wait for a moment to allow the response to be processed
  await page.waitForTimeout(3000);

  // Check if the error message is visible
  const errorMessageVisible = await page.isVisible('span.Message-sc-15vkh7g-0.kGDZJw', { timeout: 3000 });

  // Determine the login result based on the error message
  if (errorMessageVisible) {
    console.log("Login failed: Incorrect username or password.");
    return false; // Return false if the error message is visible
  } else {
    console.log("Login succeeded.");
    return true; // Assume login succeeded if no error message is found
  }
}
