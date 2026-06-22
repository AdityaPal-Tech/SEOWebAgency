"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "SEOWebAgency completely transformed our digital presence. Our organic traffic increased by 400% in just 4 months, and we're now ranking on the first page for our core keywords.",
    author: "Rajesh Kumar",
    role: "Managing Director",
    company: "Scholars Group of Institutions",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    quote: "The website they built for us is incredibly fast and looks stunning. Our conversion rate improved by 60% within the first month. The team's attention to detail is exceptional.",
    author: "Priya Sharma",
    role: "CEO",
    company: "Gaav Ki Chai",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    quote: "Their local SEO strategies helped us dominate the Meerut market. We went from page 5 to the top 3 local pack in just 8 weeks. Highly recommended for any local business.",
    author: "Amit Verma",
    role: "Owner",
    company: "Pawan Medical & Trading Co.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    quote: "The AI automation tools they implemented saved us 20+ hours per week in lead management. The WhatsApp integration alone has doubled our response rate to inquiries.",
    author: "Neha Gupta",
    role: "Marketing Director",
    company: "Voice of News 24",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    quote: "Working with SEOWebAgency has been a game-changer. Their data-driven approach and transparent reporting set them apart. Our ROI has been consistently above 8x since we started.",
    author: "Vikram Singh",
    role: "Founder",
    company: "TechGrowth Ventures",
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    startAutoPlay();
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoPlay();
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    startAutoPlay();
  };

  const testimonial = testimonials[current];
  const initials = testimonial.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Quote icon */}
        <Quote className="absolute top-4 right-4 w-12 h-12 opacity-5" />

        {/* Slider */}
        <div className="relative min-h-[280px] sm:min-h-[240px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm sm:text-base font-semibold leading-7 sm:leading-8 opacity-80 mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-sm font-black shrink-0`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-extrabold">{testimonial.author}</p>
                  <p className="text-[11px] font-semibold opacity-50">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/5 dark:border-white/5">
          <button
            onClick={goPrev}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Bullets */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "bg-indigo-500 w-6"
                    : "bg-black/20 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/30"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
