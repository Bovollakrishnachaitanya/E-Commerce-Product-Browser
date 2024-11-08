// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const { title, price, description, category, image, rating } = product;

  // Conversion logic: If you have an exchange rate, you can multiply the USD price by the rate
  const exchangeRate = 83; // Example exchange rate from USD to INR (check the current rate)
  const priceInINR = (price * exchangeRate).toFixed(2);

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        Back to Products
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={image}
            alt={title}
            className="img-fluid"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-6">
          <h2>{title}</h2>
          <h4 className="text-primary">₹{priceInINR}</h4> {/* Updated to INR */}
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Rating:</strong> {rating.rate} / 5 ({rating.count} reviews)</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
