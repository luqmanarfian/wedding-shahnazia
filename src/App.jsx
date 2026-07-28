// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { weddingData } from "./constants/weddingData";
import OpeningCover from "./components/sections/OpeningCover";
import HeroSection from "./components/sections/HeroSection";
import OpeningQuote from "./components/sections/OpeningQuote";
import CoupleSection from "./components/sections/CoupleSection";
import Countdown from "./components/sections/Countdown";
import EventDetails from "./components/sections/EventDetails";
import MapSection from "./components/sections/MapSection";
import LoveStory from "./components/sections/LoveStory";
import Gallery from "./components/sections/Gallery";
import RSVPForm from "./components/sections/RSVPForm";
import DigitalEnvelope from "./components/sections/DigitalEnvelope";
import GuestWishes from "./components/sections/GuestWishes";
import MusicPlayer from "./components/common/MusicPlayer";
import IntroVideo from "./components/common/IntroVideo";
import Footer from "./components/sections/Footer";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState("Tamu Kehormatan");
  
  const audioRef = useRef(null);

  // Parse guest name from URL ?to=Name
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(to);
    }
  }, []);

  // Control body scrolling based on cover status
  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    if (!isOpen) {
      document.body.classList.add("overflow-hidden");
      if (scrollContainer) scrollContainer.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      if (scrollContainer) scrollContainer.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  // Scroll Reveal Observer
  useEffect(() => {
    if (isOpen) {
      // Small timeout to ensure elements are rendered in DOM before observing
      const timer = setTimeout(() => {
        const scrollContainer = document.getElementById("scroll-container");
        const reveals = document.querySelectorAll(".reveal");
        
        const observerOptions = {
          root: scrollContainer,
          rootMargin: "0px",
          threshold: 0.12,
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        }, observerOptions);

        reveals.forEach((reveal) => {
          observer.observe(reveal);
        });

        return () => {
          observer.disconnect();
        };
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle invitation opening and start intro video
  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsIntroActive(true);
    setIsPlaying(true);

    // Play background music
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Audio playback failed or requires user interaction first:", err);
      });
    }
  };

  // Callback when intro video finishes playing
  const handleIntroEnded = () => {
    setIsIntroActive(false);
  };

  // Toggle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((err) => console.log(err));
        setIsPlaying(true);
      }
    }
  };

  // Trigger Toast Notification
  const triggerToast = (text) => {
    const toast = document.getElementById("toast-notif");
    const toastText = document.getElementById("toast-text");
    if (toast && toastText) {
      toastText.innerText = text;
      toast.classList.remove("opacity-0");
      toast.classList.add("opacity-100");
      setTimeout(() => {
        toast.classList.remove("opacity-100");
        toast.classList.add("opacity-0");
      }, 2500);
    }
  };

  return (
    <>
      {/* Toast Notification (Custom alert) */}
      <div
        id="toast-notif"
        className="fixed top-5 left-1/2 lg:left-[77.5%] transform -translate-x-1/2 z-[9999] bg-espresso text-ivory border border-antGold px-4 sm:px-6 py-2.5 sm:py-3 rounded-md shadow-2xl opacity-0 transition-opacity duration-300 pointer-events-none flex items-center gap-3 font-sans text-xs uppercase tracking-widest max-w-[90vw] text-center"
      >
        <span id="toast-text">Tautan Berhasil Disalin</span>
      </div>

      {/* Background Music Audio Element */}
      <audio ref={audioRef} loop>
        <source src={weddingData.assets.bgMusicUrl} type="audio/mp3" />
      </audio>

      {/* Main Layout Wrapper (Desktop Split Screen Layout) */}
      <div className="flex h-screen w-full overflow-hidden relative">
        
        {/* 1. LEFT SIDE PANEL (DESKTOP ONLY COVER ART) */}
        <div
          className="hidden lg:flex lg:w-[55%] h-full relative overflow-hidden bg-cover bg-center items-center justify-center p-12 shadow-2xl"
          style={{ backgroundImage: `url('${weddingData.assets.desktopCoverBg}')` }}
        >
          {/* Vintage Overlay */}
          <div className="absolute inset-0 bg-espresso/45 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-espresso/30"></div>

          {/* Botanical Ornaments */}
          <div className="absolute inset-6 border border-antGold/40 pointer-events-none flex flex-col justify-between p-6">
            <div className="flex justify-between">
              <span className="text-antGold text-xl">❦</span>
              <span className="text-antGold text-xl">❦</span>
            </div>
            <div className="flex justify-between">
              <span className="text-antGold text-xl">❦</span>
              <span className="text-antGold text-xl">❦</span>
            </div>
          </div>

          {/* Content */}
          <div className="relative text-center text-ivory z-10 max-w-lg vintage-border-thin p-10 bg-espresso/60 backdrop-blur-sm rounded-lg">
            <p className="font-sans text-xs tracking-[0.25em] uppercase text-antGold mb-4">
              THE WEDDING CELEBRATION OF
            </p>
            <h1 className="font-heading text-6xl italic font-bold tracking-wide mb-6">
              {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
            </h1>

            <div className="w-24 h-[1px] bg-antGold mx-auto my-6"></div>

            <p className="font-sans text-sm tracking-wider mb-8 text-softCream">
              "Setiap doa dan harapan dari kalian akan menjadi bagian dari cerita kami"
            </p>
            <p className="font-heading text-3xl font-semibold text-antGold italic">
              {weddingData.date.formattedDate}
            </p>
            <p className="font-sans text-xs tracking-widest text-sage mt-2">
              {weddingData.date.locationCity}
            </p>
          </div>
        </div>

        {/* 2. RIGHT SIDE PANEL (MOBILE WEDDING INVITATION CONTAINER) */}
        <div
          id="scroll-container"
          className="w-full lg:w-[45%] h-full overflow-y-auto overflow-x-hidden bg-softCream relative paper-overlay"
        >
          {/* FLOATING MUSIC BUTTON (Shown after cover is opened) */}
          {isOpen && (
            <MusicPlayer isPlaying={isPlaying} onToggle={toggleAudio} />
          )}

          {/* Mobile Container Scoped Video Intro Overlay */}
          {isIntroActive && (
            <IntroVideo
              videoUrl={weddingData.assets.introVideo}
              onEnded={handleIntroEnded}
            />
          )}

          {/* Screen 1: Opening Cover Overlay */}
          <OpeningCover
            guestName={guestName}
            isOpen={isOpen}
            onOpen={handleOpenInvitation}
          />

          {/* Screen 2: Main scrollable content (Only renders/displays if opened or transitions out) */}
          {isOpen && (
            <div
              className="min-h-screen relative bg-cover bg-repeat bg-center"
              style={{ backgroundImage: `url('${weddingData.assets.mainContentBg}')` }}
            >
              {/* Warm Sepia Backdrop Overlay */}
              <div className="absolute inset-0 bg-ivory/85 mix-blend-color-burn pointer-events-none"></div>
              <div className="absolute inset-0 bg-[#f4ede3e6] pointer-events-none"></div>

              {/* SECTION 1: HERO / INTRO (Edge-to-Edge 100% Mobile Viewport) */}
              <HeroSection
                couple={weddingData.couple}
                date={weddingData.date}
                heroBgVideo={weddingData.assets.heroBgVideo}
              />

              {/* SUBSEQUENT SECTIONS WITH PADDING */}
              <div className="relative z-10 py-10 px-4 md:px-6 space-y-16">
                {/* SECTION 2: OPENING QUOTE */}
                <OpeningQuote />

                {/* SECTION 3: KEDUA MEMPELAI */}
                <CoupleSection couple={weddingData.couple} />

                {/* SECTION 4: COUNTDOWN TIMER */}
                <Countdown
                  targetDate={weddingData.date.targetIsoString}
                  bgImage={weddingData.couple.couple.photo}
                />

                {/* SECTION 5: DETAIL ACARA */}
                <EventDetails events={weddingData.events} />

                {/* SECTION 6: MAPS & DIRECTION */}
                <MapSection maps={weddingData.maps} />

                {/* SECTION 7: LOVE STORY */}
                <LoveStory loveStory={weddingData.loveStory} />

                {/* SECTION 8: PHOTO GALLERY */}
                <Gallery gallery={weddingData.gallery} />

                {/* SECTION 9: RSVP FORM */}
                <RSVPForm />

                {/* SECTION 10: AMPLOP DIGITAL */}
                <DigitalEnvelope gift={weddingData.gift} onCopySuccess={triggerToast} />

                {/* SECTION 11: UCAPAN TAMU (GUESTBOOK) */}
                <GuestWishes />

                {/* FOOTER */}
                <Footer couple={weddingData.couple} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
