"use client"; // ⚡ Add this at the very top

import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import "./navbar.css";

export default function Navbar() {
  const { cart } = useCart();

  // total items count (fix for qty support)
  const totalItems = cart?.reduce((sum, item) => sum + (item.qty || 1), 0);

  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark-mode");
  };

  return (
    <header className="navbar">
      <div className="container nav-flex">
        <h2 className="logo">🍔 Foodie</h2>

        <nav>
          <ul className="nav-links">
            <li>Home</li>
            <li>Menu</li>
            <li>Categories</li>
            <li>Contact</li>
          </ul>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Cart Icon */}
          <div style={{ position: "relative", fontSize: "20px", cursor: "pointer" }}>
            🛒
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-10px",
                  background: "#ff4d4f",
                  color: "#fff",
                  fontSize: "11px",
                  padding: "2px 6px",
                  borderRadius: "999px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                {totalItems}
              </span>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button className="btn toggle-dark" onClick={toggleDarkMode}>
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}