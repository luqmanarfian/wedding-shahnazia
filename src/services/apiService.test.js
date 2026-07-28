import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { submitToAppsScript } from "./apiService";
import { weddingData } from "../constants/weddingData";

describe("apiService - submitToAppsScript", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("handles missing URL gracefully with local fallback", async () => {
    vi.stubEnv("VITE_APPS_SCRIPT_URL", "");
    const originalApiUrl = weddingData.api.appsScriptUrl;
    weddingData.api.appsScriptUrl = "";

    try {
      const result = await submitToAppsScript({ type: "rsvp", name: "Test" });
      expect(result.success).toBe(true);
      expect(result.message).toContain("secara lokal");
    } finally {
      weddingData.api.appsScriptUrl = originalApiUrl;
    }
  });

  it("submits payload successfully when URL is configured and server responds ok", async () => {
    vi.stubEnv("VITE_APPS_SCRIPT_URL", "https://script.google.com/test");

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "Data RSVP berhasil disimpan." })
    });

    const payload = { type: "rsvp", name: "John Doe" };
    const result = await submitToAppsScript(payload);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://script.google.com/test",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      })
    );
    expect(result.success).toBe(true);
    expect(result.message).toBe("Data RSVP berhasil disimpan.");
  });

  it("handles HTTP error status from server", async () => {
    vi.stubEnv("VITE_APPS_SCRIPT_URL", "https://script.google.com/test");

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    const result = await submitToAppsScript({ type: "wishes", sender: "Jane" });
    expect(result.success).toBe(false);
    expect(result.message).toContain("Gagal terhubung ke server");
  });

  it("handles timeout AbortError gracefully", async () => {
    vi.stubEnv("VITE_APPS_SCRIPT_URL", "https://script.google.com/test");

    const abortError = new Error("The operation was aborted");
    abortError.name = "AbortError";

    global.fetch = vi.fn().mockRejectedValue(abortError);

    const result = await submitToAppsScript({ type: "rsvp" });
    expect(result.success).toBe(false);
    expect(result.message).toContain("timeout");
  });

  it("handles network connection error", async () => {
    vi.stubEnv("VITE_APPS_SCRIPT_URL", "https://script.google.com/test");

    global.fetch = vi.fn().mockRejectedValue(new Error("Network Failure"));

    const result = await submitToAppsScript({ type: "rsvp" });
    expect(result.success).toBe(false);
    expect(result.message).toContain("Gagal terhubung ke server");
  });
});
