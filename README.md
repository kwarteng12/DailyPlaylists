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
