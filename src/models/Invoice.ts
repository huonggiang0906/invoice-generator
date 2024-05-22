/**
 * Interface for an item in the invoice.
 */
export interface Item {
    description: string;
    quantity: number;
    price: number;
  }
  
  /**
   * Class representing an invoice.
   */
  export class Invoice {
    private items: Item[];
  
    /**
     * Create an invoice.
     * @param {Item[]} items - Array of items in the invoice.
     */
    constructor(items: Item[] = []) {
      this.items = items;
    }
  
    /**
     * Add an item to the invoice.
     * @param {Item} item - The item to add.
     */
    addItem(item: Item): void {
      this.items.push(item);
    }
  
    /**
     * Remove an item from the invoice.
     * @param {number} index - The index of the item to remove.
     */
    removeItem(index: number): void {
      this.items.splice(index, 1);
    }
  
    /**
     * Calculate the total price of the invoice.
     * @returns {number} The total price.
     */
    calculateTotal(): number {
      return this.items.reduce((total, item) => total + item.quantity * item.price, 0);
    }
  
    /**
     * Get all items in the invoice.
     * @returns {Item[]} The array of items.
     */
    getItems(): Item[] {
      return this.items;
    }
  }
  