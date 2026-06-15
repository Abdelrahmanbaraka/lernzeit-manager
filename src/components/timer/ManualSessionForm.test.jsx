import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ManualSessionForm from "./ManualSessionForm";
import { STORAGE_KEYS } from "../../utils/storageKeys";

describe("ManualSessionForm", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      `guest_${STORAGE_KEYS.GOALS}`,
      JSON.stringify([{ id: 1, title: "Mathe", dueDate: "2099-01-01" }])
    );
  });

  it("blockiert ungueltige Zeitbereiche", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const onSave = vi.fn();

    render(<ManualSessionForm onSave={onSave} onClose={vi.fn()} />);

    fireEvent.change(screen.getByDisplayValue(/\d{4}-\d{2}-\d{2}/), {
      target: { value: "2099-01-01" },
    });
    fireEvent.change(screen.getAllByDisplayValue("")[0], {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getAllByDisplayValue("")[0], {
      target: { value: "09:00" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Mathe" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Speichern" }));

    expect(alertSpy).toHaveBeenCalledWith("Ihre eingegebenen Zeiten sind ungültig.");
    expect(onSave).not.toHaveBeenCalled();
  });
});
