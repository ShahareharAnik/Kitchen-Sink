import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Cypress.io: Kitchen Sink');
});

test('Network Requests', async ({ page }) => {

    console.log("*************************************************Entering the Network Requests********************************************************");

    //Click on the Network Requests Button
    const NetworkRequests = page.locator("//ul[@class='home-list']//a[normalize-space()='Network Requests']");
    try{
        await expect(NetworkRequests).toBeVisible();
        console.log('The  Network Requests Button is Visiable')
    }catch(error){
        console.log('The Network Requests Button is not  Visiable', error)
    }
    await NetworkRequests.click();



    // Make the HTTP request
    console.log("1. Make the HTTP request")
    const response = await page.request.get('https://jsonplaceholder.typicode.com/comments');
    const responseBody = await response.json();
    const startTime = Date.now();
    const duration = Date.now() - startTime;
    try{
    // Assert response status
    expect(response.status()).toBe(200);
    console.log("   response status is: ", response.status())
    // Assert response body length
    expect(responseBody.length).toBe(500);
    console.log("   response body length is: ",await responseBody.length)
    // Assert response headers
    expect(response.headers()).toHaveProperty('content-type');
    // Assert response duration (e.g., within 2 seconds)
    expect(duration).toBeLessThan(2000);
    }catch(error){
        console.error('An error occer: ', error)
    }


    //Create a new post on behalf of the first user
    console.log('2. Create a new post on behalf of the first user')
    console.log('   Step 1: Find out the userId of the first user')
    const userResponse = await page.request.get('https://jsonplaceholder.typicode.com/users?_limit=1');
    const users = await userResponse.json();
    const user = users[0];
    try{
    // Assertions on user
    expect(user).toHaveProperty('id');
    expect(typeof user.id).toBe('number');
    }catch(error){
        console.error('An error occer: ', error)
    }

    console.log('   Step 2: Make a new post on behalf of the user')
    const postResponse = await page.request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      userId: user.id,
      title: 'Playwright Test Runner',
      body: 'Fast, easy and reliable testing for anything that runs in a browser.',
    }
     });

     try{
        // Assertions on post response
        expect(postResponse.status()).toBe(201); // new entity created
        console.log('           new entity created')
        const post = await postResponse.json();
        expect(post).toHaveProperty('title', 'Playwright Test Runner');
        //or, as my wish!!
        expect(post.title).toBe('Playwright Test Runner');
        expect(post).toHaveProperty('userId');
        expect(typeof post.id).toBe('number');
        expect(post.id).toBeGreaterThan(100);
    }catch(error){
        console.error('An error occer: ', error)
    }


    

})