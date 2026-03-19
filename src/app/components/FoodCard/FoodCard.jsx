/* eslint-disable @next/next/no-img-element */
"use client";
import "./card.css";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext";

export default function FoodCard({
  title = "Khana Kha Liya?",
  price = 199,
  image,
  category = "Veg",
  description = "Fresh & delicious food made with love ❤️",
  index = 0
}) {

  const [imgSrc, setImgSrc] = useState(
    image || `https://source.unsplash.com/600x400/?punjabi food,${encodeURIComponent(title)}`
  );

  const [loaded, setLoaded] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  const handleAddToCart = () => {
    addToCart({ title, price, image: imgSrc, category });

    setShowToast(true);

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const cartItem = cart.find((item) => item.title === title);

  const fallbackImage =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";

  if (!mounted) return null;

  return (
    <>
      <motion.div
        ref={cardRef}
        className="card premium-card"
        data-category={category}
        onClick={(e) => {
          if (e.target.closest("button")) return;
          setOpenModal(true);
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
          delay: index * 0.08
        }}
      >
        {/* Image Wrapper */}
        <div className="card-image">
          <img
            src={imgSrc}
            alt={title}
            className={`card-img ${loaded ? "loaded" : ""}`}
            loading="lazy"
            onLoad={() => requestAnimationFrame(() => setLoaded(true))}
            onError={() => {
              if (imgSrc !== fallbackImage) {
                setImgSrc(fallbackImage);
                setLoaded(false);
              }
            }}
          />
          {!loaded && <div className="image-skeleton" />}
          {/* Gradient Overlay */}
          <div className="image-overlay"></div>

          {/* Floating badge */}
         <span
  className={`badge ${
    category === "Veg"
      ? "veg-badge"
      : category === "Non-Veg"
      ? "nonveg-badge"
      : "popular-badge"
  }`}
>
  {category}
</span>
        </div>

        {/* Content */}
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          {/* Rating Start */}
          {/* <div className="rating">
            <span className="star">★★★★★</span>
            <span className="rating-count">(4.5)</span>
          </div> */}
          <p className="card-desc">{description}</p>

          <div className="card-footer">
            <span className="price">₹{price}</span>
            {cartItem ? (
              <div className="qty-controls">
                <button className="qty-btn" onClick={(e) => {
                  e.stopPropagation();
                  decreaseQty(title);
                }}>-</button>
                <span className="qty-count">{cartItem.qty || 1}</span>
                <button className="qty-btn" onClick={(e) => {
                  e.stopPropagation();
                  increaseQty(title);
                }}>+</button>
              </div>
            ) : (
              <button className="btn order-btn" onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </motion.div>
      {openModal && (
        <div
          className="food-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Food details"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              aria-label="Close modal"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <img src={imgSrc} alt={`${title} food image`} />

            <h2>{title}</h2>
              {/* Rating Start */}
            {/* <div className="rating">
              <span className="star">★★★★★</span>
              <span className="rating-count">(4.5)</span>
            </div> */}
            <p>{description}</p>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>

            {cartItem ? (
              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseQty(title);
                  }}
                >
                  -
                </button>
                <span className="qty-count">{cartItem.qty || 1}</span>
                <button
                  className="qty-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseQty(title);
                  }}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn order-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      )}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "25px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#16a34a",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "10px",
            fontSize: "14px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            zIndex: 3000,
            animation: "fadeIn 0.3s ease"
          }}
        >
          {title} added to cart 🛒
        </div>
      )}
    </>
  );
}
