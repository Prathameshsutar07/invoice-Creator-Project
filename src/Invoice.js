import React, { useState, useRef, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import InvoiceTable from './InvoiceTable';
import ReactToPrint from 'react-to-print';
import './App.css';  // Import the CSS file

const Invoice = () => {
  const [customer, setCustomer] = useState({ name: '', address: '', gstNumber: '' });
  const [items, setItems] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const componentRef = useRef();

  useEffect(() => {
    setInvoiceNumber(generateInvoiceNumber());
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    //const totals=total+(total*5/100);
    setTotalAmount(total);
  }, [items]);

  const generateInvoiceNumber = () => {
    return `INV-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const convertNumberToWords = (amount) => {
    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

    let words = '';

    if (amount === 0) return 'Zero';

    const numberToWords = (num) => {
      if (num < 10) return units[num];
      else if (num < 20) return teens[num - 10];
      else if (num < 100) return tens[Math.floor(num / 10)] + ' ' + units[num % 10];
      else if (num < 1000) return units[Math.floor(num / 100)] + ' Hundred ' + numberToWords(num % 100);
      else return numberToWords(Math.floor(num / 1000)) + ' Thousand ' + numberToWords(num % 1000);
    };

    words = numberToWords(amount);

    return words.trim();
  };

  return (
    <div className="App">
      <h2>Customer Information</h2>
      <CustomerForm customer={customer} setCustomer={setCustomer} />

      <h2>Invoice Items</h2>
      <InvoiceTable items={items} setItems={setItems} />

      <ReactToPrint
        trigger={() => <button>Generate Invoice</button>}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>
        <InvoiceTemplate
          ref={componentRef}
          customer={customer}
          items={items}
          invoiceNumber={invoiceNumber}
          currentDate={currentDate}
          totalAmount={totalAmount}
          convertNumberToWords={convertNumberToWords}
        />
      </div>
    </div>
  );
};

const InvoiceTemplate = React.forwardRef(({ customer, items, invoiceNumber, currentDate, totalAmount, convertNumberToWords }, ref) => (
  <div ref={ref} className="invoice-template">
    <h1>Invoice</h1>
    <div className="invoice-header">
      <div>
        <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
        <p><strong>Invoice Date:</strong> {currentDate}</p>
      </div>
      <div>
        <p><strong>Sold By</strong></p>
        <p>COST 2 COST</p>
        <p>Cost 2 Cost, A-27, Butler Plaza Bareilly, UP 243001</p>
        <p>Bareilly, Uttar Pradesh - 243001</p>
      </div>
      <div>
        <p><strong>Shipped From</strong></p>
        <p>COST 2 COST</p>
        <p>WH-04 Sector 67 Noida Uttar Pradesh</p>
        <p>Noida, Uttar Pradesh - 201301</p>
        <p>VAT TIN No: 9507132062</p>
        <p>PAN: AWFPM0291L</p>
        <p>CST No: 9507132062</p>
      </div>
    </div>
    <div className="invoice-addresses">
      <div>
        <p><strong>Shipping Address</strong></p>
        <p>{customer.name}</p>
        <p>{customer.address}</p>
      </div>
      <div>
        <p><strong>Billing Address</strong></p>
        <p>{customer.name}</p>
        <p>{customer.address}</p>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price (INR)</th>
          <th>Tax Type</th>
          <th>Tax Rate(%)</th>
          <th>Tax Amount (INR)</th>
          <th>Total Amount (INR)</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price-(item.price*5/100)}</td>
            <td>CST</td>
            <td>5</td>
            <td>{(item.price * item.quantity * 0.05).toFixed(2)}</td>
            <td>{(item.price * item.quantity ).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6" style={{ textAlign: 'right' }}>Total</td>
          <td>{totalAmount.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
    <div className="invoice-footer">
      <p><strong>Total Amount in Words:</strong> {convertNumberToWords(totalAmount)} Rupees Only</p>
    </div>
  </div>
));

export default Invoice;
