"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, FileText, Star } from "lucide-react";

interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/blog?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
      }
    } catch (err) {
      alert("Failed to delete blog post");
    }
  };

  const toggleStatus = async (blog: BlogItem, field: "published" | "featured") => {
    try {
      const updatedValue = !blog[field];
      const res = await fetch(`/api/admin/blog/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: updatedValue }),
      });

      if (res.ok) {
        setBlogs(
          blogs.map((b) => (b.id === blog.id ? { ...b, [field]: updatedValue } : b))
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-[var(--font-lato)] text-white">
            Blog Posts CMS
          </h1>
          <p className="text-xs text-[#8e8e93] font-[var(--font-inter)] mt-1">
            Publish articles, UI/UX insights, design system guides, and tutorials
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="px-5 py-3 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(6,172,254,0.35)] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#121826]/70 border border-white/10 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e8e93]" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#090b0e] border border-white/10 rounded-xl text-white text-xs placeholder-[#71717a] focus:outline-none focus:border-[#06ACFE]"
          />
        </div>
      </div>

      {/* Blogs Table */}
      <div className="rounded-2xl bg-[#121826]/70 border border-white/10 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="py-16 text-center text-[#8e8e93]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06ACFE] mx-auto mb-4" />
            <span>Loading articles...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center text-[#8e8e93]">
            <p className="text-base font-bold mb-2">No blog articles found</p>
            <p className="text-xs">Create your first blog post to publish on your website.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-[#8e8e93] bg-[#080a0d]">
                  <th className="py-4 px-6">Article Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Read Time</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <h3 className="font-bold text-white font-[var(--font-lato)] line-clamp-1">
                          {b.title}
                        </h3>
                        <span className="text-xs text-[#8e8e93] font-mono">
                          /blog/{b.slug}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs text-[#06ACFE] font-medium">
                      {b.category}
                    </td>

                    <td className="py-4 px-6 text-xs text-[#8e8e93]">
                      {b.readTime}
                    </td>

                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleStatus(b, "published")}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          b.published
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30"
                        }`}
                      >
                        {b.published ? "Published" : "Draft"}
                      </button>
                    </td>

                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleStatus(b, "featured")}
                        className={`p-2 rounded-lg transition-all ${
                          b.featured
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "text-[#8e8e93] hover:text-white"
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8e8e93] hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/admin/blog/${b.id}`}
                          className="p-2 rounded-lg bg-[#06ACFE]/10 hover:bg-[#06ACFE]/20 text-[#06ACFE] transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(b.id, b.title)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
