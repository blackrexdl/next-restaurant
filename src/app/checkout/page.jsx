"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CheckoutPage() {

  const { cart } = useCart();
  const [note, setNote] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
<div className="payment-method">

  <h2>Payment Method</h2>

  <div className="payment-options">

    <label className="payment-option">
      <input type="radio" name="payment" defaultChecked />
      <span>Cash on Delivery</span>
    </label>

    <label className="payment-option">
      <input type="radio" name="payment" />
      <span>UPI</span>
    </label>

    <label className="payment-option">
      <input type="radio" name="payment" />
      <span>Card Payment</span>
    </label>

  </div>

</div>
<div className="order-notes">

  <h2>Order Notes</h2>

  <div className="note-options">

    <button
      type="button"
      onClick={() => setNote("No onions please")}
      className="note-chip"
    >
      No onions please
    </button>

    <button
      type="button"
      onClick={() => setNote("Extra spicy")}
      className="note-chip"
    >
      Extra spicy
    </button>

    <button
      type="button"
      onClick={() => setNote("Ring the doorbell")}
      className="note-chip"
    >
      Ring the doorbell
    </button>

    <button
      type="button"
      onClick={() => setNote("Call before delivery")}
      className="note-chip"
    >
      Call before delivery
    </button>

  </div>

  <textarea
    value={note}
    onChange={(e) => setNote(e.target.value)}
    placeholder="Add instructions for the restaurant (optional)"
    className="notes-input"
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