import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import DishCard from './DishCard';
import DishDetails from './DishDetails';
import FilterForm from './Filter Components/FilterForm';
import OrderSummary from './OrderSummary';
import NavbarButton from './NavbarButton';

import { fetchDishesFromAPI } from './functions/fetchDishesFunction';
import { filterDishes } from './functions/filterDishesFunction';






function App() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [totalOrder, setTotalOrder] = useState(0); // for total price of the order
  const [orderedItems, setOrderedItems] = useState([]); // keeping track of the orders (dish,quantity,total price)



  //? because I was having an extra checkbox on my filter form
  // bring all the options that can be used from the database
  const uniqueDietaryPreferences = Array.from(new Set(dishes.flatMap((dish) => dish.dietaryPreferences || [])));
  const uniqueAllergens = Array.from(new Set(dishes.flatMap((dish) => dish.allergens || [])));
  //? ============================================= ?//

  // in order to use useLocation,needs to be wrapped in <Router>.I did wrapping in index.js
  const location = useLocation(); // it will need so it will render the 'filter form' conditionally
  const navigate = useNavigate();

  //? use the previous scroll postition the user was
  useEffect(() => {
    const scrollY = sessionStorage.getItem('scrollY');
    if (scrollY && location.pathname === '/dishes') {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem('scrollY');
    }
  }, [location]);


  //? bring the dishes from database
  useEffect(() => {
    // Fetch dishes from the API
    fetchDishesFromAPI(setDishes);
  }, []);

  //? filter the dishes according to user's preferences
  useEffect(() => {
    // Update filtered dishes whenever selected filters change
    const filtered = filterDishes(dishes, selectedDietaryPreferences, selectedAllergens, selectedPriceRange);
    setFilteredDishes(filtered);
    console.log(filtered);
  }, [dishes, selectedDietaryPreferences, selectedAllergens, selectedPriceRange]);






  const handleDietaryFilterChange = (filters) => {
    setSelectedDietaryPreferences(filters);
  };

  const handleAllergenFilterChange = (filters) => {
    setSelectedAllergens(filters);
  };
  const handlePriceFilterChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const clearFilters = () => {
    setSelectedDietaryPreferences([]);
    setSelectedAllergens([]);
    setSelectedPriceRange('');
  };

  const handleAddToOrder = (item) => {
    setTotalOrder(totalOrder + item.totalPrice);
    setOrderedItems([...orderedItems, item]); // Add the ordered item to the array
  };



  return (
    <div className="container">
      <nav className="sticky-navbar">
        {totalOrder > 0 && (
          <NavbarButton
            location={location} //useLocation has to be wrapped in <Router>.I did wrapping in index.js 
            navigate={navigate}
          />
        )}
        <p className="total-order">Total Order: ${totalOrder}</p> {/* Display the total order */}
      </nav>
      <Routes>
        <Route
          path="/dishes"
          element={
            <div className="dishes-page">
              {(() => {
                // Compute isDishesRoute within the Router context
                const isDishesRoute = location.pathname === '/dishes';
                return isDishesRoute ? (
                  <>
                    <FilterForm
                      dietaryPreferences={uniqueDietaryPreferences}
                      onDietaryFilterChange={handleDietaryFilterChange}
                      selectedDietaryPreferences={selectedDietaryPreferences}
                      allergens={uniqueAllergens}
                      onAllergenFilterChange={handleAllergenFilterChange}
                      selectedAllergens={selectedAllergens}
                      selectedPriceRange={selectedPriceRange}
                      onPriceFilterChange={handlePriceFilterChange}
                      onClearFilters={clearFilters}
                    />
                  </>
                ) : null;
              })()}
              <div className="dish-list">
                {filteredDishes.length === 0 ? (
                  <p>No dishes matches your criteria</p>  // create a component here
                ) : (
                  filteredDishes.map((dish, index) => (
                    <DishCard
                      key={index}
                      name={dish.name}
                      image={dish.image}
                      id={dish.id}
                      description={dish.description}
                      price={dish.price}
                      ingredients={dish.ingredients}
                      dietaryPreferences={dish.dietaryPreferences}
                      allergens={dish.allergens}
                    />
                  ))
                )}
              </div>
            </div>
          }
        />
        <Route path="/dishes/order"
          element={<OrderSummary
            dishes={dishes}
            totalOrder={totalOrder}
            orderedItems={orderedItems}
          />}
        />
        <Route path="/dishes/:id"
          element={<DishDetails
            onAddToOrder={handleAddToOrder}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;
