import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MusicPlayer from "./MusicPlayer";

describe("MusicPlayer Component", () => {
  it("renders music player button", () => {
    render(<MusicPlayer isPlaying={false} onToggle={vi.fn()} />);

    const button = screen.getByRole("button", { name: /toggle background music/i });
    expect(button).toBeInTheDocument();
  });

  it("applies rotation animation class when playing", () => {
    const { container } = render(<MusicPlayer isPlaying={true} onToggle={vi.fn()} />);

    const icon = container.querySelector("i");
    expect(icon).toHaveClass("rotate-music");
  });

  it("calls onToggle when button is clicked", () => {
    const handleToggle = vi.fn();
    render(<MusicPlayer isPlaying={false} onToggle={handleToggle} />);

    const button = screen.getByRole("button", { name: /toggle background music/i });
    fireEvent.click(button);

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
