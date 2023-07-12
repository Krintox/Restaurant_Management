import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuItemsPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/menu-items');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleCreateMenuItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/menu-items', {
        name,
        ingredients,
      });

      if (response.status === 201) {
        alert('Menu item created successfully!');
        fetchMenuItems(); // Refresh menu items list
        setName('');
        setIngredients([]);
      }
    } catch (error) {
        if (error.response) {
          // Request was made and server responded with an error status code
          console.error('Error creating menu item:', error.response.data);
          alert('Failed to create menu item. Please try again.');
        } else if (error.request) {
          // Request was made but no response was received
          console.error('No response received:', error.request);
          alert('No response received from the server. Please try again.');
        } else {
          // Error occurred during request setup
          console.error('Error setting up the request:', error.message);
          alert('An error occurred while setting up the request. Please try again.');
        }
      }
  };

  return (
    <div>
      <h1>Menu Items</h1>
      <form onSubmit={handleCreateMenuItem}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value.split(','))}
            required
          />
        </div>
        <button type="submit">Create Menu Item</button>
      </form>
      <h2>Menu Item List</h2>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem._id}>
            {menuItem.name} - Ingredients: {menuItem.ingredients.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemsPage;
