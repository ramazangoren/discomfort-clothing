import React, { useState } from "react";
import "./Filters.css";
import { IoFilter } from "react-icons/io5";

const Filters = ({
  onFilterChange,
  onSortChange,
  totalTshirts,
  currentSort,
}) => {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const [showFilter, setShowFilter] = useState(false);

  const filterHandler = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <>
      <div className="filter-icon" onClick={filterHandler}>
        <span><IoFilter /></span> <p>Filters</p>
      </div>
      <div className={`filters-container ${showFilter ? "show" : ""}`}>
        <div className="filters">
          <label htmlFor="filter" className="filter-label">
            Filter:
          </label>
          <select
            name="filter"
            id="filter"
            className="filter-select"
            onChange={handleFilterChange}
          >
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        <div className="sortBy">
          <label htmlFor="sort" className="sort-label">
            Sort by:
          </label>
          <select
            name="sort"
            id="sort"
            className="sort-select"
            onChange={handleSortChange}
            value={currentSort}
          >
            <option value="a-z">Alphabetically, A-Z</option>
            <option value="z-a">Alphabetically, Z-A</option>
            <option value="low-high">Price, Low to High</option>
            <option value="high-low">Price, High to Low</option>
            <option value="old-new">Date, Old to New</option>
            <option value="new-old">Date, New to Old</option>
          </select>
        </div>

        <div className="filter-totalItem-container">
          <p>Total T-shirts: {totalTshirts}</p>
        </div>
      </div>
    </>
  );
};

export default Filters;

