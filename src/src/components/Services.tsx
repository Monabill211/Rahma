"use client";

import React from "react";
import { motion } from "framer-motion";

const COLORS = {
  purple: "#6a3a9f",
  teal: "#26606e",
  lime: "#c4ec69",
  cream: "#f3ebe3",
  pink: "#f74b92",
};

const SERVICES_DATA = [
  {
    id: "01",
    title: "Brand Identity & Logotypes",
    description:
      "Crafting unique visual systems, custom typography, and memorable brand books that make your business stand out.",
    accent: COLORS.lime,
    badge: "Identity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "3D Visual Art & Shaders",
    description:
      "Building immersive 3D scenes, custom WebGL shaders, and futuristic visual assets for web and digital products.",
    accent: COLORS.pink,
    badge: "3D & WebGL",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Visual Collage & Scrapbook",
    description:
      "Mixing retro aesthetics with modern digital grit. Perfect for album covers, podcast art, and bold social media campaigns.",
    accent: COLORS.cream,
    badge: "Art Direction",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
        <path d="m15 15-6 6m0-6 6 6m-9-9h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "UI/UX & Interactive Web",
    description:
      "Designing high-end digital experiences, sleek landing pages, and smooth Framer Motion interfaces in Next.js.",
    accent: COLORS.lime,
    badge: "Digital Design",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{ backgroundColor: COLORS.purple }}
      className="relative w-full overflow-hidden py-24 px-4 font-sans select-none sm:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, ${COLORS.cream} 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.cream} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ y: -20, opacity: 0, rotate: 3 }}
            whileInView={{ y: 0, opacity: 1, rotate: 2 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: COLORS.teal,
              color: COLORS.cream,
              borderColor: COLORS.cream,
              boxShadow: `4px 4px 0px ${COLORS.pink}`,
            }}
            className="mb-4 inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-1.5 text-xs font-black tracking-widest uppercase sm:text-sm"
          >
            <span>03 // What I Do</span>
            <span>✦</span>
          </motion.div>

          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            style={{
              color: COLORS.cream,
              textShadow: `5px 5px 0px ${COLORS.teal}`,
            }}
            className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl"
          >
            SERVICES &amp;{" "}
            <span
              style={{ color: COLORS.lime }}
              className="font-serif italic underline decoration-[#f74b92] decoration-wavy underline-offset-8"
            >
              EXPERTISE
            </span>
          </motion.h2>

          <p
            style={{ color: COLORS.cream }}
            className="mt-4 max-w-lg text-sm font-medium opacity-90 sm:text-base"
          >
            Blending creative vision with technical precision to bring extraordinary digital experiences to life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SERVICES_DATA.map((srv, index) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 100, damping: 14 }}
              whileHover={{ y: -6, x: -3 }}
              style={{
                backgroundColor: COLORS.teal,
                borderColor: COLORS.cream,
                boxShadow: `8px 8px 0px ${srv.accent}`,
              }}
              className="group relative flex flex-col justify-between rounded-3xl border-[3px] p-8 transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: srv.accent }}
                    className="font-mono text-lg font-black"
                  >
                    // {srv.id}
                  </span>

                  <span
                    style={{
                      backgroundColor: srv.accent,
                      color: COLORS.purple,
                      borderColor: COLORS.cream,
                    }}
                    className="rounded-full border-2 px-3.5 py-1 text-xs font-black uppercase tracking-wider"
                  >
                    {srv.badge}
                  </span>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <div
                    style={{
                      backgroundColor: COLORS.purple,
                      color: srv.accent,
                      borderColor: COLORS.cream,
                    }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 transition-transform group-hover:rotate-12"
                  >
                    {srv.icon}
                  </div>

                  <h3
                    style={{ color: COLORS.cream }}
                    className="text-2xl font-black tracking-tight sm:text-3xl"
                  >
                    {srv.title}
                  </h3>
                </div>

                <p
                  style={{ color: COLORS.cream }}
                  className="mt-4 text-sm font-medium leading-relaxed opacity-85 sm:text-base"
                >
                  {srv.description}
                </p>
              </div>

              <div
                style={{ backgroundColor: srv.accent }}
                className="mt-8 h-1.5 w-full rounded-full opacity-40 transition-opacity group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
