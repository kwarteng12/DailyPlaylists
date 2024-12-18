This project automates testing for using Playwright, with support for Visual Studio Code debugging.

Prerequisites
1. Node.js 
2. Playwright - Install with:
````````Copy code
````````npm install @playwright/test
````````npx playwright install

Project Structure
````````src/loginHandler.ts: Contains the login function to handle login logic.
````````tests/module.spec.ts: Includes tests for valid and invalid login credentials.
Usage

1. Clone the Repository:

Copy code
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository


2. Install Dependencies:

Copy code
npm install
Run Tests:


Copy code
npx playwright test


Test Overview

Valid Login Test: Ensures login succeeds with correct credentials.
Invalid Login Test: Confirms login fails with incorrect credentials.



HOW TO RUN EACH TESTS.

I would advice you run each test in isolation and not all at once.

You could obviously just run **npx playwright test** command but there would possibly be a timeout.

1. For standard Song Submission test run the command below:
npx playwright test tests/standardsong.spec.ts --headed  

2. For 10 premium credits purchase test run the command below:
npx playwright test tests/10premiumcredits.spec.ts --headed

Note: --headed command is used to run tests with a visible browser window. By default, Playwright runs browsers in "headless" mode, meaning the browser runs in the background without displaying a UI.

  
