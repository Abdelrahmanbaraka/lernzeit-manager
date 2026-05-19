import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import ManualSessionForm from "../components/timer/ManualSessionForm";

import SessionList from "../components/timer/SessionList";

import {
  getLearningSessions,
  saveLearningSessions,
} from "../services/sessionService";

function LearningTimePage() {
  const [sessions, setSessions] = useState([]);

  const [showManualForm, setShowManualForm] = useState(false);

  useEffect(() => {
    setSessions(getLearningSessions());
  }, []);

  function handleSaveSession(session) {
    const updatedSessions = [...sessions, session];

    setSessions(updatedSessions);

    saveLearningSessions(updatedSessions);
  }

  function handleDeleteSession(id) {
    const confirmed = window.confirm("Lernsession wirklich löschen?");

    if (!confirmed) {
      return;
    }

    const updatedSessions = sessions.filter((session) => session.id !== id);

    setSessions(updatedSessions);

    saveLearningSessions(updatedSessions);
  }

  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Lernzeiten</h1>

          <button className="primary-btn" onClick={() => setShowManualForm(true)}>
            Lernsession nachtragen
          </button>
        </div>

        <SessionList sessions={sessions} onDelete={handleDeleteSession} />

        {showManualForm && (
          <ManualSessionForm
            onSave={handleSaveSession}
            onClose={() => setShowManualForm(false)}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default LearningTimePage;