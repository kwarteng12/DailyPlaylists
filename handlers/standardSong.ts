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

  const popupCloseButtonSelectors = [
    'svg[class="Icon__SvgStyled-j3bzl8-0 lgtvED"] use[href$="#x-light"]', // First pop-up selector
    'svg.Icon__SvgStyled-j3bzl8-0.hgbHlU use[href$="#close"]' // Second pop-up selector
  ];
  
  let popUpCount = 0;
  
  while (popUpCount < popupCloseButtonSelectors.length) {
    try {
      const selector = popupCloseButtonSelectors[popUpCount];
      console.log(`Checking for pop-up ${popUpCount + 1} with selector: ${selector}...`);
  
      // Wait for the current pop-up to be visible with a timeout
      const popUpVisible = await page.isVisible(selector, { timeout: 5000 }).catch(() => false);
  
      if (popUpVisible) {
        await page.click(selector); // Click the close button for the current pop-up
        console.log(`Closed pop-up ${popUpCount + 1}.`);
      } else {
        console.log(`Pop-up ${popUpCount + 1} not found or already closed.`);
        break; // Exit the loop if the pop-up is not found
      }
  
      popUpCount++;
      await page.waitForTimeout(1000); // Small delay between pop-up closures
    } catch (error) {
      console.log(`Error during pop-up closure: ${error}`);
      break;
    }
  }

  // Close cookie consent banner by clicking "Decline"
  const cookieDeclineButtonSelector = 'button[data-tid="banner-decline"]';
  console.log("Checking for the cookie consent banner...");
  const isCookieBannerVisible = await page.isVisible(cookieDeclineButtonSelector);
  if (isCookieBannerVisible) {
    console.log("Cookie consent banner found. Clicking 'Decline'...");
    await page.click(cookieDeclineButtonSelector);
    console.log("Declined cookie consent.");
  } else {
    console.log("No cookie consent banner found.");
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
  await page.waitForURL('https://staging.dailyplaylists.com/submit-song/add-song', { timeout: 10000 });

  console.log("Successfully navigated to the 'Submit a song' form.");
}

export async function selectStandardCredits(page: Page): Promise<void> {
  console.log("Starting standard credits selection...");

  // Selectors for deleting pre-selected genre and language
  const preSelectedGenreSelector = 'svg.Icon__SvgStyled-j3bzl8-0.deaSUe use[href$="#x-light"]';
  const preSelectedLanguageSelector = 'svg.Icon__SvgStyled-j3bzl8-0.deaSUe use[href$="#x-light"]';

  try {
    // Remove the pre-selected genre
    console.log("Looking for pre-selected genre to delete...");
    await page.waitForSelector(preSelectedGenreSelector, { state: 'attached', timeout: 5000 });
    await page.click(preSelectedGenreSelector);
    console.log("Pre-selected genre deleted.");
  } catch (error) {
    console.log("No pre-selected genre found or already deleted.");
  }

  try {
    // Remove the pre-selected language
    console.log("Looking for pre-selected language to delete...");
    await page.waitForSelector(preSelectedLanguageSelector, { state: 'attached', timeout: 5000 });
    await page.click(preSelectedLanguageSelector);
    console.log("Pre-selected language deleted.");
  } catch (error) {
    console.log("No pre-selected language found or already deleted.");
  }

 // Capture the initial number of remaining submissions
const submissionRemainingSelector = 'div.Text-vnjkjx-0.eyLuhb:text-matches("submissions remaining")'; // Match only the one with "submissions remaining" text
const initialRemainingText = await page.locator(submissionRemainingSelector).textContent();
const initialRemainingCount = parseInt(initialRemainingText?.match(/\d+/)?.[0] || '0', 10);
console.log(`Initial submission count: ${initialRemainingCount}`);

  // Locate the search bar and type "EDM Daily"
  const searchBarContainerSelector = 'div.styles__StyledSearchInput-sc-1n2ky5c-0.kAcqbu';
  const searchBarInputSelector = 'input[placeholder="Search for playlists"]';

  try {
    console.log("Locating the search bar container...");
    // Wait for the search bar container to be visible
    await page.waitForSelector(searchBarContainerSelector, { state: 'visible', timeout: 5000 });

    console.log("Locating the search bar input...");
    // Locate the input within the container
    const searchBarInput = await page.locator(searchBarContainerSelector).locator(searchBarInputSelector);

    // Ensure the input is visible and interact with it
    await searchBarInput.fill("EDM Daily");
    console.log("Typed 'EDM Daily' into the search bar.");
  } catch (error) {
    console.log("Failed to locate or interact with the search bar.");
  }

  console.log("Waiting for results to load...");
  await page.waitForTimeout(3000);

  const imageSelector = 'img[src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8459c1938e16e361e4e5072c56"]';

  // Select the second image element (index 1, assuming you want the second one)
  const imageElement = await page.locator(imageSelector).nth(1);
  
  try {
    console.log("Locating the image with the specified src...");
  
    // Wait for the image to be visible
    const isVisible = await imageElement.isVisible();
  
    if (isVisible) {
      console.log("Image found and is visible. Attempting to click...");
  
      // Ensure the element is interactable and click it
      await imageElement.scrollIntoViewIfNeeded();
      await imageElement.click({ force: true });
      console.log("Clicked on the image.");
    } else {
      console.log("Image is not visible.");
    }
  } catch (error) {
    console.log("Failed to locate or click on the image. Error:", error);
  }

  // Wait for any changes in the submission count (you can adjust the delay if necessary)
  await page.waitForTimeout(3000); // 3 seconds delay

  // Check the submission count again after interaction
  const updatedRemainingText = await page.locator(submissionRemainingSelector).textContent();
  const updatedRemainingCount = parseInt(updatedRemainingText?.match(/\d+/)?.[0] || '0', 10);

  console.log(`Updated submission count: ${updatedRemainingCount}`);

  // Verify the submission count has decreased by 1
  if (updatedRemainingCount === initialRemainingCount - 1) {
    console.log("Submission count correctly reduced by 1.");
  } else {
    console.log("Submission count did not reduce by 1. Initial:", initialRemainingCount, "Updated:", updatedRemainingCount);
  }

  const continueButtonSelector = 'button.desktop__ContinueButton-sc-1bdmm14-4.eesRVK';
  try {
    console.log("Locating the 'Continue' button...");
    await page.waitForSelector(continueButtonSelector, { state: 'visible', timeout: 5000 });
    await page.click(continueButtonSelector);
    console.log("Clicked 'Continue' to proceed.");
  } catch (error) {
    console.log("Failed to locate or click the 'Continue' button.");
  }

  console.log("Navigating to the 'Continue and submit' button...");

  const finalContinueButtonSelector = 'button.styles__Wrapper-sc-1rnch9w-0.knywXL';
  
  try {
    console.log("Locating the 'Continue and submit' button...");
    await page.waitForSelector(finalContinueButtonSelector, { state: 'visible', timeout: 5000 });
    await page.click(finalContinueButtonSelector);
    console.log("Clicked 'Continue and submit' to finalize the submission.");
  } catch (error) {
    console.log("Failed to locate or click the 'Continue and submit' button.");
  }
  console.log("Waiting for Submission to Complete...");
  await page.waitForTimeout(5000); // 3 seconds delay
}


