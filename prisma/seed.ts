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
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Executive Overview & Scope",
            description: "Triply is an all-inclusive travel planning and booking ecosystem designed for modern explorers. The platform consolidates flights, accommodation, local guided tours, and custom travel itineraries into a single friction-free mobile experience.",
            image: "/assets/figma_img_23.png"
          },
          {
            id: "sec_2",
            title: "02. Wireframing & UX Architecture",
            description: "To resolve user checkout hesitation, we developed low-fidelity interactive wireframes focusing on progressive disclosure. We restructured the booking funnel into three clear steps: Destination Selection, Custom Package Bundling, and Transparent Payment Confirmation.",
            image: "/assets/figma_img_24.png"
          }
        ]),
        problem: "Travelers frequently dropped off during multi-destination package checkouts due to cluttered filters, hidden add-on fees, unoptimized mobile navigation, and confusing itinerary confirmation steps.",
        researchImage: "/assets/figma_img_23.png",
        researchText: "Our research team conducted qualitative 1-on-1 interviews with 35 active travelers and audited top competitor platforms. We mapped user friction points to discover that 68% of users felt anxious about ambiguous cancellation policies and unexpected booking fees during flight and hotel bundle checkouts.",
        wireframeImage: "/assets/figma_img_24.png",
        wireframeText: "To resolve user checkout hesitation, we developed low-fidelity interactive wireframes focusing on progressive disclosure.",
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
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Platform Overview",
            description: "Plate connects food lovers with top-rated dining establishments, enabling seamless table reservations, pre-ordering, and personalized culinary recommendations.",
            image: "/assets/figma_img_23.png"
          }
        ]),
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
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Dashboard Architecture",
            description: "Yenex empowers corporate finance teams to visualize real-time cashflow, automate reconciliation, and generate executive reports in seconds.",
            image: "/assets/project_yenex_exact.png"
          }
        ]),
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
    },
    {
      slug: "apex-fitness",
      title: "Apex — AI-Powered Fitness & Nutrition Coach",
      shortDesc: "An intelligent mobile companion app that creates real-time adaptive workout plans and macro tracking using AI computer vision.",
      category: "mobile",
      categoryTag: "Mobile Apps",
      tagColor: "text-purple-400",
      impactPill: "+210% Active Users",
      pages: "50+ Screens",
      duration: "4 Months",
      role: "Lead Mobile UI/UX Designer",
      tools: "Figma, React Native, Swift",
      featured: true,
      heroImage: "/assets/figma_img_23.png",
      caseStudy: {
        subtitle: "AI Fitness & Real-Time Macro Tracker Mobile Application",
        summary: "Designed an intuitive mobile app that simplified workout logging and food macro tracking using computer vision AI.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. App Overview & Scope",
            description: "Apex merges real-time AI pose detection with personalized nutrition tracking to create an all-in-one health assistant for athletes.",
            image: "/assets/figma_img_23.png"
          }
        ]),
        problem: "Gym-goers struggled with complex manual macro logging apps that required dozens of taps per meal.",
        solution: "Introduced 1-tap AI meal camera scanning and automatic exercise set detection.",
        results: JSON.stringify([
          "Increased daily active user retention by 210%",
          "Achieved 4.9 Star Rating on App Store",
          "Logged 1.5M+ workouts in first quarter"
        ]),
        screens: JSON.stringify([
          "/assets/figma_img_23.png",
          "/assets/screen_8_168.png"
        ]),
        teamSize: "3 Designers, 5 Engineers",
        timeline: "4 Months",
        technologies: "Figma, React Native, TensorFlow"
      }
    },
    {
      slug: "finova-wallet",
      title: "Finova — Neobank & Wealth Management Platform",
      shortDesc: "A modern global banking experience simplifying cross-border transfers, multi-currency wallets, and digital asset investments.",
      category: "saas",
      categoryTag: "SaaS",
      tagColor: "text-cyan-400",
      impactPill: "$1.2B Managed",
      pages: "60+ Screens",
      duration: "6 Months",
      role: "Principal Product Designer",
      tools: "Figma, Next.js, Tailwind CSS",
      featured: false,
      heroImage: "/assets/project_yenex_exact.png",
      caseStudy: {
        subtitle: "Global FinTech Neobanking & Investment Dashboard",
        summary: "Redesigned cross-border remittance flows and crypto investment dashboards for high-net-worth enterprise clients.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Financial Architecture",
            description: "Finova consolidates traditional bank accounts, fiat currencies, and digital crypto assets into a single unified financial dashboard.",
            image: "/assets/project_yenex_exact.png"
          }
        ]),
        problem: "Complex multi-step KYC verification and unclear exchange rates caused high drop-offs during transaction setups.",
        solution: "Designed transparent rate conversion cards and simplified biometric authorization.",
        results: JSON.stringify([
          "Processed over $1.2 Billion in volume in 2025",
          "Reduced KYC verification completion time by 65%"
        ]),
        screens: JSON.stringify([
          "/assets/project_yenex_exact.png"
        ]),
        teamSize: "4 Designers, 10 Engineers",
        timeline: "6 Months",
        technologies: "Figma, Next.js, Web3.js"
      }
    },
    {
      slug: "wander-stay",
      title: "WanderStay — Luxury Villa & Estate Rentals",
      shortDesc: "Exclusive vacation rental platform connecting travelers with handpicked private luxury estates and 24/7 concierge services.",
      category: "travel",
      categoryTag: "Travel",
      tagColor: "text-[#06ACFE]",
      impactPill: "4.95 Rating",
      pages: "35+ Screens",
      duration: "3 Months",
      role: "Senior UI/UX Designer",
      tools: "Figma, Framer, Motion",
      featured: false,
      heroImage: "/assets/project_triply_exact.png",
      caseStudy: {
        subtitle: "Luxury Real Estate & Concierge Booking Platform",
        summary: "Created a high-end booking portal with virtual 3D property tours and custom butler service booking.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Hospitality Experience",
            description: "WanderStay delivers boutique travel booking tailored for luxury vacationers seeking privacy and high-touch concierge support.",
            image: "/assets/figma_img_24.png"
          }
        ]),
        problem: "Guests lacked confidence when booking high-value private villas without immersive visual verification.",
        solution: "Implemented 360-degree interactive room tours and verified host badging.",
        results: JSON.stringify([
          "Boosted villa reservation conversions by 185%",
          "Earned 4.95 average luxury traveler rating"
        ]),
        screens: JSON.stringify([
          "/assets/project_triply_exact.png",
          "/assets/figma_img_24.png"
        ]),
        teamSize: "2 Designers, 4 Engineers",
        timeline: "3 Months",
        technologies: "Figma, React, Tailwind CSS"
      }
    },
    {
      slug: "gourmet-hub",
      title: "GourmetHub — Cloud Kitchen & Fast Delivery App",
      shortDesc: "A high-speed food ordering network connecting artisan cloud kitchens with instant hyper-local delivery tracking.",
      category: "restaurant",
      categoryTag: "Restaurant",
      tagColor: "text-emerald-400",
      impactPill: "18 Min Delivery",
      pages: "45+ Screens",
      duration: "3.5 Months",
      role: "Lead UI Designer",
      tools: "Figma, React Native",
      featured: false,
      heroImage: "/assets/project_plate_exact.png",
      caseStudy: {
        subtitle: "Hyper-Local Food Delivery & Order Dispatch System",
        summary: "Engineered live driver tracking, real-time kitchen status updates, and 1-tap food re-ordering.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Kitchen Dispatch Overview",
            description: "GourmetHub optimizes order dispatch between local cloud kitchens and delivery drivers to guarantee meal freshness.",
            image: "/assets/project_plate_exact.png"
          }
        ]),
        problem: "Delayed delivery notifications led to order cancellations and poor user feedback.",
        solution: "Designed animated live GPS driver progress maps and instant push notifications.",
        results: JSON.stringify([
          "Reduced average order delivery time to 18 minutes",
          "Increased 30-day repeat customer rate by 75%"
        ]),
        screens: JSON.stringify([
          "/assets/project_plate_exact.png",
          "/assets/figma_img_23.png"
        ]),
        teamSize: "3 Designers, 6 Engineers",
        timeline: "3.5 Months",
        technologies: "Figma, React Native, Node.js"
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
      content: JSON.stringify([
        {
          id: "s1",
          title: "The Evolution of Spatial & Adaptive Interfaces",
          description: "Design is no longer just about static visual aesthetics — it is a living language. In 2026, the boundaries between web, mobile, and spatial computing have blurred significantly. Designers are moving from static layouts to adaptive component trees that adjust based on user behavior.",
          image: "/assets/figma_img_23.png"
        },
        {
          id: "s2",
          title: "AI-Powered Dynamic Personalization & Micro-Interactions",
          description: "Micro-animations are no longer optional polish — they guide user focus and provide essential feedback during complex tasks while AI optimizes layout density dynamically.",
          image: "/assets/figma_img_24.png"
        }
      ])
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
      content: JSON.stringify([
        {
          id: "s1",
          title: "Why Design Tokens Matter in Enterprise Tech",
          description: "Design tokens bridge the gap between Figma design files and production code bases. By tokenizing color, spacing, radius, and typography scales, teams maintain 100% consistency across platforms.",
          image: "/assets/figma_img_28.png"
        }
      ])
    },
    {
      slug: "mastering-auto-layout-5",
      title: "Mastering Auto Layout 5.0 & Variable Components in Figma",
      excerpt: "A practical breakdown of nesting auto-layout frames, absolute positioning, dynamic wrap behavior, and multi-device fluid constraints.",
      category: "Design Systems",
      tags: "Figma, Auto Layout, Components, Design Systems",
      coverImage: "/assets/figma_img_28.png",
      readTime: "7 min read",
      published: true,
      featured: true,
      content: JSON.stringify([
        {
          id: "s1",
          title: "Fluid Constraints & Flex Wrap Container Systems",
          description: "Auto Layout 5.0 introduces min/max dimensions, flex wrap containers, and slot components that map perfectly to CSS Grid and Flexbox layout systems.",
          image: "/assets/figma_img_28.png"
        }
      ])
    },
    {
      slug: "ai-in-product-design",
      title: "How Generative AI is Transforming UI/UX Prototyping",
      excerpt: "Discover how AI text-to-UI prompts, synthetic user testing, and automated accessibility auditing accelerate design velocity by 4x.",
      category: "AI & Tech",
      tags: "AI, UX Research, Design Tools, Prototyping",
      coverImage: "/assets/figma_img_24.png",
      readTime: "6 min read",
      published: true,
      featured: false,
      content: JSON.stringify([
        {
          id: "s1",
          title: "Synthetic User Testing & AI Prompts",
          description: "Generative AI is shifting product design from manual pixel pushing to high-level system architecture and user flow orchestration.",
          image: "/assets/figma_img_24.png"
        }
      ])
    },
    {
      slug: "designing-dark-mode-interfaces",
      title: "Designing High-Contrast Dark Mode UIs with HSL Tokens",
      excerpt: "Why pure black backgrounds strain eyes and how layered dark grays with glowing blue accents improve readability in enterprise dashboards.",
      category: "Design Trends",
      tags: "Dark Mode, Color Tokens, UI Aesthetics, Ergonomics",
      coverImage: "/assets/blog_thumb.png",
      readTime: "5 min read",
      published: true,
      featured: false,
      content: JSON.stringify([
        {
          id: "s1",
          title: "The Science of Dark Mode Ergonomics",
          description: "Layering surface elevations with subtle opacity borders creates visual hierarchy without blinding users during prolonged usage.",
          image: "/assets/blog_thumb.png"
        }
      ])
    },
    {
      slug: "ux-writing-and-microcopy",
      title: "The Power of Microcopy: UX Writing That Converts",
      excerpt: "How subtle wording tweaks on checkout CTA buttons, error states, and empty states reduce user friction and boost conversion rates.",
      category: "UX Research",
      tags: "UX Writing, Microcopy, Conversion Rate Optimization",
      coverImage: "/assets/figma_img_23.png",
      readTime: "4 min read",
      published: true,
      featured: false,
      content: JSON.stringify([
        {
          id: "s1",
          title: "Microcopy Bottlenecks in Checkouts",
          description: "Clear, reassuring copy next to action buttons eliminates buyer anxiety and clarifies next steps during user transactions.",
          image: "/assets/figma_img_23.png"
        }
      ])
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
