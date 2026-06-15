import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Stopwatch from "./Stopwatch";

describe("Stopwatch", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("verhindert Start ohne ausgewaehltes Ziel", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Stopwatch />);

    fireEvent.click(screen.getByRole("button", { name: "Start" }));

    expect(alertSpy).toHaveBeenCalledWith("Bitte zuerst ein Ziel auswählen.");
  });
});
