// src/components/sections/HeroSection.jsx
import React, { useRef, useEffect, useState } from "react";
import placeholderPortrait from "../../assets/images/placeholder-portrait.svg";
import bgCardPortrait from "../../assets/images/bg-card-potrait.webp";
import { weddingData } from "../../constants/weddingData";

export default function HeroSection({ couple, date, heroBgVideo }) {
  const videoRef = useRef(null);
  const calendarRef = useRef(null);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const videoSrc = heroBgVideo || weddingData.assets.heroBgVideo;

  const groomName = couple?.groom?.shortName || "Damarjati";
  const brideName = couple?.bride?.shortName || "Shahnazia";
  const photoUrl = couple?.couple?.photo || couple?.groom?.photo;
  const formattedDay = date?.formattedDay || "Sabtu";
  const formattedDate = date?.formattedDate || "5 September 2026";
  const venueLocation = "Royal Hotel Bogor, Jawa Barat";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Hero background video autoplay fallback:", err);
      });
    }
  }, []);

  // Close calendar dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendarMenu(false);
      }
    };

    if (showCalendarMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showCalendarMenu]);

  // Calendar Event Metadata
  const eventDetails = {
    title: `Wedding Celebration of ${groomName} & ${brideName}`,
    location: venueLocation,
    description: "Doa & kehadiran Anda merupakan kebahagiaan bagi kami.",
    startIso: "20260905T040000Z", // 5 Sept 2026 11:00 WIB (04:00 UTC)
    endIso: "20260905T100000Z"
  };

  // 1. Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventDetails.title
  )}&dates=${eventDetails.startIso}/${eventDetails.endIso}&details=${encodeURIComponent(
    eventDetails.description
  )}&location=${encodeURIComponent(eventDetails.location)}`;

  // 2. Outlook Calendar URL
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(
    eventDetails.title
  )}&startdt=2026-09-05T04:00:00Z&enddt=2026-09-05T10:00:00Z&location=${encodeURIComponent(
    eventDetails.location
  )}&body=${encodeURIComponent(eventDetails.description)}`;

  // 3. Apple / Device (.ics) File Trigger
  const handleIcsDownload = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//WeddingInvitation//ID",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${eventDetails.title}`,
      `LOCATION:${eventDetails.location}`,
      `DESCRIPTION:${eventDetails.description}`,
      `DTSTART:${eventDetails.startIso}`,
      `DTEND:${eventDetails.endIso}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Wedding-${groomName}-${brideName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarMenu(false);
  };

  return (
    <section
      id="hero"
      className="reveal active text-center min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center py-8 px-4 sm:p-6 shadow-none"
    >
      {/* Live Background Video */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      )}

      {/* Backdrop Overlay */}
      <div className="absolute inset-0 bg-espresso/35 backdrop-blur-[1px] z-0 pointer-events-none"></div>

      {/* Luxury-Organic Hero Card with bg-card-potrait.webp */}
      <div className="w-full max-w-md mx-auto relative z-10 shadow-2xl my-auto text-center border-2 border-antGold/40 rounded-2xl overflow-hidden p-6 sm:p-8 vintage-border-thin">
        {/* Layer 1: Background Image bg-card-potrait.webp */}
        <img
          src={bgCardPortrait}
          alt="Hero Card Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Light Tint Overlay for Optimal Contrast */}
        <div className="absolute inset-0 bg-ivory/20 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10">
          {/* Arch Frame Photo */}
          <div className="w-52 h-72 sm:w-60 sm:h-84 mx-auto arch-frame mb-5 sm:mb-6 bg-softCream shadow-inner border-2 border-antGold/60">
            <img
              src={photoUrl}
              alt={`${groomName} & ${brideName}`}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.src = placeholderPortrait;
              }}
            />
          </div>

          {/* Subtitle & Couple Name */}
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-sepia mb-2 font-medium">
            THE WEDDING CELEBRATION OF
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-wide text-espresso italic mb-3 drop-shadow-sm">
            {groomName} & {brideName}
          </h1>

          {/* Leaf Divider Ornament */}
          <div className="flex items-center justify-center gap-4 my-4">
            <span className="h-[1px] w-12 bg-antGold/50"></span>
            <span className="text-antGold text-lg">❦</span>
            <span className="h-[1px] w-12 bg-antGold/50"></span>
          </div>

          {/* Event Details Hierarchy */}
          <div className="space-y-1 mb-6">
            <p className="font-sans text-xs sm:text-sm tracking-[0.2em] text-sepia uppercase font-semibold">
              {formattedDay}, {formattedDate}
            </p>
            <p className="font-heading text-lg sm:text-xl text-antGold italic font-semibold">
              {venueLocation}
            </p>
          </div>

          {/* Universal Add to Calendar Dropdown Component with Click Outside listener */}
          <div ref={calendarRef} className="relative inline-block text-left w-full max-w-xs">
            <button
              onClick={() => setShowCalendarMenu(!showCalendarMenu)}
              className="w-full font-sans text-xs uppercase tracking-[0.2em] bg-sepia text-ivory px-6 py-3.5 rounded-full border border-antGold hover:bg-espresso transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
            >
              <i className="fa-regular fa-calendar-plus text-sm"></i>
              Simpan ke Kalender
              <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 ${showCalendarMenu ? "rotate-180" : ""}`}></i>
            </button>

            {/* Calendar Options Dropdown */}
            {showCalendarMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-ivory/95 backdrop-blur-md rounded-xl border border-antGold/40 shadow-2xl z-50 p-2 space-y-1 animate-fadeIn">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalendarMenu(false)}
                  className="w-full text-left font-sans text-xs uppercase tracking-wider text-espresso hover:bg-antGold/15 px-4 py-2.5 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <i className="fa-brands fa-google text-antGold"></i>
                  Google Calendar
                </a>
                <button
                  onClick={handleIcsDownload}
                  className="w-full text-left font-sans text-xs uppercase tracking-wider text-espresso hover:bg-antGold/15 px-4 py-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <i className="fa-brands fa-apple text-antGold"></i>
                  Apple / Device Calendar (.ics)
                </button>
                <a
                  href={outlookCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalendarMenu(false)}
                  className="w-full text-left font-sans text-xs uppercase tracking-wider text-espresso hover:bg-antGold/15 px-4 py-2.5 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <i className="fa-regular fa-envelope text-antGold"></i>
                  Outlook Calendar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
