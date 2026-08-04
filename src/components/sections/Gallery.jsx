// src/components/sections/Gallery.jsx
import React from "react";
import placeholderPortrait from "../../assets/images/placeholder-portrait.svg";

export default function Gallery({ gallery }) {
  const { title = "Galeri Prewedding", subtitle = "Captured Memories", images = [] } = gallery || {};

  // Custom Bento layout grid spans for visual balance across 5+ items
  const getBentoSpan = (index, total) => {
    if (total === 5) {
      // 5-item Bento Grid Configuration
      if (index === 0) return "col-span-2 h-72 sm:h-80 arch-frame shadow-xl";
      return "col-span-1 h-52 sm:h-60 rounded-2xl border border-antGold/30 shadow-md";
    }
    // Generic fallback for any number of images
    if (index % 5 === 0) return "col-span-2 h-64 sm:h-72 arch-frame shadow-xl";
    return "col-span-1 h-48 sm:h-56 rounded-2xl border border-antGold/30 shadow-md";
  };

  return (
    <section id="gallery" className="reveal space-y-8 max-w-md mx-auto">
      {/* Header Typography */}
      <div className="text-center space-y-2">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-antGold font-medium block">
          {subtitle}
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold italic text-espresso">
          {title}
        </h2>
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="h-[1px] w-10 bg-antGold/40"></span>
          <span className="text-antGold text-sm animate-float-gentle inline-block select-none">❦</span>
          <span className="h-[1px] w-10 bg-antGold/40"></span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {images.map((img, idx) => {
            const cardStyle = getBentoSpan(idx, images.length);
            const objectPos = img.position || (idx === 0 ? "object-top" : "object-center");
            const delayClass = `delay-${(idx % 4) * 100 + 100}`;

            return (
              <div
                key={img.id || `gallery-item-${idx}`}
                className={`reveal reveal-zoom-in ${delayClass} group relative overflow-hidden bg-softCream transition-all duration-500 hover:shadow-2xl rounded-xl card-hover-effect ${cardStyle}`}
              >
                {/* Image Element */}
                <img
                  src={img.url}
                  alt={`Prewedding Photo ${idx + 1}`}
                  className={`w-full h-full object-cover ${objectPos} transition-transform duration-700 ease-out group-hover:scale-105`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = placeholderPortrait;
                  }}
                />

                {/* Aesthetic Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end justify-center p-4">
                  <span className="text-ivory font-sans text-[10px] uppercase tracking-[0.25em] opacity-90 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    ✦ Damarjati & Shahnazia ✦
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
