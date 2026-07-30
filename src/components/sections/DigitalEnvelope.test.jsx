import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DigitalEnvelope from "./DigitalEnvelope";
import { weddingData } from "../../constants/weddingData";

describe("DigitalEnvelope Component", () => {
  const giftData = weddingData.gift;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders bank account name, holder, and number", () => {
    render(<DigitalEnvelope gift={giftData} onCopySuccess={vi.fn()} />);

    expect(screen.getByText(giftData.bankName)).toBeInTheDocument();
    expect(screen.getByText(giftData.accountHolder)).toBeInTheDocument();
    expect(screen.getByText(giftData.accountNumber)).toBeInTheDocument();
  });

  it("copies account number using navigator.clipboard when available", async () => {
    const handleCopySuccess = vi.fn();
    const writeTextMock = vi.fn().mockResolvedValue();

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true
    });

    render(<DigitalEnvelope gift={giftData} onCopySuccess={handleCopySuccess} />);

    const copyButton = screen.getByRole("button", { name: /salin nomor rekening/i });
    fireEvent.click(copyButton);

    expect(writeTextMock).toHaveBeenCalledWith(giftData.accountNumber);
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

    const copyButton = screen.getByRole("button", { name: /salin nomor rekening/i });
    fireEvent.click(copyButton);

    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  it("uses execCommand fallback when navigator.clipboard is missing and handles error", () => {
    const handleCopySuccess = vi.fn();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true
    });

    document.execCommand = vi.fn().mockImplementation(() => {
      throw new Error("ExecCommand failed");
    });

    render(<DigitalEnvelope gift={giftData} onCopySuccess={handleCopySuccess} />);

    const copyButton = screen.getByRole("button", { name: /salin nomor rekening/i });
    fireEvent.click(copyButton);

    expect(document.execCommand).toHaveBeenCalledWith("copy");
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
