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

  // Auto-scroll loop when not hovered and not dragging
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isHovered && !isDragging) {
        container.scrollLeft += 1; // 1px per frame speed

        // Reset scroll position when reaching half point for infinite loop
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isDragging]);

  // Mouse Drag Events
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
    const walk = (x - startX) * 1.8; // Scroll multiplier
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  // Touch Events for Mobile Dragging
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
    const walk = (x - startX) * 1.8;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <section className="py-14 bg-[#05070a] flex flex-col gap-10 overflow-hidden select-none">
      {/* Row 1: Left moving text marquee */}
      <div className="w-full overflow-hidden relative">
        <div className="animate-marquee-left">
          <div className="flex gap-10 items-center w-1/2 justify-around font-[var(--font-lato)] text-lg text-[#8e8e93] uppercase tracking-widest font-normal">
            {marqueeItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-10">
                <span>{item}</span>
                <span className="text-[#06ACFE]">•</span>
              </span>
            ))}
          </div>
          <div
            className="flex gap-10 items-center w-1/2 justify-around font-[var(--font-lato)] text-lg text-[#8e8e93] uppercase tracking-widest font-normal"
            aria-hidden="true"
          >
            {marqueeItems.map((item, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-10">
                <span>{item}</span>
                <span className="text-[#06ACFE]">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Middle Screen Images Row with Hidden Scrollbar & Dragging */}
      <div className="w-full relative px-2">
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
          className={`flex gap-8 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-4 cursor-grab ${
            isDragging ? "cursor-grabbing active:scale-[0.99]" : ""
          } transition-transform duration-150`}
          style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
        >
          {doubleScreens.map((screen, idx) => (
            <div
              key={idx}
              className="shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                width={320}
                height={260}
                className="h-[260px] w-auto object-contain rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] pointer-events-none"
                style={{ width: "auto", height: "260px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Right moving text marquee */}
      <div className="w-full overflow-hidden relative">
        <div className="animate-marquee-right">
          <div className="flex gap-10 items-center w-1/2 justify-around font-[var(--font-lato)] text-lg text-[#8e8e93] uppercase tracking-widest font-normal">
            {marqueeItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-10">
                <span>{item}</span>
                <span className="text-[#06ACFE]">•</span>
              </span>
            ))}
          </div>
          <div
            className="flex gap-10 items-center w-1/2 justify-around font-[var(--font-lato)] text-lg text-[#8e8e93] uppercase tracking-widest font-normal"
            aria-hidden="true"
          >
            {marqueeItems.map((item, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-10">
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
