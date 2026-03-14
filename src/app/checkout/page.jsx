"use client";
import "./checkout.css";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CheckoutPage() {

  const { cart } = useCart();
  const [note, setNote] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

const total = subtotal + deliveryFee + tax - discount;

const applyPromo = () => {
  if (promoCode.trim().toUpperCase() === "SAVE50") {
    setDiscount(50);
  } else if (promoCode.trim().toUpperCase() === "FOOD20") {
    setDiscount(20);
  } else {
    setDiscount(0);
    alert("Invalid promo code");
  }
};

  return (
    <main className="checkout-container">

      <div className="checkout-header">

        <div className="checkout-title">
          <span className="checkout-icon">🧾</span>
          <h1>Checkout</h1>
        </div>

        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Checkout</span>
        </div>

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

          <div className="checkout-progress">
            <div className="progress-step active">1</div>
            <div className="progress-step active">2</div>
            <div className="progress-step">3</div>
          </div>

          <div className="checkout-layout">
                    {/* Table Reservation Card */}
          <div className="reserve-table-card">

            <div className="reserve-header">
              <h2>Reserve a Table</h2>
              <p>Planning to dine in? Book your table in advance.</p>
            </div>

            <div className="reserve-preview">
              <div className="reserve-date">
                <span className="calendar-icon">📅</span>
                <span>Select date & time</span>
              </div>

              <div className="reserve-details">
                <span>Guests: 2 - 6</span>
                <span>Available today</span>
              </div>
            </div>

            <Link href="/reservation">
              <button className="reserve-btn">
                Reserve Table
              </button>
            </Link>

          </div>
            <div className="checkout-left">

          <ul className="checkout-items">
            {cart.map((item, index) => (
              <li key={item.id ?? index}>

                <div className="item-info">

                  <span className="item-name">
                    {(item.name || item.title || item.productName || "Item")} × {item.qty ?? 1}
                  </span>

                  <span className="item-price">
                    ₹{(item.qty ?? 1) * item.price}
                  </span>

                </div>

              </li>
            ))}
          </ul>

          <div className="promo-section">

            <h2>Promo Code</h2>

            <div className="promo-box">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />

              <button
                type="button"
                onClick={applyPromo}
                className="apply-promo-btn"
              >
                Apply
              </button>
            </div>

            {discount > 0 && (
              <p className="promo-success">
                Discount Applied: -₹{discount}
              </p>
            )}

          </div>

          </div>

          <div className="checkout-right">

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

  {discount > 0 && (
    <div className="price-row">
      <span>Promo Discount</span>
      <span>-₹{discount}</span>
    </div>
  )}

  <div className="price-total">
    <span>Total</span>
    <span>₹{total}</span>
  </div>

</div>
<div className="delivery-form">

  <h2>Delivery Information</h2>

  <div className="form-grid">

    <div className="input-group">
      <input type="text" className="input-field" placeholder=" " />
      <label>Full Name</label>
    </div>

    <div className="input-group">
      <input type="tel" className="input-field" placeholder=" " />
      <label>Phone Number</label>
    </div>

    <div className="input-group">
      <textarea className="input-field textarea" placeholder=" " />
      <label>Delivery Address</label>
    </div>

    <div className="input-group">
      <input type="text" className="input-field" placeholder=" " />
      <label>City</label>
    </div>

    <div className="input-group">
      <input type="text" className="input-field" placeholder=" " />
      <label>Pincode</label>
    </div>

  </div>
<div className="payment-method">

  <h2>Payment Method</h2>

  <div className="payment-options">

    <label className="payment-option">
      <input type="radio" name="payment" defaultChecked />
      <span>Cash on Delivery (Pay when food arrives)</span>
    </label>

    <label className="payment-option">
      <input type="radio" name="payment" />
      <span>UPI Payment</span>
    </label>

    <label className="payment-option">
      <input type="radio" name="payment" />
      <span>Credit / Debit Card</span>
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

          <Link href="/order-success">
            <button className="checkout-submit-btn">
              Secure Checkout →
            </button>
          </Link>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}