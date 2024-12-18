import { Page } from 'playwright';


export async function selectLanguage(page: Page, language: string): Promise<void> {
  const languageSearchInputSelector = 'input[placeholder="Search for a Language"]';
  const languageCheckboxSelector = `label.Checkbox__ItemTitle-d55hn2-1.lobCjY`;  

  console.log(`Typing language: ${language}`);

  // Type the language into the search input field
  await page.fill(languageSearchInputSelector, language);

  // Wait for the checkbox to be visible
  await page.waitForSelector(languageCheckboxSelector, { state: 'visible' });

  // Select the checkbox for the selected language
  console.log(`Selecting checkbox for language: ${language}`);
  const languageCheckbox = await page.$(languageCheckboxSelector);

  if (languageCheckbox) {
    await languageCheckbox.click();
    console.log(`Selected checkbox for language: ${language}`);
  } else {
    throw new Error(`Language "${language}" checkbox not found.`);
  }
}
