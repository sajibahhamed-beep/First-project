"use client";

import { useState, useEffect, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, FolderKanban, Trash2 } from "lucide-react";

export default function EditProjectPage({
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
    shortDesc: "",
    category: "travel",
    categoryTag: "Travel & Hospitality",
    impactPill: "",
    pages: "",
    duration: "",
    role: "",
    tools: "",
    heroImage: "",
    liveUrl: "",
    githubUrl: "",
    behanceUrl: "",
    dribbbleUrl: "",
    figmaUrl: "",
    featured: false,
    published: true,
    displayOrder: 0,
    // Case Study Details
    subtitle: "",
    summary: "",
    overview: "",
    problem: "",
    solution: "",
    resultsText: "",
    teamSize: "",
    technologies: "",
  });

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.project) {
          const p = data.project;
          const cs = p.caseStudy || {};
          let resText = "";
          if (cs.results) {
            try {
              const arr = JSON.parse(cs.results);
              if (Array.isArray(arr)) resText = arr.join("\n");
            } catch {
              resText = cs.results;
            }
          }

          setFormData({
            title: p.title || "",
            slug: p.slug || "",
            shortDesc: p.shortDesc || "",
            category: p.category || "travel",
            categoryTag: p.categoryTag || "",
            impactPill: p.impactPill || "",
            pages: p.pages || "",
            duration: p.duration || "",
            role: p.role || "",
            tools: p.tools || "",
            heroImage: p.heroImage || "",
            liveUrl: p.liveUrl || "",
            githubUrl: p.githubUrl || "",
            behanceUrl: p.behanceUrl || "",
            dribbbleUrl: p.dribbbleUrl || "",
            figmaUrl: p.figmaUrl || "",
            featured: p.featured ?? false,
            published: p.published ?? true,
            displayOrder: p.displayOrder || 0,
            subtitle: cs.subtitle || "",
            summary: cs.summary || "",
            overview: cs.overview || "",
            problem: cs.problem || "",
            solution: cs.solution || "",
            resultsText: resText,
            teamSize: cs.teamSize || "",
            technologies: cs.technologies || "",
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load project details");
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const resultsArray = formData.resultsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      caseStudy: {
        subtitle: formData.subtitle || formData.title,
        summary: formData.summary || formData.shortDesc,
        overview: formData.overview || formData.shortDesc,
        problem: formData.problem,
        solution: formData.solution,
        results: resultsArray,
        teamSize: formData.teamSize,
        technologies: formData.technologies,
      },
    };

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to update project");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError("Network error while updating project");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center text-[#8e8e93]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06ACFE] mx-auto mb-4" />
        <span>Loading project data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold font-[var(--font-lato)] text-white">
              Edit Project — {formData.title}
            </h1>
            <p className="text-xs text-[#8e8e93]">
              Update project showcase, details, case study sections, and external links
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
        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
            <FolderKanban className="w-5 h-5" />
            <span>Basic Details & Links</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                Project Title *
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
              Short Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.shortDesc}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, shortDesc: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                Category
              </label>
              <input
                type="text"
                value={formData.categoryTag}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, categoryTag: e.target.value }))
                }
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                Impact Pill
              </label>
              <input
                type="text"
                value={formData.impactPill}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, impactPill: e.target.value }))
                }
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                Hero Image Asset Path
              </label>
              <input
                type="text"
                value={formData.heroImage}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, heroImage: e.target.value }))
                }
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#06ACFE]"
              />
            </div>
          </div>
        </div>

        {/* Case Study Details */}
        <div className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Figma Case Study Breakdown</span>
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
              Case Study Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
              The Problem Statement
            </label>
            <textarea
              rows={4}
              value={formData.problem}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, problem: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
              The Design Solution
            </label>
            <textarea
              rows={4}
              value={formData.solution}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, solution: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
              Key Results & Metrics (One per line)
            </label>
            <textarea
              rows={4}
              value={formData.resultsText}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, resultsText: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#06ACFE]"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/projects"
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
