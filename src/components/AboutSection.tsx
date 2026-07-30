"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const [aboutData, setAboutData] = useState({
    aboutHeading: "Sajib is a Designer Based in Dhaka, Bangladesh",
    aboutProjectsCount: "50+",
    aboutExperienceYears: "3 Years+",
    aboutParagraph: "Crafting intuitive, high-impact digital experiences through user-centered research, thoughtful strategy, and pixel-perfect execution. Specializing in mobile apps, SaaS platforms, and design systems for startups and forward-thinking brands.",
    aboutPortrait: "/assets/about_portrait.png",
  });

  useEffect(() => {
    fetch("/api/admin/homepage")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          setAboutData((prev) => ({
            aboutHeading: s.aboutHeading || prev.aboutHeading,
            aboutProjectsCount: s.aboutProjectsCount || prev.aboutProjectsCount,
            aboutExperienceYears: s.aboutExperienceYears || prev.aboutExperienceYears,
            aboutParagraph: s.aboutParagraph || prev.aboutParagraph,
            aboutPortrait: s.aboutPortrait || prev.aboutPortrait,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Extra Large Portrait Image */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <div className="w-full max-w-[880px] flex justify-center items-center">
            <Image
              src={aboutData.aboutPortrait}
              alt="Sajib - Designer"
              width={880}
              height={1000}
              className="w-full h-auto max-h-[850px] object-contain block drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)] transition-transform duration-300 lg:scale-135 lg:-translate-y-12 origin-center"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* Right Column: Text content block */}
        <div className="lg:col-span-6 flex flex-col items-start justify-between min-h-[540px]">
          <div>
            <span className="text-[#06ACFE] font-bold text-sm uppercase tracking-widest mb-4 block font-[var(--font-lato)]">
              About
            </span>

            <h2 className="text-3xl md:text-2xl lg:text-[46px] font-extrabold font-[var(--font-lato)] leading-[1.15] text-white mb-8">
              {aboutData.aboutHeading}
            </h2>

            {/* Stats Block */}
            <div className="flex gap-16 mb-8">
              <div>
                <span className="text-4xl sm:text-xl font-extrabold font-[var(--font-lato)] text-white block mb-1">
                  {aboutData.aboutProjectsCount}
                </span>
                <span className="text-[#8e8e93] text-sm font-medium font-[var(--font-inter)]">
                  Projects
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-xl font-extrabold font-[var(--font-lato)] text-white block mb-1">
                  {aboutData.aboutExperienceYears}
                </span>
                <span className="text-[#8e8e93] text-sm font-medium font-[var(--font-inter)]">
                  As a Designer
                </span>
              </div>
            </div>

            <p className="text-[#8e8e93] text-lg sm:text-xl font-[var(--font-inter)] leading-relaxed mb-10 text-justify">
              {aboutData.aboutParagraph}
            </p>
          </div>

          {/* Action Button linking to /about page */}
          <Link
            href="/about"
            className="inline-flex items-center gap-3 px-9 py-4.5 rounded-[4px] font-bold font-[var(--font-lato)] text-lg bg-[#06ACFE] text-white hover:bg-[#0098e6] transition-all duration-200 shadow-[0_4px_20px_rgba(6,172,254,0.4)] hover:-translate-y-0.5"
          >
            More About Myself
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
