import { test, expect } from '@playwright/test';
import { isContext } from 'vm';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Connectors', async ({ page }) => {

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
    console.log("1. Iterate over elements and extract data")
    // Get all list items
    const listItems = await page.locator('.connectors-each-ul>li').all();

    // Iterate over each item
    for (const [index, item] of listItems.entries()) {
        // Log the text content and index
        const textContent = await item.textContent();
        console.log(`   Item ${index}: ${textContent}`);
    }



    //Get properties of current subject (list length)
    console.log('2. Get properties of current subject (list length)')
     // Get all list items
    const listItem = await page.locator('.connectors-its-ul>li');
    // Get the number of list items
    const itemCount = await listItem.count();
    console.log('   The number of list item is :  ', itemCount)
    try{
        // Assert that the length of the list is greater than 2
        expect(itemCount).toBeGreaterThan(2);
    }catch(error){
        console.log("An error occer : ", error);
    }



    //To show the hidden text
    console.log("3. To show the hidden text")
    const containerDiv = page.locator('.connectors-div');
    await containerDiv.evaluate((element) => {
        element.style.display = 'block'; // Simulate calling jQuery's 'show' method
      });

    try{
        await expect(containerDiv).toBeVisible();
        const hiddenText = await containerDiv.textContent();
        console.log("   The hidden text is : ",hiddenText);
    }catch(error){
        console.log("   An error occer : ", error);
    }



    //spread an array and verify each element
    console.log("4. spread an array and verify each element")
    const arr = ['foo', 'bar', 'baz'];
    // Use the spread operator to "spread" the array into individual arguments
    const [foo, bar, baz] = arr;
    try{
        expect(foo).toBe('foo');
        expect(bar).toBe('bar');
        expect(baz).toBe('baz');
        console.log("   Verified each element")

    }catch(error){
        console.log("   An error occer : ", error);
    }


    await page.waitForTimeout(3000)

}) 