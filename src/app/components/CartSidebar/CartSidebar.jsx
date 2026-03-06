"use client";

import { useCart } from "../../context/CartContext";
import "./cartsidebar.css";

export default function CartSidebar({ isOpen, setIsOpen }) {
  const { cart, removeFromCart } = useCart();

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={() => setIsOpen(false)}>✖</button>
      </div>

      {cart.length === 0 ? (
        <p className="empty">Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}