import React from "react";

const defaultCategories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
];

// PUBLIC_INTERFACE
/**
 * Sidebar for category navigation.
 */
function Sidebar({ categories = defaultCategories, onSelect }) {
  return (
    <aside
      style={{
        width: 210,
        background: "var(--sidebar)",
        borderRight: "1px solid var(--border-color)",
        minHeight: "calc(100vh - 64px)",
        paddingTop: 24,
        position: "sticky",
        top: 64,
      }}
    >
      <div style={{ padding: "0 20px" }}>
        <div
          style={{
            fontWeight: 700,
            color: "var(--text-color)",
            marginBottom: 22,
            fontSize: 17,
            letterSpacing: ".4px",
          }}
        >
          Categories
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {categories.map((cat) => (
            <button
              className="btn"
              key={cat}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-color)",
                textAlign: "left",
                fontWeight: 500,
                padding: 0,
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={onSelect ? () => onSelect(cat) : undefined}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
