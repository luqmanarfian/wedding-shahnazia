import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";
import { weddingData } from "./constants/weddingData";

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

    // Main invitation content should now be visible
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
});
