"use client";

import React, { useEffect, useState } from "react";
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
  darkBg: "#19102c",
};

export default function PortfolioHero() {
  // 0: شاشة البداية (Helloo والعيون بتبص)
  // 1: ظهور كل عناصر الكولاج الـ 3D واحد ورا التاني
  const [stage, setStage] = useState<0 | 1>(0);

  // حالات أنيميشن الكتابة (Typewriter)
  const [typedText, setTypedText] = useState("Jobless");
  const [showCursor, setShowCursor] = useState(false);
  const [showPointer, setShowPointer] = useState(false);
  const [showDesigner, setShowDesigner] = useState(false);

  // حركة الماوس للـ 3D Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  // دوران المشهد 3D مع حركة الماوس
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
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

  useEffect(() => {
    const moveUpTimer = setTimeout(() => setStage(1), 2400);
    const pointerTimer = setTimeout(() => setShowPointer(true), 4800);

    const typingTimer = setTimeout(() => {
      setShowPointer(false);
      setShowCursor(true);

      const original = "Jobless";
      const target = "Creative";
      let i = original.length;

      const deleteInterval = setInterval(() => {
        i--;
        setTypedText(original.slice(0, i));

        if (i === 0) {
          clearInterval(deleteInterval);
          let j = 0;

          const typeInterval = setInterval(() => {
            j++;
            setTypedText(target.slice(0, j));

            if (j === target.length) {
              clearInterval(typeInterval);
              setTimeout(() => {
                setShowCursor(false);
                setShowDesigner(true);
              }, 300);
            }
          }, 100);
        }
      }, 85);
    }, 5400);

    return () => {
      clearTimeout(moveUpTimer);
      clearTimeout(pointerTimer);
      clearTimeout(typingTimer);
    };
  }, []);

  const eyeAnim = {
    opacity: 1,
    scale: 1,
    x: [0, -10, 8, -4, 0],
    y: [4, 4, -8, -4, 0],
  };

  const eyeTrans = {
    opacity: { delay: 0.3, duration: 0.2 },
    scale: { delay: 0.3, duration: 0.2 },
    x: { delay: 0.5, duration: 1.7, ease: "easeInOut" as const },
    y: { delay: 0.5, duration: 1.7, ease: "easeInOut" as const },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px", backgroundColor: COLORS.purple }}
      className="relative h-svh w-full overflow-hidden font-sans select-none"
    >
      {/* خلفية الورق الكريمي والتيل بنسب الباليتة */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${COLORS.cream} 0%, ${COLORS.cream} 58%, ${COLORS.purple} 100%)`,
          opacity: stage === 1 ? 1 : 0.08,
        }}
      />

      {/* شبكة هندسية ناعمة */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, ${COLORS.teal} 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.teal} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* الحاوية ثلاثية الأبعاد لكل الطبقات */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex h-full w-full items-center justify-center"
      >
        {/* ============================================================ */}
        {/* LAYER 1 (Z: -60px): بقع التيل الخلفية (Torn Paper Teal Blobs) */}
        {/* ============================================================ */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -12 }}
          animate={
            stage === 1
              ? { scale: 1, opacity: 1, rotate: 0 }
              : { scale: 0, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.15 }}
          style={{ transform: "translateZ(-60px)" }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 900 700"
            className="h-[92vh] w-[92vw] max-w-[1100px] drop-shadow-2xl"
          >
            {/* بقعة التيل الكبيرة فوق ويمين */}
            <path
              d="M320,80 C390,10 530,5 620,60 C700,110 740,210 830,270 C890,310 895,430 840,510 C780,590 640,630 510,610 C370,590 220,540 180,430 C140,320 250,150 320,80 Z"
              fill={COLORS.teal}
            />
            {/* بقعة التيل الصغيرة تحت شمال */}
            <path
              d="M60,460 C120,420 240,450 280,530 C320,610 240,690 140,680 C40,670 10,500 60,460 Z"
              fill={COLORS.teal}
            />
          </svg>
        </motion.div>

        {/* ============================================================ */}
        {/* LAYER 2 (Z: 10px): كلمة Helloo بعيون تفاعلية في البداية */}
        {/* ============================================================ */}
        <motion.div
          initial={{ y: "28vh", scale: 1.15 }}
          animate={{
            y: stage === 0 ? "28vh" : "-34vh",
            scale: stage === 0 ? 1.15 : 0.72,
          }}
          transition={{ type: "spring", stiffness: 75, damping: 14 }}
          style={{ transform: "translateZ(20px)" }}
          className="pointer-events-none absolute z-10 flex justify-center"
        >
          <div
            style={{
              color: stage === 0 ? COLORS.lime : COLORS.teal,
              textShadow:
                stage === 0
                  ? `0 12px 30px rgba(0,0,0,0.35)`
                  : `4px 4px 0px ${COLORS.lime}`,
            }}
            className="relative inline-flex items-baseline text-[20vw] font-black leading-none tracking-tight transition-colors duration-500 sm:text-[13vw] md:text-[10.5rem]"
          >
            <span>Hell</span>

            {[0, 1].map((idx) => (
              <span key={idx} className="relative inline-block">
                o
                <AnimatePresence>
                  {stage === 0 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={eyeAnim}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={eyeTrans}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        style={{ backgroundColor: COLORS.purple }}
                        className="mt-[12%] h-[24%] w-[24%] rounded-full"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            ))}
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* LAYER 3 (Z: 45px): البقعة البنفسجية + لوجو Rahma.psd + التاج */}
        {/* ============================================================ */}
        <motion.div
          initial={{ scale: 0, rotate: -25, x: -120, opacity: 0 }}
          animate={
            stage === 1
              ? { scale: 1, rotate: -8, x: 0, opacity: 1 }
              : { scale: 0, rotate: -25, x: -120, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 95, damping: 12, delay: 0.35 }}
          style={{ transform: "translateZ(45px)" }}
          className="pointer-events-none absolute top-[14%] left-[4%] z-20 sm:top-[15%] sm:left-[12%] md:left-[18%]"
        >
          <div
            style={{
              backgroundColor: COLORS.purple,
              boxShadow: `0 20px 40px -10px rgba(106, 58, 159, 0.65), 0 0 0 6px ${COLORS.cream}`,
            }}
            className="relative rounded-[42%_58%_63%_37%/45%_42%_58%_55%] px-7 py-6 sm:px-10 sm:py-8"
          >
            {/* أيقونة التاج المرسومة فوق الاسم */}
            <motion.svg
              viewBox="0 0 100 60"
              className="mx-auto -mb-1 h-9 w-14 sm:h-12 sm:w-20"
            >
              <motion.path
                d="M15,48 L10,15 L35,32 L50,10 L65,32 L90,15 L85,48 Z"
                fill="none"
                stroke={COLORS.cream}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={stage === 1 ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ delay: 0.85, duration: 0.7 }}
              />
            </motion.svg>

            {/* اسم Rahma.psd */}
            <h1
              style={{ color: COLORS.cream }}
              className="font-serif text-3xl font-black italic tracking-wide sm:text-5xl md:text-6xl"
            >
              Rahma<span style={{ color: COLORS.lime }}>.psd</span>
            </h1>

            {/* الخطين المرسومين تحت الاسم */}
            <svg viewBox="0 0 220 24" className="mt-1 h-4 w-44 sm:w-60">
              <motion.path
                d="M10,8 Q110,2 210,6"
                stroke={COLORS.lime}
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={stage === 1 ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              />
              <motion.path
                d="M35,18 Q115,12 185,16"
                stroke={COLORS.cream}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={stage === 1 ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ delay: 1.15, duration: 0.45 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* LAYER 4 (Z: 70px): العناصر الطايرة 3D (فرعوني + فضاء + نجوم) */}
        {/* ============================================================ */}

        {/* 4A. الخرطوش الفرعوني على الشمال */}
        <motion.div
          initial={{ scale: 0, x: -90, rotate: 20, opacity: 0 }}
          animate={
            stage === 1
              ? { scale: 1, x: 0, rotate: -10, opacity: 1, y: [0, -10, 0] }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            scale: { type: "spring", stiffness: 110, damping: 12, delay: 0.6 },
            rotate: { type: "spring", stiffness: 110, damping: 12, delay: 0.6 },
            x: { type: "spring", stiffness: 110, damping: 12, delay: 0.6 },
            opacity: { duration: 0.3, delay: 0.6 },
            y: { repeat: Infinity, duration: 3.6, ease: "easeInOut" },
          }}
          style={{
            transform: "translateZ(75px)",
            backgroundColor: COLORS.cream,
            boxShadow: `6px 8px 0px ${COLORS.purple}`,
            border: `3px solid ${COLORS.purple}`,
          }}
          className="pointer-events-none absolute bottom-[26%] left-[5%] z-20 rounded-2xl p-2.5 sm:bottom-[24%] sm:left-[15%] sm:p-3.5"
        >
          <svg
            viewBox="0 0 80 160"
            className="h-24 w-12 sm:h-32 sm:w-16"
            fill="none"
            stroke={COLORS.purple}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="12" y="10" width="56" height="125" rx="28" />
            {/* طائر حورس مبسط */}
            <path d="M35,45 C35,32 48,32 48,42 L55,58 L32,58 Z" fill={COLORS.purple} />
            <circle cx="43" cy="36" r="2" fill={COLORS.cream} />
            <line x1="38" y1="58" x2="38" y2="68" />
            <line x1="46" y1="58" x2="46" y2="68" />
            {/* مفتاح الحياة (عنخ) */}
            <ellipse cx="40" cy="84" rx="7" ry="10" />
            <line x1="40" y1="94" x2="40" y2="112" />
            <line x1="29" y1="98" x2="51" y2="98" />
            {/* موجة المياه */}
            <path d="M26,122 L31,117 L36,122 L41,117 L46,122 L51,117 L55,122" />
            {/* قاعدة الخرطوش */}
            <line x1="10" y1="144" x2="70" y2="144" strokeWidth="5" />
            <line x1="16" y1="152" x2="64" y2="152" strokeWidth="5" />
          </svg>
        </motion.div>

        {/* 4B. كوكب زحل البنفسجي فوق يمين */}
        <motion.div
          initial={{ scale: 0, y: -80, rotate: 35, opacity: 0 }}
          animate={
            stage === 1
              ? { scale: 1, y: [0, 12, 0], rotate: -15, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            scale: { type: "spring", stiffness: 100, damping: 11, delay: 0.75 },
            opacity: { duration: 0.3, delay: 0.75 },
            y: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
          }}
          style={{ transform: "translateZ(80px)" }}
          className="pointer-events-none absolute top-[10%] right-[7%] z-20 sm:top-[12%] sm:right-[16%]"
        >
          <svg
            viewBox="0 0 140 100"
            className="h-20 w-28 drop-shadow-xl sm:h-28 sm:w-36"
          >
            <circle cx="70" cy="50" r="28" fill={COLORS.purple} />
            <circle cx="60" cy="40" r="4" fill={COLORS.lime} opacity="0.8" />
            <ellipse
              cx="70"
              cy="50"
              rx="58"
              ry="16"
              fill="none"
              stroke={COLORS.purple}
              strokeWidth="6"
              transform="rotate(-18 70 50)"
            />
            <ellipse
              cx="70"
              cy="50"
              rx="58"
              ry="16"
              fill="none"
              stroke={COLORS.lime}
              strokeWidth="2.5"
              strokeDasharray="12 8"
              transform="rotate(-18 70 50)"
            />
          </svg>
        </motion.div>

        {/* 4C. عين حورس (Eye of Horus Sticker) على اليمين */}
        <motion.div
          initial={{ scale: 0, x: 90, rotate: -20, opacity: 0 }}
          animate={
            stage === 1
              ? { scale: 1, x: 0, rotate: 8, opacity: 1, y: [0, -8, 0] }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            scale: { type: "spring", stiffness: 110, damping: 12, delay: 0.9 },
            x: { type: "spring", stiffness: 110, damping: 12, delay: 0.9 },
            opacity: { duration: 0.3, delay: 0.9 },
            y: { repeat: Infinity, duration: 3.8, ease: "easeInOut" },
          }}
          style={{
            transform: "translateZ(75px)",
            backgroundColor: COLORS.cream,
            boxShadow: `6px 8px 0px ${COLORS.pink}`,
            border: `3px solid ${COLORS.purple}`,
          }}
          className="pointer-events-none absolute top-[42%] right-[4%] z-20 rounded-2xl px-3.5 py-3 sm:right-[13%] sm:px-5 sm:py-4"
        >
          <svg
            viewBox="0 0 120 90"
            className="h-14 w-20 sm:h-20 sm:w-28"
            fill="none"
            stroke={COLORS.purple}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* الحاجب */}
            <path d="M12,24 Q60,4 108,22" strokeWidth="6" />
            {/* شكل العين */}
            <path d="M18,42 Q60,20 102,40 Q60,62 18,42 Z" />
            {/* البؤبؤ */}
            <circle cx="60" cy="41" r="10" fill={COLORS.purple} />
            <circle cx="57" cy="38" r="3" fill={COLORS.lime} />
            {/* الخط الحلزوني تحت العين */}
            <path d="M52,52 L42,76 C36,84 22,82 22,72 C22,65 30,63 34,68" />
            <path d="M68,52 L76,78" />
          </svg>
        </motion.div>

        {/* ============================================================ */}
        {/* LAYER 5 (Z: 95px): صورة رحمة المفرغة مع الـ Cutout Outline */}
        {/* ============================================================ */}
        <motion.div
          initial={{ y: "110%", scale: 0.85 }}
          animate={
            stage === 1
              ? { y: "0%", scale: 1 }
              : { y: "110%", scale: 0.85 }
          }
          transition={{
            type: "spring",
            stiffness: 68,
            damping: 14,
            delay: 0.2,
          }}
          style={{ transform: "translateZ(95px)" }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center"
        >
          {/* 
            حطي صورتك المفرغة باسم rahma.png في فولدر public 
          */}
          <img
            src="../public/rahma.jpg"
            alt="Rahma Cutout"
            onError={(e) => {
              // صورة احتياطية لو لسه محطتيش rahma.png في public
              e.currentTarget.src =
                "https://pngimg.com/uploads/student/student_PNG62560.png";
            }}
            className="h-[62vh] w-auto object-contain object-bottom sm:h-[71vh]"
            style={{
              filter: `
                drop-shadow(7px 0 0 ${COLORS.cream})
                drop-shadow(-7px 0 0 ${COLORS.cream})
                drop-shadow(0 -7px 0 ${COLORS.cream})
                drop-shadow(6px -6px 0 ${COLORS.cream})
                drop-shadow(-6px -6px 0 ${COLORS.cream})
                drop-shadow(0 22px 35px rgba(25, 16, 44, 0.55))
              `,
            }}
          />
        </motion.div>

        {/* ============================================================ */}
        {/* LAYER 6 (Z: 125px): الكروت التفاعلية الأمامية (Social + Typewriter) */}
        {/* ============================================================ */}

        {/* كارت الانستجرام 3D */}
        <motion.a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          style={{
            transform: "translateZ(125px)",
            backgroundColor: COLORS.purple,
            borderColor: COLORS.cream,
            boxShadow: `5px 5px 0px ${COLORS.pink}`,
          }}
          className={`pointer-events-auto absolute z-40 flex items-center gap-2.5 rounded-2xl border-2 px-4 py-2.5 transition-all duration-700 hover:scale-105 ${
            stage === 0
              ? "top-8 right-8"
              : "bottom-8 left-6 sm:bottom-12 sm:left-14"
          }`}
        >
          <div
            style={{ backgroundColor: COLORS.pink }}
            className="flex h-8 w-8 items-center justify-center rounded-lg"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={COLORS.cream}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </div>
          <span
            style={{ color: COLORS.cream }}
            className="font-mono text-xs font-bold tracking-wider sm:text-sm"
          >
            @RAHMA.PSD
          </span>
        </motion.a>

        {/* كارت الـ Typewriter التفاعلي على اليمين تحت */}
        <motion.div
          initial={{ scale: 0, opacity: 0, x: 50 }}
          animate={
            stage === 1
              ? { scale: 1, opacity: 1, x: 0 }
              : { scale: 0, opacity: 0, x: 50 }
          }
          transition={{ type: "spring", stiffness: 100, damping: 13, delay: 1.15 }}
          style={{
            transform: "translateZ(125px)",
            backgroundColor: COLORS.purple,
            borderColor: COLORS.cream,
            boxShadow: `7px 7px 0px ${COLORS.lime}`,
          }}
          className="absolute right-5 bottom-8 z-40 flex flex-col items-start rounded-2xl border-2 px-5 py-3.5 sm:right-14 sm:bottom-12 sm:px-6 sm:py-4"
        >
          <span
            style={{ backgroundColor: COLORS.pink, color: COLORS.cream }}
            className="mb-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
          >
            Visual Artist
          </span>

          {/* الكلمة اللي بتتمسح وتتكتب */}
          <div
            style={{ color: COLORS.cream }}
            className="relative flex items-center text-lg font-extrabold sm:text-2xl"
          >
            <span>{typedText}</span>

            {showCursor && (
              <span
                style={{ backgroundColor: COLORS.lime }}
                className="ml-1 inline-block h-5 w-[3px] animate-pulse sm:h-6"
              />
            )}

            {/* مؤشر الماوس */}
            <AnimatePresence>
              {showPointer && (
                <motion.div
                  initial={{ opacity: 0, x: 25, y: 25 }}
                  animate={{ opacity: 1, x: 6, y: 8, scale: [1, 0.82, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute -right-6 -bottom-5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{ fill: COLORS.pink, stroke: COLORS.cream }}
                    className="h-6 w-6 stroke-2"
                  >
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    <path d="M13 13l6 6" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* كلمة Designer اللي بتعمل Pop باللون الليموني */}
          <AnimatePresence>
            {showDesigner && (
              <motion.p
                initial={{ opacity: 0, scale: 0.5, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 12 }}
                style={{ color: COLORS.lime }}
                className="text-xl font-black tracking-wide sm:text-3xl"
              >
                Designer ✨
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}