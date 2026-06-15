import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import DashboardPage from "./DashboardPage";
import { STORAGE_KEYS } from "../utils/storageKeys";

describe("DashboardPage", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      STORAGE_KEYS.CURRENT_USER,
      JSON.stringify({ username: "student", role: "student" })
    );
  });

  it("rendert Dashboard-Inhalte ohne Geplante-Stunden-Counter", () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Willkommen, Student" })).toBeInTheDocument();
    expect(screen.getByText("Heutige Lernzeit")).toBeInTheDocument();
    expect(screen.getByText("Aktive Ziele")).toBeInTheDocument();
    expect(screen.getByText("Erledigte Ziele")).toBeInTheDocument();
    expect(screen.queryByText("Geplante Stunden")).not.toBeInTheDocument();
  });
});
