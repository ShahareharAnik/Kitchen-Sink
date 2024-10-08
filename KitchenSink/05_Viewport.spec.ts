import { test, expect } from '@playwright/test';
import {  KitchenSink } from './Pages/KitchenSinkPage';



test.beforeEach(async ({ page }) => {
    const kitchenSink = new KitchenSink(page)
    kitchenSink.gotoKitchenSink(page);
});

test('Viewport', async ({ page }) => {

    console.log("*************************************************Entering the Viewport********************************************************");
    const kitchenSink = new KitchenSink(page)
    //Click on the Querying Button
    kitchenSink.gotoViewport();
    // Set the viewport size to 320x480
    await page.setViewportSize({ width: 320, height: 480 });
    await page.waitForTimeout(2000);
    // Example: Check visibility of navbar and its collapsed version
    const navbar = page.locator('#navbar');
    //await expect(navbar).toBeVisible();
    await page.waitForTimeout(2000);
    // Change to a larger screen size (2999x2999)
    await page.setViewportSize({ width: 2999, height: 2999 });
    await page.waitForTimeout(2000);
    // Macbook-15 size
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(2000);
    // iPhone 6 size (portrait)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(2000);
    // iPhone 6 size (landscape)
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(2000);


})