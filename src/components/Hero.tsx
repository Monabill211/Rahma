import { site } from "@/lib/site";
import HeroScene from "./HeroScene";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-inner grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h1
            id="hero-title"
            className="hero-title font-display text-[clamp(2.6rem,6.2vw,5.25rem)] font-extrabold leading-[1.02] tracking-tight text-purple"
          >
            Hi, I&apos;m {site.name}. I design things that feel handmade.
          </h1>
          <p className="hero-copy max-w-[34ch] text-xl text-teal">{site.blurb}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#work" className="btn-3d bg-lime font-display font-bold text-purple">
              See my work
            </a>
            <a href="#contact" className="btn-3d bg-cream font-display font-bold text-purple">
              Say hello
            </a>
          </div>
        </div>
        <HeroScene />
      </div>
    </section>
  );
}
