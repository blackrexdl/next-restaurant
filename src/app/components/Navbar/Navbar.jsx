"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../../../context/CartContext";
import CartSidebar from "../CartSidebar/CartSidebar";

import "./navbar.css";
import Link from "next/link";

export default function Navbar() {

  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => {
    return total + (item.qty ?? 1);
  }, 0);

  const [openCart, setOpenCart] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const cartBtnRef = useRef(null);
  const badgeRef = useRef(null);
  const prevCountRef = useRef(cartCount);

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
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

  const toggleTheme = () => {
    const newTheme = !darkMode;

    if (newTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setDarkMode(newTheme);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

        <Link href="/" prefetch={false}>
  <h1 className="logo">Next Restaurant</h1>
</Link>

        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "🌙" : "☀️"}
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

      </nav>

      <CartSidebar isOpen={openCart} setIsOpen={setOpenCart} />
    </>
  );
}