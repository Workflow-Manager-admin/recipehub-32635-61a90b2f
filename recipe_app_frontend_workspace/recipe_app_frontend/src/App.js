import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { theme, logoText } from "./theme";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RecipeList from "./screens/RecipeList";
import RecipeDetail from "./screens/RecipeDetail";
import RecipeForm from "./screens/RecipeForm";
import AuthScreen from "./screens/AuthScreen";
import Favorites from "./screens/Favorites";
import Modal from "./components/Modal";

/** PUBLIC_INTERFACE
 * Main App component. Defines structure/layout and routes.
 */
function App() {
  // Modal state used for add/edit recipe
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Example open modal function
  function openModal(content) {
    setModalContent(content);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setModalContent(null);
  }

  return (
    <Router>
      <div
        style={{
          background: "var(--background)",
          minHeight: "100vh",
          color: "var(--text-color)",
        }}
      >
        <Navbar logo={logoText} />
        <div style={{ display: "flex", paddingTop: 64 }}>
          <Sidebar />
          <main
            style={{
              flex: 1,
              padding: "32px 24px",
              maxWidth: "1020px",
              margin: "0 auto",
              minHeight: "calc(100vh - 64px)",
              background: "var(--background)",
              boxSizing: "border-box",
            }}
          >
            <Routes>
              <Route path="/" element={<RecipeList openModal={openModal} />} />
              <Route path="/recipe/:id" element={<RecipeDetail openModal={openModal} />} />
              <Route path="/new" element={<RecipeForm mode="create" closeModal={closeModal} />} />
              <Route path="/edit/:id" element={<RecipeForm mode="edit" closeModal={closeModal} />} />
              <Route path="/login" element={<AuthScreen mode="login" />} />
              <Route path="/register" element={<AuthScreen mode="register" />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          {/* Modal for Add/Edit forms */}
          <Modal open={modalOpen} onClose={closeModal}>
            {modalContent}
          </Modal>
        </div>
      </div>
    </Router>
  );
}

export default App;