"use client";
import "./checkout/styles/checkout-layout.css";
import "./checkout/styles/checkout-header.css";
import "./checkout/styles/checkout-form.css";
import "./checkout/styles/checkout-payment.css";
import "./checkout/styles/checkout-summary.css";
import "./checkout/styles/checkout-promo.css";
import "./checkout/styles/checkout-reservation.css";
import "./checkout/styles/checkout-card.css";
import "./checkout/styles/checkout-animations.css";
import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";
export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <html lang="en">
      <body style={{ background: "#000" }} className="dark">
       <CartProvider>
  {loading ? (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      color: "#fff",
      fontSize: "20px",
      fontWeight: "600"
    }}>
      Dine@flow
    </div>
  ) : (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )}
</CartProvider>

      </body>
    </html>
  );
}