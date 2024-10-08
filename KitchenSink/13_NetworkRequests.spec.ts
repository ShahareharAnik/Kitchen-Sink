import { test, expect } from '@playwright/test';
import {  KitchenSink } from './Pages/KitchenSinkPage';



test.beforeEach(async ({ page }) => {
    const kitchenSink = new KitchenSink(page)
    kitchenSink.gotoKitchenSink(page);
});

test('Network Requests', async ({ page }) => {
    console.log("*************************************************Entering the Network Requests********************************************************");

    // Click on the Network Requests Button
    const NetworkRequests = page.locator("//ul[@class='home-list']//a[normalize-space()='Network Requests']");
    
    try {
        await NetworkRequests.waitFor({ state: 'visible' });
        console.log('The Network Requests Button is Visible');
        await NetworkRequests.click();
    } catch (error) {
        console.error('The Network Requests Button is not Visible:', error);
        return; // Exit the test if the button is not visible
    }

    // Make the HTTP request
    console.log("1. Make the HTTP request");
    const startTime = Date.now();
    
    try {
        const response = await page.request.get('https://jsonplaceholder.typicode.com/comments');
        const responseBody = await response.json();
        const duration = Date.now() - startTime;
        
        // Assert response status
        expect(response.status()).toBe(200);
        console.log("   Response status is:", response.status());
        
        // Assert response body length
        expect(responseBody.length).toBe(500);
        console.log("   Response body length is:", responseBody.length);
        
        // Assert response headers
        expect(response.headers()['content-type']).toContain('application/json');
        
        // Assert response duration (e.g., within 2 seconds)
        expect(duration).toBeLessThan(2000);
    } catch (error) {
        console.error('An error occurred during the HTTP request:', error);
    }

    // Create a new post on behalf of the first user
    console.log('2. Create a new post on behalf of the first user');
    
    try {
        console.log('   Step 1: Find out the userId of the first user');
        const userResponse = await page.request.get('https://jsonplaceholder.typicode.com/users?_limit=1');
        const users = await userResponse.json();
        const user = users[0];
        
        // Assertions on user
        expect(user).toHaveProperty('id');
        expect(typeof user.id).toBe('number');
        
        console.log('   Step 2: Make a new post on behalf of the user');
        const postResponse = await page.request.post('https://jsonplaceholder.typicode.com/posts', {
            data: {
                userId: user.id,
                title: 'Playwright Test Runner',
                body: 'Fast, easy and reliable testing for anything that runs in a browser.',
            }
        });
        
        // Assertions on post response
        expect(postResponse.status()).toBe(201); // new entity created
        console.log('           New entity created');
        
        const post = await postResponse.json();
        expect(post).toHaveProperty('title', 'Playwright Test Runner');
        expect(post.title).toBe('Playwright Test Runner');
        expect(post).toHaveProperty('userId');
        expect(typeof post.id).toBe('number');
        expect(post.id).toBeGreaterThan(100);
    } catch (error) {
        console.error('An error occurred during the post creation:', error);
    }

    // Intercept and mock network requests
    console.log('3. Intercept and mock network requests');
    let message = 'whoa, this comment does not exist';
    
    try {
        // Intercept GET requests to comments
        page.route('**/comments/*', async route => {
            if (route.request().method() === 'GET') {
                await route.continue();
            }
        });
        
        // Click button that triggers GET request
        await page.click('.network-btn');
        
        // Wait for the GET request to complete and assert the status code
        const [response] = await Promise.all([
            page.waitForResponse(response => response.url().includes('/comments/') && response.status() === 200),
            page.click('.network-btn')
        ]);
        expect(response.status()).toBeGreaterThanOrEqual(200);
        expect(response.status()).toBeLessThanOrEqual(304);

        // Intercept POST requests to comments
        page.route('**/comments', async route => {
            if (route.request().method() === 'POST') {
                const postRequestBody = route.request().postData();
                const response = await route.fulfill({
                    status: 200,
                    body: JSON.stringify({ name: 'Using POST in cy.intercept()' }),
                    headers: { 'Content-Type': 'application/json' }
                });
                
                // Verify the request and response
                expect(postRequestBody).toContain('email');
                //expect(response.headers()['content-type']).toContain('application/json');
            }
        });
        
        // Click button that triggers POST request
        await page.click('.network-post');
        
        // Wait for the POST request to complete and assert the response
        const postResponse = await page.waitForResponse(response => response.url().includes('/comments') && response.status() === 200);
        const postResponseBody = await postResponse.json();
        expect(postResponseBody).toHaveProperty('name', 'Using POST in cy.intercept()');

        // Intercept and stub a PUT request to comments
        page.route('**/comments/*', async route => {
            if (route.request().method() === 'PUT') {
                await route.fulfill({
                    status: 404,
                    body: JSON.stringify({ error: message }),
                    headers: { 'Access-Control-Allow-Origin': '*' }
                });
            } else {
                await route.continue();
            }
        });
        
        // Click button that triggers PUT request
        await page.click('.network-put');
        
        // Wait for the PUT request to complete and verify the stubbed response
        const putResponse = await page.waitForResponse(response => response.url().includes('/comments/') && response.status() === 404);
        const putResponseBody = await putResponse.json();
        expect(putResponseBody).toHaveProperty('error', message);
        
        // Check that the stubbed message is displayed on the page
       // await expect(page.locator('.network-put-comment')).toContainText(message);
    } catch (error) {
        console.error('An error occurred during network request interception:', error);
    }
});
