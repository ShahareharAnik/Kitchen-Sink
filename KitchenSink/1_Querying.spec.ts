import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Querying', async ({ page }) => {

    console.log("*************************************************Entering the Querying********************************************************");

    //Click on the Querying Button
    const Querying = page.locator("//ul[@class='home-list']//a[normalize-space()='Querying']");
    try{
        await expect(Querying).toBeVisible();
        console.log('The  Querying Button is Visiable')
    }catch(error){
        console.log('The Querying Button is not  Visiable', error)
    }
    await Querying.click();

   
    //Click on the Button
    const button = page.getByRole('button', { name: 'Button' });
    await expect(button).toBeVisible();
     
    //Checking the Visiable Text
    const Visiabletext = page.locator("div[class='example'] code");
    const ExpectedText = "data-test-id";
    try{
        await expect(Visiabletext).toBeVisible();
        const textContent = await Visiabletext.textContent();
        console.log('The '+textContent+' Text is visible')
        console.log("The Visible Text is: " + textContent);
        expect(textContent?.trim()).toBe(ExpectedText);
    }catch(error){
            console.log('The Text is not Visible')
        }

    //Verifying the list
    const ActualQueryList = ['apples', 'oranges', 'bananas', 'more apples'];
    const QueryList = await page.$$('//body/div[2]/div[1]/div[6]/div[2]/div[1]/ul[1]/li');
    
    // Debugging output
    console.log(`Length of Query List: ${QueryList.length}`);
    
    
    // Check if length of QueryList matches ActualQueryList
    expect(QueryList.length).toBe(ActualQueryList.length);
    for (let i = 0; i < QueryList.length; i++) {
        const option = await QueryList[i].textContent();
        const trimmedOption = option?.trim();
       //console.log(`Text content of option ${i + 1}: ${trimmedOption}`);
        // Assert that the text content matches the expected item
        expect(trimmedOption).toBe(ActualQueryList[i]);
    }


    //Checking The SaveFrom button
    const SaveFrom = page.getByRole('button', {name:'Save Form' });
    await expect(button).toBeVisible();


    //Checking the PlaceHolder 
    const Name = page.locator('#inputName');
    const Email = page.locator("//input[@id='inputEmail']")
    const Password = page.locator("//input[@id='inputPassword']")
    await expect(Name).toHaveAttribute('placeholder', 'Name')
    await expect(Email).toHaveAttribute('placeholder', 'Email')
    await expect(Password).toHaveAttribute('placeholder', 'Password')


    //checking  the list 
    const ActualRootList = ['One', 'Two', 'Buckle my shoe'];
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


