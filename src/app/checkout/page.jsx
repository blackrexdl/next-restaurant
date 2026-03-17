// Optimized component-based version
"use client";
import "./checkout.css";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

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

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (

     <div className="checkout-container">
  <div className="checkout-wrapper">

    <div className="checkout-progress">
      <div className="progress-step active">1</div>
      <div className="progress-step active">2</div>
      <div className="progress-step">3</div>
    </div>

    <div className="checkout-layout">

      <div className="checkout-left">
        <CheckoutItems cart={cart} />

        <PromoSection
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          discount={discount}
          applyPromo={applyPromo}
        />

        <ReservationForm />
      </div>

      <div className="checkout-right">
        <PriceBreakdown
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          discount={discount}
          total={total}
        />

        <DeliveryForm />

        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        <OrderNotes
          note={note}
          setNote={setNote}
        />

        <Link href="/order-success">
          <button className="checkout-submit-btn">
            Secure Checkout →
          </button>
        </Link>
      </div>

    </div>

  </div>
</div>
      )}
    </main>
  );
}