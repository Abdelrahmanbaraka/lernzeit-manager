import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  it("rendert keine sichtbaren Demo-Zugangsdaten", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Lernzeit-Manager" })).toBeInTheDocument();
    expect(screen.queryByText("student / 1234")).not.toBeInTheDocument();
    expect(screen.queryByText("tutor / 1234")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Accounts")).not.toBeInTheDocument();
  });
});
