"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {

  const { cart } = useCart();

  const total = cart.reduce((sum, item) => {
    const qty = item.qty ?? 1;
    const price = Number(item.price) || 0;
    return sum + price * qty;
  }, 0);

  return (
    <main className="checkout-container">

      <div className="checkout-header">
        <h1>Order Summary</h1>

        <Link href="/">
          <button className="home-btn">← Back to Home</button>
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="checkout-card">

          <ul className="checkout-items">
            {cart.map((item, index) => (
              <li key={item.id ?? index}>

                <span className="item-name">
                  {item.name}
                </span>

                <span className="item-qty">
                  × {item.qty ?? 1}
                </span>

                <span className="item-price">
                  ₹{(item.qty ?? 1) * item.price}
                </span>

              </li>
            ))}
          </ul>

          <div className="checkout-total">
            <h2>Total</h2>
            <h2>₹{total}</h2>
          </div>

          <button className="place-order-btn">
            Place Order
          </button>

        </div>
      )}

    </main>
  );
}