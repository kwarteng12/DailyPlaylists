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

  // Click the "Next" button using getByText
  console.log('Clicking the "Next" button...');
  await page.getByText('Next').click();  // Use 'Next' as the text for the button
  console.log('Clicked the "Next" button.');

  // Add a 3-second delay after clicking the Next button
  console.log('Waiting for 3 seconds...');
  await page.waitForTimeout(3000); // 3-second delay
  console.log('Completed 3-second delay.');

  // Wait for navigation to the next page
  console.log('Waiting for navigation to the "Select Languages" page...');
  try {
    await page.waitForNavigation({ url: 'https://staging.dailyplaylists.com/submit-song/select-languages', timeout: 10000 });
    console.log('Successfully navigated to the "Select Languages" page.');
  } catch (error) {
    console.error('Failed to navigate to the expected page. Error:', error);
  }

  // Verify the current URL after navigation
  const currentUrl = page.url();
  if (currentUrl === 'https://staging.dailyplaylists.com/submit-song/select-languages') {
    console.log('Successfully navigated to the "Select Languages" page.');
  } else {
    console.error('Failed to navigate to the expected page. Current URL: ' + currentUrl);
  }

  // Optional delay for smooth navigation
  await page.waitForTimeout(2000);
  console.log('Completed navigation to the next step.');
}
