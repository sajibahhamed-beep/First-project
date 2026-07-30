"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [heroData, setHeroData] = useState({
    heroGreeting: "Hi!! I am",
    heroName: "Sajib",
    heroBelief: "& I believe",
    heroHeadline: "Design is a Language",
    heroSubtitle: "creaft intuitive digital experience and tech designers how to communicate through design",
    heroCtaPrimary: "Hire Me",
    heroCtaSecondary: "Book a Demo Class",
    heroImage: "/assets/hero_sajib_exact.png",
  });

  useEffect(() => {
    fetch("/api/admin/homepage")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          setHeroData((prev) => ({
            heroGreeting: s.heroGreeting || prev.heroGreeting,
            heroName: s.heroName || prev.heroName,
            heroBelief: s.heroBelief || prev.heroBelief,
            heroHeadline: s.heroHeadline || prev.heroHeadline,
            heroSubtitle: s.heroSubtitle || prev.heroSubtitle,
            heroCtaPrimary: s.heroCtaPrimary || prev.heroCtaPrimary,
            heroCtaSecondary: s.heroCtaSecondary || prev.heroCtaSecondary,
            heroImage: s.heroImage || prev.heroImage,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] pt-36 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 flex items-center bg-center bg-cover bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url('/assets/desktop_3_bg.png')` }}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex flex-col items-start w-fit max-w-full">
            <p className="text-[28px] text-[#8e8e93] font-[var(--font-lato)] font-normal leading-[1.2] mb-1">
              {heroData.heroGreeting}
            </p>

            <p className="text-[32px] font-[var(--font-lato)] leading-[1.2] mb-3">
              <strong className="text-white font-bold">{heroData.heroName}</strong>{" "}
              <span className="text-[#8e8e93] font-normal">{heroData.heroBelief}</span>
            </p>

            <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-black font-[var(--font-lato)] leading-[1.15] text-white mb-5 whitespace-nowrap w-full">
              {heroData.heroHeadline}
            </h1>

            <p className="text-[18px] sm:text-[20px] text-[#9ea3ae] font-[var(--font-inter)] font-normal leading-[1.4] max-w-[530px] mb-9">
              {heroData.heroSubtitle}
            </p>

            <div className="w-full flex flex-row gap-4 items-stretch">
              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-[4px] text-[17px] font-bold font-[var(--font-lato)] bg-[#06ACFE] text-white hover:bg-[#0098e6] transition-all duration-200 shadow-[0_4px_15px_rgba(6,172,254,0.35)] hover:-translate-y-0.5 text-center whitespace-nowrap"
              >
                {heroData.heroCtaPrimary}
              </a>

              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-[4px] text-[17px] font-bold font-[var(--font-lato)] bg-[#27272a] border border-[#3f3f46] text-white hover:bg-[#323238] transition-all duration-200 hover:-translate-y-0.5 text-center whitespace-nowrap"
              >
                {heroData.heroCtaSecondary}
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Sajib portrait mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[480px]">
            <Image
              src={heroData.heroImage}
              alt="Sajib - Designer"
              width={480}
              height={560}
              className="w-full h-auto object-contain block"
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
