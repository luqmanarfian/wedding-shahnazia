// src/components/sections/GuestWishes.jsx
import React, { useState, useEffect } from "react";
import { submitToAppsScript } from "../../services/apiService";
import bgCardPortrait from "../../assets/images/bg-card-potrait.webp";

const STATIC_WISHES = [
  {
    sender: "Ilham & Devi",
    time: "Beberapa saat yang lalu",
    text: "Selamat menempuh hidup baru Shahnazia dan Damarjati! Semoga selalu dilimpahi keberkahan dan kebahagiaan yang melimpah hingga akhir hayat."
  },
  {
    sender: "Dimas & Sarah",
    time: "1 jam yang lalu",
    text: "Akhirnya hari bahagia yang dinanti-nanti tiba juga! Selamat ya untuk kalian berdua. Doa kami menyertai langkah petualangan baru kalian berdua."
  }
];

export default function GuestWishes({ guestName = "" }) {
  const initialSender = guestName && guestName !== "Tamu Kehormatan" ? guestName : "";
  const [sender, setSender] = useState(initialSender);

  useEffect(() => {
    if (guestName && guestName !== "Tamu Kehormatan") {
      setSender(guestName);
    }
  }, [guestName]);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [wishes, setWishes] = useState(() => {
    return JSON.parse(localStorage.getItem("wedding_wishes")) || [];
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sender.trim() || !text.trim()) return;

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    const newWish = {
      sender: sender.trim(),
      text: text.trim(),
      time: "Baru saja"
    };

    // Send payload to Google Apps Script Web App
    const result = await submitToAppsScript({
      type: "wishes",
      sender: sender.trim(),
      text: text.trim()
    });

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.message);
      console.warn("Gagal mengirim ucapan ke Apps Script:", result.message);
    } else {
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }

    // Update local state and localStorage
    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem("wedding_wishes", JSON.stringify(updatedWishes));

    // Reset inputs
    setSender("");
    setText("");
  };

  return (
    <section id="guestbook" className="reveal max-w-md mx-auto space-y-6">
      <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 text-espresso shadow-xl border-2 border-antGold/40 vintage-border-thin">
        {/* Layer 1: Background Image bg-card-potrait.webp */}
        <img
          src={bgCardPortrait}
          alt="Guest Wishes Card Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Light Tint Overlay */}
        <div className="absolute inset-0 bg-ivory/30 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-sepia">
              Wishes Book
            </span>
            <h2 className="font-heading text-4xl font-semibold italic text-espresso mt-1">
              Kirim Ucapan
            </h2>
            <p className="text-sm text-sepia/80 mt-2">
              “Setiap doa dan harapan dari kalian akan menjadi bagian dari cerita kami💖”
            </p>
            <div className="w-16 h-[1px] bg-antGold mx-auto mt-3"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-sepia mb-2 text-left">
                Nama Pengirim
              </label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ivory border border-antGold/40 text-espresso placeholder-sepia/50 font-sans text-sm focus:outline-none focus:border-sepia transition-all duration-300 disabled:opacity-60"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-sepia mb-2 text-left">
                Ucapan Doa Restu
              </label>
              <textarea
                rows="4"
                required
                disabled={isSubmitting}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ivory border border-antGold/40 text-espresso placeholder-sepia/50 font-sans text-sm focus:outline-none focus:border-sepia transition-all duration-300 disabled:opacity-60"
                placeholder="Tuliskan ucapan selamat dan doa tulus Anda..."
              ></textarea>
            </div>

            {submitError && (
              <div className="p-3 bg-red-100/80 border border-red-300 text-red-800 rounded-lg text-xs font-sans text-left">
                ⚠️ {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="p-3 bg-green-100/80 border border-green-300 text-green-800 rounded-lg text-xs font-sans text-left">
                ✓ Ucapan Anda berhasil terkirim dan tersimpan!
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
                  Mengirim Ucapan...
                </>
              ) : (
                "Kirim Ucapan"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Ucapan List container */}
      <div className="space-y-3">
        <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-sepia text-center mb-4">
          Doa Restu dari Para Sahabat
        </h3>

        {/* Static & Dynamic List */}
        <div id="comments-list" className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {/* User Submitted Wishes */}
          {wishes.map((wish, index) => (
            <div
              key={`user-${index}`}
              className="bg-ivory/90 backdrop-blur-sm p-5 rounded-xl border border-antGold/30 shadow-md relative paper-overlay"
            >
              <div className="flex items-center justify-between border-b border-sepia/15 pb-2 mb-2">
                <h4 className="font-heading text-lg font-bold text-espresso">{wish.sender}</h4>
                <span className="font-sans text-[9px] text-sepia/60">{wish.time}</span>
              </div>
              <p className="text-sm text-sepia italic leading-relaxed text-left">"{wish.text}"</p>
            </div>
          ))}

          {/* Static Template Wishes */}
          {STATIC_WISHES.map((wish, index) => (
            <div
              key={`static-${index}`}
              className="bg-ivory/80 backdrop-blur-sm p-5 rounded-xl border border-antGold/20 shadow-sm relative paper-overlay"
            >
              <div className="flex items-center justify-between border-b border-sepia/10 pb-2 mb-2">
                <h4 className="font-heading text-lg font-bold text-espresso">{wish.sender}</h4>
                <span className="font-sans text-[9px] text-sepia/60">{wish.time}</span>
              </div>
              <p className="text-sm text-sepia italic leading-relaxed text-left">"{wish.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
