"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishedAt?: string;
  createdAt?: string;
}

export default function BlogSection() {
  const [featuredBlog, setFeaturedBlog] = useState<BlogItem>({
    id: "1",
    slug: "future-of-ui-ux-design-2026",
    title: "Building Scalable Figma Design Systems for Enterprise Tech",
    excerpt: "Learn how tokenizing colors, typography, and component variants in Figma accelerates product design velocity by 3x across global engineering teams.",
    category: "Design Systems",
    coverImage: "/assets/blog_thumb.png",
  });

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && data.blogs.length > 0) {
          setFeaturedBlog(data.blogs[0]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="blog" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold font-[var(--font-lato)] text-white">
          Blogs
        </h2>
      </div>

      <div className="glass-card rounded-[4px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center border border-white/10">
        <div className="lg:col-span-7 h-full min-h-[300px] rounded-[4px] overflow-hidden">
          <Image
            src={featuredBlog.coverImage || "/assets/blog_thumb.png"}
            alt={featuredBlog.title}
            width={700}
            height={400}
            className="w-full h-full object-cover block rounded-[4px]"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="lg:col-span-5 p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#06ACFE]/15 text-[#06ACFE] px-3 py-1 rounded-[4px] text-xs font-semibold font-[var(--font-lato)]">
              {featuredBlog.category}
            </span>
            <span className="text-[#71717a] text-xs font-[var(--font-inter)]">
              {new Date(featuredBlog.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white mb-4">
            {featuredBlog.title}
          </h3>
          <p className="text-[#8e8e93] text-base font-[var(--font-inter)] leading-relaxed mb-6">
            {featuredBlog.excerpt}
          </p>

          <Link
            href={`/blog/${featuredBlog.slug || featuredBlog.id}`}
            className="text-[#06ACFE] font-bold font-[var(--font-lato)] hover:underline inline-flex items-center gap-1"
          >
            Read Article →
          </Link>
        </div>
      </div>
    </section>
  );
}
