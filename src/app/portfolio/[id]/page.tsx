import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Layers, Award, ShieldCheck, Sparkles, Search, Compass, Palette, TrendingUp } from "lucide-react";

interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  impactPill: string;
  pages: string;
  duration: string;
  role: string;
  tools: string;
  summary: string;
  overview: string;
  problem: string;
  researchImage: string;
  researchText: string;
  wireframeImage: string;
  wireframeText: string;
  designSystemImage: string;
  designSystemText: string;
  solution: string;
  results: string[];
  heroImage: string;
  screens: string[];
  nextId: string;
  nextTitle: string;
}

const caseStudies: Record<string, CaseStudyData> = {
  triply: {
    id: "triply",
    title: "Triply — Easy Booking for Dream Trips",
    subtitle: "End-to-End Travel Planning & Tour Booking UX Case Study",
    tag: "Travel & Hospitality",
    tagColor: "text-[#06ACFE]",
    impactPill: "3.2x Booking Rate",
    pages: "40+ Screens",
    duration: "2.5 Months",
    role: "Lead UI/UX Designer",
    tools: "Figma, React, Tailwind CSS",
    summary:
      "A complete UX redesign of Triply's mobile travel platform that streamlined itinerary discovery, simplified multi-destination checkout flows, and boosted booking completion by 3.2x.",
    overview:
      "Triply is an all-inclusive travel planning and booking ecosystem designed for modern explorers. The platform consolidates flights, accommodation, local guided tours, and custom travel itineraries into a single friction-free mobile experience.",
    problem:
      "Travelers frequently dropped off during multi-destination package checkouts due to cluttered filters, hidden add-on fees, unoptimized mobile navigation, and confusing itinerary confirmation steps.",
    researchImage: "/assets/figma_img_23.png",
    researchText:
      "Our research team conducted qualitative 1-on-1 interviews with 35 active travelers and audited top competitor platforms. We mapped user friction points to discover that 68% of users felt anxious about ambiguous cancellation policies and unexpected booking fees during flight and hotel bundle checkouts.",
    wireframeImage: "/assets/figma_img_24.png",
    wireframeText:
      "To resolve user checkout hesitation, we developed low-fidelity interactive wireframes focusing on progressive disclosure. We restructured the booking funnel into three clear steps: Destination Selection, Custom Package Bundling, and Transparent 1-Click Payment Confirmation.",
    designSystemImage: "/assets/figma_img_28.png",
    designSystemText:
      "We built a comprehensive Figma design system featuring responsive HSL color tokens, dark-mode glassmorphic cards, Lato heading scales, Inter body typography, and 120+ reusable component variants with Auto Layout 5.0 constraints.",
    solution:
      "Engineered an intuitive 3-step property & tour evaluation flow with dynamic map filters, transparent pricing breakdowns, offline itinerary saving, and instant 1-click booking confirmations.",
    results: [
      "Multi-destination checkout completion rate multiplied by 3.2x",
      "Achieved 4.9/5 user rating across 15,000+ travel reviews",
      "Reduced mobile onboarding drop-off rate by 38%",
      "Engineered 100% responsive design tokens synced across iOS & Web",
    ],
    heroImage: "/assets/project_triply_exact.png",
    screens: [
      "/assets/figma_img_23.png",
      "/assets/figma_img_24.png",
      "/assets/screen_8_168.png",
    ],
    nextId: "plate",
    nextTitle: "Plate — Transform Your Dining Experience",
  },

  plate: {
    id: "plate",
    title: "Plate — Transform Your Dining Experience",
    subtitle: "Digital Restaurant Reservations & Pre-Ordering Mobile App",
    tag: "Food & Restaurant",
    tagColor: "text-orange-500",
    impactPill: "+140% Orders",
    pages: "35+ Screens",
    duration: "5 Months",
    role: "Senior UI/UX Designer",
    tools: "Figma, Auto Layout 5.0",
    summary:
      "A food & dining experience app designed to eliminate table wait times through real-time floor plan reservations and instant digital menu pre-ordering.",
    overview:
      "Plate brings users a handpicked selection of top-tier restaurants, offering digital menu browsing, chef recommendations, table reservations, and seamless contactless checkout.",
    problem:
      "Restaurant patrons suffered from long wait times during peak dinner hours, while restaurant operators suffered from empty table slots due to uncoordinated reservation systems.",
    researchImage: "/assets/figma_img_28.png",
    researchText:
      "Through contextual inquiry and dining behavior surveys, we discovered that 74% of restaurant guests preferred pre-ordering appetizers and selecting exact table seats before leaving home to save time.",
    wireframeImage: "/assets/figma_img_29.png",
    wireframeText:
      "We prototyped a visual floor-map navigation system letting users pick specific window seats or outdoor dining tables, integrated directly with live kitchen order management queues.",
    designSystemImage: "/assets/screen_8_170.png",
    designSystemText:
      "Formulated an appetizing warm design system with amber accents, high-resolution food photography guidelines, and quick-add order micro-interactions.",
    solution:
      "Designed an interactive floor map reservation UI where guests select their exact table, pre-order meals 30 minutes prior to arrival, and complete bill payment automatically.",
    results: [
      "Increased total restaurant digital order volume by +140%",
      "Reduced table idle turnaround time by 25 minutes per reservation",
      "Expanded partner restaurant onboarding speed by 60%",
    ],
    heroImage: "/assets/project_plate_exact.png",
    screens: [
      "/assets/figma_img_28.png",
      "/assets/figma_img_29.png",
      "/assets/screen_8_170.png",
    ],
    nextId: "yenex",
    nextTitle: "Yenex — Sustainable Energy & Carbon Tracking",
  },

  yenex: {
    id: "yenex",
    title: "Yenex — Sustainable Energy & Carbon Tracking",
    subtitle: "B2B & Consumer Clean Energy Dashboard UX Case Study",
    tag: "SaaS CleanTech",
    tagColor: "text-amber-400",
    impactPill: "4.8 User Rating",
    pages: "45+ Screens",
    duration: "5 Months",
    role: "Lead UI/UX Designer",
    tools: "Figma, Data Viz UI",
    summary:
      "A complex clean energy dashboard redesign translating raw solar telemetry and battery data into intuitive daily energy targets and carbon footprint reductions.",
    overview:
      "Yenex is a smart energy platform empowering homeowners and enterprises to manage distributed solar panels, energy storage, and carbon offset credentials.",
    problem:
      "Users were overwhelmed by dense technical energy metrics, complex kilowatt telemetry graphs, and confusing power grid jargon.",
    researchImage: "/assets/figma_img_38.png",
    researchText:
      "Usability testing sessions revealed that non-technical users struggled to interpret traditional data charts. They needed clear financial savings numbers alongside carbon offset metrics.",
    wireframeImage: "/assets/figma_img_43.png",
    wireframeText:
      "We mapped out modular dashboard wireframes featuring customizable widget cards, daily power target gauges, and automated energy-saving recommendations.",
    designSystemImage: "/assets/screen_8_172.png",
    designSystemText:
      "Developed a dark-theme data visualization design system featuring high-contrast chart palettes, customizable widget grids, and WCAG AAA compliance.",
    solution:
      "Re-architected carbon data into clean, visual energy cards with dollar savings indicators, gamified daily power targets, and automated solar usage insights.",
    results: [
      "Maintained an overall 4.8/5 user satisfaction score across 20,000+ active users",
      "Helped customers achieve an average 22% monthly utility bill reduction",
      "Accelerated enterprise cloud dashboard adoption by 80%",
    ],
    heroImage: "/assets/project_yenex_exact.png",
    screens: [
      "/assets/figma_img_38.png",
      "/assets/figma_img_43.png",
      "/assets/screen_8_172.png",
    ],
    nextId: "fitmate",
    nextTitle: "Fitmate — Revolutionize Fitness Goals",
  },

  fitmate: {
    id: "fitmate",
    title: "Fitmate — Revolutionize Fitness Goals",
    subtitle: "AI-Driven Mobile Workout & Studio Membership UX Case Study",
    tag: "Healthcare & Fitness",
    tagColor: "text-pink-500",
    impactPill: "50k+ Members",
    pages: "40+ Screens",
    duration: "5 Months",
    role: "UI/UX Designer",
    tools: "Figma, Design Systems",
    summary:
      "A personalized mobile fitness platform connecting members across Australia with flexible studio passes and AI-powered workout recommendations.",
    overview:
      "Fitmate transforms fitness habits by allowing users to access multiple gym studios under one flexible membership, complete with real-time class booking and trainer feedback.",
    problem:
      "Static gym memberships caused user burnout due to repetitive workout routines and rigid annual contracts.",
    researchImage: "/assets/screen_8_176.png",
    researchText:
      "User interviews revealed that 81% of fitness enthusiasts lost motivation when locked into a single gym location. They desired flexible access to yoga, HIIT, and swimming studios near their workplace.",
    wireframeImage: "/assets/figma_img_50.png",
    wireframeText:
      "We designed frictionless class booking wireframes with instant location-based map discovery, trainer reviews, and calendar syncing.",
    designSystemImage: "/assets/figma_img_51.png",
    designSystemText:
      "Built a high-energy dark-mode design system with vibrant pink and neon accents, motivational stat counters, and haptic feedback triggers.",
    solution:
      "Created dynamic multi-studio booking UI, personalized AI workout scheduling, and interactive community progress tracking.",
    results: [
      "Scaled active monthly member subscriber base past 50,000+",
      "Increased weekly workout logging frequency by +72%",
      "Reduced gym membership churn rate by 34%",
    ],
    heroImage: "/assets/project_fitmate_exact.png",
    screens: [
      "/assets/screen_8_176.png",
      "/assets/figma_img_50.png",
      "/assets/figma_img_51.png",
    ],
    nextId: "zantrik",
    nextTitle: "Zantrik — Vehicle Maintenance Platform",
  },

  zantrik: {
    id: "zantrik",
    title: "Zantrik — Vehicle Maintenance Platform",
    subtitle: "Automotive Service Booking & Gamified Care Mobile App",
    tag: "Vehicle Care",
    tagColor: "text-teal-400",
    impactPill: "+85% Engagement",
    pages: "40+ Screens",
    duration: "5 Months",
    role: "UI/UX Specialist",
    tools: "Figma, Prototyping",
    summary:
      "An innovative vehicle care application revamped with intuitive service booking, gamified vehicle health tracking, and mechanic dispatching.",
    overview:
      "Zantrik is an automotive maintenance platform helping car and motorcycle owners book certified mechanics, track service history, and purchase genuine spare parts.",
    problem:
      "Vehicle owners struggled with opaque repair pricing, lack of mechanic accountability, and missing service record history.",
    researchImage: "/assets/screen_8_178.png",
    researchText:
      "Field research with vehicle owners revealed that fear of overcharging was the #1 barrier to routine car servicing. Users required transparent upfront pricing estimates.",
    wireframeImage: "/assets/screen_8_179.png",
    wireframeText:
      "We prototyped a step-by-step diagnostic wireframe flow where users input vehicle symptoms and receive instant itemized repair estimates before dispatching mechanics.",
    designSystemImage: "/assets/figma_img_60.png",
    designSystemText:
      "Engineered an automotive UI system with high-legibility status indicators, service health progress bars, and simplified checkout flows.",
    solution:
      "Designed a transparent upfront pricing calculator, real-time mechanic GPS tracking, digital service logbook, and emergency roadside assistance dispatch.",
    results: [
      "Boosted user app engagement frequency by +85%",
      "Increased digital mechanic dispatch bookings by +110%",
      "Reduced customer support inquiry volume by 42%",
    ],
    heroImage: "/assets/project_zantrik_exact.png",
    screens: [
      "/assets/screen_8_178.png",
      "/assets/screen_8_179.png",
      "/assets/figma_img_60.png",
    ],
    nextId: "dwelio",
    nextTitle: "Dwelio — Real Estate AI Ecosystem",
  },

  dwelio: {
    id: "dwelio",
    title: "Dwelio — Real Estate AI Ecosystem",
    subtitle: "Smart Property Search & Virtual Walkthrough UX Case Study",
    tag: "AI & Real Estate",
    tagColor: "text-[#06ACFE]",
    impactPill: "+64% Conversion",
    pages: "40+ Screens",
    duration: "3 Months",
    role: "Lead UI/UX Designer",
    tools: "Figma, React Native",
    summary:
      "An end-to-end UX case study detailing property discovery, virtual tours, and automated lease signing for modern homebuyers.",
    overview:
      "Dwelio combines artificial intelligence with virtual 3D tours to help renters and buyers find verified properties without unnecessary agent friction.",
    problem:
      "Unverified property listings and slow inquiry responses led to high user bounce rates and poor conversion rates.",
    researchImage: "/assets/screen_8_168.png",
    researchText:
      "Through user persona analysis, we identified that homebuyers spend over 14 days visiting physical open houses due to deceptive photo angles on existing listing sites.",
    wireframeImage: "/assets/screen_8_170.png",
    wireframeText:
      "We wireframed a virtual 3D walkthrough interface allowing renters to inspect room dimensions and lighting conditions directly inside the mobile app.",
    designSystemImage: "/assets/figma_img_9.png",
    designSystemText:
      "Formulated a clean, modern real estate component library with fluid spatial grids, glass cards, and accessible typography scales.",
    solution:
      "Designed AI-verified property badges, instant virtual tour previews, and direct 1-click tour scheduling with landlords.",
    results: [
      "Increased property tour booking conversion rate by +64%",
      "Cut average house searching period from 14 days down to 4 days",
      "Achieved 98% design-to-code component parity",
    ],
    heroImage: "/assets/screen_8_168.png",
    screens: [
      "/assets/screen_8_170.png",
      "/assets/figma_img_9.png",
      "/assets/figma_img_10.png",
    ],
    nextId: "triply",
    nextTitle: "Triply — Easy Booking for Dream Trips",
  },
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const caseStudyId = resolvedParams.id || "triply";
  const caseStudy = caseStudies[caseStudyId] || caseStudies.triply;

  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner using Top Heading.png as background (Left Aligned) */}
      <section
        className="relative pt-36 pb-20 px-6 md:px-12 bg-center bg-cover bg-no-repeat border-b border-white/5 overflow-hidden"
        style={{ backgroundImage: `url('/assets/Top Heading.png')` }}
      >
        <div className="max-w-7xl mx-auto text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[4px] bg-[#06ACFE]/10 border border-[#06ACFE]/30 text-[#06ACFE] text-sm font-bold font-[var(--font-lato)] mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:underline">
              Portfolio
            </Link>
            <span>/</span>
            <span>{caseStudy.tag}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-[var(--font-lato)] leading-tight text-white mb-3 max-w-4xl">
            {caseStudy.title}
          </h1>

          <p className="text-[#8e8e93] text-lg font-[var(--font-inter)] max-w-2xl leading-relaxed">
            {caseStudy.subtitle}
          </p>
        </div>
      </section>

      {/* Main Case Study Article Body */}
      <article className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Back Link & Impact Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[#06ACFE] font-bold font-[var(--font-lato)] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Portfolio Case Studies
          </Link>

          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-bold uppercase font-[var(--font-lato)] ${caseStudy.tagColor}`}
            >
              {caseStudy.tag}
            </span>
            <span className="px-4 py-1.5 rounded-[4px] bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 text-xs font-bold font-[var(--font-lato)]">
              {caseStudy.impactPill}
            </span>
          </div>
        </div>

        {/* Hero Showcase Image */}
        <div className="relative w-full h-[340px] sm:h-[480px] md:h-[560px] rounded-[4px] overflow-hidden mb-16 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] bg-[#141720]">
          <Image
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Project Metadata Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-[4px] bg-[#121826] border border-white/10 mb-20 shadow-lg">
          <div>
            <span className="block text-[#71717a] text-xs uppercase font-[var(--font-inter)] mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#06ACFE]" />
              Screens Delivered
            </span>
            <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
              {caseStudy.pages}
            </span>
          </div>
          <div>
            <span className="block text-[#71717a] text-xs uppercase font-[var(--font-inter)] mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#06ACFE]" />
              Timeline
            </span>
            <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
              {caseStudy.duration}
            </span>
          </div>
          <div>
            <span className="block text-[#71717a] text-xs uppercase font-[var(--font-inter)] mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#06ACFE]" />
              My Role
            </span>
            <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
              {caseStudy.role}
            </span>
          </div>
          <div>
            <span className="block text-[#71717a] text-xs uppercase font-[var(--font-inter)] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#06ACFE]" />
              Tech Stack
            </span>
            <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
              {caseStudy.tools}
            </span>
          </div>
        </div>

        {/* Structured UX/UI Case Study Phases with Embedded Research Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          {/* Left Column: Comprehensive UX Case Study Narrative */}
          <div className="lg:col-span-8 space-y-16 font-[var(--font-inter)] text-[#8e8e93]">
            {/* Executive Summary */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                Executive Summary &amp; Overview
              </h2>
              <p className="text-lg leading-relaxed text-zinc-300">
                {caseStudy.summary}
              </p>
              <p className="leading-relaxed text-base text-[#8e8e93]">
                {caseStudy.overview}
              </p>
            </div>

            {/* Problem Statement */}
            <div className="border-t border-white/10 pt-10 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                Problem Statement &amp; User Pain Points
              </h2>
              <div className="bg-[#141720] p-6 rounded-[4px] border border-white/10 border-l-4 border-l-[#06ACFE]">
                <p className="leading-relaxed text-base text-zinc-200">
                  {caseStudy.problem}
                </p>
              </div>
            </div>

            {/* Phase 01: UX Research & Discovery */}
            <div className="border-t border-white/10 pt-10 space-y-6">
              <div className="flex items-center gap-3">
                <Search className="w-6 h-6 text-[#06ACFE]" />
                <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                  01. UX Research &amp; User Persona Discovery
                </h2>
              </div>
              <p className="leading-relaxed text-base text-zinc-300">
                {caseStudy.researchText}
              </p>

              {/* Research Image Artifact */}
              <div className="my-6 rounded-[4px] overflow-hidden border border-white/10 relative h-[360px] sm:h-[420px] bg-[#141720] shadow-lg">
                <Image
                  src={caseStudy.researchImage}
                  alt={`${caseStudy.title} Research Artifacts`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Phase 02: Wireframing & Information Architecture */}
            <div className="border-t border-white/10 pt-10 space-y-6">
              <div className="flex items-center gap-3">
                <Compass className="w-6 h-6 text-[#06ACFE]" />
                <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                  02. Wireframing &amp; Information Architecture
                </h2>
              </div>
              <p className="leading-relaxed text-base text-zinc-300">
                {caseStudy.wireframeText}
              </p>

              {/* Wireframe Image Artifact */}
              <div className="my-6 rounded-[4px] overflow-hidden border border-white/10 relative h-[360px] sm:h-[420px] bg-[#141720] shadow-lg">
                <Image
                  src={caseStudy.wireframeImage}
                  alt={`${caseStudy.title} Wireframe & Flow Diagrams`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Phase 03: Figma Design System & UI Components */}
            <div className="border-t border-white/10 pt-10 space-y-6">
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6 text-[#06ACFE]" />
                <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                  03. Figma Design System &amp; Component Architecture
                </h2>
              </div>
              <p className="leading-relaxed text-base text-zinc-300">
                {caseStudy.designSystemText}
              </p>
              <p className="leading-relaxed text-base">
                {caseStudy.solution}
              </p>

              {/* Design System Image Artifact */}
              <div className="my-6 rounded-[4px] overflow-hidden border border-white/10 relative h-[360px] sm:h-[420px] bg-[#141720] shadow-lg">
                <Image
                  src={caseStudy.designSystemImage}
                  alt={`${caseStudy.title} Design Tokens & System`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Phase 04: Quantified Business ROI & Results */}
            <div className="border-t border-white/10 pt-10 space-y-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[#10b981]" />
                <h2 className="text-2xl md:text-3xl font-extrabold font-[var(--font-lato)] text-white">
                  04. Usability Metrics &amp; Quantified ROI
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-[4px] bg-[#141824] border border-white/10 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold font-[var(--font-lato)] text-white leading-snug">
                      {result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Case Study Sidebar Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="glass-card border border-white/10 p-8 rounded-[4px] bg-[#121826]/90 space-y-6 shadow-xl">
              <h3 className="text-xl font-extrabold font-[var(--font-lato)] text-white">
                Project Highlights
              </h3>

              <div className="space-y-4 text-sm font-[var(--font-inter)]">
                <div className="flex items-center gap-3 text-zinc-300">
                  <ShieldCheck className="w-5 h-5 text-[#06ACFE]" />
                  <span>100% Client NDA Compliant</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-[#06ACFE]" />
                  <span>Figma Auto Layout 5.0 Tokens</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-[#06ACFE]" />
                  <span>Full Design-to-Code Parity</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="w-full py-4 rounded-[4px] bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold font-[var(--font-lato)] text-sm transition-all shadow-[0_4px_20px_rgba(6,172,254,0.4)] flex items-center justify-center gap-2"
                >
                  Book a Call to Discuss Similar Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* High-Resolution Screen Gallery */}
        <div className="space-y-10 mb-24">
          <h2 className="text-3xl font-extrabold font-[var(--font-lato)] text-white text-center">
            Detailed Screen Mockups &amp; UI Showcase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.screens.map((screenImg, index) => (
              <div
                key={index}
                className="relative w-full h-[360px] rounded-[4px] overflow-hidden border border-white/10 shadow-lg bg-[#141720]"
              >
                <Image
                  src={screenImg}
                  alt={`${caseStudy.title} Screen ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next Case Study Navigation */}
        <div className="p-10 rounded-[4px] bg-gradient-to-r from-[#121826] to-[#090b0e] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[#71717a] text-xs uppercase tracking-wider block font-[var(--font-inter)] mb-1">
              Next Case Study
            </span>
            <h3 className="text-2xl font-bold font-[var(--font-lato)] text-white">
              {caseStudy.nextTitle}
            </h3>
          </div>

          <Link
            href={`/portfolio/${caseStudy.nextId}`}
            className="px-8 py-4 rounded-[4px] bg-[#181d28] hover:bg-[#222838] border border-white/10 text-white font-bold font-[var(--font-lato)] text-sm transition-all flex items-center gap-3 shrink-0"
          >
            Read Next Case Study
            <ArrowRight className="w-4 h-4 text-[#06ACFE]" />
          </Link>
        </div>
      </article>

      <CtaSection />
      <Footer />
    </main>
  );
}
