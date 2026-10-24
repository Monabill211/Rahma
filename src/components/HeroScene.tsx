"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { site } from "@/lib/site";
import { torn } from "@/lib/torn";
import { Cartouche, Crown, Eye, Planet, Sparkle } from "./Stickers";

const REST_RX = 6;
const REST_RY = -10;

const SHAPE = {
  teal: torn(3, 60, 5, 2.6),
  purple: torn(11, 52, 4, 3.4),
  purpleSmall: torn(21, 44, 5, 3),
  paper: torn(5, 40, 4, 3.6),
  tape: torn(8, 30, 3, 6),
};

type LayerProps = {
  z: number;
  i: number;
  r?: number;
  box: CSSProperties;
  decorative?: boolean;
  children?: ReactNode;
};

// One slice of the 3D stack: positioned in %, pushed forward by z, shadow grows with depth.
function Layer({ z, i, r = 0, box, decorative = true, children }: LayerProps) {
  const style = {
    ...box,
    "--z": `${z}px`,
    "--i": i,
    "--r": `${r}deg`,
    filter: `drop-shadow(0 ${Math.round(z / 7) + 3}px ${Math.round(z / 9) + 5}px rgba(47,23,82,.28))`,
  } as CSSProperties;
  return (
    <div className="layer" style={style} aria-hidden={decorative || undefined}>
      {children}
    </div>
  );
}

export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = sceneRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${REST_RY + x * 22}deg`);
    el.style.setProperty("--rx", `${REST_RX - y * 16}deg`);
  };

  const onLeave = () => {
    const el = sceneRef.current;
    if (!el) return;
    el.style.setProperty("--ry", `${REST_RY}deg`);
    el.style.setProperty("--rx", `${REST_RX}deg`);
  };

  return (
    <div
      className="scene-stage relative aspect-square w-full max-w-[640px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={sceneRef} className="scene absolute inset-0">
        {/* paper card */}
        <Layer z={0} i={0} box={{ inset: 0 }}>
          <div className="h-full w-full rounded-[2rem] border-2 border-purple bg-cream" />
        </Layer>

        {/* teal torn paper */}
        <Layer z={22} i={1} box={{ left: "16%", top: "-3%", width: "88%", height: "104%" }}>
          <div className="grain relative h-full w-full bg-teal" style={{ clipPath: SHAPE.teal }} />
        </Layer>

        {/* purple torn paper, bottom right */}
        <Layer z={34} i={2} r={8} box={{ right: "-3%", bottom: "6%", width: "30%", height: "36%" }}>
          <div className="grain relative h-full w-full bg-purple" style={{ clipPath: SHAPE.purpleSmall }} />
        </Layer>

        {/* purple torn paper with the handle */}
        <Layer z={52} i={3} r={-3} box={{ left: "3%", top: "14%", width: "50%", height: "40%" }}>
          <div
            className="grain relative flex h-full w-full flex-col items-center justify-center bg-purple text-cream"
            style={{ clipPath: SHAPE.purple }}
          >
            <Crown style={{ width: "7cqw", position: "relative", left: "-9cqw" }} />
            <span className="font-script leading-none" style={{ fontSize: "8.6cqw", transform: "rotate(-6deg)" }}>
              {site.handle}
            </span>
            <svg viewBox="0 0 200 20" style={{ width: "30cqw" }} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 14Q100 2 195 10" />
              <path d="M40 19Q110 11 170 16" />
            </svg>
          </div>
        </Layer>

        {/* eye of Horus on cream paper */}
        <Layer z={78} i={4} r={4} box={{ right: "2%", top: "37%", width: "25%", height: "21%" }}>
          <div className="flex h-full w-full items-center justify-center bg-cream text-purple" style={{ clipPath: SHAPE.paper }}>
            <Eye className="w-[68%]" />
          </div>
        </Layer>

        <Layer z={96} i={5} r={-4} box={{ left: "5%", bottom: "16%", width: "12.5%" }}>
          <Cartouche className="block w-full text-purple" />
        </Layer>

        <Layer z={125} i={6} r={6} box={{ right: "6%", top: "4%", width: "26%" }}>
          <Planet className="block w-full text-purple" />
        </Layer>

        {/* sparkles at different depths */}
        <Layer z={60} i={7} box={{ left: "13%", top: "6%", width: "6%" }}>
          <Sparkle className="block w-full text-teal" />
        </Layer>
        <Layer z={105} i={7} box={{ left: "43%", top: "5%", width: "10%" }}>
          <Sparkle className="block w-full text-cream" />
        </Layer>
        <Layer z={135} i={8} box={{ right: "5%", top: "24%", width: "7%" }}>
          <Sparkle className="block w-full text-pink" />
        </Layer>
        <Layer z={120} i={8} box={{ left: "3%", top: "63%", width: "5%" }}>
          <Sparkle className="block w-full text-lime" />
        </Layer>
        <Layer z={95} i={8} box={{ right: "2%", top: "60%", width: "6%" }}>
          <Sparkle className="block w-full text-cream" />
        </Layer>
        <Layer z={110} i={8} box={{ left: "15%", bottom: "5%", width: "5%" }}>
          <Sparkle className="block w-full text-pink" />
        </Layer>

        {/* the portrait, popped out in front */}
        <Layer z={150} i={9} decorative={false} box={{ left: "2%", bottom: "0%", width: "96%" }}>
          <Image
            src="/rahma.png"
            alt={`Portrait of ${site.name}`}
            width={1356}
            height={1150}
            priority
            sizes="(min-width: 1024px) 620px, 92vw"
            className="block h-auto w-full"
            style={{
              maskImage: "linear-gradient(to bottom,#000 90%,transparent)",
              WebkitMaskImage: "linear-gradient(to bottom,#000 90%,transparent)",
            }}
          />
        </Layer>

        {/* lime tape label, in front of everything */}
        <Layer z={190} i={10} r={-5} box={{ right: "3%", bottom: "8%", width: "38%" }}>
          <div
            className="grain relative flex w-full items-center justify-center bg-lime font-display font-bold text-purple"
            style={{ clipPath: SHAPE.tape, aspectRatio: "3.2 / 1", fontSize: "2.7cqw" }}
          >
            {site.tag}
          </div>
        </Layer>
      </div>
    </div>
  );
}
