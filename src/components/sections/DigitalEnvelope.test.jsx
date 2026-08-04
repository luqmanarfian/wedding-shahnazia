import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DigitalEnvelope from "./DigitalEnvelope";
import { weddingData } from "../../constants/weddingData";

describe("DigitalEnvelope Component", () => {
  const giftData = weddingData.gift;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders bank account names, holders, and numbers for both accounts", () => {
    render(<DigitalEnvelope gift={giftData} onCopySuccess={vi.fn()} />);

    expect(screen.getByText("Bank Mandiri")).toBeInTheDocument();
    expect(screen.getByText("Damarjati Wiroprojo")).toBeInTheDocument();
    expect(screen.getByText("1220009935456")).toBeInTheDocument();

    expect(screen.getByText("Bank BCA")).toBeInTheDocument();
    expect(screen.getByText("Shahnazia Triannita Puteri")).toBeInTheDocument();
    expect(screen.getByText("6820850660")).toBeInTheDocument();
  });

  it("copies account number using navigator.clipboard when available", async () => {
    const handleCopySuccess = vi.fn();
    const writeTextMock = vi.fn().mockResolvedValue();

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true
    });

    render(<DigitalEnvelope gift={giftData} onCopySuccess={handleCopySuccess} />);

    const copyButtons = screen.getAllByRole("button", { name: /salin nomor rekening/i });
    fireEvent.click(copyButtons[0]);

    expect(writeTextMock).toHaveBeenCalledWith("1220009935456");
    await vi.waitFor(() => {
      expect(handleCopySuccess).toHaveBeenCalledWith("Nomor Rekening Berhasil Disalin");
    });
  });

  it("handles clipboard writeText rejection error", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const writeTextMock = vi.fn().mockRejectedValue(new Error("Clipboard error"));

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true
    });

    render(<DigitalEnvelope gift={giftData} />);

    const copyButtons = screen.getAllByRole("button", { name: /salin nomor rekening/i });
    fireEvent.click(copyButtons[0]);

    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  it("uses fallback when navigator.clipboard is missing", async () => {
    const handleCopySuccess = vi.fn();

    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true
    });

    render(<DigitalEnvelope gift={giftData} onCopySuccess={handleCopySuccess} />);

    const copyButtons = screen.getAllByRole("button", { name: /salin nomor rekening/i });
    fireEvent.click(copyButtons[1]);

    await vi.waitFor(() => {
      expect(handleCopySuccess).toHaveBeenCalledWith("Nomor Rekening Berhasil Disalin");
    });
  });
});
