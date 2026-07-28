import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoveStory from "./LoveStory";
import { weddingData } from "../../constants/weddingData";

describe("LoveStory Component", () => {
  it("renders story title, subtitle and paragraphs", () => {
    render(<LoveStory loveStory={weddingData.loveStory} />);

    expect(screen.getByText(weddingData.loveStory.title)).toBeInTheDocument();
    expect(screen.getByText(weddingData.loveStory.subtitle)).toBeInTheDocument();
    weddingData.loveStory.paragraphs.forEach((p) => {
      expect(screen.getByText(p)).toBeInTheDocument();
    });
  });
});
