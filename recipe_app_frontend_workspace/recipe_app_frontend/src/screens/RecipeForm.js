import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * Form for creating or editing a recipe.
 */
function RecipeForm({ mode, closeModal }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    image: "",
    ingredients: [""],
    instructions: "",
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      // Fetch recipe data and populate form
      setTimeout(() => {
        setRecipe({
          title: "Loaded Recipe " + id,
          summary: "An example loaded recipe summary.",
          image: "",
          ingredients: ["Eggs", "Flour"],
          instructions: "Mix, cook, enjoy!",
        });
      }, 350);
    }
    // If mode=create, leave blank
  }, [mode, id]);

  const handleChange = (e) => {
    setRecipe((r) => ({
      ...r,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIngredientChange = (idx, value) => {
    setRecipe((r) => {
      const ingredients = [...r.ingredients];
      ingredients[idx] = value;
      return { ...r, ingredients };
    });
  };

  const addIngredient = () => {
    setRecipe((r) => ({
      ...r,
      ingredients: [...r.ingredients, ""],
    }));
  };

  const removeIngredient = (idx) => {
    setRecipe((r) => ({
      ...r,
      ingredients: r.ingredients.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    // TODO: Submit data to backend (POST or PUT)
    setTimeout(() => {
      setSaving(false);
      // If modal, close it; otherwise, navigate
      if (closeModal) closeModal();
      else navigate("/");
    }, 600);
  };

  return (
    <form
      style={{
        background: "#fff",
        color: "#222",
        borderRadius: 8,
        padding: 28,
        minWidth: 360,
        boxShadow: "0 4px 28px #0002",
        margin: "auto",
      }}
      onSubmit={handleSubmit}
    >
      <h2 style={{ color: theme.primary, marginBottom: 16 }}>
        {mode === "edit" ? "Edit Recipe" : "New Recipe"}
      </h2>
      <label style={{ display: "block", marginBottom: 10 }}>
        Title:
        <input
          required
          name="title"
          value={recipe.title}
          onChange={handleChange}
          style={{
            width: "100%",
            marginTop: 5,
            marginBottom: 13,
            padding: 8,
            fontSize: 15,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
      </label>
      <label style={{ display: "block", marginBottom: 10 }}>
        Summary:
        <textarea
          required
          name="summary"
          value={recipe.summary}
          onChange={handleChange}
          style={{
            width: "100%",
            marginTop: 5,
            marginBottom: 13,
            padding: 8,
            fontSize: 15,
            border: "1px solid #ccc",
            borderRadius: 4,
            minHeight: 54,
          }}
        />
      </label>
      <label style={{ display: "block", marginBottom: 10 }}>
        Image URL:
        <input
          type="url"
          name="image"
          value={recipe.image}
          onChange={handleChange}
          style={{
            width: "100%",
            marginTop: 5,
            marginBottom: 13,
            padding: 8,
            fontSize: 15,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
      </label>
      <div style={{ marginBottom: 14 }}>
        <span style={{ fontWeight: 700 }}>Ingredients: </span>
        {recipe.ingredients.map((ing, idx) => (
          <div key={idx} style={{ marginBottom: 8, display: "flex", alignItems: "center" }}>
            <input
              value={ing}
              required
              onChange={(e) => handleIngredientChange(idx, e.target.value)}
              style={{
                width: "86%",
                padding: 7,
                fontSize: 15,
                marginRight: 7,
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
            {recipe.ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(idx)}
                style={{
                  background: "#eee",
                  color: "#c00",
                  border: "none",
                  borderRadius: 3,
                  cursor: "pointer",
                  fontWeight: 700,
                  padding: "5px 7px",
                  marginLeft: 2,
                }}
                title="Remove ingredient"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn"
          onClick={addIngredient}
          style={{ background: theme.secondary, color: "#fff", marginTop: 5 }}
        >
          + Add Ingredient
        </button>
      </div>
      <label style={{ display: "block", marginBottom: 18 }}>
        Instructions:
        <textarea
          required
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          style={{
            width: "100%",
            marginTop: 5,
            marginBottom: 7,
            padding: 8,
            fontSize: 15,
            border: "1px solid #ccc",
            borderRadius: 4,
            minHeight: 64,
          }}
        />
      </label>
      <div style={{ marginTop: 16, display: "flex", gap: 14 }}>
        <button
          type="submit"
          className="btn"
          disabled={saving}
          style={{ background: theme.primary, color: "#fff", minWidth: 99 }}
        >
          {saving ? "Saving..." : mode === "edit" ? "Save" : "Create"}
        </button>
        <button
          onClick={() => (closeModal ? closeModal() : navigate(-1))}
          type="button"
          className="btn"
          style={{
            background: theme.border,
            color: "#222",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
