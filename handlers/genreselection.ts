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

  // Wait for the Next button to be enabled and clickable
  const nextButtonSelector = 'a[href="/submit-song/select-languages"] button.SubmitSong__ContinueButton-sc-13tuoz8-5';
  console.log('Waiting for the Next button to become enabled...');

  // Wait for the button to be attached and enabled
  await page.waitForSelector(nextButtonSelector, { state: 'attached', timeout: 5000 });

  await page.waitForFunction(
    (selector) => {
      const button = document.querySelector(selector);
      return button && !button.hasAttribute('disabled');
    },
    nextButtonSelector,
    { timeout: 5000 }
  );

  console.log('Next button is enabled.');

  // Ensure the button is visible and not intercepted
  await page.waitForSelector(nextButtonSelector, { state: 'visible' });

  // Check if the button is being intercepted
  const isIntercepted = await page.evaluate((selector) => {
    const button = document.querySelector(selector);
    if (button) {
      const rect = button.getBoundingClientRect();
      const topElement = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return topElement !== button;
    }
    return false;
  }, nextButtonSelector);

  if (isIntercepted) {
    console.log('Next button is intercepted. Attempting to dismiss overlays...');
    const interceptingModalSelector = 'div[role="dialog"], .termly-styles-root-b0aebb'; // Example intercepting elements
    if (await page.isVisible(interceptingModalSelector)) {
      await page.click(`${interceptingModalSelector} button`, { timeout: 2000 }).catch(() => {
        console.log('No intercepting modal to dismiss.');
      });
    }
  }

  // Scroll the Next button into view if needed
  await page.evaluate((selector) => {
    const button = document.querySelector(selector);
    if (button) {
      button.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, nextButtonSelector);

  // Click the Next button
  try {
    await page.click(nextButtonSelector, { timeout: 5000 });
    console.log('Clicked the Next button.');
  } catch (error) {
    console.error('Failed to click the Next button:', error);
  }

  // Add a 3-second delay after clicking the Next button
  console.log('Waiting for 3 seconds...');
  await page.waitForTimeout(3000); // 3-second delay
  console.log('Completed 3-second delay.');

  // Verify navigation to the next page
  const languageSelector = 'h1'; // Assuming an h1 element or some unique element is on the "select languages" page
  console.log('Verifying navigation to the "Select Languages" page...');

  // Wait for an element specific to the next page to appear (like an h1 or some other identifier)
  await page.waitForSelector(languageSelector, { state: 'visible', timeout: 5000 });
  console.log('Successfully navigated to the "Select Languages" page.');

  // Optional delay for smooth navigation
  await page.waitForTimeout(2000);
  console.log('Completed navigation to the next step.');
}
