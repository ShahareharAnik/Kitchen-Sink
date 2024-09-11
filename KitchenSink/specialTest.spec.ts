import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
  });

test.skip('Window', async ({ page }) => {
    console.log("*************************************************Entering the Actions********************************************************");
      //Click on the Actions Button
      const Window = page.locator("//ul[@class='home-list']//a[normalize-space()='Window']");
      try{
          await expect(Window).toBeVisible();
          console.log('The  Actions Button is Visiable')
      }catch(error){
          console.log('The Actions Button is not  Visiable', error)
      }
      await Window.click();
 
    //    const scrollview = page.locator("//a[contains(text(),'cy.scrollTo()')]")
    //    await scrollview.scrollIntoViewIfNeeded();
      await page.waitForTimeout(2000); 

      // Access the document's charset property
  const charset = await page.evaluate(() => document.charset);

  // Perform the assertion
  expect(charset).toBe('UTF-8');


























// //        // Access the global window object and assert properties
// //   const windowTop = await page.evaluate(() => window.top);

// //   // Perform the assertion
// //   try{
// //   expect(windowTop).toBe(window);
// //   }catch(error){
// //     console.error("an error : ", error)
// //   }

// /// Access the global window object and assert properties
// const windowTop = await page.evaluate(() => window.top);

// // Perform the assertion inside the evaluate method, where `window` is defined
// try {
//   await page.evaluate((windowTop) => {
//     if (windowTop !== window) {
//       throw new Error('windowTop is not equal to window');
//     }
//   }, windowTop);
// } catch (error) {
//   console.error("An error occurred: ", error);
// }

        // Scroll to the bottom of the page
    //await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

                            //     // Get the element handle
                            // const elementHandle = await page.locator("//div[@id='scrollable-horizontal']//li[1]//div[1]").elementHandle();

                            // // Scroll the element into view using JavaScript
                            // if (elementHandle) {
                            //     await page.evaluate((el) => el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }), elementHandle);
                            // }

                                // // Scroll to (x, y) coordinates
                                // await page.evaluate(() => window.scrollTo(250, 250));

                                // const element = await page.locator('#scrollable-both');
                                // const boundingBox = await element.boundingBox();
                                // if (boundingBox) {
                                //     await page.evaluate(({ x, y }) => window.scrollTo(x, y), {
                                //         x: boundingBox.x + boundingBox.width * 0.75,
                                //         y: boundingBox.y + boundingBox.height * 0.25,
                                //     });
                                // }

                            // Smooth scrolling
                            // await page.evaluate(() => {
                            //     document.querySelector("h4[id='trigger'] a")?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                            // });

                            // Set the value directly
// await page.locator('.trigger-input-range').fill('25');

// // Verify the displayed value (assuming there's an element showing the value)
// await page.locator('.trigger-input-range + p').evaluate(el => el.textContent).then(textContent => {
//   expect(textContent).toBe('25');
// });


    //   //Select Option
    // console.log("Select Option")
    // const singleSelect = page.locator('.action-select');
    // await expect(singleSelect).toHaveValue('--Select a fruit--');
    // await singleSelect.selectOption({ label: 'apples' });
    // await expect(singleSelect).toHaveValue('fr-apples');
    // await page.waitForTimeout(500); 
   
    // await singleSelect.selectOption({ label: 'oranges' });
    // await expect(singleSelect).toHaveValue('fr-oranges');
    // await page.waitForTimeout(500); 
 
    // await singleSelect.selectOption({ label: 'bananas' });
    // await expect(singleSelect).toHaveValue('fr-bananas');
    // await page.waitForTimeout(500); 




    // //Select Option
    // console.log("Select Option")
    // const singleSelect = page.locator('.action-select');
    // await expect(singleSelect).toHaveValue('--Select a fruit--');
    // await singleSelect.selectOption({ label: 'apples' });
    // await expect(singleSelect).toHaveValue('fr-apples');
    // await page.waitForTimeout(2000); 



    //  // For multiple selection, we can select multiple options by value or label
    // const multiSelect = page.locator('.action-select-multiple');
    // await page.waitForTimeout(2000); 
    // // Select multiple options by their values
    // await multiSelect.selectOption([
    //                                 { value: 'fr-apples' },
    //                                 { value: 'fr-oranges' },
    //                                 { value: 'fr-bananas' }
    //                                 ]);
    //                                 await page.waitForTimeout(2000); 
    // // Confirm the selected values match the selected options
    // const selectedValues = await multiSelect.evaluate((el: HTMLSelectElement) => Array.from(el.selectedOptions).map(option => option.value));
    // await expect(selectedValues).toEqual(['fr-apples', 'fr-oranges', 'fr-bananas']);
    // await page.waitForTimeout(2000); 
    // // Select an option by its value
    // await singleSelect.selectOption('fr-bananas');
    // await page.waitForTimeout(2000); 
    // // Confirm that 'bananas' was selected
    // await expect(singleSelect).toHaveValue('fr-bananas');

    // await page.waitForTimeout(2000); 
    // // Assert that 'oranges' is included in the selected values
    // const selectedMultiValues = await multiSelect.evaluate((el: HTMLSelectElement) => Array.from(el.selectedOptions).map(option => option.value));
    // await expect(selectedMultiValues).toContain('fr-oranges');

   
    // //Scroll Example
    // console.log("14.Scroll Example")
    // const scrollview = page.locator("//a[normalize-space()='.scrollIntoView()']")
    // await scrollview.scrollIntoViewIfNeeded();
    // const horizontalButton = page.locator('#scroll-horizontal button');
    // const verticalButton = page.locator('#scroll-vertical button');
    // const bothScrollButton = page.locator('#scroll-both button');

    // await horizontalButton.scrollIntoViewIfNeeded();
    // try{
    //     await expect(horizontalButton).toBeVisible();
    //     await page.waitForTimeout(500);
    // }catch(error){
    //     console.error("An error occer : ", error)
    // }
    // await verticalButton.scrollIntoViewIfNeeded();
    // try{
    //     await expect(verticalButton).toBeVisible();
    //     await page.waitForTimeout(500);
    // }catch(error){
    //     console.error("An error occer : ", error)
    // }
    // await bothScrollButton.scrollIntoViewIfNeeded();
    // try{
    //     await expect(bothScrollButton).toBeVisible();
    //     await page.waitForTimeout(500);
    // }catch(error){
    //     console.error("An error occer : ", error)
    // }

    // //Check all checkboxes except the disabled ones
    // const uncheckboxes1 = page.locator("//div[@class='action-check']//div//label//input[not(@disabled)]");
    // const uncheckboxCount1 = await uncheckboxes1.count()
    // try {
    //     for (let i = 0; i < uncheckboxCount1; i++) {
    //         const Scheckbox1 = uncheckboxes1.nth(i);
    //         await Scheckbox1.check(); // Assuming you want to check them first
    //         await page.waitForTimeout(100);
    //         await expect(Scheckbox1).toBeChecked(); // Expecting it to be checked after checking
    //         await Scheckbox1.uncheck();
    //         await page.waitForTimeout(100);
    //         await expect(Scheckbox1).not.toBeChecked();
    //         console.log("   Uncheck all matching checkboxes")
    //     }
    // } catch (error) {
    //     console.error("An error occurred: ", error);
    // }

    //     // Force uncheck disabled checkboxes
    // const disabledCheckboxes = page.locator('.action-check [disabled]');
    // await disabledCheckboxes.evaluateAll((elements) => elements.forEach((el) => (el as HTMLInputElement).checked = false));
    // try {
    //     await expect(disabledCheckboxes).not.toBeChecked()
    //     console.log("   Uncheck disabled checkboxes")
    // } catch (error) {
    //     console.error("An error occurred: ", error);
    // }

  await page.waitForTimeout(5000); 
  
    
})  