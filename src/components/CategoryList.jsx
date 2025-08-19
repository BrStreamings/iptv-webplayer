import React from "react";

export default function CategoryList({ categories, selected, onSelect }) {
  return (
    <div className="category-list">
      {categories.map((cat) => (
        <button
          key={cat}
          className={selected === cat ? "active" : ""}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}