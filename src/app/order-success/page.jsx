"use client";

import Link from "next/link";

export default function OrderSuccess() {
  return (
    <main className="success-container">

      <div className="success-card">

        <h1 className="success-title">✔ Order Placed Successfully!</h1>

        <p className="success-text">
          Your food is being prepared.
        </p>

        <p className="success-time">
          Estimated delivery: 25–30 minutes
        </p>

        <Link href="/">
          <button className="home-btn">
            Back to Home
          </button>
        </Link>

      </div>

    </main>
  );
}