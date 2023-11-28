// ProductButton.js
import React from 'react';

const ProductButton = ({ product, onAddToOrder }) => {
  const addToOrder = () => {
    onAddToOrder(product);
  };

  return (
    <button onClick={addToOrder}>
      {product.name} - ${product.price.toFixed(2)}
    </button>
  );
};

export default ProductButton;
