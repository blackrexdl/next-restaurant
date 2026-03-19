"use client";
import "./hero.css";

export default function Hero() {
  const scrollToFood = () => {
    if (typeof window === "undefined") return;

    const section = document.getElementById("food-section");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const openCart = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("openCart"));
  };

  return (
    <section className="hero">

  <div className="hero-marquee">
    <div className="hero-track" aria-hidden="true">
      <span>🔥 FRESH PIZZA • JUICY BURGERS • STREET STYLE MOMOS • CREAMY PASTA • HOT & DELICIOUS • MADE FRESH DAILY •</span>
      <span>🔥 FRESH PIZZA • JUICY BURGERS • STREET STYLE MOMOS • CREAMY PASTA • HOT & DELICIOUS • MADE FRESH DAILY •</span>
    </div>
  </div>

  <h1>
    Premium Taste, <span className="highlight">Delivered Fast</span>
  </h1>

  <p>
    Experience freshly crafted meals prepared with quality ingredients and delivered straight to your door.
  </p>

  <div className="hero-buttons">
    <button
      className="order-btn"
      onClick={scrollToFood}
      aria-label="Scroll to food section"
    >
      Order Now
    </button>

    <button
      className="menu-btn"
      onClick={openCart}
      aria-label="Open cart menu"
    >
      View Menu
    </button>
  </div>

</section>
  );
}