import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import GoalForm from "./GoalForm";
import { getTodayDateString } from "../../utils/validationUtils";

function getDueDateInput(container) {
  return container.querySelector('input[type="date"]');
}

describe("GoalForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rendert die benoetigten Felder", () => {
    const { container } = render(<GoalForm onSave={vi.fn()} onClose={vi.fn()} />);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Beschreibung")).toBeInTheDocument();
    expect(screen.getByText("Fälligkeitsdatum")).toBeInTheDocument();
    expect(getDueDateInput(container)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Speichern" })).toBeInTheDocument();
  });

  it("setzt das heutige Datum als Mindestwert fuer das Faelligkeitsdatum", () => {
    const { container } = render(<GoalForm onSave={vi.fn()} onClose={vi.fn()} />);

    expect(getDueDateInput(container)).toHaveAttribute(
      "min",
      getTodayDateString()
    );
  });

  it("blockiert ein Faelligkeitsdatum in der Vergangenheit", async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const onSave = vi.fn();

    const { container } = render(<GoalForm onSave={onSave} onClose={vi.fn()} />);

    await user.type(screen.getByPlaceholderText("Name"), "Mathe");
    await user.type(getDueDateInput(container), "2000-01-01");
    await user.click(screen.getByRole("button", { name: "Speichern" }));

    expect(alertSpy).toHaveBeenCalledWith(
      "Das Fälligkeitsdatum darf nicht in der Vergangenheit liegen."
    );
    expect(onSave).not.toHaveBeenCalled();
  });

  it("blockiert doppelte Zielnamen", async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const onSave = vi.fn();

    const { container } = render(
      <GoalForm
        onSave={onSave}
        onClose={vi.fn()}
        existingGoals={[{ id: 1, title: "Mathe", dueDate: "2026-06-20" }]}
      />
    );

    await user.type(screen.getByPlaceholderText("Name"), " mathe ");
    await user.type(getDueDateInput(container), "2099-01-01");
    await user.click(screen.getByRole("button", { name: "Speichern" }));

    expect(alertSpy).toHaveBeenCalledWith(
      "Dieser Zielname wird bereits verwendet. Bitte wähle einen eindeutigen Namen."
    );
    expect(onSave).not.toHaveBeenCalled();
  });

  it("erlaubt heutige und zukuenftige Faelligkeitsdaten", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const onClose = vi.fn();

    const { container } = render(<GoalForm onSave={onSave} onClose={onClose} />);

    await user.type(screen.getByPlaceholderText("Name"), "Deutsch");
    await user.type(getDueDateInput(container), getTodayDateString());
    await user.click(screen.getByRole("button", { name: "Speichern" }));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Deutsch",
        dueDate: getTodayDateString(),
      })
    );
    expect(onClose).toHaveBeenCalled();
  });
});
