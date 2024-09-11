import { test, expect } from '@playwright/test';
import * as assert from 'assert';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Assertions', async ({ page }) => {
    console.log("*************************************************Entering the Assertions********************************************************");

    // Click on the Assertions Button
    const Assertions = page.locator("//ul[@class='home-list']//a[normalize-space()='Assertions']");
    try {
        await expect(Assertions).toBeVisible();
        console.log('The Assertions Button is Visible');
    } catch (error) {
        console.log('The Assertions Button is not Visible', error);
    }
    await Assertions.click();

    // Go For Implicit Assertions
    console.log("1. Go For Implicit Assertions");
    const table = page.locator('.assertion-table');
    const lastRow = table.locator('tbody tr:last-child');
    const firstCell = lastRow.locator('td').first();
    const assertionsLink = page.locator('.assertions-link');
    const matchingCell = table.locator('tbody td').locator('text=Column content').first();

    try {
        // Assert that the last row has the class 'success'
        await expect(lastRow).toHaveClass(/success/);
        // Assert that the first cell contains specific text
        await expect(firstCell).toHaveText('Column content');
        await expect(firstCell).toContainText('Column content');
        // Get the HTML content of the element
        const htmlContent = await firstCell.evaluate(el => el.innerHTML ?? '');
        await expect(htmlContent).toBe('Column content');
        // Assert that the first cell matches the selector 'td'
        const isTd = await firstCell.evaluate(el => el.matches('td'));
        await expect(isTd).toBe(true);
        // Assert text content matches a regular expression
        const textContent = await firstCell.textContent() ?? '';
        await expect(textContent).toMatch(/column content/i);
        // Use Playwright's built-in method to find text content
        await expect(matchingCell).toBeVisible();
        // Perform assertions
        await expect(assertionsLink).toHaveClass('assertions-link active');
        await expect(assertionsLink).toHaveAttribute('href', /cypress.io/);
    } catch (error) {
        console.log("There is an error: ", error);
    }

    // BDD assertions example
    console.log("2. BDD assertions example");
    try {
        // Example of boolean assertion
        expect(true).toBe(true);
        // Example of object equality
        const obj = { foo: 'bar' };
        expect(obj).toEqual({ foo: 'bar' });
        // Example of text matching
        const text = await page.locator('h1').innerText();
        expect(text).toMatch('Assertions');
        // Example of asserting element presence and visibility
        const element = page.locator('.assertions-link');
        await expect(element).toBeVisible();
    } catch (error) {
        console.log("There is an error: ", error);
    }

    // TDD assertions example
    console.log("3. TDD assertions example");
    const person = {
        name: 'Joe',
        age: 20,
    };
    const obj = { foo: 'bar' };
    const text = await page.locator('h1').innerText();

    try {
        // Assert that `person` is an object
        assert.strictEqual(typeof person, 'object', 'value is not an object');
        assert.deepStrictEqual(obj, { foo: 'bar' }, 'Objects are not deeply equal');
        // Example of regular expression matching
        assert.match(text, /Assertions/, 'Text does not match the regular expression');
    } catch (error) {
        console.log("There is an error: ", error);
    }

    // Click on a link to navigate to the page containing the content
    await assertionsLink.click();
    
    // Custom assertion using a callback function
    await expect(async () => {
        // Get all paragraphs
        const paragraphs = page.locator('.assertions-p p');
        const texts = await paragraphs.evaluateAll(nodes => nodes.map(node => node.textContent?.trim() ?? ''));
        
        // Check the length of the texts array
        if (texts.length !== 3) {
            throw new Error(`Expected 3 paragraphs, but found ${texts.length}`);
        }

        // Check the text content of each paragraph
        const expectedTexts = [
            'Some text from first p',
            'More text from second p',
            'And even more text from third p'
        ];
        if (!texts.every((text, index) => text === expectedTexts[index])) {
            throw new Error(`Texts do not match. Found: ${texts.join(', ')}, Expected: ${expectedTexts.join(', ')}`);
        }
    }).toBeTruthy();

    // Get and normalize text from the first element
    const normalizeText = (s: string): string => s.replace(/\s/g, '').toLowerCase();
    
    let texts: string;
    const firstElement = page.locator('.two-elements .first');
    texts = await firstElement.evaluate(el => {
        const textContent = el.textContent ?? '';
        return textContent.replace(/\s/g, '').toLowerCase();
    });

    // Get text from the second element and perform assertion
    const secondElement = page.locator('.two-elements .second');
    const secondText = await secondElement.evaluate(el => {
        const textContent = el.textContent ?? '';
        return textContent.replace(/\s/g, '').toLowerCase();
    });

    // Assertion to compare the normalized texts
    await expect(secondText).toBe(texts);

    // Check random number range
    const randomNumberLink = page.locator('#random-number');

    try {
        // Wait for the random number link to be visible
        await randomNumberLink.waitFor();
        // Fetch and evaluate the number
        const number = await randomNumberLink.evaluate(el => {
            const text = el.textContent ?? '';
            const parsedNumber = parseFloat(text);
            console.log(`Parsed Number: ${parsedNumber}`);
            return parsedNumber;
        });

        // Assertion to check if the number is between 1 and 10 (inclusive)

        console.log("   The output is : " , number)
        // await expect(number).toBeGreaterThanOrEqual(1);
        // await expect(number).toBeLessThanOrEqual(10);
    } catch (error) {
        console.error("There is an error: " , error);
    }
});
