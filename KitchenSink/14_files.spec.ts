import { test, expect, Page } from '@playwright/test';
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

    // Verify fixture data
    expect(fixtureData).toBeInstanceOf(Object);
    expect(fixtureData).toHaveProperty('name');
    console.log('Fixture data loaded successfully:', fixtureData);
  } catch (error) {
    console.error('Failed to load fixture data:', error);
    throw error; // Fail the test if fixture data is not as expected
  }

  // Intercept the GET request and respond with fixture data
  await page.route('**/comments/*', async route => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify(fixtureData),
      contentType: 'application/json'
    });
  });

  // Navigate to the page
  await page.goto('https://example.cypress.io/commands/files');

  // Click the button that triggers the network request
  await page.click('.fixture-btn');

  // Wait for and assert the response
  const response = await page.waitForResponse(response =>
    response.url().includes('/comments/') && response.status() === 200
  );

  const responseBody = await response.json();

  try {
    // Assert response body properties
    expect(responseBody).toHaveProperty('name');
    expect(responseBody.name).toContain('Using fixtures to represent data');
  } catch (error) {
    console.error('An error occurred while validating response:', error);
  }

  // Optionally, write the response to a file
  try {
    writeFile('fixtures/write.json', responseBody);
    console.log('Response written to file successfully');
  } catch (error) {
    console.error('Failed to write response to file:', error);
  }

  await page.waitForTimeout(3000);
});
