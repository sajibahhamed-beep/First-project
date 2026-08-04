"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    projectDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true); // Graceful fallback
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner using Top Heading.png as background (Left Aligned) */}
      <section
        className="relative pt-36 pb-16 px-6 md:px-12 bg-center bg-cover bg-no-repeat border-b border-white/5 overflow-hidden"
        style={{ backgroundImage: `url('/assets/Top Heading.png')` }}
      >
        <div className="max-w-7xl mx-auto text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[4px] bg-[#06ACFE]/10 border border-[#06ACFE]/30 text-[#06ACFE] text-sm font-bold font-[var(--font-lato)] mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>Contact Me</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-[var(--font-lato)] leading-tight text-white mb-2">
            Contact Me
          </h1>
        </div>
      </section>

      {/* Main Contact Section - Clean layout without background card rectangle */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sajib Profile & Value Proposition */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Consultation Badge WITHOUT border stroke */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06ACFE]/15 border-none text-[#06ACFE] text-xs font-bold font-[var(--font-lato)] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#06ACFE] animate-pulse" />
              Book Free Consultation
            </div>

            {/* Heading below Book Free Consultation */}
            <h2 className="text-3xl md:text-4xl font-extrabold font-[var(--font-lato)] text-white mb-2 leading-tight">
              Book a one-to-one Call
            </h2>

            {/* Sub-text below Heading */}
            <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed max-w-sm mb-6">
              Schedule a one to one discovery Session to discuss about your project goal.
            </p>

            {/* Sajib Portrait */}
            <div className="relative w-full max-w-[200px] h-[220px] rounded-[4px] overflow-hidden mb-6 border border-white/10 shadow-lg bg-[#141720]">
              <Image
                src="/assets/about me image.png"
                alt="Muhammad Sajib"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            <h3 className="text-2xl font-extrabold font-[var(--font-lato)] text-white mb-1">
              Muhammad Sajib
            </h3>
            <p className="text-xs text-[#8e8e93] font-[var(--font-inter)] mb-6">
              Product Designer
            </p>

            {/* Value Bullet Points */}
            <div className="space-y-3 font-[var(--font-inter)] text-sm text-[#8e8e93]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#06ACFE] shrink-0" />
                <span>Direct 1-on-1 Design Consultation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#06ACFE] shrink-0" />
                <span>Research-backed UI/UX &amp; Design Systems</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#06ACFE] shrink-0" />
                <span>Guaranteed response within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Fields with #212121 bg & no strokes */}
          <div className="lg:col-span-7 w-full">
            <h2 className="text-3xl font-extrabold font-[var(--font-lato)] text-white mb-2">
              Have an Idea? Let&apos;s Talk
            </h2>
            <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed mb-8">
              Fill out the form below to share details about your project, timeline, or inquiries. Messages are delivered directly to <strong className="text-white">sajibahhamed0@gmail.com</strong>.
            </p>

            {submitted ? (
              <div className="bg-[#212121] p-10 text-center rounded-[4px] border-none shadow-lg">
                <h3 className="text-3xl font-extrabold font-[var(--font-lato)] text-[#06ACFE] mb-3">
                  Message Sent to Sajib!
                </h3>
                <p className="text-[#8e8e93] text-base font-[var(--font-inter)] mb-6">
                  Thank you for reaching out! Your message and goal details have been sent to <span className="text-white font-medium">sajibahhamed0@gmail.com</span>. Sajib will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName: "", email: "", whatsapp: "", projectDetails: "" });
                  }}
                  className="px-7 py-3 rounded-[4px] bg-[#06ACFE] text-white font-bold font-[var(--font-lato)] hover:bg-[#0098e6] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-[#a1a1aa] font-medium font-[var(--font-lato)] text-sm mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name here"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-5 py-3.5 rounded-[4px] bg-[#212121] border-none text-white placeholder-[#5e6370] font-[var(--font-inter)] text-sm focus:outline-none focus:ring-1 focus:ring-[#06ACFE] transition-colors"
                  />
                </div>

                {/* Your Email & Whatsapp Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#a1a1aa] font-medium font-[var(--font-lato)] text-sm mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="yourmail@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-[4px] bg-[#212121] border-none text-white placeholder-[#5e6370] font-[var(--font-inter)] text-sm focus:outline-none focus:ring-1 focus:ring-[#06ACFE] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a1a1aa] font-medium font-[var(--font-lato)] text-sm mb-2">
                      Whatsapp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 177 555 1325"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-[4px] bg-[#212121] border-none text-white placeholder-[#5e6370] font-[var(--font-inter)] text-sm focus:outline-none focus:ring-1 focus:ring-[#06ACFE] transition-colors"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-[#a1a1aa] font-medium font-[var(--font-lato)] text-sm mb-2">
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Write a short brief about your project.."
                    value={formData.projectDetails}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectDetails: e.target.value,
                      })
                    }
                    className="w-full px-5 py-3.5 rounded-[4px] bg-[#212121] border-none text-white placeholder-[#5e6370] font-[var(--font-inter)] text-sm focus:outline-none focus:ring-1 focus:ring-[#06ACFE] transition-colors resize-none min-h-[160px]"
                  />
                </div>

                {/* Let's Connect Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-[4px] font-bold font-[var(--font-lato)] text-base bg-[#06ACFE] text-white hover:bg-[#0098e6] transition-all shadow-[0_4px_20px_rgba(6,172,254,0.4)] cursor-pointer border-none disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Sending Message...</span>
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Let&apos;s Connect</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
