"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface PolicySection {
  id: string;
  title: string;
  description: string;
}

export default function PrivacyPolicyPage() {
  const [sections, setSections] = useState<PolicySection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/privacy")
      .then((res) => res.json())
      .then((data) => {
        if (data.sections && Array.isArray(data.sections)) {
          setSections(data.sections);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner */}
      <section
        className="relative pt-36 pb-16 px-6 md:px-12 bg-center bg-cover bg-no-repeat border-b border-white/5 overflow-hidden"
        style={{ backgroundImage: `url('/assets/Top Heading.png')` }}
      >
        <div className="max-w-7xl mx-auto text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[4px] bg-[#06ACFE]/10 border border-[#06ACFE]/30 text-[#06ACFE] text-sm font-bold font-[var(--font-lato)] mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span>Privacy Policy</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold font-[var(--font-lato)] text-white mb-6 leading-[1.1]">
            Privacy <span className="text-[#06ACFE]">Policy</span>
          </h1>
          <p className="text-[#8e8e93] font-[var(--font-inter)] text-lg max-w-2xl leading-relaxed">
            Read our privacy policy to learn how we protect and manage your data.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 md:px-12 bg-[#090b0e]">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center p-12 bg-[#121418] border border-white/10 rounded-2xl">
              <Loader2 className="w-10 h-10 text-[#06ACFE] animate-spin" />
            </div>
          ) : sections.length > 0 ? (
            <div className="space-y-12">
              {sections.map((sec, index) => (
                <div key={sec.id} className="flex gap-6 md:gap-10 items-start">
                  {/* Sequence Number */}
                  <div className="shrink-0 mt-1.5">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1c1f26] border border-white/10 text-[#06ACFE] font-extrabold font-[var(--font-lato)] text-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                      {index + 1}
                    </span>
                  </div>

                  {/* Section Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white mb-4">
                      {sec.title || `Policy Section ${index + 1}`}
                    </h2>
                    <div
                      className="text-[#a1a1aa] font-[var(--font-inter)] text-base leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: sec.description }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#121418] border border-white/10 rounded-2xl p-12 text-center text-[#8e8e93]">
              The privacy policy is currently being updated. Please check back later.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
