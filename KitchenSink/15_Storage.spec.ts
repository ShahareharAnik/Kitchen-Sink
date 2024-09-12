import { test, expect, Page } from '@playwright/test';

// Helper function to clear all localStorage
async function clearLocalStorage(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

// Helper function to clear all sessionStorage
async function clearSessionStorage(page: Page) {
  await page.evaluate(() => {
    sessionStorage.clear();
  });
}

// Helper function to get all sessionStorage
async function getAllSessionStorage(page: Page): Promise<Record<string, string>> {
  return await page.evaluate(() => {
    const storageMap: Record<string, string> = {};
    Object.keys(sessionStorage).forEach(key => {
      storageMap[key] = sessionStorage.getItem(key) || '';
    });
    return storageMap;
  });
}

test('LocalStorage and SessionStorage operations', async ({ page }: { page: Page }) => {
    console.log('************************************************************************Storage******************************************************************************');
  // Navigate to the page
  await page.goto('https://example.cypress.io/commands/files');

  // Set initial localStorage values
  await page.evaluate(() => {
    localStorage.setItem('prop1', 'red');
    localStorage.setItem('prop2', 'blue');
    localStorage.setItem('prop3', 'magenta');
  });
  console.log('1. Set initial localStorage values');
  // Verify initial localStorage values
  try {
    const initialValues = await page.evaluate(() => ({
      prop1: localStorage.getItem('prop1'),
      prop2: localStorage.getItem('prop2'),
      prop3: localStorage.getItem('prop3')
    }));
    expect(initialValues.prop1).toBe('red');
    expect(initialValues.prop2).toBe('blue');
    expect(initialValues.prop3).toBe('magenta');
    console.log('   Initial localStorage values verified successfully');
  } catch (error) {
    console.error('   Error verifying initial localStorage values:', error);
  }

  // Clear all localStorage
  await clearLocalStorage(page);

  // Verify that all localStorage values are cleared
  try {
    const clearedValues = await page.evaluate(() => ({
      prop1: localStorage.getItem('prop1'),
      prop2: localStorage.getItem('prop2'),
      prop3: localStorage.getItem('prop3')
    }));
    console.log('2. Verify that all localStorage values are cleared');
    expect(clearedValues.prop1).toBeNull();
    expect(clearedValues.prop2).toBeNull();
    expect(clearedValues.prop3).toBeNull();
    console.log('    All localStorage values cleared successfully');
  } catch (error) {
    console.error('   Error verifying cleared localStorage values:', error);
  }

  // Set localStorage values again
  await page.evaluate(() => {
    localStorage.setItem('prop1', 'red');
    localStorage.setItem('prop2', 'blue');
    localStorage.setItem('prop3', 'magenta');
  });

  console.log('3. Set localStorage values again');

  // Clear specific key
  console.log('4. Clear specific key');
  await page.evaluate(() => {
    localStorage.removeItem('prop1');
  });

  // Verify that specific key is cleared
  console.log('5.  Verify that specific key is cleared');
  try {
    const valuesAfterKeyClear = await page.evaluate(() => ({
      prop1: localStorage.getItem('prop1'),
      prop2: localStorage.getItem('prop2'),
      prop3: localStorage.getItem('prop3')
    }));
    expect(valuesAfterKeyClear.prop1).toBeNull();
    expect(valuesAfterKeyClear.prop2).toBe('blue');
    expect(valuesAfterKeyClear.prop3).toBe('magenta');
    console.log('   Specific key cleared successfully');
  } catch (error) {
    console.error('   Error verifying specific key clearance:', error);
  }

  // Clear keys matching a pattern (e.g., keys that start with 'prop')
  await page.evaluate(() => {
    Object.keys(localStorage).forEach(key => {
      if (/^prop/.test(key)) {
        localStorage.removeItem(key);
      }
    });
  });

  // Verify remaining localStorage values

  console.log('6. Verify remaining localStorage values');
  try {
    const remainingValues = await page.evaluate(() => ({
      prop1: localStorage.getItem('prop1'),
      prop2: localStorage.getItem('prop2'),
      prop3: localStorage.getItem('prop3')
    }));
    expect(remainingValues.prop1).toBeNull();
    expect(remainingValues.prop2).toBeNull();
    expect(remainingValues.prop3).toBeNull();
    console.log('    Remaining localStorage values verified successfully');
  } catch (error) {
    console.error('   Error verifying remaining localStorage values:', error);
  }

  // Set initial sessionStorage values
  console.log('7. Set initial sessionStorage values-----------');
  await page.evaluate(() => {
    sessionStorage.setItem('prop4', 'cyan');
    sessionStorage.setItem('prop5', 'yellow');
    sessionStorage.setItem('prop6', 'black');
  });

  // Verify sessionStorage values
  try {
    const sessionStorageValues = await getAllSessionStorage(page);
    expect(sessionStorageValues).toEqual({
      'prop4': 'cyan',
      'prop5': 'yellow',
      'prop6': 'black'
    });
    console.log('    SessionStorage values verified successfully');
  } catch (error) {
    console.error('   Error verifying sessionStorage values:', error);
  }

  // Clear all sessionStorage
  await clearSessionStorage(page);

  // Verify that all sessionStorage values are cleared
  console.log('9. Verify that all sessionStorage values are cleared');
  try {
    const sessionStorageValuesAfterClear = await getAllSessionStorage(page);
    expect(sessionStorageValuesAfterClear).toEqual({});
    console.log('   All sessionStorage values cleared successfully');
  } catch (error) {
    console.error('   Error verifying cleared sessionStorage values:', error);
  }

});
