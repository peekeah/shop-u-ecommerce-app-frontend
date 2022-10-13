import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductsContext from "./ProductsContext";

const ProductsState = (props) => {
  const URL = process.env.REACT_APP_API;
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Getting products from api and storing in context
  const getData = async () => {
    const response = await axios.get(`${URL}/products`);
    let data = response.data.map((s) => ({ ...s, isProductInCart: false }));

    // Toggling button for products already present in cart
    let items = JSON.parse(localStorage.getItem("cart"));
    items.forEach(s => {
      let temp = data.filter(product => s._id === product._id)[0];
      if(temp) {
        const index = data.findIndex(product => product._id === temp._id);
        temp.isProductInCart = true;
        data[index] = temp;
      }
    })
    setProducts(data);
  };

  // Toggling button on Click
  const toggleButton = (id, value) => {
    const productsCopy = [...products];
    const index = productsCopy.findIndex((s) => s._id === id);
    const temp = productsCopy[index];
    if (temp) {
      temp.isProductInCart =  value || !temp.isProductInCart;
      productsCopy[index] = temp;
      setProducts(productsCopy);
    }
  };

  // Adding product to cart
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, { ...product, qty: 1 }]);
    toggleButton(product._id);
  };

  // Removing product from cart
  const removeFromCart = (product) => {
    setCartItems(() => cartItems.filter((s) => s._id !== product._id));
    toggleButton(product._id);
  };

  // Total sum of all the product with quantity
  const orderTotal = () => {
    const total = cartItems
      .map((s) => s.price * s.qty)
      .reduce((acc, item) => acc + item, 0);
    return total.toFixed(2);
  };

  // Updating quantity of product
  const updateQty = (productId, qty) => {
    const cartItemsCopy = [...cartItems];
    const index = cartItemsCopy.findIndex((s) => s._id === productId);
    const temp = cartItems[index];
    temp.qty = qty;
    cartItemsCopy[index] = temp;
    setCartItems(cartItemsCopy);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQty,
        orderTotal,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
