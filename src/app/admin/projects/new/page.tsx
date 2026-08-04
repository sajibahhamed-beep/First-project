"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, FolderKanban } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import SectionBlockBuilder, { ContentSection } from "@/components/admin/SectionBlockBuilder";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDesc: "",
    category: "travel",
    categoryTag: "Travel & Hospitality",
    impactPill: "3.2x Booking Rate",
    pages: "40+ Screens",
    duration: "2.5 Months",
    role: "Lead UI/UX Designer",
    tools: "Figma, React, Tailwind CSS",
    heroImage: "/assets/project_triply_exact.png",
    liveUrl: "",
    githubUrl: "",
    behanceUrl: "",
    dribbbleUrl: "",
    figmaUrl: "",
    featured: false,
    published: true,
    displayOrder: 0,
    // Case Study Meta
    subtitle: "",
    problem: "",
    solution: "",
    resultsText: "",
    screens: [
      "/assets/figma_img_23.png",
      "/assets/figma_img_24.png",
      "/assets/screen_8_168.png",
    ],
    teamSize: "4 Designers, 6 Engineers",
    technologies: "Figma, Next.js, Tailwind CSS",
  });

  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: "sec_1",
      title: "Executive Summary & Overview",
      description: "Explain project scope, overview, and primary objectives...",
      image: "",
    },
    {
      id: "sec_2",
      title: "01. UX Research & Discovery",
      description: "Qualitative research, user interviews, and competitor audits...",
      image: "/assets/figma_img_23.png",
    },
  ]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: generateSlug(val),
    }));
  };

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
        summary: formData.shortDesc,
        overview: JSON.stringify(sections),
        problem: formData.problem || "Initial problem description.",
        solution: formData.solution || "High impact UI/UX solution.",
        results: resultsArray,
        screens: formData.screens.length > 0 ? formData.screens : [formData.heroImage],
        teamSize: formData.teamSize,
        technologies: formData.technologies,
      },
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to create project");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError("Network error while creating project");
      setIsSubmitting(false);
    }
  };

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
              Create New Project &amp; Case Study
            </h1>
            <p className="text-xs text-[#8e8e93]">
              Add a new case study with dynamic content section blocks
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
            <FolderKanban className="w-5 h-5" />
            <span>Basic Project Details</span>
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Triply — Easy Booking for Dream Trips"
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
                placeholder="triply-booking"
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
              placeholder="Brief summary displayed on project cards..."
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                Category Tag
              </label>
              <input
                type="text"
                value={formData.categoryTag}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, categoryTag: e.target.value }))
                }
                placeholder="Travel & Hospitality"
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
                placeholder="3.2x Booking Rate"
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
              />
            </div>
          </div>

          {/* Project Hero Image Upload Control */}
          <ImageUpload
            label="Project Main Showcase / Hero Image"
            value={formData.heroImage}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, heroImage: url }))
            }
          />
        </div>

        {/* Dynamic Section Builder with Add Button at Top Right */}
        <SectionBlockBuilder
          label="Project Description &amp; Case Study Sections"
          sections={sections}
          onChange={(newSections) => setSections(newSections)}
        />

        {/* Case Study Extra Meta */}
        <div className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Problem, Results &amp; Screen Mockups</span>
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
              placeholder="End-to-End Travel Planning & Tour Booking UX Case Study"
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
              The Problem Statement
            </label>
            <textarea
              rows={3}
              value={formData.problem}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, problem: e.target.value }))
              }
              placeholder="Describe the primary user friction points..."
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
              Key Results &amp; Metrics (One per line)
            </label>
            <textarea
              rows={4}
              value={formData.resultsText}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, resultsText: e.target.value }))
              }
              placeholder={`Multi-destination checkout completion rate multiplied by 3.2x\nAchieved 4.9/5 user rating\nReduced mobile onboarding drop-off rate by 38%`}
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#06ACFE]"
            />
          </div>

          {/* Multi-Image Upload for Screen Mockup Gallery */}
          <MultiImageUpload
            label="Detailed Screen Mockups Gallery"
            values={formData.screens}
            onChange={(urls) =>
              setFormData((prev) => ({ ...prev, screens: urls }))
            }
          />
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
            <span>{isSubmitting ? "Creating..." : "Publish Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
