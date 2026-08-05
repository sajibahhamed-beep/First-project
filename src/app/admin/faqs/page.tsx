"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  HelpCircle,
  GripVertical,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  displayOrder: number;
}

interface Toast {
  type: "success" | "error";
  message: string;
}

const emptyForm = { question: "", answer: "", category: "" };

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // Expanded preview
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch {
      showToast("error", "Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setForm({ question: faq.question, answer: faq.answer, category: faq.category || "" });
    setShowForm(true);
    setExpandedId(null);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      showToast("error", "Question and answer cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/faqs/${editingId}` : "/api/admin/faqs";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      showToast("success", editingId ? "FAQ updated successfully!" : "FAQ created successfully!");
      cancelForm();
      await fetchFaqs();
    } catch {
      showToast("error", "Failed to save FAQ. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Delete this FAQ?\n\n"${question}"`)) return;
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("success", "FAQ deleted.");
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch {
      showToast("error", "Failed to delete FAQ.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-medium font-[var(--font-inter)] transition-all duration-300 ${
            toast.type === "success"
              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
              : "bg-red-500/15 border border-red-500/30 text-red-400"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          {toast.message}
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[#06ACFE]/15 border border-[#06ACFE]/30 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-[#06ACFE]" />
            </div>
            <h1 className="text-2xl font-extrabold font-[var(--font-lato)] text-white">
              FAQ Manager
            </h1>
          </div>
          <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] ml-13">
            Manage questions and answers shown in the FAQ section of the homepage.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold font-[var(--font-lato)] text-sm rounded-xl transition-all duration-200 shadow-[0_4px_15px_rgba(6,172,254,0.35)] hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="bg-[#121826]/80 border border-white/10 rounded-2xl p-6 mb-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-white mb-5">
            {editingId ? "✏️ Edit FAQ" : "➕ New FAQ"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e8e93] mb-1.5 font-[var(--font-lato)]">
                Question *
              </label>
              <input
                type="text"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="e.g. How does the process work?"
                className="w-full px-4 py-3 bg-[#090b0e]/80 border border-white/10 rounded-xl text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#06ACFE] focus:ring-1 focus:ring-[#06ACFE] transition-all font-[var(--font-inter)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e8e93] mb-1.5 font-[var(--font-lato)]">
                Answer *
              </label>
              <textarea
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                placeholder="Write the full answer here..."
                rows={4}
                className="w-full px-4 py-3 bg-[#090b0e]/80 border border-white/10 rounded-xl text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#06ACFE] focus:ring-1 focus:ring-[#06ACFE] transition-all font-[var(--font-inter)] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e8e93] mb-1.5 font-[var(--font-lato)]">
                Category (optional)
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Pricing, Process, Support"
                className="w-full px-4 py-3 bg-[#090b0e]/80 border border-white/10 rounded-xl text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#06ACFE] focus:ring-1 focus:ring-[#06ACFE] transition-all font-[var(--font-inter)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold font-[var(--font-lato)] text-sm rounded-xl transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : editingId ? "Update FAQ" : "Create FAQ"}
            </button>
            <button
              onClick={cancelForm}
              className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-[#8e8e93] hover:text-white font-bold font-[var(--font-lato)] text-sm rounded-xl transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FAQ List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#8e8e93]">
          <div className="w-6 h-6 border-2 border-[#06ACFE] border-t-transparent rounded-full animate-spin mr-3" />
          Loading FAQs...
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-20 text-[#8e8e93]">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold font-[var(--font-lato)] mb-2">No FAQs yet</p>
          <p className="text-sm font-[var(--font-inter)]">Click "Add FAQ" to create your first question.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#121826]/70 rounded-xl border border-white/5 overflow-hidden transition-all duration-200 hover:border-white/10"
              >
                {/* Question row */}
                <div className="flex items-center gap-3 px-5 py-4">
                  <GripVertical className="w-4 h-4 text-[#52525b] shrink-0 cursor-grab" />
                  <span className="w-6 h-6 rounded-lg bg-[#06ACFE]/15 text-[#06ACFE] text-xs font-bold font-[var(--font-lato)] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="flex-1 text-left text-white font-semibold font-[var(--font-lato)] text-sm leading-snug hover:text-[#06ACFE] transition-colors"
                  >
                    {faq.question}
                  </button>

                  {faq.category && (
                    <span className="hidden sm:inline text-xs px-2.5 py-1 rounded-lg bg-white/5 text-[#8e8e93] font-medium font-[var(--font-inter)] shrink-0">
                      {faq.category}
                    </span>
                  )}

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      className="p-2 rounded-lg text-[#8e8e93] hover:text-white hover:bg-white/5 transition-colors"
                      title="Preview answer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => openEdit(faq)}
                      className="p-2 rounded-lg text-[#8e8e93] hover:text-[#06ACFE] hover:bg-[#06ACFE]/10 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id, faq.question)}
                      className="p-2 rounded-lg text-[#8e8e93] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Answer preview */}
                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-white/5">
                    <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed pt-3 pl-9">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer info */}
      {faqs.length > 0 && (
        <p className="text-center text-xs text-[#52525b] font-[var(--font-inter)] mt-6">
          {faqs.length} FAQ{faqs.length !== 1 ? "s" : ""} · Changes appear live on the homepage FAQ section
        </p>
      )}
    </div>
  );
}
