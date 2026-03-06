"use client";

import { useCart } from "../../../context/CartContext";
import "./cartsidebar.css";

export default function CartSidebar({ isOpen, setIsOpen }) {

  const { cart, removeFromCart } = useCart();

  return (
    <div className={`cart-overlay ${isOpen ? "show" : ""}`}>

      <div className="cart-sidebar">

        <button
          className="close-btn"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p className="empty">Cart is empty</p>
        ) : (
          <ul className="cart-items">

            {cart.map((item) => (
              <li key={item.id}>

                <div className="item-info">
                  <p>{item.name}</p>
                  <span>${item.price}</span>
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
        )}

      </div>

    </div>
  );
}