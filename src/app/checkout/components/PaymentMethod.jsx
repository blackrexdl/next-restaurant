"use client";

import { useState } from "react";

export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");

  // Card type detection helper
  const detectCardType = (number) => {
    if (/^4/.test(number)) return "Visa";
    if (/^5[1-5]/.test(number)) return "Mastercard";
    if (/^3[47]/.test(number)) return "Amex";
    return "";
  };

  return (
    <div className="payment-method">

      <h2>Payment Method</h2>

      <div
        className={`credit-card-wrapper ${isFlipped ? "flipped" : ""}`}
      >
        <div className="credit-card-preview card-front">
          <div className="card-type">{cardType}</div>
          <div className="card-number">{cardNumber || "1234 5678 9012 3456"}</div>
          <div className="card-meta">
            <span className="card-holder">{cardName || "YOUR NAME"}</span>
            <span className="card-expiry">{expiry || "MM/YY"}</span>
          </div>
        </div>

        <div className="credit-card-back">
          <div className="card-strip"></div>
          <div className="card-cvv-box">
            <span>CVV</span>
            <span>{cvv ? "•••" : "•••"}</span>
          </div>
        </div>
      </div>

      {paymentMethod === "card" && (
        <div className="card-inputs">

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder=" "
              value={cardNumber}
              maxLength={19}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                const formatted = val.replace(/(.{4})/g, "$1 ").trim();
                setCardNumber(formatted);
                setCardType(detectCardType(val));
              }}
            />
            <label>Card Number</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder=" "
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
            />
            <label>Card Holder</label>
          </div>

          <div className="input-row">

            <div className="input-group">
              <input
                type="text"
                className="input-field"
                placeholder=" "
                value={expiry}
                maxLength={5}
                onChange={(e) => {
                  let val = e.target.value.replace(/[^0-9]/g, "");
                  if (val.length >= 3) {
                    val = val.slice(0,2) + "/" + val.slice(2,4);
                  }
                  setExpiry(val);
                }}
              />
              <label>Expiry</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                className="input-field"
                placeholder=" "
                value={cvv}
                maxLength={3}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setCvv(val);
                }}
              />
              <label>CVV</label>
            </div>

          </div>

        </div>
      )}

      <div className="payment-options">

        <label className="payment-option">
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          <span>Cash on Delivery</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />
          <span>UPI Payment</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => {
              setPaymentMethod("card");
              setIsFlipped(false);
            }}
            onFocus={() => setIsFlipped(false)}
          />
          <span>Credit / Debit Card</span>
        </label>

      </div>

    </div>
  );
}