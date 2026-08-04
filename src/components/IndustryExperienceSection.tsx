"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Project {
  id: string;
  slug?: string;
  category: string;
  categoryTag: string;
  tagColor: string;
  previewGradient: string;
  previewBorder: string;
  impactPill: string;
  title: string;
  desc: string;
  pages: string;
  duration: string;
  image?: string;
  imageAlt: string;
}

const defaultProjects: Project[] = [
  {
    id: "triply",
    slug: "triply",
    category: "travel",
    categoryTag: "Travel",
    tagColor: "text-[#06ACFE]",
    previewGradient: "from-blue-500/20 via-blue-600/10 to-blue-900/5",
    previewBorder: "border-none",
    impactPill: "3.2x Booking Rate",
    title: "Easy Booking for Dream Trips",
    desc: "Triply is a hassle-free & effective tour solution for travelers. It's an all-inclusive booking and planning website that helps people make their dream trips easier.",
    pages: "40+",
    duration: "2.5 Months",
    image: "/assets/project_triply_exact.png",
    imageAlt: "Triply Travel App",
  },
  {
    id: "plate",
    slug: "plate",
    category: "restaurant",
    categoryTag: "Restaurant",
    tagColor: "text-orange-500",
    previewGradient: "from-orange-500/20 via-orange-600/10 to-orange-900/5",
    previewBorder: "border-none",
    impactPill: "+140% Orders",
    title: "Transform Your Dining",
    desc: "At Plate, we bring you a handpicked selection of premium restaurants that offer not just meals, but memorable dining experiences you'll cherish.",
    pages: "40+",
    duration: "5 Months",
    image: "/assets/project_plate_exact.png",
    imageAlt: "Plate Restaurant App",
  },
  {
    id: "yenex",
    slug: "yenex",
    category: "saas",
    categoryTag: "SaaS",
    tagColor: "text-amber-400",
    previewGradient: "from-amber-500/20 via-amber-600/10 to-amber-900/5",
    previewBorder: "border-none",
    impactPill: "4.8 User Rating",
    title: "Reducing Carbon Footprints",
    desc: "Yenex is a smart and sustainable energy platform. It empowers users with distributed energy solutions to reduce carbon footprints effortlessly.",
    pages: "40+",
    duration: "5 Months",
    image: "/assets/project_yenex_exact.png",
    imageAlt: "Yenex Carbon Energy SaaS",
  },
];

function AnimatedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isFromLeft = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
        isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : isFromLeft
          ? "opacity-0 -translate-x-48 sm:-translate-x-72 md:-translate-x-[320px] scale-95"
          : "opacity-0 translate-x-48 sm:translate-x-72 md:translate-x-[320px] scale-95"
      }`}
    >
      <article className="bg-[#121826]/70 rounded-[4px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(6,172,254,0.15)] group overflow-hidden border border-white/5">
        <div
          className={`${
            project.image && project.image.trim() !== ""
              ? "lg:col-span-7"
              : "lg:col-span-12"
          } flex flex-col items-start`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`text-sm font-bold uppercase font-[var(--font-lato)] ${project.tagColor}`}
            >
              {project.categoryTag}
            </span>
            <span className="bg-[#10b981]/15 text-[#10b981] px-3 py-1 rounded-[4px] text-xs font-bold font-[var(--font-lato)]">
              {project.impactPill}
            </span>
          </div>

          <h3 className="text-3xl md:text-[32px] font-extrabold font-[var(--font-lato)] text-white mb-4 leading-snug">
            {project.title}
          </h3>

          <p className="text-[#8e8e93] text-base font-[var(--font-inter)] leading-relaxed mb-7">
            {project.desc}
          </p>

          <div className="flex gap-10 mb-8">
            <div>
              <span className="block text-[#71717a] text-xs uppercase tracking-wider font-[var(--font-inter)] mb-1">
                Pages in Projects
              </span>
              <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
                {project.pages}
              </span>
            </div>
            <div>
              <span className="block text-[#71717a] text-xs uppercase tracking-wider font-[var(--font-inter)] mb-1">
                Project Duration
              </span>
              <span className="text-xl font-extrabold font-[var(--font-lato)] text-white">
                {project.duration}
              </span>
            </div>
          </div>

          {/* View Case Study Button */}
          <Link
            href={`/portfolio/${project.slug || project.id}`}
            className="inline-flex items-center justify-center gap-3 px-12 py-3.5 rounded-[4px] bg-[#181d28] text-white hover:bg-[#06ACFE] transition-all duration-300 font-bold font-[var(--font-lato)] text-base shadow-md w-full sm:w-auto min-w-[220px]"
          >
            View Case Study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Custom Category Gradient Preview Box (ONLY rendered if image exists) */}
        {project.image && project.image.trim() !== "" && (
          <div
            className={`lg:col-span-5 bg-gradient-to-br ${project.previewGradient} rounded-[4px] overflow-hidden p-3 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-500`}
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={500}
              height={350}
              className="w-full h-auto object-cover rounded-[4px] block shadow-lg"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}
      </article>
    </div>
  );
}

export default function IndustryExperienceSection() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && data.projects.length > 0) {
          const mapped = data.projects.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            category: p.category || "travel",
            categoryTag: p.categoryTag || "General",
            tagColor: p.tagColor || "text-[#06ACFE]",
            previewGradient: "from-blue-500/20 via-blue-600/10 to-blue-900/5",
            previewBorder: "border-none",
            impactPill: p.impactPill || "3.2x Rate",
            title: p.title,
            desc: p.shortDesc,
            pages: p.pages || "40+",
            duration: p.duration || "2 Months",
            image: p.heroImage !== undefined ? p.heroImage : "",
            imageAlt: p.title,
          }));
          setProjects(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#06ACFE] font-bold text-sm uppercase tracking-[0.15em] mb-2 block font-[var(--font-lato)]">
          INDUSTRY EXPERIENCE
        </span>
        <h2 className="text-4xl md:text-[48px] font-extrabold font-[var(--font-lato)] leading-[1.15] text-white mb-4">
          Industry experience and few of them.
        </h2>
        <p className="text-[#8e8e93] text-lg font-[var(--font-inter)] leading-relaxed">
          Delivering research-backed UI/UX design systems that scale, convert,
          and solve complex user problems.
        </p>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-10">
        {projects.map((project, index) => (
          <AnimatedProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
