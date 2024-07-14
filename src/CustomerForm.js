import React from 'react';

const CustomerForm = ({ customer, setCustomer }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  return (
    <div className="customer-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={customer.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>GST Number:</label>
        <input
          type="text"
          name="gstNumber"
          value={customer.gstNumber}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CustomerForm;
