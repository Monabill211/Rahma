import type { CSSProperties, ReactNode } from "react";
import { site } from "@/lib/site";
import { torn } from "@/lib/torn";
import { Cartouche, Eye, Planet, Sparkle } from "./Stickers";

const SHAPE = {
  lime: torn(31, 56, 4, 3),
  teal: torn(33, 52, 5, 3.2),
  purple: torn(35, 46, 5, 3),
  paper: torn(37, 40, 4, 3.6),
};

function Piece({ z, r = 0, box, children }: { z: number; r?: number; box: CSSProperties; children?: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="absolute"
      style={{
        ...box,
        transform: `translateZ(${z}px) rotate(${r}deg)`,
        filter: `drop-shadow(0 ${Math.round(z / 7) + 3}px ${Math.round(z / 9) + 5}px rgba(47,23,82,.25))`,
      }}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="section-inner grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="board-stage w-full">
          <div className="board relative aspect-[5/4] w-full max-w-[560px]">
            <Piece z={0} box={{ inset: 0 }}>
              <div className="grain relative h-full w-full bg-lime" style={{ clipPath: SHAPE.lime }} />
            </Piece>
            <Piece z={30} r={-3} box={{ left: "8%", top: "8%", width: "60%", height: "72%" }}>
              <div className="grain relative h-full w-full bg-teal" style={{ clipPath: SHAPE.teal }} />
            </Piece>
            <Piece z={55} r={6} box={{ right: "4%", bottom: "6%", width: "46%", height: "56%" }}>
              <div className="grain relative h-full w-full bg-purple" style={{ clipPath: SHAPE.purple }} />
            </Piece>
            <Piece z={85} r={-5} box={{ left: "6%", bottom: "8%", width: "36%", height: "30%" }}>
              <div className="flex h-full w-full items-center justify-center bg-cream text-purple" style={{ clipPath: SHAPE.paper }}>
                <Eye className="w-[66%]" />
              </div>
            </Piece>
            <Piece z={100} r={4} box={{ right: "14%", bottom: "16%", width: "15%" }}>
              <Cartouche className="block w-full text-purple" />
            </Piece>
            <Piece z={120} r={8} box={{ right: "7%", top: "5%", width: "30%" }}>
              <Planet className="block w-full text-purple" />
            </Piece>
            <Piece z={110} box={{ left: "4%", top: "4%", width: "8%" }}>
              <Sparkle className="block w-full text-pink" />
            </Piece>
            <Piece z={95} box={{ left: "46%", bottom: "4%", width: "6%" }}>
              <Sparkle className="block w-full text-cream" />
            </Piece>
          </div>
        </div>

        <div>
          <h2
            id="about-title"
            className="about-title font-display text-[clamp(2rem,4.6vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-purple"
          >
            A little more about me
          </h2>
          {site.about.map((text) => (
            <p key={text} className="about-text max-w-[52ch] text-lg leading-relaxed text-teal">
              {text}
            </p>
          ))}
          <p className="about-text text-lg text-teal">Most of my work happens in:</p>
          <ul className="flex flex-wrap gap-3">
            {site.tools.map((tool) => (
              <li key={tool} className="chip rounded-full border-2 border-purple bg-lime font-display text-sm font-semibold text-purple">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
