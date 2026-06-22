"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Cpu,
  Zap,
  Layers,
  Calendar,
  LineChart,
  Phone,
  Mail,
  CheckCircle2,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Instagram } from "@/components/InstagramIcon";

import Navbar from "@/components/Navbar";
import ThreeCanvas from "@/components/ThreeCanvas";
import ServicesGrid from "@/components/ServicesGrid";
import SaaSResults from "@/components/SaaSResults";
import AuditTool from "@/components/AuditTool";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import ClientShowcase from "@/components/ClientShowcase";
import Pricing from "@/components/Pricing";
import WhatsAppButton from "@/components/WhatsAppButton";

// ── FAQ Data (for inline AEO optimization) ──
const faqItems = [
  {
    question: "What SEO services does SEOWebAgency offer in Meerut?",
    answer:
      "SEOWebAgency provides comprehensive SEO services in Meerut, Uttar Pradesh including technical SEO audits, keyword research, on-page optimization, local SEO for Google Maps rankings, link building, content strategy, and performance reporting. Our AI-powered approach delivers an average 312% traffic increase for our clients across Meerut and India.",
  },
  {
    question: "How much does website development cost in Meerut?",
    answer:
      "Our website development packages in Meerut start at ₹9,999 for a professional 5-page responsive website, ₹19,999 for a full business website with CMS and blog, and ₹29,999+ for premium enterprise solutions with custom features, e-commerce, and AI integration. Every site achieves 90+ Lighthouse scores.",
  },
  {
    question: "How long does SEO take to show results?",
    answer:
      "Most clients see initial improvements in organic traffic within 4–8 weeks. Significant ranking improvements for competitive keywords typically occur within 3–6 months. Our clients average 312% organic traffic growth within 6 months through our systematic SEO methodology.",
  },
  {
    question: "What is Local SEO and how does it help Meerut businesses?",
    answer:
      "Local SEO optimizes your online presence to attract Meerut customers searching for your services on Google. This includes Google Business Profile optimization, local citation building, review management, and geo-targeted content. Meerut businesses using our local SEO services achieve top 3 local pack rankings and up to 180% more direction requests.",
  },
  {
    question: "Do you offer AI automation services?",
    answer:
      "Yes, we build AI-powered automation systems including intelligent chatbots, automated CRM workflows, smart lead scoring, and AI content generation. Our solutions help businesses save 20+ hours weekly and achieve 70% automatic lead qualification rates.",
  },
  {
    question: "Why choose SEOWebAgency over other SEO agencies?",
    answer:
      "SEOWebAgency combines AI-powered optimization with transparent reporting, custom tech stacks, programmatic SEO models, and a data-driven approach delivering 8.5x average ROI. Unlike traditional agencies, we build automated systems that scale with your business and provide real-time dashboard access.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-black/5 dark:border-white/5 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        aria-expanded={isOpen}
      >
        <h3 className="text-xs sm:text-sm font-bold leading-6 text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {question}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 shrink-0 opacity-40" />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0 opacity-40" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-[11px] sm:text-xs opacity-65 leading-6 pb-4 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Reusable Section Wrapper with scroll-reveal ──
function SectionWrapper({
  id,
  children,
  className = "",
  bgAccent = false,
  ariaLabel,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  bgAccent?: boolean;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative py-16 sm:py-20 lg:py-24 border-t border-black/5 dark:border-white/5 ${
        bgAccent ? "bg-black/[0.01] dark:bg-white/[0.01]" : ""
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

// ── Section Heading Component ──
function SectionHeading({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
    >
      <span className="inline-block text-[10px] sm:text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider mb-4">
        {tag}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-xs sm:text-sm opacity-60 mt-3 font-semibold leading-6 max-w-xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
}

// ── Custom Cursor Glow Hook ──
function useCursorGlow() {
  const [position, setPosition] = useState({ x: -400, y: -400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

export default function Home() {
  const glowPos = useCursorGlow();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    service: "SEO Services",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedInquiryId, setSubmittedInquiryId] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Counter stats for Hero
  const [stats, setStats] = useState({ projects: 0, increase: 0, experts: 0 });

  useEffect(() => {
    let start = Date.now();
    const duration = 1500;
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setStats({
        projects: Math.floor(500 * eased),
        increase: Math.floor(312 * eased),
        experts: Math.floor(18 * eased),
      });
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // Live SEO Trajectory state
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(2);
  const [trajectoryHeights, setTrajectoryHeights] = useState([
    40, 25, 60, 50, 75, 95, 80, 110, 130,
  ]);
  const [activeTargetValue, setActiveTargetValue] = useState(312);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSinceUpdate((prev) => {
        if (prev >= 4) {
          setTrajectoryHeights((current) =>
            current.map((h, i) => {
              if (i === 8) {
                return 130 + Math.floor(Math.random() * 11) - 5;
              }
              const change = Math.floor(Math.random() * 7) - 3;
              const base = [40, 25, 60, 50, 75, 95, 80, 110][i];
              return Math.max(base - 8, Math.min(base + 8, h + change));
            })
          );
          setActiveTargetValue((prevTarget) => {
            const change = Math.floor(Math.random() * 5) - 2;
            return Math.max(305, Math.min(320, prevTarget + change));
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          company: formState.website || "N/A",
          service: formState.service,
          message: formState.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmittedInquiryId(result.inquiryId);
        setFormSubmitted(true);
      } else {
        setErrorMessage(result.error || "An error occurred during submission.");
      }
    } catch (err) {
      console.error("Error submitting consultation:", err);
      setErrorMessage("Network error. Please verify your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ══════════════════════════════════════════════
             GLOBAL INTERACTIVE ELEMENTS
          ══════════════════════════════════════════════ */}
      {/* Cursor Glow */}
      <div
        className="cursor-glow hidden md:block"
        style={{ left: `${glowPos.x}px`, top: `${glowPos.y}px` }}
        aria-hidden="true"
      />

      {/* Navigation (inside <header> for SEO) */}
      <Navbar />

      {/* ══════════════════════════════════════════════
             MAIN CONTENT
          ══════════════════════════════════════════════ */}
      <main id="main-content">
        {/* ══════════════════════════════════════════════
               HERO SECTION – H1
          ══════════════════════════════════════════════ */}
        <section
          id="home"
          aria-label="Welcome to SEOWebAgency – SEO & Digital Growth Agency in Meerut"
          className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-10 sm:pb-16"
        >
          {/* WebGL Canvas Background */}
          <div className="absolute inset-0 z-0">
            <ThreeCanvas />
          </div>

          {/* Ambient Gradient Glow Meshes */}
          <div className="absolute top-1/4 left-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] glow-mesh-purple glow-mesh rounded-full pointer-events-none opacity-30" aria-hidden="true" />

          {/* Grid Overlay */}
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Hero Content */}
              <article className="lg:col-span-7 flex flex-col items-start text-left">
                {/* AI badge (eye-catching label for featured snippets) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase mb-4 sm:mb-6"
                >
                  <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">AI-Powered SEO Agency in Meerut, India</span>
                  <span className="sm:hidden">AI-Powered SEO Agency</span>
                </motion.div>

                {/* H1 – Primary heading for SEO */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
                >
                  Grow Faster with{" "}
                  <span className="text-gradient-glow">
                    AI-Powered SEO
                  </span>{" "}
                  &amp; Digital Growth – Meerut&apos;s Premium Agency
                </motion.h1>

                {/* Strategic subheading (entity-rich, keyword-optimized for AEO) */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg opacity-75 mt-4 sm:mt-6 max-w-xl font-medium leading-6 sm:leading-8"
                >
                  SEOWebAgency, based in <strong>Meerut, Uttar Pradesh</strong>, is a premium digital growth agency that builds high-performance websites, generates qualified leads, automates workflows with AI, and helps brands dominate Google search rankings. We deliver <strong>500+ successful projects</strong> with an average <strong>312% increase in organic traffic</strong>.
                </motion.p>

                {/* Call to Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto"
                >
                  <a
                    href="#contact"
                    className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-extrabold text-xs sm:text-sm hover:shadow-xl hover:shadow-indigo-500/30 transition-all text-center flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    Book Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/918860384919?text=${encodeURIComponent("Hello SEOWebAgency, I visited your website from Meerut and would like to know more about your SEO services.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/30 dark:bg-zinc-900/30 text-black dark:text-white font-extrabold text-xs sm:text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2 backdrop-blur-md active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    Chat on WhatsApp
                  </a>
                </motion.div>

                {/* Trust Indicators / Entity Signals */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 border-t border-black/5 dark:border-white/5 pt-6 sm:pt-8 w-full"
                >
                  {[
                    { value: `+${stats.projects}`, label: "Projects Completed", color: "text-indigo-500" },
                    { value: `+${stats.increase}%`, label: "Avg Traffic Increase", color: "text-cyan-500" },
                    { value: `+${stats.experts}`, label: "SEO & AI Experts", color: "text-emerald-500" },
                    { value: "24/7", label: "Client Support", color: "text-purple-500" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className={`text-xl sm:text-2xl font-black tracking-tight ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-[9px] sm:text-[10px] opacity-60 font-semibold uppercase mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>

                {/* Local SEO signal – Meerut */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex items-center gap-2 mt-4 text-[10px] font-bold opacity-50"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Serving Meerut, Uttar Pradesh &amp; all India</span>
                </motion.div>
              </article>

              {/* Interactive Floating Card Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-5 hidden lg:block perspective-1000"
                aria-hidden="true"
              >
                <div className="glass-panel border border-black/10 dark:border-white/5 bg-white/70 dark:bg-zinc-950/20 p-4 sm:p-5 rounded-3xl relative animate-float shadow-2xl">
                  {/* Live indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" aria-hidden="true" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" aria-hidden="true" />
                    <span className="text-[8px] font-bold opacity-40 uppercase tracking-wider">LIVE</span>
                  </div>

                  <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                      <LineChart className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs">Live SEO Trajectory</h3>
                      <p className="text-[10px] opacity-50 font-semibold">
                        Updated {secondsSinceUpdate}s ago
                      </p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-36 sm:h-40 relative flex items-end justify-between gap-1.5 border-b border-black/5 dark:border-white/5 pb-1">
                    {trajectoryHeights.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end items-center h-full">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={
                            i === 8
                              ? { type: "spring", stiffness: 80, damping: 15 }
                              : { duration: 0.5, ease: "easeInOut" }
                          }
                          className={`w-full rounded-t-lg ${
                            i === 8
                              ? "bg-gradient-to-t from-indigo-500 via-indigo-600 to-cyan-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                              : "bg-black/10 dark:bg-white/10"
                          } relative`}
                        >
                          {i === 8 && (
                            <span className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-extrabold text-indigo-600 dark:text-cyan-400 whitespace-nowrap animate-pulse">
                              +{activeTargetValue}%
                            </span>
                          )}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[8px] sm:text-[9px] opacity-40 uppercase font-bold mt-2">
                    <span>Month 1</span>
                    <span>Month 3</span>
                    <span>Active Target</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
               SERVICES SECTION – H2 (Topic Cluster: SEO Services)
          ══════════════════════════════════════════════ */}
        <SectionWrapper
          id="services"
          ariaLabel="Our SEO, Website Development & Digital Marketing Services"
        >
          <div className="absolute top-0 right-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none opacity-40" aria-hidden="true" />

          <SectionHeading
            tag="Our Capabilities"
            title="SEO Services, Website Development &amp; Digital Marketing in Meerut"
            description="Accelerate your digital footprint with our comprehensive suite of services. From technical SEO audits and high-performance website development to AI-powered automation, we deliver measurable growth for businesses in Meerut, Uttar Pradesh, and across India."
          />

          <ServicesGrid />
        </SectionWrapper>

        {/* ══════════════════════════════════════════════
               SOLUTIONS / WHY CHOOSE US – H2
          ══════════════════════════════════════════════ */}
        <SectionWrapper
          id="solutions"
          bgAccent
          ariaLabel="Why choose SEOWebAgency – Our core values and approach"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Visual Specs grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-3 sm:gap-5"
            >
              {[
                { title: "Trust", desc: "Verifiable transparent data signals and real-time reporting.", icon: ShieldCheck, color: "text-indigo-500" },
                { title: "Innovation", desc: "Next-gen AI algorithms for scraping, analysis, and automation.", icon: Cpu, color: "text-cyan-500" },
                { title: "Performance", desc: "100/100 Core Web Vitals speed on every website we build.", icon: Zap, color: "text-emerald-500" },
                { title: "Simplicity", desc: "Intuitive SaaS dashboard for tracking reports and ROI.", icon: Layers, color: "text-purple-500" },
              ].map((val, idx) => {
                const ValIcon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between min-h-[130px] sm:min-h-[150px] hover:border-primary/10 transition-all duration-300 liquid-glass group"
                  >
                    <ValIcon className={`w-7 h-7 sm:w-8 sm:h-8 ${val.color} group-hover:scale-110 transition-transform duration-300`} />
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base mt-3">{val.title}</h4>
                      <p className="text-[10px] sm:text-[11px] opacity-60 mt-1 font-semibold leading-4">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Solutions Description – Entity-rich content for GEO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-start text-left"
            >
              <span className="inline-block text-[10px] sm:text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                Why SEOWebAgency?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Designed to Outperform Standard Agency Workflows
              </h2>
              <p className="text-xs sm:text-sm opacity-60 mt-4 font-semibold leading-6 sm:leading-7">
                Traditional agencies rely on manual updates and static reporting tables. SEOWebAgency, based in <strong>Meerut, Uttar Pradesh</strong>, builds custom <strong>AI-powered tech stacks</strong> for each client — utilizing real-time API syncs, automated follow-up triggers, and <strong>programmatic SEO models</strong> to scale your traffic. We serve businesses across India with a focus on delivering measurable, data-driven results.
              </p>

              <div className="mt-5 sm:mt-6 space-y-3 w-full">
                {[
                  "Real-time visibility metrics synced to your Google Search Console for transparent SEO reporting",
                  "Fully customized headless page speeds running on edge networks for 100/100 Lighthouse scores",
                  "Automated CRM updates to catalog inbound search leads instantly with AI-powered qualification",
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold opacity-80">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ══════════════════════════════════════════════
               RESULTS DASHBOARD – H2
          ══════════════════════════════════════════════ */}
        <SectionWrapper id="results" ariaLabel="SEO Results Dashboard – Traffic, Rankings & ROI Metrics">
          <div className="absolute top-1/3 left-1/3 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-40" aria-hidden="true" />

          <SectionHeading
            tag="Transparency"
            title="Interactive SEO Growth Dashboard"
            description="Track your website's keyword rankings, organic traffic growth, conversion rates, lead generation metrics, and ROI improvement — all in real time with our interactive dashboard."
          />

          <SaaSResults />
        </SectionWrapper>

        {/* ══════════════════════════════════════════════
               AI SEO AUDIT TOOL – H2
          ══════════════════════════════════════════════ */}
        <SectionWrapper id="about" bgAccent ariaLabel="Free AI-Powered SEO Audit Tool">
          <AuditTool />
        </SectionWrapper>

        {/* ══════════════════════════════════════════════
               CLIENT SHOWCASE – H2 (Topic Cluster: Portfolio)
          ══════════════════════════════════════════════ */}
        <SectionWrapper
          id="portfolio"
          ariaLabel="Our Portfolio – Website Development & SEO Success Stories"
        >
          <div className="absolute top-1/4 right-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-30" aria-hidden="true" />

          <SectionHeading
            tag="Showcase"
            title="Trusted by Growing Businesses Across India"
            description="We have successfully delivered website development and SEO solutions for 50+ businesses across Meerut, Uttar Pradesh, and India — helping them increase traffic, leads, and online revenue."
          />

          <ClientShowcase />
        </SectionWrapper>

        {/* ══════════════════════════════════════════════
               TESTIMONIALS – H2 (Review Schema Entity)
          ══════════════════════════════════════════════ */}
        <SectionWrapper id="testimonials" ariaLabel="Client Testimonials and Reviews">
          <SectionHeading
            tag="Testimonials"
            title="What Our Clients Say About Us"
            description="Hear directly from the founders, directors, and marketing managers who trust SEOWebAgency for their digital growth."
          />

          <TestimonialsSlider />
        </SectionWrapper>

        {/* ══════════════════════════════════════════════
               FAQ SECTION – H2 (AEO Featured Snippet Optimization)
          ══════════════════════════════════════════════ */}
        <SectionWrapper
          id="faq"
          bgAccent
          ariaLabel="Frequently Asked Questions about SEO, Website Development & Digital Marketing"
        >
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              tag="FAQ – AEO Optimized"
              title="Frequently Asked Questions About SEO Services"
              description="Quick answers to common questions about SEO in Meerut, website development costs, local SEO, AI automation, and how SEOWebAgency delivers results."
            />

            {/* FAQ Items */}
            <div className="glass-panel rounded-3xl p-5 sm:p-7">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFaqIndex === index}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                />
              ))}
            </div>

            {/* FAQ CTA */}
            <div className="text-center mt-8">
              <p className="text-xs font-semibold opacity-60 mb-4">
                Still have questions? We&apos;re here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+918803511070"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                >
                  <Phone className="w-4 h-4 text-indigo-500" />
                  Call +91 8803511070
                </a>
                <a
                  href={`https://wa.me/918860384919?text=${encodeURIComponent("Hello SEOWebAgency, I have a question about your services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ══════════════════════════════════════════════
               PRICING SECTION – H2
          ══════════════════════════════════════════════ */}
        <Pricing />

        {/* ══════════════════════════════════════════════
               CONTACT & CONSULTATION – H2
          ══════════════════════════════════════════════ */}
        <SectionWrapper
          id="contact"
          ariaLabel="Contact SEOWebAgency – Book a Free SEO Consultation in Meerut"
        >
          <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-40" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[10px] sm:text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  Contact
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  Book a Free SEO Consultation in Meerut
                </h2>
                <p className="text-xs sm:text-sm opacity-60 mt-4 font-semibold leading-6 sm:leading-7">
                  Ready to grow your business? Schedule a free strategic growth briefing with our team. We&apos;ll analyze your website, discuss your SEO and digital marketing goals, and create a customized growth roadmap — no obligations, no hidden costs.
                </p>
              </div>

              {/* Direct Contact Details Card */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl glass-panel space-y-3">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider opacity-60">
                    Prefer Direct Channels?
                  </span>
                  <p className="text-xs sm:text-sm font-semibold mt-2">
                    Get in touch instantly via call, email, or WhatsApp.
                  </p>
                </div>
                <div className="space-y-2.5 pt-2">
                  {[
                    { href: "tel:+918803511070", label: "Call: +91 8803511070", icon: Phone, color: "text-indigo-500" },
                    { href: "mailto:seowebagency.in@gmail.com", label: "Email: seowebagency.in@gmail.com", icon: Mail, color: "text-cyan-500" },
                    { href: `https://wa.me/918860384919?text=${encodeURIComponent("Hello SEOWebAgency, I visited your website from Meerut and would like to book a free consultation.")}`, label: "WhatsApp Chat", icon: MessageSquare, color: "text-emerald-500", external: true },
                  ].map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 text-[11px] sm:text-xs font-extrabold hover:text-primary transition-all group"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shrink-0`}>
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                  <a
                    href="https://instagram.com/seoweb_agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[11px] sm:text-xs font-extrabold hover:text-pink-500 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform shrink-0">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <span>Instagram (@seoweb_agency)</span>
                  </a>
                </div>
                {/* Local SEO signal */}
                <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 pt-2 border-t border-black/5 dark:border-white/5">
                  <MapPin className="w-3 h-3" />
                  <span>Based in Meerut, Uttar Pradesh – Serving clients across India</span>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="glass-panel p-5 sm:p-6 rounded-3xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold opacity-60 uppercase mb-1.5">
                            Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-black dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold opacity-60 uppercase mb-1.5">
                            Email <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="your@email.com"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-black dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold opacity-60 uppercase mb-1.5">
                            Phone <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 8803511070"
                            value={formState.phone}
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-black dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold opacity-60 uppercase mb-1.5">
                            Website (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="yourwebsite.com"
                            value={formState.website}
                            onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-black dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold opacity-60 uppercase mb-1.5">
                            Service Required
                          </label>
                          <select
                            value={formState.service}
                            onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-black dark:text-white"
                          >
                            <option value="SEO Services">SEO Services</option>
                            <option value="Website Development">Website Development</option>
                            <option value="Local SEO">Local SEO</option>
                            <option value="Google Business Optimization">Google Business Profile</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="AI Automation & Lead Gen">AI Automation & Lead Gen</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-xs font-bold opacity-60 uppercase mb-1.5">
                          Message
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us about your project, goals, and how we can help your business grow..."
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none text-black dark:text-white"
                        />
                      </div>

                      {errorMessage && (
                        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold leading-5 text-left">
                          ⚠️ {errorMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-extrabold text-xs sm:text-sm hover:shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Booking Strategy Call...
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            Book Free Consultation – Request Proposal
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 sm:py-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold">Consultation Booked Successfully!</h3>
                      <p className="text-xs sm:text-sm opacity-60 mt-3 max-w-sm mx-auto leading-6">
                        Thank you for contacting SEOWebAgency. Our team in Meerut will review your inquiry and reach out within 24 hours to schedule your free strategy call.
                      </p>
                      <div className="mt-4 sm:mt-5 p-3 sm:p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[9px] sm:text-[10px] text-cyan-400 text-left max-w-sm mx-auto">
                        <p className="opacity-50">// CONSULTATION BOOKING CONFIRMED</p>
                        <p className="mt-1 text-emerald-400">✓ Inquiry received successfully</p>
                        <p className="text-emerald-400">✓ Confirmation sent to your email</p>
                        <p className="text-zinc-500">Reference: {submittedInquiryId || "N/A"}</p>
                      </div>
                      <button
                        onClick={() => {
                          setFormState({ name: "", email: "", phone: "", website: "", service: "SEO Services", message: "" });
                          setSubmittedInquiryId("");
                          setFormSubmitted(false);
                        }}
                        className="mt-6 sm:mt-8 px-6 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>

      {/* ══════════════════════════════════════════════
             FOOTER
          ══════════════════════════════════════════════ */}
      <footer className="relative py-10 sm:py-12 border-t border-black/5 dark:border-white/5 bg-zinc-50/80 dark:bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 sm:mb-12">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col items-start">
            <a
              href="#home"
              className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-3"
            >
              SEOWebAgency
            </a>
            <p className="text-[10px] sm:text-[11px] opacity-50 font-semibold leading-5 max-w-[220px] mb-4">
              Premium AI-powered SEO and digital growth agency based in <strong>Meerut, Uttar Pradesh</strong>. We build high-performance websites, drive organic traffic, and automate lead generation for businesses across India.
            </p>
            <div className="space-y-2 text-[11px] sm:text-xs font-bold opacity-85">
              <a href="tel:+918803511070" className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
                <Phone className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>+91 8803511070</span>
              </a>
              <a href="mailto:seowebagency.in@gmail.com" className="flex items-center gap-2 hover:text-cyan-500 transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>seowebagency.in@gmail.com</span>
              </a>
              <a
                href={`https://wa.me/918860384919?text=${encodeURIComponent("Hello SEOWebAgency, I came across your website and would like to discuss my project.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>WhatsApp Chat</span>
              </a>
              <a
                href="https://instagram.com/seoweb_agency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span>Instagram (@seoweb_agency)</span>
              </a>
              <div className="flex items-center gap-2 text-[10px] opacity-40 font-bold pt-1">
                <MapPin className="w-3 h-3" />
                <span>Meerut, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Core Offerings */}
          <div>
            <h5 className="text-[10px] sm:text-xs font-extrabold tracking-wider uppercase opacity-40 mb-4">
              Core Services
            </h5>
            <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs font-bold opacity-75">
              {[
                { href: "#services", label: "Website Development" },
                { href: "#services", label: "SEO Services" },
                { href: "#services", label: "Local SEO" },
                { href: "#services", label: "AI Automation" },
                { href: "#services", label: "Digital Marketing" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-[10px] sm:text-xs font-extrabold tracking-wider uppercase opacity-40 mb-4">
              Resources
            </h5>
            <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs font-bold opacity-75">
              {[
                { href: "#results", label: "Case Studies & ROI" },
                { href: "#about", label: "Free SEO Audit" },
                { href: "#faq", label: "SEO FAQ" },
                { href: "#testimonials", label: "Client Reviews" },
                { href: "#pricing", label: "Pricing Plans" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification */}
          <div>
            <h5 className="text-[10px] sm:text-xs font-extrabold tracking-wider uppercase opacity-40 mb-4">
              Trust Signals
            </h5>
            <ul className="space-y-2.5 text-[11px] sm:text-xs font-bold opacity-75">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>Lighthouse: 100/100 Score</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>SEO Core Index: 100/100</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>500+ Projects Delivered</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>312% Avg Traffic Growth</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                <span>AI Agent Engine: Active</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-black/5 dark:border-white/5 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] opacity-60 font-semibold gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} SEOWebAgency – SEO &amp; Digital Growth Agency. All rights reserved.</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase animate-pulse-slow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Serving Meerut, UP, India
            </span>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <a href="/terms" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <WhatsAppButton />
    </>
  );
}
