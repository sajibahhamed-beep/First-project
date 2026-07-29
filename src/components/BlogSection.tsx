import Image from "next/image";
import Link from "next/link";

export default function BlogSection() {
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
            src="/assets/blog_thumb.png"
            alt="Nowadays Design Sector"
            width={700}
            height={400}
            className="w-full h-full object-cover block rounded-[4px]"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="lg:col-span-5 p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#06ACFE]/15 text-[#06ACFE] px-3 py-1 rounded-[4px] text-xs font-semibold font-[var(--font-lato)]">
              Design Systems
            </span>
            <span className="bg-[#06ACFE]/15 text-[#06ACFE] px-3 py-1 rounded-[4px] text-xs font-semibold font-[var(--font-lato)]">
              Figma
            </span>
            <span className="text-[#71717a] text-xs font-[var(--font-inter)]">24 Jan 2026</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white mb-4">
            Building Scalable Figma Design Systems for Enterprise Tech
          </h3>
          <p className="text-[#8e8e93] text-base font-[var(--font-inter)] leading-relaxed mb-6">
            Learn how tokenizing colors, typography, and component variants in Figma accelerates product design velocity by 3x across global engineering teams.
          </p>

          <Link
            href="/blog/1"
            className="text-[#06ACFE] font-bold font-[var(--font-lato)] hover:underline inline-flex items-center gap-1"
          >
            Read Article →
          </Link>
        </div>
      </div>
    </section>
  );
}
