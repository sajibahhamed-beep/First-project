"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "About Me", href: "/about", id: "about" },
    { name: "Portfolio", href: "/portfolio", id: "portfolio" },
    { name: "Contact Me", href: "/contact", id: "contact" },
    { name: "Blog", href: "/blog", id: "blog" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#080a0d]/95 backdrop-blur-md border-none h-[72px] shadow-[0_4px_25px_rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        {/* Sajuxly Logo */}
        <Link href="/" className="flex items-center group py-2">
          <Image
            src="/assets/sajuxly_logo.png"
            alt="Sajuxly Logo"
            width={200}
            height={52}
            className="h-[48px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            style={{ width: "auto", height: "48px" }}
            priority
          />
        </Link>

        {/* Desktop Navigation Links - Geist Font */}
        <nav className="hidden md:flex items-stretch h-full gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.id}
                href={link.href}
                className={`px-6 h-full flex items-center text-[15px] font-[var(--font-geist)] transition-all duration-200 ${
                  isActive
                    ? "bg-[#121826] text-[#06ACFE] font-bold border-b-2 border-[#06ACFE]"
                    : "bg-transparent text-zinc-300 font-normal hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 text-zinc-300 hover:text-white rounded-lg bg-white/5 border border-white/10 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6 text-[#06ACFE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer - Geist Font */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080a0d] border-b border-white/10 px-6 py-4 flex flex-col gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.06)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-[var(--font-geist)] transition-all ${
                  isActive
                    ? "bg-[#121826] text-[#06ACFE] font-bold border-l-4 border-[#06ACFE]"
                    : "text-zinc-300 font-normal hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
