import { Page } from "@playwright/test";
import { login } from "./loginHandler";

// Function to land on the wallet page after logging in
export async function landOnWalletPage(
  page: Page,
  email: string,
  password: string
): Promise<number> {
  console.log("Logging in and navigating to the wallet page...");

  const loginSuccess = await login(page, email, password);

  if (!loginSuccess) {
    console.log("Login failed. Exiting...");
    throw new Error("Login failed. Cannot land on the wallet page.");
  }

  console.log("Successfully logged in.");

  // Handle pop-ups
  const popupCloseButtonSelector =
    'svg[class="Icon__SvgStyled-j3bzl8-0 lgtvED"] use[href$="#x-light"]';
  for (let i = 0; i < 2; i++) {
    const popUpVisible = await page.isVisible(popupCloseButtonSelector);
    if (popUpVisible) {
      await page.click(popupCloseButtonSelector, { force: true });
      console.log(`Closed pop-up ${i + 1}.`);
      await page.waitForTimeout(1000);
    } else {
      console.log(`Pop-up ${i + 1} not found. Continuing...`);
      break;
    }
  }

  // Click on the dropdown menu button
  const dropdownButtonSelector = "div.UserImage__ImageButton-sc-1dewlsi-0.dDkfMd";
  console.log("Waiting for the dropdown button to be visible...");
  await page.waitForSelector(dropdownButtonSelector, { state: "visible", timeout: 10000 });
  await page.click(dropdownButtonSelector, { force: true });

  console.log("Waiting for 3 seconds...");
  await page.waitForTimeout(3000);

  // Click on the Wallet button
  const walletButtonSelector = 'a[href="/wallet"]';
  console.log("Waiting for the Wallet button to be visible...");
  await page.waitForSelector(walletButtonSelector, { state: "visible", timeout: 10000 });
  await page.click(walletButtonSelector, { force: true });

  console.log("Waiting for 2 seconds after clicking Wallet...");
  await page.waitForTimeout(2000);

  // Get the current number of premium credits
  const premiumCreditsSelector = "div.Text-vnjkjx-0.fucgei";
  const premiumCreditsText = await page.textContent(premiumCreditsSelector);
  const premiumCredits = parseInt(premiumCreditsText?.trim() || "0");
  console.log(`Current number of premium credits: ${premiumCredits}`);

  return premiumCredits;
}


// Fixed buyCredits function to handle iframes and other edge cases
export async function buyCredits(page: Page): Promise<void> {
  console.log("Filling in credit card details to buy 10 Premium Credits...");

  // Input data for the form
  const name = "Nana Test";
  const cardNumber = "4111 1111 1111 1111";

  // Fill in the name of the cardholder
  const nameSelector = 'input[placeholder="Name of cardholder"]';
  await page.fill(nameSelector, name);
  console.log("Entered name.");

  // Detect iframes on the page
  console.log("Detecting iframes on the page...");
  const frames = page.frames();
  if (frames.length === 0) {
    throw new Error("No iframes found on the page.");
  }

  // Log all frames for debugging
  frames.forEach((frame, index) => {
    console.log(`Frame ${index + 1}: URL - ${frame.url()}`);
  });

  // Locate the correct iframe by URL part or a different selector (e.g., by iframe's name or ID)
  const stripeIframe = frames.find((frame) => frame.url().includes("js.stripe.com"));
  if (!stripeIframe) {
    throw new Error("Iframe containing the card number input not found.");
  }

  console.log("Stripe iframe found. Switching context to the iframe...");

  // Wait for the card number input inside the iframe using the provided selector
  const cardNumberSelector = "#root > form > div > div.CardField-input-wrapper > span.CardField-number.CardField-child > span:nth-child(2) > div > div.CardNumberField-input-wrapper";
  const cardInputHandle = await stripeIframe.waitForSelector(cardNumberSelector, {
    state: "visible",
    timeout: 30000, // Timeout after 30 seconds
  });

  console.log("Card number field found inside the iframe.");

  // Fill in the card number
  await cardInputHandle.fill(cardNumber);
  console.log("Entered card number.");
}
