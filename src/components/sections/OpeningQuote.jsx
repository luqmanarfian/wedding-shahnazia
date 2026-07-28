// src/components/sections/OpeningQuote.jsx
import React from "react";
import bgCardLandscapeDark from "../../assets/images/bg-card-landscape-dark.webp";

export default function OpeningQuote() {
  return (
    <section id="quote" className="reveal text-center max-w-md mx-auto">
      <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 text-ivory shadow-xl border-2 border-antGold/40 vintage-border-thin">
        {/* Layer 1: Background Image bg-card-landscape-dark.webp */}
        <img
          src={bgCardLandscapeDark}
          alt="Quote Card Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Soft Dark Tint Overlay for High Contrast & Reading Comfort */}
        <div className="absolute inset-0 bg-espresso/40 pointer-events-none"></div>

        {/* Layer 3: Content */}
        <div className="relative z-10">
          {/* Small corner decorations */}
          <div className="absolute top-0 left-0 text-antGold/50 text-xs select-none">❦</div>
          <div className="absolute bottom-0 right-0 text-antGold/50 text-xs select-none">❦</div>

          <p className="font-heading text-3xl italic text-antGold mb-4 drop-shadow-sm font-semibold">
            "Ar-Rum : 21"
          </p>
          <p className="text-sm sm:text-base leading-relaxed italic text-softCream mb-6 font-medium">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
            untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
            menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu
            benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
          </p>
          <div className="w-12 h-[1px] bg-antGold/70 mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
