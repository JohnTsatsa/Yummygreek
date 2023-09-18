import React, { useState, useEffect } from 'react';

function DietaryFilter({ dietaryPreferences, onFilterChange, selectedFilters }) {

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

  return (
    <div className="dietary-filter">
      <h3 className="filter-title">Dietary Preferences:</h3>
      {dietaryPreferences.map((preference) => (
        <label
          key={preference}
          className={`filter-label ${selectedFiltersLocal.includes(preference) ? 'selected' : ''}`}
        >
          {preference}
          <input
            type="checkbox"
            value={preference}
            checked={selectedFiltersLocal.includes(preference)}
            onChange={handleFilterChange}
            style={{ display: 'none' }} // Hide the default checkbox
          />
        </label>
      ))}
    </div>
  );
}

export default DietaryFilter;
