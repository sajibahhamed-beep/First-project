"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: "How does the AI-powered project setup work?",
    answer:
      "Our platform intelligently analyzes your project specs and automatically provisions repositories, environments, and CI/CD pipelines in seconds.",
  },
  {
    question: "Can I integrate with other tools we already use?",
    answer:
      "Yes! We integrate seamlessly with GitHub, Vercel, Supabase, Figma, Jira, and Slack.",
  },
  {
    question: "How long does it take to set up?",
    answer:
      "Absolutely. We implement enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with GDPR, HIPAA, and other regulations. Your data is stored in SOC 2 compliant data centers.",
  },
  {
    question: "Can I customize the platform for my industry?",
    answer:
      "Yes, all design systems, themes, and workflow automations can be tailored specifically to your domain.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 dedicated support via live chat, email, and scheduled 1-on-1 video calls.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! You can start a 14-day free trial with full access to all premium features.",
  },
  {
    question: "How often do you release updates?",
    answer:
      "We push continuous updates weekly with new features, performance enhancements, and template additions.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(2);
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs);

  useEffect(() => {
    fetch("/api/admin/faqs")
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs && data.faqs.length > 0) {
          setFaqs(
            data.faqs.map((f: { id: string; question: string; answer: string }) => ({
              question: f.question,
              answer: f.answer,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-left mb-12">
        <h2 className="text-4xl font-extrabold font-[var(--font-lato)] text-white mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-[#8e8e93] text-base font-[var(--font-inter)] max-w-2xl">
          Find answers to common questions about our design services, workflow, tools, and project deliverables.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        {faqs.map((faq, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-[#121826]/70 rounded-[4px] shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors duration-300 ${
                isOpen ? "bg-[#121826]" : "hover:bg-[#121826]/90"
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-7 py-5 bg-transparent border-none text-white font-[var(--font-lato)] font-semibold text-lg text-left flex items-center justify-between cursor-pointer select-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-white/70 shrink-0 ml-4 transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-180 text-[#06ACFE]" : ""
                  }`}
                />
              </button>

              {/* Smooth Animated Height & Opacity Expand Container */}
              <div
                className={`grid transition-[grid-template-rows,opacity,padding] duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 px-7 pb-6 pt-1"
                    : "grid-rows-[0fr] opacity-0 px-7 pb-0 pt-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-5 rounded-[4px] bg-[#181d28] border-l-4 border-l-[#06ACFE] text-[#8e8e93] text-base font-[var(--font-inter)] leading-relaxed shadow-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
