import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";
import { weddingData } from "../../constants/weddingData";

describe("HeroSection Component", () => {
  it("renders couple names, wedding date and location", () => {
    render(
      <HeroSection
        couple={weddingData.couple}
        date={weddingData.date}
        heroBgVideo={weddingData.assets.heroBgVideo}
      />
    );

    expect(screen.getByRole("heading", { name: /damarjati & shahnazia/i })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(weddingData.date.formattedDate, "i"))).toBeInTheDocument();
  });
});
