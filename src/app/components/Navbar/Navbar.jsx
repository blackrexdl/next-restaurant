"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../../../context/CartContext";
import CartSidebar from "../CartSidebar/CartSidebar";

import "./navbar.css";

export default function Navbar() {

  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => {
  return total + (item.qty ?? 1);
}, 0);
  const [openCart, setOpenCart] = useState(false);
  const cartBtnRef = useRef(null);
  const cartIconRef = useRef(null);
  const badgeRef = useRef(null);
  const prevCountRef = useRef(cartCount);

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

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      if (cartBtnRef.current) {
        cartBtnRef.current.classList.add("bump");
        setTimeout(() => {
          cartBtnRef.current?.classList.remove("bump");
        }, 350);
      }

      if (badgeRef.current) {
        badgeRef.current.classList.add("pulse");
        setTimeout(() => {
          badgeRef.current?.classList.remove("pulse");
        }, 400);
      }
    }

    prevCountRef.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    const fly = (img) => {
      if (!cartIconRef.current || !img) return;

      const imgRect = img.getBoundingClientRect();
      const cartRect = cartIconRef.current.getBoundingClientRect();

      const flyImg = img.cloneNode(true);
      flyImg.classList.add("fly-item");

      flyImg.style.width = `${imgRect.width}px`;
      flyImg.style.height = `${imgRect.height}px`;

      flyImg.style.setProperty("--fly-start-x", `${imgRect.left}px`);
      flyImg.style.setProperty("--fly-start-y", `${imgRect.top}px`);
      flyImg.style.setProperty("--fly-end-x", `${cartRect.left}px`);
      flyImg.style.setProperty("--fly-end-y", `${cartRect.top}px`);

      document.body.appendChild(flyImg);

      setTimeout(() => {
        flyImg.remove();
      }, 900);
    };

    const handleFlyToCart = (e) => {
      const img = e.detail?.img;
      fly(img);
    };

    const handleClick = (e) => {
      const btn = e.target.closest(".add-to-cart");
      if (!btn) return;

      const card = btn.closest(".food-card");
      const img = card?.querySelector("img");
      if (img) fly(img);
    };

    window.addEventListener("flyToCart", handleFlyToCart);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("flyToCart", handleFlyToCart);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

        <h1 className="logo">Next Restaurant</h1>

        <button
          ref={cartBtnRef}
          className="cart-btn"
          onClick={() => setOpenCart(true)}
        >
          <span ref={cartIconRef} className="cart-icon">🛒</span>

          {mounted && cartCount > 0 && (
            <span ref={badgeRef} className="cart-badge">
              {cartCount}
            </span>
          )}
        </button>

      </nav>

      {/* Background overlay when cart opens */}
      <div
        className={`cart-overlay ${openCart ? "active" : ""}`}
        onClick={() => setOpenCart(false)}
      />

      <CartSidebar
        isOpen={openCart}
        setIsOpen={setOpenCart}
        className="cart-drawer cart-glass"
      />
    </>
  );
}