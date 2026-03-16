"use client";
import "./checkout-layout.css";
import "./checkout-payment.css";
import "./checkout-form.css";
import "./checkout-card.css";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CheckoutPage() {

  const { cart } = useCart();
  const [note, setNote] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardBrand, setCardBrand] = useState("");
  const [cardTyping, setCardTyping] = useState(false);
  const [cardValid, setCardValid] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [reserveNote, setReserveNote] = useState("");
  const [reserveName, setReserveName] = useState("");
  const [reservePhone, setReservePhone] = useState("");
  const [reserveDate, setReserveDate] = useState("");
  const [reserveTime, setReserveTime] = useState("");
  const [reserveGuests, setReserveGuests] = useState("2");
  const [reserveOccasion, setReserveOccasion] = useState("");

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
<div className="reservation-box">

  <h2>Reserve a Table</h2>

  <div className="form-grid">

    <div className="input-group">
      <input type="text" name="reserveName" className="input-field" placeholder=" " required value={reserveName} onChange={(e)=>setReserveName(e.target.value)} />
      <label>Full Name</label>
    </div>

    <div className="input-group">
      <input type="tel" name="reservePhone" className="input-field" placeholder=" " required value={reservePhone} onChange={(e)=>setReservePhone(e.target.value)} />
      <label>Phone Number</label>
    </div>

    <div className="input-group">
      <input type="date" name="reserveDate" className="input-field" placeholder=" " required value={reserveDate} onChange={(e)=>setReserveDate(e.target.value)} />
      <label>Reservation Date</label>
    </div>

    <div className="input-group">
      <input type="time" name="reserveTime" className="input-field" placeholder=" " required value={reserveTime} onChange={(e)=>setReserveTime(e.target.value)} />
      <label>Reservation Time</label>
    </div>

    <div className="input-group">
      <select name="reserveGuests" className="input-field" value={reserveGuests} onChange={(e)=>setReserveGuests(e.target.value)}>
        <option value="1">1 Guest</option>
        <option value="2">2 Guests</option>
        <option value="3">3 Guests</option>
        <option value="4">4 Guests</option>
        <option value="5">5 Guests</option>
        <option value="6">6 Guests</option>
        <option value="7">7 Guests</option>
        <option value="8">8 Guests</option>
        <option value="9">9 Guests</option>
        <option value="10">10 Guests</option>
        <option value="11">11 Guests</option>
        <option value="12">12 Guests</option>
      </select>
      <label>Number of Guests</label>
    </div>

    <div className="input-group">
      <select name="reserveOccasion" className="input-field" value={reserveOccasion} onChange={(e)=>setReserveOccasion(e.target.value)}>
        <option value="" disabled>Select Occasion</option>
        <option value="birthday">Birthday</option>
        <option value="anniversary">Anniversary</option>
        <option value="date">Date Night</option>
        <option value="business">Business Meeting</option>
        <option value="family">Family Dinner</option>
        <option value="other">Other</option>
      </select>
      <label>Occasion</label>
    </div>

    <div className="input-group">
      <textarea
        name="reserveNote"
        className="input-field textarea"
        placeholder=" "
        value={reserveNote}
        onChange={(e)=>setReserveNote(e.target.value)}
      ></textarea>
      <label>Special Request</label>
    </div>

  </div>

  <div className="note-options">
    <button
      type="button"
      className="note-chip"
      onClick={() =>
        setReserveNote((prev) =>
          prev ? prev + ", Window seat if possible" : "Window seat if possible"
        )
      }
    >
      Window seat
    </button>
    <button
      type="button"
      className="note-chip"
      onClick={() =>
        setReserveNote((prev) =>
          prev ? prev + ", Birthday decoration" : "Birthday decoration"
        )
      }
    >
      Birthday decoration
    </button>
    <button
      type="button"
      className="note-chip"
      onClick={() =>
        setReserveNote((prev) =>
          prev ? prev + ", Quiet corner table" : "Quiet corner table"
        )
      }
    >
      Quiet corner
    </button>
    <button
      type="button"
      className="note-chip"
      onClick={() =>
        setReserveNote((prev) =>
          prev ? prev + ", High chair needed" : "High chair needed"
        )
      }
    >
      High chair
    </button>
  </div>

  <Link href="/reservation">
    <button className="reserve-btn">
      Reserve Table →
    </button>
  </Link>

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
      <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
      <span>Cash on Delivery (Pay when food arrives)</span>
    </label>

    <label className="payment-option">
      <input type="radio" name="payment" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
      <span>UPI Payment</span>
    </label>

    <label className="payment-option">
      <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
      <span>Credit / Debit Card</span>
    </label>

  </div>

  {paymentMethod === "card" && ( <>

  <div className={`credit-card-wrapper ${cardFlipped ? "flipped" : ""}`}>

    <div className="credit-card-preview card-front">

      <div className="card-chip">💳</div>
      <div className="card-brand">
        {cardBrand === "visa" && "VISA"}
        {cardBrand === "mastercard" && "MASTERCARD"}
        {cardBrand === "amex" && "AMEX"}
      </div>

      <div className={`card-number ${cardNumber ? "updated" : ""} ${cardTyping ? "typing" : ""}`}>
        {cardNumber || "•••• •••• •••• ••••"}
      </div>

      <div className="card-meta">
        <span className="card-holder">
          {cardName || "CARD HOLDER"}
        </span>

        <span className="card-expiry">
          {cardExpiry || "MM/YY"}
        </span>
      </div>

    </div>

    <div className="credit-card-back">

      <div className="card-strip"></div>

      <div className="card-cvv-box">
        <span>CVV</span>
        <strong>{cardCvv || "***"}</strong>
      </div>

    </div>

  </div>

  <div className="card-form">

    <div className="input-group">
      <input
        type="text"
        className="input-field"
        placeholder=" "
        value={cardNumber}
        maxLength={19}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "").slice(0, 16);

          const formatted = raw.replace(/(.{4})/g, "$1 ").trim();

          setCardNumber(formatted);

          setCardTyping(true);
          setTimeout(() => setCardTyping(false), 300);

          if (/^4/.test(raw)) {
            setCardBrand("visa");
          } else if (/^5[1-5]/.test(raw)) {
            setCardBrand("mastercard");
          } else if (/^3[47]/.test(raw)) {
            setCardBrand("amex");
          } else if (/^6/.test(raw)) {
            setCardBrand("discover");
          } else if (/^60/.test(raw)) {
            setCardBrand("rupay");
          } else {
            setCardBrand("");
          }

          /* Luhn validation */
          const checkLuhn = (num) => {
            let sum = 0;
            let shouldDouble = false;

            for (let i = num.length - 1; i >= 0; i--) {
              let digit = parseInt(num.charAt(i));

              if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
              }

              sum += digit;
              shouldDouble = !shouldDouble;
            }

            return sum % 10 === 0;
          };

          if (raw.length >= 13) {
            setCardValid(checkLuhn(raw));
          } else {
            setCardValid(null);
          }
        }}
      />
      <label>Card Number</label>
    </div>

    {cardValid === false && (
      <p className="card-error">Invalid card number</p>
    )}

    {cardValid === true && (
      <p className="card-valid">Card number looks valid</p>
    )}

    <div className="input-group">
      <input
        type="text"
        className="input-field"
        placeholder=" "
        value={cardName}
        onChange={(e)=>setCardName(e.target.value)}
      />
      <label>Card Holder Name</label>
    </div>

    <div className="input-group">
      <input
        type="text"
        className="input-field"
        placeholder=" "
        value={cardExpiry}
        onChange={(e)=>{
          let value = e.target.value.replace(/\D/g, "").slice(0,4);
          if (value.length >= 3) {
            value = value.slice(0,2) + "/" + value.slice(2);
          }
          setCardExpiry(value);
        }}
      />
      <label>Expiry (MM/YY)</label>
    </div>

    <div className="input-group">
      <input
        type="text"
        className="input-field"
        placeholder=" "
        value={cardCvv}
        maxLength={cardBrand === "amex" ? 4 : 3}
        onFocus={() => setCardFlipped(true)}
        onBlur={() => setCardFlipped(false)}
        onChange={(e)=>{
          const limit = cardBrand === "amex" ? 4 : 3;
          const value = e.target.value.replace(/\D/g, "").slice(0, limit);
          setCardCvv(value);
        }}
      />
      <label>CVV</label>
    </div>

  </div>
  </> )}

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