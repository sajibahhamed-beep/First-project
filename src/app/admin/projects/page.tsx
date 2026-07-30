"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Filter, Edit, Trash2, ExternalLink, Star, Eye } from "lucide-react";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  categoryTag: string;
  impactPill: string;
  heroImage: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      if (search) query.set("search", search);
      if (categoryFilter) query.set("category", categoryFilter);

      const res = await fetch(`/api/admin/projects?${query.toString()}`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Fetch projects error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search, categoryFilter]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  const toggleStatus = async (project: ProjectItem, field: "published" | "featured") => {
    try {
      const updatedValue = !project[field];
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: updatedValue }),
      });

      if (res.ok) {
        setProjects(
          projects.map((p) =>
            p.id === project.id ? { ...p, [field]: updatedValue } : p
          )
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
            Projects & Case Studies
          </h1>
          <p className="text-xs text-[#8e8e93] font-[var(--font-inter)] mt-1">
            Manage your portfolio projects, Figma case studies, images, and links
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-5 py-3 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(6,172,254,0.35)] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#121826]/70 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e8e93]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#090b0e] border border-white/10 rounded-xl text-white text-xs placeholder-[#71717a] focus:outline-none focus:border-[#06ACFE]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#8e8e93]" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#090b0e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#06ACFE]"
          >
            <option value="">All Categories</option>
            <option value="travel">Travel & Hospitality</option>
            <option value="restaurant">Restaurant & Dining</option>
            <option value="saas">SaaS & Financial</option>
            <option value="mobile">Mobile Apps</option>
          </select>
        </div>
      </div>

      {/* Projects Table Container */}
      <div className="rounded-2xl bg-[#121826]/70 border border-white/10 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="py-16 text-center text-[#8e8e93]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06ACFE] mx-auto mb-4" />
            <span>Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-[#8e8e93]">
            <p className="text-base font-bold mb-2">No projects found</p>
            <p className="text-xs">Try adjusting your search query or add a new project.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-[#8e8e93] bg-[#080a0d]">
                  <th className="py-4 px-6">Project Info</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Impact Pill</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-[#090b0e] overflow-hidden border border-white/10 shrink-0 relative">
                          <Image
                            src={proj.heroImage || "/assets/project_triply_exact.png"}
                            alt={proj.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-white font-[var(--font-lato)] line-clamp-1">
                            {proj.title}
                          </h3>
                          <span className="text-xs text-[#8e8e93] font-mono">
                            /{proj.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs text-[#06ACFE] font-medium">
                      {proj.categoryTag}
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white">
                        {proj.impactPill}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleStatus(proj, "published")}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          proj.published
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30"
                        }`}
                      >
                        {proj.published ? "Published" : "Draft"}
                      </button>
                    </td>

                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleStatus(proj, "featured")}
                        className={`p-2 rounded-lg transition-all ${
                          proj.featured
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
                          href={`/portfolio/${proj.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8e8e93] hover:text-white transition-colors"
                          title="Preview Page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/admin/projects/${proj.id}`}
                          className="p-2 rounded-lg bg-[#06ACFE]/10 hover:bg-[#06ACFE]/20 text-[#06ACFE] transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete Project"
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
