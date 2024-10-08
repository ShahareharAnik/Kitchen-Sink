import { test, expect } from '@playwright/test';
import * as fs from 'fs';

// Function to read JSON file
function readJsonFile(filePath: string) {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

test('Extract details of the first donut in the JSON', async () => {
  // Read the JSON data
  const filePath = 'KitchenSink/jsonfiles/colors.json';
  const donuts = readJsonFile(filePath);

  // Access the first donut object
  const firstDonut = donuts[0]; // First donut in the array

  // Extract the details
  const name = firstDonut.name;
  const ppu = firstDonut.ppu;
  const batter1 = firstDonut.batters.batter[0]?.type;
  const batter2 = firstDonut.batters.batter[1]?.type;

  // Log the values
  console.log(`Name: ${name}`);
  console.log(`PPU: ${ppu}`);
  console.log(`Batter 1: ${batter1}`);
  console.log(`Batter 2: ${batter2}`);

  // Assertions (optional)
  expect(name).toBe('Cake');  // Adjust according to the actual value in your data
  expect(ppu).toBe(0.55);     // Adjust according to the actual value in your data
  expect(batter1).toBe('Regular');
  expect(batter2).toBe('Chocolate');
});
