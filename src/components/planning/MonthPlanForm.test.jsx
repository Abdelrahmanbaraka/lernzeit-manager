import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MonthPlanForm from "./MonthPlanForm";

describe("MonthPlanForm", () => {
  it("speichert mehr als 10 Ziele in einem Monatsplan", () => {
    const goals = Array.from({ length: 11 }, (_, index) => ({
      id: `goal-${index + 1}`,
      title: `Ziel ${index + 1}`,
    }));
    const onSave = vi.fn();

    render(
      <MonthPlanForm
        goals={goals}
        currentMonth={new Date("2026-06-15")}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );

    goals.forEach((goal) => {
      fireEvent.click(screen.getByLabelText(goal.title));
    });

    screen.getAllByPlaceholderText("Stunden").forEach((input) => {
      fireEvent.change(input, { target: { value: "2" } });
    });

    fireEvent.click(screen.getByRole("button", { name: "Speichern" }));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        goals: expect.arrayContaining([
          expect.objectContaining({ title: "Ziel 1", plannedHours: 2 }),
          expect.objectContaining({ title: "Ziel 11", plannedHours: 2 }),
        ]),
        hours: 22,
      })
    );
    expect(onSave.mock.calls[0][0].goals).toHaveLength(11);
  });
});
