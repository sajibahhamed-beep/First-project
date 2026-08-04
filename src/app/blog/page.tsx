"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, Clock } from "lucide-react";

interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  createdAt?: string;
  image?: string;
}

const defaultPosts: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-ui-ux-design-2026",
    title: "Building Scalable Figma Design Systems for Enterprise Tech",
    excerpt: "Learn how tokenizing colors, typography, and component variants in Figma accelerates product design velocity by 3x across global engineering teams.",
    category: "Design Systems",
    readTime: "5 min read",
    image: "/assets/blog_thumb.png",
  },
  {
    id: "2",
    slug: "building-scalable-design-systems-figma",
    title: "Mastering Auto Layout 5.0 & Variable Components",
    excerpt: "A practical breakdown of nesting auto-layout frames, absolute positioning, and dynamic fluid constraints for multi-device responsive web layouts.",
    category: "Figma",
    readTime: "7 min read",
    image: "/assets/figma_img_28.png",
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && Array.isArray(data.blogs)) {
          const mapped = data.blogs.map((b: any) => ({
            id: b.id,
            slug: b.slug,
            title: b.title,
            excerpt: b.excerpt,
            category: b.category || "Design",
            readTime: b.readTime || "5 min read",
            createdAt: b.createdAt,
            image: b.coverImage !== undefined ? b.coverImage : "",
          }));
          setPosts(mapped);
        }
      })
      .catch(() => {});
  }, []);

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
            <span>Blog &amp; Insights</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-[var(--font-lato)] leading-tight text-white mb-2">
            Blog &amp; Insights
          </h1>
          <p className="text-[#8e8e93] text-lg font-[var(--font-inter)] max-w-xl">
            Thought leadership, design systems tutorials, and UI/UX case breakdowns.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        {posts.length === 0 ? (
          <div className="py-20 text-center text-[#8e8e93]">
            <p className="text-lg font-bold mb-2 text-white">No published articles yet</p>
            <p className="text-sm">Check back soon for new design &amp; tech insights.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-[#121826]/70 rounded-[4px] overflow-hidden border border-white/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,172,254,0.15)] group"
              >
                {post.image && post.image.trim() !== "" && (
                  <div className="relative h-64 bg-[#090b0e] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="bg-[#06ACFE]/15 text-[#06ACFE] px-3 py-1 rounded-[4px] text-xs font-semibold font-[var(--font-lato)]">
                        {post.category}
                      </span>
                      <span className="text-[#71717a] text-xs flex items-center gap-1 font-[var(--font-inter)]">
                        <Clock className="w-3.5 h-3.5 text-[#06ACFE]" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title without hover text color change */}
                    <h3 className="text-2xl font-bold font-[var(--font-lato)] text-white mb-4 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-[#8e8e93] text-base font-[var(--font-inter)] leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Rectangle Button Container for Read Article */}
                  <div>
                    <Link
                      href={`/blog/${post.slug || post.id}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#181d28] hover:bg-[#06ACFE] text-white border border-white/10 font-bold font-[var(--font-lato)] text-xs transition-all duration-300 shadow-md group/btn"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
