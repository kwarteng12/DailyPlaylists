import { Page } from 'playwright';

export async function selectGenre(page: Page, genre: string): Promise<void> {
    const genreSearchInputSelector = 'input[placeholder="Search for a genre"]';
    const genreCheckboxSelector = `label.Checkbox__ItemTitle-d55hn2-1.lobCjY`;

    await page.fill(genreSearchInputSelector, genre);
    await page.waitForSelector(genreCheckboxSelector, { timeout: 5000 });
    const genreCheckbox = await page.$(genreCheckboxSelector);

    if (genreCheckbox) {
        await genreCheckbox.click();
    } else {
        throw new Error(`Genre "${genre}" not found.`);
    }
}
