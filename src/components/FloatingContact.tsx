import Image from "next/image";

export default function FloatingContact() {
  return (
    <a
      href="https://wa.me/+8801775551325"
      className="floating-contact-figma fixed right-0 bottom-[30px] rounded-r-none rounded-l-full transition-all duration-300 shadow-lg hover:shadow-xl"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
    >
      <div className="relative">
        <Image
          src="/assets/Container.png"
          alt="WhatsApp"
          width={40}
          height={40}
          className="w-10 h-10 object-contain filter drop-shadow-[0_2px_8px_rgba(37,211,102,0.5)]"
          style={{ width: "40px", height: "40px" }}
        />
        {/* Highly visible ping animation without stroke */}
        <div className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.9)]"></span>
        </div>
      </div>
      <span className="text-white font-[var(--font-lato)] font-bold text-lg tracking-tight whitespace-nowrap">
        Contact Me
      </span>
    </a>
  );
}
