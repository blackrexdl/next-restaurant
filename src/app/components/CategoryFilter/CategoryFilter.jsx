"use client";
import "./category.css";
export default function CategoryFilter({ category, setCategory }) {
  const categories = [
    "All",
    "Street Food",
    "South Indian",
    "Beverages",
    "Main Course"
  ];

  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={category === cat ? "active-filter" : ""}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}