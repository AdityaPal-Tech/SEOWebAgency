"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MessageCircle, Phone, Mail } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  whatsappMessage: string;
}

const seoPlans: Plan[] = [
  {
    name: "Starter SEO",
    price: "₹2,999",
    period: "/month",
    description: "Perfect for small businesses starting their SEO journey.",
    features: [
      "10 Keywords Optimization",
      "Monthly SEO Report",
      "On-Page Optimization",
      "Google Business Profile Setup",
      "Basic Competitor Analysis",
      "Email Support (48h)"
    ],
    whatsappMessage: encodeURIComponent("Hello SEOWebAgency, I am interested in your Starter SEO plan at ₹2,999/month. Please share more details.")
  },
  {
    name: "Business Growth",
    price: "₹7,999",
    period: "/month",
    description: "For growing businesses ready to scale their online presence.",
    features: [
      "30 Keywords Optimization",
      "Weekly SEO Reports",
      "Advanced On-Page SEO",
      "Google Business Optimization",
      "Link Building (15/month)",
      "Technical SEO Audit",
      "Content Strategy",
      "Priority WhatsApp Support",
      "Monthly Strategy Call"
    ],
    popular: true,
    whatsappMessage: encodeURIComponent("Hello SEOWebAgency, I am interested in your Business Growth plan at ₹7,999/month. Please share more details.")
  },
  {
    name: "Premium Growth",
    price: "₹14,999",
    period: "/month",
    description: "Comprehensive SEO for businesses aiming for market dominance.",
    features: [
      "Unlimited Keywords",
      "Real-Time Dashboard Access",
      "Full Technical SEO Overhaul",
      "Premium Link Building (30+/month)",
      "Content Creation (4 articles)",
      "AI-Powered Optimization",
      "Conversion Rate Optimization",
      "Dedicated Account Manager",
      "Weekly Strategy Calls",
      "Priority 24/7 Support"
    ],
    whatsappMessage: encodeURIComponent("Hello SEOWebAgency, I am interested in your Premium Growth plan at ₹14,999/month. Please share more details.")
  }
];

const devPlans: Plan[] = [
  {
    name: "Basic Website",
    price: "₹9,999",
    period: "one-time",
    description: "A professional 5-page website to establish your online presence.",
    features: [
      "5 Pages Design",
      "Responsive Design",
      "Basic SEO Setup",
      "Contact Form",
      "Social Media Links",
      "1 Month Support",
      "Free SSL Certificate"
    ],
    whatsappMessage: encodeURIComponent("Hello SEOWebAgency, I am interested in your Basic Website plan at ₹9,999. Please share more details.")
  },
  {
    name: "Business Website",
    price: "₹19,999",
    period: "one-time",
    description: "A fully-featured business website with advanced functionality.",
    features: [
      "10 Pages Design",
      "Premium Responsive Design",
      "Advanced SEO Optimization",
      "Blog Integration",
      "Analytics Setup",
      "Contact Form & Lead Capture",
      "Speed Optimization (90+ Score)",
      "3 Months Support",
      "CMS Integration"
    ],
    popular: true,
    whatsappMessage: encodeURIComponent("Hello SEOWebAgency, I am interested in your Business Website plan at ₹19,999. Please share more details.")
  },
  {
    name: "Premium Business",
    price: "₹29,999+",
    period: "starting",
    description: "Enterprise-grade website with custom features and integrations.",
    features: [
      "Unlimited Pages",
      "Custom Design System",
      "Full SEO Suite Integration",
      "E-Commerce / Booking System",
      "AI Chatbot Integration",
      "Custom Animations & 3D",
      "Multi-language Support",
      "CRM Integration",
      "Priority 24/7 Support",
      "6 Months Maintenance"
    ],
    whatsappMessage: encodeURIComponent("Hello SEOWebAgency, I am interested in your Premium Business Website plan starting at ₹29,999+. Please share more details.")
  }
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col ${
        plan.popular ? "lg:scale-105 z-10" : ""
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg shadow-indigo-500/30">
            Most Popular
          </span>
        </div>
      )}

      <div className={`glass-panel rounded-3xl p-6 flex flex-col h-full ${
        plan.popular
          ? "border-indigo-500/30 shadow-xl shadow-indigo-500/10"
          : "hover:border-primary/10"
      } transition-all duration-300`}>
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-lg font-extrabold">{plan.name}</h3>
          <p className="text-xs opacity-60 font-medium mt-1">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl font-black tracking-tight">{plan.price}</span>
          <span className="text-xs font-bold opacity-40 ml-1">{plan.period}</span>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold opacity-70 leading-5">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={`https://wa.me/918860384919?text=${plan.whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3.5 rounded-2xl text-sm font-bold text-center transition-all duration-200 flex items-center justify-center gap-2 ${
            plan.popular
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              : "border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <MessageCircle className="w-4 h-4 text-emerald-500" />
          Get Started
        </a>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [tab, setTab] = useState<"seo" | "dev">("seo");
  const plans = tab === "seo" ? seoPlans : devPlans;

  return (
    <section id="pricing" className="relative py-20 border-t border-black/5 dark:border-white/5">
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
            Transparent Plans, Real Results
          </h2>
          <p className="text-sm opacity-60 mt-3 font-semibold leading-6">
            Choose a plan that fits your goals. All plans include our proven methodology and dedicated support.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-black/5 dark:bg-white/5">
            <button
              onClick={() => setTab("seo")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === "seo"
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-indigo-600 dark:text-indigo-400"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              SEO Campaigns
            </button>
            <button
              onClick={() => setTab("dev")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === "dev"
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-indigo-600 dark:text-indigo-400"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              Website Development
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
          >
            {plans.map((plan, index) => (
              <PlanCard key={plan.name} plan={plan} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Custom Solution CTA */}
        <div className="mt-16 text-center glass-panel rounded-3xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-extrabold mb-2">Need a Custom Solution?</h3>
          <p className="text-sm opacity-60 font-semibold mb-6">
            We tailor strategies for enterprise requirements, multi-location businesses, and complex technical environments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+918803511070"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              Call +91 8803511070
            </a>
            <a
              href={`https://wa.me/918860384919?text=${encodeURIComponent("Hello SEOWebAgency, I would like to discuss a custom solution for my business.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <a
              href="mailto:seowebagency.in@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <Mail className="w-4 h-4 text-cyan-500" />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
