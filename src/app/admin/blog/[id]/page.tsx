"use client";

import { useState, useEffect, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, FileText } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import SectionBlockBuilder, { ContentSection } from "@/components/admin/SectionBlockBuilder";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    tags: "",
    coverImage: "",
    readTime: "",
    published: true,
    featured: false,
  });

  const [sections, setSections] = useState<ContentSection[]>([]);

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blog) {
          const b = data.blog;
          setFormData({
            title: b.title || "",
            slug: b.slug || "",
            excerpt: b.excerpt || "",
            category: b.category || "",
            tags: b.tags || "",
            coverImage: b.coverImage || "",
            readTime: b.readTime || "",
            published: b.published ?? true,
            featured: b.featured ?? false,
          });

          // Parse content sections
          if (b.content) {
            try {
              const parsed = JSON.parse(b.content);
              if (Array.isArray(parsed)) {
                setSections(parsed);
              } else {
                setSections([
                  { id: "sec_1", title: "Article Body", description: b.content, image: "" },
                ]);
              }
            } catch {
              setSections([
                { id: "sec_1", title: "Article Body", description: b.content, image: "" },
              ]);
            }
          } else {
            setSections([
              { id: "sec_1", title: "Article Body", description: "", image: "" },
            ]);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load article details");
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      content: JSON.stringify(sections),
    };

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to update article");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError("Network error");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center text-[#8e8e93]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06ACFE] mx-auto mb-4" />
        <span>Loading article...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold font-[var(--font-lato)] text-white">
              Edit Article — {formData.title}
            </h1>
            <p className="text-xs text-[#8e8e93]">
              Update blog post content, sections, images, and metadata
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Article Meta */}
        <div className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>Article Meta</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#06ACFE]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
              Article Excerpt *
            </label>
            <textarea
              required
              rows={2}
              value={formData.excerpt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, readTime: e.target.value }))
                }
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
              />
            </div>
          </div>

          {/* Cover Image Upload Control */}
          <ImageUpload
            label="Article Cover Image"
            value={formData.coverImage}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, coverImage: url }))
            }
          />
        </div>

        {/* Dynamic Section Builder with Add Button at Top Right */}
        <SectionBlockBuilder
          label="Article Description &amp; Content Blocks"
          sections={sections}
          onChange={(newSections) => setSections(newSections)}
        />

        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/blog"
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(6,172,254,0.4)] disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
