"use client";
import "./category.css";
import { useRef, useEffect, useLayoutEffect, useState } from "react";

export default function CategoryFilter({ category, setCategory }) {
  const categories = [
    "All",
    "Street Food",
    "South Indian",
    "Beverages",
    "Main Course"
  ];

  const containerRef = useRef(null);
  const [underline, setUnderline] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const activeBtn = containerRef.current?.querySelector(".active-filter");
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [category]);

  useLayoutEffect(() => {
    const el = containerRef.current?.querySelector(".active-filter");
    if (!el || !containerRef.current) return;
    const rect = el.getBoundingClientRect();
    const parentRect = containerRef.current.getBoundingClientRect();
    setUnderline({
      width: rect.width,
      left: rect.left - parentRect.left + containerRef.current.scrollLeft,
    });

    const handleResize = () => {
      const el2 = containerRef.current?.querySelector(".active-filter");
      if (!el2) return;
      const r = el2.getBoundingClientRect();
      const pr = containerRef.current.getBoundingClientRect();
      setUnderline({
        width: r.width,
        left: r.left - pr.left + containerRef.current.scrollLeft,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [category]);

  return (
    <div className="category-filter" ref={containerRef}>
      <div
        className="active-underline"
        style={{ width: underline.width, transform: `translateX(${underline.left}px)` }}
      />
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