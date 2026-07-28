import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MapSection from "./MapSection";
import { weddingData } from "../../constants/weddingData";

describe("MapSection Component", () => {
  it("renders directions button link and google maps title", () => {
    render(<MapSection maps={weddingData.maps} />);

    const link = screen.getByRole("link", { name: /petunjuk arah google maps/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", weddingData.maps.directionsUrl);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
