// src/components/sections/Footer.jsx
import React from "react";

export default function Footer({ couple }) {
  const { groom, bride } = couple;

  return (
    <footer className="reveal pt-10 pb-6 text-center max-w-md mx-auto border-t border-antGold/20">
      <div className="space-y-4">
        <p className="font-heading text-3xl font-semibold italic text-espresso">
           {bride.shortName} & {groom.shortName}
        </p>
        <p className="font-sans text-[10px] tracking-[0.3em] text-sepia uppercase">
          TERIMA KASIH ATAS DOA DAN RESTUNYA
        </p>

        {/* Small footer divider ornament */}
        <div className="flex items-center justify-center gap-2 text-antGold/40 text-xs">
          <span>❦</span>
          <div className="w-20 h-[1px] bg-antGold/20"></div>
          <span>❦</span>
        </div>

        <p className="font-sans text-[9px] text-sepia/50 tracking-wider">
          © 2026 {groom.shortName} & {bride.shortName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
