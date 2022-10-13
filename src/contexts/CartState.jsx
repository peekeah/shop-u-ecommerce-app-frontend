import React, { useState } from "react";
import { useEffect } from "react";
import CartContext from "./CartContext";

const CartState = (props) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, { ...product, qty: 1 }]);
  };

  const removeFromCart = (product) => {
    setCartItems(() => cartItems.filter((s) => s._id !== product._id));
  };

  const orderTotal = () => {
    const total = cartItems.map(s => s.price * s.qty ).reduce((acc, item) => acc + item, 0);
    return total.toFixed(2);
  }

  const updateQty = (productId, qty) => {
    const cartItemsCopy = [...cartItems];
    const index = cartItemsCopy.findIndex((s) => s._id === productId);
    const temp = cartItems[index];
    temp.qty = qty;
    cartItemsCopy[index] = temp;
    setCartItems(cartItemsCopy);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQty,
        orderTotal
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
