import MainLayout from "../components/layout/MainLayout";

function PlanningPage() {
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Lernplan</h1>
        </div>

        <div className="planning-placeholder">
          <p>Kalender und Planung werden hier angezeigt.</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default PlanningPage;