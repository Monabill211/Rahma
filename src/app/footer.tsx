"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// باليتة الألوان المعتمدة
const COLORS = {
  purple: "#6a3a9f",
  teal: "#26606e",
  lime: "#c4ec69",
  cream: "#f3ebe3",
  pink: "#f74b92",
  darkPurple: "#19102c",
};

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@rahma.psd",
    href: "https://instagram.com",
    accent: COLORS.pink,
  },
  {
    name: "Behance",
    handle: "be.net/rahmapsd",
    href: "https://behance.net",
    accent: COLORS.lime,
  },
  {
    name: "Dribbble",
    handle: "dribbble.com/rahma",
    href: "https://dribbble.com",
    accent: COLORS.teal,
  },
  {
    name: "LinkedIn",
    handle: "in/rahma-designer",
    href: "https://linkedin.com",
    accent: COLORS.cream,
  },
];

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Selected Works", href: "#work" },
  { label: "3D Playground", href: "#services" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);
  const email = "hello@rahmapsd.com";

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // حركة 3D Tilt لكارت الـ CTA الكبير مع الماوس
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-9deg", "9deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      style={{ backgroundColor: COLORS.purple }}
      className="relative w-full overflow-hidden pt-16 pb-10 font-sans select-none"
    >
      {/* 1. الخلفية الشبكية (Grid Background) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, ${COLORS.cream} 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.cream} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 2. شريط الـ Marquee المايل في الأعلى */}
      <div
        style={{
          backgroundColor: COLORS.lime,
          borderColor: COLORS.cream,
          boxShadow: `0 8px 0px ${COLORS.teal}`,
        }}
        className="relative z-10 -mx-4 mb-16 -rotate-1 border-y-[3px] py-3 sm:mb-20"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          style={{ color: COLORS.purple }}
          className="flex w-max items-center gap-8 text-sm font-black tracking-widest uppercase sm:text-base"
        >
          {Array.from({ length: 8 }).map((_, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span>AVAILABLE FOR FREELANCE PROJECTS</span>
              <span style={{ color: COLORS.pink }}>✦</span>
              <span>VISUAL ARTIST &amp; 3D DESIGNER</span>
              <span style={{ color: COLORS.teal }}>✦</span>
              <span>RAHMA.PSD STUDIO</span>
              <span style={{ color: COLORS.pink }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-8">
        {/* 3. كارت الـ 3D Collage الرئيسي (Let's Create Magic) */}
        <div style={{ perspective: "1200px" }} className="mb-16">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              backgroundColor: COLORS.teal,
              borderColor: COLORS.cream,
              boxShadow: `10px 12px 0px ${COLORS.pink}`,
            }}
            className="relative rounded-3xl border-[3px] p-8 sm:p-12 md:p-16"
          >
            {/* ستيكر كوكب زحل الطاير فوق يمين الكارت */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-12, -6, -12] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ transform: "translateZ(65px)" }}
              className="pointer-events-none absolute -top-9 right-6 hidden sm:block md:right-12"
            >
              <svg viewBox="0 0 140 100" className="h-24 w-32 drop-shadow-lg">
                <circle cx="70" cy="50" r="26" fill={COLORS.purple} />
                <circle cx="60" cy="40" r="4" fill={COLORS.lime} />
                <ellipse
                  cx="70"
                  cy="50"
                  rx="56"
                  ry="15"
                  fill="none"
                  stroke={COLORS.cream}
                  strokeWidth="6"
                  transform="rotate(-18 70 50)"
                />
                <ellipse
                  cx="70"
                  cy="50"
                  rx="56"
                  ry="15"
                  fill="none"
                  stroke={COLORS.lime}
                  strokeWidth="2.5"
                  strokeDasharray="10 7"
                  transform="rotate(-18 70 50)"
                />
              </svg>
            </motion.div>

            {/* ستيكر عين حورس الصغير تحت شمال الكارت */}
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [-8, -14, -8] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              style={{
                transform: "translateZ(55px)",
                backgroundColor: COLORS.cream,
                borderColor: COLORS.purple,
                boxShadow: `5px 5px 0px ${COLORS.lime}`,
              }}
              className="pointer-events-none absolute -bottom-6 left-6 hidden rounded-2xl border-2 px-3 py-2 sm:block"
            >
              <svg
                viewBox="0 0 120 80"
                className="h-9 w-14"
                fill="none"
                stroke={COLORS.purple}
                strokeWidth="5"
                strokeLinecap="round"
              >
                <path d="M12,20 Q60,4 108,18" />
                <path d="M20,38 Q60,18 100,36 Q60,56 20,38 Z" />
                <circle cx="60" cy="37" r="8" fill={COLORS.purple} />
                <path d="M52,47 L42,68 C36,74 24,72 24,64" />
              </svg>
            </motion.div>

            {/* محتوى كارت الـ CTA */}
            <div
              style={{ transform: "translateZ(40px)" }}
              className="flex flex-col items-center text-center"
            >
              <span
                style={{
                  backgroundColor: COLORS.lime,
                  color: COLORS.purple,
                  borderColor: COLORS.purple,
                }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border-2 px-4 py-1 text-xs font-black tracking-wider uppercase sm:text-sm"
              >
                <span>Got a crazy idea?</span>
                <span>✨</span>
              </span>

              <h2
                style={{
                  color: COLORS.cream,
                  textShadow: `4px 4px 0px ${COLORS.purple}`,
                }}
                className="max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl"
              >
                LET&apos;S BUILD SOMETHING{" "}
                <span
                  style={{ color: COLORS.lime }}
                  className="font-serif italic underline decoration-[#f74b92] decoration-wavy underline-offset-8"
                >
                  UNFORGETTABLE
                </span>
              </h2>

              <p
                style={{ color: COLORS.cream }}
                className="mt-4 max-w-xl text-sm font-medium opacity-90 sm:text-base"
              >
                Whether it&apos;s brand identity, 3D visual art, or interactive web
                experiences — let&apos;s turn your vision into art.
              </p>

              {/* أزرار التفاعل (نسخ الإيميل + إرسال رسالة) */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {/* زرار نسخ الإيميل */}
                <motion.button
                  type="button"
                  onClick={handleCopyEmail}
                  whileHover={{ y: -3, x: -2 }}
                  whileTap={{ y: 2, x: 2 }}
                  style={{
                    backgroundColor: COLORS.cream,
                    color: COLORS.purple,
                    borderColor: COLORS.purple,
                    boxShadow: `6px 6px 0px ${COLORS.purple}`,
                  }}
                  className="relative flex items-center gap-3 rounded-2xl border-[2.5px] px-6 py-3.5 text-sm font-black sm:text-base"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>{email}</span>

                  {/* رسالة تأكيد النسخ */}
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: -44, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.8 }}
                        style={{
                          backgroundColor: COLORS.lime,
                          color: COLORS.purple,
                          borderColor: COLORS.purple,
                        }}
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border-2 px-3 py-1 text-xs font-black shadow-lg"
                      >
                        Copied to Clipboard! ✨
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* زرار فتح الإيميل مباشرة */}
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ y: -3, x: -2 }}
                  whileTap={{ y: 2, x: 2 }}
                  style={{
                    backgroundColor: COLORS.pink,
                    color: COLORS.cream,
                    borderColor: COLORS.cream,
                    boxShadow: `6px 6px 0px ${COLORS.lime}`,
                  }}
                  className="flex items-center gap-2 rounded-2xl border-[2.5px] px-7 py-3.5 text-sm font-black uppercase tracking-wider sm:text-base"
                >
                  <span>Start a Project</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4. شبكة الروابط والسوشيال ميديا (4 أعمدة) */}
        <div className="grid grid-cols-1 gap-8 border-b-2 border-[#f3ebe3]/25 pb-12 md:grid-cols-12">
          {/* العمود الأول: اللوجو والنبذة */}
          <div className="flex flex-col items-start md:col-span-5">
            <a href="#home" className="group flex items-center gap-2.5">
              <div
                style={{
                  backgroundColor: COLORS.teal,
                  borderColor: COLORS.cream,
                  boxShadow: `3px 3px 0px ${COLORS.lime}`,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-transform group-hover:rotate-12"
              >
                <svg
                  viewBox="0 0 100 65"
                  className="h-6 w-6"
                  fill="none"
                  stroke={COLORS.lime}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12,52 L8,16 L34,34 L50,10 L66,34 L92,16 L88,52 Z" />
                </svg>
              </div>
              <span
                style={{ color: COLORS.cream }}
                className="font-serif text-3xl font-black italic tracking-wide"
              >
                Rahma<span style={{ color: COLORS.lime }}>.psd</span>
              </span>
            </a>

            <p
              style={{ color: COLORS.cream }}
              className="mt-4 max-w-sm text-sm leading-relaxed opacity-85"
            >
              Multidisciplinary Visual Artist &amp; Designer crafting bold
              collage aesthetics, interactive 3D worlds, and memorable brand
              experiences.
            </p>

            {/* كبسولة الموقع والتوقيت */}
            <div
              style={{
                backgroundColor: COLORS.teal,
                borderColor: COLORS.cream,
                color: COLORS.cream,
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 px-3.5 py-1.5 font-mono text-xs font-bold"
            >
              <span
                style={{ backgroundColor: COLORS.lime }}
                className="h-2.5 w-2.5 animate-ping rounded-full"
              />
              <span>BASED IN EGYPT • WORLDWIDE</span>
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div className="flex flex-col gap-2.5 md:col-span-3">
            <h3
              style={{ color: COLORS.lime }}
              className="mb-1 font-mono text-xs font-black tracking-widest uppercase"
            >
            
            </h3>
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ color: COLORS.cream }}
                className="group inline-flex items-center gap-2 text-base font-bold transition-transform hover:translate-x-1.5"
              >
                <span
                  style={{ color: COLORS.pink }}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  →
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* العمود الثالث: كروت السوشيال ميديا الـ 3D */}
          <div className="flex flex-col gap-3 md:col-span-4">
            <h3
              style={{ color: COLORS.lime }}
              className="mb-1 font-mono text-xs font-black tracking-widest uppercase"
            >
            </h3>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, x: -2 }}
                  whileTap={{ y: 1, x: 1 }}
                  style={{
                    backgroundColor: COLORS.teal,
                    borderColor: COLORS.cream,
                    boxShadow: `4px 4px 0px ${social.accent}`,
                  }}
                  className="flex flex-col justify-between rounded-xl border-2 p-3 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: COLORS.cream }}
                      className="text-xs font-black uppercase tracking-wider"
                    >
                      {social.name}
                    </span>
                    <span style={{ color: social.accent }} className="text-sm font-black">
                      ↗
                    </span>
                  </div>
                  <span
                    style={{ color: COLORS.cream }}
                    className="mt-1 truncate font-mono text-[11px] opacity-80"
                  >
                    {social.handle}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* 5. الشريط السفلي (حقوق الملكية + زرار الصعود لأعلى) */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p
            style={{ color: COLORS.cream }}
            className="font-mono text-xs opacity-80"
          >
            © {currentYear} RAHMA.PSD — ALL RIGHTS RESERVED.
          </p>

          {/* زرار الصعود لأعلى الصفحة */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            style={{
              backgroundColor: COLORS.lime,
              color: COLORS.purple,
              borderColor: COLORS.cream,
              boxShadow: `4px 4px 0px ${COLORS.pink}`,
            }}
            className="flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-xs font-black uppercase tracking-wider"
          >
            <span>Back to Top</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}