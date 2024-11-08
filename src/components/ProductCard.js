// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, title, price, image } = product;

  return (
    <div className="card h-100">
      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">${price.toFixed(2)}</p>
        <Link to={`/product/${id}`} className="mt-auto btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
