import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import CategoryList from "./components/CategoryList";
import ChannelGrid from "./components/ChannelGrid";
import PlayerModal from "./components/PlayerModal";
import Favorites from "./components/Favorites";
import { parseM3U } from "./hooks/useM3UParser";
import { fetchXtreamChannels } from "./utils/xtreamApi";

export default function App() {
  const [auth, setAuth] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ server, user, pass, type }) => {
    setAuth({ server, user, pass, type });
    setLoading(true);
    try {
      let parsed = [];
      if (type === "xtream") {
        parsed = await fetchXtreamChannels({ host: server, username: user, password: pass });
      } else {
        const m3uUrl = `${server.replace(/\/$/, "")}/get.php?username=${user}&password=${pass}&type=m3u_plus&output=ts`;
        const res = await fetch(m3uUrl);
        const text = await res.text();
        parsed = parseM3U(text);
      }
      setPlaylist(parsed);
      setCategories(["Favoritos", ...Array.from(new Set(parsed.map(x => x.group || "Outros")))]);
    } catch (e) {
      alert("Falha ao carregar lista. Verifique servidor, usuário e senha.");
      setAuth(null);
    }
    setLoading(false);
  };

  const toggleFavorite = (channel) => {
    let favs = [...favorites];
    const idx = favs.findIndex((x) => x.url === channel.url);
    if (idx >= 0) favs.splice(idx, 1);
    else favs.push(channel);
    setFavorites(favs);
    localStorage.setItem("favorites", JSON.stringify(favs));
  };

  return (
    <div className="iptv-app">
      <header>
        <h1>IPTV Web Player</h1>
      </header>
      {!auth ? (
        <LoginForm onLogin={handleLogin} />
      ) : loading ? (
        <div style={{margin:40, fontSize:18}}>Carregando canais...</div>
      ) : (
        <>
          <Favorites favorites={favorites} onSelect={setSelectedChannel} onToggle={toggleFavorite} />
          <CategoryList
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <ChannelGrid
            channels={
              selectedCategory === "Favoritos"
                ? favorites
                : playlist.filter(
                    (c) => !selectedCategory || c.group === selectedCategory
                  )
            }
            onSelect={setSelectedChannel}
            favorites={favorites}
            onFavorite={toggleFavorite}
          />
          {selectedChannel && (
            <PlayerModal
              channel={selectedChannel}
              onClose={() => setSelectedChannel(null)}
            />
          )}
        </>
      )}
    </div>
  );
}