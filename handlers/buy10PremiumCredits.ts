import { expect, Page } from "@playwright/test";
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

  const popupCloseButtonSelectors = [
    'svg[class="Icon__SvgStyled-j3bzl8-0 lgtvED"] use[href$="#x-light"]', // First pop-up selector
    'svg.Icon__SvgStyled-j3bzl8-0.hgbHlU use[href$="#close"]' // Second pop-up selector
  ];
  
  let popUpCount = 0;
  
  while (popUpCount < popupCloseButtonSelectors.length) {
    try {
      const selector = popupCloseButtonSelectors[popUpCount];
      console.log(`Checking for pop-up ${popUpCount + 1} with selector: ${selector}...`);
  
      // Wait for the current pop-up to be visible
      await page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
      await page.click(selector); // Click the close button for the current pop-up
      console.log(`Closed pop-up ${popUpCount + 1}.`);
  
      popUpCount++;
      await page.waitForTimeout(1000); // Small delay between pop-up closures
    } catch (error) {
      console.log(`Pop-up ${popUpCount + 1} not found or already closed.`);
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

  // // Click on the dropdown menu button
  // const dropdownButtonSelector = "div.UserImage__ImageButton-sc-1dewlsi-0.dDkfMd";
  // console.log("Waiting for the dropdown button to be visible...");
  // await page.waitForSelector(dropdownButtonSelector, { state: "visible", timeout: 10000 });
  // await page.click(dropdownButtonSelector, { force: true });

 


const dropdownMenuSelector = 'div.styles__Wrapper-sc-1l5cdf5-0.TevDT'; // Parent wrapper
console.log("Clicking the dropdown menu...");
await page.waitForSelector(dropdownMenuSelector, { state: "visible", timeout: 10000 });
await page.click(dropdownMenuSelector);

console.log("Waiting for 1 second...");
await page.waitForTimeout(1000);

  // Click on the Wallet button
  const walletButtonSelector = 'a[href="/wallet"]';
  console.log("Waiting for the Wallet button to be visible...");
  await page.waitForSelector(walletButtonSelector, { state: "visible", timeout: 10000 });
  await page.click(walletButtonSelector, { force: true });

  console.log("Waiting after clicking Wallet...");
  await page.waitForTimeout(700);

  // Get the current number of premium credits
  const premiumCreditsSelector = "div.Text-vnjkjx-0.fucgei";
  const premiumCreditsText = await page.textContent(premiumCreditsSelector);
  const premiumCredits = parseInt(premiumCreditsText?.trim() || "0");
  console.log(`Current number of premium credits: ${premiumCredits}`);

  return premiumCredits;
}

export async function buyCredits(page: Page): Promise<void> {
  console.log("Filling in credit card details to buy 10 Premium Credits...");

  const name = "Nana Test";
  const cardNumber = "4111 1111 1111 1111";

  // Fill in the cardholder's name
  const nameSelector = 'input[placeholder="Name of cardholder"]';
  console.log("Waiting for the name input field...");
  await page.waitForSelector(nameSelector, { state: "visible", timeout: 10000 });
  await page.fill(nameSelector, name);
  console.log("Entered name.");

  // Detect all iframes on the page
  console.log("Detecting iframes on the page...");
  const iframes = page.frames();
  console.log(`Found ${iframes.length} iframes.`);

  // Identify the Stripe iframe containing the card number input
  let stripeIframe;
  for (const iframe of iframes) {
    const frameUrl = iframe.url();
    console.log(`Inspecting iframe: ${frameUrl}`);
    if (frameUrl.includes("elements-inner-card")) {
      stripeIframe = iframe;
      console.log("Stripe iframe containing the card number input found.");
      break;
    }
  }

  if (!stripeIframe) {
    throw new Error("Failed to find the Stripe iframe containing the card input.");
  }

  // Wait for the card number input field inside the iframe
  const cardNumberSelector = 'input[name="cardnumber"]';
  console.log("Waiting for the card number input field inside the iframe...");
  const cardNumberInput = await stripeIframe.waitForSelector(cardNumberSelector, {
    state: "visible",
    timeout: 30000,
  });
  console.log("Card number field found inside the iframe.");

  // Fill in the card number
  await cardNumberInput.fill(cardNumber);
  console.log("Entered card number.");

  // Fill in expiry date, CVC, and ZIP code (all inside the iframe)
  const expirySelector = 'input[name="exp-date"]';
  const cvcSelector = 'input[name="cvc"]';
  const zipCodeSelector = 'input[name="postal"]';  // Adjusted the ZIP code selector

  console.log("Waiting for expiry date, CVC, and ZIP code fields...");
  await stripeIframe.fill(expirySelector, "12/34");
  console.log("Entered expiry date.");

  await stripeIframe.fill(cvcSelector, "123");
  console.log("Entered CVC.");

  await stripeIframe.fill(zipCodeSelector, "11111");
  console.log("Entered ZIP code.");

  const premiumCreditsIconSelector = 'svg.styles__CuratorIcon-xky8nk-1.ljBjgQ.Icon__SvgStyled-j3bzl8-0.qlBfq'; // The SVG icon selector

  console.log("Waiting for the 10 Premium Credits icon...");
  await page.waitForSelector(premiumCreditsIconSelector, { state: "visible", timeout: 20000 }); // Wait for the icon to be visible
  await page.click(premiumCreditsIconSelector); // Click the icon
  console.log("Selected 10 Premium Credits.");

  // Click the Purchase button immediately after selecting the credits
  const purchaseButtonSelector = 'button.styles__Wrapper-sc-1rnch9w-0.kfExAf';
  console.log("Clicking the Purchase button...");
  await page.click(purchaseButtonSelector);  // Click the purchase button
  console.log("Clicked the Purchase button.");

  // Add a 5-second delay after purchasing
  console.log("Waiting for 5 seconds after purchase...");
  await page.waitForTimeout(5000);  // Wait for 5 seconds

  // Confirm the success message
  const successMessageSelector = 'div.Text-vnjkjx-0.bQfTfi';
  console.log("Waiting for the success message...");
  await page.waitForSelector(successMessageSelector, { state: "visible", timeout: 10000 });
  console.log("Success message confirmed.");

  // Click the Continue button
  const continueButtonSelector = 'button.styles__Wrapper-sc-1rnch9w-0.kfExAf';
  console.log("Clicking the Continue button...");
  await page.click(continueButtonSelector);
  console.log("Clicked the Continue button.");

 // Wait for the page to settle and wait for the premium credits element to be visible again
 console.log("Waiting for the page to settle after refresh...");
 await page.waitForTimeout(5000); // Wait for 5 seconds

 console.log("Waiting for the updated premium credits...");
 await page.waitForSelector('div.Text-vnjkjx-0.fucgei', { state: 'visible' });

 // Get the updated premium credits directly from the page
 const updatedCreditsText = await page.textContent('div.Text-vnjkjx-0.fucgei');
 const updatedCredits = parseInt(updatedCreditsText?.trim() || "0");
 console.log(`Updated premium credits: ${updatedCredits}`);

}
