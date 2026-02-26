import Hero from "./components/Hero/Hero";
import FoodCard from "./components/FoodCard/FoodCard";

export default function Home() {

  // Scalable menu (easy future updates or DB integration)
  const menuItems = [
    { id: 1, title: "Pizza", price: 199 },
    { id: 2, title: "Burger", price: 149 },
    { id: 3, title: "Momos", price: 99 },
    { id: 4, title: "Khana Kha Liya?", price: 249 },
    { id: 5, title: "Tu Kha Liya?", price: 299 },
    { id: 6, title: "Pizza", price: 219 },
    { id: 7, title: "Burger", price: 179 },
    { id: 8, title: "Momos", price: 129 }
  ];

  return (
    <main>
      <Hero />

      <section className="section container">
        <h2 className="section-title">Popular Foods</h2>

        <div className="food-grid">
          {menuItems.map((item) => (
            <FoodCard
              key={item.id}
              title={item.title}
              price={item.price}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
