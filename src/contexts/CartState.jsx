import React, { useState } from "react";
import CartContext from "./CartContext";

const CartState = (props) => {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);
  const addToCart = (product) => {
    console.log("successfully added to cart");
    setCartItems((prev) => [...prev, { ...product, qty: 1 }]);
  };

  const removeFromCart = (product) => {
    console.log("successfully removed from cart");
    setCartItems(() => cartItems.filter((s) => s._id !== product._id));
  };

  const updateQty = (productId, qty) => {
    const cartItemsCopy = [...cartItems];
    const index = cartItemsCopy.findIndex((s) => s._id === productId);
    const temp = cartItems[index];
    // console.log(temp)
    temp.qty = qty;
    cartItemsCopy[index] = temp;
    setCartItems(cartItemsCopy);
  };

  //#BUG: cart buttons are not toggling parallely
  const toggleAddToCartButton = (product) => {
    const isPresent = cartItems.findIndex((s) => s._id === product._id);
    if (isPresent) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        toggleAddToCartButton,
        updateQty
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
