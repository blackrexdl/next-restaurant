"use client";
import "./card.css";

export default function FoodCard({ title = "Khana Kha Liya?", price = 199, image }) {

  const foodImages = {
    "Khana Kha Liya?": "https://picsum.photos/seed/khana/600/400",
    "Tu Kha Liya?": "https://picsum.photos/seed/tukha/600/400",
    Pizza: "https://picsum.photos/seed/pizza/600/400",
    Burger: "https://picsum.photos/seed/burger/600/400",
    Momos: "https://picsum.photos/seed/momos/600/400",
    Default: "https://picsum.photos/seed/food/600/400"
  };

  const finalImage = image || foodImages[title] || foodImages.Default;

  return (
    <div className="card">
      <div className="card-image">
        <img
          src={finalImage}
          alt={title}
          className="card-img"
        />
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="price">₹{price}</p>
        <button className="btn order-btn">Order Now</button>
      </div>
    </div>
  );
}
