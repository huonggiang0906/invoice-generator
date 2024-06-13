/**
 * Interface representing the properties of an InvoiceField component.
 * @interface
 */
export interface InvoiceFieldProps {
  /**
   * Function to handle editing an item.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  onEditItem: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Data for the input field.
   * @type {Object}
   * @property {string} className - The class name for the input field.
   * @property {string} type - The type of the input field.
   * @property {string} [placeholder] - The placeholder text for the input field (optional).
   * @property {number | string} [min] - The minimum value for the input field (optional).
   * @property {number | string} [max] - The maximum value for the input field (optional).
   * @property {number | string} [step] - The step value for the input field (optional).
   * @property {string} name - The name attribute for the input field.
   * @property {string} id - The id attribute for the input field.
   * @property {string | number} value - The value of the input field.
   */
  cellData: {
    className: string;
    type: string;
    placeholder?: string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    name: string;
    id: string;
    value: string | number;
  };
}
