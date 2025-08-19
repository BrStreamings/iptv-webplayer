import React, { useState } from "react";

export default function ChannelGrid({ channels, onSelect, favorites, onFavorite }) {
  const [search, setSearch] = useState("");

  const filtered = channels.filter(
    (c) =>
      !search ||
      (c.name && c.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <input
        className="search"
        placeholder="Buscar canal..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid">
        {filtered.map((item) => (
          <div key={item.url} className="grid-item">
            <img
              src={item.logo || "https://via.placeholder.com/120x90?text=SEM+LOGO"}
              alt={item.name}
              onClick={() => onSelect(item)}
            />
            <div className="grid-title">{item.name}</div>
            <button
              className={`fav-btn ${favorites.some((f) => f.url === item.url) ? "fav" : ""}`}
              onClick={() => onFavorite(item)}
            >★</button>
          </div>
        ))}
      </div>
    </div>
  );
}