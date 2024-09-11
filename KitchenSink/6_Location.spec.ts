import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Location', async ({ page }) => {

    console.log("*************************************************Location the Querying********************************************************");

    // Click on the Querying Button
    const Location = page.locator("//ul[@class='home-list']//a[normalize-space()='Location']");
    try {
        await expect(Location).toBeVisible();
        console.log('The Location Button is Visible');
    } catch (error) {
        console.log('The Location Button is not Visible', error);
    }
    await Location.click();

    // Location properties
    console.log("1. URL Location properties");

    const location = await page.evaluate(() => window.location);

    const locationHash = location.hash;
    const locationHref = location.href;
    const locationHost = location.host;
    const locationHostName = location.hostname;
    const locationOrigin = location.origin;
    const locationPathname = location.pathname;
    const locationPort = location.port;
    const locationProtocol = location.protocol;
    const locationSearch = location.search;
    const currentUrl = await page.url();

    console.log('   Current URL : ', currentUrl);
    console.log('   Location Hash:', locationHash);
    console.log('   Location Href:', locationHref);
    console.log('   Location Host:', locationHost);
    console.log('   Location Hostname:', locationHostName);
    console.log('   Location Origin:', locationOrigin);
    console.log('   Location Pathname:', locationPathname);
    console.log('   Location Port:', locationPort);
    console.log('   Location Protocol:', locationProtocol);
    console.log('   Location Search:', locationSearch);

    // Perform assertions
    try {
        expect(currentUrl).toBe('https://example.cypress.io/commands/location'); // Call the method to get the URL
        expect(locationHash).toBe('');
        expect(locationHref).toBe('https://example.cypress.io/commands/location');
        expect(locationHost).toBe('example.cypress.io');
        expect(locationHostName).toBe('example.cypress.io');
        expect(locationOrigin).toBe('https://example.cypress.io');
        expect(locationPathname).toBe('/commands/location');
        expect(locationPort).toBe(''); // Default for HTTPS
        expect(locationProtocol).toBe('https:');
        expect(locationSearch).toBe('');
    } catch (error) {
        console.error("   An error Occurred: ", error);
    }
});
