// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ searchTerm, category, convertToINR }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'https://fakestoreapi.com/products';
        if (category && category !== 'All') {
          url = `https://fakestoreapi.com/products/category/${category}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (filteredProducts.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="row">
      {filteredProducts.map(product => (
        <div className="col-md-4 mb-4" key={product.id}>
          <ProductCard product={product} convertToINR={convertToINR} /> {/* Pass convertToINR here */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
