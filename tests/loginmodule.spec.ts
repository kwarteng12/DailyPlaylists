// tests/module.spec.ts
import { test } from '@playwright/test';
import { login } from '../handlers/loginHandler';

test.describe('Spotify Login Tests', () => {

  test('should login successfully with valid credentials', async ({ page }) => {
    const email = 'nana+10@dailyplaylists.com';
    const password = 'Kduffour12$';

    const loginSuccessful = await login(page, email, password);

    if (loginSuccessful) {
      console.log('Login succeeded: User is successfully logged in.');
    } else {
      console.log('Login failed: Login should have succeeded with valid credentials.');
    }

    test.expect(loginSuccessful).toBeTruthy();
  });

  test('should fail login with invalid credentials', async ({ page }) => {
    const email = 'nanasad@gmail.com';
    const password = 'sadsd123';

    const loginSuccessful = await login(page, email, password);

    if (!loginSuccessful) {
      console.log('Login failed: Incorrect credentials, as expected.');
    } else {
      console.log('Login succeeded unexpectedly with invalid credentials.');
    }

    test.expect(loginSuccessful).toBeFalsy();
  });

});
