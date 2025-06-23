import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * Recipe detail page for a single recipe.
 */
function RecipeDetail({ openModal }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch this recipe by id
    setTimeout(() => {
      setRecipe({
        id,
        title: "Simple Spaghetti",
        image:
          "https://images.unsplash.com/photo-1512058564366-c9e9f4b19b53?auto=format&fit=crop&w=800&q=80",
        summary: "Classic Italian pasta dish.",
        ingredients: [
          "Spaghetti",
          "Tomato sauce",
          "Olive oil",
          "Parmesan",
          "Basil",
        ],
        instructions:
          "Boil pasta. Heat sauce. Toss together. Serve with cheese and basil.",
        isFavorite: false,
      });
      setLoading(false);
    }, 400);
  }, [id]);

  if (loading)
    return <div style={{ marginTop: 30 }}>Loading recipe...</div>;
  if (!recipe) return <div>Not found.</div>;

  const handleEdit = () => navigate(`/edit/${id}`);
  const handleDelete = () => {
    // TODO: Call delete API and redirect/list
    alert("Delete recipe -- not implemented.");
    navigate("/");
  };
  const handleFavorite = () => {
    // TODO: Save/unsave favorite with backend
    alert("Favorite recipe -- not implemented.");
  };

  return (
    <div style={{ background: "#fff", color: "#222", borderRadius: 8, padding: 28, boxShadow: "0 2px 18px #0001" }}>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: "100%", maxHeight: 260, objectFit: "cover", borderRadius: 8, marginBottom: 18 }}
      />
      <div style={{ fontWeight: 800, fontSize: "2rem", color: theme.primary }}>{recipe.title}</div>
      <div style={{ color: theme.textSecondary, marginBottom: 16 }}>{recipe.summary}</div>
      <div style={{ marginTop: 18 }}>
        <span style={{ fontWeight: 600, color: theme.accent }}>Ingredients:</span>
        <ul>
          {(recipe.ingredients || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: 10 }}>
        <span style={{ fontWeight: 600, color: theme.secondary }}>Instructions:</span>
        <div style={{ marginTop: 10 }}>{recipe.instructions}</div>
      </div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button className="btn" onClick={handleEdit} style={{ background: theme.primary, color: "#fff" }}>
          Edit
        </button>
        <button className="btn" onClick={handleDelete} style={{ background: theme.accent, color: "#fff" }}>
          Delete
        </button>
        <button className="btn" onClick={handleFavorite} style={{ background: recipe.isFavorite ? theme.secondary : theme.border, color: "#fff" }}>
          {recipe.isFavorite ? "Saved" : "Favorite"}
        </button>
        <Link to="/" className="btn" style={{ background: "#e4e4e4", color: "#222" }}>
          Back
        </Link>
      </div>
    </div>
  );
}

export default RecipeDetail;
