import React from 'react';
import DietaryFilter from './DietaryFilter';
import AllergenFilter from './AllergenFilter';
import PriceFilter from './PriceFilter';

function FilterForm({
  dietaryPreferences,
  onDietaryFilterChange,
  selectedDietaryPreferences,
  allergens,
  onAllergenFilterChange,
  selectedAllergens,
  selectedPriceRange,
  onPriceFilterChange,
  onClearFilters,
}) {
  return (
    <div className='filter-form'>
      <DietaryFilter
        dietaryPreferences={dietaryPreferences}
        onFilterChange={onDietaryFilterChange}
        selectedFilters={selectedDietaryPreferences}
      />
      <AllergenFilter
        allergens={allergens}
        onFilterChange={onAllergenFilterChange}
        selectedFilters={selectedAllergens}
      />
      <PriceFilter
        selectedPriceRange={selectedPriceRange}
        onFilterChange={onPriceFilterChange}
      />
      <button onClick={onClearFilters}>Clear Filters</button>
    </div>
  );
}

export default FilterForm;
