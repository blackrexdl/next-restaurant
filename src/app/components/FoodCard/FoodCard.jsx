/* eslint-disable @next/next/no-img-element */
"use client";
import "./card.css";
import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";

export default function FoodCard({
  title = "Khana Kha Liya?",
  price = 199,
  image,
  category = "Veg",
  description = "Fresh & delicious food made with love ❤️",
}) {

  const [imgSrc, setImgSrc] = useState(
    image || `https://source.unsplash.com/600x400/?punjabi food,${encodeURIComponent(title)}`
  );

  const [loaded, setLoaded] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  const handleAddToCart = () => {
    addToCart({ title, price, image: imgSrc, category });
  };

  const cartItem = cart.find((item) => item.title === title);

  const fallbackImage =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";

  if (!mounted) return null;

  return (
    <>
      <div
        className="card premium-card"
        onClick={() => setOpenModal(true)}
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
              setImgSrc(fallbackImage);
              setLoaded(false);
            }}
          />
          {!loaded && <div className="image-skeleton" />}
          {/* Gradient Overlay */}
          <div className="image-overlay"></div>

          {/* Floating badge */}
          <span
            className={`badge ${
              category === "Veg" ? "veg-badge" : "nonveg-badge"
            }`}
          >
            {category === "Veg" ? "Veg" : "Non-Veg"}
          </span>
        </div>

        {/* Content */}
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
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
      </div>
      {openModal && (
        <div
          className="food-modal"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <img src={imgSrc} alt={title} />

            <h2>{title}</h2>
            <p>{description}</p>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>

            <button
              className="btn order-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
