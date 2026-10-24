"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  purple: "#6a3a9f",
  teal: "#26606e",
  lime: "#c4ec69",
  cream: "#f3ebe3",
  pink: "#f74b92",
};

const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "work", label: "Projects", href: "#work" },
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-8 sm:pt-6 select-none">
      <motion.nav
        initial={{ y: -90, opacity: 0, rotate: -2 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 110,
          damping: 14,
          delay: 0.2,
        }}
        style={{
          backgroundColor: scrolled
            ? "rgba(106, 58, 159, 0.94)"
            : COLORS.purple,
          borderColor: COLORS.cream,
          boxShadow: scrolled
            ? `4px 5px 0px ${COLORS.teal}`
            : `6px 7px 0px ${COLORS.lime}`,
        }}
        className={`pointer-events-auto relative flex w-full max-w-5xl items-center justify-between rounded-2xl border-[2.5px] px-4 transition-all duration-300 backdrop-blur-md sm:px-6 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <motion.a
          href="#home"
          onClick={() => setActive("home")}
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-2"
        >
          <div
            style={{
              backgroundColor: COLORS.teal,
              borderColor: COLORS.cream,
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 transition-transform duration-300 group-hover:rotate-12"
          >
            <svg
              viewBox="0 0 100 65"
              className="h-5 w-5"
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
            className="font-serif text-xl font-black italic tracking-wide sm:text-2xl"
          >
            Rahma<span style={{ color: COLORS.lime }}>.psd</span>
          </span>
        </motion.a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            const isHovered = hovered === link.id;

            return (
              <li key={link.id} className="relative">
                <a
                  href={link.href}
                  onClick={() => setActive(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    color: isActive ? COLORS.purple : COLORS.cream,
                  }}
                  className="relative z-10 block px-4 py-1.5 text-sm font-extrabold tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </a>

                {isHovered && !isActive && (
                  <motion.span
                    layoutId="nav-hover"
                    style={{ backgroundColor: COLORS.teal }}
                    className="absolute inset-0 z-0 rounded-xl opacity-70"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    style={{
                      backgroundColor: COLORS.lime,
                      boxShadow: `2px 3px 0px ${COLORS.teal}`,
                    }}
                    className="absolute inset-0 z-0 rounded-xl border border-[#19102c]"
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div
            style={{
              backgroundColor: COLORS.teal,
              borderColor: COLORS.cream,
              color: COLORS.cream,
            }}
            className="hidden items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold lg:flex"
          >
            <span
              style={{ backgroundColor: COLORS.lime }}
              className="h-2 w-2 animate-ping rounded-full"
            />
            <span>Available</span>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ y: -2, x: -1 }}
            whileTap={{ y: 2, x: 2 }}
            style={{
              backgroundColor: COLORS.pink,
              color: COLORS.cream,
              borderColor: COLORS.cream,
              boxShadow: `4px 4px 0px ${COLORS.teal}`,
            }}
            className="hidden items-center gap-1.5 rounded-xl border-2 px-4 py-2 text-xs font-black tracking-wider uppercase sm:inline-flex sm:text-sm"
          >
            <span>Let&apos;s Talk</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </motion.a>

          <motion.button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            whileTap={{ scale: 0.92 }}
            style={{
              backgroundColor: mobileOpen ? COLORS.pink : COLORS.teal,
              borderColor: COLORS.cream,
              color: COLORS.cream,
              boxShadow: `3px 3px 0px ${COLORS.lime}`,
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 md:hidden"
            aria-label="Toggle Menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M9 17h11" />
                </>
              )}
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              style={{
                backgroundColor: COLORS.purple,
                borderColor: COLORS.cream,
                boxShadow: `7px 8px 0px ${COLORS.pink}`,
              }}
              className="absolute inset-x-0 top-[calc(100%+12px)] flex flex-col gap-2 rounded-2xl border-[2.5px] p-4 md:hidden"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setActive(link.id);
                      setMobileOpen(false);
                    }}
                    style={{
                      backgroundColor: isActive ? COLORS.lime : COLORS.teal,
                      color: isActive ? COLORS.purple : COLORS.cream,
                      borderColor: COLORS.cream,
                    }}
                    className="flex items-center justify-between rounded-xl border-2 px-4 py-2.5 text-base font-black"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs opacity-75">
                      0{i + 1}
                    </span>
                  </motion.a>
                );
              })}

              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  backgroundColor: COLORS.pink,
                  color: COLORS.cream,
                  borderColor: COLORS.cream,
                  boxShadow: `4px 4px 0px ${COLORS.lime}`,
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-center text-sm font-black uppercase tracking-wider"
              >
                <span>Let&apos;s Talk ✨</span>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
