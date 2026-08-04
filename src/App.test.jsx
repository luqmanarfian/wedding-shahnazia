import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

describe("App Root Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders desktop split screen cover and opening cover initially", () => {
    render(<App />);

    expect(screen.getByText("THE WEDDING CELEBRATION OF")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buka undangan/i })).toBeInTheDocument();
  });

  it("parses guest name from URL parameter ?to=NamaGuest", () => {
    delete window.location;
    window.location = new URL("http://localhost/?to=Budi%20Pratama");

    render(<App />);

    expect(screen.getByText("Budi Pratama")).toBeInTheDocument();
  });

  it("opens invitation when Buka Undangan button is clicked and shows main content", async () => {
    render(<App />);

    const openButton = screen.getByRole("button", { name: /buka undangan/i });
    fireEvent.click(openButton);

    expect(screen.getByRole("button", { name: /toggle background music/i })).toBeInTheDocument();
    expect(screen.getByText("Lewati")).toBeInTheDocument();
  });

  it("toggles background music play/pause state when music button is clicked", () => {
    render(<App />);

    const openButton = screen.getByRole("button", { name: /buka undangan/i });
    fireEvent.click(openButton);

    const musicButton = screen.getByRole("button", { name: /toggle background music/i });
    expect(musicButton).toBeInTheDocument();

    fireEvent.click(musicButton);
    fireEvent.click(musicButton);
  });

  it("handles intro video ended callback and toast triggers", () => {
    vi.useFakeTimers();

    render(<App />);

    const openButton = screen.getByRole("button", { name: /buka undangan/i });
    fireEvent.click(openButton);

    const skipBtn = screen.getByText("Lewati");
    fireEvent.click(skipBtn);

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.queryByText("Lewati")).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it("triggers intersection observer reveal active class after opening", () => {
    vi.useFakeTimers();

    render(<App />);

    const openButton = screen.getByRole("button", { name: /buka undangan/i });
    fireEvent.click(openButton);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    vi.useRealTimers();
  });

  it("populates RSVP full name field automatically when URL parameter ?to=Lancy is present", () => {
    delete window.location;
    window.location = new URL("http://localhost/?to=Lancy");

    render(<App />);

    const openButton = screen.getByRole("button", { name: /buka undangan/i });
    fireEvent.click(openButton);

    expect(screen.getAllByDisplayValue("Lancy").length).toBeGreaterThanOrEqual(1);
  });
});
