import { formatMinutesToHHMM } from "../../utils/timerUtils";

function SessionList({ sessions, onDelete }) {
  if (sessions.length === 0) {
    return (
      <div className="empty-state">
        <p>Noch keine Lernzeiten vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="sessions-list">
      {sessions.map((session) => (
        <div key={session.id} className="session-item">
          <div>
            <h3>
              {session.emoji} {session.goal}
            </h3>

            <p>Datum: {session.date}</p>

            {session.startTime && session.endTime && (
              <small>
                {session.startTime} - {session.endTime}
              </small>
            )}
          </div>

          <div className="session-right">
            <strong>{formatMinutesToHHMM(session.durationMinutes)} h</strong>

            <button className="session-delete-btn" onClick={() => onDelete(session.id)}>
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SessionList;
