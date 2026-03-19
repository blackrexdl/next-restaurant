// Optimized component-based version
"use client";
// CSS handled globally via layout.js to avoid hydration/layout issues
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
// import "./checkout.css";
import "./styles/checkout-popup.css";
import CheckoutItems from "./components/CheckoutItems";
import PromoSection from "./components/PromoSection";
import ReservationForm from "./components/ReservationForm";
import PriceBreakdown from "./components/PriceBreakdown";
import DeliveryForm from "./components/DeliveryForm";
import PaymentMethod from "./components/PaymentMethod";
import OrderNotes from "./components/OrderNotes";

export default function CheckoutPage() {

  const { cart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (showSuccess) {
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2500);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto";
      };
    }
  }, [showSuccess]);

  const [note, setNote] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (!isClient) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-wrapper">
            <div className="checkout-loading">Loading...</div>
          </div>
        </div>
      </main>
    );
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
            <button
              type="button"
              className="checkout-submit-btn primary-btn"
              onClick={() => setShowSuccess(true)}
            >
              Secure Checkout →
            </button>
          </div>

        </div>

      </div>

    </div>
  </div>
      )}
      {showSuccess && (
        <div className="success-overlay" onClick={() => setShowSuccess(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>

            <div className="success-icon">🎉</div>

            <h1 className="success-title">Order Placed Successfully!</h1>

            <p className="success-text">
              Your food is being prepared with care.
            </p>

            <p className="success-time">
              Estimated delivery: 25–30 minutes
            </p>

            <button
              className="success-btn"
              onClick={() => setShowSuccess(false)}
            >
              Done
            </button>

          </div>
        </div>
      )}
    </main>
  );
}