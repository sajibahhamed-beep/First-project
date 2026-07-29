"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, Clock, User } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable Figma Design Systems for Enterprise Tech",
      excerpt:
        "Learn how tokenizing colors, typography, and component variants in Figma accelerates product design velocity by 3x across global engineering teams.",
      category: "Design Systems",
      date: "Jan 24, 2026",
      readTime: "5 min read",
      image: "/assets/blog_thumb.png",
    },
    {
      id: 2,
      title: "Mastering Auto Layout 5.0 & Variable Components",
      excerpt:
        "A practical breakdown of nesting auto-layout frames, absolute positioning, and dynamic fluid constraints for multi-device responsive web layouts.",
      category: "Figma",
      date: "Jan 18, 2026",
      readTime: "7 min read",
      image: "/assets/figma_img_29.png",
    },
    {
      id: 3,
      title: "UX Research Best Practices for High-Converting SaaS Dashboards",
      excerpt:
        "How qualitative user testing and friction analysis helped increase dashboard retention and onboarding completion rates by 40% in B2B applications.",
      category: "Case Studies",
      date: "Jan 12, 2026",
      readTime: "6 min read",
      image: "/assets/figma_img_38.png",
    },
    {
      id: 4,
      title: "The Psychology of Micro-Interactions in Mobile Apps",
      excerpt:
        "Exploring sub-conscious haptic feedback, subtle animations, and loading states that delight users and create memorable mobile app experiences.",
      category: "UI Trends",
      date: "Jan 05, 2026",
      readTime: "4 min read",
      image: "/assets/figma_img_43.png",
    },
    {
      id: 5,
      title: "Design System Governance: Keeping Figma & Code in Sync",
      excerpt:
        "Bridging the gap between Figma component libraries and React Tailwind UI kits through automated design token pipelines and Git workflows.",
      category: "Design Systems",
      date: "Dec 28, 2025",
      readTime: "8 min read",
      image: "/assets/figma_img_50.png",
    },
    {
      id: 6,
      title: "How to Structure Product Presentations That Win Stakeholders",
      excerpt:
        "Frameworks and visual storytelling techniques Sajib uses to present complex UI/UX rationale to CEOs, product leads, and investors.",
      category: "Case Studies",
      date: "Dec 15, 2025",
      readTime: "6 min read",
      image: "/assets/figma_img_51.png",
    },
  ];

  const categories = [
    { label: "All Posts", value: "all" },
    { label: "Design Systems", value: "Design Systems" },
    { label: "Figma", value: "Figma" },
    { label: "Case Studies", value: "Case Studies" },
    { label: "UI Trends", value: "UI Trends" },
  ];

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

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
            <span>Blog</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-[var(--font-lato)] leading-tight text-white mb-2">
            Blog &amp; Insights
          </h1>
        </div>
      </section>

      {/* Main Blog Content */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-[4px] font-semibold font-[var(--font-lato)] text-sm transition-all duration-200 cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-[#06ACFE] text-white shadow-[0_4px_15px_rgba(6,172,254,0.3)]"
                  : "bg-white/5 border border-white/10 text-[#8e8e93] hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="glass-card border-none rounded-[4px] overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <div>
                <Link href={`/blog/${post.id}`} className="block relative w-full h-52 overflow-hidden bg-[#141720]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                <div className="p-7">
                  <div className="flex items-center gap-4 text-[#71717a] text-xs font-[var(--font-inter)] mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#06ACFE]" />
                      Sajib
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-[var(--font-lato)] text-white mb-3 leading-snug hover:text-[#06ACFE] transition-colors cursor-pointer">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>

                  <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed mb-6 text-justify">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7">
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-[#06ACFE] font-bold font-[var(--font-lato)] text-sm hover:underline group"
                >
                  Read Full Article
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
