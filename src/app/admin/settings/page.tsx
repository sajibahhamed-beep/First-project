"use client";

import { useEffect, useState, FormEvent, ChangeEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Settings,
  Home,
  Search,
  Palette,
  FileDown,
  Image as ImageIcon,
  Save,
  Globe,
  Share2,
  Power,
  ExternalLink,
  Plus,
  Upload,
  Copy,
  Check,
  Trash2,
  Download,
  Sparkles,
  User,
} from "lucide-react";

// --- Types ---
interface SocialPlatformConfig {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

interface ResumeItem {
  id: string;
  title: string;
  filename: string;
  fileUrl: string;
  fileSize: string;
  downloadCount: number;
  isDefault: boolean;
}

interface MediaItem {
  id: string;
  filename: string;
  fileUrl: string;
  mimeType: string;
  size: number;
}

const initialSocialPlatforms: SocialPlatformConfig[] = [
  { id: "whatsapp", name: "WhatsApp", url: "https://wa.me/+8801775551325", enabled: true },
  { id: "facebook", name: "Facebook", url: "https://facebook.com/sajib", enabled: true },
  { id: "youtube", name: "YouTube", url: "https://youtube.com/@sajib", enabled: true },
  { id: "instagram", name: "Instagram", url: "https://instagram.com/sajib", enabled: true },
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com/in/sajib", enabled: true },
  { id: "dribbble", name: "Dribbble", url: "https://dribbble.com/sajib", enabled: true },
  { id: "pinterest", name: "Pinterest", url: "https://pinterest.com/sajib", enabled: true },
  { id: "behance", name: "Behance", url: "https://behance.net/sajib", enabled: true },
];

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") || "site";
  const [activeTab, setActiveTab] = useState<
    "site" | "homepage" | "seo" | "theme" | "resumes" | "media"
  >(
    (tabParam as any) || "site"
  );

  useEffect(() => {
    if (tabParam && ["site", "homepage", "seo", "theme", "resumes", "media"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [tabParam]);

  const handleTabChange = (tab: "site" | "homepage" | "seo" | "theme" | "resumes" | "media") => {
    setActiveTab(tab);
    router.push(`/admin/settings?tab=${tab}`);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // --- 1. Site & Social Settings State ---
  const [siteSettings, setSiteSettings] = useState({
    site_name: "Muhammad Sajib — UI/UX Portfolio",
    site_email: "ElizabethJ@jourrapide.com",
    site_whatsapp: "+880 177 555 1325",
    site_location: "4808 Skinner Hollow Road, Days Creek, OR 97429",
    site_tagline: "Crafting research-backed UI/UX design systems, web platforms & high-converting mobile experiences.",
    site_copyright: "All Right Reserved by Sajuxly, 2026",
  });
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatformConfig[]>(
    initialSocialPlatforms
  );

  // --- 2. Homepage CMS State ---
  const [heroSettings, setHeroSettings] = useState({
    heroGreeting: "Hi!! I am",
    heroName: "Sajib",
    heroBelief: "& I believe",
    heroHeadline: "Design is a Language",
    heroSubtitle: "creaft intuitive digital experience and tech designers how to communicate through design",
    heroCtaPrimary: "Hire Me",
    heroCtaSecondary: "Book a Demo Class",
    heroImage: "/assets/hero_sajib_exact.png",
  });
  const [aboutSettings, setAboutSettings] = useState({
    aboutHeading: "Sajib is a Designer Based in Dhaka, Bangladesh",
    aboutProjectsCount: "50+",
    aboutExperienceYears: "3 Years+",
    aboutParagraph: "Crafting intuitive, high-impact digital experiences through user-centered research, thoughtful strategy, and pixel-perfect execution.",
    aboutPortrait: "/assets/about_portrait.png",
  });

  // --- 3. SEO State ---
  const [seo, setSeo] = useState({
    seo_metaTitle: "Muhammad Sajib — Lead UI/UX & Product Designer",
    seo_metaDescription: "Crafting intuitive digital experiences, mobile apps, SaaS dashboards, and design systems.",
    seo_keywords: "UI/UX Designer, Product Designer, Figma, Next.js, Tailwind CSS",
    seo_ogImage: "/assets/hero_sajib_exact.png",
    seo_canonicalUrl: "https://sajib.design",
  });

  // --- 4. Theme State ---
  const [theme, setTheme] = useState({
    theme_primaryColor: "#06ACFE",
    theme_secondaryColor: "#0098e6",
    theme_fontHeading: "Lato",
    theme_fontBody: "Inter",
  });

  // --- 5. Simple Resume Link State ---
  const [resumeLink, setResumeLink] = useState("");
  const [resumeTitle, setResumeTitle] = useState("Product Designer Resume");
  const [resumeDownloadCount, setResumeDownloadCount] = useState(0);
  const [isSavingResume, setIsSavingResume] = useState(false);
  const [copiedResume, setCopiedResume] = useState(false);
  const [resumeSavedFeedback, setResumeSavedFeedback] = useState(false);

  // --- 6. Media State ---
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [mediaSearch, setMediaSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load all configurations on mount
  useEffect(() => {
    // Load Settings & Socials
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          setSiteSettings({
            site_name: s.site_name || "Muhammad Sajib — UI/UX Portfolio",
            site_email: s.site_email || "ElizabethJ@jourrapide.com",
            site_whatsapp: s.site_whatsapp || "+880 177 555 1325",
            site_location: s.site_location || "4808 Skinner Hollow Road, Days Creek, OR 97429",
            site_tagline:
              s.site_tagline ||
              "Crafting research-backed UI/UX design systems, web platforms & high-converting mobile experiences.",
            site_copyright: s.site_copyright || "All Right Reserved by Sajuxly, 2026",
          });
          setSocialPlatforms((prev) =>
            prev.map((p) => {
              const urlKey = `social_${p.id}_url`;
              const enabledKey = `social_${p.id}_enabled`;
              return {
                ...p,
                url: s[urlKey] !== undefined ? s[urlKey] : p.url,
                enabled: s[enabledKey] !== undefined ? s[enabledKey] === "true" : p.enabled,
              };
            })
          );
        }
      })
      .catch(() => {});

    // Load Homepage CMS
    fetch("/api/admin/homepage")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          setHeroSettings((prev) => ({
            ...prev,
            heroGreeting: s.heroGreeting || prev.heroGreeting,
            heroName: s.heroName || prev.heroName,
            heroBelief: s.heroBelief || prev.heroBelief,
            heroHeadline: s.heroHeadline || prev.heroHeadline,
            heroSubtitle: s.heroSubtitle || prev.heroSubtitle,
            heroCtaPrimary: s.heroCtaPrimary || prev.heroCtaPrimary,
            heroCtaSecondary: s.heroCtaSecondary || prev.heroCtaSecondary,
          }));
          setAboutSettings((prev) => ({
            ...prev,
            aboutHeading: s.aboutHeading || prev.aboutHeading,
            aboutProjectsCount: s.aboutProjectsCount || prev.aboutProjectsCount,
            aboutExperienceYears: s.aboutExperienceYears || prev.aboutExperienceYears,
            aboutParagraph: s.aboutParagraph || prev.aboutParagraph,
          }));
        }
      })
      .catch(() => {});

    // Load SEO
    fetch("/api/admin/seo")
      .then((res) => res.json())
      .then((data) => {
        if (data.seo) setSeo((prev) => ({ ...prev, ...data.seo }));
      })
      .catch(() => {});

    // Load Theme
    fetch("/api/admin/theme")
      .then((res) => res.json())
      .then((data) => {
        if (data.theme) setTheme((prev) => ({ ...prev, ...data.theme }));
      })
      .catch(() => {});

    // Load Resume Link & Stats
    fetch("/api/admin/resumes")
      .then((res) => res.json())
      .then((data) => {
        if (data.resume) {
          setResumeLink(data.resume.fileUrl || "");
          setResumeTitle(data.resume.title || "Product Designer Resume");
          setResumeDownloadCount(data.resume.downloadCount || 0);
        }
      })
      .catch(() => {});

    // Load Media
    fetch("/api/admin/media")
      .then((res) => res.json())
      .then((data) => setMedia(data.media || []))
      .catch(() => {});
  }, []);

  // Handlers
  const handleSaveSiteSettings = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const payload: Record<string, string> = { ...siteSettings };
    socialPlatforms.forEach((p) => {
      payload[`social_${p.id}_url`] = p.url;
      payload[`social_${p.id}_enabled`] = p.enabled ? "true" : "false";
    });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: payload, socials: socialPlatforms }),
      });
      if (res.ok) setMessage("Site & Social Media settings saved!");
    } catch {
      setMessage("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveHomepage = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: { ...heroSettings, ...aboutSettings } }),
      });
      if (res.ok) setMessage("Homepage CMS updated successfully!");
    } catch {
      setMessage("Failed to update homepage");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSeo = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seo }),
      });
      if (res.ok) setMessage("SEO & Metadata settings saved!");
    } catch {
      setMessage("Failed to save SEO settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTheme = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      if (res.ok) setMessage("Theme styles saved successfully!");
    } catch {
      setMessage("Failed to save theme");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveResumeLink = async (e: FormEvent) => {
    e.preventDefault();
    if (!resumeLink) return;

    setIsSavingResume(true);
    try {
      const res = await fetch("/api/admin/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileUrl: resumeLink.trim(),
          title: resumeTitle.trim() || "Product Designer Resume",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.resume) {
          setResumeLink(data.resume.fileUrl);
          setResumeTitle(data.resume.title);
          setResumeDownloadCount(data.resume.downloadCount || 0);
        }
        setResumeSavedFeedback(true);
        setTimeout(() => setResumeSavedFeedback(false), 3000);
      } else {
        alert("Failed to save resume link");
      }
    } catch {
      alert("Failed to save resume link");
    } finally {
      setIsSavingResume(false);
    }
  };

  const handleCopyResumeLink = () => {
    if (!resumeLink) return;
    navigator.clipboard.writeText(resumeLink);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  const handleMediaUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        fetch("/api/admin/media")
          .then((r) => r.json())
          .then((d) => setMedia(d.media || []));
      }
    } catch {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteMedia = async (id: string, filename: string) => {
    if (!confirm(`Delete "${filename}"?`)) return;
    const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
    if (res.ok) setMedia(media.filter((m) => m.id !== id));
  };

  const tabs = [
    { id: "site", label: "Site & Social Links", icon: Settings },
    { id: "homepage", label: "Homepage CMS", icon: Home },
    { id: "seo", label: "SEO & Metadata", icon: Search },
    { id: "theme", label: "Theme & Styles", icon: Palette },
    { id: "resumes", label: "Resume Manager", icon: FileDown },
    { id: "media", label: "Media Library", icon: ImageIcon },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-[var(--font-lato)] text-white">
          Site Settings & Content Management Hub
        </h1>
        <p className="text-xs text-[#8e8e93] mt-1">
          Unified control center to configure site profiles, social links, homepage CMS, SEO, styles, resumes, and media library
        </p>
      </div>

      {/* Unified Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#121826]/70 border border-white/10 overflow-x-auto [scrollbar-width:none]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#06ACFE] text-white shadow-[0_4px_15px_rgba(6,172,254,0.35)]"
                  : "text-[#8e8e93] hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          {message}
        </div>
      )}

      {/* --- TAB 1: SITE & SOCIAL MEDIA SETTINGS --- */}
      {activeTab === "site" && (
        <form onSubmit={handleSaveSiteSettings} className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
            <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>General Site Profile</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                  Website Name / Title
                </label>
                <input
                  type="text"
                  value={siteSettings.site_name}
                  onChange={(e) => setSiteSettings({ ...siteSettings, site_name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={siteSettings.site_email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, site_email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={siteSettings.site_whatsapp}
                  onChange={(e) => setSiteSettings({ ...siteSettings, site_whatsapp: e.target.value })}
                  className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                  Location
                </label>
                <input
                  type="text"
                  value={siteSettings.site_location}
                  onChange={(e) => setSiteSettings({ ...siteSettings, site_location: e.target.value })}
                  className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#06ACFE]"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
            <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              <span>Social Media Links Manager (9 Platforms)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`p-4 rounded-xl border transition-all ${
                    platform.enabled ? "bg-[#090b0e]/80 border-white/10" : "bg-[#090b0e]/40 border-white/5 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white font-[var(--font-lato)]">
                        {platform.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          platform.enabled
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30"
                        }`}
                      >
                        {platform.enabled ? "ACTIVE" : "DISABLED"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSocialPlatforms((prev) =>
                          prev.map((p) => (p.id === platform.id ? { ...p, enabled: !p.enabled } : p))
                        )
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        platform.enabled
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{platform.enabled ? "Enabled" : "Disabled"}</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    disabled={!platform.enabled}
                    value={platform.url}
                    onChange={(e) =>
                      setSocialPlatforms((prev) =>
                        prev.map((p) => (p.id === platform.id ? { ...p, url: e.target.value } : p))
                      )
                    }
                    className="w-full px-4 py-2.5 bg-[#05070a] border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-[#06ACFE] disabled:opacity-40"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(6,172,254,0.4)] disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? "Saving..." : "Save Site Settings"}</span>
            </button>
          </div>
        </form>
      )}

      {/* --- TAB 2: HOMEPAGE CMS --- */}
      {activeTab === "homepage" && (
        <form onSubmit={handleSaveHomepage} className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Hero & About Copywriter</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2">Greeting Line</label>
              <input
                type="text"
                value={heroSettings.heroGreeting}
                onChange={(e) => setHeroSettings({ ...heroSettings, heroGreeting: e.target.value })}
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2">Name Highlight</label>
              <input
                type="text"
                value={heroSettings.heroName}
                onChange={(e) => setHeroSettings({ ...heroSettings, heroName: e.target.value })}
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2 font-[var(--font-lato)]">Belief Sub-text</label>
              <input
                type="text"
                value={heroSettings.heroBelief}
                onChange={(e) => setHeroSettings({ ...heroSettings, heroBelief: e.target.value })}
                className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2">Main Headline</label>
            <input
              type="text"
              value={heroSettings.heroHeadline}
              onChange={(e) => setHeroSettings({ ...heroSettings, heroHeadline: e.target.value })}
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-lg font-black font-[var(--font-lato)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2">Subtitle</label>
            <textarea
              rows={3}
              value={heroSettings.heroSubtitle}
              onChange={(e) => setHeroSettings({ ...heroSettings, heroSubtitle: e.target.value })}
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(6,172,254,0.4)] disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? "Saving..." : "Save Homepage Content"}</span>
            </button>
          </div>
        </form>
      )}

      {/* --- TAB 3: SEO & METADATA --- */}
      {activeTab === "seo" && (
        <form onSubmit={handleSaveSeo} className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span>Global Meta & Search Tags</span>
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2">Default Meta Title</label>
            <input
              type="text"
              value={seo.seo_metaTitle}
              onChange={(e) => setSeo({ ...seo, seo_metaTitle: e.target.value })}
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2">Default Meta Description</label>
            <textarea
              rows={3}
              value={seo.seo_metaDescription}
              onChange={(e) => setSeo({ ...seo, seo_metaDescription: e.target.value })}
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2">Keywords (Comma Separated)</label>
            <input
              type="text"
              value={seo.seo_keywords}
              onChange={(e) => setSeo({ ...seo, seo_keywords: e.target.value })}
              className="w-full px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(6,172,254,0.4)] disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? "Saving..." : "Save SEO Settings"}</span>
            </button>
          </div>
        </form>
      )}

      {/* --- TAB 4: THEME & STYLES --- */}
      {activeTab === "theme" && (
        <form onSubmit={handleSaveTheme} className="p-6 rounded-2xl bg-[#121826]/70 border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE] flex items-center gap-2">
            <Palette className="w-5 h-5" />
            <span>Visual System & Colors</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2">Primary Accent Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.theme_primaryColor}
                  onChange={(e) => setTheme({ ...theme, theme_primaryColor: e.target.value })}
                  className="w-12 h-12 rounded-xl bg-transparent border border-white/20 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.theme_primaryColor}
                  onChange={(e) => setTheme({ ...theme, theme_primaryColor: e.target.value })}
                  className="flex-1 px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#8e8e93] mb-2">Hover Accent Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.theme_secondaryColor}
                  onChange={(e) => setTheme({ ...theme, theme_secondaryColor: e.target.value })}
                  className="w-12 h-12 rounded-xl bg-transparent border border-white/20 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.theme_secondaryColor}
                  onChange={(e) => setTheme({ ...theme, theme_secondaryColor: e.target.value })}
                  className="flex-1 px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-sm font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(6,172,254,0.4)] disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? "Saving..." : "Save Theme Styles"}</span>
            </button>
          </div>
        </form>
      )}

      {/* --- TAB 5: RESUMES (SIMPLE LINK & DOWNLOAD COUNTER ONLY) --- */}
      {activeTab === "resumes" && (
        <div className="max-w-3xl space-y-6">
          <div>
            <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE]">
              Resume Link Configuration
            </h2>
            <p className="text-xs text-[#8e8e93] font-[var(--font-inter)] mt-0.5">
              Add or update your resume link below (e.g. Google Drive link or hosted PDF). When visitors click &quot;Download Resume&quot; on your website, this link will open in a new tab.
            </p>
          </div>

          {/* Simple Form to Add / Update Resume Link */}
          <form
            onSubmit={handleSaveResumeLink}
            className="p-6 rounded-2xl bg-[#121826]/80 border border-white/10 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e8e93] mb-2 font-[var(--font-lato)]">
                Resume Link / URL
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="https://drive.google.com/file/d/... or /assets/Resume.pdf"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#090b0e] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#06ACFE] transition-all"
                />
                <button
                  type="submit"
                  disabled={isSavingResume}
                  className="px-6 py-3 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold font-[var(--font-lato)] text-xs transition-all shadow-[0_2px_15px_rgba(6,172,254,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingResume ? "Saving..." : "Save Resume Link"}</span>
                </button>
              </div>
              {resumeSavedFeedback && (
                <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1.5 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Resume link updated successfully!</span>
                </p>
              )}
            </div>
          </form>

          {/* Single Card: Current Resume Link & Total Downloads Counter */}
          <div className="p-6 rounded-2xl bg-[#121826]/90 border border-[#06ACFE]/40 shadow-[0_10px_30px_rgba(6,172,254,0.12)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#06ACFE] font-[var(--font-lato)]">
                  Live Active Resume
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {resumeTitle || "Product Designer Resume"}
                </h3>
              </div>

              {/* Total Downloads Counter */}
              <div className="px-5 py-2.5 rounded-xl bg-[#06ACFE]/10 border border-[#06ACFE]/30 flex items-center gap-3 shrink-0">
                <Download className="w-5 h-5 text-[#06ACFE]" />
                <div>
                  <div className="text-[11px] text-[#8e8e93] font-medium">Total Downloads</div>
                  <div className="text-xl font-extrabold text-[#06ACFE] font-mono leading-tight">
                    {resumeDownloadCount} times
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e8e93] mb-1.5 font-[var(--font-lato)]">
                Configured Link
              </label>
              <p className="text-xs text-[#8e8e93] font-mono bg-[#090b0e] px-4 py-3 rounded-xl border border-white/10 break-all select-all">
                {resumeLink || "No resume link configured yet"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={resumeLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white text-xs font-bold transition-all shadow-[0_2px_15px_rgba(6,172,254,0.3)] ${
                  !resumeLink ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Resume in New Tab</span>
              </a>

              <button
                type="button"
                onClick={handleCopyResumeLink}
                disabled={!resumeLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#8e8e93] hover:text-white transition-all disabled:opacity-50"
              >
                {copiedResume ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 6: MEDIA LIBRARY --- */}
      {activeTab === "media" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-[var(--font-lato)] text-[#06ACFE]">Media Assets</h2>
            <label className="px-4 py-2 rounded-xl bg-[#06ACFE] text-white text-xs font-bold flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>{isUploading ? "Uploading..." : "Upload Asset"}</span>
              <input type="file" onChange={handleMediaUpload} disabled={isUploading} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {media.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-[#121826]/70 border border-white/10 space-y-2">
                <div className="h-28 bg-[#090b0e] rounded-lg relative overflow-hidden flex items-center justify-center">
                  {item.mimeType.startsWith("image/") ? (
                    <Image src={item.fileUrl} alt={item.filename} fill className="object-contain p-2" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-[#06ACFE]" />
                  )}
                </div>
                <p className="text-xs text-white font-bold truncate">{item.filename}</p>
                <div className="flex justify-between items-center text-[10px]">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.fileUrl);
                      setCopiedId(item.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="text-[#06ACFE] font-bold"
                  >
                    {copiedId === item.id ? "Copied!" : "Copy Link"}
                  </button>
                  <button onClick={() => handleDeleteMedia(item.id, item.filename)} className="text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminSiteSettingsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-[#8e8e93]">Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
