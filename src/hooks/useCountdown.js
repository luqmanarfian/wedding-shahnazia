// src/hooks/useCountdown.js
import { useState, useEffect } from "react";

export default function useCountdown(targetDateIsoString) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date(targetDateIsoString).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        return {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        };
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      return {
        days: d < 10 ? "0" + d : String(d),
        hours: h < 10 ? "0" + h : String(h),
        minutes: m < 10 ? "0" + m : String(m),
        seconds: s < 10 ? "0" + s : String(s),
      };
    };

    // Run once immediately
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIsoString]);

  return timeLeft;
}
