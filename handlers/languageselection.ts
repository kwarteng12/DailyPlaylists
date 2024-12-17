import { Page } from 'playwright'; // Playwright import
import { selectLanguage } from '../languageUtils'; // Assuming this is already defined elsewhere


export async function navigateAndSelectLanguage(page: Page): Promise<void> {
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese', 'Afrikaans']; // List of languages
  const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
  console.log(`Selected language: ${randomLanguage}`);

  // Navigate to the language selection page
  await page.goto('https://staging.dailyplaylists.com/submit-song/select-languages');
  console.log('Navigated to language selection page.');

  // Search for the language using the search input
  const searchInputSelector = 'input[placeholder="Search for a Language"]';
  console.log(`Searching for language: ${randomLanguage}`);
  await page.fill(searchInputSelector, randomLanguage);
  await page.waitForTimeout(1000); // Wait for the search results to update

  // Select the language checkbox
  const languageLabelSelector = `label:has-text("${randomLanguage}")`; // Assuming label has the language text
  console.log(`Selecting the checkbox for ${randomLanguage}`);
  await page.click(languageLabelSelector);
  console.log(`${randomLanguage} language checkbox selected.`);

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
  await page.waitForSelector(nextButtonSelector);
  await page.click(nextButtonSelector);
  console.log('Clicked the "Next" button.');
}
