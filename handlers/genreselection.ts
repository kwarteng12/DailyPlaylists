import { Page } from 'playwright';
import { selectGenre } from '../genreUtils';
import { selectLanguage } from './languageUtils'; 

export async function navigateAndSelectGenre(page: Page): Promise<void> {
  const genres = ['Hip Hop', 'Trap', 'Rap', 'Acoustic', 'Pop', 'Jazz', 'Electronic'];
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  console.log(`Selected genre: ${randomGenre}`);

  // Navigate to the genre selection page
  await page.waitForURL('https://staging.dailyplaylists.com/submit-song/select-genres');
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

  // Click the "Next" link to proceed to the next page
  console.log('Clicking the "Next" link...');
  await page.click('a[href="/submit-song/select-languages"]');
  console.log('Clicked the "Next" link.');

  // Log the current URL after clicking to check if navigation happened
  const currentUrl = page.url();
  console.log(`Current URL after click: ${currentUrl}`);

  // You can also add a brief wait to make sure the page has enough time to navigate
  await page.waitForTimeout(1000);

  // Confirm that the URL is the expected one
  if (currentUrl === 'https://staging.dailyplaylists.com/submit-song/select-languages') {
    console.log('Successfully navigated to the language selection page.');
  } else {
    console.log('Navigation to the language selection page failed.');
  }

  // Proceed to language selection
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese', 'Afrikaans']; 
  const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
  console.log(`Selected language: ${randomLanguage}`);

  // Pass both page and selected language to selectLanguage function
  await selectLanguage(page, randomLanguage);  // Pass language as second argument

  // Click the "Next" button after language selection to proceed to the next page
  console.log('Clicking the "Next" button after language selection...');
  await page.click('div a[href="/submit-song/confirm-settings"]');  // Clicking the "Next" button after language selection
  console.log('Clicked the "Next" button after language selection.');

  

// Click the second "Next" button after language selection to proceed to the next page
console.log('Clicking the second "Next" button after language selection...');
await page.click('a[href="/submit-song/type-selection"]');  // Click the second "Next" button
console.log('Clicked the second "Next" button after language selection.');

    // Log the current URL after clicking to check if navigation happened
  const finalUrl = page.url();
  console.log(`Current URL after click: ${finalUrl}`);


  // Click the "Go to Standard" button to proceed to standard submission page
  console.log('Clicking the "Go to Standard" button...');
  const goToStandardButtonSelector = 'button.styles__SubmitButton-nt5q67-6.hQUCSt';
  await page.waitForSelector(goToStandardButtonSelector, { state: 'visible' });
  await page.click(goToStandardButtonSelector);
  console.log('Clicked the "Go to Standard" button.');

  await page.waitForURL('https://staging.dailyplaylists.com/submit-song/standard-submission', { waitUntil: 'load' });
  console.log('Successfully navigated to the standard submission page.');


  await page.waitForTimeout(6000);
}


