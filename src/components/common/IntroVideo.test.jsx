import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import IntroVideo from "./IntroVideo";

describe("IntroVideo Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders video element and skip button", () => {
    render(<IntroVideo videoUrl="/videos/intro.webm" onEnded={vi.fn()} />);

    expect(screen.getByText("Lewati")).toBeInTheDocument();
  });

  it("calls onEnded when skip button is clicked after fade out delay", () => {
    const handleEnded = vi.fn();
    render(<IntroVideo videoUrl="/videos/intro.webm" onEnded={handleEnded} />);

    const skipButton = screen.getByText("Lewati");
    fireEvent.click(skipButton);

    expect(handleEnded).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(handleEnded).toHaveBeenCalledTimes(1);
  });
});
