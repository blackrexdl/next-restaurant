"use client";
import "./hero.css";

export default function Hero() {
  const scrollToFood = () => {
    const section = document.getElementById("food-section");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const openCart = () => {
    window.dispatchEvent(new CustomEvent("openCart"));
  };

  return (
    <section className="hero">

  <div className="hero-marquee">
    <div className="hero-track">
      <span>🔥 FRESH PIZZA • JUICY BURGERS • STREET STYLE MOMOS • CREAMY PASTA • HOT & DELICIOUS • MADE FRESH DAILY •</span>
      <span>🔥 FRESH PIZZA • JUICY BURGERS • STREET STYLE MOMOS • CREAMY PASTA • HOT & DELICIOUS • MADE FRESH DAILY •</span>
    </div>
  </div>

  <h1>
    Premium Taste, <strong>Delivered Fast</strong>
  </h1>

  <p>
    Experience <strong>freshly crafted meals</strong> prepared with quality ingredients and delivered straight to your door.
  </p>

  <div className="hero-buttons">
    <button className="order-btn" onClick={scrollToFood}>
  Order Now
</button>

<button className="menu-btn" onClick={openCart}>
  View Menu
</button>
  </div>

</section>
  );
}