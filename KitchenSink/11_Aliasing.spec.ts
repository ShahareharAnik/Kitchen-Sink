import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Aliasing', async ({ page }) => {

    console.log("*************************************************Entering the Aliasing********************************************************");

    //Click on the Aliasing Button
    const Aliasing = page.locator("//ul[@class='home-list']//a[normalize-space()='Aliasing']");
    try{
        await expect(Aliasing).toBeVisible();
        console.log('The  Aliasing Button is Visiable')
    }catch(error){
        console.log('The Aliasing Button is not  Visiable', error)
    }
    await Aliasing.click();


    //Aliasing a DOM element
    console.log('1. Aliasing a DOM element')
    const firstBtn = page.locator('.as-table tbody > tr:first-child td:first-child button');
    await firstBtn.click();
    try{
         // Assert the button has the expected class and text
    await expect(firstBtn).toHaveClass(/btn-success/);
    await expect(firstBtn).toContainText('Changed');
    console.log("   The button has the expected class and text")
    }catch(error){
        console.error("There is an error: " ,error)
    }


    await page.waitForTimeout(3000)
})