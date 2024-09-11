import { test, expect } from '@playwright/test';
import { isContext } from 'vm';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Querying', async ({ page }) => {

    console.log("*************************************************Entering the Connectors********************************************************");

    //Click on the Querying Button
    const Connectors = page.locator("//ul[@class='home-list']//a[normalize-space()='Connectors']");
    try{
        await expect(Connectors).toBeVisible();
        console.log('The  Connectors Button is Visiable')
    }catch(error){
        console.log('The Connectors Button is not  Visiable', error)
    }
    await Connectors.click();

    //Iterate over elements and extract data
    console.log("Iterate over elements and extract data")
    const elements = page.locator('.connectors-each-ul > li');
    // Evaluate each element
    await elements.evaluateAll(async (nodes) => {
    for (const [index, node] of nodes.entries()) {
        const textContent = node.textContent;
        const attribute = node.getAttribute('data-attribute');

        console.log(`Index: ${index}, Text: ${textContent}, Attribute: ${attribute}`);
        }
    });

})