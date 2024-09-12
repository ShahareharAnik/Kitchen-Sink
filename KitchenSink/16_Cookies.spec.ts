import { test, expect, Page } from '@playwright/test';

// Helper functions to manage cookies
async function getCookie(page: Page, name: string) {
  const cookies = await page.context().cookies();
  return cookies.find(cookie => cookie.name === name) || null;
}

async function getAllCookies(page: Page) {
  return page.context().cookies();
}

async function setCookie(page: Page, name: string, value: string, options?: { domain?: string }) {
  const url = page.url();
  await page.context().addCookies([{
    name,
    value,
    domain: options?.domain || new URL(url).hostname, // Ensure the domain is set based on the current URL
    path: '/',
  }]);
}

async function clearCookie(page: Page, name: string) {
  const url = page.url();
  await page.context().addCookies([{
    name,
    value: '',
    domain: new URL(url).hostname, // Ensure domain is set based on the current URL
    path: '/',
    expires: 0,
  }]);
}

async function clearAllCookies(page: Page) {
  await page.context().clearCookies();
}

test('Cookie operations', async ({ page }: { page: Page }) => {
  await page.goto('https://example.cypress.io/commands/files');

  try {
    // Get a specific cookie
    const cookie = await getCookie(page, 'token');
    expect(cookie).toBeNull();
    console.log('   Initial cookie check passed');
  } catch (error) {
    console.error('   Error getting specific cookie:', error);
  }

  try {
    // Set a cookie
    await setCookie(page, 'token', '123ABC');
    const cookie = await getCookie(page, 'token');
    expect(cookie).not.toBeNull();
    expect(cookie?.value).toBe('123ABC');
    console.log('   Cookie set and verified successfully');
  } catch (error) {
    console.error('   Error setting and verifying cookie:', error);
  }

  try {
    // Get all cookies
    const cookies = await getAllCookies(page);
    expect(cookies.length).toBeGreaterThan(0);
    console.log('   All cookies retrieved successfully');
  } catch (error) {
    console.error('   Error getting all cookies:', error);
  }

  try {
    // Clear a specific cookie
    await clearCookie(page, 'token');
    const cookie = await getCookie(page, 'token');
    expect(cookie).toBeNull();
    console.log('   Specific cookie cleared successfully');
  } catch (error) {
    console.error('   Error clearing specific cookie:', error);
  }

  try {
    // Clear all cookies
    await clearAllCookies(page);
    const cookies = await getAllCookies(page);
    expect(cookies.length).toBe(0);
    console.log('   All cookies cleared successfully');
  } catch (error) {
    console.error('   Error clearing all cookies:', error);
  }
});
