"use client";
import "./card.css";
import { useState } from "react";
import { useCart } from "@/context/CartContext";


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

  const fallbackImage =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";

  const { addToCart } = useCart();


  return (
    <div className="card premium-card">
      {/* Image Wrapper */}
      <div className="card-image">
        <img
          src={imgSrc}
          alt={title}
          className={`card-img ${loaded ? "loaded" : ""}`}
          loading="lazy"
          onLoad={() => {
            requestAnimationFrame(() => setLoaded(true));
          }}
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
          <button
            className="btn order-btn"
            onClick={() =>
              addToCart({
                title,
                price,
                image: imgSrc,
                category,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
