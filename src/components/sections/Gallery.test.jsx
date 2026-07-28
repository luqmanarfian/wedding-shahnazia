import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Gallery from "./Gallery";
import { weddingData } from "../../constants/weddingData";

describe("Gallery Component", () => {
  it("renders gallery title, subtitle and images", () => {
    render(<Gallery gallery={weddingData.gallery} />);

    expect(screen.getByText(weddingData.gallery.title)).toBeInTheDocument();
    expect(screen.getByText(weddingData.gallery.subtitle)).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(weddingData.gallery.images.length);
  });
});
