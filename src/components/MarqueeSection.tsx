"use client";

import Image from "next/image";

export default function MarqueeSection() {
  const marqueeItems = [
    "Branding",
    "Dashboard",
    "Logos",
    "Webflow",
    "Slide Decks",
    "Mobile Apps",
    "Figma",
    "Social Media",
    "Framer",
  ];

  const screens = [
    { src: "/assets/screen_8_168.png", alt: "Triply iPad" },
    { src: "/assets/screen_8_169.png", alt: "Plate iPhone" },
    { src: "/assets/screen_8_170.png", alt: "TravelGo iPad" },
    { src: "/assets/screen_8_171.png", alt: "MobileWallet iPhone" },
    { src: "/assets/screen_8_172.png", alt: "NextSpace iPad" },
    { src: "/assets/screen_8_173.png", alt: "VPN iPhone" },
    { src: "/assets/screen_8_174.png", alt: "Nekchat iPad" },
    { src: "/assets/screen_8_175.png", alt: "Wallet iPhone" },
    { src: "/assets/screen_8_176.png", alt: "MonksWizard iPad" },
    { src: "/assets/screen_8_177.png", alt: "TravelBooking iPhone" },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#05070a] flex flex-col gap-6 sm:gap-8 md:gap-10 overflow-hidden select-none relative">
      {/* Row 1: Left moving text marquee */}
      <div className="w-full overflow-hidden relative">
        {/* Left & Right gradient fade overlays for seamless edge transitions */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-r from-[#05070a] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-l from-[#05070a] to-transparent z-10" />

        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-10 md:gap-14 pr-6 sm:pr-10 md:pr-14 font-[var(--font-lato)] text-xs sm:text-sm md:text-base lg:text-lg text-[#8e8e93] uppercase tracking-widest font-normal whitespace-nowrap">
            {marqueeItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-6 sm:gap-10 md:gap-14">
                <span>{item}</span>
                <span className="text-[#06ACFE]">•</span>
              </span>
            ))}
          </div>
          {/* Track 2 (Duplicate for seamless continuous loop) */}
          <div
            className="flex shrink-0 items-center gap-6 sm:gap-10 md:gap-14 pr-6 sm:pr-10 md:pr-14 font-[var(--font-lato)] text-xs sm:text-sm md:text-base lg:text-lg text-[#8e8e93] uppercase tracking-widest font-normal whitespace-nowrap"
            aria-hidden="true"
          >
            {marqueeItems.map((item, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-6 sm:gap-10 md:gap-14">
                <span>{item}</span>
                <span className="text-[#06ACFE]">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Middle Screen Images Row with Hardware-Accelerated Smooth Marquee */}
      <div className="w-full overflow-hidden relative">
        {/* Edge Gradient Fades for screen images */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-12 md:w-24 bg-gradient-to-r from-[#05070a] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-12 md:w-24 bg-gradient-to-l from-[#05070a] to-transparent z-10" />

        <div className="flex w-max animate-marquee-images-right hover:[animation-play-state:paused] py-2 sm:py-4">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6 md:gap-8 pr-4 sm:pr-6 md:pr-8">
            {screens.map((screen, idx) => (
              <div
                key={idx}
                className="shrink-0 transition-transform duration-300 hover:scale-105 transform-gpu"
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={320}
                  height={280}
                  className="h-[170px] xs:h-[200px] sm:h-[230px] md:h-[260px] lg:h-[280px] w-auto object-contain rounded-xl sm:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] pointer-events-none select-none"
                  style={{ width: "auto" }}
                  priority={idx < 4}
                />
              </div>
            ))}
          </div>

          {/* Track 2 (Duplicate for seamless continuous loop) */}
          <div
            className="flex shrink-0 items-center gap-4 sm:gap-6 md:gap-8 pr-4 sm:pr-6 md:pr-8"
            aria-hidden="true"
          >
            {screens.map((screen, idx) => (
              <div
                key={`dup-${idx}`}
                className="shrink-0 transition-transform duration-300 hover:scale-105 transform-gpu"
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={320}
                  height={280}
                  className="h-[170px] xs:h-[200px] sm:h-[230px] md:h-[260px] lg:h-[280px] w-auto object-contain rounded-xl sm:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] pointer-events-none select-none"
                  style={{ width: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Right moving text marquee */}
      <div className="w-full overflow-hidden relative">
        {/* Left & Right gradient fade overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-r from-[#05070a] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-l from-[#05070a] to-transparent z-10" />

        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-10 md:gap-14 pr-6 sm:pr-10 md:pr-14 font-[var(--font-lato)] text-xs sm:text-sm md:text-base lg:text-lg text-[#8e8e93] uppercase tracking-widest font-normal whitespace-nowrap">
            {marqueeItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-6 sm:gap-10 md:gap-14">
                <span>{item}</span>
                <span className="text-[#06ACFE]">•</span>
              </span>
            ))}
          </div>
          {/* Track 2 (Duplicate for seamless continuous loop) */}
          <div
            className="flex shrink-0 items-center gap-6 sm:gap-10 md:gap-14 pr-6 sm:pr-10 md:pr-14 font-[var(--font-lato)] text-xs sm:text-sm md:text-base lg:text-lg text-[#8e8e93] uppercase tracking-widest font-normal whitespace-nowrap"
            aria-hidden="true"
          >
            {marqueeItems.map((item, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-6 sm:gap-10 md:gap-14">
                <span>{item}</span>
                <span className="text-[#06ACFE]">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
