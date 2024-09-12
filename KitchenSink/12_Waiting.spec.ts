import { test, expect } from '@playwright/test';
import { error } from 'console';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Waiting', async ({ page }) => {

    console.log("*************************************************Entering the Waiting********************************************************");

    //Click on the Waiting Button
    const Waiting = page.locator("//ul[@class='home-list']//a[normalize-space()='Waiting']");
    try{
        await expect(Waiting).toBeVisible();
        console.log('The  Waiting Button is Visiable')
    }catch(error){
        console.log('The Waiting Button is not  Visiable', error)
    }
    await Waiting.click();



    // Type in the first input and wait 1000ms
    await page.locator('.wait-input1').type('Wait 1000ms after typing');
    await page.waitForTimeout(1000);

    // Type in the second input and wait 1000ms
    await page.locator('.wait-input2').type('Wait 1000ms after typing');
    await page.waitForTimeout(1000);

    // Type in the third input and wait 1000ms
    await page.locator('.wait-input3').type('Wait 1000ms after typing');
    await page.waitForTimeout(1000);



   // Start listening to network requests
    const [response] = await Promise.all([
        page.waitForResponse(response => response.url().includes('/comments/') && response.status() === 200),
        page.locator('.network-btn').click(), // Trigger the network request
    ]);

    try{
        const statusCode = response.status();
        console.log('   The status code is : ', statusCode)
        expect([200, 304]).toContain(statusCode);
    }catch(error){
        console.error('An error occer : ',error)}

})