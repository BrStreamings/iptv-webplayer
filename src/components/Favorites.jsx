import React from "react";

export default function Favorites({ favorites, onSelect, onToggle }) {
  if (!favorites.length) return null;
  return (
    <div className="favorites-bar">
      <span>Favoritos:</span>
      {favorites.map((item) => (
        <button key={item.url} onClick={() => onSelect(item)}>
          <img src={item.logo || "https://via.placeholder.com/32x32?text=LOGO"} alt={item.name} />
        </button>
      ))}
    </div>
  );
}