"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918860384919";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello SEOWebAgency, I visited your website and would like to know more about your services."
);

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300 group"
    >
      {/* Ping indicator */}
      <span className="absolute -top-1 -right-1 w-3 h-3">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
        <span className="absolute inset-0 rounded-full bg-emerald-400" />
      </span>

      <MessageCircle className="w-5 h-5" />
      <span className="text-xs font-bold hidden sm:block max-w-0 group-hover:max-w-[120px] overflow-hidden transition-all duration-300 whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
