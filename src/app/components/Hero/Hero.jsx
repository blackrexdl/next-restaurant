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

  <h1>Delicious Food Delivered Fast</h1>

  <p>Order your favorite meals instantly</p>

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