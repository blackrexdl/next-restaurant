"use client";

import { useState, useEffect, useCallback } from "react";
import { useCart } from "../../../context/CartContext";
import "./cartsidebar.css";

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const totalPrice = cart.reduce((total, item) => {
    const qty = item.qty ?? 1;
    const price = Number(item.price) || 0;
    return total + price * qty;
  }, 0);

  const toggleCart = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openCart", handleOpen);
    return () => window.removeEventListener("openCart", handleOpen);
  }, []);

  if (!mounted || cart.length === 0) return null;

  return (
    <div
      className={`cart-overlay ${isOpen ? "show" : ""}`}
      onClick={() => setIsOpen(false)}
    >
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ✕
        </button>
        <h2>Your Cart</h2>
        <ul className="cart-items">
          {cart.map((item) => (
            <li key={item.id}>
              <div className="item-info">
                <h4>{item.title || item.name}</h4>
                <span>
                  ₹{item.price} × {item.qty ?? 1}
                </span>
              </div>
              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty ?? 1}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-footer">
          <div className="cart-summary">
            <p>Items: {cart.reduce((sum, item) => sum + (item.qty ?? 1), 0)}</p>
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
          </div>
          <a href="/checkout" className="checkout-btn">
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
}
