"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {

  const { cart } = useCart();

  const subtotal = cart.reduce((sum, item) => {
  const qty = item.qty ?? 1;
  const price = Number(item.price) || 0;
  return sum + price * qty;
}, 0);

const deliveryFee = 40;
const tax = Math.round(subtotal * 0.05);

const total = subtotal + deliveryFee + tax;

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

         <div className="price-breakdown">

  <div className="price-row">
    <span>Subtotal</span>
    <span>₹{subtotal}</span>
  </div>

  <div className="price-row">
    <span>Delivery Fee</span>
    <span>₹{deliveryFee}</span>
  </div>

  <div className="price-row">
    <span>Tax (5%)</span>
    <span>₹{tax}</span>
  </div>

  <div className="price-total">
    <span>Total</span>
    <span>₹{total}</span>
  </div>

</div>
<div className="delivery-form">

  <h2>Delivery Information</h2>

  <div className="form-grid">

    <input
      type="text"
      placeholder="Full Name"
      className="input-field"
    />

    <input
      type="tel"
      placeholder="Phone Number"
      className="input-field"
    />

    <textarea
      placeholder="Delivery Address"
      className="input-field textarea"
    />

    <input
      type="text"
      placeholder="City"
      className="input-field"
    />

    <input
      type="text"
      placeholder="Pincode"
      className="input-field"
    />

  </div>

</div>

          <button className="place-order-btn">
            Place Order
          </button>

        </div>
      )}

    </main>
  );
}