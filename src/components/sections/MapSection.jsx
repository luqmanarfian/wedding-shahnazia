// src/components/sections/MapSection.jsx
import React from "react";

export default function MapSection({ maps }) {
  return (
    <section id="maps" className="reveal max-w-md mx-auto space-y-6">
      <div className="bg-softWhite/85 backdrop-blur-sm p-4 rounded-2xl border-2 border-antGold/30 shadow-lg">
        {/* Embed Google Map */}
        <div className="w-full h-64 rounded-xl overflow-hidden border border-antGold/20 shadow-inner">
          <iframe
            src={maps.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>
      </div>

      <div className="text-center">
        <a
          href={maps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs uppercase tracking-[0.25em] bg-sepia text-ivory px-8 py-4 rounded-full border border-antGold hover:bg-espresso transition-all duration-300 shadow-md inline-flex items-center gap-2 transform active:scale-95 cursor-pointer"
        >
          Petunjuk Arah Google Maps
          <i className="fa-solid fa-map-location-dot"></i>
        </a>
      </div>
    </section>
  );
}
