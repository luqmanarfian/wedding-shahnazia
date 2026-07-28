import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OpeningQuote from "./OpeningQuote";

describe("OpeningQuote Component", () => {
  it("renders quranic quote text and surah name", () => {
    render(<OpeningQuote />);

    expect(screen.getByText(/Ar-Rum : 21/i)).toBeInTheDocument();
    expect(screen.getByText(/Dan di antara tanda-tanda/i)).toBeInTheDocument();
  });
});
