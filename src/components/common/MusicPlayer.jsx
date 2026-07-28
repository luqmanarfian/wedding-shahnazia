// src/components/common/MusicPlayer.jsx
import React from "react";

export default function MusicPlayer({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle Background Music"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[1000] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-ivory border-2 border-antGold shadow-xl flex items-center justify-center text-espresso transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer"
    >
      <i
        className={`fa-solid fa-music text-base sm:text-lg text-sepia ${
          isPlaying ? "rotate-music" : ""
        }`}
      ></i>
    </button>
  );
}
