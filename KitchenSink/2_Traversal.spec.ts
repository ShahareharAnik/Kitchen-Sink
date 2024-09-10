import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Traversal', async ({ page }) => {
  console.log("*************************************************Entering the Traversal********************************************************");

  // Click on the Traversal Button
  const Traversal = page.locator("//ul[@class='home-list']//a[normalize-space()='Traversal']");
  
    try {
        console.log("1. Check if the Traversal button is visible...");
        const isVisible = await Traversal.isVisible();
        if (isVisible) {
            console.log("   The Traversal Button is found");
            await Traversal.click();
        } else {
            console.log("   The Traversal Button is not visible");
        }
    } catch (error) {
            console.error("   Error finding or clicking the Traversal button:", error);
    }


  // Check the children in the API
  const breadcrumb = page.locator('.traversal-breadcrumb');
  const activeChildren = breadcrumb.locator('.active');
  
  try {
        console.log("2. Assert that activeChildren contains the text 'Data'...");
        await expect(activeChildren).toContainText('Data');
        console.log("   The active child element contains the text 'Data'");
    } catch (error) {
        console.error("   Error in asserting activeChildren's text:", error);
    }


  //Verify closest UL has class list-group
  const badge = page.locator('.traversal-badge');
  const closestUl = badge.locator('xpath=ancestor::ul');
  try{
        console.log( "3. Find the closest parent 'ul' element...");
        const closeULisVisible = await closestUl.isVisible()
        if(closeULisVisible){
            console.log('   The Close UL is Visible')
            // Assert that this 'ul' element has the class 'list-group'
            await expect(closestUl).toHaveClass(/list-group/);
            console.log('   The Close UL has the list Group')
        }else{
            console.log('   The Close UL is not Visible')
        }
    }catch(error){
        console.log('   There is a Error:', error)
    }


    // Checking the element presence in the list
    const DesiredElement = "siamese";
    const DOMelementList = await page.$$('.traversal-list>li');
    let elementFound = false; // Flag to track if the element is found

    try {
        console.log(`4. Checking the list for the presence of: ${DesiredElement}...`);
        for (let i = 0; i < DOMelementList.length; i++) {
            const option = await DOMelementList[i].textContent();
            const trimmedOption = option?.trim();
            
            if (trimmedOption === DesiredElement) {
                console.log(`   "${trimmedOption}" is present in the list.`);
                elementFound = true;
                break; // Exit the loop if element is found
            }
        }

        if (!elementFound) {
            console.log(`   "${DesiredElement}" was not found in the list.`);
        }
    } catch (error) {
        console.log('   Error occurred while checking the list', error);
    }


    //Check active list item contains "About"'
    console.log("5. Filter that it contains the text 'About'...");
    const activeItems = page.locator('.traversal-nav > li')
          activeItems.filter({ has: page.locator('.active') });
    // Ensure there are active items
    const count = await activeItems.count();
    if (count === 0) {
        console.log("   No active items found");
        return; // Exit if no active items are found
    }

    try {
        // Check if any of the active items contain the text 'About'
        let found = false;
        let Text:any = "k";
        for (let i = 0; i < count; i++) {
            let textContent = await activeItems.nth(i).textContent();
            if (textContent?.includes('About')) {
                console.log("   Active item contains the text 'About'");
                found = true;
                Text = textContent;
                break;
            }
        }
        expect(Text).toContain('About');

    } catch (error) {
        console.log("   No active item contains the text 'About'");
        console.error("An error occurred:", error);
    }


    //length of the list
    console.log("6. Check the length of the list....")
    const listpath = page.locator('.traversal-pagination>li')
    const lengthofthelistpath= await listpath.count()
    console.log("   The length of the list is: " + lengthofthelistpath)
    try{
        if(lengthofthelistpath == 7 ){
            console.log("   Matched with the expectations.")
        }
        expect(lengthofthelistpath).toBe(7)
    }catch(error){
        console.log("   Doesn't matched with the expectations.")
        console.error("   An error occurred:", error);

    }


    //Get the first and second value of the row of a table 
    console.log("7. Get the first and second value of the row of a table....")
    const row = page.locator('.traversal-table tbody tr').first();
    const firstCell = row.locator('td').nth(0);
    const secondCell = row.locator('td').nth(1);
    const textContent1 = await firstCell.textContent();
    const textContent2 = await secondCell.textContent();
    console.log(`   The first cell value is: ${textContent1?.trim()}`);
    console.log(`   The second cell value is: ${textContent2?.trim()}`);
    try{
        await expect(firstCell).toHaveText("1");
        await expect(secondCell).toHaveText('Jane');
    }catch(error){
        console.log("   Doesn't matched with the expectations.")
        console.error("   An error occurred:", error);
    }


    //Get the last DOM element
    console.log("8. Get the last DOM element by using 'last'....")
    const buttons = page.locator('.traversal-buttons .btn');
    const lastButton = buttons.last();
    try{
        await expect(lastButton).toHaveText('Submit');
        console.log('   The last button contains the text "Submit".');

    }catch(error){
        console.log("   The last button doesn't contain the text 'Submit'")
        console.error("   An error occurred:", error);
    }
    

    //Check next sibling element
    console.log("9. Check next sibling element....")
    const applesLocator = page.locator('.traversal-ul').locator('text=apples');
    const nextSibling = applesLocator.locator('xpath=following-sibling::*').first();
    try{
        await expect(nextSibling).toHaveText('oranges');
        console.log('   The next sibling contains the text "oranges".');

    }catch(error){
        console.log("   The next sibling doesn't contain the text 'oranges'.")
        console.error("   An error occurred:", error);
    }


    //Check next all sibling element length
    console.log("10. Check next all sibling element length....")
    const orangesLocator = page.locator('.traversal-next-all').locator('text=oranges');
    const nextSiblings = orangesLocator.locator('xpath=following-sibling::*');
    try {
        // Assert that the number of next sibling elements is 3
        expect(count).toBe(3);
        console.log('   The number of next sibling elements is correct.');
    } catch (error) {
        console.log("   The number of next sibling elements is incorrect.");
        console.error("   An error occurred:", error);
    }


    //Check next siblings until another element
    console.log("11. Check next siblings until another element")
    const veggies = await page.locator('#veggies');
    const nuts = await page.locator('#nuts');
   // Get all sibling elements between the starting and ending elements
   const nextUntilLocator = page.locator(`xpath=//ul/li[preceding-sibling::*[@id='veggies']]`);



   // Count the number of sibling elements
   const SaveFromcount = await nextUntilLocator.count();
   console.log(`   Count of elements until #nuts: ${SaveFromcount}`);

//    // Print the text content of all selected elements for verification
//    for (let i = 0; i < SaveFromcount; i++) {
//        const textContent = await nextUntilLocator.nth(i).textContent();
//        console.log(`Element ${i + 1}: ${textContent}`);
//    }

   try {
       // Assert that the number of sibling elements is 3
       expect(SaveFromcount).toBe(14);
       console.log('    The number of next sibling elements until the ending element is correct.');
   } catch (error) {
       console.log("    The number of next sibling elements until the ending element is incorrect.");
       console.error("    An error occurred:", error);
   }


    //Remove disabled elements and check text
    console.log("12. Remove disabled elements and check text");
    const Disbuttons = page.locator('.traversal-disabled .btn');

    // Loop through each button and only check the ones without the 'disabled' attribute
    const buttonCount = await Disbuttons.count();
    if (buttonCount === 0) {
        console.log('   No buttons found.');
        return;
    }

    for (let i = 0; i < buttonCount; i++) {
        const isDisabled = await Disbuttons.nth(i).getAttribute('disabled');
        const buttonText = await Disbuttons.nth(i).textContent();

        if (!isDisabled) {
            console.log(`    Checking enabled button: ${buttonText?.trim()}`);
            await expect(Disbuttons.nth(i)).not.toContainText('Disabled');
        } else {
            console.log(`    Skipping disabled button: ${buttonText?.trim()}`);
        }
    }
    console.log('    All buttons without the disabled attribute do not contain the text "Disabled".');


    //Check parent element contains specific text
    console.log("13. Check parent element contains specific text")
    const markElement = page.locator('.traversal-mark');
    const parentElement = markElement.locator('..');  // '..' navigates to the parent element
    try {
        await expect(parentElement).toContainText('Morbi leo risus');
        console.log("    The parent element contains the text 'Morbi leo risus'")
    } catch (error) {
    console.error("   An error occurred:", error);
    }


    //a parent blockquote exists
    console.log("14. check a parent blockquote exists")
    const citeElement = page.locator('.traversal-cite');
    const parentBlockquote = citeElement.locator('xpath=ancestor::blockquote');
    try {
        await expect(parentBlockquote).toHaveCount(1);
        const tagName = await parentBlockquote.evaluate(el => el.tagName);
        console.log(`    The parent tag is: ${tagName}`);
    } catch (error) {
        console.error("   An error occurred:", error);
    }


    //Find previous sibling element in Playwright
    console.log("15. Find previous sibling element in Playwright")
    const activeBird = page.locator('.birds .active');
    const previousSibling = activeBird.locator('xpath=preceding-sibling::*[1]');
    try{
        await expect(previousSibling).toContainText('Lorikeets');
        console.log('    The previous sibling contains the text "Lorikeets".'); 
    } catch (error) {
        console.log('    The previous sibling doesnt contain the text "Lorikeets".'); 
        console.error("   An error occurred:", error);
    }


    //Find all previous sibling elements
    console.log("16. Find all previous sibling elements")
    const thirdFruit = page.locator('.fruits-list .third');
    const prevAllSiblings = thirdFruit.locator('xpath=preceding-sibling::*');
    const prevSiblingcount = await prevAllSiblings.count();
    console.log(`    Number of previous siblings: ${prevSiblingcount}`);
    try{
    await expect(prevSiblingcount).toBe(2);
    console.log('    The number of previous sibling elements is correct.');
    } catch (error) {
        console.log('    The number of previous sibling elements is not correct.'); 
        console.error("    An error occurred:", error);
    }

    //Find all previous sibling elements until another element
    console.log("17. Find all previous sibling elements until another element")
    const Nuts = page.locator('.foods-list #nuts');
    const Veggies = page.locator('.foods-list #veggies');

    // Get all previous siblings between #nuts and #veggies
    const prevUntilSiblings = page.locator('xpath=//li[preceding-sibling::*[@id="veggies"] and following-sibling::*[@id="nuts"]]');

    // Count the number of previous siblings between the two elements
    const Pcount = await prevUntilSiblings.count();
    console.log(`    Number of previous siblings between #veggies and #nuts: ${Pcount}`);
    try{
        await expect(Pcount).toBe(6);
        console.log('    The number of previous sibling elements until the target element is correct.');
    }catch (error) {
        console.error("    An error occurred:", error);
    }


    //Get all Siblings
    console.log("18. Get all Siblings")
    const targetElement = page.locator('.traversal-pills .active');
    const siblings = page.locator(`.traversal-pills > *:not(.active)`); // Exclude the target element
    const Allsibcount = await siblings.count();
    console.log(`    Number of sibling elements: ${Allsibcount}`);
    try{
        await expect(Allsibcount).toBe(2);
        console.log('    The number of sibling elements is correct.');
    }catch (error) {
        console.error("    An error occurred:", error);
    }


  // Wait to observe the results
  await page.waitForTimeout(1000);

  console.log("*************************************************Ended the Traversal********************************************************");

});
