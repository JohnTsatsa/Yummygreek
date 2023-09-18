import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DietaryPreferencesIcons from './DietaryPreferencesIcons'; // Import the new component

function DishDetails({ onAddToOrder }) {
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate(); // for 'back' button


  const { name, image, description, price, ingredients, dietaryPreferences, allergens } = state;
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1

  // render the details page with specific scroll position Y
  useEffect(() => {
    window.scrollTo(0, 70);
  }, []);


  const handleAddToOrderClick = () => {
    const totalPrice = price * quantity;
    const orderedItem = {
      name,
      quantity,
      totalPrice,
      image
    };
    onAddToOrder(orderedItem); // Call the onAddToOrder function with the ordered item
  };

  const handleQuantityChange = (newQuantity) => {
    // Ensure the quantity cannot be less than 0
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="dish-details">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>Description: {description}</p>
      <p>Price: ${price}</p>
      <p>Ingredients: {ingredients.join(', ')}</p>
      {allergens.length > 0 && (
        <p>Allergens: {allergens.join(', ')}</p>
      )}
      <DietaryPreferencesIcons dietaryPreferences={dietaryPreferences} />

      <div className="quantity-container">
        <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
        <input
          type="number"
          value={quantity}
          readOnly
          onChange={(e) => handleQuantityChange()}
        />
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
      </div>

      <button className="navbar-button" onClick={handleAddToOrderClick}>Add to Order</button>
      <button className="navbar-button" onClick={() => navigate('/dishes')}>Back to Dishes</button>
    </div>
  );
}

export default DishDetails;
