import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RSVPForm from "./RSVPForm";
import * as apiService from "../../services/apiService";

describe("RSVPForm Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders form elements and inputs", () => {
    render(<RSVPForm />);

    expect(screen.getByText("Konfirmasi Kehadiran")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/budi susanto/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/kirim doa restu/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /kirim konfirmasi/i })).toBeInTheDocument();
  });

  it("does not submit if required fields are empty", () => {
    const submitSpy = vi.spyOn(apiService, "submitToAppsScript");
    render(<RSVPForm />);

    fireEvent.click(screen.getByRole("button", { name: /kirim konfirmasi/i }));

    expect(submitSpy).not.toHaveBeenCalled();
  });

  it("submits RSVP successfully for Hadir status and displays confirmation modal with QR code", async () => {
    vi.spyOn(apiService, "submitToAppsScript").mockResolvedValue({
      success: true,
      message: "Data RSVP berhasil disimpan."
    });

    render(<RSVPForm />);

    fireEvent.change(screen.getByPlaceholderText(/budi susanto/i), { target: { value: "Siti Rahma" } });
    fireEvent.change(screen.getByPlaceholderText(/kirim doa restu/i), { target: { value: "InsyaAllah Hadir!" } });

    fireEvent.click(screen.getByRole("button", { name: /kirim konfirmasi/i }));

    await waitFor(() => {
      expect(apiService.submitToAppsScript).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "rsvp",
          name: "Siti Rahma",
          status: "Hadir",
          count: "1",
          message: "InsyaAllah Hadir!",
          qrCodeId: expect.stringMatching(/^WEDDING-\d+-\d{4}$/)
        })
      );
    });

    expect(screen.getByText(/tiketing|tiket kehadiran/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /unduh gambar qr/i })).toBeInTheDocument();
  });

  it("submits RSVP for Absen status with count 0 and qrCodeId none", async () => {
    vi.spyOn(apiService, "submitToAppsScript").mockResolvedValue({
      success: true,
      message: "Data RSVP berhasil disimpan."
    });

    render(<RSVPForm />);

    fireEvent.change(screen.getByPlaceholderText(/budi susanto/i), { target: { value: "Rudi" } });
    fireEvent.change(screen.getByPlaceholderText(/kirim doa restu/i), { target: { value: "Maaf tidak bisa hadir" } });

    const absentRadio = screen.getByText("Tidak Hadir");
    fireEvent.click(absentRadio);

    fireEvent.click(screen.getByRole("button", { name: /kirim konfirmasi/i }));

    await waitFor(() => {
      expect(apiService.submitToAppsScript).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "rsvp",
          name: "Rudi",
          status: "Absen",
          count: "0",
          message: "Maaf tidak bisa hadir",
          qrCodeId: "none"
        })
      );
    });
  });

  it("handles QR Code download when button is clicked in modal", async () => {
    vi.spyOn(apiService, "submitToAppsScript").mockResolvedValue({
      success: true,
      message: "Data RSVP berhasil disimpan."
    });

    const mockBlob = new Blob(["mock-png"], { type: "image/png" });
    global.fetch = vi.fn().mockResolvedValue({
      blob: () => Promise.resolve(mockBlob)
    });

    render(<RSVPForm />);

    fireEvent.change(screen.getByPlaceholderText(/budi susanto/i), { target: { value: "Siti" } });
    fireEvent.change(screen.getByPlaceholderText(/kirim doa restu/i), { target: { value: "Hadir" } });
    fireEvent.click(screen.getByRole("button", { name: /kirim konfirmasi/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /unduh gambar qr/i })).toBeInTheDocument();
    });

    const downloadBtn = screen.getByRole("button", { name: /unduh gambar qr/i });
    fireEvent.click(downloadBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
