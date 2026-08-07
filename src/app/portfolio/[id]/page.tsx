"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  ShieldCheck,
  Sparkles,
  Search,
  Compass,
  Palette,
  TrendingUp,
} from "lucide-react";
import { ContentSection } from "@/components/admin/SectionBlockBuilder";

interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  impactPill: string;
  pages: string;
  duration: string;
  role: string;
  tools: string;
  summary: string;
  overview: string;
  overviewSections?: ContentSection[];
  problem: string;
  researchImage?: string;
  researchText?: string;
  wireframeImage?: string;
  wireframeText?: string;
  designSystemImage?: string;
  designSystemText?: string;
  solution?: string;
  results: string[];
  heroImage?: string;
  screens: string[];
  nextId: string;
  nextTitle: string;
}

const staticCaseStudies: Record<string, CaseStudyData> = {
  triply: {
    id: "triply",
    title: "Triply — Easy Booking for Dream Trips",
    subtitle: "End-to-End Travel Planning & Tour Booking UX Case Study",
    tag: "Travel & Hospitality",
    tagColor: "text-[#06ACFE]",
    impactPill: "3.2x Booking Rate",
    pages: "40+ Screens",
    duration: "2.5 Months",
    role: "Lead UI/UX Designer",
    tools: "Figma, React, Tailwind CSS",
    summary:
      "A complete UX redesign of Triply's mobile travel platform that streamlined itinerary discovery, simplified multi-destination checkout flows, and boosted booking completion by 3.2x.",
    overview:
      "Triply is an all-inclusive travel planning and booking ecosystem designed for modern explorers.",
    overviewSections: [
      {
        id: "sec_1",
        title: "Executive Overview & Discovery",
        description: "Triply consolidates flights, accommodation, local guided tours, and custom travel itineraries into a single friction-free mobile experience.",
        image: "/assets/figma_img_23.png",
      },
    ],
    problem:
      "Travelers frequently dropped off during multi-destination package checkouts due to cluttered filters, hidden add-on fees, unoptimized mobile navigation, and confusing itinerary confirmation steps.",
    results: [
      "Multi-destination checkout completion rate multiplied by 3.2x",
      "Achieved 4.9/5 user rating across 15,000+ travel reviews",
      "Reduced mobile onboarding drop-off rate by 38%",
      "Engineered 100% responsive design tokens synced across iOS & Web",
    ],
    heroImage: "/assets/project_triply_exact.png",
    screens: [
      "/assets/figma_img_23.png",
      "/assets/figma_img_24.png",
      "/assets/screen_8_168.png",
    ],
    nextId: "plate",
    nextTitle: "Plate — Transform Your Dining Experience",
  },
};

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const caseStudyId = resolvedParams.id || "triply";

  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${caseStudyId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.project) {
          const p = data.project;
          const cs = p.caseStudy || {};

          let parsedSections: ContentSection[] | null = null;
          if (cs.overview) {
            try {
              const parsed = JSON.parse(cs.overview);
              if (Array.isArray(parsed)) {
                parsedSections = parsed;
              }
            } catch {
              parsedSections = null;
            }
          }

          let resultsArr: string[] = [];
          if (cs.results) {
            try {
              resultsArr = typeof cs.results === "string" ? JSON.parse(cs.results) : cs.results;
            } catch {
              resultsArr = [cs.results];
            }
          }

          let screensArr: string[] = [];
          if (cs.screens) {
            try {
              screensArr = typeof cs.screens === "string" ? JSON.parse(cs.screens) : cs.screens;
            } catch {
              screensArr = [cs.screens];
            }
          }
          // Filter out empty strings in screens
          screensArr = screensArr.filter((s) => s && s.trim() !== "");

          const nextProjId = data.nextProject ? (data.nextProject.slug || data.nextProject.id) : "";
          const nextProjTitle = data.nextProject ? data.nextProject.title : "Back to Portfolio Showcase";

          setCaseStudy({
            id: p.id,
            title: p.title,
            subtitle: cs.subtitle || p.shortDesc || "UI/UX Case Study Breakdown",
            tag: p.categoryTag || "UI/UX Design",
            tagColor: p.tagColor || "text-[#06ACFE]",
            impactPill: p.impactPill || "High Impact",
            pages: p.pages || "20+ Screens",
            duration: p.duration || "2 Months",
            role: p.role || "Lead Designer",
            tools: p.tools || "Figma, React",
            summary: cs.summary || p.shortDesc,
            overview: typeof cs.overview === "string" && !parsedSections ? cs.overview : p.shortDesc,
            overviewSections: parsedSections || undefined,
            problem: cs.problem || "Initial user research revealed key friction points in navigation and feature discoverability.",
            researchImage: cs.researchImage && cs.researchImage.trim() !== "" ? cs.researchImage : undefined,
            researchText: cs.researchText,
            wireframeImage: cs.wireframeImage && cs.wireframeImage.trim() !== "" ? cs.wireframeImage : undefined,
            wireframeText: cs.wireframeText,
            designSystemImage: cs.designSystemImage && cs.designSystemImage.trim() !== "" ? cs.designSystemImage : undefined,
            designSystemText: cs.designSystemText,
            solution: cs.solution,
            results: resultsArr,
            heroImage: p.heroImage && p.heroImage.trim() !== "" ? p.heroImage : undefined,
            screens: screensArr,
            nextId: nextProjId,
            nextTitle: nextProjTitle,
          });
        } else if (staticCaseStudies[caseStudyId]) {
          setCaseStudy(staticCaseStudies[caseStudyId]);
        } else {
          setCaseStudy(staticCaseStudies.triply);
        }
      })
      .catch(() => {
        if (staticCaseStudies[caseStudyId]) {
          setCaseStudy(staticCaseStudies[caseStudyId]);
        } else {
          setCaseStudy(staticCaseStudies.triply);
        }
      })
      .finally(() => setLoading(false));
  }, [caseStudyId]);

  if (loading || !caseStudy) {
    return (
      <main className="relative min-h-screen bg-[#090b0e] text-white flex items-center justify-center">
        <div className="text-center text-[#8e8e93]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06ACFE] mx-auto mb-4" />
          <span>Loading case study...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner */}
      <section
        className="relative pt-36 pb-20 px-6 md:px-12 bg-center bg-cover bg-no-repeat border-b border-white/5 overflow-hidden"
        style={{ backgroundImage: `url('/assets/Top Heading.png')` }}
      >
        <div className="max-w-7xl mx-auto text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[4px] bg-[#06ACFE]/10 border border-[#06ACFE]/30 text-[#06ACFE] text-sm font-bold font-[var(--font-lato)] mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:underline">
              Portfolio
            </Link>
            <span>/</span>
            <span>{caseStudy.tag}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-[var(--font-lato)] leading-tight text-white mb-3 max-w-4xl">
            {caseStudy.title}
          </h1>

          <p className="text-[#8e8e93] text-lg font-[var(--font-inter)] max-w-2xl leading-relaxed">
            {caseStudy.subtitle}
          </p>
        </div>
      </section>

      {/* Main Case Study Article Body */}
      <article className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Back Link & Impact Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[#06ACFE] font-bold font-[var(--font-lato)] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Portfolio Case Studies
          </Link>

          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-bold uppercase font-[var(--font-lato)] ${caseStudy.tagColor}`}
            >
              {caseStudy.tag}
            </span>
            <span className="px-4 py-1.5 rounded-[4px] bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 text-xs font-bold font-[var(--font-lato)]">
              {caseStudy.impactPill}
            </span>
          </div>
        </div>

        {/* Hero Showcase Image (ONLY rendered if present & non-empty) */}
        {caseStudy.heroImage && (
          <div className="relative w-full h-[340px] sm:h-[480px] md:h-[560px] rounded-[4px] overflow-hidden mb-16 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] bg-[#141720]">
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Project Metadata Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-[4px] bg-[#121826] border border-white/10 mb-20 shadow-lg">
          <div>
            <span className="block text-[#71717a] text-xs uppercase font-[var(--font-inter)] mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#06ACFE]" />
              Screens Delivered
            </span>
            <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
              {caseStudy.pages}
            </span>
          </div>
          <div>
            <span className="block text-[#71717a] text-xs uppercase font-[var(--font-inter)] mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#06ACFE]" />
              Timeline
            </span>
            <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
              {caseStudy.duration}
            </span>
          </div>
          <div>
            <span className="block text-[#71717a] text-xs uppercase font-[var(--font-inter)] mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#06ACFE]" />
              My Role
            </span>
            <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
              {caseStudy.role}
            </span>
          </div>
          <div>
            <span className="block text-[#71717a] text-xs uppercase font-[var(--font-inter)] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#06ACFE]" />
              Tech Stack
            </span>
            <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
              {caseStudy.tools}
            </span>
          </div>
        </div>

        {/* Dynamic Case Study Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          <div className="lg:col-span-8 space-y-16 font-[var(--font-inter)] text-[#8e8e93]">
            {/* Dynamic Section Blocks */}
            {caseStudy.overviewSections && caseStudy.overviewSections.length > 0 ? (
              <div className="space-y-12">
                {caseStudy.overviewSections.map((sec, idx) => (
                  <div key={sec.id || idx} className="space-y-4 pt-4 border-t border-white/10 first:border-0 first:pt-0">
                    {sec.title && sec.title.trim() !== "" && (
                      <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                        {sec.title}
                      </h2>
                    )}
                    {sec.description && sec.description.trim() !== "" && (
                      <p className="leading-relaxed text-base text-zinc-300 whitespace-pre-line">
                        {sec.description}
                      </p>
                    )}
                    {sec.image && sec.image.trim() !== "" && (
                      <div className="my-6 rounded-[4px] overflow-hidden border border-white/10 relative h-[360px] sm:h-[460px] bg-[#141720] shadow-lg">
                        <Image
                          src={sec.image}
                          alt={sec.title || caseStudy.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback static overview */
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                  Executive Summary &amp; Overview
                </h2>
                <p className="text-lg leading-relaxed text-zinc-300">
                  {caseStudy.summary}
                </p>
                <p className="leading-relaxed text-base text-[#8e8e93]">
                  {caseStudy.overview}
                </p>
              </div>
            )}

            {/* Problem Statement */}
            {caseStudy.problem && caseStudy.problem.trim() !== "" && (
              <div className="border-t border-white/10 pt-10 space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                  Problem Statement &amp; Pain Points
                </h2>
                <div className="bg-[#141720] p-6 rounded-[4px] border border-white/10 border-l-4 border-l-[#06ACFE]">
                  <p className="leading-relaxed text-base text-zinc-200">
                    {caseStudy.problem}
                  </p>
                </div>
              </div>
            )}

            {/* Usability Metrics / Results */}
            {caseStudy.results && caseStudy.results.length > 0 && (
              <div className="border-t border-white/10 pt-10 space-y-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-[#10b981]" />
                  <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                    Usability Metrics &amp; Key Results
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.results.map((result, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-[4px] bg-[#141824] border border-white/10 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold font-[var(--font-lato)] text-white leading-snug">
                        {result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Case Study Sidebar Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="glass-card border border-white/10 p-8 rounded-[4px] bg-[#121826]/90 space-y-6 shadow-xl">
              <h3 className="text-xl font-extrabold font-[var(--font-lato)] text-white">
                Project Highlights
              </h3>

              <div className="space-y-4 text-sm font-[var(--font-inter)]">
                <div className="flex items-center gap-3 text-zinc-300">
                  <ShieldCheck className="w-5 h-5 text-[#06ACFE]" />
                  <span>100% Client NDA Compliant</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-[#06ACFE]" />
                  <span>Figma Auto Layout 5.0 Tokens</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-[#06ACFE]" />
                  <span>Full Design-to-Code Parity</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="w-full py-4 rounded-[4px] bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold font-[var(--font-lato)] text-sm transition-all shadow-[0_4px_20px_rgba(6,172,254,0.4)] flex items-center justify-center gap-2"
                >
                  Book a Call to Discuss Similar Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* High-Resolution Screen Gallery (ONLY rendered if images exist) */}
        {caseStudy.screens && caseStudy.screens.length > 0 && (
          <div className="space-y-10 mb-24">
            <h2 className="text-3xl font-extrabold font-[var(--font-lato)] text-white text-center">
              Detailed Screen Mockups &amp; UI Showcase
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.screens.map((screenImg, index) => (
                <div
                  key={index}
                  className="relative w-full h-[360px] rounded-[4px] overflow-hidden border border-white/10 shadow-lg bg-[#141720]"
                >
                  <Image
                    src={screenImg}
                    alt={`${caseStudy.title} Screen ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Case Study Navigation */}
        <div className="p-10 rounded-[4px] bg-gradient-to-r from-[#121826] to-[#090b0e] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[#71717a] text-xs uppercase tracking-wider block font-[var(--font-inter)] mb-1">
              Next Case Study
            </span>
            <h3 className="text-2xl font-bold font-[var(--font-lato)] text-white">
              {caseStudy.nextTitle}
            </h3>
          </div>

          <Link
            href={`/portfolio/${caseStudy.nextId}`}
            className="px-8 py-4 rounded-[4px] bg-[#181d28] hover:bg-[#222838] border border-white/10 text-white font-bold font-[var(--font-lato)] text-sm transition-all flex items-center gap-3 shrink-0"
          >
            Read Next Case Study
            <ArrowRight className="w-4 h-4 text-[#06ACFE]" />
          </Link>
        </div>
      </article>

      <CtaSection />
      <Footer />
    </main>
  );
}
