"use client"; // ⚡ Add this at the very top

import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
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

        <button className="btn toggle-dark" onClick={toggleDarkMode}>
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}