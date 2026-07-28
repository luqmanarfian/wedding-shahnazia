import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventDetails from "./EventDetails";
import { weddingData } from "../../constants/weddingData";

describe("EventDetails Component", () => {
  it("renders Akad and Resepsi titles, dates, time and venues", () => {
    render(<EventDetails events={weddingData.events} />);

    expect(screen.getByText(weddingData.events.akad.title)).toBeInTheDocument();
    expect(screen.getByText(weddingData.events.resepsi.title)).toBeInTheDocument();
    expect(screen.getAllByText(weddingData.events.akad.venue)[0]).toBeInTheDocument();
  });
});
