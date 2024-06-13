import { Item } from "./Invoice";

/**
 * Interface representing the properties of an InvoiceModal component.
 * @interface
 */
export interface InvoiceModalProps {
  /**
   * Indicates whether the modal is open.
   * @type {boolean}
   */
  isOpen: boolean;

  /**
   * Function to set the open state of the modal.
   * @param {boolean} isOpen - The new open state of the modal.
   */
  setIsOpen: (isOpen: boolean) => void;

  /**
   * Information about the invoice.
   * @type {Object}
   * @property {number} invoiceNumber - The number of the invoice.
   * @property {string} cashierName - The name of the cashier.
   * @property {string} customerName - The name of the customer.
   * @property {number} subtotal - The subtotal of the invoice.
   * @property {number} taxRate - The tax rate applied to the invoice.
   * @property {number} discountRate - The discount rate applied to the invoice.
   * @property {number} total - The total amount of the invoice.
   */
  invoiceInfo: {
    invoiceNumber: number;
    cashierName: string;
    customerName: string;
    subtotal: number;
    taxRate: number;
    discountRate: number;
    total: number;
  };

  /**
   * Array of items in the invoice.
   * @type {Item[]}
   */
  items: Item[];

  /**
   * Function to handle adding the next invoice.
   */
  onAddNextInvoice: () => void;
}
