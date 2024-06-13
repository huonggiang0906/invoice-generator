import React from 'react';
import { InvoiceFieldProps } from '../models/InvoiceField';

/**
 * Functional component representing an invoice field input.
 * @param {InvoiceFieldProps} props - The properties for the invoice field.
 * @returns {JSX.Element} The rendered invoice field input component.
 */
const InvoiceField: React.FC<InvoiceFieldProps> = ({ onEditItem, cellData }) => {
  return (
    <input
      className={cellData.className}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      required
    />
  );
};

export default InvoiceField;
