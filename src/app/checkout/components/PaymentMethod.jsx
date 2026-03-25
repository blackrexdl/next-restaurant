"use client";

import { useState, useRef } from "react";

export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [showQR, setShowQR] = useState(false);

  const nameRef = useRef(null);
  const expiryRef = useRef(null);
  const cvvRef = useRef(null);

  // Card type detection helper
  const detectCardType = (number) => {
    if (/^4/.test(number)) return "Visa";
    if (/^5[1-5]/.test(number)) return "Mastercard";
    if (/^3[47]/.test(number)) return "Amex";
    return "";
  };

  const luhnCheck = (num) => {
    const arr = num.replace(/\s/g, '').split('').reverse().map(x => parseInt(x));
    const sum = arr.reduce((acc, val, idx) => {
      if (idx % 2 === 1) {
        let dbl = val * 2;
        if (dbl > 9) dbl -= 9;
        return acc + dbl;
      }
      return acc + val;
    }, 0);
    return sum % 10 === 0;
  };

  const isValidCardNumber = (num) => {
    const raw = num.replace(/\s/g, '');
    if (raw.length < 16) return false;
    return luhnCheck(raw);
  };

  const isValidExpiry = (exp) => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
    const [mm, yy] = exp.split('/').map(Number);
    if (mm < 1 || mm > 12) return false;
    const now = new Date();
    const year = 2000 + yy;
    const expDate = new Date(year, mm);
    return expDate > now;
  };

  const isValidCvv = (cvv) => {
    if (cardType === 'Amex') return cvv.length === 4;
    return cvv.length === 3;
  };

  const isCardFormValid =
    isValidCardNumber(cardNumber) &&
    isValidExpiry(expiry) &&
    isValidCvv(cvv) &&
    cardName.length > 2;

  return (
    <div className="payment-method">

      <h2>Payment Method</h2>

      {paymentMethod === "card" && (
        <div className={`credit-card-wrapper ${isFlipped ? "flipped" : ""}`}>
          <div className="credit-card-preview card-front">
            <div className={`card-type ${cardType.toLowerCase()}`}>{cardType || 'CARD'}</div>
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
      )}

      {paymentMethod === "card" && !showQR && (
        <div className="card-inputs">

          <div className="input-group">
            <input
              type="text"
              className={`input-field ${cardNumber && isValidCardNumber(cardNumber) ? 'valid' : ''}`}
              placeholder=" "
              value={cardNumber}
              maxLength={19}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                const formatted = val.replace(/(.{4})/g, "$1 ").trim();
                setCardNumber(formatted);
                setCardType(detectCardType(val));
                if (val.length === 16 && nameRef.current) nameRef.current.focus();
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
              ref={nameRef}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              onKeyDown={(e) => { if (e.key === 'Enter' && expiryRef.current) expiryRef.current.focus(); }}
            />
            <label>Card Holder</label>
          </div>

          <div className="input-row">

            <div className="input-group">
              <input
                type="text"
                className={`input-field ${expiry && isValidExpiry(expiry) ? 'valid' : ''}`}
                placeholder=" "
                value={expiry}
                maxLength={5}
                ref={expiryRef}
                onChange={(e) => {
                  let val = e.target.value.replace(/[^0-9]/g, "");
                  if (val.length >= 3) {
                    val = val.slice(0,2) + "/" + val.slice(2,4);
                  }
                  setExpiry(val);
                  if (val.length === 5 && cvvRef.current) cvvRef.current.focus();
                }}
              />
              <label>Expiry</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                className={`input-field ${cvv && isValidCvv(cvv) ? 'valid' : ''}`}
                placeholder=" "
                value={cvv}
                maxLength={cardType === 'Amex' ? 4 : 3}
                ref={cvvRef}
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

      {paymentMethod === "card" && (
        <div className="card-validation">
          {cardNumber && !isValidCardNumber(cardNumber) && <p>Invalid Card Number</p>}
          {expiry && !isValidExpiry(expiry) && <p>Invalid Expiry</p>}
          {cvv && !isValidCvv(cvv) && <p>Invalid CVV</p>}
        </div>
      )}

      {paymentMethod === "card" && (
        <button
          className={`pay-btn ${isCardFormValid ? 'active' : ''}`}
          disabled={!isCardFormValid}
        >
          Pay Securely
        </button>
      )}

      {paymentMethod === "upi" && showQR && (
        <>
          <div className="upi-qr-box">
            <div className="qr-placeholder">
              <p>Scan to Pay (Demo)</p>
              <div className="fake-qr"></div>
            </div>
          </div>
          <button className="pay-btn active">I've Paid</button>
        </>
      )}

      {paymentMethod === "cod" && (
        <button className="pay-btn active">Place Order</button>
      )}

      <div className="payment-options">

        <label className="payment-option">
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => {
              setPaymentMethod("cod");
              setShowQR(false);
            }}
          />
          <span>Cash on Delivery</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            checked={paymentMethod === "upi"}
            onChange={() => {
              setPaymentMethod("upi");
              setShowQR(true);
            }}
          />
          <span>UPI Payment</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => {
              setPaymentMethod("card");
              setShowQR(false);
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