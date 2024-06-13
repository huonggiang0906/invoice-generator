import { Item } from "./Invoice";

/**
 * Interface representing the properties of an InvoiceItem component.
 * @interface
 */
export interface InvoiceItemProps {
  /**
   * The index of the item in the invoice.
   * @type {number}
   */
  index: number;

  /**
   * The item in the invoice.
   * @type {Item}
   */
  item: Item;

  /**
   * Function to handle deleting an item.
   * @param {number} index - The index of the item to delete.
   */
  onDeleteItem: (index: number) => void;

  /**
   * Function to handle editing an item.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  onEditItem: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
