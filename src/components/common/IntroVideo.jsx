// src/components/common/IntroVideo.jsx
import React, { useRef, useEffect, useState } from "react";

export default function IntroVideo({ videoUrl, onEnded }) {
  const videoRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleSkip = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    const timer = setTimeout(() => {
      if (onEnded) {
        onEnded();
      }
    }, 500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay fallback
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Intro video autoplay fallback:", err);
      });
    }

    const handleVideoEnd = () => {
      handleSkip();
    };

    // Auto dismiss intro if user starts scrolling the container
    const scrollContainer = document.getElementById("scroll-container");
    const handleScroll = () => {
      if (scrollContainer && scrollContainer.scrollTop > 50) {
        handleSkip();
      }
    };

    video.addEventListener("ended", handleVideoEnd);
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [onEnded]);

  return (
    <div
      className={`absolute inset-0 z-50 bg-espresso flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 z-10 font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/90 bg-espresso/60 hover:bg-espresso/90 border border-antGold/40 px-3.5 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md"
      >
        <span>Lewati</span>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
      </button>

      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        className="w-full h-full object-cover select-none"
      />
    </div>
  );
}
