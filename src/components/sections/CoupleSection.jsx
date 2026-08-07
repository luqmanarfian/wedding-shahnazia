// src/components/sections/CoupleSection.jsx
import PropTypes from "prop-types";
import bgCardPengantin from "../../assets/images/bg-card-pengantin.webp";
import placeholderAvatar from "../../assets/images/placeholder-avatar.svg";

export default function CoupleSection({ couple }) {
  const { groom, bride } = couple;

  return (
    <section id="mempelai" className="reveal space-y-8 sm:space-y-10 max-w-md mx-auto">
      {/* Section Header */}
      <div className="text-center px-4 sm:px-0">
        <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-sepia font-medium">
          Assalamualaikum Wr. Wb.
        </span>
        <h2 className="font-heading text-[clamp(1.85rem,6.5vw,2.5rem)] font-semibold italic text-espresso mt-1.5 leading-tight">
          Kedua Mempelai
        </h2>
        <p className="font-sans text-xs sm:text-sm text-sepia max-w-[300px] sm:max-w-xs mx-auto mt-2 leading-relaxed font-medium">
          Dengan memohon rahmat dan rida Allah SWT, kami dengan senang hati mengundang Bapak/Ibu/Saudara/i ke
          perayaan pernikahan kami:
        </p>
      </div>

      {/* Mempelai Wanita */}
      <div className="reveal reveal-slide-left delay-100 relative rounded-2xl overflow-hidden border-2 border-antGold/40 shadow-xl text-center p-5 sm:p-7 text-espresso vintage-border-thin card-hover-effect">
        {/* Layer 1: Background Image bg-card-pengantin.webp */}
        <img
          src={bgCardPengantin}
          alt="Card Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Softened Warm Tint Overlay for High Text Readability */}
        <div className="absolute inset-0 bg-ivory/30 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10 px-1 sm:px-2">
          {/* Circular frame */}
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-antGold shadow-lg mb-4 bg-softCream transition-transform duration-500 hover:scale-105">
            <img
              src={bride.photo}
              alt={bride.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.src = placeholderAvatar;
              }}
            />
          </div>
          <h3 className="font-heading text-[clamp(1.35rem,5.2vw,1.75rem)] font-bold italic text-espresso leading-[1.22] tracking-normal max-w-[290px] sm:max-w-xs mx-auto drop-shadow-sm break-words">
            {bride.name}
          </h3>
          <p className="font-sans text-[11px] sm:text-xs tracking-[0.2em] text-antGold uppercase mt-2 mb-2.5 font-semibold">
            {bride.parentInfo}
          </p>
          <p className="font-sans text-xs sm:text-sm text-sepia leading-relaxed font-medium max-w-[280px] sm:max-w-xs mx-auto">
            Putri dari {bride.parents}
          </p>
        </div>
      </div>
      
      {/* Mempelai Pria */}
      <div className="reveal reveal-slide-right delay-200 relative rounded-2xl overflow-hidden border-2 border-antGold/40 shadow-xl text-center p-5 sm:p-7 text-espresso vintage-border-thin card-hover-effect">
        {/* Layer 1: Background Image bg-card-pengantin.webp */}
        <img
          src={bgCardPengantin}
          alt="Card Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Softened Warm Tint Overlay for High Text Readability */}
        <div className="absolute inset-0 bg-ivory/30 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10 px-1 sm:px-2">
          {/* Circular frame */}
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-antGold shadow-lg mb-4 bg-softCream transition-transform duration-500 hover:scale-105">
            <img
              src={groom.photo}
              alt={groom.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.src = placeholderAvatar;
              }}
            />
          </div>
          <h3 className="font-heading text-[clamp(1.35rem,5.2vw,1.75rem)] font-bold italic text-espresso leading-[1.22] tracking-normal max-w-[290px] sm:max-w-xs mx-auto drop-shadow-sm break-words">
            {groom.name}
          </h3>
          <p className="font-sans text-[11px] sm:text-xs tracking-[0.2em] text-antGold uppercase mt-2 mb-2.5 font-semibold">
            {groom.parentInfo}
          </p>
          <p className="font-sans text-xs sm:text-sm text-sepia leading-relaxed font-medium max-w-[280px] sm:max-w-xs mx-auto">
            Putra dari {groom.parents}
          </p>
        </div>
      </div>
    </section>
  );
}

const personShape = PropTypes.shape({
  name: PropTypes.string,
  shortName: PropTypes.string,
  parentInfo: PropTypes.string,
  parents: PropTypes.string,
  photo: PropTypes.string
});

CoupleSection.propTypes = {
  couple: PropTypes.shape({
    groom: personShape,
    bride: personShape,
    couple: PropTypes.shape({
      photo: PropTypes.string
    })
  }).isRequired
};
