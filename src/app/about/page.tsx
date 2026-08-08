"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import { Download, Briefcase, Award } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  desc: string;
  highlights: string[];
  skills: string[];
}

interface CertificationItem {
  title: string;
  institution: string;
  year: string;
  focus: string;
  skills: string[];
}

export default function AboutPage() {
  const experiences: ExperienceItem[] = [
    {
      role: "Executive UX/UI Designer",
      company: "Join Venture Ai",
      date: "04/2025 - Present",
      desc: "Driving end-to-end product design, scalable design systems, and cross-functional product execution for AI-powered platforms.",
      highlights: [
        "Product Strategy",
        "Client Solutions",
        "Team Leadership",
        "Cross-Functional Collaboration",
      ],
      skills: [
        "Product Strategy",
        "Client Solutions",
        "Team Leadership",
        "Cross-Functional Collaboration",
        "Design Systems",
        "Figma",
      ],
    },
    {
      role: "Junior UX/UI Designer",
      company: "Join Venture Ai",
      date: "01/2025 - 04/2025",
      desc: "Conducted usability research, interactive wireframing, competitive analysis, and rapid prototyping for digital user experiences.",
      highlights: [
        "Product Planning",
        "Usability Testing & Competitive Analysis",
        "Problem Solving",
        "Team Collaboration",
        "Wireframing",
        "Prototyping",
      ],
      skills: [
        "Product Planning",
        "Usability Testing",
        "Wireframing",
        "Prototyping",
        "Competitive Analysis",
        "Problem Solving",
      ],
    },
    {
      role: "Product Manager (Part-time)",
      company: "TAF Technology",
      date: "10/2025 - 12/2025",
      desc: "Led agile sprint cycles, feature roadmapping, business alignment, and structured Product Requirement Documentation (PRD).",
      highlights: [
        "Business Alignment",
        "Agile & Sprint Management",
        "Feature Prioritization",
        "Product Requirement Documentation (PRD)",
      ],
      skills: [
        "Business Alignment",
        "Agile & Sprint Management",
        "Feature Prioritization",
        "PRD Documentation",
        "Roadmapping",
      ],
    },
    {
      role: "Graphic Designer",
      company: "TAF Technology",
      date: "02/2024 - 11/2024",
      desc: "Created brand vector assets, engaging visual thumbnails, video post-production editing, and high-precision logo tracing.",
      highlights: [
        "Vector Design",
        "Thumbnail Design",
        "Video Editing (Capcut)",
        "Logo Design and Tracing",
      ],
      skills: [
        "Vector Design",
        "Thumbnail Design",
        "Video Editing (Capcut)",
        "Logo Design & Tracing",
        "Adobe Creative Suite",
      ],
    },
    {
      role: "Lead Generator",
      company: "Proemailfinder",
      date: "06/2023 - 01/2024",
      desc: "Spearheaded targeted data research, prospect validation, team management, and outbound lead generation mentorship.",
      highlights: [
        "Data Research",
        "Team Management",
        "Training and Mentoring",
      ],
      skills: [
        "Data Research",
        "Team Management",
        "Training & Mentoring",
        "Prospect Analysis",
      ],
    },
  ];

  const certifications: CertificationItem[] = [
    {
      title: "UX/UI Design Career Track",
      institution: "Ostad Platform",
      year: "2025",
      focus: "User Research, User Centered interface, Visual Hierarchy, and Industry-standard Product Design workflows.",
      skills: [
        "User Research",
        "User Centered Interface",
        "Visual Hierarchy",
        "Product Design Workflows",
      ],
    },
    {
      title: "Professional Graphic Design",
      institution: "Digital IT Farm Tangail",
      year: "2021",
      focus: "Brand Identity, Visual Design, Vector Illustration, and Advanced Layout using Adobe Creative Suite.",
      skills: [
        "Brand Identity",
        "Visual Design",
        "Vector Illustration",
        "Adobe Creative Suite",
      ],
    },
    {
      title: "Web Design",
      institution: "LEDP (Govt. Project)",
      year: "2021",
      focus: "Responsive Front-end Development using HTML5, CSS3, Bootstrap 5 and JavaScript.",
      skills: [
        "HTML5",
        "CSS3",
        "Bootstrap 5",
        "JavaScript",
        "Responsive Development",
      ],
    },
    {
      title: "Video Editing",
      institution: "Filmora 11",
      year: "2021",
      focus: "Creative video timeline editing, motion graphics, audio sync, color correction, and export optimization.",
      skills: [
        "Filmora 11",
        "Video Editing",
        "Post-Production",
        "Color Grading",
      ],
    },
  ];

  const [resumeUrl, setResumeUrl] = useState<string>(
    "https://drive.google.com/file/d/1TXMVWEfulEjQeO3Mt3o-pbQuHW4mI08z/view?usp=sharing"
  );

  useEffect(() => {
    fetch("/api/resumes")
      .then((res) => res.json())
      .then((data) => {
        if (data.defaultResume?.fileUrl) {
          setResumeUrl(data.defaultResume.fileUrl);
        }
      })
      .catch(() => {});
  }, []);

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

      {/* Main Content matching original layout with format preserved */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bio Narrative, Experience Timeline & Certifications */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Name Headline & Sub-headline */}
            <h2 className="text-4xl md:text-5xl font-extrabold font-[var(--font-lato)] text-white mb-1.5 leading-tight">
              Muhammad Sajib
            </h2>
            <p className="text-2xl font-bold font-[var(--font-lato)] text-[#06ACFE] mb-6">
              Product Designer
            </p>

            {/* Bio Paragraphs */}
            <p className="text-[#8e8e93] text-base font-[var(--font-inter)] leading-relaxed mb-6 max-w-xl text-left">
              I am a Designer specialized in product strategy, user-centered interface architecture, design systems, and cross-functional team leadership. I partner with founders, engineering teams, and product leaders to translate complex workflows into intuitive, high-converting digital products.
            </p>

            <p className="text-[#8e8e93] text-base font-[var(--font-inter)] leading-relaxed mb-8 max-w-xl text-left">
              With hands-on experience spanning product management, usability testing, graphic design, and front-end development, I approach every digital challenge with a 360-degree perspective &mdash; combining business viability with aesthetic elegance and seamless usability.
            </p>

            {/* Download Resume Button */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                fetch("/api/resumes/download", { method: "POST" }).catch(() => {});
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[4px] bg-[#181d28] text-[#8e8e93] font-medium font-[var(--font-lato)] text-sm hover:bg-[#202736] hover:text-white transition-all shadow-md mb-14"
            >
              Download
              <Download className="w-4 h-4 text-[#06ACFE]" />
              <span className="text-[#06ACFE] font-bold">Resume</span>
            </a>

            {/* 1. PROFESSIONAL EXPERIENCE SECTION */}
            <div className="w-full mb-16">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-4 h-4 text-[#06ACFE]" />
                <h3 className="text-[#06ACFE] text-sm font-bold font-[var(--font-lato)] uppercase tracking-wider">
                  Professional Experience
                </h3>
              </div>
              <div className="border-b border-white/10 mb-8" />

              <div className="flex flex-col">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 pb-8 mb-8 border-b border-white/10 last:border-b-0 last:pb-0 last:mb-0"
                  >
                    {/* Role Title & Organization */}
                    <div className="sm:w-48 shrink-0 pt-0.5">
                      <span className="text-white font-bold font-[var(--font-lato)] text-base block leading-snug">
                        {exp.role}
                      </span>
                      <span className="text-[#06ACFE] text-xs font-semibold font-[var(--font-inter)] block mt-0.5">
                        {exp.company}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1">
                      <p className="text-[#71717a] text-xs font-mono mb-2">
                        {exp.date}
                      </p>
                      <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed mb-3">
                        {exp.desc}
                      </p>

                      {/* Key Highlights / Bullet Focus */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3.5 text-xs text-zinc-300 font-[var(--font-inter)]">
                          {exp.highlights.map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#06ACFE] shrink-0" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <span className="text-[#71717a] text-xs font-semibold font-[var(--font-inter)] mb-2 block">
                        Main Skills
                      </span>

                      {/* Skills Pills (No hover color change) */}
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

            {/* 2. TRAINING AND CERTIFICATION SECTION */}
            <div className="w-full">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-4 h-4 text-[#06ACFE]" />
                <h3 className="text-[#06ACFE] text-sm font-bold font-[var(--font-lato)] uppercase tracking-wider">
                  Training &amp; Certification
                </h3>
              </div>
              <div className="border-b border-white/10 mb-8" />

              <div className="flex flex-col">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 pb-8 mb-8 border-b border-white/10 last:border-b-0 last:pb-0 last:mb-0"
                  >
                    {/* Course Title & Institution */}
                    <div className="sm:w-48 shrink-0 pt-0.5">
                      <span className="text-white font-bold font-[var(--font-lato)] text-base block leading-snug">
                        {cert.title}
                      </span>
                      <span className="text-[#06ACFE] text-xs font-semibold font-[var(--font-inter)] block mt-0.5">
                        {cert.institution}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1">
                      <p className="text-[#71717a] text-xs font-mono mb-2">
                        {cert.year}
                      </p>
                      <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed mb-3.5">
                        <strong className="text-white font-medium">Focus:</strong>{" "}
                        {cert.focus}
                      </p>

                      <span className="text-[#71717a] text-xs font-semibold font-[var(--font-inter)] mb-2 block">
                        Core Competencies
                      </span>

                      {/* Certification Focus Pills (No hover color change) */}
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, sIdx) => (
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

          {/* Right Column: About Me Portrait Image sticky & perfectly framed */}
          <div className="lg:col-span-5 flex justify-center sticky top-24 -mt-8 md:-mt-14">
            <div className="w-full max-w-[500px]">
              <Image
                src="/assets/about me image.png"
                alt="Muhammad Sajib - Product Designer"
                width={500}
                height={680}
                sizes="(max-width: 768px) 100vw, 500px"
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
