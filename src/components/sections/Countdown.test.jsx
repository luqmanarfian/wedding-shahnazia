import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Countdown from "./Countdown";

describe("Countdown Component", () => {
  it("renders countdown labels (Hari, Jam, Menit, Detik)", () => {
    render(
      <Countdown
        targetDate="2026-09-05T11:00:00"
        bgImage="/assets/images/couple-main.jpg"
      />
    );

    expect(screen.getByText("Hari")).toBeInTheDocument();
    expect(screen.getByText("Jam")).toBeInTheDocument();
    expect(screen.getByText("Menit")).toBeInTheDocument();
    expect(screen.getByText("Detik")).toBeInTheDocument();
  });

  it("renders with fallback bgImage when bgImage prop is omitted", () => {
    render(<Countdown targetDate="2026-09-05T11:00:00" />);

    const bgImg = screen.getByAltText("Couple Background");
    expect(bgImg).toBeInTheDocument();
  });
});
