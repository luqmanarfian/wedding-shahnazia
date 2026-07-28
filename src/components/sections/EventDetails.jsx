// src/components/sections/EventDetails.jsx
import React from "react";
import bgCardSquare from "../../assets/images/bg-card-square.webp";

export default function EventDetails({ events }) {
  const { akad, resepsi } = events;

  return (
    <section id="events" className="reveal space-y-8 max-w-md mx-auto">
      {/* Section Header */}
      <div className="text-center">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-sepia font-medium">
          SCHEDULES & LOCATIONS
        </span>
        <h2 className="font-heading text-4xl font-semibold italic text-espresso mt-1">
          Detail Acara
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="h-[1px] w-10 bg-antGold/50"></span>
          <span className="text-antGold text-sm">❦</span>
          <span className="h-[1px] w-10 bg-antGold/50"></span>
        </div>
      </div>

      {/* 1. AKAD NIKAH CARD */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-antGold/40 shadow-xl text-center p-6 sm:p-8 text-espresso vintage-border-thin">
        {/* Layer 1: Crisp Background Image bg-card-square.webp */}
        <img
          src={bgCardSquare}
          alt="Card Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Light Tint Overlay (High Opacity Visibility for bg-card-square) */}
        <div className="absolute inset-0 bg-ivory/20 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10">
          {/* Premium Icon Badge */}
          <div className="w-14 h-14 rounded-full bg-softCream/90 border-2 border-antGold/70 text-antGold shadow-md flex items-center justify-center text-xl mb-4 mx-auto transition-transform duration-300 hover:scale-105">
            <i className="fa-solid fa-hands-praying"></i>
          </div>

          <h3 className="font-heading text-3xl font-bold italic text-espresso mb-3 drop-shadow-sm">
            {akad.title}
          </h3>

          {/* Date Pill Badge */}
          <div className="inline-block bg-sepia text-ivory border border-antGold/40 font-sans text-xs tracking-[0.2em] font-semibold py-1.5 px-4 rounded-full uppercase mb-5 shadow-sm">
            {akad.dayDate}
          </div>

          {/* Decorative Separator */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-[1px] w-12 bg-antGold/50"></span>
            <span className="text-antGold text-xs">❦</span>
            <span className="h-[1px] w-12 bg-antGold/50"></span>
          </div>

          {/* Event Info Grid / Details */}
          <div className="space-y-3.5 text-sepia text-sm">
            {/* Waktu */}
            <div className="flex items-center justify-center gap-2">
              <i className="fa-regular fa-clock text-antGold text-sm"></i>
              <p className="font-semibold text-espresso">
                Pukul: <span className="font-sans font-medium">{akad.time}</span>
              </p>
            </div>

            {/* Tempat & Alamat */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-location-dot text-antGold text-sm"></i>
                <p className="font-heading text-base font-bold text-espresso">
                  {akad.venue}
                </p>
              </div>
              <p className="font-sans text-xs italic text-sepia font-medium max-w-xs mx-auto leading-relaxed">
                {akad.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RESEPSI CARD */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-antGold/40 shadow-xl text-center p-6 sm:p-8 text-espresso vintage-border-thin">
        {/* Layer 1: Crisp Background Image bg-card-square.webp */}
        <img
          src={bgCardSquare}
          alt="Card Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Light Tint Overlay (High Opacity Visibility for bg-card-square) */}
        <div className="absolute inset-0 bg-ivory/20 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10">
          {/* Premium Icon Badge */}
          <div className="w-14 h-14 rounded-full bg-softCream/90 border-2 border-antGold/70 text-antGold shadow-md flex items-center justify-center text-xl mb-4 mx-auto transition-transform duration-300 hover:scale-105">
            <i className="fa-solid fa-champagne-glasses"></i>
          </div>

          <h3 className="font-heading text-3xl font-bold italic text-espresso mb-3 drop-shadow-sm">
            {resepsi.title}
          </h3>

          {/* Date Pill Badge */}
          <div className="inline-block bg-sepia text-ivory border border-antGold/40 font-sans text-xs tracking-[0.2em] font-semibold py-1.5 px-4 rounded-full uppercase mb-5 shadow-sm">
            {resepsi.dayDate}
          </div>

          {/* Decorative Separator */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-[1px] w-12 bg-antGold/50"></span>
            <span className="text-antGold text-xs">❦</span>
            <span className="h-[1px] w-12 bg-antGold/50"></span>
          </div>

          {/* Event Info Grid / Details */}
          <div className="space-y-3.5 text-sepia text-sm">
            {/* Waktu */}
            <div className="flex items-center justify-center gap-2">
              <i className="fa-regular fa-clock text-antGold text-sm"></i>
              <p className="font-semibold text-espresso">
                Pukul: <span className="font-sans font-medium">{resepsi.time}</span>
              </p>
            </div>

            {/* Tempat & Alamat */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-location-dot text-antGold text-sm"></i>
                <p className="font-heading text-base font-bold text-espresso">
                  {resepsi.venue}
                </p>
              </div>
              <p className="font-sans text-xs italic text-sepia font-medium max-w-xs mx-auto leading-relaxed">
                {resepsi.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
