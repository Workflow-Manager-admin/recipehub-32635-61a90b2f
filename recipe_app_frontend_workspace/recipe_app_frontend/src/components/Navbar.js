import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * Application top navigation bar.
 */
function Navbar({ logo }) {
  const navigate = useNavigate();
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <nav
      className="navbar"
      style={{
        background: "var(--navbar)",
        borderBottom: `1px solid var(--border-color)`,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 10,
        height: 64,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          padding: "0 2rem",
        }}
      >
        <a
          href="/"
          className="logo"
          onClick={handleLogoClick}
          style={{
            textDecoration: "none",
            fontWeight: 800,
            fontSize: 24,
            color: theme.primary,
            letterSpacing: ".5px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <span
            className="logo-symbol"
            style={{
              display: "inline-block",
              width: 16,
              height: 16,
              background: theme.accent,
              borderRadius: "50%",
              marginRight: 9,
            }}
          ></span>
          {logo}
        </a>
        <div style={{ display: "flex", gap: 16 }}>
          <Link
            to="/favorites"
            className="btn"
            style={{
              background: theme.secondary,
              color: "#fff",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Favorites
          </Link>
          <Link
            to="/login"
            className="btn"
            style={{
              background: theme.primary,
              color: "#fff",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
