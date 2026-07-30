// src/components/sections/LoveStory.jsx
import PropTypes from "prop-types";
import bgCardPortrait from "../../assets/images/bg-card-potrait.webp";

function getFallbackTitle(index) {
  if (index === 0) {
    return "Awal Ceria";
  }
  if (index === 1) {
    return "Lamaran";
  }
  return "Pernikahan";
}

function getRomanBadge(index) {
  const romanNumerals = ["I", "II", "III", "IV", "V"];
  return romanNumerals[index] || index + 1;
}

export default function LoveStory({ loveStory }) {
  const { title, subtitle, stories, paragraphs } = loveStory;

  // Standardize story items list from stories prop or fallback to paragraphs array without nested ternaries
  let storyList = [];
  if (stories && Array.isArray(stories) && stories.length > 0) {
    storyList = stories;
  } else if (paragraphs && Array.isArray(paragraphs)) {
    storyList = paragraphs.map((para, idx) => ({
      id: idx + 1,
      badge: `BABAK ${getRomanBadge(idx)}`,
      title: getFallbackTitle(idx),
      description: para
    }));
  }

  return (
    <section id="story" className="reveal max-w-md mx-auto px-1 sm:px-0">
      {/* 1 Single Unified Card Container */}
      <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 border border-antGold/30 shadow-2xl text-center vintage-border-thin bg-softWhite/90">
        {/* Layer 1: Background Image bgCardPortrait */}
        <img
          src={bgCardPortrait}
          alt="Love Story Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-40"
        />

        {/* Layer 2: Subtle Borobudur Geometric Stupa/Lattice Pattern Overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="borobudur-unified-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M18 0 L36 18 L18 36 L0 18 Z" fill="none" stroke="#B99A63" strokeWidth="0.8" />
              <circle cx="18" cy="18" r="3" fill="#B99A63" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#borobudur-unified-pattern)" />
        </svg>

        {/* Layer 3: Warm Tint Overlay for Text Contrast & High Readability */}
        <div className="absolute inset-0 bg-ivory/70 pointer-events-none"></div>

        {/* Layer 4: Content Layer */}
        <div className="relative z-10">
          {/* Inner Vintage Border Frame */}
          <div className="absolute inset-2 border border-antGold/20 pointer-events-none rounded-xl"></div>

          {/* Subtle Javanese Corner Ornaments */}
          <span className="absolute top-3 left-3 text-antGold/40 text-xs select-none">❦</span>
          <span className="absolute top-3 right-3 text-antGold/40 text-xs select-none">❦</span>
          <span className="absolute bottom-3 left-3 text-antGold/40 text-xs select-none">❦</span>
          <span className="absolute bottom-3 right-3 text-antGold/40 text-xs select-none">❦</span>

          {/* Section Header Inside Unified Card */}
          <div className="text-center mb-8 relative pt-2">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-antGold font-medium drop-shadow-sm">
              {subtitle || "Our Love Journey"}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold italic text-espresso mt-1 drop-shadow-sm">
              {title || "Cerita Cinta Kami"}
            </h2>
            
            {/* Borobudur / Javanese Header Divider */}
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-antGold/60"></span>
              <span className="text-antGold text-xs select-none">❦</span>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-antGold/60"></span>
            </div>
          </div>

          {/* Combined 3 Stories Flow */}
          <div className="space-y-7 pb-2">
            {storyList.map((story, index) => (
              <div key={story.id || index} className="relative">
                {/* Story Chapter Badge */}
                {story.badge && (
                  <div className="inline-block px-3 py-0.5 rounded-full border border-antGold/40 bg-ivory/80 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-antGold font-semibold mb-3 shadow-xs">
                    {story.badge}
                  </div>
                )}

                {/* Story Title */}
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold italic text-espresso mb-2 tracking-wide drop-shadow-xs">
                  {story.title}
                </h3>

                {/* Subtle Accent Line */}
                <div className="w-10 h-[1px] bg-antGold/40 mx-auto mb-3"></div>

                {/* Story Description */}
                <p className="font-body text-base sm:text-lg text-sepia leading-relaxed font-medium max-w-prose mx-auto px-2">
                  {story.description || story.content}
                </p>

                {/* In-Card Divider between stories */}
                {index < storyList.length - 1 && (
                  <div className="flex items-center justify-center gap-3 my-7">
                    <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-antGold/35 to-transparent"></span>
                    <span className="text-antGold/50 text-[10px] select-none">✦</span>
                    <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-antGold/35 to-transparent"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

LoveStory.propTypes = {
  loveStory: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    stories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        badge: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        content: PropTypes.string
      })
    ),
    paragraphs: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};
