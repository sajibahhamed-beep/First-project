import Image from "next/image";

interface Testimonial {
  id: number;
  quote: string;
  avatar: string;
  name: string;
  role: string;
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        '"Teachings of the great explorer of truth! Sajib\'s design breakdown transformed how I structure UI systems and client presentations."',
      avatar: "/assets/figma_img_6.png",
      name: "Finlay Kirk",
      role: "Web Developer",
    },
    {
      id: 2,
      quote:
        '"Complete account of modern Figma workflows! The hands-on mentoring gave me the confidence to land my first senior product design role."',
      avatar: "/assets/figma_img_7.png",
      name: "Dannette P. Cervantes",
      role: "Web Design",
    },
    {
      id: 3,
      quote:
        '"Clear, structured, and extremely practical. Sajib doesn\'t just teach software; he teaches design thinking and problem solving."',
      avatar: "/assets/figma_img_8.png",
      name: "Clara R. Altman",
      role: "UI/UX Design",
    },
    {
      id: 4,
      quote:
        '"The best UI/UX course I have taken. The portfolio review sessions alone were worth 10x the investment!"',
      avatar: "/assets/figma_img_9.png",
      name: "Marcus Vance",
      role: "Product Designer",
    },
    {
      id: 5,
      quote:
        '"Sajib\'s attention to detail, micro-interactions, and design systems is unmatched. Highly recommended for aspiring designers!"',
      avatar: "/assets/figma_img_10.png",
      name: "Sophia Chen",
      role: "Design Lead",
    },
    {
      id: 6,
      quote:
        '"Learning auto-layout and complex component variants made my workflow 3x faster. Brilliant teaching style!"',
      avatar: "/assets/figma_img_11.png",
      name: "Liam O'Connor",
      role: "Frontend Engineer",
    },
    {
      id: 7,
      quote:
        '"Incredible insights on typography, spacing grids, and user psychology. Sajib makes complex UI concepts super easy to grasp."',
      avatar: "/assets/figma_img_12.png",
      name: "Elena Rostova",
      role: "UX Researcher",
    },
    {
      id: 8,
      quote:
        '"The 1-on-1 mentorship helped me rebuild my portfolio from scratch. I booked 4 freelance clients within two weeks!"',
      avatar: "/assets/figma_img_6.png",
      name: "David Miller",
      role: "Freelance Designer",
    },
    {
      id: 9,
      quote:
        '"A game-changing learning experience! The practical real-world project briefs prepared me perfectly for high-growth tech startups."',
      avatar: "/assets/figma_img_7.png",
      name: "Amara Okafor",
      role: "Interaction Designer",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-[var(--font-lato)] text-white mb-2">
            What Student&apos;s Say
          </h2>
          <p className="text-[#8e8e93] font-[var(--font-inter)] text-base">
            Real feedback from students and clients who mastered UI/UX design
            with Sajib.
          </p>
        </div>

        {/* Clean ratings summary */}
        <div className="flex items-center gap-8">
          <div className="text-center">
            <span className="text-2xl font-extrabold font-[var(--font-lato)] text-white block">
              10m+
            </span>
            <span className="text-[#71717a] text-xs font-medium font-[var(--font-inter)]">
              Happy People
            </span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-2xl font-extrabold font-[var(--font-lato)] text-white">
                4.8
              </span>
              <span className="text-amber-400 text-sm">★★★★★</span>
            </div>
            <span className="text-[#71717a] text-xs font-medium font-[var(--font-inter)]">
              Overall rating
            </span>
          </div>
        </div>
      </div>

      {/* Testimonial cards grid - enhanced size magnification on hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-[#121826]/70 p-8 rounded-[4px] shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex flex-col justify-between transition-transform duration-300 ease-out transform hover:scale-110 sm:hover:scale-112 hover:z-30 relative cursor-pointer"
          >
            <p className="text-[#8e8e93] text-sm font-[var(--font-inter)] leading-relaxed mb-6 italic">
              {item.quote}
            </p>

            <div className="flex items-center gap-4">
              <Image
                src={item.avatar}
                alt={item.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#06ACFE]"
                style={{ width: "48px", height: "48px" }}
              />
              <div>
                <h4 className="text-base font-bold font-[var(--font-lato)] text-white">
                  {item.name}
                </h4>
                <span className="text-[#71717a] text-xs font-[var(--font-inter)]">
                  {item.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
