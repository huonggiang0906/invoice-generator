import { uid } from "uid";

/**
 * Interface representing an item in the invoice.
 * @interface
 */
export interface Item {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

/**
 * Class representing an invoice.
 * @class
 */
export class Invoice {
  private items: Item[];

  /**
   * Create an invoice.
   * @constructor
   * @param {Item[]} [items=[{ id: uid(), description: "", quantity: 1, price: 1.0 }]] - Array of items in the invoice.
   */
  constructor(
    items: Item[] = [{ id: uid(), description: "", quantity: 1, price: 1.0 }]
  ) {
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
   * @returns {number} The total price of the invoice.
   */
  calculateTotal(): number {
    return this.items.reduce((total, item) => {
      if (item.description.trim() !== "") {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  }

  /**
   * Get all items in the invoice.
   * @returns {Item[]} The array of items.
   */
  getItems(): Item[] {
    return this.items;
  }
}
