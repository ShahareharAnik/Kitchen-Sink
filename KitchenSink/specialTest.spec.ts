import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
  });

test('Actions', async ({ page }) => {
    console.log("*************************************************Entering the Actions********************************************************");
      //Click on the Actions Button
      const Querying = page.locator("//ul[@class='home-list']//a[normalize-space()='Actions']");
      try{
          await expect(Querying).toBeVisible();
          console.log('The  Actions Button is Visiable')
      }catch(error){
          console.log('The Actions Button is not  Visiable', error)
      }
      await Querying.click();
 
 //Click on Canvas
 console.log("8. Click on Canvas")
 const actionButton = page.locator('.action-btn')
 actionButton.click()
 await page.waitForTimeout(2000);
 const canvas = page.locator('#action-canvas');
   // Click at specific coordinates
//    await canvas.click({ position: { x: 80, y: 75 } });
//    await page.waitForTimeout(2000);
//    await canvas.click({ position: { x: 170, y: 75 } });
//    await page.waitForTimeout(2000);
//    await canvas.click({ position: { x: 80, y: 165 } });
//    await page.waitForTimeout(2000);
//    await canvas.click({ position: { x: 100, y: 185 } });
//    await page.waitForTimeout(2000);
//    await canvas.click({ position: { x: 125, y: 190 } });
//    await page.waitForTimeout(2000);
//    await canvas.click({ position: { x: 150, y: 185 } });
//    await canvas.click({ position: { x: 170, y: 165 } });

     // Click multiple elements
const labels = page.locator("//div//span[@class='label label-primary']");

const labelCount = await labels.count();
for (let i = 0; i < labelCount; i++) {
  await labels.nth(i).click();
  await page.waitForTimeout(100);
}

await page.waitForTimeout(5000); 

    
})  