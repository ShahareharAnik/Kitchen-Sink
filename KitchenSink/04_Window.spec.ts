import { test, expect } from '@playwright/test';
import {  KitchenSink } from './Pages/KitchenSinkPage';



test.beforeEach(async ({ page }) => {
    const kitchenSink = new KitchenSink(page)
    kitchenSink.gotoKitchenSink(page);
});


test('Window', async ({ page }) => {

    console.log("*************************************************Entering the Window********************************************************");
    const kitchenSink = new KitchenSink(page);
    //Click on the Querying Button
    kitchenSink.gotoWindow();


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