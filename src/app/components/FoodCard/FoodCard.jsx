/* eslint-disable @next/next/no-img-element */
"use client";
import "./card.css";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext";

export default function FoodCard({
  title,
  price,
  image,
  category = "Popular",
  description,
  rating = 4.3,
  reviews = 120,
  badge,
  index = 0
}) {

 
  const finalTitle = title || "Delicious Food Item";
  const finalDesc = description || "Freshly prepared with quality ingredients.";
  const finalPrice = price || 199;

  const [imgSrc, setImgSrc] = useState(
    image || `https://source.unsplash.com/600x400/?${encodeURIComponent(finalTitle)},food`
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
    addToCart({ title: finalTitle, price: finalPrice, image: imgSrc, category });

    setShowToast(true);

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const cartItem = cart.find((item) => item.title === finalTitle);

  const hasOrdered = cartItem && (cartItem.qty || 0) > 0;

  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`ratings-${finalTitle}`);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserRatings(saved ? JSON.parse(saved) : []);
    }
  }, [finalTitle]);

  const averageRating = userRatings.length > 0 ? userRatings.reduce((a,b) => a + b, 0) / userRatings.length : rating;

  const submitRating = (value) => {
    if (!hasOrdered) return;

    const updated = [...userRatings, value];
    setUserRatings(updated);
    localStorage.setItem(`ratings-${finalTitle}`, JSON.stringify(updated));
  };

  const [reviewText, setReviewText] = useState("");

  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`reviews-${finalTitle}`);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReviewsList(saved ? JSON.parse(saved) : []);
    }
  }, [finalTitle]);

  const submitReview = () => {
    if (!hasOrdered || !reviewText.trim()) return;

    const key = `reviews-${finalTitle}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const updated = [...existing, reviewText];

    localStorage.setItem(key, JSON.stringify(updated));
    setReviewsList(updated);
    setReviewText("");
  };

  let dynamicBadge = badge;

  if (!dynamicBadge) {
    if (averageRating >= 4.5) dynamicBadge = "Best Seller 🔥";
    else if (averageRating >= 4.0) dynamicBadge = "Popular ⭐";
    else if (averageRating >= 3.0) dynamicBadge = "Trending";
  }

  // const fallbackImage = these lines are for backuo the images and use your own images in the public folder and use the path here instead of these unsplash links
  //   "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";
  const fallbackImage = "/images/fallback.jpg";

  if (!mounted) return null;

  return (
    <>
      <motion.div
        ref={cardRef}
        className="card premium-card glass-card"
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
            alt={finalTitle}
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

          {dynamicBadge && (
            <span className="top-badge">{dynamicBadge}</span>
          )}

         <span className="badge category-badge">
  {category}
</span>
        </div>

        {/* Content */}
        <div className="card-body">
          <h3 className="card-title">{finalTitle}</h3>
          <div className="rating">
  {[1,2,3,4,5].map((i) => (
    <span key={i} className={i <= Math.round(averageRating) ? "star filled" : "star"}>★</span>
  ))}
  <span className="rating-value">{averageRating.toFixed(1)}</span>
  <span className="rating-count">({userRatings.length || reviews})</span>
</div>
          {/* Rating Start */}
          {/* <div className="rating">
            <span className="star">★★★★★</span>
            <span className="rating-count">(4.5)</span>
          </div> */}
          <p className="card-desc">{finalDesc}</p>

          <div className="card-footer">
            <span className="price">₹{finalPrice}</span>
            {cartItem ? (
              <div className="qty-controls">
                <button className="qty-btn" onClick={(e) => {
                  e.stopPropagation();
                  decreaseQty(finalTitle);
                }}>-</button>
                <span className="qty-count">{cartItem.qty || 1}</span>
                <button className="qty-btn" onClick={(e) => {
                  e.stopPropagation();
                  increaseQty(finalTitle);
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
            style={{ padding: "20px", borderRadius: "16px" }}
          >
            <button
              className="close-modal"
              aria-label="Close modal"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <img src={imgSrc} alt={`${finalTitle} food image`} />

            <h2>{finalTitle}</h2>
              <div className="rating">
  {[1,2,3,4,5].map((i) => (
    <span key={i} className={i <= Math.round(averageRating) ? "star filled" : "star"}>★</span>
  ))}
  <span className="rating-value">{averageRating.toFixed(1)}</span>
  <span className="rating-count">({userRatings.length || reviews})</span>
</div>
            {/* <div className="rating">
              <span className="star">★★★★★</span>
              <span className="rating-count">(4.5)</span>
            </div> */}
            <p>{finalDesc}</p>
            <p>Price: ₹{finalPrice}</p>
            <p>Category: {category}</p>

            {!hasOrdered && (
              <p style={{ fontSize: "12px", color: "#888" }}>
                Order this item to rate ⭐
              </p>
            )}

            <div>
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  onClick={() => submitRating(star)}
                  disabled={!hasOrdered}
                  style={{
                    margin: "3px",
                    padding: "5px 8px",
                    borderRadius: "6px",
                    border: "none",
                    background: hasOrdered ? "#f59e0b" : "#555",
                    color: "#fff",
                    cursor: hasOrdered ? "pointer" : "not-allowed"
                  }}
                >
                  {star}⭐
                </button>
              ))}
            </div>

            <textarea
              placeholder="Write a review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              disabled={!hasOrdered}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff"
              }}
            />

            <button
              onClick={submitReview}
              disabled={!hasOrdered}
              style={{
                marginTop: "8px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background: hasOrdered ? "#16a34a" : "#555",
                color: "#fff",
                cursor: hasOrdered ? "pointer" : "not-allowed"
              }}
            >
              Submit Review
            </button>

            <div style={{ marginTop: "10px" }}>
              <h4>Reviews</h4>
              {reviewsList.length === 0 ? (
                <p style={{ fontSize: "12px", color: "#888" }}>No reviews yet</p>
              ) : (
                reviewsList.slice(-3).reverse().map((rev, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    marginBottom: "6px",
                    fontSize: "13px"
                  }}>
                    {rev}
                  </div>
                ))
              )}
            </div>

            {cartItem ? (
              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseQty(finalTitle);
                  }}
                >
                  -
                </button>
                <span className="qty-count">{cartItem.qty || 1}</span>
                <button
                  className="qty-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseQty(finalTitle);
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
          {finalTitle} added to cart 🛒
        </div>
      )}
    </>
  );
}
