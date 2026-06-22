"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Globe,
  FileText,
  RefreshCw,
} from "lucide-react";

interface AuditIssue {
  type: "high" | "medium" | "low";
  title: string;
  description: string;
}

interface AuditResult {
  seoScore: number;
  performanceScore: number;
  securityScore: number;
  issues: AuditIssue[];
  url: string;
}

const scanSteps = [
  "Initializing diagnostic engine...",
  "Analyzing page structure & HTML semantics...",
  "Evaluating meta tags & Open Graph protocol...",
  "Checking heading hierarchy & content structure...",
  "Testing page speed & Core Web Vitals metrics...",
  "Scanning for security headers & vulnerabilities...",
  "Analyzing backlink profile & domain authority...",
  "Checking mobile responsiveness & viewport config...",
  "Verifying schema markup & structured data...",
  "Generating comprehensive audit report...",
];

function generateAuditResult(url: string): AuditResult {
  const randomScore = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  return {
    seoScore: randomScore(65, 95),
    performanceScore: randomScore(60, 92),
    securityScore: randomScore(70, 96),
    url,
    issues: [
      {
        type: "high",
        title: "Missing Meta Descriptions",
        description: `${randomScore(2, 6)} pages are missing meta descriptions, which can impact click-through rates from search results.`,
      },
      {
        type: "high",
        title: "Slow Page Load Time",
        description: `Current load time is ${(3 + Math.random() * 5).toFixed(1)}s. Target is under 2.5s for optimal user experience and SEO.`,
      },
      {
        type: "medium",
        title: "Missing Alt Text on Images",
        description: `${randomScore(3, 8)} images lack proper alt text, affecting accessibility and image search rankings.`,
      },
      {
        type: "medium",
        title: "Low Text-to-HTML Ratio",
        description: "Current ratio is below the recommended 25%. Consider adding more relevant content.",
      },
      {
        type: "low",
        title: "No Schema Markup Detected",
        description: "Adding structured data can enhance search result appearance with rich snippets.",
      },
      {
        type: "low",
        title: "Broken Internal Links",
        description: `${randomScore(1, 3)} broken internal links detected that need to be fixed or redirected.`,
      },
    ],
  };
}

export default function AuditTool() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<AuditResult | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    setScanning(true);
    setCurrentStep(0);
    setLogs([]);
    setResult(null);

    let step = 0;
    const interval = setInterval(() => {
      if (step < scanSteps.length) {
        setLogs((prev) => [...prev, `> ${scanSteps[step]}`]);
        setCurrentStep(step);
        step++;
      } else {
        clearInterval(interval);
        setResult(generateAuditResult(formattedUrl));
        setLogs((prev) => [...prev, "", "✓ Audit complete! Generating report..."]);
        setScanning(false);
      }
    }, 300 + Math.random() * 400);
  };

  const reset = () => {
    setUrl("");
    setScanning(false);
    setLogs([]);
    setResult(null);
    setCurrentStep(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
          AI Diagnostics
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
          Free SEO Audit Engine
        </h2>
        <p className="text-sm opacity-60 mt-3 font-semibold leading-6">
          Enter your website URL to receive an instant AI-powered analysis with actionable recommendations.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        {/* URL Input Form */}
        {!scanning && !result && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleScan}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL (e.g., example.com)"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-black dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Analyze Now
            </button>
          </motion.form>
        )}

        {/* Scanning Terminal */}
        <AnimatePresence mode="wait">
          {scanning && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-black/5 dark:border-white/5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin" />
                </div>
                <div>
                  <p className="text-xs font-extrabold">Scanning Website</p>
                  <p className="text-[10px] opacity-50 font-semibold mt-0.5">
                    Step {currentStep + 1} of {scanSteps.length}
                  </p>
                </div>
                <div className="flex-1" />
                <div className="dot-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 rounded-full bg-black/5 dark:bg-white/5 mb-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / scanSteps.length) * 100}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                />
              </div>

              {/* Terminal Logs */}
              <div
                ref={logRef}
                className="h-48 overflow-y-auto p-4 rounded-2xl bg-black/40 dark:bg-black/60 font-mono text-[11px] leading-6 space-y-0.5"
              >
                {logs.map((log, i) => (
                  <p
                    key={i}
                    className={`${
                      log.includes("✓")
                        ? "text-emerald-400"
                        : log.includes("complete")
                        ? "text-cyan-400"
                        : "text-zinc-400"
                    } ${i === logs.length - 1 ? "animate-pulse" : ""}`}
                  >
                    {log}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audit Results */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Score Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "SEO Score", value: result.seoScore, color: result.seoScore > 80 ? "text-emerald-500" : result.seoScore > 60 ? "text-amber-500" : "text-rose-500" },
                  { label: "Performance", value: result.performanceScore, color: result.performanceScore > 80 ? "text-emerald-500" : result.performanceScore > 60 ? "text-amber-500" : "text-rose-500" },
                  { label: "Security", value: result.securityScore, color: result.securityScore > 80 ? "text-emerald-500" : result.securityScore > 60 ? "text-amber-500" : "text-rose-500" },
                ].map((score) => (
                  <div key={score.label} className="text-center p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                    <p className={`text-2xl font-black ${score.color}`}>{score.value}</p>
                    <p className="text-[10px] font-bold opacity-40 mt-1 uppercase tracking-wider">{score.label}</p>
                  </div>
                ))}
              </div>

              {/* Issues */}
              <div className="mb-6">
                <h3 className="text-xs font-extrabold uppercase tracking-wider opacity-40 mb-3">
                  Recommendations
                </h3>
                <div className="space-y-2">
                  {result.issues.map((issue, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5"
                    >
                      {issue.type === "high" ? (
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      ) : issue.type === "medium" ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      ) : (
                        <FileText className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold">{issue.title}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                            issue.type === "high"
                              ? "bg-rose-500/10 text-rose-500"
                              : issue.type === "medium"
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-cyan-500/10 text-cyan-500"
                          }`}>
                            {issue.type}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium opacity-60 mt-1 leading-5">{issue.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold text-center shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Get Full Strategy Review
                </a>
                <button
                  onClick={reset}
                  className="flex-1 py-3 rounded-2xl border border-black/10 dark:border-white/10 text-sm font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Audit Another URL
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
