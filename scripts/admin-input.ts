import { POST as createBlog } from "../src/app/api/admin/blog/route";
import { POST as createProject } from "../src/app/api/admin/projects/route";

async function runAdminInput() {
  console.log("Submitting new dummy blogs and portfolio case studies via Admin Panel APIs...");

  // 1. Submit Dummy Blogs via Admin API Contract
  const dummyBlogs = [
    {
      title: "Designing Inclusive Accessibility Standards in 2026",
      slug: "designing-inclusive-accessibility-2026",
      excerpt: "A complete guide to WCAG 2.2 AAA contrast ratios, keyboard navigation focus rings, and screen reader semantic HTML tags.",
      category: "Accessibility",
      tags: "WCAG, Accessibility, Inclusive Design, UX",
      coverImage: "/assets/figma_img_28.png",
      readTime: "8 min read",
      published: true,
      featured: true,
      content: JSON.stringify([
        {
          id: "sec_1",
          title: "Why Accessibility is Non-Negotiable",
          description: "Designing accessible interfaces benefits everyone. By adhering to WCAG 2.2 AAA guidelines, we create digital products that empower users with visual, motor, or cognitive impairments.",
          image: "/assets/figma_img_28.png"
        }
      ])
    },
    {
      title: "How to Conduct High-Impact 1-on-1 User Interviews",
      slug: "high-impact-user-interviews-guide",
      excerpt: "Actionable user research strategies for asking non-leading questions, synthesizing affinity maps, and uncovering hidden user pain points.",
      category: "UX Research",
      tags: "UX Research, User Interviews, Qualitative Methods",
      coverImage: "/assets/blog_thumb.png",
      readTime: "5 min read",
      published: true,
      featured: false,
      content: JSON.stringify([
        {
          id: "sec_1",
          title: "Uncovering Unspoken User Needs",
          description: "Effective user research relies on open-ended probing rather than asking users what features they want built.",
          image: "/assets/blog_thumb.png"
        }
      ])
    }
  ];

  for (const blogData of dummyBlogs) {
    const req = new Request("http://localhost:3000/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData)
    });
    const res = await createBlog(req);
    const json = await res.json();
    console.log(`[Admin API] Blog Created: "${blogData.title}" ->`, json.success ? "SUCCESS" : json.error);
  }

  // 2. Submit Dummy Projects & Case Studies via Admin API Contract
  const dummyProjects = [
    {
      title: "NovaPay — Borderless B2B Corporate Card & Expense Portal",
      slug: "novapay-corporate-cards",
      shortDesc: "An automated expense management and real-time virtual corporate card issuing portal built for fast-scaling enterprise teams.",
      category: "saas",
      categoryTag: "SaaS & Finance",
      impactPill: "100% Tax Compliant",
      pages: "40+ Screens",
      duration: "3 Months",
      role: "Lead Product Designer",
      tools: "Figma, Next.js, Tailwind CSS",
      heroImage: "/assets/project_yenex_exact.png",
      liveUrl: "https://example.com/novapay",
      featured: true,
      published: true,
      displayOrder: 1,
      caseStudy: {
        subtitle: "Automated Corporate Card & Expense Analytics CMS",
        summary: "Eliminated manual expense reporting for enterprise finance teams with automated receipt matching and spend limits.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Enterprise Spend Architecture",
            description: "NovaPay provides real-time visibility into multi-department card spending and automated QuickBooks reconciliation.",
            image: "/assets/project_yenex_exact.png"
          }
        ]),
        problem: "Employees spent hours submitting manual receipts while finance managers lacked real-time spend visibility.",
        solution: "Designed instant virtual card generation with dynamic spend controls per employee.",
        results: ["Saved 15 hours per month for finance managers", "Reduced expense policy violations to zero", "100% automated receipt capture"],
        screens: ["/assets/project_yenex_exact.png", "/assets/figma_img_28.png"],
        teamSize: "3 Designers, 6 Engineers",
        timeline: "3 Months",
        technologies: "Figma, Next.js, Tailwind CSS"
      }
    },
    {
      title: "EcoDrive — Electric Vehicle Smart Charging & Navigation",
      slug: "ecodrive-ev-charging",
      shortDesc: "A nationwide EV charging network app with dynamic battery range prediction and automated station queue reservations.",
      category: "mobile",
      categoryTag: "Mobile Apps",
      impactPill: "350k+ EV Drivers",
      pages: "35+ Screens",
      duration: "2.5 Months",
      role: "Senior Mobile UX Designer",
      tools: "Figma, Flutter, Mapbox",
      heroImage: "/assets/project_triply_exact.png",
      liveUrl: "https://example.com/ecodrive",
      featured: true,
      published: true,
      displayOrder: 2,
      caseStudy: {
        subtitle: "Smart EV Station Navigation & Battery Optimization App",
        summary: "Simplified long-distance EV trip planning by mapping fast-charging hubs with guaranteed queue reservations.",
        overview: JSON.stringify([
          {
            id: "sec_1",
            title: "01. Trip Optimization Overview",
            description: "EcoDrive calculates terrain elevation, speed limits, and battery temperature to recommend optimal charging stops.",
            image: "/assets/figma_img_23.png"
          }
        ]),
        problem: "EV drivers experienced range anxiety and long wait times at busy charging stations during holiday travel.",
        solution: "Created 1-tap charger queue reservations and real-time plug availability forecasts.",
        results: ["Reduced driver charging wait times by 45%", "4.9/5 Rating across 350,000 active EV drivers"],
        screens: ["/assets/project_triply_exact.png", "/assets/figma_img_23.png"],
        teamSize: "2 Designers, 4 Engineers",
        timeline: "2.5 Months",
        technologies: "Figma, Flutter, Mapbox SDK"
      }
    }
  ];

  for (const projData of dummyProjects) {
    const req = new Request("http://localhost:3000/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projData)
    });
    const res = await createProject(req);
    const json = await res.json();
    console.log(`[Admin API] Project Created: "${projData.title}" ->`, json.success ? "SUCCESS" : json.error);
  }

  console.log("All Admin inputs completed successfully!");
}

runAdminInput()
  .catch(console.error)
  .finally(() => process.exit(0));
