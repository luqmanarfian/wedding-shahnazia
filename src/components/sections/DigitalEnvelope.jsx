// src/components/sections/DigitalEnvelope.jsx
import React from "react";

export default function DigitalEnvelope({ gift, onCopySuccess }) {
  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(gift.accountNumber)
        .then(() => {
          if (onCopySuccess) {
            onCopySuccess("Nomor Rekening Berhasil Disalin");
          }
        })
        .catch((err) => {
          console.error("Failed to copy account number:", err);
        });
    } else {
      // Fallback for older browsers
      const tempInput = document.createElement("textarea");
      tempInput.value = gift.accountNumber;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand("copy");
        if (onCopySuccess) {
          onCopySuccess("Nomor Rekening Berhasil Disalin");
        }
      } catch (err) {
        console.error("Fallback copy failed:", err);
      }
      document.body.removeChild(tempInput);
    }
  };

  return (
    <section id="amplop" className="reveal max-w-md mx-auto">
      <div className="bg-espresso text-ivory rounded-2xl p-8 border-2 border-antGold/30 shadow-xl relative text-center overflow-hidden">
        {/* Leaf icon corner */}
        <div className="absolute -bottom-6 -left-6 text-sage/15 text-8xl -scale-y-100">
          <i className="fa-solid fa-leaf"></i>
        </div>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sepia border border-antGold/40 text-antGold mb-4 text-lg">
          <i className="fa-solid fa-gift"></i>
        </div>
        <h2 className="font-heading text-3xl font-bold italic text-antGold mb-2">Kado Digital</h2>
        <p className="text-sm text-softCream/80 leading-relaxed mb-6 max-w-xs mx-auto">
          Doa restu Anda adalah berkah terindah bagi kami. Namun, apabila Anda ingin memberikan
          tanda kasih secara digital, Anda dapat mentransfer ke rekening berikut:
        </p>

        {/* Bank Account Card */}
        <div className="bg-sepia/40 border border-antGold/30 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-antGold/20 pb-3">
            <span className="font-sans text-xs tracking-widest uppercase text-antGold font-bold">
              {gift.bankName}
            </span>
            {gift.isPrimary && (
              <span className="text-xs bg-antGold/20 text-antGold px-3 py-1 rounded-full font-sans tracking-widest">
                UTAMA
              </span>
            )}
          </div>
          <div className="text-left">
            <span className="block font-sans text-[10px] tracking-wider uppercase text-softCream/70">
              No. Rekening :
            </span>
            <span className="block font-heading text-2xl sm:text-3xl font-bold tracking-wider sm:tracking-widest text-white mt-1 break-all">
              {gift.accountNumber}
            </span>
          </div>
          <div className="text-left">
            <span className="block font-sans text-[10px] tracking-wider uppercase text-softCream/70">
              Atas Nama :
            </span>
            <span className="block text-base font-semibold text-ivory tracking-wide">
              {gift.accountHolder}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="w-full font-sans text-xs uppercase tracking-[0.2em] bg-ivory text-espresso py-3 rounded-lg border border-antGold hover:bg-softCream transition-all duration-300 inline-flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
          >
            Salin Nomor Rekening
            <i className="fa-solid fa-copy text-xs"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
