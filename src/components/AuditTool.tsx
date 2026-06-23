"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Award,
  Smartphone,
  Eye,
  Settings,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Info,
  AlertCircle,
  FileText,
  RefreshCw,
} from "lucide-react";

// ─── Types (matching audit engine) ──────────────────────────────────────────

interface AuditReport {
  url: string;
  domain: string;
  timestamp: string;
  overallScore: number;
  seo: ModuleResult;
  performance: ModuleResult;
  security: ModuleResult;
  accessibility: ModuleResult;
  mobile: ModuleResult;
  technical: ModuleResult;
  issues: AuditIssue[];
  competitiveInsights: string[];
  pageLoadTimeMs: number;
}

interface ModuleResult {
  score: number;
  label: string;
  icon: string;
  checks: AuditCheck[];
  summary: string;
}

interface AuditCheck {
  name: string;
  passed: boolean;
  value: string;
  recommendation: string;
  severity: "pass" | "critical" | "warning" | "info";
}

interface AuditIssue {
  id: string;
  module: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  recommendation: string;
}

// ─── Progress Steps ─────────────────────────────────────────────────────────

const SCAN_PHASES = [
  { label: "Fetching page HTML & headers", icon: "🌐" },
  { label: "Analyzing SEO meta tags & structure", icon: "🔍" },
  { label: "Checking security headers & SSL", icon: "🔒" },
  { label: "Evaluating accessibility & ARIA", icon: "♿" },
  { label: "Testing mobile responsiveness", icon: "📱" },
  { label: "Inspecting technical SEO (sitemap, robots)", icon: "⚙️" },
  { label: "Fetching PageSpeed Insights", icon: "⚡" },
  { label: "Generating competitive analysis", icon: "📊" },
];

// ─── Score Gauge Component ──────────────────────────────────────────────────

function ScoreGauge({ score, size = 120, label }: { score: number; size?: number; label?: string }) {
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 90 ? "#22c55e"
    : score >= 70 ? "#06b6d4"
    : score >= 50 ? "#f59e0b"
    : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-1" style={{ width: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-black/5 dark:text-white/5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-2xl font-black tracking-tight" style={{ color }}>
          {score}
        </span>
        {label && <span className="text-[9px] font-bold opacity-50 uppercase -mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

// ─── Module Score Card ──────────────────────────────────────────────────────

function ModuleCard({ module, index }: { module: ModuleResult; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    search: <Search className="w-4 h-4" />,
    activity: <Activity className="w-4 h-4" />,
    shield: <ShieldCheck className="w-4 h-4" />,
    accessibility: <Eye className="w-4 h-4" />,
    smartphone: <Smartphone className="w-4 h-4" />,
    settings: <Settings className="w-4 h-4" />,
  };

  const colorMap: Record<string, string> = {
    search: "from-indigo-500 to-indigo-600",
    activity: "from-cyan-500 to-cyan-600",
    shield: "from-emerald-500 to-emerald-600",
    accessibility: "from-violet-500 to-violet-600",
    smartphone: "from-amber-500 to-amber-600",
    settings: "from-rose-500 to-rose-600",
  };

  const darkColorMap: Record<string, string> = {
    search: "from-indigo-400 to-indigo-500",
    activity: "from-cyan-400 to-cyan-500",
    shield: "from-emerald-400 to-emerald-500",
    accessibility: "from-violet-400 to-violet-500",
    smartphone: "from-amber-400 to-amber-500",
    settings: "from-rose-400 to-rose-500",
  };

  const scoreColor =
    module.score >= 90 ? "text-emerald-500"
    : module.score >= 70 ? "text-cyan-500"
    : module.score >= 50 ? "text-amber-500"
    : "text-rose-500";

  const barColor =
    module.score >= 90 ? "bg-emerald-500"
    : module.score >= 70 ? "bg-cyan-500"
    : module.score >= 50 ? "bg-amber-500"
    : "bg-rose-500";

  const icon = iconMap[module.icon] || <Search className="w-4 h-4" />;
  const gradient = colorMap[module.icon] || "from-indigo-500 to-indigo-600";
  const darkGradient = darkColorMap[module.icon] || "from-indigo-400 to-indigo-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-panel border border-black/5 dark:border-white/5 bg-white/30 dark:bg-zinc-950/20 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} dark:${darkGradient} flex items-center justify-center text-white shadow-sm`}>
              {icon}
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider opacity-70">{module.label}</span>
          </div>
          <span className={`text-lg font-black ${scoreColor}`}>{module.score}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${module.score}%` }}
            transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: "easeOut" }}
            className={`h-full rounded-full ${barColor}`}
          />
        </div>

        <p className="text-[10px] font-semibold opacity-50 mt-2 leading-4">{module.summary}</p>

        {/* Expand button */}
        {module.checks.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-1 text-[10px] font-bold opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
          >
            {expanded ? "Hide details" : `${module.checks.length} checks`}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Expanded checks */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-black/5 dark:border-white/5"
          >
            <div className="p-3 space-y-1.5 max-h-60 overflow-y-auto">
              {module.checks.map((check, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
                  {check.severity === "pass" ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  ) : check.severity === "critical" ? (
                    <XCircle className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                  ) : check.severity === "warning" ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                  ) : (
                    <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold">{check.name}</span>
                      <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${
                        check.passed
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}>
                        {check.passed ? "PASS" : "FAIL"}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono opacity-60 mt-0.5 truncate">{check.value}</p>
                    {!check.passed && (
                      <p className="text-[9px] font-semibold opacity-70 mt-1 leading-4">{check.recommendation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Issue Card ─────────────────────────────────────────────────────────────

function IssueCard({ issue, index }: { issue: AuditIssue; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const severityColors: Record<string, string> = {
    critical: "border-l-rose-500 bg-rose-500/5",
    high: "border-l-amber-500 bg-amber-500/5",
    medium: "border-l-blue-500 bg-blue-500/5",
    low: "border-l-zinc-500 bg-zinc-500/5",
  };

  const badgeColors: Record<string, string> = {
    critical: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    high: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    low: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
  };

  const moduleBadgeColors: Record<string, string> = {
    SEO: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    Performance: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    Security: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Accessibility: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    Mobile: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Technical: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`border-l-2 ${severityColors[issue.severity]} rounded-r-xl p-3.5 cursor-pointer hover:brightness-105 transition-all`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badgeColors[issue.severity]}`}>
              {issue.severity.toUpperCase()}
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${moduleBadgeColors[issue.module] || ""}`}>
              {issue.module}
            </span>
            <span className="text-[9px] font-mono opacity-30">{issue.id}</span>
          </div>
          <h4 className="text-xs font-extrabold">{issue.title}</h4>
          <p className="text-[10px] font-medium opacity-60 mt-0.5">{issue.description}</p>
        </div>
        <div className="shrink-0 mt-0.5">
          {expanded ? <ChevronUp className="w-3.5 h-3.5 opacity-40" /> : <ChevronDown className="w-3.5 h-3.5 opacity-40" />}
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 pt-2 border-t border-black/5 dark:border-white/5"
          >
            <p className="text-[10px] font-semibold leading-5 opacity-80">{issue.recommendation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function AuditTool() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AuditReport | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "insights">("overview");
  const logContainerRef = useRef<HTMLDivElement>(null);

  const startAudit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsScanning(true);
    setError("");
    setReport(null);
    setCurrentPhase(0);

    // Animate through scan phases
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev < SCAN_PHASES.length - 1) return prev + 1;
        clearInterval(phaseInterval);
        return prev;
      });
    }, 800);

    const targetUrl = url.startsWith("http") ? url : `https://${url}`;

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      clearInterval(phaseInterval);
      setCurrentPhase(SCAN_PHASES.length - 1);

      const result = await response.json();

      if (result.success && result.report) {
        setReport(result.report);
        setIsScanning(false);
      } else {
        setError(result.error || "Audit failed. Please try again.");
        setIsScanning(false);
      }
    } catch (err: any) {
      clearInterval(phaseInterval);
      setError(`Network error: ${err.message || "Could not reach the audit server."}`);
      setIsScanning(false);
    }
  }, [url]);

  const resetAudit = () => {
    setReport(null);
    setError("");
    setCurrentPhase(0);
    setActiveTab("overview");
  };

  const scoreColor = report
    ? report.overallScore >= 90
      ? "text-emerald-500"
      : report.overallScore >= 70
      ? "text-cyan-500"
      : report.overallScore >= 50
      ? "text-amber-500"
      : "text-rose-500"
    : "";

  const gradeLabel = report
    ? report.overallScore >= 90 ? "Excellent"
      : report.overallScore >= 80 ? "Great"
      : report.overallScore >= 70 ? "Good"
      : report.overallScore >= 60 ? "Fair"
      : report.overallScore >= 50 ? "Poor"
      : "Critical"
    : "";

  return (
    <div className="w-full glass-panel rounded-3xl p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 text-transparent bg-clip-text px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-500/10">
            Professional SEO Audit Engine
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight">
            Website Audit &amp; Analysis
          </h3>
          <p className="text-xs opacity-60 mt-2 max-w-lg mx-auto font-medium">
            Real-time analysis of SEO, performance, security, accessibility, mobile, and technical health — powered by real data.
          </p>
        </div>

        {/* URL Input */}
        <form onSubmit={startAudit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input
              type="text"
              placeholder="Enter your website URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isScanning}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-black/15 dark:border-white/10 bg-white/20 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-semibold backdrop-blur-md transition-all disabled:opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isScanning}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-sm hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isScanning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Analyze Now
              </>
            )}
          </button>
        </form>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold leading-5 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold mb-1">Audit Error</p>
              <p className="opacity-80 font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Scanning Progress */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-black/80 dark:bg-zinc-950 border border-white/5 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                  <span className="text-[10px] font-mono text-zinc-500">AUDIT ENGINE // v2.0.0</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-amber-500 animate-pulse font-bold">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    REAL-TIME ANALYSIS
                  </span>
                </div>
                <div ref={logContainerRef} className="space-y-2">
                  {SCAN_PHASES.map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: i <= currentPhase ? 1 : 0.3,
                        x: 0,
                      }}
                      className={`flex items-center gap-2.5 text-[11px] font-mono leading-5 ${
                        i < currentPhase
                          ? "text-emerald-400"
                          : i === currentPhase
                          ? "text-cyan-400"
                          : "text-zinc-600"
                      }`}
                    >
                      <span className="w-4 text-center shrink-0">
                        {i < currentPhase ? "✓" : i === currentPhase ? "→" : "○"}
                      </span>
                      <span>{phase.icon}</span>
                      <span>{phase.label}</span>
                      {i === currentPhase && (
                        <span className="dot-typing ml-1" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Dashboard */}
        <AnimatePresence>
          {report && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-6"
            >
              {/* Overall Score Header */}
              <div className="glass-panel bg-white/40 dark:bg-zinc-950/30 border border-black/5 dark:border-white/5 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Large Score Gauge */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <ScoreGauge score={report.overallScore} size={140} />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <span className={`text-4xl font-black tracking-tight ${scoreColor}`}>
                        {gradeLabel}
                      </span>
                      <span className="text-sm font-bold opacity-40">/ {report.overallScore}/100</span>
                    </div>
                    <p className="text-xs opacity-60 mt-1 max-w-xl leading-5">
                      Based on {report.issues.filter((i) => i.severity === "critical" || i.severity === "high").length} critical issues, {report.issues.length} total issues found across 6 audit modules.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                      <span className="text-[10px] font-mono opacity-40">URL: {report.url}</span>
                      <span className="text-[10px] font-mono opacity-40">Load: {report.pageLoadTimeMs}ms</span>
                      <span className="text-[10px] font-mono opacity-40">Domain: {report.domain}</span>
                    </div>
                  </div>

                  <button
                    onClick={resetAudit}
                    className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 text-[11px] font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    New Audit
                  </button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-1 border-b border-black/5 dark:border-white/5 pb-2">
                {[
                  { key: "overview" as const, label: "Score Overview", icon: Award },
                  { key: "issues" as const, label: `Issues (${report.issues.length})`, icon: AlertTriangle },
                  { key: "insights" as const, label: "Insights", icon: TrendingUp },
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 py-2 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === tab.key
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <TabIcon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <ModuleCard module={report.seo} index={0} />
                  <ModuleCard module={report.performance} index={1} />
                  <ModuleCard module={report.security} index={2} />
                  <ModuleCard module={report.accessibility} index={3} />
                  <ModuleCard module={report.mobile} index={4} />
                  <ModuleCard module={report.technical} index={5} />
                </div>
              )}

              {/* Issues Tab */}
              {activeTab === "issues" && (
                <div className="space-y-2">
                  {report.issues.length > 0 ? (
                    report.issues.map((issue, i) => (
                      <IssueCard key={issue.id} issue={issue} index={i} />
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                      <p className="font-extrabold">No issues found!</p>
                      <p className="text-xs opacity-60 mt-1">This website is in excellent health.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Insights Tab */}
              {activeTab === "insights" && (
                <div className="glass-panel bg-white/30 dark:bg-zinc-950/20 border border-black/5 dark:border-white/5 rounded-2xl p-5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider opacity-60 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Competitive Analysis &amp; Growth Insights
                  </h4>
                  <div className="space-y-3">
                    {report.competitiveInsights.map((insight, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5"
                      >
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center text-indigo-500 shrink-0 text-[10px] font-black">
                          {i + 1}
                        </div>
                        <p className="text-xs font-medium leading-6 opacity-80">{insight}</p>
                      </div>
                    ))}
                  </div>

                  {/* Module Scores Summary */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {[
                      { label: "SEO", score: report.seo.score, color: "from-indigo-500 to-cyan-500" },
                      { label: "Perf", score: report.performance.score, color: "from-cyan-500 to-emerald-500" },
                      { label: "Sec", score: report.security.score, color: "from-emerald-500 to-teal-500" },
                      { label: "A11y", score: report.accessibility.score, color: "from-violet-500 to-purple-500" },
                      { label: "Mob", score: report.mobile.score, color: "from-amber-500 to-orange-500" },
                      { label: "Tech", score: report.technical.score, color: "from-rose-500 to-pink-500" },
                    ].map((mod) => (
                      <div key={mod.label} className="text-center p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                        <span className={`text-lg font-black bg-gradient-to-br ${mod.color} bg-clip-text text-transparent`}>
                          {mod.score}
                        </span>
                        <p className="text-[9px] font-bold uppercase opacity-50 mt-0.5">{mod.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-cyan-500/5 to-transparent border border-indigo-500/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <h5 className="font-extrabold text-sm">Need help fixing these issues?</h5>
                      <p className="text-[11px] opacity-70 mt-0.5">Book a free SEO strategy review with our engineers.</p>
                    </div>
                    <a
                      href="#contact"
                      className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-indigo-600 transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/25 shrink-0"
                    >
                      Schedule Optimization Call
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
