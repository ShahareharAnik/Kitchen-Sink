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

     

    //Basic typing
    console.log("1. Basic typing")
    const email = await page.locator('.action-email')
    email.fill('BrainStation23@email.com');
    try{
        await expect(email).toHaveValue('BrainStation23@email.com');
        console.log("   Email id seen")
    }catch(error){
        console.error("An error occer : ", error)
    }


    //Special Character Sequence and key modifiers
    console.log("2. Special Character Sequence and key modifiers")
    //Special Character Sequence
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Delete');
    // Pressing key modifiers
    await page.keyboard.press('Alt');
    await page.keyboard.press('Control');
    await page.keyboard.press('Meta'); //Dont know!! Command doesnt work
    await page.keyboard.press('Shift');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    try{
        await expect(email).toHaveValue('');
        console.log("   Email id box clear")
    }catch(error){
        console.error("An error occer : ", error)
    }


    // Typing with delay
    console.log("3. Typing with delay")
    await email.type('slow.typing@email.com', { delay: 100 });
    try{
        await expect(email).toHaveValue('slow.typing@email.com');
        console.log("   Email id seen")
    }catch(error){
        console.error("An error occer : ", error)
    }


    //Type with force
    console.log("4. Type with force")
    const disabledInput = page.locator('.action-disabled');
    await disabledInput.evaluate((el) => el.removeAttribute('disabled'));
    await disabledInput.fill('disabled error checking');
    try{
        await expect(disabledInput).toHaveValue('disabled error checking');
        console.log("   The disable box is accessable")
    }catch(error){
        console.error("   An error occer : ", error)
    }


    //Focus and Color Assertion
    console.log("5. Focus and Color Assertion")
    const focusElement = page.locator('.action-focus');
    const previousSibling = focusElement.locator('xpath=preceding-sibling::*').first();
    // Focus on the element
    await focusElement.focus();
    await focusElement.type("123456789",{delay:100})
    try{
        // Assert that the element has the class 'focus'
        await expect(focusElement).toHaveClass(/focus/);
        // Assert that the previous sibling has the style 'color: orange;'
        await expect(previousSibling).toHaveAttribute('style', 'color: orange;');
    }catch(error){
        console.error("   An error occer : ", error)
    }


    //Blur the Element 
    console.log("6. Blur the Element")
    const blurElement = page.locator('.action-blur');
    await blurElement.type('About to blur' ,{ delay: 100 });
    await page.waitForTimeout(1000);
    await blurElement.blur();
    try {
        await expect(blurElement).toHaveClass(/error/);
        console.log('   Element has class "error".');
    } catch (error) {
        console.error('   Element does not have class "error":', error);
    }
    // Check if the previous sibling has the style attribute 'color: red;'
    const prevSibling = blurElement.locator('xpath=preceding-sibling::*').first();
    try {
        await expect(prevSibling).toHaveAttribute('style', 'color: red;');
        console.log('   Previous sibling has style "color: red;".');
    } catch (error) {
        console.error('   Previous sibling does not have style "color: red;":', error);
    }


    //Submit the input
    console.log("7. Submit some Value ")
    const CouponCode = page.locator("#couponCode1")
    const SubmitButton = page.locator("//button[contains(text(),'Submit')]")
    const Confirm = page.locator("//p[contains(text(),'Your form has been submitted!')]")
    await CouponCode.type("123Coupoon", {delay:100})
    await SubmitButton.click()
    try{
        await  expect(Confirm).toHaveText("Your form has been submitted!") 
        console.log("   Submit Message Checked")
    }catch(error){
        console.error("An error is occer : ", error)
    }


    //Click on Canvas
    console.log("8. Click on Canvas")
    const actionButton = page.locator('.action-btn')
    actionButton.click()
    await page.waitForTimeout(2000);
    const canvas = page.locator('#action-canvas');


    // Click at specific coordinates
    await canvas.click({ position: { x: 80, y: 75 } });
    await canvas.click({ position: { x: 170, y: 75 } });
    await canvas.click({ position: { x: 80, y: 165 } });
    await canvas.click({ position: { x: 100, y: 185 } });
    await canvas.click({ position: { x: 125, y: 190 } });
    await canvas.click({ position: { x: 150, y: 185 } });
    await canvas.click({ position: { x: 170, y: 165 } });

    // Click multiple elements
    console.log("9. Click multiple elements")
    const labels = page.locator("//div//span[@class='label label-primary']");
    const labelCount = await labels.count();
    for (let i = 0; i < labelCount; i++) {
    await labels.nth(i).click();
    await page.waitForTimeout(100);
}
            
    await page.waitForTimeout(5000);
    
})  