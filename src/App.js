import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

const App = () => {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      setProducts(storedProducts);
      const total = storedProducts.reduce(
        (acc, curr) => acc + parseInt(curr.price),
        0
      );
      setTotalValue(total);
    }
    const storedTotalValue = localStorage.getItem("totalValue");
    if (storedTotalValue) {
      setTotalValue(parseInt(storedTotalValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("totalValue", totalValue);
  }, [products, totalValue]);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
    setTotalValue(totalValue + parseInt(product.price));
  };

  const handleDeleteProduct = (productId) => {
    const deletedProduct = products.find((product) => product.id === productId);
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    setTotalValue(totalValue - parseInt(deletedProduct.price));
  };

  return (
    <div>
      <h1>Sellers Admin Page</h1>
      <ProductForm onAdd={handleAddProduct} />
      <hr></hr>
      <h2>Products</h2>

      <ProductList products={products} onDelete={handleDeleteProduct} />
      <hr></hr>
      <h2>Total value worth of products: Rs {totalValue}</h2>
    </div>
  );
};

export default App;
