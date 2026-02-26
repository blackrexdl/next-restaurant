import Image from "next/image";

export default function FoodCard({ title, price, image }) {
  return (
    <div className="card-item">
      <div className="card">
        <div className="card-image">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="price">₹{price}</p>
          <button className="btn order-btn">Order Now</button>
        </div>
      </div>
    </div>
  );
}
