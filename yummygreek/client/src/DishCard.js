import React from 'react';
import { useNavigate } from 'react-router-dom';

import DietaryPreferencesIcons from './DietaryPreferencesIcons'; // Import the new component


function DishCard({ name, image, id, description, price, ingredients, dietaryPreferences, allergens }) {

  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.setItem('scrollY', window.scrollY.toString()); // Save scroll position for when I go back to dishes
    navigate(`/dishes/${id}`, { state: { name, image, id, description, price, ingredients, dietaryPreferences, allergens } });
  };

  return (
    <div className="dish" onClick={handleClick}>
      <img src={image} alt={name} />
      <DietaryPreferencesIcons dietaryPreferences={dietaryPreferences} />
      <p>{name}</p>
    </div>
  );
}

export default DishCard;
