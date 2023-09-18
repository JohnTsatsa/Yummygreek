export async function fetchDishesFromAPI(setDishes) {
    try {
      const response = await fetch('http://localhost:3001/dishes'); // Replace with your API endpoint URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const dishData = data.map((dish) => ({
        id: dish.id,
        name: dish.name,
        image: dish.image,
        description: dish.description,
        price: dish.price,
        ingredients: dish.ingredients,
        dietaryPreferences: dish.tags.dietaryPreferences,
        allergens: dish.tags.allergens
      }));
      setDishes(dishData);
      console.log(dishData);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  }
  