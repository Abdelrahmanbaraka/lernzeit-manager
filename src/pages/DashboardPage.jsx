import MainLayout from "../components/layout/MainLayout";

function DashboardPage() {
  return (
    <MainLayout>
      <div className="page-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>

          <p>
            Willkommen zurück! Verfolge deine Lernzeiten und Ziele.
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Heutige Lernzeit</h3>

            <p className="card-value">02:15 h</p>
          </div>

          <div className="dashboard-card">
            <h3>Aktive Ziele</h3>

            <p className="card-value">5</p>
          </div>

          <div className="dashboard-card">
            <h3>Geplante Stunden</h3>

            <p className="card-value">32 h</p>
          </div>

          <div className="dashboard-card">
            <h3>Erledigte Ziele</h3>

            <p className="card-value">12</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Schnellzugriff</h2>

          <div className="quick-actions">
            <button>Neue Lernsession</button>

            <button>Neues Ziel</button>

            <button>Planung öffnen</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;