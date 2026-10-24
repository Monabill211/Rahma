"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const COLORS = {
  purple: "#6a3a9f",
  teal: "#26606e",
  lime: "#c4ec69",
  cream: "#f3ebe3",
  pink: "#f74b92",
  darkPurple: "#19102c",
};

const SERVICES = [
  "Brand Identity",
  "Visual Collage",
  "3D & Motion",
  "Social Media Art",
  "UI / Web Design",
  "Other Magic ✨",
];

const BUDGETS = ["< $500", "$500 – $1.5k", "$1.5k – $3k", "$3k+"];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Visual Collage",
  ]);
  const [budget, setBudget] = useState("$500 – $1.5k");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const myEmail = "hello@rahmapsd.com";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

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

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: COLORS.purple }}
      className="relative min-h-svh w-full overflow-hidden py-24 px-4 font-sans select-none sm:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${COLORS.teal} 0%, ${COLORS.purple} 65%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, ${COLORS.cream} 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.cream} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <svg
        viewBox="0 0 800 600"
        className="pointer-events-none absolute -top-24 -left-24 h-[500px] w-[500px] opacity-40"
      >
        <path
          d="M220,60 C340,10 510,30 600,120 C690,210 710,370 620,470 C530,570 330,590 200,510 C70,430 100,110 220,60 Z"
          fill={COLORS.teal}
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-center text-center">
          <motion.div
            initial={{ y: -20, opacity: 0, rotate: -4 }}
            whileInView={{ y: 0, opacity: 1, rotate: -2 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: COLORS.lime,
              color: COLORS.purple,
              borderColor: COLORS.cream,
              boxShadow: `4px 5px 0px ${COLORS.pink}`,
            }}
            className="mb-4 inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-1.5 text-xs font-black tracking-widest uppercase sm:text-sm"
          >
            <span>04 // Contact Studio</span>
            <span>✦</span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            style={{
              color: COLORS.cream,
              textShadow: `5px 5px 0px ${COLORS.teal}`,
            }}
            className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl"
          >
            SAY{" "}
            <span
              style={{ color: COLORS.lime }}
              className="font-serif italic underline decoration-[#f74b92] decoration-wavy underline-offset-8"
            >
              HELLOO!
            </span>
          </motion.h1>

          <p
            style={{ color: COLORS.cream }}
            className="mt-4 max-w-lg text-sm font-medium opacity-90 sm:text-base"
          >
            Got a project in mind, a brand that needs a bold collage identity,
            or just want to say hi? Drop me a sticker below!
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            <div
              style={{
                backgroundColor: COLORS.cream,
                borderColor: COLORS.purple,
                boxShadow: `8px 10px 0px ${COLORS.teal}`,
              }}
              className="relative overflow-hidden rounded-3xl border-[3px] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div
                  style={{
                    backgroundColor: COLORS.purple,
                    borderColor: COLORS.purple,
                    boxShadow: `4px 4px 0px ${COLORS.lime}`,
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-2"
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
                  <span
                    style={{ color: COLORS.cream }}
                    className="font-serif text-xl font-black italic"
                  >
                    Rahma<span style={{ color: COLORS.lime }}>.psd</span>
                  </span>
                </div>

                <span
                  style={{
                    backgroundColor: COLORS.lime,
                    color: COLORS.purple,
                    borderColor: COLORS.purple,
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-black"
                >
                  <span
                    style={{ backgroundColor: COLORS.pink }}
                    className="h-2 w-2 animate-ping rounded-full"
                  />
                  Open for Work
                </span>
              </div>

              <h3
                style={{ color: COLORS.purple }}
                className="mt-6 text-2xl font-black leading-snug sm:text-3xl"
              >
                Let&apos;s turn your ideas into bold visual art.
              </h3>

              <p
                style={{ color: COLORS.teal }}
                className="mt-2 text-sm font-bold leading-relaxed"
              >
                I usually respond within 24 hours. Direct email or Instagram DM
                is the fastest way to reach me!
              </p>

              <div className="mt-6">
                <span
                  style={{ color: COLORS.purple }}
                  className="mb-1.5 block font-mono text-xs font-black uppercase opacity-75"
                >
                  // Direct Email (Click to Copy)
                </span>
                <motion.button
                  type="button"
                  onClick={handleCopyEmail}
                  whileHover={{ y: -2, x: -1 }}
                  whileTap={{ y: 1, x: 1 }}
                  style={{
                    backgroundColor: COLORS.purple,
                    color: COLORS.cream,
                    borderColor: COLORS.purple,
                    boxShadow: `5px 5px 0px ${COLORS.pink}`,
                  }}
                  className="flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left font-mono text-sm font-bold sm:text-base"
                >
                  <span className="truncate">{myEmail}</span>
                  <span
                    style={{
                      backgroundColor: copied ? COLORS.lime : COLORS.teal,
                      color: copied ? COLORS.purple : COLORS.cream,
                    }}
                    className="ml-2 shrink-0 rounded-lg px-2.5 py-1 text-xs font-black uppercase"
                  >
                    {copied ? "Copied! ✨" : "Copy"}
                  </span>
                </motion.button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div
                  style={{
                    backgroundColor: COLORS.teal,
                    color: COLORS.cream,
                    borderColor: COLORS.purple,
                  }}
                  className="rounded-2xl border-2 p-3.5"
                >
                  <span
                    style={{ color: COLORS.lime }}
                    className="block font-mono text-[11px] font-bold uppercase"
                  >
                    Location
                  </span>
                  <span className="mt-0.5 block text-sm font-black">
                    Egypt • Worldwide
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: COLORS.teal,
                    color: COLORS.cream,
                    borderColor: COLORS.purple,
                  }}
                  className="rounded-2xl border-2 p-3.5"
                >
                  <span
                    style={{ color: COLORS.lime }}
                    className="block font-mono text-[11px] font-bold uppercase"
                  >
                    Working Hours
                  </span>
                  <span className="mt-0.5 block text-sm font-black">
                    Sun – Thu (GMT+2)
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: COLORS.teal,
                borderColor: COLORS.cream,
                boxShadow: `7px 8px 0px ${COLORS.lime}`,
              }}
              className="flex items-center justify-between rounded-3xl border-[3px] p-5"
            >
              <div>
                <span
                  style={{ color: COLORS.lime }}
                  className="block font-mono text-xs font-black uppercase"
                >
                  Prefer Instagram DM?
                </span>
                <span
                  style={{ color: COLORS.cream }}
                  className="text-lg font-black"
                >
                  @RAHMA.PSD
                </span>
              </div>

              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.06, rotate: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: COLORS.pink,
                  color: COLORS.cream,
                  borderColor: COLORS.cream,
                  boxShadow: `4px 4px 0px ${COLORS.purple}`,
                }}
                className="flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider"
              >
                <span>DM Me</span>
                <span>↗</span>
              </motion.a>
            </div>
          </motion.div>

          <div
            style={{ perspective: "1200px" }}
            className="lg:col-span-7"
          >
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
              className="relative rounded-3xl border-[3px] p-6 sm:p-10"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [10, 4, 10] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                style={{ transform: "translateZ(60px)" }}
                className="pointer-events-none absolute -top-8 -right-4 hidden sm:block"
              >
                <svg viewBox="0 0 140 100" className="h-20 w-28 drop-shadow-lg">
                  <circle cx="70" cy="50" r="25" fill={COLORS.purple} />
                  <circle cx="60" cy="40" r="4" fill={COLORS.lime} />
                  <ellipse
                    cx="70"
                    cy="50"
                    rx="54"
                    ry="14"
                    fill="none"
                    stroke={COLORS.cream}
                    strokeWidth="6"
                    transform="rotate(-18 70 50)"
                  />
                  <ellipse
                    cx="70"
                    cy="50"
                    rx="54"
                    ry="14"
                    fill="none"
                    stroke={COLORS.lime}
                    strokeWidth="2.5"
                    strokeDasharray="10 7"
                    transform="rotate(-18 70 50)"
                  />
                </svg>
              </motion.div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    style={{ transform: "translateZ(40px)" }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <div
                      style={{
                        backgroundColor: COLORS.lime,
                        color: COLORS.purple,
                        borderColor: COLORS.cream,
                        boxShadow: `6px 6px 0px ${COLORS.purple}`,
                      }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border-[3px] text-4xl font-black"
                    >
                      ✓
                    </div>

                    <h3
                      style={{ color: COLORS.cream }}
                      className="text-3xl font-black sm:text-4xl"
                    >
                      MESSAGE SENT! ✨
                    </h3>

                    <p
                      style={{ color: COLORS.cream }}
                      className="mt-3 max-w-md text-sm font-medium opacity-90 sm:text-base"
                    >
                      Thank you,{" "}
                      <span style={{ color: COLORS.lime }} className="font-bold">
                        {name}
                      </span>
                      ! Your project sticker just landed on my desk. I&apos;ll get
                      back to you at{" "}
                      <span className="underline">{email}</span> very soon.
                    </p>

                    <motion.button
                      type="button"
                      onClick={resetForm}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        backgroundColor: COLORS.pink,
                        color: COLORS.cream,
                        borderColor: COLORS.cream,
                        boxShadow: `5px 5px 0px ${COLORS.lime}`,
                      }}
                      className="mt-8 rounded-2xl border-2 px-6 py-3 text-sm font-black uppercase tracking-wider"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ transform: "translateZ(35px)" }}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          style={{ color: COLORS.lime }}
                          className="mb-2 block font-mono text-xs font-black tracking-wider uppercase"
                        >
                          01. Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Sarah Ahmed"
                          style={{
                            backgroundColor: COLORS.cream,
                            color: COLORS.purple,
                            borderColor: COLORS.purple,
                            boxShadow: `4px 4px 0px ${COLORS.purple}`,
                          }}
                          className="w-full rounded-2xl border-[2.5px] px-4 py-3 text-sm font-bold placeholder:text-[#6a3a9f]/50 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          style={{ color: COLORS.lime }}
                          className="mb-2 block font-mono text-xs font-black tracking-wider uppercase"
                        >
                          02. Your Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="sarah@studio.com"
                          style={{
                            backgroundColor: COLORS.cream,
                            color: COLORS.purple,
                            borderColor: COLORS.purple,
                            boxShadow: `4px 4px 0px ${COLORS.purple}`,
                          }}
                          className="w-full rounded-2xl border-[2.5px] px-4 py-3 text-sm font-bold placeholder:text-[#6a3a9f]/50 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        style={{ color: COLORS.lime }}
                        className="mb-2.5 block font-mono text-xs font-black tracking-wider uppercase"
                      >
                        03. What are we creating? (Pick any)
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {SERVICES.map((srv) => {
                          const active = selectedServices.includes(srv);
                          return (
                            <motion.button
                              key={srv}
                              type="button"
                              onClick={() => toggleService(srv)}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                backgroundColor: active
                                  ? COLORS.lime
                                  : COLORS.purple,
                                color: active ? COLORS.purple : COLORS.cream,
                                borderColor: COLORS.cream,
                                boxShadow: active
                                  ? `3px 4px 0px ${COLORS.pink}`
                                  : `3px 3px 0px ${COLORS.darkPurple}`,
                              }}
                              className="rounded-xl border-2 px-3.5 py-2 text-xs font-black tracking-wide transition-colors sm:text-sm"
                            >
                              {active ? `✦ ${srv}` : srv}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        style={{ color: COLORS.lime }}
                        className="mb-2.5 block font-mono text-xs font-black tracking-wider uppercase"
                      >
                        04. Project Budget (USD)
                      </label>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {BUDGETS.map((b) => {
                          const active = budget === b;
                          return (
                            <motion.button
                              key={b}
                              type="button"
                              onClick={() => setBudget(b)}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                backgroundColor: active
                                  ? COLORS.pink
                                  : COLORS.purple,
                                color: COLORS.cream,
                                borderColor: COLORS.cream,
                                boxShadow: active
                                  ? `3px 4px 0px ${COLORS.lime}`
                                  : `3px 3px 0px ${COLORS.darkPurple}`,
                              }}
                              className="rounded-xl border-2 py-2.5 text-center text-xs font-black sm:text-sm"
                            >
                              {b}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        style={{ color: COLORS.lime }}
                        className="mb-2 block font-mono text-xs font-black tracking-wider uppercase"
                      >
                        05. Tell me about your vision
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share your project goals, timeline, or links..."
                        style={{
                          backgroundColor: COLORS.cream,
                          color: COLORS.purple,
                          borderColor: COLORS.purple,
                          boxShadow: `4px 4px 0px ${COLORS.purple}`,
                        }}
                        className="w-full resize-none rounded-2xl border-[2.5px] p-4 text-sm font-bold placeholder:text-[#6a3a9f]/50 focus:outline-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ y: -3, x: -2 }}
                      whileTap={{ y: 2, x: 2 }}
                      style={{
                        backgroundColor: COLORS.pink,
                        color: COLORS.cream,
                        borderColor: COLORS.cream,
                        boxShadow: `6px 7px 0px ${COLORS.lime}`,
                      }}
                      className="mt-1 flex w-full items-center justify-center gap-3 rounded-2xl border-[2.5px] py-4 text-base font-black uppercase tracking-wider sm:text-lg"
                    >
                      <span>Send Project Sticker</span>
                      <span>✨</span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
