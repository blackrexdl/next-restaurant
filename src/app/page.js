"use client";

import { useState } from "react";
import Hero from "./components/Hero/Hero";
import FoodCard from "./components/FoodCard/FoodCard";

// Menu Data (easy to extend later)
const menuItems = [
  {
    id: 1,
    title: "Pav Bhaji",
    price: 199,
    category: "Street Food",
    image: "/images/pav-bhaji.jpg"
  },
  {
    id: 2,
    title: "Vada Pav",
    price: 79,
    category: "Street Food",
    image: "/images/vada-pav.jpg"
  },
  {
    id: 13,
    title: "Samosa Chaat",
    price: 129,
    category: "Street Food",
    image: "/images/samosa-chaat.jpg"
  },
  {
    id: 14,
    title: "Aloo Tikki Chaat",
    price: 119,
    category: "Street Food",
    image: "/images/aloo-tikki.jpg"
  },
  {
    id: 3,
    title: "Steamed Veg Momos",
    price: 129,
    category: "Street Food",
    image: "/images/momos.jpg"
  },
  {
    id: 11,
    title: "Fried Veg Momos",
    price: 149,
    category: "Street Food",
    image: "/images/fried-momos.jpg"
  },
  {
    id: 12,
    title: "Tandoori Momos",
    price: 179,
    category: "Street Food",
    image: "/images/Tandoori-momos.jpg"
  },
  {
    id: 4,
    title: "Paneer Butter Masala",
    price: 269,
    category: "Main Course",
    image: "/images/paneer-butter-masala.jpg"
  },
  {
    id: 5,
    title: "Cold Coffee",
    price: 149,
    category: "Beverages",
    image: "/images/cold-coffee.jpg"
  },
  {
    id: 17,
    title: "Cappuccino",
    price: 159,
    category: "Beverages",
    image: "/images/cappuccino.jpg"
  },
  {
    id: 18,
    title: "Cafe Latte",
    price: 169,
    category: "Beverages",
    image: "/images/latte.jpg"
  },
  {
    id: 19,
    title: "Espresso",
    price: 129,
    category: "Beverages",
    image: "/images/espresso.jpg"
  },
  {
    id: 20,
    title: "Mocha Coffee",
    price: 179,
    category: "Beverages",
    image: "/images/mocha.jpg"
  },
  {
    id: 6,
    title: "Paneer Tikka",
    price: 219,
    category: "Main Course",
    image: "/images/paneer-tikka.jpg"
  },
  {
    id: 7,
    title: "Butter Chicken",
    price: 299,
    category: "Main Course",
    image: "/images/butter-chicken.jpg"
  },
  {
    id: 8,
    title: "Chicken Biryani",
    price: 249,
    category: "Main Course",
    image: "/images/biryani.jpg"
  },
  {
    id: 9,
    title: "Masala Dosa",
    price: 149,
    category: "South Indian",
    image: "/images/masala-dosa.jpg"
  },
  {
    id: 15,
    title: "Idli Sambar",
    price: 129,
    category: "South Indian",
    image: "/images/idli.jpg"
  },
  {
    id: 16,
    title: "Chole Bhature",
    price: 179,
    category: "Main Course",
    image: "/images/chole-bhature.jpg"
  },
  {
    id: 10,
    title: "Chocolate Shake",
    price: 179,
    category: "Beverages",
    image: "/images/chocolate-shake.jpg"
  },
  {
    id: 21,
    title: "Strawberry Shake",
    price: 169,
    category: "Beverages",
    image: "/images/strawberry-shake.jpg"
  },
  {
    id: 22,
    title: "Vanilla Shake",
    price: 159,
    category: "Beverages",
    image: "/images/vanilla-shake.jpg"
  },
  {
    id: 23,
    title: "Oreo Shake",
    price: 189,
    category: "Beverages",
    image: "/images/oreo-shake.jpg"
  },
  {
    id: 24,
    title: "Banana Shake",
    price: 149,
    category: "Beverages",
    image: "/images/banana-shake.jpg"
  },
  {
    id: 25,
    title: "Mango Shake",
    price: 179,
    category: "Beverages",
    image: "/images/mango-shake.jpg"
  }
];


export default function Home() {
  const [category, setCategory] = useState("All");

  const filteredItems =
    category === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  return (
    <main>
      <Hero />
      <section className="section container">
        <h2 className="section-title">Popular Foods</h2>

       <div className="category-filter">
  <button
    className={category === "All" ? "active-filter" : ""}
    onClick={() => setCategory("All")}
  >
    All
  </button>

  <button
    className={category === "Street Food" ? "active-filter" : ""}
    onClick={() => setCategory("Street Food")}
  >
    Street Food
  </button>

  <button
    className={category === "South Indian" ? "active-filter" : ""}
    onClick={() => setCategory("South Indian")}
  >
    South Indian
  </button>

  <button
    className={category === "Beverages" ? "active-filter" : ""}
    onClick={() => setCategory("Beverages")}
  >
    Beverages
  </button>

  <button
    className={category === "Main Course" ? "active-filter" : ""}
    onClick={() => setCategory("Main Course")}
  >
    Main Course
  </button>
</div>

       <div id="food-section" className="food-grid">
          {filteredItems.map((item, index) => (
            <FoodCard key={item.id} index={index} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}