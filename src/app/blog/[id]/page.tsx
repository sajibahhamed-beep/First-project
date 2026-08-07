"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { ContentSection } from "@/components/admin/SectionBlockBuilder";

interface ArticleData {
  id: string | number;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  heroImage?: string;
  sections?: ContentSection[];
  contentParagraphs?: string[];
  nextId: string | number;
  nextTitle: string;
}

const staticArticles: Record<string, ArticleData> = {
  "1": {
    id: 1,
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    subtitle: "A comprehensive analysis of how design systems, AI tools, and remote workflows reshape modern enterprise engineering teams.",
    category: "Technology",
    author: "Muhammad Sajib",
    authorRole: "Lead Product Designer & Founder",
    date: "August 20, 2026",
    readTime: "5 min read",
    heroImage: "/assets/blog_thumb.png",
    sections: [
      {
        id: "s1",
        title: "Research Your Destination",
        description: "Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately.",
        image: "/assets/figma_img_29.png",
      },
      {
        id: "s2",
        title: "Plan Your Itinerary",
        description: "While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget.",
        image: "",
      },
    ],
    nextId: "2",
    nextTitle: "Mastering Auto Layout 5.0 & Variable Components",
  },
};

export default function BlogArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const paramId = resolvedParams.id;

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${paramId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blog) {
          const b = data.blog;
          let parsedSections: ContentSection[] | null = null;
          let plainParagraphs: string[] = [];

          if (b.content) {
            try {
              const parsed = JSON.parse(b.content);
              if (Array.isArray(parsed)) {
                parsedSections = parsed;
              }
            } catch {
              plainParagraphs = b.content
                .split("\n\n")
                .map((p: string) => p.trim())
                .filter((p: string) => p.length > 0);
            }
          }

          const nextId = data.nextBlog ? (data.nextBlog.slug || data.nextBlog.id) : "";
          const nextTitle = data.nextBlog ? data.nextBlog.title : "Back to Blog Feed";

          setArticle({
            id: b.id,
            title: b.title,
            subtitle: b.excerpt,
            category: b.category || "Design",
            author: "Muhammad Sajib",
            authorRole: "Lead Product Designer & Founder",
            date: new Date(b.publishedAt || b.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            readTime: b.readTime || "5 min read",
            heroImage: b.coverImage && b.coverImage.trim() !== "" ? b.coverImage : undefined,
            sections: parsedSections || undefined,
            contentParagraphs: plainParagraphs.length > 0 ? plainParagraphs : undefined,
            nextId: nextId,
            nextTitle: nextTitle,
          });
        } else if (staticArticles[paramId]) {
          setArticle(staticArticles[paramId]);
        } else {
          setArticle(staticArticles["1"]);
        }
      })
      .catch(() => {
        if (staticArticles[paramId]) {
          setArticle(staticArticles[paramId]);
        } else {
          setArticle(staticArticles["1"]);
        }
      })
      .finally(() => setLoading(false));
  }, [paramId]);

  if (loading || !article) {
    return (
      <main className="relative min-h-screen bg-[#090b0e] text-white flex items-center justify-center">
        <div className="text-center text-[#8e8e93]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06ACFE] mx-auto mb-4" />
          <span>Loading article...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />

      {/* Header Container matching Navbar max-w-7xl width */}
      <section className="pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#06ACFE] font-bold font-[var(--font-lato)] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>
        </div>

        {/* Category Pill Tag */}
        <div className="mb-4">
          <span className="bg-[#06ACFE] text-white font-bold text-xs px-3.5 py-1.5 rounded-[4px] font-[var(--font-lato)] shadow-sm inline-block">
            {article.category}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[var(--font-lato)] leading-tight text-white mb-6 max-w-4xl">
          {article.title}
        </h1>

        {/* Author Avatar & Date Meta Row */}
        <div className="flex items-center gap-3 text-sm font-[var(--font-inter)] text-[#8e8e93] pb-2">
          <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0 border border-white/20 bg-[#141720]">
            <Image
              src="/assets/about me image.png"
              alt={article.author}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-white font-medium font-[var(--font-lato)]">
            {article.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#8e8e93]" />
            {article.date}
          </span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
      </section>

      {/* Main Hero Cover Image (ONLY rendered if present & non-empty) */}
      {article.heroImage && (
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
          <div className="relative w-full h-[340px] sm:h-[480px] md:h-[540px] rounded-[12px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] bg-[#141720]">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Main Article Body */}
      <article className="pb-20 px-6 md:px-12 max-w-7xl mx-auto font-[var(--font-inter)] text-[#8e8e93] text-base leading-relaxed">
        {/* Subtitle / Excerpt */}
        {article.subtitle && (
          <p className="text-lg text-zinc-300 font-medium leading-relaxed mb-8">
            {article.subtitle}
          </p>
        )}

        {/* Render Dynamic Section Blocks */}
        {article.sections && article.sections.length > 0 ? (
          <div className="space-y-10">
            {article.sections.map((sec, idx) => (
              <div key={sec.id || idx} className="space-y-4">
                {sec.title && sec.title.trim() !== "" && (
                  <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white pt-4">
                    {sec.title}
                  </h2>
                )}
                {sec.description && sec.description.trim() !== "" && (
                  <p className="text-[#8e8e93] text-base leading-relaxed whitespace-pre-line">
                    {sec.description}
                  </p>
                )}
                {sec.image && sec.image.trim() !== "" && (
                  <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] rounded-[12px] overflow-hidden my-6 border border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.6)] bg-[#141720]">
                    <Image
                      src={sec.image}
                      alt={sec.title || article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Fallback Plain Paragraphs */
          article.contentParagraphs?.map((para, idx) => (
            <div key={idx} className="mb-6">
              {para.startsWith("## ") ? (
                <h2 className="text-2xl font-extrabold font-[var(--font-lato)] text-white mt-8 mb-4">
                  {para.replace("## ", "")}
                </h2>
              ) : para.startsWith("### ") ? (
                <h3 className="text-xl font-bold font-[var(--font-lato)] text-[#06ACFE] mt-6 mb-3">
                  {para.replace("### ", "")}
                </h3>
              ) : (
                <p className="text-[#8e8e93] text-base leading-relaxed">{para}</p>
              )}
            </div>
          ))
        )}

        {/* Next Article Banner Navigation */}
        <div className="p-8 rounded-[4px] bg-[#121826] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mt-16">
          <div>
            <span className="text-[#71717a] text-xs uppercase tracking-wider block font-[var(--font-inter)] mb-1">
              Read Next Article
            </span>
            <h4 className="text-xl font-bold font-[var(--font-lato)] text-white">
              {article.nextTitle}
            </h4>
          </div>

          <Link
            href={`/blog/${article.nextId}`}
            className="px-6 py-3.5 rounded-[4px] bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold font-[var(--font-lato)] text-sm transition-all flex items-center gap-2 shrink-0 shadow-md"
          >
            Read Article
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>

      <CtaSection />
      <Footer />
    </main>
  );
}
