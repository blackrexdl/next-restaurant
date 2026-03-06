"use client";

import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "./components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <>
            <Navbar />
            {children}
          </>
        </CartProvider>
      </body>
    </html>
  );
}