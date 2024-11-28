import { test } from '@playwright/test';
import { startFromDashboard, goToSubmitSongForm } from '../handlers/standardSong';
import { searchAndClickRandomSong } from '../handlers/SearchSongHandler';
import { navigateAndSelectGenre } from '../handlers/genreselection';  

test('should search, click a random song, and select a random genre', async ({ page }) => {
  const email = 'nana+10@dailyplaylists.com';
  const password = 'Kduffour12$';

  //start from login and navigate to the dashboard
  await startFromDashboard(page, email, password);

  //navigate to the "Submit a song" form
  await goToSubmitSongForm(page);

  //search for and click a random song
  await searchAndClickRandomSong(page);

  //Navigate to the genre selection page and select a random genre
  await navigateAndSelectGenre(page);
});
