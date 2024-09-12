import { test, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Helper function to load a fixture file
function loadFixture(filename: string): object {
  const filePath = path.resolve(__dirname, 'fixtures', filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  console.log('Loaded fixture data:', data); // Log the raw JSON data
  return JSON.parse(data);
}

// Helper function to write data to a file
function writeFile(filePath: string, data: string | object): void {
  const fullPath = path.resolve(__dirname, filePath);
  
  // Ensure the directory exists
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  fs.writeFileSync(fullPath, content, 'utf-8');
}

test('Use fixture in request interception', async ({ page }: { page: Page }) => {
    // Load fixture data
    let fixtureData: object;
    try {
      fixtureData = loadFixture('example.json');
      console.log('Fixture data loaded successfully:', fixtureData);
    } catch (error) {
      console.error('Failed to load fixture data:', error);
      throw error;
    }
  
    // Log outgoing requests
    page.on('request', request => {
      console.log('Request made:', request.url());
    });

    // Log responses
    page.on('response', response => {
      console.log('Response received:', response.url(), response.status());
    });
  
    // Intercept the GET request and respond with fixture data
    await page.route('**/comments/1', async route => {
      console.log('Intercepting request:', route.request().url()); // Log to verify
      await route.fulfill({
        status: 200,
        body: JSON.stringify(fixtureData),
        contentType: 'application/json'
      });
    });
  
    // Navigate to the page
    await page.goto('https://example.cypress.io/commands/files');
    console.log('Page loaded');
  
    // Wait for the button to be visible and enabled
    await page.waitForSelector(".fixture-btn.btn.btn-primary", { state: 'visible' });
    const GetComment = await page.locator(".fixture-btn.btn.btn-primary");
  
    // Optionally, take screenshots for debugging
    await page.screenshot({ path: path.resolve(__dirname, 'Screenshots', 'before-click.png') });
  
    // Ensure the button is visible and enabled before clicking
    console.log('Clicking the Get Comment button');
    await GetComment.click({ timeout: 10000, force: true });
  
    // Optionally, take another screenshot after clicking
    await page.screenshot({ path: path.resolve(__dirname, 'Screenshots', 'after-click.png') });
    
    await GetComment.click({ timeout: 10000, force: true });
    // Wait for and handle the response
    try {
      const response = await page.waitForResponse(response => {
        console.log('Checking response URL:', response.url()); // Log URL being checked
        console.log('Checking response status:', response.status()); // Log status being checked
        
        return response.url().includes('comments/1') && response.status() === 200;
      }, { timeout: 60000 }); // Increase timeout if necessary
  
      const responseBody = await response.json();
      console.log('Response body:', responseBody);

      

      // Optionally, write the response to a file
      writeFile('fixtures/write.json', responseBody);
      console.log('Response written to file successfully');
    } catch (error) {
      console.error('An error occurred while waiting for or handling the response:', error);
    }
  
    await page.waitForTimeout(3000);
});
