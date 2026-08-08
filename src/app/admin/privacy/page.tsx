"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Loader2, Save, Plus, Trash2, GripVertical } from "lucide-react";

interface PolicySection {
  id: string;
  title: string;
  description: string;
}

export default function PrivacyPolicyAdmin() {
  const [sections, setSections] = useState<PolicySection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetch("/api/admin/privacy")
      .then((res) => res.json())
      .then((data) => {
        if (data.sections && Array.isArray(data.sections)) {
          setSections(data.sections);
        } else {
          setSections([]);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setMessage({ type: "error", text: "Failed to load privacy policy." });
        setIsLoading(false);
      });
  }, []);

  const handleAddSection = () => {
    setSections([
      ...sections,
      { id: Date.now().toString(), title: "", description: "" },
    ]);
  };

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter((sec) => sec.id !== id));
  };

  const handleUpdateSection = (id: string, field: "title" | "description", value: string) => {
    setSections(
      sections.map((sec) => (sec.id === id ? { ...sec, [field]: value } : sec))
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/privacy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Privacy policy saved successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 bg-[#090b0e] h-screen overflow-y-auto">
      <AdminHeader />

      <main className="p-8 max-w-4xl mx-auto">
        <div className="bg-[#121418] border border-white/10 rounded-2xl p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold font-[var(--font-lato)] text-white">
                Manage Privacy Policy
              </h2>
              <p className="text-[#8e8e93] text-sm mt-1">
                Add, edit, or remove sections of your privacy policy.
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-[4px] font-bold font-[var(--font-lato)] text-sm bg-[#06ACFE] text-white hover:bg-[#0098e6] transition-all disabled:opacity-50 shadow-md"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Policy
            </button>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-[4px] border text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-500/10 border-green-500/50 text-green-500"
                  : "bg-red-500/10 border-red-500/50 text-red-500"
              }`}
            >
              {message.text}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="w-8 h-8 text-[#06ACFE] animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {sections.length === 0 && (
                <div className="text-center p-10 border border-dashed border-white/10 rounded-[12px]">
                  <p className="text-[#8e8e93] text-sm">No sections added yet.</p>
                </div>
              )}

              {sections.map((sec, index) => (
                <div
                  key={sec.id}
                  className="bg-[#1c1f26] border border-white/10 rounded-[12px] p-5 flex gap-4 items-start relative group"
                >
                  <div className="mt-2 text-[#5e6370] cursor-grab">
                    <span className="font-bold text-sm bg-white/5 w-6 h-6 flex items-center justify-center rounded-full text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Policy Heading (e.g., Information We Collect)"
                        value={sec.title}
                        onChange={(e) => handleUpdateSection(sec.id, "title", e.target.value)}
                        className="w-full px-4 py-3 rounded-[4px] bg-[#090b0e] border border-white/5 text-white font-bold font-[var(--font-lato)] text-sm focus:outline-none focus:border-[#06ACFE] transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Detailed description of the policy..."
                        value={sec.description}
                        onChange={(e) => handleUpdateSection(sec.id, "description", e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 rounded-[4px] bg-[#090b0e] border border-white/5 text-[#a1a1aa] font-[var(--font-inter)] text-sm focus:outline-none focus:border-[#06ACFE] transition-colors resize-y"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveSection(sec.id)}
                    className="text-[#5e6370] hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors mt-1"
                    title="Remove Section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={handleAddSection}
                className="w-full py-4 border border-dashed border-white/20 rounded-[12px] text-[#8e8e93] font-medium text-sm flex justify-center items-center gap-2 hover:bg-white/5 hover:border-white/40 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Policy Section
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
