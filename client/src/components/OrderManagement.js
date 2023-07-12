import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [selectedTable, setSelectedTable] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/menu-items');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchOrders();
    fetchMenuItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/api/orders', {
        tableId: selectedTable,
        menuItems: [selectedMenuItem],
      });

      alert('Order placed successfully!');
      setSelectedMenuItem('');
      setSelectedTable('');
    } catch (error) {
      console.error('Error placing order:', error);
      console.log('Error response:', error.response); // Add this line for error response details
      alert('Order placement failed. Please try again.');
    }
    
  };

  return (
    <div>
      <h1>Order Management</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="menuItem">Menu Item:</label>
          <select
            id="menuItem"
            name="menuItem"
            value={selectedMenuItem}
            onChange={(e) => setSelectedMenuItem(e.target.value)}
            required
          >
            <option value="">Select a menu item</option>
            {menuItems.map((menuItem) => (
              <option key={menuItem._id} value={menuItem._id}>
                {menuItem.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="table">Table:</label>
          <input
            type="text"
            id="table"
            name="table"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            required
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
      <h2>Orders:</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Table: {order.table}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderManagement;
