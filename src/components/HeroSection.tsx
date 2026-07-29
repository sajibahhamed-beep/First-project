import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] pt-36 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 flex items-center bg-center bg-cover bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url('/assets/desktop_3_bg.png')` }}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Wrapper to enforce Button Width Rule equal to Headline length */}
          <div className="flex flex-col items-start w-fit max-w-full">
            {/* Hi!! I am - Font Size: 28, Font Family: Lato */}
            <p className="text-[28px] text-[#8e8e93] font-[var(--font-lato)] font-normal leading-[1.2] mb-1">
              Hi!! I am
            </p>

            {/* "Sajib" & I believe - Font Size: 32, Font Family: Lato */}
            <p className="text-[32px] font-[var(--font-lato)] leading-[1.2] mb-3">
              <strong className="text-white font-bold">Sajib</strong>{" "}
              <span className="text-[#8e8e93] font-normal">& I believe</span>
            </p>

            {/* "Design is a Language" - Font Size: 52, Font Family: Lato, Font Weight: Black */}
            <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-black font-[var(--font-lato)] leading-[1.15] text-white mb-5 whitespace-nowrap w-full">
              Design is a Language
            </h1>

            {/* Subtitle - Font Size: 20, Font Family: Inter (Body text per Figma spec) */}
            <p className="text-[18px] sm:text-[20px] text-[#9ea3ae] font-[var(--font-inter)] font-normal leading-[1.4] max-w-[530px] mb-9">
              creaft intuitive digital experience and tech designers how to
              communicate through design
            </p>

            {/* Button Width Rule with 4 pixel roundness */}
            <div className="w-full flex flex-row gap-4 items-stretch">
              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-[4px] text-[17px] font-bold font-[var(--font-lato)] bg-[#06ACFE] text-white hover:bg-[#0098e6] transition-all duration-200 shadow-[0_4px_15px_rgba(6,172,254,0.35)] hover:-translate-y-0.5 text-center whitespace-nowrap"
              >
                Hire Me
              </a>

              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-[4px] text-[17px] font-bold font-[var(--font-lato)] bg-[#27272a] border border-[#3f3f46] text-white hover:bg-[#323238] transition-all duration-200 hover:-translate-y-0.5 text-center whitespace-nowrap"
              >
                Book a Demo Class
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Sajib portrait mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[480px]">
            <Image
              src="/assets/hero_sajib_exact.png"
              alt="Sajib - Designer"
              width={480}
              height={560}
              className="w-full h-auto object-contain block"
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
