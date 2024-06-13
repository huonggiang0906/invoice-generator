import React, { useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../helpers/incrementString';
import { Invoice } from '../models/Invoice';

/**
 * Functional component representing the invoice form.
 * @returns {JSX.Element} The rendered invoice form component.
 */
const InvoiceForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [discount, setDiscount] = useState<string>('');
  const [tax, setTax] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<number>(1);
  const [cashierName, setCashierName] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [invoice, setInvoice] = useState<Invoice>(new Invoice([
    {
      id: uid(6),
      description: '',
      quantity: 1,
      price: 1.00,
    },
  ]));

  /**
   * Handle form submission to review the invoice.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const reviewInvoiceHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsOpen(true);
  };

  /**
   * Handle adding the next invoice.
   * This function increments the invoice number and resets the invoice state with a new invoice.
   */
  const addNextInvoiceHandler = () => {
    setInvoiceNumber(parseInt(incrementString(invoiceNumber.toString()), 10));
    setInvoice(new Invoice([
      {
        id: uid(6),
        description: '',
        quantity: 1,
        price: 1.00,
      },
    ]));
  };

  /**
   * Handle adding a new item to the invoice.
   * This function creates a new item with default values and adds it to the invoice.
   */
  const addItemHandler = () => {
    const id = uid(6);
    invoice.addItem({ id, description: '', quantity: 1, price: 1.00 });
    setInvoice(new Invoice([...invoice.getItems()]));
  };

  /**
   * Handle deleting an item from the invoice.
   * @param {number} index - The index of the item to delete.
   * This function removes an item from the invoice based on the provided index.
   */
  const deleteItemHandler = (index: number) => {
    invoice.removeItem(index);
    setInvoice(new Invoice([...invoice.getItems()]));
  };

  /**
   * Handle editing an item in the invoice.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   * This function updates the item properties based on user input.
   */
  const editItemHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = event.target;
    const index = parseInt(id, 10);
    const items = invoice.getItems();
    const item = items[index];

    if (name === 'description') {
      item.description = value;
    } else if (name === 'quantity') {
      item.quantity = parseInt(value, 10);
    } else if (name === 'price') {
      item.price = parseFloat(value);
    }
    setInvoice(new Invoice([...items]));
  };

  // Calculate the subtotal, tax rate, discount rate, and total of the invoice
  const subtotal = invoice.calculateTotal();
  const taxRate = isNaN(parseFloat(tax)) ? 0 : (parseFloat(tax) * subtotal) / 100;
  const discountRate = isNaN(parseFloat(discount)) ? 0 : (parseFloat(discount) * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2 rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{new Date().toLocaleDateString('en-GB')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              className="max-w-[130px]"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(Number(event.target.value))}
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>
        <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
          <label
            htmlFor="cashierName"
            className="text-sm font-bold sm:text-base"
          >
            Cashier:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Cashier name"
            type="text"
            name="cashierName"
            id="cashierName"
            value={cashierName}
            onChange={(event) => setCashierName(event.target.value)}
          />
          <label
            htmlFor="customerName"
            className="col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Customer:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Customer name"
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
        </div>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>ITEM</th>
              <th>QTY</th>
              <th className="text-center">PRICE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {invoice.getItems().map((item, index) => (
              <InvoiceItem
                key={index}
                index={index}
                item={item}
                onDeleteItem={deleteItemHandler}
                onEditItem={editItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Discount:</span>
            <span>
              ({discount || '0'}%)${discountRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Tax:</span>
            <span>
              ({tax || '0'}%)${taxRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              ${total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              cashierName,
              customerName,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            items={invoice.getItems()}
            onAddNextInvoice={addNextInvoiceHandler}
          />
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-bold md:text-base" htmlFor="tax">
                Tax rate:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="discount"
              >
                Discount rate:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
