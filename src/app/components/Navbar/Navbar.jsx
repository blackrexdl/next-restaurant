"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import CartSidebar from "../CartSidebar/CartSidebar";

import "./navbar.css";

export default function Navbar() {

  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => {
  return total + (item.qty ?? 1);
}, 0);
  const [openCart, setOpenCart] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 useEffect(() => {
  const handleOpenCart = () => {
    setOpenCart(true);
  };

  window.addEventListener("openCart", handleOpenCart);

  return () => {
    window.removeEventListener("openCart", handleOpenCart);
  };
}, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

        <h1 className="logo">Next Restaurant</h1>

        <button
          className="cart-btn"
          onClick={() => setOpenCart(true)}
        >
          <span className="cart-icon">🛒</span>

          {mounted && cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}
        </button>

      </nav>

      <CartSidebar
        isOpen={openCart}
        setIsOpen={setOpenCart}
      />
    </>
  );
}