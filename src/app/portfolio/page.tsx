"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import { ChevronRight, ArrowRight } from "lucide-react";

interface PortfolioItem {
  id: string;
  slug?: string;
  title: string;
  tag: string;
  category: string;
  impactPill: string;
  summary: string;
  image: string;
}

const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: "triply",
    slug: "triply",
    title: "Triply - Easy Booking for Dream Trips",
    tag: "Travel",
    category: "travel",
    impactPill: "3.2x Booking Rate",
    summary: "UX/UI Case Study: All-inclusive trip planner app redesigned for mobile travelers with friction-free booking flows.",
    image: "/assets/project_triply_exact.png",
  },
  {
    id: "plate",
    slug: "plate",
    title: "Plate - Transform Your Dining Experience",
    tag: "Restaurant",
    category: "restaurant",
    impactPill: "+140% Orders",
    summary: "UX/UI Case Study: Curated restaurant discovery and table reservation mobile application.",
    image: "/assets/project_plate_exact.png",
  },
  {
    id: "yenex",
    slug: "yenex",
    title: "Yenex - SaaS Financial Dashboard & Analytics",
    tag: "SaaS",
    category: "saas",
    impactPill: "4.8 Rating",
    summary: "UX/UI Case Study: Smart energy and SaaS analytics dashboard simplifying complex enterprise data.",
    image: "/assets/project_yenex_exact.png",
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(defaultPortfolioItems);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && data.projects.length > 0) {
          const mapped = data.projects.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            tag: p.categoryTag || "General",
            category: p.category || "all",
            impactPill: p.impactPill || "Case Study",
            summary: p.shortDesc,
            image: p.heroImage || "/assets/project_triply_exact.png",
          }));
          setPortfolioItems(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner */}
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
            <span>Portfolio</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-[var(--font-lato)] leading-tight text-white mb-2">
            Portfolio Showcase
          </h1>
          <p className="text-[#8e8e93] text-lg font-[var(--font-inter)] max-w-xl">
            Explore my selected UI/UX design case studies, design systems, and mobile applications.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-[#121826]/70 rounded-[4px] overflow-hidden border border-white/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,172,254,0.15)] group"
            >
              <div className="relative h-64 bg-[#090b0e] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase text-[#06ACFE] font-[var(--font-lato)]">
                      {item.tag}
                    </span>
                    <span className="bg-[#10b981]/15 text-[#10b981] px-2.5 py-0.5 rounded-[4px] text-[11px] font-bold">
                      {item.impactPill}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-[var(--font-lato)] text-white mb-3 group-hover:text-[#06ACFE] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed mb-6 line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <Link
                  href={`/portfolio/${item.slug || item.id}`}
                  className="inline-flex items-center gap-2 text-[#06ACFE] font-bold font-[var(--font-lato)] text-sm hover:underline"
                >
                  <span>View Full Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
