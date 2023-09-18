// AllergenFilter.js
import React, { useState, useEffect } from 'react';

function AllergenFilter({ allergens, onFilterChange, selectedFilters }) {
  const [selectedFiltersLocal, setSelectedFiltersLocal] = useState(selectedFilters);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    let updatedFilters = [];

    if (selectedFiltersLocal.includes(filterValue)) {
      updatedFilters = selectedFiltersLocal.filter((filter) => filter !== filterValue);
    } else {
      updatedFilters = [...selectedFiltersLocal, filterValue];
    }

    setSelectedFiltersLocal(updatedFilters);
    onFilterChange(updatedFilters);
  };
  // Trigger the filter change in the parent component (App)
  useEffect(() => {
    setSelectedFiltersLocal(selectedFilters);
  }, [selectedFilters]);

  // I want in the form to display only the allergic product
  // so instead of 'contains-nuts',display 'nuts'
  const allergenToDisplay = allergens.map((allergen) => {
    return allergen.replace('contains-', '');
  });


  return (
    <div className="allergen-filter">
      <h3 className="filter-title">Allergens:</h3>
      {allergens.map((allergen,index) => (
        <label key={index}
          className={`filter-label ${selectedFiltersLocal.includes(allergen) ? 'selected' : ''}`}
        >
          <input
            type="checkbox"
            value={allergen}
            checked={selectedFiltersLocal.includes(allergen)}
            onChange={handleFilterChange}
            className="filter-checkbox"
            style={{ display: 'none' }}
          />
          {allergenToDisplay[index]}
        </label>
      ))}
    </div>
  );
}

export default AllergenFilter;
