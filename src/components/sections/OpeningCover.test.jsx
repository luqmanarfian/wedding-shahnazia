import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import OpeningCover from "./OpeningCover";

describe("OpeningCover Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders guest name and open button when closed", () => {
    render(<OpeningCover guestName="Budi & Keluarga" isOpen={false} onOpen={vi.fn()} />);

    expect(screen.getByText("Budi & Keluarga")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buka undangan/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /damarjati & shahnazia/i })).toBeInTheDocument();
  });

  it("triggers onOpen callback when Buka Undangan button is clicked", () => {
    const handleOpen = vi.fn();
    render(<OpeningCover guestName="Tamu Kehormatan" isOpen={false} onOpen={handleOpen} />);

    const openButton = screen.getByRole("button", { name: /buka undangan/i });
    fireEvent.click(openButton);

    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it("fades out and unmounts after isOpen becomes true", () => {
    const { rerender, container } = render(
      <OpeningCover guestName="Tamu Kehormatan" isOpen={false} onOpen={vi.fn()} />
    );

    expect(container.firstChild).toBeInTheDocument();

    rerender(<OpeningCover guestName="Tamu Kehormatan" isOpen={true} onOpen={vi.fn()} />);

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(container.firstChild).toBeNull();
  });
});
