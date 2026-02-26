import Hero from "./components/Hero/Hero";
import FoodCard from "./components/FoodCard/FoodCard";

export default function Home() {
  const menuItems = [
    { id: 1, title: "Pizza", price: 199, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" },
    { id: 2, title: "Burger", price: 149, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800" },
    { id: 3, title: "Momos", price: 99, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800" },
    { id: 4, title: "Khana Kha Liya?", price: 249, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800" },
    { id: 5, title: "Tu Kha Liya?", price: 299, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" },
    { id: 6, title: "Paneer Tikka", price: 219, image: "https://images.unsplash.com/photo-1604908176997-4310f5d10f0c?w=800" },
    { id: 7, title: "Butter Chicken", price: 279, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800" },
    { id: 8, title: "Biryani", price: 199, image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=800" }
  ];

  return (
    <main>
      <Hero />
      <section className="section container">
        <h2 className="section-title">Popular Foods</h2>
        <div className="food-grid">
          {menuItems.map((item) => (
            <FoodCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}