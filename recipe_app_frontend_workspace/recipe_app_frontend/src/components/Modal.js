import React from "react";

/** PUBLIC_INTERFACE
 * Modal dialog for forms/popups.
 */
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1000,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(68,68,68, 0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          color: "#222",
          borderRadius: 8,
          minWidth: 340,
          minHeight: 100,
          maxWidth: 460,
          boxShadow: "0 8px 40px 0 #0002",
          padding: "32px 24px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 12,
            top: 10,
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: 20,
            color: "#aaa",
          }}
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
export default Modal;
