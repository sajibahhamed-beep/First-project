import { POST as createProject } from "../src/app/api/admin/projects/route";

async function addFiveProjects() {
  console.log("Adding 5 new dummy projects via Admin API...");

  const fiveProjects = [
    {
      title: "LuxeStay — Luxury Resort Booking & Concierge",
      slug: "luxestay-resort-booking",
      shortDesc: "A high-end hospitality booking portal designed for boutique island resorts and private overwater villas.",
      category: "travel",
      categoryTag: "Travel & Hospitality",
      impactPill: "4.98 Rating",
      pages: "45+ Screens",
      duration: "3 Months",
      role: "Lead UI/UX Designer",
      tools: "Figma, Next.js, Tailwind CSS",
      heroImage: "/assets/project_triply_exact.png",
      liveUrl: "https://example.com/luxestay",
      featured: true,
      published: true,
      displayOrder: 3,
      caseStudy: {
        subtitle: "Boutique Island Resort & Butler Concierge Mobile Experience",
        summary: "Redesigned room reservation and private yacht transfer booking flows for high-end hospitality guests.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Resort Booking Architecture",
            description: "LuxeStay connects luxury travelers with private island villas, private jet charters, and 24/7 personal butler concierge support.",
            image: "/assets/project_triply_exact.png"
          }
        ]),
        problem: "High-value guests abandoned bookings due to cumbersome multi-page forms and lack of instant confirmation.",
        solution: "Engineered an effortless 2-step checkout with instant WhatsApp concierge integration.",
        results: ["3.8x increase in villa reservations", "4.98/5 user satisfaction score"],
        screens: ["/assets/project_triply_exact.png", "/assets/figma_img_23.png"],
        teamSize: "3 Designers, 5 Engineers",
        timeline: "3 Months",
        technologies: "Figma, Next.js, Tailwind CSS"
      }
    },
    {
      title: "BistroGo — Gourmet Table Reservations & Pre-Ordering",
      slug: "bistrogo-table-reservations",
      shortDesc: "An interactive restaurant platform enabling food enthusiasts to reserve premium tables and pre-order chef tasting menus.",
      category: "restaurant",
      categoryTag: "Restaurant & Dining",
      impactPill: "+180% Bookings",
      pages: "38+ Screens",
      duration: "2.5 Months",
      role: "Senior Product Designer",
      tools: "Figma, React, Motion",
      heroImage: "/assets/project_plate_exact.png",
      liveUrl: "https://example.com/bistrogo",
      featured: true,
      published: true,
      displayOrder: 4,
      caseStudy: {
        subtitle: "Interactive Dining Map & Tasting Menu Pre-Order Platform",
        summary: "Streamlined dining reservations with real-time seat selection maps and interactive dish previews.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Dining Map Experience",
            description: "BistroGo connects foodies with Michelin-starred dining rooms and exclusive pop-up culinary experiences.",
            image: "/assets/project_plate_exact.png"
          }
        ]),
        problem: "Diners experienced table reservation friction and long delays waiting for tasting menus.",
        solution: "Introduced 3D table floorplan selection and instant tasting menu pre-payment.",
        results: ["Increased repeat dining reservations by 180%", "Reduced table prep time by 25 mins"],
        screens: ["/assets/project_plate_exact.png", "/assets/figma_img_24.png"],
        teamSize: "2 Designers, 4 Engineers",
        timeline: "2.5 Months",
        technologies: "Figma, React, Framer Motion"
      }
    },
    {
      title: "CloudScale — Multi-Cloud Infrastructure Analytics",
      slug: "cloudscale-infrastructure-analytics",
      shortDesc: "A high-performance DevOps monitoring dashboard providing real-time CPU, server latency, and cloud cost optimization insights.",
      category: "saas",
      categoryTag: "SaaS & DevOps",
      impactPill: "4.9 User Score",
      pages: "55+ Screens",
      duration: "4 Months",
      role: "Principal UX Designer",
      tools: "Figma, Design System, Recharts",
      heroImage: "/assets/project_yenex_exact.png",
      liveUrl: "https://example.com/cloudscale",
      featured: true,
      published: true,
      displayOrder: 5,
      caseStudy: {
        subtitle: "Real-Time DevOps Server Monitoring & Cloud Cost Optimization",
        summary: "Built an enterprise dashboard simplifying multi-cloud telemetry and automated server alert management.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Telemetry Architecture",
            description: "CloudScale enables engineering teams to monitor Kubernetes clusters, server health, and AWS/GCP cloud expenditure.",
            image: "/assets/project_yenex_exact.png"
          }
        ]),
        problem: "DevOps engineers were overwhelmed by fragmented logs and delayed incident alerts.",
        solution: "Designed a high-density dark-mode telemetry dashboard with custom charting widgets.",
        results: ["Reduced server incident response time by 50%", "4.9/5 satisfaction rating across 500+ DevOps teams"],
        screens: ["/assets/project_yenex_exact.png"],
        teamSize: "4 Designers, 8 Engineers",
        timeline: "4 Months",
        technologies: "Figma, Next.js, Recharts"
      }
    },
    {
      title: "PulseHealth — Telehealth & Remote Patient Monitoring",
      slug: "pulsehealth-telehealth-app",
      shortDesc: "A HIPAA-compliant mobile telehealth portal connecting patients with specialist doctors for video calls and prescriptions.",
      category: "mobile",
      categoryTag: "Mobile Apps",
      impactPill: "500k+ Consults",
      pages: "42+ Screens",
      duration: "3.5 Months",
      role: "Lead Mobile UX Designer",
      tools: "Figma, React Native",
      heroImage: "/assets/figma_img_23.png",
      liveUrl: "https://example.com/pulsehealth",
      featured: false,
      published: true,
      displayOrder: 6,
      caseStudy: {
        subtitle: "Virtual Doctor Appointments & Digital Prescription Wallet",
        summary: "Redesigned virtual care video consultations and prescription fulfillment for elderly and remote patients.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Telehealth Experience",
            description: "PulseHealth provides 24/7 access to board-certified physicians with automated pharmacy delivery.",
            image: "/assets/figma_img_23.png"
          }
        ]),
        problem: "Patients faced confusing onboarding forms and video connectivity issues.",
        solution: "Engineered 1-tap video room join flows and simplified prescription status tracking.",
        results: ["Completed over 500,000 virtual consultations", "Reduced patient check-in drop-off by 40%"],
        screens: ["/assets/figma_img_23.png", "/assets/screen_8_168.png"],
        teamSize: "3 Designers, 6 Engineers",
        timeline: "3.5 Months",
        technologies: "Figma, React Native, WebRTC"
      }
    },
    {
      title: "UrbanPay — Smart Transit & Contactless Micro-Payments",
      slug: "urbanpay-transit-payments",
      shortDesc: "A contactless mobile transit wallet enabling commuters to tap-to-ride buses, metros, and e-scooters with zero friction.",
      category: "mobile",
      categoryTag: "Mobile Apps",
      impactPill: "2M+ Daily Taps",
      pages: "30+ Screens",
      duration: "2 Months",
      role: "Product Designer",
      tools: "Figma, Swift, iOS NFC",
      heroImage: "/assets/project_triply_exact.png",
      liveUrl: "https://example.com/urbanpay",
      featured: false,
      published: true,
      displayOrder: 7,
      caseStudy: {
        subtitle: "Sub-Second Contactless Transit Fare Wallet",
        summary: "Designed sub-second NFC tap-and-go transit payments and route fare calculation.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Transit Tap Architecture",
            description: "UrbanPay powers city transit systems with instant fare capping and NFC ticket validation.",
            image: "/assets/project_triply_exact.png"
          }
        ]),
        problem: "Commuters faced long ticket kiosk queues during rush hours.",
        solution: "Created dynamic Apple Wallet / Google Pay tap passes with instant auto-reload.",
        results: ["Processed over 2 Million daily transit taps", "Saved commuters an average of 8 minutes per trip"],
        screens: ["/assets/project_triply_exact.png", "/assets/figma_img_24.png"],
        teamSize: "2 Designers, 4 Engineers",
        timeline: "2 Months",
        technologies: "Figma, Swift, CoreNFC"
      }
    }
  ];

  for (const projData of fiveProjects) {
    const req = new Request("http://localhost:3000/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projData)
    });
    const res = await createProject(req);
    const json = await res.json();
    console.log(`[Admin API] Project Created: "${projData.title}" ->`, json.success ? "SUCCESS" : json.error);
  }

  console.log("5 new dummy projects added successfully!");
}

addFiveProjects()
  .catch(console.error)
  .finally(() => process.exit(0));
