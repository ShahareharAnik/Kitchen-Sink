import { test, expect } from '@playwright/test';
import {  KitchenSink } from './Pages/KitchenSinkPage';
import {  Querying } from './Pages/QueryingPage';



test.beforeEach(async ({ page }) => {
    const kitchenSink = new KitchenSink(page)
    await kitchenSink.gotoKitchenSink(page);
});

test('Querying', async ({ page }) => {

    console.log("*************************************************Entering the Querying********************************************************");
     const kitchenSink = new KitchenSink(page)
    const querying = new Querying(page) 
    
    //Click on the Querying Button
    kitchenSink.gotoQuerying();
   
    //Check the Button
    querying.checkTheButton();
     
    //Checking the Visiable Text
    querying.checkTheText();

    //Verifying the list
    querying.checkTheQueryList();

    //Checking the PlaceHolder 
   
        await test.step('Check The PlaceHolder', async () => {
            querying.checkThePlaceHolder()
        })
     
    
    


    //checking  the list 
    const ActualRootList = ['One', 'Two', 'Buckle my shoe'];
    await page.waitForSelector('//body/div[2]/div[1]/div[6]/div[8]/div[1]/ul/li', { state: 'visible' });
    const RootList = await page.$$('//body/div[2]/div[1]/div[6]/div[8]/div[1]/ul/li');    
    console.log(`Length of Query List: ${RootList.length}`);
    expect(RootList.length).toBe(ActualRootList.length);
    for (let i = 0; i < RootList.length; i++) {
        const option = await RootList[i].textContent();
        const trimmedOption = option?.trim();
       //console.log(`Text content of option ${i + 1}: ${trimmedOption}`);
        // Assert that the text content matches the expected item
        expect(trimmedOption).toBe(ActualRootList[i]);
    }

    //Checking the submit Button
    const SubmitButton = await page.locator("//button[@id='main']")
    await expect(SubmitButton).toBeVisible() 


    await page.waitForTimeout(3000);
    console.log("*************************************************Ending of the Querying********************************************************");
});


