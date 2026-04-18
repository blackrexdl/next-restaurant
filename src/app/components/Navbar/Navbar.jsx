"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../../../context/CartContext";
import CartSidebar from "../CartSidebar/cartsidebar";
import MobileMenu from "./MobileMenu";
import "./navbar-mobile.css";

import "./navbar.css";
import Link from "next/link";

export default function Navbar() {
  const { cart } = useCart();
  const [openCart, setOpenCart] = useState(false);
   const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cart.reduce((total, item) => total + (item.qty ?? 1), 0));
  }, [cart]);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartBtnRef = useRef(null);
  const badgeRef = useRef(null);
  const prevCountRef = useRef(0);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialDark = savedTheme ? savedTheme === "dark" : prefersDark;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkMode(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      cartBtnRef.current?.classList.add("bump");
      setTimeout(() => cartBtnRef.current?.classList.remove("bump"), 350);

      badgeRef.current?.classList.add("pulse");
      setTimeout(() => badgeRef.current?.classList.remove("pulse"), 400);
    }

    prevCountRef.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = (e) => {
    const newDarkMode = e.target.checked;
    setDarkMode(newDarkMode);
  };

  return (
    <>
      <nav className="navbar relative w-full">
        <div className="nav-body">
          <Link href="/" className="navbar-logo">
            Dine Flow
          </Link>
          <div className="nav-items">
            <Link href="/" className="nav-item">
              Home
            </Link>
            <Link href="/checkout" className="nav-item">
              Menu
            </Link>
            <Link href="/reservation" className="nav-item">
              Reservation
            </Link>
          </div>
          <div className="nav-actions">
            <div className="theme-switch">
              <label className="switch" suppressHydrationWarning>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleTheme}
                />
                <div className="slider">
                  <div className="sun-moon"></div>
                  <div className="stars">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                  </div>
                </div>
              </label>
            </div>
            <button
              ref={cartBtnRef}
              className="navbar-button cart-btn"
              onClick={() => setOpenCart(true)}
            >
              🛒 Cart ({cartCount})
            </button>
          </div>
        </div>
        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <CartSidebar isOpen={openCart} setIsOpen={setOpenCart} />
    </>
  );
}
