import { test, expect } from '@playwright/test';
import {  KitchenSink } from './Pages/KitchenSinkPage';



test.beforeEach(async ({ page }) => {
    const kitchenSink = new KitchenSink(page)
    kitchenSink.gotoKitchenSink(page);
});

test('Location', async ({ page }) => {

    console.log("*************************************************Location the Querying********************************************************");
    const kitchenSink = new KitchenSink(page)
    // Click on the Location Button
    kitchenSink.gotoLocation();

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
