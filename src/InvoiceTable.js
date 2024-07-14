import React, { useState } from 'react';

const InvoiceTable = ({ items, setItems }) => {
  const [item, setItem] = useState({ name: '', quantity: 0, price: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const addItem = () => {
    setItems([...items, item]);
    setItem({ name: '', quantity: 0, price: 0 });
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="invoice-items">
      <div className="form-group">
        <label>Item Name:</label>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={item.price}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={addItem}>Add Item</button>


      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td><button onClick={() => deleteItem(index)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
  );
};

export default InvoiceTable;
