"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { OPEN_PROJECTS } from "@/lib/events";
import type { Project } from "@/lib/projects";
import { Paperclip } from "./Stickers";

const EASE = [0.2, 0.8, 0.2, 1] as const;
const TAB_X = [4, 50, 12, 32, 56]; // tab position (%) for each folder in the stack, like the staggered tabs

const PAPER = {
  cream: { bg: "var(--color-cream)", ink: "var(--color-purple)" },
  lime: { bg: "var(--color-lime)", ink: "var(--color-purple)" },
  pink: { bg: "var(--color-pink)", ink: "var(--color-plum)" },
  teal: { bg: "var(--color-teal)", ink: "var(--color-cream)" },
} as const;

function paperVars(p: Project, tabX: number): CSSProperties {
  const c = PAPER[p.paper];
  return { "--paper": c.bg, "--ink": c.ink, "--tab-x": `${tabX}%` } as CSSProperties;
}

// readable text color on a brand color
const inkOn = (hex: string) => (hex.toLowerCase() === "#c4ec69" ? "#6a3a9f" : "#f3ebe3");

function FolderFace({ name }: { name: string }) {
  return (
    <>
      <span className="folder-body" />
      <span className="folder-tab">
        {name && (
          <span className="folder-name truncate font-display text-[clamp(1.05rem,3.2vw,1.9rem)] font-extrabold leading-none">
            {name}
          </span>
        )}
      </span>
    </>
  );
}

/* ------------------------- all-projects stack ------------------------- */
function List({ projects, onPick, calm }: { projects: Project[]; onPick: (id: string) => void; calm: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: calm ? 0.01 : 0.3 }}
    >
      <header className="list-head">
        <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight">
          All projects
        </h2>
        <p className="list-sub text-lg text-cream/85">Pick a folder to see everything inside.</p>
      </header>

      <ul className="folder-stack">
        {projects.map((p, i) => {
          const tabX = TAB_X[i % TAB_X.length];
          return (
            <motion.li
              key={p.id}
              className="folder-wrap"
              style={{ ...paperVars(p, tabX), zIndex: i + 1 }}
              initial={calm ? { opacity: 0 } : { y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: calm ? 0 : 0.25 + i * 0.09, duration: calm ? 0.01 : 0.6, ease: EASE }}
            >
              <button type="button" className="folder" onClick={() => onPick(p.id)} aria-label={`Open the ${p.title} folder`}>
                <FolderFace name={p.title} />
                <span className={`folder-meta font-body text-base ${tabX > 40 ? "folder-meta--left" : "folder-meta--right"}`}>
                  {p.meta}
                </span>
                {i % 2 === 0 && <Paperclip className="folder-clip" />}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/* --------------------------- opened folder --------------------------- */
function Detail({ project, onBack, calm }: { project: Project; onBack: () => void; calm: boolean }) {
  const initial = project.title.charAt(0);

  // each item "pops out" of the folder after the cover has opened
  const pop = (i: number, tilt = 0) => ({
    initial: calm ? { opacity: 0 } : { y: 90, opacity: 0, rotate: tilt * 3, scale: 0.95 },
    animate: { y: 0, opacity: 1, rotate: tilt, scale: 1 },
    transition: { delay: calm ? 0 : 0.85 + i * 0.09, duration: calm ? 0.01 : 0.6, ease: EASE },
  });

  return (
    <motion.div
      className="detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: calm ? 0.01 : 0.25 }}
    >
      <header className="detail-head relative z-[5] flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight">
            {project.title}
          </h2>
          <p className="font-display text-lg font-semibold text-lime">{project.meta}</p>
        </div>
        <button type="button" onClick={onBack} className="btn-3d btn-3d--sm bg-lime font-display text-sm font-bold text-purple">
          All projects
        </button>
      </header>

      <div className="folder-stage">
        <div className="folder-open relative" style={paperVars(project, 6)}>
          {/* inside of the folder */}
          <div className="inside relative rounded-3xl bg-cream text-purple">
            <Paperclip className="inside-clip absolute text-plum/70" />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
              <motion.div
                {...pop(0, -2)}
                className="logo-card flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border-2 border-purple"
                style={{ background: project.palette[0], color: inkOn(project.palette[0]) }}
              >
                {project.logo ? (
                  <Image src={project.logo} alt={`${project.title} logo`} width={420} height={420} className="h-auto w-3/5" />
                ) : (
                  <>
                    <span className="font-display text-[clamp(5rem,14vw,9rem)] font-extrabold leading-none">{initial}</span>
                    <span className="font-script text-3xl leading-none">{project.title}</span>
                  </>
                )}
              </motion.div>

              <div className="flex flex-col gap-8">
                <motion.p {...pop(1)} className="max-w-[46ch] text-lg leading-relaxed text-teal">
                  {project.blurb}
                </motion.p>

                <motion.div {...pop(2)} className="inside-block">
                  <h3 className="font-display text-lg font-bold">Colors</h3>
                  <ul className="flex flex-wrap gap-4">
                    {project.colors.map((c) => (
                      <li key={c.hex} className="flex flex-col gap-1">
                        <span className="block h-16 w-16 rounded-full border-2 border-purple" style={{ background: c.hex }} />
                        <span className="text-sm font-semibold">{c.name}</span>
                        <span className="text-sm text-teal">{c.hex}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div {...pop(3)} className="inside-block">
                  <h3 className="font-display text-lg font-bold">Type</h3>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {project.fonts.map((f) => (
                      <li key={f.name} className="type-card flex items-center gap-4 rounded-2xl border-2 border-purple">
                        <span className="text-5xl leading-none" style={{ fontFamily: f.family, fontWeight: f.weight }}>
                          Aa
                        </span>
                        <span className="text-sm font-semibold">{f.name}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            <div className="mock-section">
              <h3 className="font-display text-lg font-bold">Brand in use</h3>
              <ul className="grid items-end gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {project.mockups.map((m, i) => {
                  const bg = project.palette[(i + 1) % 3];
                  return (
                    <motion.li key={m.label} {...pop(4 + i, i % 2 ? 1.5 : -1.5)} className="flex flex-col gap-2">
                      <div
                        className="relative w-full overflow-hidden rounded-2xl border-2 border-purple"
                        style={{ aspectRatio: m.ratio, background: bg }}
                      >
                        {m.src ? (
                          <Image src={m.src} alt={`${project.title} ${m.label}`} fill sizes="(min-width: 1024px) 22vw, 90vw" className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center" style={{ color: inkOn(bg) }}>
                            <span className="font-display text-5xl font-extrabold">{initial}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-semibold">{m.label}</p>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* folder cover: hinged at the top, flips up and away */}
          <motion.div
            className="cover"
            aria-hidden="true"
            initial={{ rotateX: 0, opacity: 1 }}
            animate={calm ? { opacity: 0 } : { rotateX: -125, opacity: [1, 1, 0] }}
            transition={
              calm
                ? { duration: 0.01 }
                : {
                    rotateX: { delay: 0.3, duration: 1, ease: [0.45, 0.05, 0.2, 1] },
                    opacity: { delay: 0.3, duration: 1, times: [0, 0.75, 1] },
                  }
            }
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="cover-face cover-front">
              <FolderFace name={project.title} />
            </div>
            <div className="cover-face cover-back">
              <FolderFace name="" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------ overlay ------------------------------ */
export default function ProjectsOverlay({ projects }: { projects: Project[] }) {
  const calm = !!useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const active = projects.find((p) => p.id === activeId) ?? null;

  const show = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setActiveId(null);
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    setActiveId(null);
  }, []);

  useEffect(() => {
    window.addEventListener(OPEN_PROJECTS, show);
    return () => window.removeEventListener(OPEN_PROJECTS, show);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeId) setActiveId(null);
        else close();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prev;
    };
  }, [open, activeId, close]);

  return (
    <AnimatePresence onExitComplete={() => lastFocus.current?.focus()}>
      {open && (
        <motion.div
          key="projects-overlay"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Projects"
          tabIndex={-1}
          className="projects-overlay fixed inset-0 z-[60] overflow-y-auto bg-purple text-cream"
          initial={calm ? { opacity: 0 } : { y: "100%" }}
          animate={calm ? { opacity: 1 } : { y: 0 }}
          exit={calm ? { opacity: 0 } : { y: "100%" }}
          transition={{ duration: calm ? 0.01 : 0.6, ease: EASE }}
        >
          <div className="grain relative min-h-full">
            <div className="overlay-inner relative">
              <button
                type="button"
                onClick={close}
                className="overlay-close btn-3d btn-3d--sm z-10 bg-cream font-display text-sm font-semibold text-purple"
              >
                Close
              </button>
              <AnimatePresence mode="wait">
                {active ? (
                  <Detail key={active.id} project={active} onBack={() => setActiveId(null)} calm={calm} />
                ) : (
                  <List key="list" projects={projects} onPick={setActiveId} calm={calm} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
