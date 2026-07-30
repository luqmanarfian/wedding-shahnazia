import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import IntroVideo from "./IntroVideo";

describe("IntroVideo Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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

    // Double click should be guarded by isFadingOut
    fireEvent.click(skipButton);

    expect(handleEnded).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(handleEnded).toHaveBeenCalledTimes(1);
  });

  it("triggers skip on video ended event and on container scroll", () => {
    const handleEnded = vi.fn();
    const scrollDiv = document.createElement("div");
    scrollDiv.id = "scroll-container";
    document.body.appendChild(scrollDiv);

    const { container } = render(<IntroVideo videoUrl="/videos/intro.webm" onEnded={handleEnded} />);

    const videoEl = container.querySelector("video");
    fireEvent.ended(videoEl);

    // Simulate container scroll
    scrollDiv.scrollTop = 100;
    fireEvent.scroll(scrollDiv);

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(handleEnded).toHaveBeenCalled();
    scrollDiv.remove();
  });
});
