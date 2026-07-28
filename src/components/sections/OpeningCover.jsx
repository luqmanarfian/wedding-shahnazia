// src/components/sections/OpeningCover.jsx
import React, { useState, useEffect } from "react";
import { weddingData } from "../../constants/weddingData";
import placeholderPortrait from "../../assets/images/placeholder-portrait.svg";

export default function OpeningCover({ guestName, isOpen, onOpen }) {
  const [isRendered, setIsRendered] = useState(true);

  // Unmount cover component 1 second after opening to match vanilla transition
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center p-6 bg-cover bg-center transition-all duration-1000 ease-in-out ${
        isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundImage: `url('${weddingData.assets.mobileCoverBg}')` }}
    >
      {/* Cover Color Filter */}
      <div className="absolute inset-0 bg-espresso/50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-espresso/90 pulsing-overlay"></div>

      {/* Arch Vintage Card */}
      <div className="relative w-full max-w-sm arch-frame bg-ivory/90 backdrop-blur-md px-6 py-6 sm:py-10 text-center flex flex-col justify-between items-center min-h-[75vh] max-h-[90vh] my-auto overflow-y-auto border-antGold/60">
        
        {/* Decorative Top Corner */}
        <div className="text-antGold text-lg tracking-widest shrink-0">
          <span className="block text-2xl">❦</span>
          <div className="w-16 h-[1px] bg-antGold/50 mx-auto mt-2"></div>
        </div>

        {/* Main Bride details */}
        <div className="my-auto flex flex-col items-center py-2">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-sepia">Walimatul 'Ursy</span>

          {/* Couple Photo inside small frame in cover */}
          <div className="my-3 sm:my-5 w-32 h-48 sm:w-40 sm:h-56 shrink-0 arch-frame border-2 border-antGold/70 shadow-lg relative bg-softCream">
            <img
              src={weddingData.couple.couple.photo}
              alt={`${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = placeholderPortrait;
              }}
            />
          </div>

          <span className="font-sans text-xs tracking-widest text-sepia/75 mb-1">THE WEDDING OF</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold italic tracking-wide text-espresso">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h2>
          <div className="w-20 h-[1px] bg-antGold my-3"></div>
          <p className="font-sans text-xs uppercase tracking-widest text-sepia">
            {weddingData.date.formattedDay}, {weddingData.date.formattedDate}
          </p>
        </div>

        {/* Open Button */}
        <div className="w-full shrink-0 pt-2">
          <p className="font-sans text-[10px] tracking-widest text-sepia/80 mb-2 uppercase">
            Kepada Bapak/Ibu/Saudara/i :
          </p>
          <h4 className="font-heading text-xl sm:text-2xl font-semibold text-espresso mb-4 sm:mb-6 italic">
            {guestName}
          </h4>

          <button
            onClick={onOpen}
            className="font-sans text-xs uppercase tracking-[0.25em] bg-sepia text-ivory px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-antGold hover:bg-espresso transition-all duration-300 shadow-lg inline-flex items-center gap-2 group transform active:scale-95 cursor-pointer"
          >
            Buka Undangan
            <i className="fa-solid fa-envelope-open text-[10px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
