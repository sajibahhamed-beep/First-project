import Image from "next/image";

export default function FloatingContact() {
  return (
    <a
      href="https://wa.me/+8801775551325"
      className="floating-contact-figma fixed right-0 bottom-[30px] rounded-r-none rounded-l-full"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
    >
      <Image
        src="/assets/Container.png"
        alt="WhatsApp"
        width={40}
        height={40}
        className="w-10 h-10 object-contain filter drop-shadow-[0_2px_8px_rgba(37,211,102,0.5)]"
        style={{ width: "40px", height: "40px" }}
      />
      <span className="text-white font-[var(--font-lato)] font-bold text-lg tracking-tight whitespace-nowrap">
        Contact Me
      </span>
    </a>
  );
}
