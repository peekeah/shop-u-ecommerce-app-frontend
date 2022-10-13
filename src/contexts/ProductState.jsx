import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsContext from "./ProductsContext";

const ProductState = (props) => {
  const URL = process.env.REACT_APP_API;

  const [products, setProducts] = useState([]);


  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    const response = await axios.get(`${URL}/products`);
    const data = response.data.map(s => ({...s, isProductInCart: false}));
    setProducts(data);
  };

  const toggleButton = (id) => {
    const productsCopy = [...products];
    const index = productsCopy.findIndex(s => s._id === id);
    const temp = productsCopy[index];
    temp.isProductInCart = ! temp.isProductInCart;
    productsCopy[index] = temp;
    setProducts(productsCopy);
  }


return (
    <ProductsContext.Provider
      value={{
      products, toggleButton
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductState;