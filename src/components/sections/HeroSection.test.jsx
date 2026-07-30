import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("handles calendar dropdown toggle and link clicks", () => {
    render(
      <HeroSection
        couple={weddingData.couple}
        date={weddingData.date}
        heroBgVideo={weddingData.assets.heroBgVideo}
      />
    );

    const calendarBtn = screen.getByRole("button", { name: /simpan ke kalender/i });
    expect(screen.queryByText(/google calendar/i)).not.toBeInTheDocument();

    // Toggle open
    fireEvent.click(calendarBtn);
    expect(screen.getByText(/google calendar/i)).toBeInTheDocument();

    // Click Google link
    const googleLink = screen.getByText(/google calendar/i);
    expect(googleLink.getAttribute("href")).toContain("calendar.google.com");
    fireEvent.click(googleLink);
    expect(screen.queryByText(/google calendar/i)).not.toBeInTheDocument();

    // Reopen and click Outlook link
    fireEvent.click(calendarBtn);
    const outlookLink = screen.getByText(/outlook calendar/i);
    expect(outlookLink.getAttribute("href")).toContain("outlook.live.com");
    fireEvent.click(outlookLink);
  });

  it("triggers .ics file download when Apple / Device Calendar option is clicked", () => {
    const createObjectURLMock = vi.fn(() => "blob:http://localhost/mock-ics");
    window.URL.createObjectURL = createObjectURLMock;

    render(
      <HeroSection
        couple={weddingData.couple}
        date={weddingData.date}
      />
    );

    const calendarBtn = screen.getByRole("button", { name: /simpan ke kalender/i });
    fireEvent.click(calendarBtn);

    const icsBtn = screen.getByText(/apple \/ device calendar/i);
    fireEvent.click(icsBtn);

    expect(createObjectURLMock).toHaveBeenCalled();
  });

  it("closes calendar menu when clicking outside component", () => {
    render(
      <div>
        <div data-testid="outside-el">Outside</div>
        <HeroSection couple={weddingData.couple} date={weddingData.date} />
      </div>
    );

    const calendarBtn = screen.getByRole("button", { name: /simpan ke kalender/i });
    fireEvent.click(calendarBtn);
    expect(screen.getByText(/google calendar/i)).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside-el"));
    expect(screen.queryByText(/google calendar/i)).not.toBeInTheDocument();
  });

  it("handles photo onError fallback and missing props gracefully", () => {
    render(<HeroSection couple={{}} date={{}} heroBgVideo="" />);

    expect(screen.getByText(/damarjati & shahnazia/i)).toBeInTheDocument();

    const heroImg = screen.getByAltText(/damarjati & shahnazia/i);
    fireEvent.error(heroImg);
    expect(heroImg.src).toBeTruthy();
  });
});
