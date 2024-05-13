import React from "react";

const Product = ({ product, onDelete }) => {
  return (
    <div>
      <span>
        {product.id} - {product.name} - Rs {product.price}
      </span>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
};

export default Product;
