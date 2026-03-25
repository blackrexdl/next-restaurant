"use client";

import { useEffect, useState } from "react";

export default function PriceBreakdown({
  subtotal,
  deliveryFee,
  tax,
  discount,
  total
}) {
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 500; // ms
    const increment = total / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= total) {
        setDisplayTotal(total);
        clearInterval(counter);
      } else {
        setDisplayTotal(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [total]);

  return (
    <div className="price-breakdown fade-in">

      <div className="price-row slide-up" style={{ "--i": 0 }}>
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="price-row slide-up" style={{ "--i": 1 }}>
        <span>Delivery Fee</span>
        <span>₹{deliveryFee}</span>
      </div>

      <div className="price-row slide-up" style={{ "--i": 2 }}>
        <span>Tax (5%)</span>
        <span>₹{tax}</span>
      </div>

      {discount > 0 && (
        <div className="price-row discount-row" style={{ "--i": 3 }}>
          <span>Promo Discount</span>
          <span>-₹{discount}</span>
        </div>
      )}

      <div className="price-total total-glow">
        <span>Total</span>
        <span className="total-value">₹{displayTotal}</span>
      </div>

    </div>
  );
}