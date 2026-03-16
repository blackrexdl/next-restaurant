"use client";

export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {

  return (
    <div className="payment-method">

      <h2>Payment Method</h2>

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
            onChange={() => setPaymentMethod("card")}
          />
          <span>Credit / Debit Card</span>
        </label>

      </div>

    </div>
  );
}