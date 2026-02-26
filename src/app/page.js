import Hero from "./components/Hero/Hero";
import FoodCard from "./components/FoodCard/FoodCard";

export default function Home() {

  // Scalable menu (easy future updates or DB integration)
  const menuItems = [
    { id: 1, title: "Pizza", price: 199, image: "https://images.unsplash.com/photo-1601924582975-7e0f7a8c2b5c" },
    { id: 2, title: "Burger", price: 149, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { id: 3, title: "Momos", price: 99, image: "https://images.unsplash.com/photo-1625944525903-d5b7f1b3c4e0" },
    { id: 4, title: "Khana Kha Liya?", price: 249, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
    { id: 5, title: "Tu Kha Liya?", price: 299, image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9" },
    { id: 6, title: "Pizza", price: 219, image: "https://images.unsplash.com/photo-1548365328-9f547fb0953d" },
    { id: 7, title: "Burger", price: 179, image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
    { id: 8, title: "Momos", price: 129, image: "https://images.unsplash.com/photo-1604908554027-1b3a6c7e1c7d" }
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
              image={item.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
