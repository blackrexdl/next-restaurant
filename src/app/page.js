"use client";

import { useState, useEffect } from "react";
import Loader from "./components/Loader/Loader";
import Hero from "./components/Hero/Hero";
import FoodCard from "./components/FoodCard/FoodCard";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
// Menu Data (easy to extend later)
const menuItems = [
  {
    id: 1,
    title: "Pav Bhaji",
    price: 199,
    category: "Street Food",
    image: "/images/pav-bhaji.jpg",
    rating: 4.6,
    reviews: 210,
    badge: "Best Seller"
  },
  {
    id: 2,
    title: "Vada Pav",
    price: 79,
    category: "Street Food",
    image: "/images/vada-pav.jpg",
    rating: 4.3,
    reviews: 150
  },
  {
    id: 13,
    title: "Samosa Chaat",
    price: 129,
    category: "Street Food",
    image: "/images/samosa-chaat.jpg",
    rating: 4.5,
    reviews: 180,
    badge: "Popular"
  },
  {
    id: 14,
    title: "Aloo Tikki Chaat",
    price: 119,
    category: "Street Food",
    image: "/images/aloo-tikki.jpg",
    rating: 4.2,
    reviews: 130
  },
  {
    id: 3,
    title: "Steamed Veg Momos",
    price: 129,
    category: "Street Food",
    image: "/images/momos.jpg",
    rating: 4.4,
    reviews: 170
  },
  {
    id: 11,
    title: "Fried Veg Momos",
    price: 149,
    category: "Street Food",
    image: "/images/fried-momos.jpg",
    rating: 4.1,
    reviews: 120
  },
  {
    id: 12,
    title: "Tandoori Momos",
    price: 179,
    category: "Street Food",
    image: "/images/Tandoori-momos.jpg",
    rating: 4.7,
    reviews: 220,
    badge: "Trending"
  },
  {
    id: 4,
    title: "Paneer Butter Masala",
    price: 269,
    category: "Main Course",
    image: "/images/paneer-butter-masala.jpg",
    rating: 4.5,
    reviews: 200
  },
  {
    id: 5,
    title: "Cold Coffee",
    price: 149,
    category: "Beverages",
    image: "/images/cold-coffee.jpg",
    rating: 4.3,
    reviews: 140
  },
  {
    id: 17,
    title: "Cappuccino",
    price: 159,
    category: "Beverages",
    image: "/images/cappuccino.jpg",
    rating: 4.4,
    reviews: 160
  },
  {
    id: 18,
    title: "Cafe Latte",
    price: 169,
    category: "Beverages",
    image: "/images/latte.jpg",
    rating: 4.2,
    reviews: 110
  },
  {
    id: 19,
    title: "Espresso",
    price: 129,
    category: "Beverages",
    image: "/images/espresso.jpg",
    rating: 4.0,
    reviews: 90
  },
  {
    id: 20,
    title: "Mocha Coffee",
    price: 179,
    category: "Beverages",
    image: "/images/mocha.jpg",
    rating: 4.5,
    reviews: 170
  },
  {
    id: 6,
    title: "Paneer Tikka",
    price: 219,
    category: "Main Course",
    image: "/images/paneer-tikka.jpg",
    rating: 4.6,
    reviews: 190
  },
  {
    id: 7,
    title: "Butter Chicken",
    price: 299,
    category: "Main Course",
    image: "/images/butter-chicken.jpg",
    rating: 4.8,
    reviews: 250,
    badge: "Best Seller"
  },
  {
    id: 8,
    title: "Chicken Biryani",
    price: 249,
    category: "Main Course",
    image: "/images/biryani.jpg",
    rating: 4.7,
    reviews: 230
  },
  {
    id: 9,
    title: "Masala Dosa",
    price: 149,
    category: "South Indian",
    image: "/images/masala-dosa.jpg",
    rating: 4.4,
    reviews: 180
  },
  {
    id: 15,
    title: "Idli Sambar",
    price: 129,
    category: "South Indian",
    image: "/images/idli.jpg",
    rating: 4.2,
    reviews: 140
  },
  {
    id: 16,
    title: "Chole Bhature",
    price: 179,
    category: "Main Course",
    image: "/images/chole-bhature.jpg",
    rating: 4.5,
    reviews: 200
  },
  {
    id: 10,
    title: "Chocolate Shake",
    price: 179,
    category: "Beverages",
    image: "/images/chocolate-shake.jpg",
    rating: 4.3,
    reviews: 150
  },
  {
    id: 21,
    title: "Strawberry Shake",
    price: 169,
    category: "Beverages",
    image: "/images/strawberry-shake.jpg",
    rating: 4.2,
    reviews: 120
  },
  {
    id: 22,
    title: "Vanilla Shake",
    price: 159,
    category: "Beverages",
    image: "/images/vanilla-shake.jpg",
    rating: 4.1,
    reviews: 100
  },
  {
    id: 23,
    title: "Oreo Shake",
    price: 189,
    category: "Beverages",
    image: "/images/oreo-shake.jpg",
    rating: 4.6,
    reviews: 190,
    badge: "Trending"
  },
  {
    id: 24,
    title: "Banana Shake",
    price: 149,
    category: "Beverages",
    image: "/images/banana-shake.jpg",
    rating: 4.0,
    reviews: 90
  },
  {
    id: 25,
    title: "Mango Shake",
    price: 179,
    category: "Beverages",
    image: "/images/mango-shake.jpg",
    rating: 4.5,
    reviews: 170
  }
];

export default function Home() {
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  const topRated = [...menuItems]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const trending = menuItems.filter(
    (item) => item.badge && item.badge.includes("Trending")
  );

  const filteredItems = (
    category === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === category)
  ).sort((a, b) => b.rating - a.rating);

  return (
    <main>
      <Hero />

      <section className="section container">
        <h2 className="section-title">🔥 Top Rated</h2>
        <div className="food-grid">
          {topRated.map((item, index) => (
            <FoodCard key={item.id} index={index} {...item} />
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">🚀 Trending</h2>
        <div className="food-grid">
          {trending.map((item, index) => (
            <FoodCard key={item.id} index={index} {...item} />
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">
          {category === "All" ? "Top Rated Foods" : category}
        </h2>

        <CategoryFilter
          category={category}
          setCategory={setCategory}
        />

        <div id="food-section" className="food-grid">
          {filteredItems.map((item, index) => (
            <FoodCard key={item.id} index={index} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}