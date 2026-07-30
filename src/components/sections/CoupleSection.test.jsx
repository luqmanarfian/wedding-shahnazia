import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CoupleSection from "./CoupleSection";
import { weddingData } from "../../constants/weddingData";

describe("CoupleSection Component", () => {
  it("renders groom and bride full names and parent info", () => {
    render(<CoupleSection couple={weddingData.couple} />);

    expect(screen.getByText(weddingData.couple.groom.name)).toBeInTheDocument();
    expect(screen.getByText(weddingData.couple.bride.name)).toBeInTheDocument();
    expect(screen.getByText(/putra terkasih dari/i)).toBeInTheDocument();
    expect(screen.getByText(/putri terkasih dari/i)).toBeInTheDocument();
  });

  it("handles image error fallbacks for groom and bride photos", () => {
    render(<CoupleSection couple={weddingData.couple} />);

    const groomImg = screen.getByAltText(weddingData.couple.groom.name);
    const brideImg = screen.getByAltText(weddingData.couple.bride.name);

    fireEvent.error(groomImg);
    fireEvent.error(brideImg);

    expect(groomImg.src).toBeTruthy();
    expect(brideImg.src).toBeTruthy();
  });
});
