// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import SearchFilter from '../components/SearchFilter';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [exchangeRate, setExchangeRate] = useState(83); // Default exchange rate (USD to INR)

  // Fetch the real-time exchange rate for USD to INR
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRate(data.rates.INR); // Update the exchange rate
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);

  // Convert price from USD to INR
  const convertToINR = (price) => (price * exchangeRate).toFixed(2);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (category) => {
    setCategory(category);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">E-Commerce Product Browser</h1>
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      <ProductList
        searchTerm={searchTerm}
        category={category}
        convertToINR={convertToINR} // Pass the conversion function to ProductList
      />
    </div>
  );
};

export default HomePage;
