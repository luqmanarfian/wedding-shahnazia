import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoveStory from "./LoveStory";
import { weddingData } from "../../constants/weddingData";

describe("LoveStory Component", () => {
  it("renders story title, subtitle, chapter titles and descriptions", () => {
    render(<LoveStory loveStory={weddingData.loveStory} />);

    expect(screen.getByText(weddingData.loveStory.title)).toBeInTheDocument();
    expect(screen.getByText(weddingData.loveStory.subtitle)).toBeInTheDocument();

    weddingData.loveStory.stories.forEach((story) => {
      expect(screen.getByText(story.title)).toBeInTheDocument();
      expect(screen.getByText(story.description)).toBeInTheDocument();
    });
  });

  it("handles fallback to paragraphs if stories array is missing", () => {
    const fallbackData = {
      title: "Cerita Kami",
      subtitle: "Our Story",
      paragraphs: ["Paragraph 1", "Paragraph 2"]
    };

    render(<LoveStory loveStory={fallbackData} />);

    expect(screen.getByText("Cerita Kami")).toBeInTheDocument();
    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
  });
});
