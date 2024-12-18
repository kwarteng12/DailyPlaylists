import { test } from '@playwright/test';
import { startFromDashboard, goToSubmitSongForm, selectStandardCredits } from '../handlers/standardSong';
import { searchAndClickRandomSong } from '../handlers/SearchSongHandler';
import { navigateAndSelectGenre } from '../handlers/genreselection';  

test('should search, click a random song, select a random genre and proceed to the next step', async ({ page }) => {
  const email = 'nana+15@dailyplaylists.com';
  const password = 'Kduffour12$';

  // Start from login and navigate to the dashboard
  await startFromDashboard(page, email, password);

  // Navigate to the "Submit a song" form
  await goToSubmitSongForm(page);

  // Search for and click a random song
  await searchAndClickRandomSong(page);

  // Navigate to the genre selection page and select a random genre
  await navigateAndSelectGenre(page);

  console.log('Navigating to standard submission page...');
  
  // Select standard credits
  await selectStandardCredits(page);

  // // Wait for the page to load and confirm navigation to the language selection page
  // await page.waitForURL('https://staging.dailyplaylists.com/submit-song/select-languages', { timeout: 60000 });
  // console.log('Successfully navigated to the language selection page.');

//   // Wait for the next step to click the "Next" button
//   const nextButtonSelector = 'button:has-text("Next")';
//   await page.waitForSelector(nextButtonSelector, { state: 'visible', timeout: 60000 });
//   await page.click(nextButtonSelector);

//   // Wait for the page to navigate to the "Confirm Settings" page
//   await page.waitForURL('https://staging.dailyplaylists.com/submit-song/confirm-settings', { timeout: 60000 });
//   console.log('Successfully navigated to the confirm settings page.');

//   // Proceed to the "Type Selection" page
//   await page.click('a[href="/submit-song/type-selection"]');
//   await page.waitForURL('https://staging.dailyplaylists.com/submit-song/type-selection', { timeout: 60000 });
//   console.log('Successfully navigated to the type selection page.');

//   // Proceed to "Go to Standard" button
//   const goToStandardButtonSelector = 'button.styles__SubmitButton-nt5q67-6.hQUCSt';
//   await page.waitForSelector(goToStandardButtonSelector, { state: 'visible', timeout: 60000 });
//   await page.click(goToStandardButtonSelector);
//   console.log('Clicked the "Go to Standard" button.');

//   // Wait for the final URL after the "Go to Standard" button click
//   await page.waitForURL('https://staging.dailyplaylists.com/submit-song/standard-submission', { waitUntil: 'load', timeout: 60000 });
//   console.log('Successfully navigated to the standard submission page.');

//   // Ensure no unexpected redirection occurs by checking page URL again
//   const finalUrl = page.url();
//   if (finalUrl !== 'https://staging.dailyplaylists.com/submit-song/standard-submission') {
//     console.log(`Unexpected redirection occurred! Current URL: ${finalUrl}`);
//     throw new Error(`Unexpected navigation occurred. Current URL: ${finalUrl}`);
//   }

//   // Wait for the page to fully load (no further redirects or reloads)
//   await page.waitForLoadState('load');
//   console.log('Page fully loaded and no further redirects detected.');
 });
