"use client";

import { useCart } from "../../../context/CartContext";
import "./cartsidebar.css";

export default function CartSidebar({ isOpen, setIsOpen }) {

  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

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
                    <span>${item.price} × {item.qty ?? 1}</span>
                  </div>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty ?? 1}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <div className="item-total">
                    ${Number(item.price) * (item.qty ?? 1)}
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
                <h3>Total: ${totalPrice}</h3>
                <button className="checkout-btn">
                  Checkout
                </button>
              </div>
            )}
          </>
        )}

      </div>

    </div>
  );
}
