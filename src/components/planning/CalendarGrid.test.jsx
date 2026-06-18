import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import CalendarGrid from "./CalendarGrid";

describe("CalendarGrid", () => {
  it("zeigt mehrere Tagesplanungen mit Aktionen und langen Zielnamen", () => {
    const plans = [
      {
        id: "plan-1",
        date: "2026-06-18",
        startTime: "09:00",
        endTime: "10:00",
        goal: "Kurzer Zielname",
      },
      {
        id: "plan-2",
        date: "2026-06-18",
        startTime: "10:30",
        endTime: "12:00",
        goal: "Sehr langer Zielname fuer eine Tagesplanung mit vielen Details",
      },
    ];
    const onEditPlan = vi.fn();
    const onDeletePlan = vi.fn();

    render(
      <CalendarGrid
        currentMonth={new Date("2026-06-01")}
        dailyPlans={plans}
        onDayClick={vi.fn()}
        onDeletePlan={onDeletePlan}
        onEditPlan={onEditPlan}
      />
    );

    expect(screen.getByText("Kurzer Zielname")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Sehr langer Zielname fuer eine Tagesplanung mit vielen Details"
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Bearbeiten" })[1]);
    fireEvent.click(screen.getAllByRole("button", { name: "×" })[1]);

    expect(onEditPlan).toHaveBeenCalledWith(plans[1]);
    expect(onDeletePlan).toHaveBeenCalledWith("plan-2");
  });
});
