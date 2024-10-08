import { JsonOperations } from './JsonOperations';

// Create an instance of JsonOperations with your JSON file
const jsonOps = new JsonOperations('./colors.json');

// Get all items
console.log('All items:', jsonOps.getAll());

// Get item by ID
console.log('Item with id "0001":', jsonOps.getById('0001'));

// Add a new item
jsonOps.addItem({ id: '0003', type: 'donut', name: 'Old Fashioned', ppu: 0.75 });
console.log('After adding new item:', jsonOps.getAll());

// Update an item by ID
jsonOps.updateItemById('0001', { name: 'Updated Cake', ppu: 0.60 });
console.log('After updating item "0001":', jsonOps.getAll());

// Delete an item by ID
jsonOps.deleteItemById('0002');
console.log('After deleting item "0002":', jsonOps.getAll());

// Update a specific field
jsonOps.updateFieldById('0001', 'name', 'New Cake Name');
console.log('After updating name field:', jsonOps.getAll());

// Remove a field from all items
jsonOps.removeFieldFromAllItems('ppu');
console.log('After removing ppu from all items:', jsonOps.getAll());

/**
 * Function to update batter type with id '1004'
 */
function updateBatterType() {
  // Read all items from the JSON
  const donuts = jsonOps.getAll();

  // Find the first donut and access the batter array
  const firstDonut = donuts[0];
  const batter = firstDonut.batters.batter;

  // Find the specific batter with id '1004'
  const batterItem = batter.find((b: any) => b.id === '1004');

  if (batterItem) {
    // Update the type field
    batterItem.type = "New Devil's Food";  // New type

    // Write the updated data back to the JSON file
    jsonOps. writeJsonFile(donuts);

    console.log(`Updated batter type:`, batterItem);
  } else {
    console.log('Batter with id "1004" not found');
  }
}

// Call the function to update the batter type
updateBatterType();
