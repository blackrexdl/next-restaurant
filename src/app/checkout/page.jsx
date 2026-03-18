// Optimized component-based version
"use client";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
// import "./checkout.css";
import "./styles/checkout-layout.css";
import "./styles/checkout-header.css";
import "./styles/checkout-form.css";
import "./styles/checkout-payment.css";
import "./styles/checkout-summary.css";
import "./styles/checkout-promo.css";
import "./styles/checkout-reservation.css";
import "./styles/checkout-card.css";
import "./styles/checkout-animations.css";
import CheckoutItems from "./components/CheckoutItems";
import PromoSection from "./components/PromoSection";
import ReservationForm from "./components/ReservationForm";
import PriceBreakdown from "./components/PriceBreakdown";
import DeliveryForm from "./components/DeliveryForm";
import PaymentMethod from "./components/PaymentMethod";
import OrderNotes from "./components/OrderNotes";

export default function CheckoutPage() {

  const { cart } = useCart();

  const [note, setNote] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");


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
    <main className="checkout-page">

      <div className="checkout-header">
        <div className="checkout-wrapper">

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
      </div>

      {cart.length === 0 ? (
        <div className="checkout-container"><div className="checkout-wrapper"><div className="empty-cart checkout-empty">
          <p>Your cart is empty</p>
        </div></div></div>
      ) : (

  <div className="checkout-container">

    <div className="checkout-progress">
      <div className="progress-step active">1</div>
      <div className="progress-step active">2</div>
      <div className="progress-step">3</div>
    </div>

    <div className="checkout-wrapper">

      {/* Main Layout */}
      <div className="checkout-layout fade-in checkout-main">

        {/* LEFT SIDE */}
        <div className="checkout-left">
          <CheckoutItems cart={cart} />

          <div className="card">
            <PromoSection
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              discount={discount}
              applyPromo={applyPromo}
            />
          </div>

          <div className="card"><ReservationForm /></div>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">

          <div className="checkout-card">
            <PriceBreakdown
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              discount={discount}
              total={total}
            />
          </div>

          <div className="card"><DeliveryForm /></div>

          <div className="card">
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          <div className="card">
            <OrderNotes
              note={note}
              setNote={setNote}
            />
          </div>

          <div className="checkout-action">
            <Link href="/order-success">
              <button type="button" className="checkout-submit-btn primary-btn">
                Secure Checkout →
              </button>
            </Link>
          </div>

        </div>

      </div>

    </div>
  </div>
      )}
    </main>
  );
}