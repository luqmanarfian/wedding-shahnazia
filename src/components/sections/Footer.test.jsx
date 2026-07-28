import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { weddingData } from "../../constants/weddingData";

describe("Footer Component", () => {
  it("renders couple short names in footer", () => {
    render(<Footer couple={weddingData.couple} />);

    expect(screen.getByText(/terima kasih atas doa dan restunya/i)).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
