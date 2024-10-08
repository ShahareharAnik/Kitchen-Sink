import { test, expect } from '@playwright/test';
import {  KitchenSink } from './Pages/KitchenSinkPage';



test.beforeEach(async ({ page }) => {
    const kitchenSink = new KitchenSink(page)
    kitchenSink.gotoKitchenSink(page);
});

test('Navigation', async ({ page }) => {
    const kitchenSink = new KitchenSink(page)
    console.log("*************************************************Location the Navigation********************************************************");
    
    // Click on the Navigation Button
    kitchenSink.gotoNavigation();

    //Go Back 
    console.log("2. Go back to the main page")
    await page.goBack();
    try {
        await expect(page).toHaveURL('https://example.cypress.io/');
        await expect(page.url()).toContain('example.cypress.io');
    } catch (error) {
        console.log('There is a problem', error);
    }

    // Go forward
    console.log("3. Go forward to the another page")
    await page.goForward();
    try {
        await expect(page).toHaveURL('https://example.cypress.io/commands/navigation');
        await expect(page.url()).toContain('commands/navigation');
    } catch (error) {
        console.log('There is a problem', error);
    }



    //Reload the page
    console.log("4. Reload the page")
    // Reload the page
    try {
        await page.reload();
        await expect(page).toHaveURL('https://example.cypress.io/commands/navigation');
        console.log("   successfully reloaded the page")
    } catch (error) {
        console.log('There is a problem reloading the page:', error);
    }

    // Clear cookies and cache
    await page.context().clearCookies();
    await page.context().clearPermissions();
    console.log("   Clear cookies and cache")

    // Reload the page without using the cache
    try {
        await page.reload({ waitUntil: 'networkidle' }); // wait until the network is idle
        await expect(page).toHaveURL('https://example.cypress.io/commands/navigation');
        console.log("   Reload the page without using the cache")
    } catch (error) {
        console.log('There is a problem with the hard reload:', error);
    }



    //visit the page
    console.log("5. visit the page")
    const url = 'https://example.cypress.io/commands/navigation';
    // Visit the URL with a timeout and custom callbacks
    try {
        // Visit the page
        await page.goto(url, {
        timeout: 50000, // increase total time for the visit to resolve
        waitUntil: 'load' // wait until the page is fully loaded
        });

        // Perform actions or assertions after visiting the page
        // You can use page.evaluate() to access the contentWindow or other properties if needed
        await page.evaluate(() => {
        console.log('Page loaded');
        // You can also interact with the window object here
        });

        // Example assertion to check that the page title is correct
        await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
    } catch (error) {
        console.error('There is a problem visiting the page:', error);
    }
})