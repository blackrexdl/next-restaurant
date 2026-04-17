"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import "./sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [clientCartCount, setClientCartCount] = useState(0);
  const { cart } = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") === "dark";
      setDarkMode(saved);
      document.documentElement.classList.toggle("dark", saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientCartCount(
        cart.reduce((total, item) => total + (item.qty ?? 1), 0),
      );
    }
  }, [cart]);

  const toggleDark = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", newDark);
      localStorage.setItem("theme", newDark ? "dark" : "light");
    }
  };

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const menu = [
    { icon: "🏠", label: "Home", href: "/" },
    { icon: "🍽️", label: "Menu", href: "/checkout" },
    { icon: "🪑", label: "Reservation", href: "/reservation" },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">Dine Flow</div>
        <button className="toggle-btn" onClick={toggleCollapsed}>
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="sidebar-nav">
        {menu.map((item) => (
          <Link key={item.href} href={item.href} className="sidebar-item">
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <label className="switch" suppressHydrationWarning>
          <input type="checkbox" checked={darkMode} onChange={toggleDark} />
          <div className="slider">
            <div className="sun-moon"></div>
            <div className="stars">
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
            </div>
          </div>
        </label>
        <button
          className="cart-btn"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("openCart"));
            }
          }}
        >
          🛒
          {clientCartCount > 0 && (
            <span className="cart-badge" suppressHydrationWarning>
              {clientCartCount}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
