"use client";

import { useCart } from "../../../context/CartContext";
import "./cartsidebar.css";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function CartSidebar({ isOpen, setIsOpen }) {

  const [mounted, setMounted] = useState(false);

  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const totalPrice = cart.reduce((total, item) => {
    const qty = item.qty ?? 1;
    const price = Number(item.price) || 0;
    return total + price * qty;
  }, 0);

  return (
    <div
      className={`cart-overlay ${isOpen ? "show" : ""}`}
      onClick={() => setIsOpen(false)}
    >

      <div
        className="cart-sidebar"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="close-btn"
          aria-label="Close cart"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p className="empty">Cart is empty</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item, index) => (
                <li key={item.id ?? index}>

                  <div className="item-info">
                    <p>{item.name}</p>
                    <span>₹{item.price} × {item.qty ?? 1}</span>
                  </div>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty ?? 1}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <div className="item-total">
                    ₹{Number(item.price) * (item.qty ?? 1)}
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

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary">
                  <p>Items: {cart.reduce((sum, item) => sum + (item.qty ?? 1), 0)}</p>
                  <h3>Total: ₹{totalPrice}</h3>
                </div>

                <Link href="/checkout">
                  <button
                    className="checkout-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}
          </>
        )}

      </div>

    </div>
  );
}
