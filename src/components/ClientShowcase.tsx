"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, BarChart3, Search, Star, Users, Zap } from "lucide-react";

interface WebProject {
  title: string;
  description: string;
  category: string;
  url: string;
  gradient: string;
  icon: string;
  metrics: { label: string; value: string }[];
}

interface SEOStory {
  title: string;
  description: string;
  gradient: string;
  results: string[];
}

const webProjects: WebProject[] = [
  {
    title: "Gaav Ki Chai",
    description: "A premium tea brand website with e-commerce integration, showcasing their farm-to-cup journey.",
    category: "Website Development",
    url: "#",
    gradient: "from-amber-500 to-orange-500",
    icon: "GKC",
    metrics: [
      { label: "Page Speed", value: "98/100" },
      { label: "Conversion Boost", value: "+60%" },
      { label: "Traffic Growth", value: "+180%" },
    ],
  },
  {
    title: "Voice of News 24",
    description: "A high-traffic news portal with real-time updates, optimized for Core Web Vitals.",
    category: "Website Development",
    url: "#",
    gradient: "from-blue-500 to-cyan-500",
    icon: "VN",
    metrics: [
      { label: "Load Time", value: "0.8s" },
      { label: "Daily Visitors", value: "50K+" },
      { label: "SEO Score", value: "96/100" },
    ],
  },
  {
    title: "Hitachi AC",
    description: "Product landing page and dealer lead generation system with AI-powered forms.",
    category: "Website Development",
    url: "#",
    gradient: "from-emerald-500 to-teal-500",
    icon: "HA",
    metrics: [
      { label: "Lead Gen", value: "+240%" },
      { label: "Bounce Rate", value: "-35%" },
      { label: "Pages/Session", value: "4.2" },
    ],
  },
];

const seoStories: SEOStory[] = [
  {
    title: "Scholars Group of Institutions",
    description: "Multi-location educational institution SEO across 5 campuses in Uttar Pradesh.",
    gradient: "from-indigo-500 to-purple-500",
    results: [
      "Top 3 rankings for 45+ keywords",
      "400% organic traffic increase",
      "2x enrollment inquiries",
    ],
  },
  {
    title: "Pawan Medical & Trading Co.",
    description: "Local medical equipment supplier SEO targeting Meerut and surrounding districts.",
    gradient: "from-rose-500 to-pink-500",
    results: [
      "Google Maps Top 3 placement",
      "180% increase in direction requests",
      "60+ Google Reviews (4.8 avg)",
    ],
  },
];

function ProjectCard({ project, index }: { project: WebProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel rounded-3xl overflow-hidden group hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      {/* Header */}
      <div className={`bg-gradient-to-br ${project.gradient} p-5 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white text-sm font-black">
            {project.icon}
          </div>
          <div>
            <h3 className="text-white font-extrabold text-base">{project.title}</h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-white/15 text-white text-[9px] font-bold uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-medium opacity-65 leading-5 mb-4">{project.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="text-center p-2 rounded-xl bg-black/5 dark:bg-white/5">
              <p className="text-xs font-black text-indigo-600 dark:text-indigo-400">{metric.value}</p>
              <p className="text-[9px] font-bold opacity-40 mt-0.5">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:gap-2.5 transition-all"
        >
          <ExternalLink className="w-3 h-3" />
          Visit Project
        </a>
      </div>
    </motion.div>
  );
}

function SEOStoryCard({ story, index }: { story: SEOStory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="glass-panel rounded-3xl overflow-hidden group hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className={`h-2 bg-gradient-to-r ${story.gradient}`} />
      <div className="p-5">
        <h3 className="text-base font-extrabold mb-1">{story.title}</h3>
        <p className="text-xs font-medium opacity-65 leading-5 mb-4">{story.description}</p>
        <div className="space-y-2">
          {story.results.map((result, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${story.gradient} bg-opacity-20 flex items-center justify-center shrink-0 mt-0.5`}>
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold opacity-70">{result}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ClientShowcase() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Web Development Projects (3 of 5 cols) */}
      <div className="lg:col-span-3 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-indigo-500" />
          <h3 className="text-xs font-extrabold uppercase tracking-wider opacity-40">Web Development</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {webProjects.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
        {/* Third project + "And Many More" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ProjectCard project={webProjects[2]} index={2} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel rounded-3xl p-5 flex flex-col items-center justify-center text-center min-h-[200px] hover:border-indigo-500/20 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-black mb-3">
              +
            </div>
            <h3 className="text-base font-extrabold">And Many More</h3>
            <p className="text-xs opacity-60 font-semibold mt-1">
              50+ successful projects delivered across India
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-4 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Discuss Your Project
            </a>
          </motion.div>
        </div>
      </div>

      {/* SEO Success Stories (2 of 5 cols) */}
      <div className="lg:col-span-2 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Search className="w-4 h-4 text-emerald-500" />
          <h3 className="text-xs font-extrabold uppercase tracking-wider opacity-40">SEO Success Stories</h3>
        </div>
        {seoStories.map((story, i) => (
          <SEOStoryCard key={story.title} story={story} index={i} />
        ))}

        {/* Results banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel rounded-3xl p-5 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 border-indigo-500/10"
        >
          <h3 className="text-sm font-extrabold mb-3">Results We&apos;ve Delivered</h3>
          <div className="space-y-2">
            {[
              { icon: <BarChart3 className="w-4 h-4" />, label: "Higher Google Rankings", color: "text-indigo-500" },
              { icon: <TrendingUp className="w-4 h-4" />, label: "Increased Organic Traffic", color: "text-emerald-500" },
              { icon: <Users className="w-4 h-4" />, label: "More Qualified Leads", color: "text-cyan-500" },
              { icon: <Star className="w-4 h-4" />, label: "Better Brand Authority", color: "text-purple-500" },
              { icon: <Zap className="w-4 h-4" />, label: "Faster Page Load Times", color: "text-amber-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5">
                <div className={`${item.color}`}>{item.icon}</div>
                <span className="text-xs font-bold opacity-70">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
