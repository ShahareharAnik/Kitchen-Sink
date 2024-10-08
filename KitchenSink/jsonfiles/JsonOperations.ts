import * as fs from 'fs';

export class JsonOperations {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  // Read and parse the JSON file
  private readJsonFile(): any[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  // Write data to the JSON file
  public writeJsonFile(data: any[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Get all data from JSON
  public getAll(): any[] {
    return this.readJsonFile();
  }

  // Get item by ID
  public getById(id: string): any | undefined {
    const data = this.readJsonFile();
    return data.find((item: any) => item.id === id);
  }

  // Add new item to the JSON file
  public addItem(newItem: any): void {
    const data = this.readJsonFile();
    data.push(newItem);
    this.writeJsonFile(data);
  }

  // Update an item by ID
  public updateItemById(id: string, updatedItem: any): void {
    const data = this.readJsonFile();
    const index = data.findIndex((item: any) => item.id === id);

    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem };
      this.writeJsonFile(data);
    } else {
      throw new Error(`Item with id ${id} not found`);
    }
  }

  // Delete an item by ID
  public deleteItemById(id: string): void {
    const data = this.readJsonFile();
    const filteredData = data.filter((item: any) => item.id !== id);

    if (data.length === filteredData.length) {
      throw new Error(`Item with id ${id} not found`);
    }

    this.writeJsonFile(filteredData);
  }

  // Find all items that match a specific condition
  public findItemsByCondition(condition: (item: any) => boolean): any[] {
    const data = this.readJsonFile();
    return data.filter(condition);
  }

  // Update a specific field for an item by ID
  public updateFieldById(id: string, fieldName: string, newValue: any): void {
    const data = this.readJsonFile();
    const item = data.find((item: any) => item.id === id);

    if (item) {
      item[fieldName] = newValue;
      this.writeJsonFile(data);
    } else {
      throw new Error(`Item with id ${id} not found`);
    }
  }

  // Get the first item in the array
  public getFirstItem(): any {
    const data = this.readJsonFile();
    return data[0];
  }

  // Remove a specific field from all items
  public removeFieldFromAllItems(fieldName: string): void {
    const data = this.readJsonFile();
    const updatedData = data.map((item: any) => {
      delete item[fieldName];
      return item;
    });
    this.writeJsonFile(updatedData);
  }
}
