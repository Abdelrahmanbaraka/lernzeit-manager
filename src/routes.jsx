import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";

import GoalsPage from "./pages/GoalsPage";

import PlanningPage from "./pages/PlanningPage";

import LearningTimePage from "./pages/LearningTimePage";

import ProgressPage from "./pages/ProgressPage";

import ProfilePage from "./pages/ProfilePage";

import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",

    element: <LoginPage />,
  },

  {
    path: "/dashboard",

    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/goals",

    element: (
      <ProtectedRoute>
        <GoalsPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/planning",

    element: (
      <ProtectedRoute>
        <PlanningPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/learning-time",

    element: (
      <ProtectedRoute>
        <LearningTimePage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/progress",

    element: (
      <ProtectedRoute>
        <ProgressPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/profile",

    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },

  {
    path: "*",

    element: <NotFoundPage />,
  },
]);

export default router;