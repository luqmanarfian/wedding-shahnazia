import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
