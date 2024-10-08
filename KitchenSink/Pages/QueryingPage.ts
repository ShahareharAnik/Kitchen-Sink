import { test, expect } from '@playwright/test';
import { Page, Locator } from 'playwright';
import { Logger } from '../Logger/Logger';  // Import the logger
import fs from 'fs';
import path from 'path';

export class Querying {
    private page: Page;
    private button: Locator; 
    private visibleText: Locator;
    private queryList: Locator; 
    private saveFormButton: Locator;
    private name: Locator;
    private email: Locator;
    private password: Locator;
    private logger: Logger;  // Add logger instance
    private screenshotsDir: string; // Directory for screenshots

    constructor(page: Page) {
        this.page = page;
        this.logger = new Logger("info");  // Initialize logger with desired log level
        this.screenshotsDir = path.join(__dirname, '..', 'KitchenSink', 'Screenshots'); // Set the screenshots directory

        // Initialize locators
        this.button = this.page.getByRole('button', { name: 'Button' });
        this.visibleText = this.page.locator("div[class='example'] code");
       // this.queryList = this.page.locator("//body/div[2]/div[1]/div[6]/div[2]/div[1]/ul[1]/li");
        this.saveFormButton = this.page.getByRole('button', { name: 'Save Form' });
        this.name = this.page.locator('#inputName');
        this.email = this.page.locator("#inputEmail");
        this.password = this.page.locator("#inputPassword");

        // Ensure the screenshots directory exists
        this.ensureScreenshotsDirectory();
    }

    private ensureScreenshotsDirectory() {
        if (!fs.existsSync(this.screenshotsDir)) {
            fs.mkdirSync(this.screenshotsDir, { recursive: true });
            this.logger.log('Querying', 'info', `Created Screenshots Directory: ${this.screenshotsDir}`);
        } else {
            this.logger.log('Querying', 'info', `Screenshots Directory Exists: ${this.screenshotsDir}`);
        }
    }

    private async takeScreenshot(screenshotName: string) {
        const screenshotPath = path.resolve(__dirname, 'Screenshots', `${screenshotName}-${Date.now()}.png`);
        this.logger.log('Querying', 'info', `Attempting to take screenshot: ${screenshotPath}`);
        try {
            await this.page.screenshot({ path: screenshotPath });
            this.logger.log('Querying', 'info', `Screenshot taken successfully: ${screenshotPath}`);
        } catch (error) {
            this.logger.log('Querying', 'error', `Failed to take screenshot: ${screenshotPath}`, [error]);
        }
    }

    async checkTheButton() {
        try {
            await expect(this.button).toBeVisible();
            this.logger.log('Querying', 'info', 'The Button is Visible');
        } catch (error) {
            this.logger.log('Querying', 'error', 'Button visibility check failed', [error]);
            await this.page.screenshot({ path: path.resolve(__dirname, 'Screenshots', `screenshot-button-failure-${Date.now()}.png`) });  // Screenshot
        }
    }

    async checkTheText() {
        const expectedText = "data-test-id";
        try {
            await expect(this.visibleText).toBeVisible();
            const textContent = await this.visibleText.textContent();
            this.logger.log('Querying', 'info', `The ${textContent} Text is visible`);
            this.logger.log('Querying', 'info', "The Visible Text is: " + textContent);
            expect(textContent?.trim()).toBe(expectedText);
            await this.page.screenshot({ path: path.resolve(__dirname, 'Screenshots', `manual-test-screenshot-${Date.now()}.png`) });  // Screenshot
        } catch (error) {
            this.logger.log('Querying', 'error', 'The Text is not Visible', [error]);
            await this.page.screenshot({ path: path.resolve(__dirname, 'Screenshots', `screenshot-text-failure-${Date.now()}.png`) });  // Screenshot
        }
    }

    async checkTheQueryList() {
        try {
            // Wait for the list items to be present in the DOM
            await this.page.waitForSelector('//body/div[2]/div[1]/div[6]/div[2]/div[1]/ul[1]/li', { state: 'visible' });
            
            const itemslist = await this.page.$$('//body/div[2]/div[1]/div[6]/div[2]/div[1]/ul[1]/li'); // Locator for list items
            console.log(`Query list item count: ${itemslist.length}`); // Log the count
            const queryListCount = itemslist.length; // Count the items  
            
            if (queryListCount > 0) {
                this.logger.log('Querying', 'info', `Length of Query List: ${queryListCount}`);
                const actualQueryList = ['apples', 'oranges', 'bananas', 'more apples'];
                expect(queryListCount).toBe(actualQueryList.length); // Assert length
    
                const retrievedOptions: string[] = []; // Explicitly define the type as string array
                for (let i = 0; i < queryListCount; i++) {
                    let option = await itemslist[i].innerText(); // Get the inner text of the element
                    if (option) {
                        retrievedOptions.push(option); // Store the text of each item
                    }
                }
    
                // Compare the retrieved options with the actual array
                expect(retrievedOptions).toEqual(actualQueryList);
                await expect(this.saveFormButton).toBeVisible(); // Check visibility of the button
            } else {
                this.logger.log('Querying', 'error', 'No items found in the query list');
            }
        } catch (error) {
            console.log("The Query List is not Visible or the List of the Query is not correct." + error);
            this.logger.log('Querying', 'error', 'Error in CheckTheQueryList', [error]);
            await this.page.screenshot({ path: path.resolve(__dirname, 'Screenshots', `screenshot-querylist-failure-${Date.now()}.png`) });  // Screenshot
        }
    }
    
    
    
    

    async checkThePlaceHolder() {
        this.logger.log('Querying', 'info', 'Checking the PlaceHolder...');

        // Check email placeholder
        try {
            await expect.soft(this.email).toHaveAttribute('placeholder', 'Email');
        } catch (error) {
            this.logger.log('Querying', 'error', 'Email placeholder check failed', [error]);
            await this.page.screenshot({ path: path.resolve(__dirname, 'Screenshots', `screenshot-email-failure-${Date.now()}.png`) });  // Screenshot
        }

        // Fill the email input
        await this.email.fill("check");

        // Check name placeholder
        try {
            await expect.soft(this.name).toHaveAttribute('placeholder', 'Name');
            await this.page.screenshot({ path: path.resolve(__dirname, 'Screenshots', `screenshot-name-failure-${Date.now()}.png`) });  // Screenshot
        } catch (error) {
            this.logger.log('Querying', 'error', 'Name placeholder check failed', [error]);
            await this.page.waitForTimeout(3000)
            await this.page.screenshot({ path: path.resolve(__dirname, 'Screenshots', `screenshot-name-failure-${Date.now()}.png`) });  // Screenshot
        }

        // Check password placeholder
        try {
            await expect.soft(this.password).toHaveAttribute('placeholder', 'Password');
        } catch (error) {
            this.logger.log('Querying', 'error', 'Password placeholder check failed', [error]);
            await this.page.screenshot({ path: path.resolve(__dirname, 'Screenshots', `screenshot-password-failure-${Date.now()}.png`) });  // Screenshot
        }
    }

    // Manual test to ensure screenshots are working
    async testScreenshot() {
        this.logger.log('Querying', 'info', 'Manually triggering screenshot...');
        await this.page.screenshot({ path: path.resolve(__dirname, 'Screenshots', `manual-test-screenshot-${Date.now()}.png`) });  // Screenshot
    }
}
