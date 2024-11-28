// handlers/searchsonghandler.ts
import { Page } from '@playwright/test';

export async function searchAndClickRandomSong(page: Page): Promise<void> {
    console.log("Starting random song search process...");
  
    // Array of random search terms
    const searchTerms = ['A', 'B', 'C', 'D', 'E', 'Z', 'Pop', 'Rock', 'Love'];
    const searchInputSelector = 'input[placeholder="Search Your Track or Artist Name"]';
    const searchResultSelector = 'div.styles__Item-fh2tnx-6';
    const clickTargetSelector = 'div.styles__ItemImage-fh2tnx-8 img'; // Update this to target the correct clickable element
  
    let attempts = 0;
  
    while (attempts < searchTerms.length) {
      // Pick a random search term
      const randomSearchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
      console.log(`Attempting search with term: "${randomSearchTerm}"`);
  
      // Type the random term into the search input
      await page.fill(searchInputSelector, randomSearchTerm);
  
      // Wait for results to load or timeout if none appear
      try {
        await page.waitForSelector(searchResultSelector, { timeout: 5000 });
        console.log("Search results loaded.");
  
        // Get all visible results
        const searchResults = await page.$$(searchResultSelector);
  
        if (searchResults.length === 0) {
          console.log(`No results found for "${randomSearchTerm}". Retrying with another term...`);
          attempts++;
          continue;
        }
  
        console.log(`Found ${searchResults.length} results for "${randomSearchTerm}".`);
  
        // Select a random result and click the image or icon
        const randomResult = searchResults[Math.floor(Math.random() * searchResults.length)];
        const clickableElement = await randomResult.$(clickTargetSelector);
  
        if (clickableElement) {
          await clickableElement.click();
          console.log("Clicked on the image or icon of a random song.");
  
          // Add a 3-second delay after clicking the song
          //await page.waitForTimeout(2000);
          //console.log("Waited 3 seconds after clicking the song.");
          return;
        } else {
          console.log("No clickable element found in this result. Retrying...");
          attempts++;
        }
      } catch (error) {
        console.log(`No results or search timeout for "${randomSearchTerm}". Retrying...`);
        attempts++;
      }
    }
  
    throw new Error("Failed to find any songs after multiple attempts.");
  }
  