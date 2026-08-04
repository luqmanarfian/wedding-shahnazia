// src/components/common/FloatingDecorations.jsx
import React from "react";

/**
 * Lightweight particle & decoration overlay for adding life, depth, and elegance
 * to the mobile invitation background without affecting performance.
 */
export default function FloatingDecorations() {
  const particles = [
    { id: 1, symbol: "✨", left: "10%", size: "14px", delay: "0s", duration: "10s" },
    { id: 2, symbol: "🌸", left: "85%", size: "16px", delay: "2s", duration: "14s" },
    { id: 3, symbol: "✦", left: "25%", size: "12px", delay: "4s", duration: "11s" },
    { id: 4, symbol: "❦", left: "70%", size: "18px", delay: "1s", duration: "13s" },
    { id: 5, symbol: "✨", left: "45%", size: "15px", delay: "5s", duration: "12s" },
    { id: 6, symbol: "🌸", left: "90%", size: "14px", delay: "3s", duration: "15s" },
    { id: 7, symbol: "✦", left: "60%", size: "13px", delay: "6s", duration: "10s" },
    { id: 8, symbol: "✨", left: "30%", size: "16px", delay: "2.5s", duration: "13.5s" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 text-antGold/60 select-none animate-float-drift opacity-0"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            filter: "drop-shadow(0 0 3px rgba(185, 154, 99, 0.4))"
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
