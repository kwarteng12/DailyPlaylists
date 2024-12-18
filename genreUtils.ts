import { Page } from 'playwright';

export async function selectGenre(page: Page, genre: string): Promise<void> {
    const genreSearchInputSelector = 'input[placeholder="Search for a genre"]';
    const genreCheckboxSelector = `label.Checkbox__ItemTitle-d55hn2-1.lobCjY`;

    console.log(`Typing genre: ${genre}`);

    // Type the genre into the search input field
    await page.fill(genreSearchInputSelector, genre);

    // Wait for the checkbox to be visible
    await page.waitForSelector(genreCheckboxSelector, { state: 'visible' });

    // Select the checkbox for the selected genre
    console.log(`Selecting checkbox for genre: ${genre}`);
    const genreCheckbox = await page.$(genreCheckboxSelector);

    if (genreCheckbox) {
        await genreCheckbox.click();
        console.log(`Selected checkbox for genre: ${genre}`);
    } else {
        throw new Error(`Genre "${genre}" not found.`);
    }
}
