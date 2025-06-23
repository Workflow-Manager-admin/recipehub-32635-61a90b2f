import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * Screen for user authentication (login or register).
 */
function AuthScreen({ mode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to backend auth API
    setTimeout(() => {
      setLoading(false);
      // Simulate login/reg success
      navigate("/");
    }, 600);
  };

  return (
    <form
      style={{
        background: "#fff",
        color: "#222",
        borderRadius: 8,
        padding: 32,
        maxWidth: 420,
        margin: "40px auto",
        boxShadow: "0 4px 24px #0001",
      }}
      onSubmit={handleSubmit}
    >
      <h2 style={{ color: theme.primary, marginBottom: 15 }}>
        {isRegister ? "Register" : "Login"}
      </h2>
      {isRegister && (
        <label style={{ display: "block", marginBottom: 12 }}>
          Name:
          <input
            required
            name="name"
            value={form.name}
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
      )}
      <label style={{ display: "block", marginBottom: 12 }}>
        Email:
        <input
          required
          name="email"
          type="email"
          value={form.email}
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
      <label style={{ display: "block", marginBottom: 18 }}>
        Password:
        <input
          required
          name="password"
          value={form.password}
          type="password"
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
      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <button
          type="submit"
          className="btn"
          style={{ background: theme.primary, color: "#fff", minWidth: 90 }}
          disabled={loading}
        >
          {loading
            ? isRegister
              ? "Registering..."
              : "Logging in..."
            : isRegister
            ? "Register"
            : "Login"}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => navigate(isRegister ? "/login" : "/register")}
          style={{ background: theme.secondary, color: "#fff" }}
        >
          {isRegister ? "Go to Login" : "Register"}
        </button>
      </div>
    </form>
  );
}

export default AuthScreen;
