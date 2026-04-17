"use client";
import Link from "next/link";

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
      <div className="mobile-menu-overlay" onClick={onClose} />
      <nav className="mobile-menu-panel">
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mobile-nav-links">
          <Link href="/" className="mobile-nav-link" onClick={onClose}>
            Home
          </Link>
          <Link href="/checkout" className="mobile-nav-link" onClick={onClose}>
            Menu
          </Link>
          <Link
            href="/reservation"
            className="mobile-nav-link"
            onClick={onClose}
          >
            Reservation
          </Link>
          <Link href="/checkout" className="mobile-nav-link" onClick={onClose}>
            Cart
          </Link>
        </div>
      </nav>
    </div>
  );
}
