import MainLayout from "../components/layout/MainLayout";

function ProgressPage() {
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Fortschritt</h1>
        </div>

        <div className="progress-placeholder">
          <p>Diagramme und Fortschritte werden hier angezeigt.</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProgressPage;