"use client";
import "../styles/globals.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { CartProvider } from "../context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
