import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import {
  getCurrentUser,
  logout,
} from "../services/authService";

function ProfilePage() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  function handleLogout() {
    logout();

    navigate("/");
  }

  function handleDeleteData() {
    const confirmed = window.confirm(
      "Daten wirklich endgültig löschen?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.clear();

    navigate("/");
  }

  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Profil</h1>
        </div>

        <div className="profile-card">
          <h2>
            Benutzer: {user.username}
          </h2>

          <p>Rolle: {user.role}</p>
        </div>

        <div className="profile-actions">
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Log-out
          </button>

          <button
            className="delete-btn"
            onClick={handleDeleteData}
          >
            Daten löschen
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;