"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

interface SocialPlatform {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

const defaultPlatforms: SocialPlatform[] = [
  { id: "whatsapp", name: "WhatsApp", url: "https://wa.me/+8801775551325", enabled: true },
  { id: "facebook", name: "Facebook", url: "https://facebook.com/sajib", enabled: false },
  { id: "youtube", name: "YouTube", url: "https://youtube.com/@sajib", enabled: false },
  { id: "instagram", name: "Instagram", url: "https://instagram.com/sajib", enabled: false },
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com/in/sajib", enabled: false },
  { id: "dribbble", name: "Dribbble", url: "https://dribbble.com/sajib", enabled: false },
  { id: "pinterest", name: "Pinterest", url: "https://pinterest.com/sajib", enabled: false },
  { id: "behance", name: "Behance", url: "https://behance.net/sajib", enabled: false },
];

const iconFileMap: Record<string, string> = {
  whatsapp: "Listitem → Link-7.png",
  facebook: "Listitem → Link.png",
  youtube: "Listitem → Link-1.png",
  instagram: "Listitem → Link-2.png",
  linkedin: "Listitem → Link-3.png",
  dribbble: "Listitem → Link-4.png",
  pinterest: "Listitem → Link-5.png",
  behance: "Listitem → Link-6.png",
};

export default function Footer() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(defaultPlatforms);
  const [info, setInfo] = useState({
    tagline: "Crafting research-backed UI/UX design systems, web platforms & high-converting mobile experiences.",
    whatsapp: "+880 177 555 1325",
    whatsappLink: "https://wa.me/+8801775551325",
    email: "ElizabethJ@jourrapide.com",
    address: "4808 Skinner Hollow Road, Days Creek, OR 97429",
    copyright: "All Right Reserved by Sajuxly, 2026",
  });

  useEffect(() => {
    // 1. Fetch Dynamic Social Media Links
    fetch("/api/social")
      .then((res) => res.json())
      .then((data) => {
        if (data.platforms && Array.isArray(data.platforms)) {
          setPlatforms(data.platforms);
        }
      })
      .catch(() => {});

    // 2. Fetch Dynamic Contact & Footer Info
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          const phoneVal = s.site_whatsapp || "+880 177 555 1325";
          const digits = phoneVal.replace(/[^0-9+]/g, "");
          const waLink = digits.startsWith("+") ? `https://wa.me/${digits}` : `https://wa.me/+${digits}`;

          setInfo({
            tagline: s.site_tagline || "Crafting research-backed UI/UX design systems, web platforms & high-converting mobile experiences.",
            whatsapp: phoneVal,
            whatsappLink: waLink,
            email: s.site_email || "ElizabethJ@jourrapide.com",
            address: s.site_location || "4808 Skinner Hollow Road, Days Creek, OR 97429",
            copyright: s.site_copyright || "All Right Reserved by Sajuxly, 2026",
          });
        }
      })
      .catch(() => {});
  }, []);

  const activePlatforms = platforms.filter(
    (p) => p.enabled && p.url && p.url.trim() !== ""
  );

  return (
    <footer
      id="contact"
      className="relative bg-cover bg-center bg-no-repeat border-t border-white/5 pt-20 pb-8 px-6 md:px-12 overflow-hidden bg-[#030508]"
      style={{ backgroundImage: `url('/assets/footer background..png')` }}
    >
      {/* Equal 4-Column Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16 relative z-10">
        {/* Column 1: Sajuxly Logo, Tagline, & Dynamic Active Social Icons */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/assets/sajuxly_logo.png"
              alt="Sajuxly Logo"
              width={184}
              height={48}
              className="h-12 w-auto object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          {/* Professional Brand Tagline */}
          <p className="text-[#8e8e93] font-[var(--font-inter)] text-sm leading-relaxed max-w-xs mb-6">
            {info.tagline}
          </p>

          {/* Active Social Icons row below logo */}
          <div className="flex items-center gap-3 flex-wrap">
            {activePlatforms.map((platform) => {
              const iconAsset = iconFileMap[platform.id] || "Listitem → Link.png";
              return (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform duration-200 hover:scale-110 hover:opacity-90"
                  aria-label={platform.name}
                  title={platform.name}
                >
                  <Image
                    src={`/assets/${iconAsset}`}
                    alt={platform.name}
                    width={42}
                    height={42}
                    className="w-10.5 h-10.5 object-contain block"
                    style={{ width: "42px", height: "42px" }}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: Company Quick Links */}
        <div>
          <h4 className="text-white font-bold font-[var(--font-lato)] text-base mb-5">
            Company
          </h4>
          <ul className="space-y-3 text-[#8e8e93] font-[var(--font-inter)] text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Me
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Me
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources & Legal */}
        <div>
          <h4 className="text-white font-bold font-[var(--font-lato)] text-base mb-5">
            Resources &amp; Legal
          </h4>
          <ul className="space-y-3 text-[#8e8e93] font-[var(--font-inter)] text-sm">
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog &amp; Insights
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white transition-colors">
                UX/UI Case Studies
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 className="text-white font-bold font-[var(--font-lato)] text-base mb-5">
            Contact Info
          </h4>
          <ul className="space-y-3.5 text-[#8e8e93] font-[var(--font-inter)] text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#06ACFE] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[#71717a] text-xs">WhatsApp</span>
                <a
                  href={info.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#06ACFE] transition-colors font-medium"
                >
                  {info.whatsapp}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#06ACFE] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[#71717a] text-xs">Email</span>
                <a
                  href={`mailto:${info.email}`}
                  className="text-white hover:text-[#06ACFE] transition-colors font-medium break-all"
                >
                  {info.email}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#06ACFE] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[#71717a] text-xs">Address</span>
                <span className="text-zinc-300 leading-relaxed block">
                  {info.address}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-[#71717a] font-[var(--font-inter)] text-sm relative z-10">
        <p>{info.copyright}</p>
      </div>
    </footer>
  );
}
