import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * Lists user's favorite recipes.
 */
function Favorites() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    // TODO: Fetch favorites from backend
    setTimeout(() => {
      setFavorites([
        {
          id: 2,
          title: "Chocolate Cake",
          image: "https://images.unsplash.com/photo-1514512364185-4c2b678fa2a1?auto=format&fit=crop&w=800&q=80",
        },
      ]);
    }, 300);
  }, []);
  return (
    <div>
      <h2 style={{ color: theme.primary, marginBottom: 22 }}>Your Favorites</h2>
      {favorites.length === 0 ? (
        <div>No favorites saved.</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
          }}
        >
          {favorites.map((r) => (
            <Link
              to={`/recipe/${r.id}`}
              key={r.id}
              style={{
                display: "block",
                background: "#fff",
                borderRadius: 8,
                color: "#222",
                textDecoration: "none",
                boxShadow: "0 2px 9px #0001",
              }}
            >
              <img
                src={r.image}
                alt={r.title}
                style={{
                  width: "100%",
                  height: 132,
                  objectFit: "cover",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
              <div style={{ padding: "16px 12px", fontWeight: 700 }}>{r.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
export default Favorites;
