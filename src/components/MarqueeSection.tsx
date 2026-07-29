"use client";

import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
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

  // Double the screens array for seamless looping
  const doubleScreens = [...screens, ...screens];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  // Auto-scroll loop using deltaTime for 100% consistent speed across all displays (60Hz / 120Hz)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const scroll = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isHovered && !isDragging && container) {
        // 45px per second scrolling speed
        container.scrollLeft += 45 * deltaTime;

        // Seamless loop reset at exact half-width point
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isDragging]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  // Touch Drag Handlers for Mobile Devices
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

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

      {/* Row 2: Middle Screen Images Row with Responsive Heights, Gradient Masks & Dragging */}
      <div className="w-full relative">
        {/* Edge Gradient Fades for screen images */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-12 md:w-24 bg-gradient-to-r from-[#05070a] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-12 md:w-24 bg-gradient-to-l from-[#05070a] to-transparent z-10" />

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          className={`flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 sm:py-4 px-4 cursor-grab ${
            isDragging ? "cursor-grabbing active:scale-[0.99]" : ""
          } transition-transform duration-150`}
          style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
        >
          {doubleScreens.map((screen, idx) => (
            <div
              key={idx}
              className="shrink-0 transition-transform duration-300 hover:scale-105"
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
