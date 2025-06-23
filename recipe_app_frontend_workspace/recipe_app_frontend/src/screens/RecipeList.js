import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * Recipe listing with search and browse.
 */
function RecipeList({ openModal }) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setLoading(true);
    // TODO: Fetch recipes from backend API, optionally with search query
    // For now, mock:
    setTimeout(() => {
      setLoading(false);
      setRecipes([
        {
          id: 1,
          title: "Simple Spaghetti",
          image: "https://images.unsplash.com/photo-1512058564366-c9e9f4b19b53?auto=format&fit=crop&w=800&q=80",
          summary: "A delicious, quick Italian spaghetti.",
        },
        {
          id: 2,
          title: "Chocolate Cake",
          image: "https://images.unsplash.com/photo-1514512364185-4c2b678fa2a1?auto=format&fit=crop&w=800&q=80",
          summary: "Rich, moist chocolate cake for dessert.",
        },
      ]);
    }, 500);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchValue);
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        style={{
          paddingBottom: 18,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <input
          type="search"
          placeholder="Search recipes..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            fontSize: 16,
            border: `1px solid ${theme.border}`,
            borderRadius: 4,
            padding: "8px 12px",
            flex: 1,
            background: "#fff",
            color: "#222",
          }}
        />
        <button
          type="submit"
          className="btn"
          style={{
            background: theme.primary,
            color: "#fff",
          }}
        >
          Search
        </button>
        <Link to="/new" className="btn" style={{ background: theme.accent, color: "#fff" }}>
          + New Recipe
        </Link>
      </form>
      {loading ? (
        <div>Loading recipes...</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {recipes.map((r) => (
            <div
              key={r.id}
              style={{
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                background: "#fff",
                color: "#222",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                minHeight: 240,
              }}
            >
              <Link to={`/recipe/${r.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src={r.image}
                  alt={r.title}
                  style={{ width: "100%", height: 158, objectFit: "cover", borderBottom: `1px solid ${theme.border}` }}
                />
                <div style={{ padding: 16, flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.16rem",
                      marginBottom: 8,
                      color: theme.primary,
                    }}
                  >
                    {r.title}
                  </div>
                  <div style={{ fontSize: 14, color: theme.textSecondary }}>{r.summary}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
