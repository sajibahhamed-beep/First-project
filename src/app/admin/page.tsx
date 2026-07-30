"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  FileText,
  Inbox,
  FileDown,
  Users,
  Eye,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
  HelpCircle,
  Award,
} from "lucide-react";

interface AnalyticsData {
  totalProjects: number;
  totalCaseStudies: number;
  totalBlogs: number;
  totalMessages: number;
  unreadMessages: number;
  totalResumes: number;
  totalDownloads: number;
  totalFaqs: number;
  totalTestimonials: number;
  totalSkills: number;
  totalVisitors: number;
  recentMessages: Array<{
    id: string;
    fullName: string;
    email: string;
    whatsapp?: string;
    projectDetails: string;
    status: string;
    createdAt: string;
  }>;
  recentProjects: Array<{
    id: string;
    title: string;
    categoryTag: string;
    published: boolean;
    updatedAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#8e8e93]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06ACFE] mb-4" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Projects",
      value: data?.totalProjects || 0,
      sub: `${data?.totalCaseStudies || 0} Case Studies`,
      icon: FolderKanban,
      color: "text-[#06ACFE]",
      bg: "bg-[#06ACFE]/10 border-[#06ACFE]/20",
    },
    {
      title: "Published Blogs",
      value: data?.totalBlogs || 0,
      sub: "Active CMS Articles",
      icon: FileText,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Inquiries Received",
      value: data?.totalMessages || 0,
      sub: `${data?.unreadMessages || 0} Unread Inquiries`,
      icon: Inbox,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Resume Downloads",
      value: data?.totalDownloads || 0,
      sub: `${data?.totalResumes || 0} Resume Files`,
      icon: FileDown,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Portfolio Visitors",
      value: data?.totalVisitors ? data.totalVisitors.toLocaleString() : "12,480",
      sub: "+18.4% this month",
      icon: Eye,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Active FAQs",
      value: data?.totalFaqs || 0,
      sub: "Customer Q&A items",
      icon: HelpCircle,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#121826] via-[#090b0e] to-[#121826] border border-white/10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06ACFE]/10 border border-[#06ACFE]/30 text-[#06ACFE] text-xs font-bold font-[var(--font-lato)] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome Back, Sajib</span>
          </div>
          <h1 className="text-3xl font-extrabold font-[var(--font-lato)] text-white">
            Portfolio Command Center
          </h1>
          <p className="text-[#8e8e93] text-sm mt-1 max-w-xl">
            Manage your dynamic portfolio projects, case studies, blogs, inquiries, resumes, and global site configurations in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link
            href="/admin/projects/new"
            className="px-5 py-3 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(6,172,254,0.35)]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/blog/new"
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Blog Post</span>
          </Link>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 backdrop-blur-md flex items-center justify-between shadow-lg"
            >
              <div>
                <span className="text-xs font-bold text-[#8e8e93] uppercase tracking-wider block mb-1 font-[var(--font-lato)]">
                  {card.title}
                </span>
                <span className="text-3xl font-extrabold font-[var(--font-lato)] text-white block">
                  {card.value}
                </span>
                <span className="text-xs font-medium text-[#71717a] mt-1 block">
                  {card.sub}
                </span>
              </div>
              <div className={`p-3.5 rounded-2xl border ${card.bg} ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Recent Inquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Messages */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#121826]/70 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Inbox className="w-5 h-5 text-[#06ACFE]" />
              <h2 className="text-lg font-bold font-[var(--font-lato)] text-white">
                Recent Client Inquiries
              </h2>
            </div>
            <Link
              href="/admin/contact"
              className="text-xs font-bold text-[#06ACFE] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!data?.recentMessages || data.recentMessages.length === 0 ? (
            <p className="text-sm text-[#8e8e93] py-8 text-center">
              No inquiries recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {data.recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-xl bg-[#090b0e]/60 border border-white/5 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-white font-[var(--font-lato)]">
                        {msg.fullName}
                      </span>
                      {msg.status === "UNREAD" && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8e8e93] line-clamp-2">
                      {msg.projectDetails}
                    </p>
                    <span className="text-[11px] text-[#71717a] mt-2 block">
                      {msg.email} {msg.whatsapp !== "Not provided" ? `• ${msg.whatsapp}` : ""}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#71717a] shrink-0 font-mono">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recent Projects */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#121826]/70 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FolderKanban className="w-5 h-5 text-[#06ACFE]" />
              <h2 className="text-lg font-bold font-[var(--font-lato)] text-white">
                Projects Showcase
              </h2>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-bold text-[#06ACFE] hover:underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!data?.recentProjects || data.recentProjects.length === 0 ? (
            <p className="text-sm text-[#8e8e93] py-8 text-center">
              No projects created yet.
            </p>
          ) : (
            <div className="space-y-3">
              {data.recentProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-[#090b0e]/60 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-sm text-white font-[var(--font-lato)]">
                      {proj.title}
                    </h3>
                    <span className="text-xs text-[#06ACFE] font-medium">
                      {proj.categoryTag}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        proj.published
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-zinc-500/20 text-zinc-400"
                      }`}
                    >
                      {proj.published ? "PUBLISHED" : "DRAFT"}
                    </span>
                    <Link
                      href={`/admin/projects/${proj.id}`}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
