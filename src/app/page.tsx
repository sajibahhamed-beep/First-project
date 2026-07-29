import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import VideoShowcaseSection from "@/components/VideoShowcaseSection";
import IndustryExperienceSection from "@/components/IndustryExperienceSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#090b0e] text-white">
      <FloatingContact />
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <VideoShowcaseSection />
      <IndustryExperienceSection />
      <BlogSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
