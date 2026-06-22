"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Search,
  MousePointerClick,
  Users,
  DollarSign,
  BarChart3,
  Activity,
} from "lucide-react";

type Filter = "7D" | "30D" | "ALL";

interface MetricConfig {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  chartColor: string;
  data: Record<Filter, { path: string; label: string; peak: number }>;
}

const metrics: MetricConfig[] = [
  {
    id: "keywords",
    label: "Keyword Rankings",
    value: "Top 10",
    icon: <Search className="w-4 h-4" />,
    color: "text-indigo-500",
    chartColor: "#6366f1",
    data: {
      "7D": { path: "M0,40 Q20,35 40,38 Q60,30 80,32 Q100,25 120,28 Q140,20 160,22 Q180,15 200,18", label: "+18 new keywords", peak: 42 },
      "30D": { path: "M0,60 Q30,50 60,55 Q90,40 120,45 Q150,30 180,35 Q210,20 240,25 Q270,15 300,18", label: "+64 keywords ranked", peak: 65 },
      "ALL": { path: "M0,70 Q40,60 80,65 Q120,50 160,55 Q200,35 240,40 Q280,25 320,28 Q360,15 400,12", label: "+150+ keywords ranked", peak: 72 },
    },
  },
  {
    id: "traffic",
    label: "Organic Traffic",
    value: "+312%",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-emerald-500",
    chartColor: "#10b981",
    data: {
      "7D": { path: "M0,45 Q20,40 40,42 Q60,35 80,38 Q100,30 120,33 Q140,25 160,20", label: "+28% weekly growth", peak: 48 },
      "30D": { path: "M0,55 Q30,48 60,52 Q90,40 120,45 Q150,30 180,35 Q210,22 240,18", label: "+112% monthly growth", peak: 58 },
      "ALL": { path: "M0,65 Q40,55 80,60 Q120,45 160,50 Q200,30 240,35 Q280,20 320,15", label: "+312% total growth", peak: 68 },
    },
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "4.8%",
    icon: <MousePointerClick className="w-4 h-4" />,
    color: "text-cyan-500",
    chartColor: "#06b6d4",
    data: {
      "7D": { path: "M0,50 Q20,45 40,47 Q60,42 80,44 Q100,38 120,40 Q140,35 160,32", label: "4.2% → 4.8%", peak: 52 },
      "30D": { path: "M0,55 Q30,50 60,52 Q90,45 120,48 Q150,40 180,42 Q210,35 240,30", label: "3.1% → 4.8%", peak: 58 },
      "ALL": { path: "M0,60 Q40,55 80,58 Q120,48 160,52 Q200,42 240,45 Q280,35 320,28", label: "1.2% → 4.8%", peak: 62 },
    },
  },
  {
    id: "leads",
    label: "Leads Generated",
    value: "1,247",
    icon: <Users className="w-4 h-4" />,
    color: "text-purple-500",
    chartColor: "#a855f7",
    data: {
      "7D": { path: "M0,55 Q20,50 40,52 Q60,45 80,48 Q100,40 120,42 Q140,35 160,30", label: "+47 leads this week", peak: 58 },
      "30D": { path: "M0,60 Q30,52 60,55 Q90,45 120,48 Q150,35 180,40 Q210,25 240,20", label: "+312 leads this month", peak: 62 },
      "ALL": { path: "M0,65 Q40,58 80,60 Q120,48 160,52 Q200,38 240,42 Q280,28 320,22", label: "1,247 total leads", peak: 68 },
    },
  },
  {
    id: "roi",
    label: "ROI Improvement",
    value: "8.5x",
    icon: <DollarSign className="w-4 h-4" />,
    color: "text-amber-500",
    chartColor: "#f59e0b",
    data: {
      "7D": { path: "M0,45 Q20,40 40,42 Q60,35 80,38 Q100,30 120,33 Q140,25 160,20", label: "8.5x ROI achieved", peak: 48 },
      "30D": { path: "M0,50 Q30,42 60,45 Q90,35 120,38 Q150,25 180,30 Q210,18 240,15", label: "8.5x ROI achieved", peak: 52 },
      "ALL": { path: "M0,55 Q40,48 80,52 Q120,40 160,45 Q200,30 240,35 Q280,20 320,15", label: "8.5x average ROI", peak: 58 },
    },
  },
];

function DigitalGlobe() {
  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
      {/* Orbital rings */}
      <div className="absolute inset-0 border-2 border-indigo-500/10 rounded-full" />
      <div className="absolute inset-[15%] border-2 border-cyan-500/10 rounded-full" />
      <div className="absolute inset-[30%] border-2 border-purple-500/10 rounded-full" />
      {/* Center dot */}
      <div className="absolute inset-[42%] rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/25 animate-pulse" />
      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <div
          key={deg}
          className="absolute w-2 h-2 rounded-full bg-indigo-400/30"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${deg}deg) translateX(45%)`,
            transformOrigin: "0 0",
          }}
        />
      ))}
    </div>
  );
}

export default function SaaSResults() {
  const [filter, setFilter] = useState<Filter>("7D");
  const [activeMetric, setActiveMetric] = useState(0);
  const [counters, setCounters] = useState({ value: 0, peak: 0 });

  const currentMetric = metrics[activeMetric];
  const currentData = currentMetric.data[filter];

  // Animated counter
  useEffect(() => {
    const target = currentData.peak;
    const duration = 1000;
    const start = Date.now();

    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounters({ value: Math.floor(eased * target * 10) / 10, peak: Math.floor(eased * target) });
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [activeMetric, filter, currentData.peak]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Metrics Sidebar */}
      <div className="lg:col-span-4 space-y-2.5">
        {metrics.map((metric, idx) => (
          <motion.button
            key={metric.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => setActiveMetric(idx)}
            className={`w-full text-left p-4 rounded-2xl transition-all duration-200 ${
              activeMetric === idx
                ? "glass-panel border-indigo-500/20 shadow-md"
                : "glass-panel opacity-60 hover:opacity-90"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center ${metric.color}`}>
                {metric.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold opacity-60">{metric.label}</p>
                <p className="text-sm font-extrabold mt-0.5">{metric.value}</p>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeMetric === idx ? 'bg-indigo-500' : 'bg-transparent'}`} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="lg:col-span-5 glass-panel rounded-2xl p-5">
        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider opacity-40">{currentMetric.label}</h3>
          <div className="flex gap-1 bg-black/5 dark:bg-white/5 rounded-xl p-0.5">
            {(["7D", "30D", "ALL"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-[10px] text-[10px] font-bold transition-all ${
                  filter === f
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-48">
          <svg
            viewBox="0 0 400 120"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {[0, 30, 60, 90, 120].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="400"
                y2={y}
                stroke="currentColor"
                className="opacity-5"
                strokeWidth="1"
              />
            ))}
            {/* Area fill */}
            <defs>
              <linearGradient id={`gradient-${currentMetric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={currentMetric.chartColor} stopOpacity="0.2" />
                <stop offset="100%" stopColor={currentMetric.chartColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${currentData.path} L400,120 L0,120 Z`}
              fill={`url(#gradient-${currentMetric.id})`}
            />
            {/* Line */}
            <path
              d={currentData.path}
              fill="none"
              stroke={currentMetric.chartColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Peak dot */}
            <circle
              cx="360"
              cy={120 - currentData.peak * 1.2}
              r="5"
              fill={currentMetric.chartColor}
              className="animate-pulse"
            />
          </svg>

          {/* Counter overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <motion.p
              key={`${activeMetric}-${filter}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl font-black tracking-tight"
              style={{ color: currentMetric.chartColor }}
            >
              {counters.peak}%
            </motion.p>
            <p className="text-[10px] font-bold opacity-40 mt-1">{currentData.label}</p>
          </div>
        </div>
      </div>

      {/* Globe & Signal Indexer */}
      <div className="lg:col-span-3 space-y-4">
        {/* Globe */}
        <div className="glass-panel rounded-2xl p-4 text-center">
          <DigitalGlobe />
          <p className="text-[10px] font-bold opacity-40 mt-2 uppercase tracking-wider">
            Digital Presence Index
          </p>
        </div>

        {/* Signal Indexer */}
        <div className="glass-panel rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-40">
              SEO Signal Indexer
            </span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Domain Authority", value: 92, color: "bg-emerald-500" },
              { label: "Page Speed Score", value: 98, color: "bg-cyan-500" },
              { label: "Backlink Quality", value: 85, color: "bg-indigo-500" },
            ].map((signal) => (
              <div key={signal.label}>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="opacity-60">{signal.label}</span>
                  <span className="opacity-80">{signal.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${signal.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${signal.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
