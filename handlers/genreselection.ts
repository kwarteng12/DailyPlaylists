import { Page } from 'playwright'; // Playwright import
import { selectGenre } from '../genreUtils';

export async function navigateAndSelectGenre(page: Page): Promise<void> {
  const genres = ['Hip Hop', 'Trap', 'Rock', 'Rap', 'Acoustic', 'Pop', 'Jazz', 'Electronic'];
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  console.log(`Selected genre: ${randomGenre}`);

  // Navigate to the genre selection page
  await page.goto('https://staging.dailyplaylists.com/submit-song/select-genres');
  console.log('Navigated to genre selection page.');

  // Select a genre
  await selectGenre(page, randomGenre);
  console.log('Genre selection process completed.');

  // Dismiss cookie modal if present
  const declineButtonSelector = 'button[data-tid="banner-decline"]';
  const isCookieModalVisible = await page.isVisible(declineButtonSelector);
  if (isCookieModalVisible) {
    console.log('Cookie modal is visible. Clicking "Decline" button...');
    await page.click(declineButtonSelector);
    console.log('Clicked the "Decline" button.');
  } else {
    console.log('Cookie modal is not visible.');
  }

  // Click the "Next" button to proceed to the next page
  const nextButtonSelector = 'button.QVNeK';
  console.log('Clicking the "Next" button...');
  await page.waitForSelector('a[href="/submit-song/select-languages"]:visible');
await page.click('a[href="/submit-song/select-languages"]');
;
}
