import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1 className="hero-title">Delicious Food Delivered Fast 🍕</h1>
        <p className="hero-sub">Order from your favorite restaurants</p>
        <button className="btn hero-btn">Explore Menu</button>
      </div>
    </section>
  );
}