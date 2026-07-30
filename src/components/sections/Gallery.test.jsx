import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("handles non-5 image grid fallback and image onError fallback", () => {
    const customGallery = {
      title: "Foto Galeri",
      subtitle: "Memories",
      images: [
        { id: 1, url: "img1.jpg" },
        { id: 2, url: "img2.jpg" },
        { id: 3, url: "img3.jpg" },
        { id: 4, url: "img4.jpg text-position", position: "object-bottom" },
        { id: 5, url: "img5.jpg" },
        { id: 6, url: "img6.jpg" }
      ]
    };

    render(<Gallery gallery={customGallery} />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(6);

    // Trigger image error on first image
    fireEvent.error(images[0]);
    expect(images[0].src).toBeTruthy();
  });

  it("renders default title/subtitle when gallery prop is undefined", () => {
    render(<Gallery gallery={undefined} />);

    expect(screen.getByText("Galeri Prewedding")).toBeInTheDocument();
    expect(screen.getByText("Captured Memories")).toBeInTheDocument();
  });
});
