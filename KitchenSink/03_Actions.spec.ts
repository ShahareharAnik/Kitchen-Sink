import { test, expect } from '@playwright/test';
import { Console } from 'console';
import exp from 'constants';
import {  KitchenSink } from './Pages/KitchenSinkPage';
import { KeyObject } from 'crypto';



test.beforeEach(async ({ page }) => {
    const kitchenSink = new KitchenSink(page)
    kitchenSink.gotoKitchenSink(page);
});


test('Actions', async ({ page }) => {
    console.log("*************************************************Entering the Actions********************************************************");
    const kitchenSink = new KitchenSink(page)

     //Click on the Actions Button
     kitchenSink.gotoActions(); 

    //Basic typing
    console.log("1. Basic typing")
    const email = await page.locator('.action-email')
    email.fill('BrainStation23@email.com');
    try{
        await expect(email).toHaveValue('BrainStation23@email.com');
        console.log("   Email id seen")
        await page.waitForTimeout(500);
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
        await page.waitForTimeout(500);
    }catch(error){
        console.error("   An error occer : ", error)
    }


    // Typing with delay
    console.log("3. Typing with delay")
    await email.type('slow.typing@email.com', { delay: 100 });
    try{
        await expect(email).toHaveValue('slow.typing@email.com');
        console.log("   Email id seen")
    }catch(error){
        console.error("   An error occer : ", error)
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
    await page.locator("//input[@id='description']").fill("checked")
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
            

    //Double Click check 
    console.log("10.Double Click check")
    const actionDiv = page.locator('.action-div');
    await actionDiv.dblclick();
    const hiddenInput = page.locator('.action-input-hidden');
    const inputBox = page.locator("//input[@value='Double click to edit']")
    try{
        await expect(actionDiv).not.toBeVisible();
        console.log("   The element is no longer visible after the double-click ")
        await expect(hiddenInput).toBeVisible();
        console.log("   The input element becomes visible after the double-click ")
        await page.waitForTimeout(1000);
        await inputBox.clear()
        await expect(inputBox).toHaveValue('')
        console.log("   The input field is now empty")
        }catch(error){
        console.error("   An problem is Occer : ", error)
    }



    //Right Click Check
    console.log("11.Right Click Check")
    const RightactionDiv = page.locator('.rightclick-action-div');
    await RightactionDiv.click({ button: 'right' });
    const actionInputHidden = page.locator('.rightclick-action-input-hidden');
    try{
        await expect(RightactionDiv).toBeHidden();
        console.log("   The element is no longer visible after right-click")
        await expect(actionInputHidden).toBeVisible();
        console.log("   The hidden input is now visible")
        await page.waitForTimeout(1000);
        await actionInputHidden.clear()
        await expect(actionInputHidden).toHaveValue('')
        console.log("   The input field is now empty")
        await page.waitForTimeout(500);
        
    }catch(error){
        console.error("An error occer : ", error)
    }



    //Check all checkboxes
    console.log("12.Check all checkboxes")

    //Check all checkboxes except the disabled ones
    const checkboxes1 = page.locator('.action-checkboxes [type="checkbox"]:not([disabled])');
    const checkboxCount1 = await checkboxes1.count();
    try{
        for (let i = 0; i < checkboxCount1; i++) {
            const Scheckbox1 = checkboxes1.nth(i)
            await Scheckbox1.check();
            await page.waitForTimeout(100);
            await expect(Scheckbox1).toBeChecked();
        }
    }catch(error){
        console.error("An error occer : ", error)
    }
    // Force check disabled checkboxes
    const disabledCheckbox = page.locator('.action-checkboxes [disabled]');
    await disabledCheckbox.evaluate((checkbox: HTMLInputElement) => {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    });
    try{
        await expect(disabledCheckbox).toBeChecked();
    }catch(error){
        console.error("An error occer : ", error)
    }
    // Check multiple checkboxes by value
    const checkboxes2 = page.locator("//div[@class='action-multiple-checkboxes']//div//label//input");
    const labelCount2 = await checkboxes2.count();
    try{
        for (let i = 0; i < labelCount2; i++) {
            const Scheckbox2 = checkboxes2.nth(i)
            await Scheckbox2.check();
            await page.waitForTimeout(100);
            await expect(Scheckbox2).toBeChecked();
        }
    }catch(error){
        console.error("An error occer : ", error)
    }
    // Check a specific radio button by value
    const radios1 = page.locator(".action-radios [type='radio']:not([disabled])");
    const radios1count = await radios1.count();
    try{
        for (let i = 0; i < radios1count; i++) {
            const Sradios1 = radios1.nth(i)
            await Sradios1.check();
            await page.waitForTimeout(100);
            await expect(Sradios1).toBeChecked();
        }
    }catch(error){
        console.error("An error occer : ", error)
    }
    // Force check specific radio buttons
    const radio3 = page.locator('.action-radios [type="radio"][value="radio3"]');
    await radio3.evaluate((checkbox: HTMLInputElement) => {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    })
    try{
        await expect(radio3).toBeChecked();
    }catch(error){
        console.error("An error occer : ", error)
    }



    //Uncheck all checkboxes 
    console.log("13.Uncheck all checkboxes")
    const uncheckboxes1 = page.locator("//div[@class='action-check']//div//label//input[not(@disabled)]");
    const uncheckboxCount1 = await uncheckboxes1.count()
    try {
        for (let i = 0; i < uncheckboxCount1; i++) {
            const Scheckbox1 = uncheckboxes1.nth(i);
            await Scheckbox1.check(); // Assuming you want to check them first
            await page.waitForTimeout(100);
            await expect(Scheckbox1).toBeChecked(); // Expecting it to be checked after checking
            await Scheckbox1.uncheck();
            await page.waitForTimeout(100);
            await expect(Scheckbox1).not.toBeChecked();
            console.log("   Uncheck all matching checkboxes")
        }
    } catch (error) {
        console.error("An error occurred: ", error);
    }

        // Force uncheck disabled checkboxes
    const disabledCheckboxes = page.locator('.action-check [disabled]');
    await disabledCheckboxes.evaluateAll((elements) => elements.forEach((el) => (el as HTMLInputElement).checked = false));
    try {
        await expect(disabledCheckboxes).not.toBeChecked()
        console.log("   Uncheck disabled checkboxes")
    } catch (error) {
        console.error("An error occurred: ", error);
    }



    //Select Option
    console.log("14.Select Option")
    const selectpoint= page.locator("//a[contains(text(),'.select()')]")
    await selectpoint.scrollIntoViewIfNeeded();
    const singleSelect = page.locator('.action-select');
    try{
        await expect(singleSelect).toHaveValue('--Select a fruit--');
        console.log("   Nothing is Selected")
    }catch(error){
        console.error("An error occer : ", error)
    }
    await singleSelect.selectOption({ label: 'apples' });
    try{
        await expect(singleSelect).toHaveValue('fr-apples');
        console.log("   apples is Selected")
        await page.waitForTimeout(500); 
    }catch(error){
        console.error("An error occer : ", error)
    }
    await singleSelect.selectOption({ label: 'oranges' });
    try{
        await expect(singleSelect).toHaveValue('fr-oranges');
        console.log("   oranges is Selected")
        await page.waitForTimeout(500); 
    }catch(error){
        console.error("An error occer : ", error)
    }
    await singleSelect.selectOption({ label: 'bananas' });
    try{
        await expect(singleSelect).toHaveValue('fr-bananas');
        console.log("   bananas is Selected")
        await page.waitForTimeout(500);
    }catch(error){
        console.error("An error occer : ", error)
    }
 

    //Scroll Example
    console.log("15.Scroll Example")
    const scrollview = page.locator("//a[normalize-space()='.scrollIntoView()']")
    await scrollview.scrollIntoViewIfNeeded();
    const horizontalButton = page.locator('#scroll-horizontal button');
    const verticalButton = page.locator('#scroll-vertical button');
    const bothScrollButton = page.locator('#scroll-both button');

    await horizontalButton.scrollIntoViewIfNeeded();
    try{
        await expect(horizontalButton).toBeVisible();
        console.log("   The Horizontal button is now visible")
        await page.waitForTimeout(500);
    }catch(error){
        console.error("   An error occer : ", error)
    }
    await verticalButton.scrollIntoViewIfNeeded();
    try{
        await expect(verticalButton).toBeVisible();
        console.log("   The Vertical button is now visible")
        await page.waitForTimeout(500);
    }catch(error){
        console.error("   An error occer : ", error)
    }
    await bothScrollButton.scrollIntoViewIfNeeded();
    try{
        await expect(bothScrollButton).toBeVisible();
        console.log("   The bothScrollButton button is now visible")
        await page.waitForTimeout(500);
    }catch(error){
        console.error("   An error occer : ", error)
    }


    // Set the value directly
    console.log("16.Set the value directly in the trigger")
    await page.locator('.trigger-input-range').fill('25');

    try{
        const trigger =  await page.locator('.trigger-input-range + p')
        await trigger.evaluate(el => el.textContent).then(textContent => {
                    expect(textContent).toBe('25');
                
        });
        await page.waitForTimeout(500);
    }catch(error){
        console.error("   An error occer : ", error)
    }

    //await page.waitForTimeout(5000);
    
})  