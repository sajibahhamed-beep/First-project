import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function PrivacyPage() {
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
            <span>Privacy Policy</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-[var(--font-lato)] leading-tight text-white mb-2">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Main Privacy Policy Content */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="glass-card p-8 md:p-14 rounded-[4px] border border-white/10 bg-[#121826]/70 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8 font-[var(--font-inter)] text-[#8e8e93]">
          <div>
            <p className="text-sm text-[#71717a] mb-6">
              Last Updated: January 29, 2026
            </p>
            <p className="text-base leading-relaxed text-zinc-300">
              Welcome to Sajuxly. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our UI/UX design services.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold font-[var(--font-lato)] text-white mb-3">
              1. Information We Collect
            </h2>
            <p className="leading-relaxed mb-3">
              We may collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our services, such as:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm">
              <li>Full Name and Email Address</li>
              <li>Phone or WhatsApp Number</li>
              <li>Location / Country details</li>
              <li>Project briefs and consultation requirements</li>
            </ul>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold font-[var(--font-lato)] text-white mb-3">
              2. How We Use Your Information
            </h2>
            <p className="leading-relaxed mb-3">
              We use the collected information for specific business purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm">
              <li>Responding to inquiries and booking consultations</li>
              <li>Delivering custom UI/UX design services and deliverables</li>
              <li>Drafting Non-Disclosure Agreements (NDAs) upon request</li>
              <li>Improving site navigation, performance, and user experience</li>
            </ul>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold font-[var(--font-lato)] text-white mb-3">
              3. Data Security & Confidentiality
            </h2>
            <p className="leading-relaxed">
              We prioritize the protection of your intellectual property and project assets. All client project briefs, wireframes, and design files remain strictly confidential and will never be shared without prior explicit authorization.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold font-[var(--font-lato)] text-white mb-3">
              4. Third-Party Services & Cookies
            </h2>
            <p className="leading-relaxed">
              Our website may utilize essential cookies or privacy-conscious analytics services to understand traffic trends and optimize site load times. We do not sell or monetize any user tracking data.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold font-[var(--font-lato)] text-white mb-3">
              5. Contact Us
            </h2>
            <p className="leading-relaxed mb-4">
              If you have any questions or concerns regarding this Privacy Policy or your personal data, please contact us at:
            </p>
            <div className="bg-[#181d28] p-4 rounded-[4px] border border-white/10 text-white font-[var(--font-lato)] text-sm space-y-1">
              <p><strong>WhatsApp:</strong> +880 177 555 1325</p>
              <p><strong>Email:</strong> ElizabethJ@jourrapide.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
