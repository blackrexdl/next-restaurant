"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.title === item.title);
      if (existing) {
        return prev.map((i) =>
          i.title === item.title
            ? { ...i, qty: (i.qty || 1) + 1 }
            : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (title) => {
    setCart((prev) =>
      prev.map((item) =>
        item.title === title ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decreaseQty = (title) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.title === title
            ? { ...item, qty: Math.max((item.qty || 1) - 1, 1) }
            : item
        )
    );
  };

  const removeFromCart = (title) => {
    setCart((prev) => prev.filter((i) => i.title !== title));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);