"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Bell, ExternalLink, KeyRound } from "lucide-react";

export default function AdminHeader() {
  const [adminName, setAdminName] = useState("Muhammad Sajib");

  useEffect(() => {
    fetch("/api/admin/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user?.name) {
          setAdminName(data.user.name);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="h-16 bg-[#080a0d]/80 backdrop-blur-md border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-bold font-[var(--font-lato)] text-white">
          Control Panel
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/admin/change-password"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-[#8e8e93] hover:text-white hover:bg-white/10 transition-all"
        >
          <KeyRound className="w-3.5 h-3.5 text-[#06ACFE]" />
          <span>Change Password</span>
        </Link>

        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06ACFE]/10 border border-[#06ACFE]/30 text-xs font-bold text-[#06ACFE] hover:bg-[#06ACFE]/20 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Live Site</span>
        </a>

        <div className="h-6 w-[1px] bg-white/10" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#06ACFE]/20 border border-[#06ACFE]/40 flex items-center justify-center text-[#06ACFE] font-bold text-xs">
            {adminName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-white font-[var(--font-lato)]">
            {adminName}
          </span>
        </div>
      </div>
    </header>
  );
}
