// src/components/sections/RSVPForm.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { submitToAppsScript } from "../../services/apiService";
import bgCardPortrait from "../../assets/images/bg-card-potrait.webp";

/**
 * Helper generator untuk membuat QR_Code_ID dengan format WEDDING-{timestamp}-{random4digit}
 */
const generateQrCodeId = () => {
  const timestamp = Date.now();
  const random4Digit = Math.floor(1000 + Math.random() * 9000);
  return `WEDDING-${timestamp}-${random4Digit}`;
};

export default function RSVPForm({ guestName = "" }) {
  const initialName = guestName && guestName !== "Tamu Kehormatan" ? guestName : "";
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (guestName && guestName !== "Tamu Kehormatan") {
      setName(guestName);
    }
  }, [guestName]);
  const [count, setCount] = useState("1");
  const [status, setStatus] = useState("Hadir");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [qrData, setQrData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitError("");

    const isAttending = status === "Hadir";
    // Generate QR_Code_ID unik jika Hadir, atau 'none' jika Tidak Hadir
    const generatedQrCodeId = isAttending ? generateQrCodeId() : "none";

    // Set QR data state untuk modal rendering
    setQrData(isAttending ? generatedQrCodeId : "");

    // Submit payload data ke Google Apps Script Web App
    const result = await submitToAppsScript({
      type: "rsvp",
      name: name.trim(),
      status: status,
      count: isAttending ? count : "0",
      message: message.trim(),
      qrCodeId: generatedQrCodeId
    });

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.message);
      console.warn("Gagal mengirim data RSVP ke Apps Script:", result.message);
    }

    // Display confirmation modal within mobile container
    setShowModal(true);
  };

  const handleDownloadQR = async () => {
    if (!qrData) return;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
      qrData
    )}&color=3F-33-28&bgcolor=FB-F7-EF`;

    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = globalThis.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `QR-Undangan-${name.replace(/\s+/g, "-")}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download QR code:", error);
    }
  };

  // Generate QR URL for display in modal
  const displayQrUrl = qrData
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
        qrData
      )}&color=3f3328&bgcolor=fbf7ef`
    : "";

  return (
    <>
      <section id="rsvp" className="reveal max-w-md mx-auto">
        <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 text-espresso shadow-xl border-2 border-antGold/40 vintage-border-thin">
          {/* Layer 1: Background Image bg-card-potrait.webp */}
          <img
            src={bgCardPortrait}
            alt="RSVP Form Background"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          />

          {/* Layer 2: Light Tint Overlay for Optimal Readability */}
          <div className="absolute inset-0 bg-ivory/30 pointer-events-none"></div>

          {/* Layer 3: Content Layer */}
          <div className="relative z-10">
            <div className="text-center mb-6">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-sepia font-medium">
                RSVP
              </span>
              <h2 className="font-heading text-4xl font-semibold italic text-espresso mt-1">
                Konfirmasi Kehadiran
              </h2>
              <div className="w-16 h-[1px] bg-antGold mx-auto mt-3"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-sepia mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ivory border border-antGold/40 text-espresso placeholder-sepia/50 font-sans text-sm focus:outline-none focus:border-sepia transition-all duration-300 disabled:opacity-60"
                placeholder="Contoh: Budi Susanto"
              />
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-sepia mb-2">
                Jumlah Tamu
              </label>
              <select
                disabled={isSubmitting || status === "Absen"}
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ivory border border-antGold/40 text-espresso font-sans text-sm focus:outline-none focus:border-sepia transition-all duration-300 disabled:opacity-60"
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-sepia mb-2">
                Status Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center py-3 rounded-lg border-2 cursor-pointer select-none font-sans text-xs tracking-wider uppercase transition-all duration-300 hover:border-sepia relative ${
                    status === "Hadir"
                      ? "bg-sepia text-ivory border-antGold"
                      : "bg-ivory text-sepia border-antGold/20"
                  } ${isSubmitting ? "pointer-events-none opacity-60" : ""}`}
                >
                  <input
                    type="radio"
                    name="rsvp-status"
                    value="Hadir"
                    checked={status === "Hadir"}
                    onChange={() => setStatus("Hadir")}
                    className="absolute opacity-0"
                  />
                  <span>Hadir</span>
                </label>
                <label
                  className={`flex items-center justify-center py-3 rounded-lg border-2 cursor-pointer select-none font-sans text-xs tracking-wider uppercase transition-all duration-300 hover:border-sepia relative ${
                    status === "Absen"
                      ? "bg-sepia text-ivory border-antGold"
                      : "bg-ivory text-sepia border-antGold/20"
                  } ${isSubmitting ? "pointer-events-none opacity-60" : ""}`}
                >
                  <input
                    type="radio"
                    name="rsvp-status"
                    value="Absen"
                    checked={status === "Absen"}
                    onChange={() => setStatus("Absen")}
                    className="absolute opacity-0"
                  />
                  <span>Tidak Hadir</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-sepia mb-2">
                Pesan Singkat
              </label>
              <textarea
                rows="3"
                required
                disabled={isSubmitting}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ivory border border-antGold/40 text-espresso placeholder-sepia/50 font-sans text-sm focus:outline-none focus:border-sepia transition-all duration-300 disabled:opacity-60"
                placeholder="Kirim doa restu hangat Anda..."
              ></textarea>
            </div>

            {submitError && (
              <div className="p-3 bg-red-100/80 border border-red-300 text-red-800 rounded-lg text-xs font-sans">
                ⚠️ {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-sans text-xs uppercase tracking-[0.25em] bg-sepia text-ivory py-4 rounded-lg border border-antGold hover:bg-espresso transition-all duration-300 shadow-md transform active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin text-sm"></i>
                  Mengirim Konfirmasi...
                </>
              ) : status === "Hadir" ? (
                "Kirim Konfirmasi & Dapatkan QR"
              ) : (
                "Kirim Konfirmasi Kehadiran"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>

      {/* CONFIRMATION / QR MODAL POPUP (Rendered via React Portal to escape CSS transform containing block) */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 lg:left-[55%] bg-espresso/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <div className="relative rounded-2xl overflow-hidden max-w-sm w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border-2 border-antGold text-center my-auto shadow-2xl vintage-border-thin">
              {/* Layer 1: Background Image bg-card-potrait.webp */}
              <img
                src={bgCardPortrait}
                alt="Ticket Modal Background"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              />
              <div className="absolute inset-0 bg-ivory/35 pointer-events-none"></div>

              <div className="relative z-10">
                {/* Close button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute -top-2 -right-2 text-espresso/70 hover:text-espresso text-xl cursor-pointer"
                  aria-label="Close Ticket Modal"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

              {/* CONDITIONAL RENDERING BASED ON ATTENDANCE STATUS */}
              {status === "Hadir" ? (
                /* ALUR 1: HADIR (Dengan QR Code ID) */
                <>
                  <h3 className="font-heading text-3xl font-bold italic text-espresso mb-1">
                    Tiket Kehadiran
                  </h3>
                  <p className="font-sans text-xs tracking-wide text-sepia mb-4">
                    Silakan simpan QR Code di bawah untuk ditunjukkan pada penerima tamu pernikahan
                  </p>

                  {/* QR Placement */}
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-white border border-antGold/50 rounded-xl shadow-lg w-[206px] h-[206px] flex items-center justify-center">
                      {displayQrUrl && (
                        <img
                          src={displayQrUrl}
                          alt="QR Code Tiket Kehadiran"
                          className="w-[180px] h-[180px]"
                        />
                      )}
                    </div>
                  </div>

                  <p className="font-mono text-[11px] font-bold text-espresso uppercase tracking-wider bg-antGold/15 py-1 px-3 rounded-md mb-3 inline-block border border-antGold/30">
                    {qrData}
                  </p>

                  <p className="font-sans text-xs font-semibold text-espresso uppercase tracking-wider mb-6">
                    {name} - {count} ORANG (Hadir)
                  </p>

                  <button
                    onClick={handleDownloadQR}
                    className="font-sans text-xs uppercase tracking-[0.2em] bg-sepia text-ivory px-6 py-3 rounded-lg border border-antGold hover:bg-espresso transition-all duration-300 inline-flex items-center gap-2 transform active:scale-95 cursor-pointer"
                  >
                    Unduh Gambar QR
                    <i className="fa-solid fa-download"></i>
                  </button>
                </>
              ) : (
                /* ALUR 2: TIDAK HADIR / ABSEN (Tanpa QR Code) */
                <>
                  <div className="text-antGold text-3xl mb-2">❦</div>
                  <h3 className="font-heading text-3xl font-bold italic text-espresso mb-3">
                    Konfirmasi Kehadiran
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-sepia italic leading-relaxed mb-6 px-2">
                    "Terima kasih atas konfirmasi Anda. Kami memahami bahwa Anda belum dapat menghadiri acara kami. Doa dan ucapan terbaik dari Anda sudah menjadi kebahagiaan bagi kami. Semoga kita dapat bertemu di kesempatan yang lain."
                  </p>

                  <p className="font-sans text-xs font-semibold text-espresso uppercase tracking-wider mb-6">
                    {name} - (Tidak Hadir)
                  </p>

                  <button
                    onClick={() => setShowModal(false)}
                    className="font-sans text-xs uppercase tracking-[0.2em] bg-sepia text-ivory px-8 py-3 rounded-lg border border-antGold hover:bg-espresso transition-all duration-300 transform active:scale-95 cursor-pointer"
                  >
                    Tutup
                  </button>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
