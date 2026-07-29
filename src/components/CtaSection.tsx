import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="w-full my-20 py-4 bg-[#090b0e] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Left Column: 2 Vertically Stacked Gallery Images */}
        <div className="hidden lg:flex flex-col gap-4 shrink-0">
          <Image
            src="/assets/figma_img_9.png"
            alt="Gallery item 1"
            width={220}
            height={125}
            className="w-[220px] h-[125px] object-cover rounded-[4px] border-none shadow-md block"
            style={{ width: "220px", height: "125px" }}
          />
          <Image
            src="/assets/figma_img_10.png"
            alt="Gallery item 2"
            width={220}
            height={125}
            className="w-[220px] h-[125px] object-cover rounded-[4px] border-none shadow-md block"
            style={{ width: "220px", height: "125px" }}
          />
        </div>

        {/* Center Column: Text Content & Action Buttons (No button stroke) */}
        <div className="max-w-xl mx-auto text-center py-4">
          <h2 className="text-4xl md:text-5xl font-extrabold font-[var(--font-lato)] text-white mb-3">
            Start With Sajuxly
          </h2>
          <p className="text-[#8e8e93] text-lg font-[var(--font-inter)] leading-relaxed mb-8">
            No paperwork, no long processes. Just Few clicks and ready to Start
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="w-full sm:w-auto px-9 py-3.5 rounded-full font-bold font-[var(--font-lato)] bg-[#06ACFE] text-white hover:bg-[#0098e6] border-none transition-all shadow-[0_4px_20px_rgba(6,172,254,0.35)] whitespace-nowrap"
            >
              Hire Me
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto px-9 py-3.5 rounded-full font-bold font-[var(--font-lato)] bg-[#27272a] border-none text-white hover:bg-[#323238] transition-all whitespace-nowrap"
            >
              Book a Demo Class
            </a>
          </div>
        </div>

        {/* Right Column: 2 Vertically Stacked Gallery Images */}
        <div className="hidden lg:flex flex-col gap-4 shrink-0">
          <Image
            src="/assets/figma_img_11.png"
            alt="Gallery item 3"
            width={220}
            height={125}
            className="w-[220px] h-[125px] object-cover rounded-[4px] border-none shadow-md block"
            style={{ width: "220px", height: "125px" }}
          />
          <Image
            src="/assets/figma_img_12.png"
            alt="Gallery item 4"
            width={220}
            height={125}
            className="w-[220px] h-[125px] object-cover rounded-[4px] border-none shadow-md block"
            style={{ width: "220px", height: "125px" }}
          />
        </div>
      </div>
    </section>
  );
}
