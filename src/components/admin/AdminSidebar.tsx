"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects & Case Studies", href: "/admin/projects", icon: FolderKanban },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Contact Inbox", href: "/admin/contact", icon: Inbox },
  { name: "FAQ Manager", href: "/admin/faqs", icon: HelpCircle },
  { name: "Site & CMS Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <aside className="w-64 bg-[#080a0d] border-r border-white/10 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#06ACFE]/20 border border-[#06ACFE]/40 flex items-center justify-center text-[#06ACFE]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold font-[var(--font-lato)] text-lg text-white leading-tight">
              Sajib Admin
            </h2>
            <span className="text-xs text-[#06ACFE] font-medium">Portfolio CMS</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#06ACFE] text-white shadow-[0_4px_15px_rgba(6,172,254,0.35)]"
                    : "text-[#8e8e93] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-xs text-[#8e8e93] hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-[#06ACFE]" />
          <span>View Live Website</span>
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
