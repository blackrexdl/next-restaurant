"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
const [cart, setCart] = useState(() => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
});

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item) => {
    const id = item.id ?? item.title;

    setCart((prev) => {
      const existing = prev.find((p) => p.id === id);

      if (existing) {
        return prev.map((p) =>
          p.id === id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [
        ...prev,
        {
          ...item,
          id,
          price: Number(item.price) || 0,
          qty: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(item.qty - 1, 1) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((total, item) => {
    const qty = item.qty ?? 1;
    const price = Number(item.price) || 0;
    return total + price * qty;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}