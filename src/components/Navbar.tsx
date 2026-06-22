"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor, Phone, MessageCircle } from "lucide-react";
import { Instagram } from "./InstagramIcon";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#results", label: "Results" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

type Theme = "light" | "dark" | "system";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [themeOpen, setThemeOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme initialization
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", mq.matches);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close theme dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setThemeOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Close mobile menu on link click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const themeOptions: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: "light", icon: <Sun className="w-3.5 h-3.5" />, label: "Light" },
    { value: "dark", icon: <Moon className="w-3.5 h-3.5" />, label: "Dark" },
    { value: "system", icon: <Monitor className="w-3.5 h-3.5" />, label: "System" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-panel-strong shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-2 group"
            >
              <span className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                SEOWebAgency
              </span>
              <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                AI
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-xs font-bold rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: Theme + CTAs */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Switcher */}
              <div className="relative" ref={themeRef}>
                <button
                  onClick={() => setThemeOpen(!themeOpen)}
                  aria-label="Toggle theme"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-black/10 dark:hover:border-white/10"
                >
                  {theme === "dark" ? (
                    <Moon className="w-4 h-4" />
                  ) : theme === "light" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Monitor className="w-4 h-4" />
                  )}
                </button>

                <AnimatePresence>
                  {themeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-36 glass-panel-strong rounded-2xl p-1.5 shadow-xl z-50"
                    >
                      {themeOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setTheme(opt.value);
                            setThemeOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                            theme === opt.value
                              ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                        >
                          {opt.icon}
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop CTAs */}
              <div className="hidden md:flex items-center gap-2">
                <a
                  href="tel:+918803511070"
                  aria-label="Call us"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-emerald-500 transition-all duration-200 border border-transparent hover:border-emerald-500/20"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/918860384919?text=${encodeURIComponent("Hello SEOWebAgency, I would like to know more about your services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all duration-200 border border-transparent hover:border-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <a
                  href="https://instagram.com/seoweb_agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-pink-500/10 hover:text-pink-500 transition-all duration-200 border border-transparent hover:border-pink-500/20"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Free Call
                </a>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] max-w-[80vw] glass-panel-strong border-l border-white/10 dark:border-white/5 p-6 pt-20 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.2 }}
                    className="block px-4 py-3 rounded-2xl text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTAs */}
              <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-40 px-4">
                  Get in Touch
                </p>
                <a
                  href="tel:+918803511070"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                  +91 8803511070
                </a>
                <a
                  href={`https://wa.me/918860384919?text=${encodeURIComponent("Hello SEOWebAgency, I would like to know more about your services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  WhatsApp Chat
                </a>
                <a
                  href="https://instagram.com/seoweb_agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-pink-500/10 hover:text-pink-500 transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  Instagram
                </a>
              </div>

              {/* Mobile CTA Button */}
              <div className="mt-6 px-4">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="block w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold text-center shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all active:scale-[0.98]"
                >
                  Book Free Consultation
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
