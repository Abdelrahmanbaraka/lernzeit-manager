import MainLayout from "../components/layout/MainLayout";

function ProfilePage() {
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Profil</h1>
        </div>

        <div className="profile-actions">
          <button className="logout-btn">
            Log-out
          </button>

          <button className="delete-btn">
            Daten löschen
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;