"use client";
import "./card.css";
import { useState } from "react";

export default function FoodCard({
  title = "Khana Kha Liya?",
  price = 199,
  image,
  description = "Fresh & delicious food made with love ❤️",
}) {

  const [imgSrc, setImgSrc] = useState(
    image || `https://source.unsplash.com/600x400/?punjabi food,${encodeURIComponent(title)}`
  );

  const fallbackImage =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";

  return (
    <div className="card premium-card">
      {/* Image Wrapper */}
      <div className="card-image">
        <img
          src={imgSrc}
          alt={title}
          className="card-img"
          loading="lazy"
          onError={() => setImgSrc(fallbackImage)}
        />

        {/* Gradient Overlay */}
        <div className="image-overlay"></div>

        {/* Floating badge */}
        <span className="badge">Popular</span>
      </div>

      {/* Content */}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>

        <div className="card-footer">
          <span className="price">₹{price}</span>
          <button className="btn order-btn">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
