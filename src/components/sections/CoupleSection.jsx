// src/components/sections/CoupleSection.jsx
import React from "react";
import placeholderAvatar from "../../assets/images/placeholder-avatar.svg";

export default function CoupleSection({ couple }) {
  const { groom, bride } = couple;

  return (
    <section id="mempelai" className="reveal space-y-10 max-w-md mx-auto">
      <div className="text-center">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-sepia">
          Assalamualaikum Wr. Wb.
        </span>
        <h2 className="font-heading text-4xl font-semibold italic text-espresso mt-2">
          Kedua Mempelai
        </h2>
        <p className="text-sm text-sepia max-w-xs mx-auto mt-2 leading-relaxed">
          Dengan memohon rahmat dan rida Allah SWT, kami dengan senang hati mengundang Anda ke
          perayaan pernikahan kami:
        </p>
      </div>

      {/* Mempelai Pria */}
      <div className="bg-softWhite/70 backdrop-blur-sm p-6 rounded-2xl border border-antGold/20 text-center shadow-md">
        {/* Circular frame */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-antGold shadow-lg mb-4 bg-softCream">
          <img
            src={groom.photo}
            alt={groom.name}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.target.src = placeholderAvatar;
            }}
          />
        </div>
        <h3 className="font-heading text-3xl font-bold italic text-espresso">{groom.name}</h3>
        <p className="font-sans text-xs tracking-wider text-antGold uppercase mt-1 mb-3">
          {groom.parentInfo}
        </p>
        <p className="text-sm text-sepia leading-relaxed">
          Putra terkasih dari {groom.parents}
        </p>
      </div>

      {/* Mempelai Wanita */}
      <div className="bg-softWhite/70 backdrop-blur-sm p-6 rounded-2xl border border-antGold/20 text-center shadow-md">
        {/* Circular frame */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-antGold shadow-lg mb-4 bg-softCream">
          <img
            src={bride.photo}
            alt={bride.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src = placeholderAvatar;
            }}
          />
        </div>
        <h3 className="font-heading text-3xl font-bold italic text-espresso">{bride.name}</h3>
        <p className="font-sans text-xs tracking-wider text-antGold uppercase mt-1 mb-3">
          {bride.parentInfo}
        </p>
        <p className="text-sm text-sepia leading-relaxed">
          Putri terkasih dari {bride.parents}
        </p>
      </div>
    </section>
  );
}
