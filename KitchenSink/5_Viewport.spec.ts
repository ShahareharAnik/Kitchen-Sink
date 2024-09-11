import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Viewport', async ({ page }) => {

    console.log("*************************************************Entering the Viewport********************************************************");

    //Click on the Querying Button
    const Viewport = page.locator("//ul[@class='home-list']//a[normalize-space()='Viewport']");
    try{
        await expect(Viewport).toBeVisible();
        console.log('The  Viewport Button is Visiable')
    }catch(error){
        console.log('The Viewport Button is not  Visiable', error)
    }
    await Viewport.click();



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