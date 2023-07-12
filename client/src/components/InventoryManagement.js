import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState('');
  const [newMenuItemIngredients, setNewMenuItemIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/ingredients');
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
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

    fetchIngredients();
    fetchMenuItems();
  }, []);

  const handleOrder = async (menuItem) => {
    // Check if all required ingredients are available
    const isAvailable = menuItem.ingredients.every((ingredient) => {
      const availableIngredient = ingredients.find((item) => item._id === ingredient._id);
      return availableIngredient && availableIngredient.quantity >= ingredient.quantity;
    });

    if (isAvailable) {
      try {
        // Update ingredient quantities
        const updatedIngredients = menuItem.ingredients.map((ingredient) => {
          const availableIngredient = ingredients.find((item) => item._id === ingredient._id);
          return {
            _id: ingredient._id,
            name: ingredient.name,
            quantity: availableIngredient.quantity - ingredient.quantity,
          };
        });

        await axios.patch('http://localhost:4000/api/ingredients', updatedIngredients);

        // Place the order
        await axios.post('http://localhost:4000/api/orders', {
          menuItemId: menuItem._id,
        });

        alert('Order placed successfully!');
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Order placement failed. Please try again.');
      }
    } else {
      alert('Insufficient ingredients. Please update the inventory.');
    }
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/menu-items', {
        name: newMenuItem,
        ingredients: newMenuItemIngredients,
      });

      const createdMenuItem = response.data;
      setMenuItems([...menuItems, createdMenuItem]);
      setNewMenuItem('');
      setNewMenuItemIngredients([]);
      alert('Menu item created successfully!');
    } catch (error) {
      console.error('Error creating menu item:', error);
      alert('Menu item creation failed. Please try again.');
    }
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = [...newMenuItemIngredients];
    updatedIngredients[index] = e.target.value;
    setNewMenuItemIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...newMenuItemIngredients];
    updatedIngredients.splice(index, 1);
    setNewMenuItemIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setNewMenuItemIngredients([...newMenuItemIngredients, '']);
  };

  return (
    <div>
      <h1>Inventory Management</h1>
      <h2>Ingredients:</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            {ingredient.name} - Quantity: {ingredient.quantity}
          </li>
        ))}
      </ul>
      <h2>Menu Items:</h2>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem._id}>
            {menuItem.name} - Ingredients:{' '}
            {menuItem.ingredients.map((ingredient) => ingredient.name).join(', ')}
            <button onClick={() => handleOrder(menuItem)}>Place Order</button>
          </li>
        ))}
      </ul>
      <h2>Add Menu Item:</h2>
      <form onSubmit={handleAddMenuItem}>
        <div>
          <label htmlFor="newMenuItem">Name:</label>
          <input
            type="text"
            id="newMenuItem"
            value={newMenuItem}
            onChange={(e) => setNewMenuItem(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          {newMenuItemIngredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                required
              />
              <button type="button" onClick={() => handleRemoveIngredient(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>
        <button type="submit">Add Menu Item</button>
      </form>
    </div>
  );
};

export default InventoryManagement;
