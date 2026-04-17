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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />

            <main style={{ flex: 1 }}>{children}</main>

            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
