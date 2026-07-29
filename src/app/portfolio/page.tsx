"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import { ChevronRight, ArrowRight } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  tag: string;
  category: string;
  impactPill: string;
  summary: string;
  image: string;
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const portfolioItems: PortfolioItem[] = [
    {
      id: "dwelio",
      title: "Dwelio - A Modern Real Estate Experience",
      tag: "AI & Machine learning",
      category: "realestate",
      impactPill: "+64% Conversion",
      summary:
        "UX/UI Case Study: End-to-end user research, wireframing, and tokenized Figma design system for a mobile real estate platform.",
      image: "/assets/screen_8_168.png",
    },
    {
      id: "dwelio",
      title: "Dwelio IT Solutions - Enterprise Dashboard",
      tag: "IT Solutions",
      category: "itsolutions",
      impactPill: "+85% Ops Efficiency",
      summary:
        "UX/UI Case Study: Enterprise multi-tenant dashboard system, data visualization design, and cloud monitoring workflow.",
      image: "/assets/screen_8_170.png",
    },
    {
      id: "triply",
      title: "Triply - Easy Booking for Dream Trips",
      tag: "Travel",
      category: "automotive",
      impactPill: "3.2x Booking Rate",
      summary:
        "UX/UI Case Study: All-inclusive trip planner app redesigned for mobile travelers with friction-free booking flows.",
      image: "/assets/project_triply_exact.png",
    },
    {
      id: "plate",
      title: "Plate - Transform Your Dining Experience",
      tag: "Restaurant",
      category: "edtech",
      impactPill: "+140% Orders",
      summary:
        "UX/UI Case Study: Premium dining & restaurant mobile app with real-time table reservations and digital menu ordering.",
      image: "/assets/project_plate_exact.png",
    },
    {
      id: "yenex",
      title: "Yenex - Reducing Carbon Footprints",
      tag: "SaaS Energy",
      category: "saas",
      impactPill: "4.8 User Rating",
      summary:
        "UX/UI Case Study: Sustainable energy monitoring SaaS platform empowering households and businesses to track carbon metrics.",
      image: "/assets/project_yenex_exact.png",
    },
    {
      id: "fitmate",
      title: "Fitmate - Revolutionize Fitness Goals",
      tag: "Healthcare",
      category: "healthcare",
      impactPill: "50k+ Active Members",
      summary:
        "UX/UI Case Study: Mobile fitness tracking and gym pass platform with AI-driven workout recommendations.",
      image: "/assets/project_fitmate_exact.png",
    },
  ];

  const filterCategories = [
    { label: "Explore All", value: "all" },
    { label: "Automotive", value: "automotive" },
    { label: "Beauty & Cosmetics", value: "beauty" },
    { label: "Business Consulting", value: "consulting" },
    { label: "Construction", value: "construction" },
    { label: "EdTech", value: "edtech" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Fashion & Apparel", value: "fashion" },
    { label: "Fintech", value: "fintech" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner using Top Heading.png as background (Exact Alignment) */}
      <section
        className="relative pt-36 pb-16 px-6 md:px-12 bg-center bg-cover bg-no-repeat border-b border-white/5 overflow-hidden"
        style={{ backgroundImage: `url('/assets/Top Heading.png')` }}
      >
        <div className="max-w-7xl mx-auto text-left relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[4px] bg-[#06ACFE]/10 border border-[#06ACFE]/30 text-[#06ACFE] text-sm font-bold font-[var(--font-lato)] mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>Portfolio</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-[var(--font-lato)] leading-tight text-white mb-2">
            Portfolio
          </h1>
        </div>
      </section>

      {/* Main Portfolio Showcase matching alignment with "Portfolio" header */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Horizontal Filter Pills aligned to left margin */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-12 no-scrollbar w-full">
          {filterCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-[4px] font-semibold font-[var(--font-lato)] text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeFilter === cat.value
                  ? "bg-[#06ACFE] text-white shadow-[0_4px_15px_rgba(6,172,254,0.35)]"
                  : "bg-[#141720] border border-white/10 text-[#8e8e93] hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2 Cards per Row Grid Layout spanning 100% total content area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full">
          {filteredItems.map((item, idx) => (
            <article
              key={idx}
              className="glass-card border border-white/5 bg-[#121826]/70 rounded-[4px] p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] w-full"
            >
              <div>
                <Link href={`/portfolio/${item.id}`} className="block relative w-full h-[280px] sm:h-[320px] md:h-[340px] rounded-[4px] overflow-hidden mb-5 bg-[#181d28]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-[4px] hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#8e8e93] font-[var(--font-inter)]">
                    {item.tag}
                  </span>
                  <span className="px-3 py-1 rounded-[4px] bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 text-[11px] font-bold font-[var(--font-lato)]">
                    {item.impactPill}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-[var(--font-lato)] text-white mb-2 leading-snug hover:text-[#06ACFE] transition-colors">
                  <Link href={`/portfolio/${item.id}`}>{item.title}</Link>
                </h2>

                <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed line-clamp-2 mb-6">
                  {item.summary}
                </p>
              </div>

              {/* View Full UX/UI Case Study Button */}
              <Link
                href={`/portfolio/${item.id}`}
                className="w-full py-3.5 rounded-[4px] bg-[#181d28] border border-white/10 text-[#06ACFE] hover:bg-[#06ACFE] hover:text-white transition-all font-bold font-[var(--font-lato)] text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md group"
              >
                View Full UX/UI Case Study Page
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-center gap-3 my-12 font-[var(--font-lato)] text-sm w-full">
          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                currentPage === pageNum
                  ? "bg-[#06ACFE] text-white shadow-md"
                  : "text-[#71717a] hover:text-white"
              }`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 5))}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#71717a] hover:text-white transition-all cursor-pointer"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
