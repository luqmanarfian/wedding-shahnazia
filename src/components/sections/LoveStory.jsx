// src/components/sections/LoveStory.jsx
import React from "react";
import bgCardPortrait from "../../assets/images/bg-card-potrait.webp";

export default function LoveStory({ loveStory }) {
  const { title, subtitle, paragraphs } = loveStory;

  return (
    <section id="story" className="reveal max-w-md mx-auto">
      <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 border-2 border-antGold/40 shadow-2xl text-center vintage-border-thin">
        {/* Layer 1: Background Image bg-card-potrait.webp */}
        <img
          src={bgCardPortrait}
          alt="Love Story Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Softened Warm Tint Overlay for High Text Readability */}
        <div className="absolute inset-0 bg-ivory/55 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10">
          {/* Inner Vintage Border Accent */}
          <div className="absolute inset-2 border border-antGold/20 pointer-events-none rounded-xl"></div>

          <div className="text-center mb-8 relative">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-antGold font-medium drop-shadow-sm">
              {subtitle}
            </span>
            <h2 className="font-heading text-4xl font-semibold italic text-espresso mt-1 drop-shadow-sm">
              {title}
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="h-[1px] w-10 bg-antGold/50"></span>
              <span className="text-antGold text-sm">❦</span>
              <span className="h-[1px] w-10 bg-antGold/50"></span>
            </div>
          </div>

          <div className="prose prose-stone max-w-none text-center">
            {paragraphs.map((para, index) => {
              const isHighlight = para.startsWith('"') || para.startsWith('“');
              if (isHighlight) {
                return (
                  <p
                    key={index}
                    className="text-lg font-heading font-semibold text-espresso italic mb-6 drop-shadow-sm"
                  >
                    {para}
                  </p>
                );
              }
              return (
                <p
                  key={index}
                  className="text-base text-sepia italic leading-relaxed mb-6 font-medium"
                >
                  {para}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
