import { test } from '@playwright/test';
import { startFromDashboard, goToSubmitSongForm } from '../handlers/standardSong';
import { searchAndClickRandomSong } from '../handlers/SearchSongHandler';
import { navigateAndSelectGenre } from '../handlers/genreselection';  

test('should search, click a random song, select a random genre and proceed to the next step', async ({ page }) => {
  const email = 'nana+10@dailyplaylists.com';
  const password = 'Kduffour12$';

  // Start from login and navigate to the dashboard
  await startFromDashboard(page, email, password);

  // Navigate to the "Submit a song" form
  await goToSubmitSongForm(page);

  // Search for and click a random song
  await searchAndClickRandomSong(page);

  // Navigate to the genre selection page and select a random genre
  await navigateAndSelectGenre(page);

  // Click the "Next" button
  await page.getByRole('button', { name: 'Next' }).click();
});
