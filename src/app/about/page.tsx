"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import { Download } from "lucide-react";

interface ExperienceItem {
  role: string;
  date: string;
  desc: string;
  skills: string[];
}

export default function AboutPage() {
  const experiences: ExperienceItem[] = [
    {
      role: "UI/UX Designer",
      date: "2024 - PRESENT",
      desc: "Figma, Auto Layout, Component Libraries, Design Tokens, Interactive Prototypes",
      skills: [
        "Figma",
        "Design Tokens",
        "Auto Layout",
        "Interactive Prototypes",
        "Design Systems",
      ],
    },
    {
      role: " Product Design and ",
      date: "21 January 2024 - 1 th February 2026",
      desc: "Figma, Auto Layout, Component Libraries, Design Tokens, Interactive Prototypes",
      skills: [
        "Figma",
        "Design Tokens",
        "Auto Layout",
        "Interactive Prototypes",
        "Design Systems",
      ],
    },
    {
      role: "Digital Designer",
      date: "2021 - 2022",
      desc: "Figma, Auto Layout, Component Libraries, Design Tokens, Interactive Prototypes",
      skills: [
        "Figma",
        "Design Tokens",
        "Auto Layout",
        "Interactive Prototypes",
        "Design Systems",
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner using Top Heading.png as background (Left Aligned) */}
      <section
        className="relative pt-36 pb-16 px-6 md:px-12 bg-center bg-cover bg-no-repeat border-b border-white/5 overflow-hidden"
        style={{ backgroundImage: `url('/assets/Top Heading.png')` }}
      >
        <div className="max-w-7xl mx-auto text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[4px] bg-[#06ACFE]/10 border border-[#06ACFE]/30 text-[#06ACFE] text-sm font-bold font-[var(--font-lato)] mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>About Me</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-[var(--font-lato)] leading-tight text-white mb-2">
            About Me
          </h1>
        </div>
      </section>

      {/* Main Content matching Figma design with fully rounded Main Skills pills */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bio Narrative & Experience Timeline */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Name Headline & Sub-headline */}
            <h2 className="text-4xl md:text-5xl font-extrabold font-[var(--font-lato)] text-white mb-1.5 leading-tight">
              Muhammad Sajib
            </h2>
            <p className="text-2xl font-bold font-[var(--font-lato)] text-[#06ACFE] mb-6">
              Product Designer
            </p>

            {/* Bio Paragraphs */}
            <p className="text-[#8e8e93] text-base font-[var(--font-inter)] leading-relaxed mb-6 max-w-xl text-justify">
              My work is mainly focused on third-dimension modeling, texturing
              and rendering. I like exploring the creatures with a touch touch of
              dark surrealism for characters and production.
            </p>

            <p className="text-[#8e8e93] text-base font-[var(--font-inter)] leading-relaxed mb-8 max-w-xl text-justify">
              Now I&apos;m an interactive media design student in Istanbul &mdash;
              currently freelancing and seeking internship opportunities. My work
              is mainly focused on third-dimension modeling, texturing and
              rendering. I like exploring the creatures with a touch of dark
              surrealism for characters and production.
            </p>

            {/* Download Resume Button */}
            <a
              href="https://drive.google.com/file/d/1TXMVWEfulEjQeO3Mt3o-pbQuHW4mI08z/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[4px] bg-[#181d28] text-[#8e8e93] font-medium font-[var(--font-lato)] text-sm hover:bg-[#202736] hover:text-white transition-all shadow-md mb-14"
            >
              Download
              <Download className="w-4 h-4 text-[#06ACFE]" />
              <span className="text-[#06ACFE] font-bold">Resume</span>
            </a>

            {/* Experience Section */}
            <div className="w-full">
              <h3 className="text-[#8e8e93] text-sm font-medium font-[var(--font-lato)] mb-2 uppercase tracking-wider">
                Experience
              </h3>
              <div className="border-b border-white/10 mb-8" />

              <div className="flex flex-col gap-10">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8"
                  >
                    <span className="text-white font-bold font-[var(--font-lato)] text-base sm:w-36 shrink-0 pt-0.5">
                      {exp.role}
                    </span>

                    <div className="flex-1">
                      <p className="text-[#71717a] text-xs font-[var(--font-inter)] mb-1.5">
                        {exp.date}
                      </p>
                      <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed mb-4">
                        {exp.desc}
                      </p>

                      <span className="text-[#71717a] text-xs font-semibold font-[var(--font-inter)] mb-2.5 block">
                        Main Skills
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#8e8e93] font-[var(--font-inter)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: About Me Image raised upward */}
          <div className="lg:col-span-5 flex justify-center sticky top-24 -mt-8 md:-mt-14">
            <div className="w-full max-w-[500px]">
              <Image
                src="/assets/about me image.png"
                alt="Muhammad Sajib - UX/UI Designer"
                width={500}
                height={680}
                className="w-full h-auto object-contain block drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] rounded-[4px]"
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
