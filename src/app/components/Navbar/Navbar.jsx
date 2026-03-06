"use client";

import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import CartSidebar from "../CartSidebar/CartSidebar";
import "./navbar.css";

export default function Navbar() {

  const { cart } = useCart();
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
      <nav className="navbar">

        <h1 className="logo">Next Restaurant</h1>

        <button
          className="cart-btn"
          onClick={() => setOpenCart(true)}
        >
          🛒 Cart ({cart.length})
        </button>

      </nav>

      <CartSidebar
        isOpen={openCart}
        setIsOpen={setOpenCart}
      />
    </>
  );
}