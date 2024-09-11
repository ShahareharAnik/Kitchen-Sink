import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Window', async ({ page }) => {

    console.log("*************************************************Entering the Window********************************************************");

    //Click on the Querying Button
    const Window = page.locator("//ul[@class='home-list']//a[normalize-space()='window']");
    try{
        await expect(Window).toBeVisible();
        console.log('The  Querying Button is Visiable')
    }catch(error){
        console.log('The Querying Button is not  Visiable', error)
    }
    await Window.click();



    // Get the reference to the top of the window with explicit type
    console.log("1. Get the reference to the top of the window with explicit type")
    const windowTop = await page.evaluate((): Window | null => window.top);
    // Check if the top of the window is the same as the current window
    const isTopWindow = await page.evaluate(() => window === window.top);
    console.log('   Is this the top window?', isTopWindow);



    // Access the document's charset property
    console.log("2. the document's charset property")
    const charset = await page.evaluate(() => document.charset);
    try{
        expect(charset).toBe('UTF-8');
        console.log("   The document's charset property is : "+ charset)
    }catch(error){
        console.error("   An error occer: ", error)
    }


    // Retrieve the page title and assert that it includes 'Kitchen Sink'
    console.log("3. Retrieve the page title")
    const pageTitle = await page.title();
    try{
        expect(pageTitle).toContain('Kitchen Sink');
        console.log("   The page title is : ", pageTitle)
    }catch(error){
        console.error("   An error occer: ", error)
    } 



    await page.waitForTimeout(2000);

})