// src/components/SearchFilter.js
import React, { useState, useEffect } from 'react';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(['All', ...data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="d-flex mb-4">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search products..."
        onChange={e => onSearch(e.target.value)}
      />
      <select
        className="form-select"
        onChange={e => onFilter(e.target.value)}
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
