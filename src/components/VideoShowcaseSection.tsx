"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [styleState, setStyleState] = useState({
    translateY: 120,
    scale: 0.8,
    width: 75,
    height: 55,
    borderRadius: 24,
    opacity: 0.5,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionRef.current.offsetHeight - windowHeight;

      if (totalScrollable > 0) {
        const currentScroll = -sectionRect.top;
        let progress = currentScroll / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));

        if (progress > 0 && progress < 1) {
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }

          if (progress <= 0.5) {
            const normProgress = progress / 0.5;
            setStyleState({
              translateY: 120 * (1 - normProgress),
              scale: 0.8 + 0.2 * normProgress,
              width: 75 + 25 * normProgress,
              height: 55 + 45 * normProgress,
              borderRadius: 24 * (1 - normProgress),
              opacity: 0.5 + 0.5 * normProgress,
            });
          } else {
            const normProgress = (progress - 0.5) / 0.5;
            setStyleState({
              translateY: -140 * normProgress,
              scale: 1.0 - 0.2 * normProgress,
              width: 100 - 25 * normProgress,
              height: 100 - 45 * normProgress,
              borderRadius: 24 * normProgress,
              opacity: 1.0 - 0.3 * normProgress,
            });
          }
        } else if (progress <= 0) {
          setStyleState({
            translateY: 120,
            scale: 0.8,
            width: 75,
            height: 55,
            borderRadius: 24,
            opacity: 0.5,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="h-[180vh] relative pt-0 mt-0">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={containerRef}
          className="relative overflow-hidden border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.9)] transition-all duration-100 ease-linear will-change-transform"
          style={{
            width: `${styleState.width}vw`,
            height: `${styleState.height}vh`,
            borderRadius: `${styleState.borderRadius}px`,
            transform: `translateY(${styleState.translateY}px) scale(${styleState.scale})`,
            opacity: styleState.opacity,
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover block"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/video_banner.png"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-99648-large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#07090e]/85 backdrop-blur-md border border-white/15 px-10 py-3.5 rounded-full text-center z-10 whitespace-nowrap">
            <h3 className="text-base md:text-lg font-semibold text-white font-[var(--font-lato)]">
              Subtitle See how we helped Groover to grow 11x faster
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
