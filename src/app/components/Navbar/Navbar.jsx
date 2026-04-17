"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../../../context/CartContext";
import CartSidebar from "../CartSidebar/CartSidebar";
import MobileMenu from "./MobileMenu";
import "./navbar-mobile.css";

import "./navbar.css";
import Link from "next/link";

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => {
    return total + (item.qty ?? 1);
  }, 0);

  const [openCart, setOpenCart] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartBtnRef = useRef(null);
  const badgeRef = useRef(null);
  const prevCountRef = useRef(cartCount);

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
    const handleOpenCart = () => {
      setOpenCart(true);
    };

    window.addEventListener("openCart", handleOpenCart);
    return () => window.removeEventListener("openCart", handleOpenCart);
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
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <Link href="/" prefetch={false}>
          <h1 className="logo">Next Restaurant</h1>
        </Link>

        <div className="nav-center">
          <nav className="nav-links">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/checkout" className="nav-link">
              Menu
            </Link>
            <Link href="/reservation" className="nav-link">
              Reservation
            </Link>
          </nav>
          {mounted && (
            <div className="theme-switch">
              <label className="switch">
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
          )}
        </div>

        <div className="nav-right">
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            ☰
          </button>
          <button
            ref={cartBtnRef}
            className="cart-btn"
            onClick={() => setOpenCart(true)}
          >
            🛒
            {mounted && cartCount > 0 && (
              <span ref={badgeRef} className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <CartSidebar isOpen={openCart} setIsOpen={setOpenCart} />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <CartSidebar isOpen={openCart} setIsOpen={setOpenCart} />
    </>
  );
}
