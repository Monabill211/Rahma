import { site } from "@/lib/site";
import { Crown, Eye, Planet, Sparkle } from "./Stickers";

const ICONS = {
  crown: Crown,
  planet: Planet,
  eye: Eye,
  sparkle: Sparkle,
} as const;

// each card is a different piece of paper: color + tilt
const PAPERS = [
  { bg: "bg-cream", rotate: -2 },
  { bg: "bg-lime", rotate: 1.5 },
  { bg: "bg-pink", rotate: -1.5 },
  { bg: "bg-cream", rotate: 2 },
];

export default function Services() {
  return (
    <section id="services" className="services torn-top bg-teal text-cream" aria-labelledby="services-title">
      <div className="section-inner">
        <h2
          id="services-title"
          className="services-title max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
        >
          What I can make for you
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {site.services.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            const paper = PAPERS[i % PAPERS.length];
            return (
              <li
                key={s.title}
                className={`service-card ${paper.bg} rounded-3xl border-2 border-purple text-purple`}
                style={{ "--tilt": `${paper.rotate}deg` } as React.CSSProperties}
              >
                <Icon className="service-icon block w-16 text-purple" />
                <h3 className="font-display text-2xl font-extrabold leading-tight">{s.title}</h3>
                <p className="service-desc text-base leading-relaxed">{s.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
