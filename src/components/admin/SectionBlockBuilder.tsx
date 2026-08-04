"use client";

import { Plus, Trash2, Layers, ArrowUp, ArrowDown } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export interface ContentSection {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface SectionBlockBuilderProps {
  label?: string;
  sections: ContentSection[];
  onChange: (sections: ContentSection[]) => void;
}

export default function SectionBlockBuilder({
  label = "Content Sections & Breakdown",
  sections = [],
  onChange,
}: SectionBlockBuilderProps) {
  const addSection = () => {
    const newSection: ContentSection = {
      id: `sec_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      title: "",
      description: "",
      image: "",
    };
    onChange([...sections, newSection]);
  };

  const updateSection = (id: string, field: keyof ContentSection, value: string) => {
    const updated = sections.map((sec) =>
      sec.id === id ? { ...sec, [field]: value } : sec
    );
    onChange(updated);
  };

  const removeSection = (index: number) => {
    const updated = [...sections];
    updated.splice(index, 1);
    onChange(updated);
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    ) {
      return;
    }
    const updated = [...sections];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIdx, 0, moved);
    onChange(updated);
  };

  return (
    <div className="space-y-6 p-6 rounded-2xl bg-[#121826]/70 border border-white/10">
      {/* Top Header with Add Section Button (Vanishes once sections exist) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
            <Layers className="w-5 h-5" />
            <span>{label}</span>
          </h2>
          <p className="text-xs text-[#8e8e93] mt-1">
            Build dynamic description sections with titles, paragraph descriptions, and images.
          </p>
        </div>

        {/* Initial Top Right "Add Section Block" Button (Vanishes after clicking once) */}
        {sections.length === 0 && (
          <button
            type="button"
            onClick={addSection}
            className="px-4 py-2.5 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(6,172,254,0.35)] shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Section Block</span>
          </button>
        )}
      </div>

      {/* Sections List */}
      {sections.length === 0 ? (
        <div className="py-12 px-6 text-center border-2 border-dashed border-white/10 rounded-xl bg-[#090b0e]/50 space-y-3">
          <Layers className="w-10 h-10 text-white/20 mx-auto" />
          <p className="text-sm font-medium text-[#8e8e93]">
            No content sections added yet.
          </p>
          <button
            type="button"
            onClick={addSection}
            className="px-5 py-2.5 rounded-xl bg-[#06ACFE]/15 hover:bg-[#06ACFE]/25 text-[#06ACFE] text-xs font-bold font-[var(--font-lato)] inline-flex items-center gap-2 transition-all border border-[#06ACFE]/30"
          >
            <Plus className="w-4 h-4" />
            <span>Click to Add First Section</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((sec, idx) => (
            <div
              key={sec.id || idx}
              className="p-6 rounded-xl bg-[#090b0e] border border-white/10 space-y-5 relative group"
            >
              {/* Section Block Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#06ACFE] font-[var(--font-lato)]">
                  Section #{idx + 1}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => moveSection(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(idx, "down")}
                    disabled={idx === sections.length - 1}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(idx)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors ml-2"
                    title="Remove Section Block"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 1. Add Title */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                  1. Section Title / Subheading
                </label>
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => updateSection(sec.id, "title", e.target.value)}
                  placeholder="e.g. 01. UX Research & Discovery Phase"
                  className="w-full px-4 py-2.5 bg-[#121826] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
                />
              </div>

              {/* 2. Description */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                  2. Section Description / Paragraph
                </label>
                <textarea
                  rows={4}
                  value={sec.description}
                  onChange={(e) => updateSection(sec.id, "description", e.target.value)}
                  placeholder="Enter detailed description or narrative paragraph for this section..."
                  className="w-full px-4 py-2.5 bg-[#121826] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
                />
              </div>

              {/* 3. Upload Image */}
              <div>
                <ImageUpload
                  label="3. Section Image (Optional)"
                  value={sec.image}
                  onChange={(url) => updateSection(sec.id, "image", url)}
                />
              </div>
            </div>
          ))}

          {/* Bottom "Add Another Section Block" Button (Available after sections exist) */}
          <div className="pt-2 text-right">
            <button
              type="button"
              onClick={addSection}
              className="px-4 py-2.5 rounded-xl bg-[#06ACFE]/15 hover:bg-[#06ACFE]/25 text-[#06ACFE] text-xs font-bold font-[var(--font-lato)] inline-flex items-center gap-2 transition-all border border-[#06ACFE]/30 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Section Block</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
