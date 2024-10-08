import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class KitchenSink {

    private page: Page;
    private Querying: string;
    private Traversal: string;
    private Actions: string;
    private Window: string;
    private Viewport: string;
    private Location: string;
    private Navigation: string;
    private Assertions: string;

    constructor(page: Page) {
        this.page = page;
        this.Querying = "//ul[@class='home-list']//a[normalize-space()='Querying']";
        this.Traversal = "//ul[@class='home-list']//a[normalize-space()='Traversal']";
        this.Actions = "//ul[@class='home-list']//a[normalize-space()='Actions']";
        this.Window = "//ul[@class='home-list']//a[normalize-space()='window']";
        this.Viewport = "//ul[@class='home-list']//a[normalize-space()='Viewport']";
        this.Location = "//ul[@class='home-list']//a[normalize-space()='Location']";
        this.Navigation = "//ul[@class='home-list']//a[normalize-space()='Navigation']";
        this.Assertions = "//ul[@class='home-list']//a[normalize-space()='Assertions']";
    }

    async gotoKitchenSink(page:Page) {
        await this.page.goto('https://example.cypress.io/');
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
    }

    async gotoQuerying() {
        const queryingLocator = this.page.locator(this.Querying);
        try {
            await expect(queryingLocator).toBeVisible();
            console.log('The Querying Button is Visible');
        } catch (error) {
            console.log('The Querying Button is not Visible', error);
        }
        await queryingLocator.click();
    }

    async gotoTraversal() {
        const traversalLocator = this.page.locator(this.Traversal);
        try {
            const isVisible = await traversalLocator.isVisible();
            if (isVisible) {
                console.log("The Traversal Button is found");
                await traversalLocator.click();
            } else {
                console.log("The Traversal Button is not visible");
            }
        } catch (error) {
            console.error("Error finding or clicking the Traversal button:", error);
        }
    }

    async gotoActions() {
        const actionsLocator = this.page.locator(this.Actions);
        try {
            await expect(actionsLocator).toBeVisible();
            console.log('The Actions Button is Visible');
        } catch (error) {
            console.log('The Actions Button is not Visible', error);
        }
        await actionsLocator.click();
    }

    async gotoWindow() {
        const windowLocator = this.page.locator(this.Window);
        try {
            await expect(windowLocator).toBeVisible();
            console.log('The Window Button is Visible');
        } catch (error) {
            console.log('The Window Button is not Visible', error);
        }
        await windowLocator.click();
    }

    async gotoViewport() {
        const viewportLocator = this.page.locator(this.Viewport);
        try {
            await expect(viewportLocator).toBeVisible();
            console.log('The Viewport Button is Visible');
        } catch (error) {
            console.log('The Viewport Button is not Visible', error);
        }
        await viewportLocator.click();
    }

    // Method for Location button
    async gotoLocation() {
        const locationLocator = this.page.locator(this.Location);
        try {
            await expect(locationLocator).toBeVisible();
            console.log('The Location Button is Visible');
        } catch (error) {
            console.log('The Location Button is not Visible', error);
        }
        await locationLocator.click();
    }

    // Method for Navigation button
    async gotoNavigation() {
        const navigationLocator = this.page.locator(this.Navigation);
        try {
            await expect(navigationLocator).toBeVisible();
            console.log('The Navigation Button is Visible');
        } catch (error) {
            console.log('The Navigation Button is not Visible', error);
        }
        await navigationLocator.click();
    }

    // Method for Assertions button
    async gotoAssertions() {
        const assertionsLocator = this.page.locator(this.Assertions);
        try {
            await expect(assertionsLocator).toBeVisible();
            console.log('The Assertions Button is Visible');
        } catch (error) {
            console.log('The Assertions Button is not Visible', error);
        }
        await assertionsLocator.click();
    }
}
