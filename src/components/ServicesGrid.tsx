"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  MapPin,
  Building2,
  Megaphone,
  BrainCircuit,
  CheckCircle2,
  X,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  outcome: string;
  detailedOverview: string;
  techStack: string[];
  phases: { duration: string; description: string }[];
}

const services: Service[] = [
  {
    id: "web-dev",
    title: "Website Development",
    description: "High-performance, conversion-optimized websites built with modern frameworks for maximum speed and SEO.",
    icon: <Globe className="w-6 h-6" />,
    color: "from-indigo-500 to-blue-500",
    benefits: ["100/100 Lighthouse Score", "Mobile-first responsive design", "Edge CDN deployment"],
    outcome: "Sites load in under 1 second with 3x better conversion rates.",
    detailedOverview:
      "We craft high-performance websites using Next.js and modern architectures. Every site is optimized for Core Web Vitals, built mobile-first, and deployed on edge networks for lightning-fast global delivery.",
    techStack: ["Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript", "Vercel Edge"],
    phases: [
      { duration: "Week 1-2", description: "Discovery, wireframing, and tech stack setup" },
      { duration: "Week 3-5", description: "Design system & component development" },
      { duration: "Week 6-7", description: "Content integration & SEO optimization" },
      { duration: "Week 8", description: "Testing, deployment & performance tuning" },
    ],
  },
  {
    id: "seo",
    title: "SEO Services",
    description: "Data-driven search optimization using AI-powered keyword research and technical SEO strategies.",
    icon: <Search className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    benefits: ["AI-powered keyword clustering", "Technical SEO audit & fixes", "Backlink strategy & outreach"],
    outcome: "Average 312% increase in organic traffic within 6 months.",
    detailedOverview:
      "Our SEO methodology combines AI-powered keyword research, technical site audits, and strategic content optimization to drive sustainable organic growth.",
    techStack: ["Google Search Console", "SEMrush API", "Ahrefs", "Custom AI Models", "Python Scripts"],
    phases: [
      { duration: "Week 1-2", description: "Full site audit & competitor analysis" },
      { duration: "Week 3-6", description: "On-page optimization & content strategy" },
      { duration: "Month 2-3", description: "Technical fixes & backlink building" },
      { duration: "Ongoing", description: "Monthly reporting & strategy refinement" },
    ],
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "Dominate local search results with optimized Google Business Profiles and local citation building.",
    icon: <MapPin className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500",
    benefits: ["Google Maps optimization", "Local citation building", "Review management system"],
    outcome: "Top 3 local pack rankings for high-intent keywords.",
    detailedOverview:
      "We optimize your entire local digital presence — from Google Business Profile to local citations and review management — ensuring you appear prominently when local customers search.",
    techStack: ["Google Business API", "BrightLocal", "Whitespark", "ReviewTrackers"],
    phases: [
      { duration: "Week 1", description: "GBP audit & optimization" },
      { duration: "Week 2-3", description: "Citation building & NAP consistency" },
      { duration: "Week 4", description: "Review generation strategy" },
      { duration: "Ongoing", description: "Monthly local ranking reports" },
    ],
  },
  {
    id: "gbp",
    title: "Google Business Optimization",
    description: "Full optimization of your Google Business Profile for maximum local visibility and engagement.",
    icon: <Building2 className="w-6 h-6" />,
    color: "from-amber-500 to-orange-500",
    benefits: ["Complete profile optimization", "Category & attribute targeting", "Post & Q&A management"],
    outcome: "5x more profile views and 3x more direction requests.",
    detailedOverview:
      "We fully optimize every aspect of your Google Business Profile — from categories and attributes to posts and Q&A — ensuring maximum visibility in local search results.",
    techStack: ["Google Business Profile", "Canva", "Local SEO Tools"],
    phases: [
      { duration: "Week 1", description: "Profile audit & competitor analysis" },
      { duration: "Week 2", description: "Complete profile optimization" },
      { duration: "Week 3-4", description: "Post strategy & Q&A management" },
      { duration: "Ongoing", description: "Monthly performance tracking" },
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Omnichannel marketing campaigns driven by data analytics and automated workflows.",
    icon: <Megaphone className="w-6 h-6" />,
    color: "from-rose-500 to-red-500",
    benefits: ["Multi-channel campaign management", "A/B testing & optimization", "ROI attribution modeling"],
    outcome: "40% reduction in customer acquisition cost.",
    detailedOverview:
      "We design and execute data-driven marketing campaigns across multiple channels, continuously optimizing based on performance data and ROI attribution.",
    techStack: ["Google Ads", "Meta Ads Manager", "Mailchimp", "HubSpot", "Looker Studio"],
    phases: [
      { duration: "Week 1", description: "Audience research & strategy" },
      { duration: "Week 2-3", description: "Campaign setup & creative development" },
      { duration: "Week 4-8", description: "Launch & A/B testing" },
      { duration: "Ongoing", description: "Optimization & monthly reporting" },
    ],
  },
  {
    id: "ai-automation",
    title: "AI Automation & Lead Gen",
    description: "Automated lead generation systems powered by AI chatbots and smart CRM workflows.",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-500",
    benefits: ["AI-powered chat & forms", "Automated CRM enrichment", "Smart lead scoring system"],
    outcome: "70% of inbound leads qualified automatically.",
    detailedOverview:
      "We build AI-powered automation systems that capture, qualify, and nurture leads 24/7 using intelligent chatbots, automated CRM workflows, and smart lead scoring.",
    techStack: ["OpenAI API", "Make.com", "Zapier", "HubSpot CRM", "Custom AI Agents"],
    phases: [
      { duration: "Week 1-2", description: "Lead capture system design" },
      { duration: "Week 3-4", description: "AI chatbot & form development" },
      { duration: "Week 5-6", description: "CRM integration & workflow automation" },
      { duration: "Ongoing", description: "Optimization & lead scoring refinement" },
    ],
  },
];

function ServiceCard({
  service,
  index,
  onSelect,
}: {
  service: Service;
  index: number;
  onSelect: (s: Service) => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: x * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(service)}
      className="group relative cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect(service); }}
      aria-label={`Learn more about ${service.title}`}
    >
      <div
        className="tilt-card relative h-full"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="glass-panel rounded-2xl p-5 h-full flex flex-col hover:border-primary/20 hover:shadow-lg transition-all duration-300 liquid-glass">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-10 flex items-center justify-center text-white shadow-lg`}>
            {service.icon}
          </div>

          {/* Content */}
          <h3 className="text-base font-extrabold mt-4 mb-2">{service.title}</h3>
          <p className="text-xs opacity-65 font-medium leading-5 flex-1">{service.description}</p>

          {/* Benefits */}
          <div className="mt-4 space-y-1.5">
            {service.benefits.slice(0, 2).map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-[11px] font-semibold opacity-70">{b}</span>
              </div>
            ))}
          </div>

          {/* Outcome */}
          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5">
            <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 leading-4">{service.outcome}</p>
          </div>

          {/* Arrow */}
          <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Explore details</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const whatsappMessage = encodeURIComponent(
    `Hello SEOWebAgency, I am interested in your "${service.title}" service. I would like to know more details and pricing.`
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel-strong rounded-3xl p-6 sm:p-8 z-10"
        role="dialog"
        aria-modal="true"
        aria-label={`${service.title} details`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-zinc-500"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
            {service.icon}
          </div>
          <div>
            <h3 className="text-xl font-extrabold">{service.title}</h3>
            <p className="text-xs opacity-60 font-semibold mt-0.5">{service.description}</p>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider opacity-40 mb-2">Overview</h4>
          <p className="text-sm font-medium opacity-75 leading-6">{service.detailedOverview}</p>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider opacity-40 mb-3">Key Benefits</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-black/5 dark:bg-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider opacity-40 mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Implementation Pipeline */}
        <div className="mb-8">
          <h4 className="text-xs font-extrabold uppercase tracking-wider opacity-40 mb-3">Implementation Pipeline</h4>
          <div className="space-y-2">
            {service.phases.map((phase, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 text-[10px] font-extrabold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-40">{phase.duration}</span>
                  <p className="text-xs font-bold mt-0.5">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              setTimeout(() => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold text-center shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Consultation
          </a>
          <a
            href={`https://wa.me/918860384919?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-2xl border border-black/10 dark:border-white/10 text-sm font-bold text-center hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            Inquire on WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onSelect={setSelectedService}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
