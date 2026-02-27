"use client";
import "../styles/globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { createContext, useContext, useState } from "react";

// Simple Cart Context (global state)
export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const value = { cart, setCart, addToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
