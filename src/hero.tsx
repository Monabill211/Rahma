"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortfolioHero() {
  // مراحل الأنيميشن:
  // 0: كلمة Helloo تحت والعيون بتبص
  // 1: الكلمة بتطلع فوق والصورة والنصوص بتظهر
  const [stage, setStage] = useState<0 | 1>(0);

  // حالات تأثير الكتابة (Typewriter)
  const [typedText, setTypedText] = useState("Jobless");
  const [showCursor, setShowCursor] = useState(false);
  const [showPointer, setShowPointer] = useState(false);
  const [showDesigner, setShowDesigner] = useState(false);

  useEffect(() => {
    const moveUpTimer = setTimeout(() => {
      setStage(1);
    }, 2600);

    const pointerTimer = setTimeout(() => {
      setShowPointer(true);
    }, 4800);

    const typingTimer = setTimeout(() => {
      setShowPointer(false);
      setShowCursor(true);

      const original = "Jobless";
      const target = "Freelance";
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
              }, 350);
            }
          }, 110);
        }
      }, 90);
    }, 5400);

    return () => {
      clearTimeout(moveUpTimer);
      clearTimeout(pointerTimer);
      clearTimeout(typingTimer);
    };
  }, []);

  return (
    <section className="relative h-svh w-full overflow-hidden bg-[#0b2916] font-sans text-[#d6f5b0] select-none">
      {/* 1. الخلفية الشبكية (Grid Background) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4a7c59 1px, transparent 1px),
            linear-gradient(to bottom, #4a7c59 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* 2. حساب الانستجرام (بأيقونة SVG مدمجة مباشرة) */}
  

      {/* 3. كلمة Helloo مع حركة العيون والابتسامة */}
      <motion.div
        initial={{ y: "62vh" }}
        animate={{ y: stage === 0 ? "62vh" : "6vh" }}
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 14,
        }}
        className="relative z-10 flex justify-center"
      >
        <div className="relative inline-flex items-baseline text-[21vw] font-extrabold leading-none tracking-tight sm:text-[15vw] md:text-[13rem]">
          <span>Hell</span>

          {/* أول حرف O وجواه العين */}
          <span className="relative inline-block">
            o
            <AnimatePresence>
              {stage === 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: [0, -10, 8, -4, 0],
                    y: [4, 4, -8, -4, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    opacity: { delay: 0.4, duration: 0.2 },
                    scale: { delay: 0.4, duration: 0.2 },
                    x: { delay: 0.6, duration: 1.8, ease: "easeInOut" },
                    y: { delay: 0.6, duration: 1.8, ease: "easeInOut" },
                  }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <span className="mt-[12%] h-[22%] w-[22%] rounded-full bg-[#0b2916]" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>

          {/* تاني حرف O وجواه العين التانية */}
          <span className="relative inline-block">
            o
            <AnimatePresence>
              {stage === 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: [0, -10, 8, -4, 0],
                    y: [4, 4, -8, -4, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    opacity: { delay: 0.4, duration: 0.2 },
                    scale: { delay: 0.4, duration: 0.2 },
                    x: { delay: 0.6, duration: 1.8, ease: "easeInOut" },
                    y: { delay: 0.6, duration: 1.8, ease: "easeInOut" },
                  }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <span className="mt-[12%] h-[22%] w-[22%] rounded-full bg-[#0b2916]" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>

          {/* قوس الابتسامة تحت الـ oo */}
          <svg
            className="pointer-events-none absolute -bottom-3 right-[2%] w-[24%] overflow-visible sm:-bottom-5"
            viewBox="0 0 100 40"
          >
            <motion.path
              d="M 10 8 Q 50 42 90 6"
              fill="transparent"
              stroke="#d6f5b0"
              strokeWidth="11"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                stage === 1
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ delay: 1.1, duration: 0.45, ease: "easeOut" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* 4. النصوص التعريفية على اليسار ("I am Ayesha") */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={stage === 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute top-[29%] left-6 z-20 sm:top-[34%] sm:left-16 md:left-24"
      >
        <p className="text-xl font-medium text-[#7ab85c] sm:text-3xl">
          I am Rahma
        </p>
      </motion.div>

      {/* 5. الصورة الشخصية في المنتصف مع الـ Cutout Green Outline */}
      <motion.div
        initial={{ y: "100%" }}
        animate={stage === 1 ? { y: "0%" } : { y: "100%" }}
        transition={{
          type: "spring",
          stiffness: 65,
          damping: 15,
          delay: 0.25,
        }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
      >
        <img
          src="https://pngimg.com/uploads/student/student_PNG62560.png"
          alt="Profile Cutout"
          className="h-[64vh] w-auto object-contain object-bottom sm:h-[72vh]"
          style={{
            filter: `
              drop-shadow(5px 0 0 #68b836)
              drop-shadow(-5px 0 0 #68b836)
              drop-shadow(0 -5px 0 #68b836)
              drop-shadow(5px -5px 0 #68b836)
              drop-shadow(-5px -5px 0 #68b836)
            `,
          }}
        />
      </motion.div>

      {/* 6. النصوص التفاعلية على اليمين (23 years old + Jobless -> Freelance Designer) */}
      <div className="absolute right-6 bottom-28 z-30 flex flex-col items-start text-left sm:right-16 sm:bottom-36 md:right-28">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={stage === 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.4 }}
          className="text-lg font-medium text-[#d6f5b0] sm:text-2xl"
        >
          25 years old
        </motion.p>

        {/* الكلمة اللي بتتمسح وتتكتب */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={stage === 1 ? { opacity: 1 } : {}}
          transition={{ delay: 1.9, duration: 0.3 }}
          className="relative mt-0.5 flex items-center text-lg font-medium text-white sm:text-2xl"
        >
          <span>{typedText}</span>

          {/* مؤشر الكتابة (Blinking Cursor) */}
          {showCursor && (
            <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-white sm:h-6" />
          )}

          {/* سهم الماوس اللي بيضغط على الكلمة قبل مسحها (SVG مدمج) */}
          <AnimatePresence>
            {showPointer && (
              <motion.div
                initial={{ opacity: 0, x: 25, y: 25 }}
                animate={{ opacity: 1, x: 4, y: 8, scale: [1, 0.85, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute -right-6 -bottom-5 text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-white stroke-[#0b2916] stroke-2"
                >
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                  <path d="M13 13l6 6" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* كلمة Designer اللي بتظهر في الآخر */}
        <AnimatePresence>
          {showDesigner && (
            <motion.p
              initial={{ opacity: 0, scale: 0.6, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 12 }}
              className="text-xl font-bold text-[#d6f5b0] sm:text-3xl"
            >
              Designer
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}