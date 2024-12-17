import { Page } from 'playwright';

/**
 * Selects a language from the available options on the page using the search input.
 * @param page - The Playwright page instance.
 * @param language - The language to select.
 */
export async function selectLanguage(page: Page, language: string): Promise<void> {
  // The search input element to search for a language
  const searchInputSelector = 'input[placeholder="Search for a Language"]';
  console.log(`Searching for language: ${language}`);

  // Type the language into the search input field
  await page.fill(searchInputSelector, language);

  // Wait for the language results to be displayed (adjust timeout as needed)
  await page.waitForTimeout(1000); // Wait for results to show up, adjust timeout if necessary

  // Select the checkbox for the language
  const languageLabelSelector = `label:has-text("${language}")`; // Find the label corresponding to the language
  console.log(`Selecting the checkbox for ${language}`);
  
  // Wait for the label to be visible before clicking
  await page.waitForSelector(languageLabelSelector, { state: 'visible' });
  
  // Click the label to select the checkbox for that language
  await page.click(languageLabelSelector);
  console.log(`${language} language checkbox selected.`);
}
