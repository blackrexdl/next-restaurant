import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">

  <div className="hero-marquee">
    <div className="hero-track">
      <span>Fresh Pizza • Hot Burgers • Tasty Momos • Delicious Pasta •</span>
      <span>Fresh Pizza • Hot Burgers • Tasty Momos • Delicious Pasta •</span>
    </div>
  </div>

  <h1>Delicious Food Delivered Fast</h1>

  <p>Order your favorite meals instantly</p>

  <div className="hero-buttons">
    <button className="order-btn">Order Now</button>
    <button className="menu-btn">View Menu</button>
  </div>

</section>
  );
}