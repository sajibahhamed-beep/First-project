import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding portfolio database...");

  // 1. Create Default Admin User
  const passwordHash = await bcrypt.hash("admin123456", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@sajib.com" },
    update: {},
    create: {
      email: "admin@sajib.com",
      name: "Muhammad Sajib",
      passwordHash: passwordHash,
      role: "ADMIN",
    },
  });
  console.log("Admin user created/verified:", admin.email);

  // 2. Create Initial Projects & Case Studies
  const projectsData = [
    {
      slug: "triply",
      title: "Easy Booking for Dream Trips",
      shortDesc: "Triply is a hassle-free & effective tour solution for travelers. It's an all-inclusive booking and planning website that helps people make their dream trips easier.",
      category: "travel",
      categoryTag: "Travel",
      tagColor: "text-[#06ACFE]",
      impactPill: "3.2x Booking Rate",
      pages: "40+ Screens",
      duration: "2.5 Months",
      role: "Lead UI/UX Designer",
      tools: "Figma, React, Tailwind CSS",
      featured: true,
      heroImage: "/assets/project_triply_exact.png",
      caseStudy: {
        subtitle: "End-to-End Travel Planning & Tour Booking UX Case Study",
        summary: "A complete UX redesign of Triply's mobile travel platform that streamlined itinerary discovery, simplified multi-destination checkout flows, and boosted booking completion by 3.2x.",
        overview: "Triply is an all-inclusive travel planning and booking ecosystem designed for modern explorers. The platform consolidates flights, accommodation, local guided tours, and custom travel itineraries into a single friction-free mobile experience.",
        problem: "Travelers frequently dropped off during multi-destination package checkouts due to cluttered filters, hidden add-on fees, unoptimized mobile navigation, and confusing itinerary confirmation steps.",
        researchImage: "/assets/figma_img_23.png",
        researchText: "Our research team conducted qualitative 1-on-1 interviews with 35 active travelers and audited top competitor platforms. We mapped user friction points to discover that 68% of users felt anxious about ambiguous cancellation policies and unexpected booking fees during flight and hotel bundle checkouts.",
        wireframeImage: "/assets/figma_img_24.png",
        wireframeText: "To resolve user checkout hesitation, we developed low-fidelity interactive wireframes focusing on progressive disclosure. We restructured the booking funnel into three clear steps: Destination Selection, Custom Package Bundling, and Transparent 1-Click Payment Confirmation.",
        designSystemImage: "/assets/figma_img_28.png",
        designSystemText: "We built a comprehensive Figma design system featuring responsive HSL color tokens, dark-mode glassmorphic cards, Lato heading scales, Inter body typography, and 120+ reusable component variants with Auto Layout 5.0 constraints.",
        solution: "Engineered an intuitive 3-step property & tour evaluation flow with dynamic map filters, transparent pricing breakdowns, offline itinerary saving, and instant 1-click booking confirmations.",
        results: JSON.stringify([
          "Multi-destination checkout completion rate multiplied by 3.2x",
          "Achieved 4.9/5 user rating across 15,000+ travel reviews",
          "Reduced mobile onboarding drop-off rate by 38%",
          "Engineered 100% responsive design tokens synced across iOS & Web"
        ]),
        screens: JSON.stringify([
          "/assets/figma_img_23.png",
          "/assets/figma_img_24.png",
          "/assets/screen_8_168.png"
        ]),
        teamSize: "4 Designers, 6 Engineers",
        timeline: "2.5 Months",
        technologies: "Figma, React, Next.js, Tailwind CSS"
      }
    },
    {
      slug: "plate",
      title: "Transform Your Dining Experience",
      shortDesc: "At Plate, we bring you a handpicked selection of premium restaurants that offer not just meals, but memorable dining experiences you'll cherish.",
      category: "restaurant",
      categoryTag: "Restaurant",
      tagColor: "text-orange-500",
      impactPill: "+140% Orders",
      pages: "40+ Screens",
      duration: "5 Months",
      role: "Senior Product Designer",
      tools: "Figma, Framer, Motion",
      featured: true,
      heroImage: "/assets/project_plate_exact.png",
      caseStudy: {
        subtitle: "Premium Restaurant Discovery & Table Reservation Platform",
        summary: "Designed a sleek mobile application for luxury restaurant reservations and curated culinary discovery that increased repeat bookings by 140%.",
        overview: "Plate connects food lovers with top-rated dining establishments, enabling seamless table reservations, pre-ordering, and personalized culinary recommendations.",
        problem: "Users struggled with fragmented restaurant discovery apps that lacked real-time table availability, rich visual menus, and instant confirmation capabilities.",
        researchImage: "/assets/figma_img_23.png",
        researchText: "Conducted surveys with 200+ food enthusiasts and interviewed restaurant managers to pinpoint booking bottlenecks.",
        wireframeImage: "/assets/figma_img_24.png",
        wireframeText: "Designed wireframes prioritizing visual dish previews, real-time seating maps, and 2-tap reservation confirmation.",
        solution: "Delivered a high-converting mobile UI featuring interactive visual menus, immersive food videography, and frictionless table booking.",
        results: JSON.stringify([
          "Increased monthly repeat restaurant bookings by 140%",
          "Reduced reservation abandonment rate by 42%",
          "Partnered with over 250 premium culinary venues"
        ]),
        screens: JSON.stringify([
          "/assets/figma_img_23.png",
          "/assets/screen_8_169.png"
        ]),
        teamSize: "3 Designers, 4 Engineers",
        timeline: "5 Months",
        technologies: "Figma, Framer, React Native"
      }
    },
    {
      slug: "yenex",
      title: "SaaS Financial Dashboard & Analytics",
      shortDesc: "Yenex simplifies complex financial workflows for modern teams with high-speed automated analytics, invoice tracking, and smart financial reporting.",
      category: "saas",
      categoryTag: "SaaS",
      tagColor: "text-amber-400",
      impactPill: "4.8 User Rating",
      pages: "35+ Screens",
      duration: "3 Months",
      role: "Lead UI/UX Designer",
      tools: "Figma, Design System, Next.js",
      featured: true,
      heroImage: "/assets/project_yenex_exact.png",
      caseStudy: {
        subtitle: "Next-Gen Enterprise SaaS Analytics Platform",
        summary: "Created an enterprise financial analytics dashboard that simplified complex data visualization and improved user productivity.",
        overview: "Yenex empowers corporate finance teams to visualize real-time cashflow, automate reconciliation, and generate executive reports in seconds.",
        problem: "Existing financial tools were cluttered, slow, and presented data in confusing multi-tab tables without clear actionable insights.",
        solution: "Built a high-density modular dashboard with custom charting components, dark mode toggle, and customizable widget layouts.",
        results: JSON.stringify([
          "Achieved 4.8/5 user satisfaction rating among enterprise users",
          "Reduced financial report generation time from 2 hours to 5 minutes"
        ]),
        screens: JSON.stringify([
          "/assets/project_yenex_exact.png"
        ]),
        teamSize: "2 Designers, 8 Engineers",
        timeline: "3 Months",
        technologies: "Figma, Next.js, Tailwind CSS, Recharts"
      }
    }
  ];

  for (const p of projectsData) {
    const { caseStudy, ...proj } = p;
    const existing = await prisma.project.findUnique({ where: { slug: proj.slug } });
    if (!existing) {
      await prisma.project.create({
        data: {
          ...proj,
          caseStudy: {
            create: caseStudy,
          },
        },
      });
    }
  }

  // 3. Create Initial Blogs
  const blogsData = [
    {
      slug: "future-of-ui-ux-design-2026",
      title: "The Future of UI/UX Design in 2026 & Beyond",
      excerpt: "Exploring spatial interfaces, AI-driven personalizations, dynamic design tokens, and the shift toward micro-interactions in modern web design.",
      category: "Design Trends",
      tags: "UI/UX, AI, Web Design, 2026",
      coverImage: "/assets/figma_img_23.png",
      readTime: "5 min read",
      published: true,
      featured: true,
      content: `## The Evolution of User Interfaces

Design is no longer just about static visual aesthetics — it is a living language. In 2026, the boundaries between web, mobile, and spatial computing have blurred significantly.

### 1. AI-Powered Dynamic Personalization
Designers are moving from static layouts to adaptive component trees that adjust based on user behavior, accessibility needs, and context.

### 2. Micro-Interactions & Fluid Motion
Micro-animations are no longer optional polish — they guide user focus and provide essential feedback during complex tasks.`
    },
    {
      slug: "building-scalable-design-systems-figma",
      title: "Building Scalable Design Systems in Figma",
      excerpt: "A practical guide to Auto Layout 5.0, variables, dark mode color scales, and syncing tokens directly with React components.",
      category: "Design Systems",
      tags: "Figma, Design Tokens, React, Tailwind",
      coverImage: "/assets/figma_img_28.png",
      readTime: "8 min read",
      published: true,
      featured: false,
      content: `## Why Design Tokens Matter

Design tokens bridge the gap between Figma design files and production code bases. By tokenizing color, spacing, radius, and typography scales, teams maintain 100% consistency across platforms.`
    }
  ];

  for (const b of blogsData) {
    const existing = await prisma.blog.findUnique({ where: { slug: b.slug } });
    if (!existing) {
      await prisma.blog.create({ data: b });
    }
  }

  // 4. Create Initial FAQs
  const faqsData = [
    {
      question: "What services do you offer?",
      answer: "I specialize in end-to-end UI/UX design, mobile application design, SaaS platforms, design system creation, webflow/framer development, and interactive prototyping.",
      category: "General"
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines depend on scope. Mobile apps & SaaS dashboards usually take 4 to 8 weeks, while landing pages and brand systems take 1 to 3 weeks.",
      category: "Process"
    },
    {
      question: "Do you offer custom design system setup for engineering teams?",
      answer: "Yes! I create comprehensive Figma component libraries with Auto Layout, responsive tokens, documentation, and matching Tailwind CSS / React component suites.",
      category: "Services"
    }
  ];

  for (const f of faqsData) {
    await prisma.faq.create({ data: f });
  }

  // 5. Create Initial Resumes
  const resumesData = [
    {
      title: "UX & Product Design Resume (2026)",
      filename: "Sajib_Product_Designer_Resume.pdf",
      fileUrl: "/assets/Sajib_Product_Designer_Resume.pdf",
      fileSize: "1.2 MB",
      isDefault: true,
      downloadCount: 42
    },
    {
      title: "General Portfolio CV",
      filename: "Sajib_General_CV.pdf",
      fileUrl: "/assets/Sajib_General_CV.pdf",
      fileSize: "950 KB",
      isDefault: false,
      downloadCount: 18
    }
  ];

  for (const r of resumesData) {
    await prisma.resume.create({ data: r });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
