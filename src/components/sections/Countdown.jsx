// src/components/sections/Countdown.jsx
import React from "react";
import useCountdown from "../../hooks/useCountdown";
import coupleMainImg from "../../assets/images/couple-main.jpg";

export default function Countdown({ targetDate, bgImage }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  const backgroundPhoto = bgImage || coupleMainImg;

  return (
    <section id="countdown" className="reveal text-center max-w-md mx-auto">
      <div className="relative rounded-2xl overflow-hidden border-2 border-antGold/50 shadow-2xl p-6 sm:p-8 text-ivory vintage-border-thin">
        
        {/* LAYER 1: Background Image */}
        <img
          src={backgroundPhoto}
          alt="Couple Background"
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
        />

        {/* LAYER 2: Semi-Transparent Overlay for Text Contrast & Mood */}
        <div className="absolute inset-0 bg-espresso/65 backdrop-blur-[2px] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/50 to-espresso/70 pointer-events-none"></div>

        {/* LAYER 3: Content Layer */}
        <div className="relative z-10">
          {/* Vintage Ornaments */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-antGold/50"></span>
            <span className="text-antGold text-sm animate-float-gentle inline-block select-none">❦</span>
            <span className="h-[1px] w-8 bg-antGold/50"></span>
          </div>

          <p className="font-sans text-xs tracking-[0.25em] text-antGold uppercase mb-5 font-medium drop-shadow">
            HARI BAHAGIA AKAN SEGERA TIBA
          </p>

          {/* Glassmorphic Timer Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {/* Days Box */}
            <div className="bg-espresso/60 backdrop-blur-md border border-antGold/40 p-2.5 sm:p-3.5 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:border-antGold hover:scale-105">
              <span className="block font-heading text-2xl sm:text-4xl font-bold text-antGold leading-tight drop-shadow-md">
                {days}
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-ivory/90 mt-1">
                Hari
              </span>
            </div>

            {/* Hours Box */}
            <div className="bg-espresso/60 backdrop-blur-md border border-antGold/40 p-2.5 sm:p-3.5 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:border-antGold hover:scale-105">
              <span className="block font-heading text-2xl sm:text-4xl font-bold text-antGold leading-tight drop-shadow-md">
                {hours}
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-ivory/90 mt-1">
                Jam
              </span>
            </div>

            {/* Minutes Box */}
            <div className="bg-espresso/60 backdrop-blur-md border border-antGold/40 p-2.5 sm:p-3.5 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:border-antGold hover:scale-105">
              <span className="block font-heading text-2xl sm:text-4xl font-bold text-antGold leading-tight drop-shadow-md">
                {minutes}
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-ivory/90 mt-1">
                Menit
              </span>
            </div>

            {/* Seconds Box */}
            <div className="bg-espresso/60 backdrop-blur-md border border-antGold/40 p-2.5 sm:p-3.5 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:border-antGold hover:scale-105">
              <span className="block font-heading text-2xl sm:text-4xl font-bold text-antGold leading-tight drop-shadow-md">
                {seconds}
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-ivory/90 mt-1">
                Detik
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
