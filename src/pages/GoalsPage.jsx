import MainLayout from "../components/layout/MainLayout";

function GoalsPage() {
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Lernziele</h1>

          <button className="primary-btn">
            Ziel erstellen
          </button>
        </div>

        <div className="empty-state">
          <p>Noch keine Lernziele vorhanden.</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default GoalsPage;