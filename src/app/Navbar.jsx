"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setCartCount(cart.reduce((total, item) => total + (item.qty ?? 1), 0));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openCart"));
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-content">
        <Link href="/" className="logo">
          Dine Flow
        </Link>
        <div className="nav-actions">
          <button className="cart-btn" onClick={handleCartClick}>
            🛒 {cartCount > 0 && cartCount}
          </button>
        </div>
      </div>
    </nav>
  );
}
