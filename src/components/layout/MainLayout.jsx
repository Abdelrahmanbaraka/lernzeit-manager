import { useEffect } from "react";

import Sidebar from "./Sidebar";

import {
  checkMissedPlannedSessions,
  markPlanNotificationStateValid,
} from "../../services/notificationService";

function MainLayout({ children }) {
  useEffect(() => {
    markPlanNotificationStateValid();

    checkMissedPlannedSessions();

    const intervalId = setInterval(checkMissedPlannedSessions, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">{children}</main>
    </div>
  );
}

export default MainLayout;
