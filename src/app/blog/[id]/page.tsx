import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CtaSection from "@/components/CtaSection";
import { ArrowLeft, ArrowRight, User, Calendar } from "lucide-react";

interface ArticleData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  heroImage: string;
  secondaryImage: string;
  quote: string;
  p1: string;
  p2: string;
  subheading1: string;
  p3: string;
  p4: string;
  subheading2: string;
  p5: string;
  p6: string;
  subheading3: string;
  p7: string;
  nextId: number;
  nextTitle: string;
}

const articles: Record<number, ArticleData> = {
  1: {
    id: 1,
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    subtitle: "A comprehensive analysis of how design systems, AI tools, and remote workflows reshape modern enterprise engineering teams.",
    category: "Technology",
    author: "Muhammad Sajib",
    authorRole: "Lead Product Designer & Founder",
    date: "August 20, 2026",
    readTime: "5 min read",
    heroImage: "/assets/blog_thumb.png",
    secondaryImage: "/assets/figma_img_29.png",
    quote: "Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy.",
    p1: "Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.",
    p2: "One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.",
    subheading1: "Research Your Destination",
    p3: "Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas.",
    p4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Viverra adipiscing at in tellus.",
    subheading2: "Plan Your Itinerary",
    p5: "While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget. Identify the must-see sights and experiences and prioritize them according to your interests and preferences. This will help you avoid overscheduling and ensure that you have time to relax and enjoy your journey.",
    p6: "Vitae sapien pellentesque habitant morbi tristique. Luctus venenatis lectus magna fringilla. Nec ullamcorper sit amet risus nullam eget felis. Tincidunt arcu non sodales neque sodales ut etiam sit amet.",
    subheading3: "Pack Lightly and Smartly",
    p7: "Packing can be a daunting task, but with some careful planning and smart choices, you can pack light and efficiently. Start by making a packing list and sticking to the essentials. Choose versatile clothing pieces that can be mixed and matched, and opt for travel-sized toiletries.",
    nextId: 2,
    nextTitle: "Mastering Auto Layout 5.0 & Variable Components",
  },

  2: {
    id: 2,
    title: "Mastering Auto Layout 5.0 & Variable Components in Figma",
    subtitle: "Nesting auto-layout frames, absolute positioning, and dynamic fluid constraints for multi-device web layouts.",
    category: "Figma",
    author: "Muhammad Sajib",
    authorRole: "Lead Product Designer & Founder",
    date: "August 15, 2026",
    readTime: "7 min read",
    heroImage: "/assets/figma_img_29.png",
    secondaryImage: "/assets/figma_img_38.png",
    quote: "Standardizing component constraints in Figma eliminates layout bugs across mobile and desktop viewports.",
    p1: "Auto Layout 5.0 revolutionized how digital designers construct responsive components. Understanding how Hug Contents, Fill Container, and Fixed Dimensions interact enables designers to create layouts that feel like actual frontend CSS flexbox and grid.",
    p2: "When building complex card layouts or data tables, nesting Auto Layout frames logically prevents component breaking. Additionally, utilizing absolute positioning within Auto Layout frames lets you position badge indicators or close icons without disrupting flex alignment.",
    subheading1: "Research Your Component Hierarchy",
    p3: "Before building component variants, map out your visual hierarchy and layout rules. Group component property controls to reduce clutter and maintain clear component documentation.",
    p4: "By establishing atomic design tokens directly inside Figma, teams maintain visual consistency while accelerating production velocity across sprint cycles.",
    subheading2: "Plan Your Responsive Token Scale",
    p5: "Separate primitive tokens from semantic design tokens in Figma. This abstraction allows you to switch themes or tweak brand palettes seamlessly across hundreds of screens in minutes.",
    p6: "Leveraging Figma's Auto Layout 5.0 constraints ensures component variants naturally adjust to fluid screen dimensions.",
    subheading3: "Document Handoff Specs Clearly",
    p7: "Pairing Figma component libraries with React Tailwind UI kits bridges the gap between design handoff and production-ready code.",
    nextId: 3,
    nextTitle: "UX Research Best Practices for High-Converting SaaS Dashboards",
  },

  3: {
    id: 3,
    title: "UX Research Best Practices for High-Converting SaaS Dashboards",
    subtitle: "How qualitative user testing and friction analysis helped increase dashboard retention rates by 40%.",
    category: "Case Studies",
    author: "Muhammad Sajib",
    authorRole: "Lead Product Designer & Founder",
    date: "August 10, 2026",
    readTime: "6 min read",
    heroImage: "/assets/figma_img_38.png",
    secondaryImage: "/assets/figma_img_43.png",
    quote: "Progressive disclosure reduces cognitive load, allowing users to focus on actionable insights.",
    p1: "Enterprise SaaS dashboards often suffer from data density overload. Discover how targeted user research and card sorting simplified complex metrics into high-converting user flows.",
    p2: "When users land on a B2B SaaS dashboard, they need immediate clarity on key performance metrics without wading through irrelevant telemetry clutter. Conducting unmoderated user testing sessions exposes hidden usability friction points.",
    subheading1: "Understand Your Users' Workflow",
    p3: "By applying progressive disclosure principles, secondary analytics and dense raw data tables are tucked behind clean drawer panels or drill-down tabs, keeping the primary view uncluttered.",
    p4: "In a recent SaaS project, restructuring the visual hierarchy reduced onboarding bounce rates by 35% and boosted weekly active management engagement by 40%.",
    subheading2: "Prioritize Core Conversion Metrics",
    p5: "Conducted card sorting to organize navigation taxonomies and prioritize high-impact primary metrics on dashboard landing views.",
    p6: "Iterative prototype testing ensures that key data visualizations are instantly understandable for executive stakeholders.",
    subheading3: "Optimize Mobile Dashboard Experience",
    p7: "Ensuring full responsiveness across tablet and mobile breakpoints keeps decision makers connected on the go.",
    nextId: 4,
    nextTitle: "The Psychology of Micro-Interactions in Mobile Apps",
  },

  4: {
    id: 4,
    title: "The Psychology of Micro-Interactions in Mobile Apps",
    subtitle: "Subtle animations, loading states, and tactile micro-feedback that delight users and elevate product feel.",
    category: "UI Trends",
    author: "Muhammad Sajib",
    authorRole: "Lead Product Designer & Founder",
    date: "August 05, 2026",
    readTime: "4 min read",
    heroImage: "/assets/figma_img_43.png",
    secondaryImage: "/assets/figma_img_50.png",
    quote: "Micro-interactions turn functional software into delightful, memorable user experiences.",
    p1: "Micro-interactions are the subtle visual and tactile details that turn a functional product into a memorable, delightful user experience.",
    p2: "From the satisfying button bounce when liking a post to smooth skeleton loading state transitions, micro-interactions provide subconscious feedback that confirms user actions instantly.",
    subheading1: "Design Tactile State Triggers",
    p3: "Well-crafted micro-interactions reduce user anxiety during background API calls by replacing static spinners with dynamic progress indicators.",
    p4: "When designing micro-interactions in Figma and Framer, keep animation durations between 200ms and 300ms using natural easing curves.",
    subheading2: "Reduce Perceived Latency",
    p5: "Utilize skeleton loaders and subtle shimmer effects to create smooth transition flows.",
    p6: "Providing tactile haptic feedback for key actions enhances mobile app engagement.",
    subheading3: "Test Animation Timing",
    p7: "Always validate micro-interaction speeds across low-end mobile hardware to guarantee consistent 60fps performance.",
    nextId: 5,
    nextTitle: "Design System Governance: Keeping Figma & Code in Sync",
  },

  5: {
    id: 5,
    title: "Design System Governance: Keeping Figma & Code in Sync",
    subtitle: "Bridging the gap between Figma component libraries and React UI kits through automated design token pipelines.",
    category: "Design Systems",
    author: "Muhammad Sajib",
    authorRole: "Lead Product Designer & Founder",
    date: "July 28, 2026",
    readTime: "8 min read",
    heroImage: "/assets/figma_img_50.png",
    secondaryImage: "/assets/figma_img_51.png",
    quote: "Automated token sync pipelines eliminate visual drift between Figma designs and production code.",
    p1: "Maintaining a design system requires ongoing governance between designers and engineers. Learn how to automate sync workflows using GitHub Actions and Style Dictionary.",
    p2: "A design system is only as good as its code implementation. When designers update Figma tokens without syncing with engineering code repos, visual drift occurs.",
    subheading1: "Establish Token Pipeline Architecture",
    p3: "Using tools like Style Dictionary and Figma Tokens API, design token edits in Figma automatically trigger pull requests updating CSS variables in React codebase repos.",
    p4: "This automated workflow eliminates manual handoff discrepancies and guarantees 100% component fidelity between design specs and live production web apps.",
    subheading2: "Automate Continuous Integration",
    p5: "Set up GitHub Actions to trigger automated PR reviews whenever component tokens change.",
    p6: "Establish quarterly design token audits between product leads to clean up unused component variants.",
    subheading3: "Maintain Design System Documentation",
    p7: "Clear interactive Storybook & Figma documentation ensures quick onboarding for new designers and developers.",
    nextId: 6,
    nextTitle: "How to Structure Product Presentations That Win Stakeholders",
  },

  6: {
    id: 6,
    title: "How to Structure Product Presentations That Win Stakeholders",
    subtitle: "Frameworks and visual storytelling techniques Sajib uses to present UI/UX rationale to executive leaders.",
    category: "Case Studies",
    author: "Muhammad Sajib",
    authorRole: "Lead Product Designer & Founder",
    date: "July 15, 2026",
    readTime: "6 min read",
    heroImage: "/assets/figma_img_51.png",
    secondaryImage: "/assets/blog_thumb.png",
    quote: "Great design presentations connect UI choices directly to user retention and business growth.",
    p1: "Presenting design concepts to executive stakeholders requires tying UI decisions directly to business ROI, user retention, and conversion metrics.",
    p2: "Great designers don't just create beautiful interfaces; they articulate the strategic user rationale behind every layout choice. Frame presentations around the problem statement before revealing visual designs.",
    subheading1: "Frame Around Business ROI",
    p3: "Walk stakeholders through interactive prototype user flows rather than static flat screens to demonstrate real-world interaction behavior.",
    p4: "Conclude design presentations with quantifiable success metrics and clear testing milestones to gain instant sign-off.",
    subheading2: "Demonstrate Interactive User Flows",
    p5: "Live Figma prototype walkthroughs allow stakeholders to feel the user experience firsthand.",
    p6: "Address technical constraints early in the presentation to build trust with engineering leads.",
    subheading3: "Define Quantitative Milestones",
    p7: "Set clear KPI benchmarks for post-launch usability testing and iterative improvements.",
    nextId: 1,
    nextTitle: "The Impact of Technology on the Workplace: How Technology is Changing",
  },
};

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.id, 10) || 1;
  const article = articles[articleId] || articles[1];

  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />

      {/* Header Container matching Navbar max-w-7xl width */}
      <section className="pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#06ACFE] font-bold font-[var(--font-lato)] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>
        </div>

        {/* Category Pill Tag */}
        <div className="mb-4">
          <span className="bg-[#06ACFE] text-white font-bold text-xs px-3.5 py-1.5 rounded-[4px] font-[var(--font-lato)] shadow-sm inline-block">
            {article.category}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[var(--font-lato)] leading-tight text-white mb-6 max-w-4xl">
          {article.title}
        </h1>

        {/* Author Avatar & Date Meta Row */}
        <div className="flex items-center gap-3 text-sm font-[var(--font-inter)] text-[#8e8e93] pb-2">
          <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0 border border-white/20 bg-[#141720]">
            <Image
              src="/assets/about me image.png"
              alt={article.author}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-white font-medium font-[var(--font-lato)]">
            {article.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#8e8e93]" />
            {article.date}
          </span>
        </div>
      </section>

      {/* Main Full-Width Featured Hero Image matching Navbar max-w-7xl width */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
        <div className="relative w-full h-[340px] sm:h-[480px] md:h-[540px] rounded-[12px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] bg-[#141720]">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Main Article Content Body matching Navbar max-w-7xl width */}
      <article className="pb-20 px-6 md:px-12 max-w-7xl mx-auto font-[var(--font-inter)] text-[#8e8e93] text-base leading-relaxed">
        {/* Paragraphs 1 & 2 */}
        <p className="mb-6">{article.p1}</p>
        <p className="mb-8">{article.p2}</p>

        {/* Subheading 1 */}
        <h2 className="text-2xl font-extrabold font-[var(--font-lato)] text-white mt-8 mb-4">
          {article.subheading1}
        </h2>
        <p className="mb-6">{article.p3}</p>
        <p className="mb-8">{article.p4}</p>

        {/* Subheading 2 */}
        <h2 className="text-2xl font-extrabold font-[var(--font-lato)] text-white mt-8 mb-4">
          {article.subheading2}
        </h2>
        <p className="mb-6">{article.p5}</p>
        <p className="mb-8">{article.p6}</p>

        {/* Quote Callout Box matching exact Figma styling */}
        <div className="p-7 rounded-[8px] bg-[#181d28] border-l-4 border-l-[#06ACFE] my-8 shadow-lg">
          <p className="text-zinc-200 text-lg italic leading-relaxed font-[var(--font-inter)]">
            &ldquo; {article.quote} &rdquo;
          </p>
        </div>

        {/* Inline Secondary Image Block matching Figma attachment */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] rounded-[12px] overflow-hidden my-10 border border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.6)] bg-[#141720]">
          <Image
            src={article.secondaryImage}
            alt={`${article.title} Secondary Image`}
            fill
            className="object-cover"
          />
        </div>

        {/* Advertisement / Promo Banner Box */}
        <div className="p-8 rounded-[8px] bg-[#141824] border border-white/10 text-center my-10 shadow-md">
          <span className="text-xs uppercase tracking-widest text-[#71717a] block mb-1 font-[var(--font-inter)]">
            Advertisement
          </span>
          <p className="text-zinc-300 font-bold font-[var(--font-lato)] text-base">
            You can place ads 750x100
          </p>
        </div>

        {/* Subheading 3 */}
        <h2 className="text-2xl font-extrabold font-[var(--font-lato)] text-white mt-8 mb-4">
          {article.subheading3}
        </h2>
        <p className="mb-8">{article.p7}</p>

        {/* Next Article Banner Navigation */}
        <div className="p-8 rounded-[4px] bg-[#121826] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mt-12">
          <div>
            <span className="text-[#71717a] text-xs uppercase tracking-wider block font-[var(--font-inter)] mb-1">
              Read Next Article
            </span>
            <h4 className="text-xl font-bold font-[var(--font-lato)] text-white">
              {article.nextTitle}
            </h4>
          </div>

          <Link
            href={`/blog/${article.nextId}`}
            className="px-6 py-3.5 rounded-[4px] bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold font-[var(--font-lato)] text-sm transition-all flex items-center gap-2 shrink-0 shadow-md"
          >
            Read Article
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>

      <CtaSection />
      <Footer />
    </main>
  );
}
