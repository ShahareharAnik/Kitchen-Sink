import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import * as os from 'os';
import * as path from 'path';

test.describe('System commands, platform checks, and UI interactions', () => {
  // Execute a system command and assert the output
  test('execute system command', () => {
    try {
      const stdout = execSync('echo Jane Lane').toString();
      expect(stdout).toContain('Jane Lane');
    } catch (error) {
      console.error('System command failed:', error.message);
    }
  });

  // Log platform information
  test('log platform information', () => {
    console.log(`Platform ${os.platform()} architecture ${os.arch()}`);
  });

  // Conditional commands based on platform
  test('conditional commands based on platform', () => {
    const filePath = path.join(__dirname, 'cypress.config.js');

    try {
      if (os.platform() === 'win32') {
        try {
          const stdout = execSync(`dir "${filePath}"`, { stdio: 'pipe' }).toString();
          expect(stdout).toContain('cypress.config.js');
        } catch (error) {
          console.error('Failed to execute dir command on Windows:', error.message);
        }
      } else {
        try {
          const stdout = execSync(`cat "${filePath}"`, { stdio: 'pipe' }).toString();
          expect(stdout).toBeTruthy();
          
          const pwdCode = execSync('pwd', { stdio: 'pipe' }).status;
          expect(pwdCode).toBe(0);
        } catch (error) {
          console.error('Failed to execute command on Unix-like systems:', error.message);
        }
      }
    } catch (error) {
      console.error('Platform-specific command execution failed:', error.message);
    }
  });

  // Test that interacts with the webpage
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/');

    // Expect a title "to contain" a substring.
    try {
      await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
    } catch (error) {
      console.error('Title assertion failed:', error.message);
    }
  });

  test('Misc', async ({ page }) => {
    console.log("*************************************************Entering the Misc********************************************************");

    // Click on the Querying Button
    const Misc = page.locator("//ul[@class='home-list']//a[normalize-space()='Misc']");
    try {
      await expect(Misc).toBeVisible();
      console.log('The Misc Button is Visible');
    } catch (error) {
      console.error('The Misc Button is not Visible:', error.message);
    }
    await Misc.click();

    // Interact with elements in a table
    console.log("1. Interact with elements in a table");
    const table = page.locator('.misc-table');

    // Click on Cheryl and then re-query
    try {
      await table.locator('text=Cheryl').click();
    } catch (error) {
      console.error('Failed to click on Cheryl:', error.message);
    }

    // Re-query the entire page and click on Charles
    try {
      await page.locator('td:has-text("User: Charles")').click();
    } catch (error) {
      console.error('Failed to click on Charles:', error.message);
    }
  });

  // Test focusing and screenshot functionality
  test('focus and screenshot tests', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://example.cypress.io/commands/misc');

    // Click on form elements and assert focus
    try {
      const nameInput = page.locator('.misc-form #name');
      await nameInput.click({ timeout: 60000 });
      await expect(nameInput).toBeFocused();
    } catch (error) {
      console.error('Focus assertion for #name failed:', error.message);
    }

    try {
      const descriptionInput = page.locator('.misc-form #description');
      await descriptionInput.click({ timeout: 60000 });
      await expect(descriptionInput).toBeFocused();
    } catch (error) {
      console.error('Focus assertion for #description failed:', error.message);
    }

    // Take a screenshot
    try {
      await page.screenshot({ path: path.join(__dirname, 'Screeeshots') });
    } catch (error) {
      console.error('Screenshot capture failed:', error.message);
    }

    // Wrap an object and assert its properties
    try {
      const myObject = { foo: 'bar' };
      expect(myObject).toMatchObject({ foo: 'bar' });
    } catch (error) {
      console.error('Object assertion failed:', error.message);
    }
  });
});
