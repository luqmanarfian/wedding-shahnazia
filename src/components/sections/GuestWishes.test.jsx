import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GuestWishes from "./GuestWishes";
import * as apiService from "../../services/apiService";

describe("GuestWishes Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders wishes form and static wishes", () => {
    render(<GuestWishes />);

    expect(screen.getByRole("heading", { name: /kirim ucapan/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/masukkan nama anda/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tuliskan ucapan/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /kirim ucapan/i })).toBeInTheDocument();
  });

  it("does not submit if fields are blank", async () => {
    const submitSpy = vi.spyOn(apiService, "submitToAppsScript");
    render(<GuestWishes />);

    const submitBtn = screen.getByRole("button", { name: /kirim ucapan/i });
    fireEvent.click(submitBtn);

    expect(submitSpy).not.toHaveBeenCalled();
  });

  it("submits wish successfully, updates state and saves to localStorage", async () => {
    vi.spyOn(apiService, "submitToAppsScript").mockResolvedValue({
      success: true,
      message: "Data ucapan berhasil disimpan."
    });

    render(<GuestWishes />);

    const nameInput = screen.getByPlaceholderText(/masukkan nama anda/i);
    const textInput = screen.getByPlaceholderText(/tuliskan ucapan/i);

    fireEvent.change(nameInput, { target: { value: "Ahmad" } });
    fireEvent.change(textInput, { target: { value: "Selamat ya!" } });

    const submitBtn = screen.getByRole("button", { name: /kirim ucapan/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(apiService.submitToAppsScript).toHaveBeenCalledWith({
        type: "wishes",
        sender: "Ahmad",
        text: "Selamat ya!"
      });
    });

    expect(screen.getByText(/selamat ya!/i)).toBeInTheDocument();
    expect(screen.getByText("Ahmad")).toBeInTheDocument();
    expect(localStorage.getItem("wedding_wishes")).toContain("Ahmad");
  });

  it("displays error message if submission fails", async () => {
    vi.spyOn(apiService, "submitToAppsScript").mockResolvedValue({
      success: false,
      message: "Server Error"
    });

    render(<GuestWishes />);

    fireEvent.change(screen.getByPlaceholderText(/masukkan nama anda/i), { target: { value: "Budi" } });
    fireEvent.change(screen.getByPlaceholderText(/tuliskan ucapan/i), { target: { value: "Gagal kirim" } });

    fireEvent.click(screen.getByRole("button", { name: /kirim ucapan/i }));

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });
});
