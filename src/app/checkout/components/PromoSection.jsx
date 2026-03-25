"use client";

import { useState } from "react";

export default function PromoSection({
  promoCode,
  setPromoCode,
  discount,
  applyPromo
}) {
  const [status, setStatus] = useState("");

  const handleApplyPromo = () => {
    if (status === "loading") return;
    setStatus("loading");
    applyPromo()
      .then(() => {
        setStatus("success");
        setPromoCode("");
        setTimeout(() => setStatus(""), 2000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus(""), 2000);
      });
  };

  return (
    <div className="promo-section">

      <h2>Promo Code</h2>

      <div className={`promo-box ${status} ${status === "error" ? "shake" : ""}`}>

        <input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => {
            setPromoCode(e.target.value.toUpperCase());
            if (status === "error") setStatus("");
          }}
          className="promo-input"
        />

        <button
          type="button"
          onClick={handleApplyPromo}
          className="apply-promo-btn"
          disabled={status === "loading"}
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
  );
}