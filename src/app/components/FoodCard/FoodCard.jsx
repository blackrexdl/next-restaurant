"use client";
import "./card.css";

export default function FoodCard({
  title = "Khana Kha Liya?",
  price = 199,
  image,
  description = "Fresh & delicious food made with love ❤️",
}) {
  const foodImages = {
    "Khana Kha Liya?": "https://picsum.photos/seed/khana/600/400",
    "Tu Kha Liya?": "https://picsum.photos/seed/tukha/600/400",
    Pizza: "https://picsum.photos/seed/pizza/600/400",
    Burger: "https://picsum.photos/seed/burger/600/400",
    Momos: "https://picsum.photos/seed/momos/600/400",
    Pasta: "https://picsum.photos/seed/pasta/600/400",
    Fries: "https://picsum.photos/seed/fries/600/400",
    Default: "https://picsum.photos/seed/food/600/400",
  };

  const finalImage = image || foodImages[title] || foodImages.Default;

  return (
    <div className="card">
      {/* Image */}
      <div className="card-image">
        <img
          src={finalImage}
          alt={title}
          className="card-img"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>

        <div className="card-footer">
          <span className="price">₹{price}</span>
          <button className="btn order-btn">Order Now</button>
        </div>
      </div>
    </div>
  );
}
