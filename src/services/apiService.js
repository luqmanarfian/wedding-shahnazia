// src/services/apiService.js
import { weddingData } from "../constants/weddingData";

/**
 * Post JSON data to Google Apps Script Web App
 * @param {Object} payload - Object containing `type` ('rsvp' or 'wishes') and form fields
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitToAppsScript(payload) {
  const apiUrl =
    import.meta.env.VITE_APPS_SCRIPT_URL ||
    weddingData?.api?.appsScriptUrl ||
    "";

  if (!apiUrl) {
    console.warn(
      "Apps Script Web App URL belum dikonfigurasi pada VITE_APPS_SCRIPT_URL."
    );
    // Fallback gracefully so UI still works even if URL is not configured yet
    return {
      success: true,
      message: "Data diproses secara lokal (URL Apps Script belum dikonfigurasi)."
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 seconds timeout

  try {
    // Note: Menggunakan Content-Type: text/plain;charset=utf-8 untuk menghindari CORS preflight OPTIONS request
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: data.success !== false,
      message: data.message || "Data berhasil dikirim."
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Gagal mengirim data ke Apps Script:", error);

    if (error.name === "AbortError") {
      return {
        success: false,
        message: "Pengiriman data timeout. Silakan coba lagi."
      };
    }

    return {
      success: false,
      message: "Gagal terhubung ke server. Silakan coba beberapa saat lagi."
    };
  }
}
