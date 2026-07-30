// src/components/sections/CoupleSection.jsx
import PropTypes from "prop-types";
import bgCardPengantin from "../../assets/images/bg-card-pengantin.webp";
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
      <div className="relative rounded-2xl overflow-hidden border-2 border-antGold/40 shadow-xl text-center p-6 text-espresso vintage-border-thin">
        {/* Layer 1: Background Image bg-card-pengantin.webp */}
        <img
          src={bgCardPengantin}
          alt="Card Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Softened Warm Tint Overlay for High Text Readability */}
        <div className="absolute inset-0 bg-ivory/30 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10">
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
          <h3 className="font-heading text-3xl font-bold italic text-espresso drop-shadow-sm">{groom.name}</h3>
          <p className="font-sans text-xs tracking-wider text-antGold uppercase mt-1 mb-3 font-semibold">
            {groom.parentInfo}
          </p>
          <p className="text-sm text-sepia leading-relaxed font-medium">
            Putra terkasih dari {groom.parents}
          </p>
        </div>
      </div>

      {/* Mempelai Wanita */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-antGold/40 shadow-xl text-center p-6 text-espresso vintage-border-thin">
        {/* Layer 1: Background Image bg-card-pengantin.webp */}
        <img
          src={bgCardPengantin}
          alt="Card Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Layer 2: Softened Warm Tint Overlay for High Text Readability */}
        <div className="absolute inset-0 bg-ivory/30 pointer-events-none"></div>

        {/* Layer 3: Content Layer */}
        <div className="relative z-10">
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
          <h3 className="font-heading text-3xl font-bold italic text-espresso drop-shadow-sm">{bride.name}</h3>
          <p className="font-sans text-xs tracking-wider text-antGold uppercase mt-1 mb-3 font-semibold">
            {bride.parentInfo}
          </p>
          <p className="text-sm text-sepia leading-relaxed font-medium">
            Putri terkasih dari {bride.parents}
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
