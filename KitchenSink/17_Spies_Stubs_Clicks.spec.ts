import { test, expect, Page } from '@playwright/test';

// Spy-like implementation using `evaluate`
async function spyOnFunction(page: Page, objName: string, funcName: string) {
  await page.evaluate(({ objName, funcName }) => {
    // Access the object from the window context
    const obj = (window as any)[objName];

    // Store original function reference
    const originalFunction = obj[funcName];

    // Initialize call counter
    (window as any).callCount = 0;

    // Override the function to spy on it
    obj[funcName] = (...args: any[]) => {
      (window as any).callCount++; // Increment call count when the function is called
      return originalFunction.apply(obj, args); // Call the original function
    };
  }, { objName, funcName });
}

// Function to get call count from the browser
async function getCallCount(page: Page) {
  return await page.evaluate(() => (window as any).callCount);
}

// Test case that uses the spyOnFunction
test('should spy on a function and count calls', async ({ page }) => {
  // Define a sample object in the browser context
  await page.evaluate(() => {
    (window as any).myObj = {
      foo() {
        console.log('foo called');
      }
    };
  });

  // Spy on the function `foo` inside `myObj`
  await spyOnFunction(page, 'myObj', 'foo');

  // Trigger the function multiple times
  await page.evaluate(() => {
    (window as any).myObj.foo();
    (window as any).myObj.foo();
  });

  // Get the call count
  const callCount = await getCallCount(page);

  // Verify the call count using Playwright's expect assertion
  expect(callCount).toBe(2);
});
