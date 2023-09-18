import React from 'react';

function PriceFilter({ selectedPriceRange, onFilterChange }) {


  const handlePriceRangeChange = (event) => {
    const priceRange = event.target.value;
    onFilterChange(priceRange); // Immediately trigger the filter change
  };

  return (
    <div className="price-filter">
      <h3 className="filter-title">Price Range:</h3>
      <label className={`filter-label ${selectedPriceRange === 'under 8' ? 'selected' : ''}`}>
        <input
          type="radio"
          value="under 8"
          checked={selectedPriceRange === 'under 8'}
          onChange={handlePriceRangeChange}
          style={{ display: 'none' }} // Hide the default radio button
        />
        Under 8€
      </label>
      <label className={`filter-label ${selectedPriceRange === '8-11' ? 'selected' : ''}`}>
        <input
          type="radio"
          value="8-11"
          checked={selectedPriceRange === '8-11'}
          onChange={handlePriceRangeChange}
          style={{ display: 'none' }} // Hide the default radio button
        />
        8-11€
      </label>
      <label className={`filter-label ${selectedPriceRange === '11-13' ? 'selected' : ''}`}>
        <input
          type="radio"
          value="11-13"
          checked={selectedPriceRange === '11-13'}
          onChange={handlePriceRangeChange}
          style={{ display: 'none' }} // Hide the default radio button
        />
        11-13€
      </label>
      <label className={`filter-label ${selectedPriceRange === 'over 13' ? 'selected' : ''}`}>
        <input
          type="radio"
          value="over 13"
          checked={selectedPriceRange === 'over 13'}
          onChange={handlePriceRangeChange}
          style={{ display: 'none' }} // Hide the default radio button
        />
        Over 13€
      </label>
    </div>
  );
}

export default PriceFilter;
