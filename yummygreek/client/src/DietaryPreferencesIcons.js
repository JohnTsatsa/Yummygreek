import React from 'react';

import glutenImage from './images/gluten-free.png';
import veganImage from './images/vegan.png';
import vegetarianImage from './images/vegeterian.png';
import lactoseImage from './images/lactose-free.png';
import blankImage from './images/blank.jpg';

const DietaryPreferencesIcons = ({ dietaryPreferences }) => {
  const images = [];
  
  const imageStyle = {
    width: '44px',
    height: '44px',
    marginRight: '15px',
  };

  if (Array.isArray(dietaryPreferences) && dietaryPreferences.length > 0) {
    if (dietaryPreferences.includes('gluten-free')) {
      images.push(<img key="gluten" src={glutenImage} alt="Gluten-free" style={imageStyle} />);
    }

    if (dietaryPreferences.includes('vegan')) {
      images.push(<img key="vegan" src={veganImage} alt="Vegan" style={imageStyle} />);
    }

    if (dietaryPreferences.includes('vegetarian')) {
      images.push(<img key="vegeterian" src={vegetarianImage} alt="Vegetarian" style={imageStyle} />);
    }

    if (dietaryPreferences.includes('lactose-free')) {
      images.push(<img key="lactose" src={lactoseImage} alt="Lactose-free" style={imageStyle} />);
    }
  } else {
    // If no dietary preferences are specified, add the blank image
    // so if there are no preferences,the card will still have the same size like the other
    images.push(<img key="blank" src={blankImage} alt="Blank" style={imageStyle} />);
  }

  return <div>{images}</div>;
};

export default DietaryPreferencesIcons;
