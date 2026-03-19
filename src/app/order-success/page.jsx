"use client";
import { useState } from "react";
import "../order-success/page.css";
import "./page.css";
import Link from "next/link";

export default function Checkout() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <main>
      {/* Other checkout content */}

      <button onClick={() => setShowSuccess(true)}>
        Secure Payment
      </button>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">

            <h1 className="success-title">✔ Order Placed Successfully!</h1>

            <p className="success-text">
              Your food is being prepared.
            </p>

            <p className="success-time">
              Estimated delivery: 25–30 minutes
            </p>

            <button
              className="success-btn"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </main>
  );
}