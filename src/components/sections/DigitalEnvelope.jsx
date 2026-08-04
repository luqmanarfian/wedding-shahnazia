// src/components/sections/DigitalEnvelope.jsx
import React from "react";
import PropTypes from "prop-types";
import bgCardLandscapeDark from "../../assets/images/bg-card-landscape-dark.webp";

export default function DigitalEnvelope({ gift, onCopySuccess }) {
  const accounts = Array.isArray(gift) ? gift : gift ? [gift] : [];

  const handleCopy = async (accountNumber) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(accountNumber);
        if (onCopySuccess) {
          onCopySuccess("Nomor Rekening Berhasil Disalin");
        }
      } else {
        // Fallback for environment without clipboard API
        const tempInput = document.createElement("textarea");
        tempInput.value = accountNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.remove();
        if (onCopySuccess) {
          onCopySuccess("Nomor Rekening Berhasil Disalin");
        }
      }
    } catch (err) {
      console.error("Failed to copy account number:", err);
    }
  };

  return (
    <section id="amplop" className="reveal max-w-md mx-auto">
      <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 text-ivory shadow-xl border-2 border-antGold/40 vintage-border-thin text-center">
        {/* Layer 1: Background Image bg-card-landscape-dark.webp */}
        <img
          src={bgCardLandscapeDark}
          alt="Digital Envelope Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Dark Tint Overlay */}
        <div className="absolute inset-0 bg-espresso/50 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10">
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

          {/* Bank Accounts List */}
          <div className="space-y-4">
            {accounts.map((acc, index) => (
              <div
                key={acc.id || index}
                className="bg-sepia/40 border border-antGold/30 p-5 sm:p-6 rounded-xl space-y-3.5 backdrop-blur-sm transition-all duration-300 hover:border-antGold/60 shadow-md text-left"
              >
                <div className="flex items-center justify-between border-b border-antGold/20 pb-2.5">
                  <span className="font-sans text-xs tracking-widest uppercase text-antGold font-bold flex items-center gap-2">
                    <i className="fa-solid fa-building-columns text-xs text-antGold"></i>
                    {acc.bankName}
                  </span>
                  {acc.isPrimary && (
                    <span className="text-[10px] bg-antGold/20 text-antGold px-2.5 py-0.5 rounded-full font-sans tracking-widest uppercase font-semibold">
                      UTAMA
                    </span>
                  )}
                </div>
                <div>
                  <span className="block font-sans text-[10px] tracking-wider uppercase text-softCream/70">
                    No. Rekening :
                  </span>
                  <span className="block font-heading text-2xl sm:text-3xl font-bold tracking-wider sm:tracking-widest text-white mt-0.5 break-all">
                    {acc.accountNumber}
                  </span>
                </div>
                <div>
                  <span className="block font-sans text-[10px] tracking-wider uppercase text-softCream/70">
                    Atas Nama :
                  </span>
                  <span className="block text-sm sm:text-base font-semibold text-ivory tracking-wide">
                    {acc.accountHolder}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(acc.accountNumber)}
                  className="w-full font-sans text-xs uppercase tracking-[0.2em] bg-ivory text-espresso py-3 rounded-lg border border-antGold hover:bg-softCream transition-all duration-300 inline-flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer font-semibold shadow-sm mt-1"
                >
                  Salin Nomor Rekening
                  <i className="fa-solid fa-copy text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

DigitalEnvelope.propTypes = {
  gift: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        bankName: PropTypes.string,
        isPrimary: PropTypes.bool,
        accountNumber: PropTypes.string,
        accountHolder: PropTypes.string
      })
    ),
    PropTypes.shape({
      id: PropTypes.string,
      bankName: PropTypes.string,
      isPrimary: PropTypes.bool,
      accountNumber: PropTypes.string,
      accountHolder: PropTypes.string
    })
  ]).isRequired,
  onCopySuccess: PropTypes.func
};
