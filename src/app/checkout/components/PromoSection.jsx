"use client";

export default function PromoSection({
  promoCode,
  setPromoCode,
  discount,
  applyPromo
}) {
  return (
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
  );
}