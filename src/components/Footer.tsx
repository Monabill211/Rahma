import { site } from "@/lib/site";
import NavLink from "./NavLink";
import { Planet, Sparkle } from "./Stickers";

export default function Footer() {
  return (
    <footer id="contact" className="footer grain relative bg-purple text-cream">
      <div className="footer-inner relative">
        <div className="pointer-events-none absolute right-0 top-0 hidden w-[min(32vw,360px)] md:block" aria-hidden="true">
          <Planet className="block w-full -rotate-6 text-lime" />
          <Sparkle className="absolute right-[88%] top-[70%] w-[14%] text-pink" />
          <Sparkle className="absolute right-[4%] top-[88%] w-[10%] text-cream" />
        </div>

        <div className="footer-cta relative">
          <h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-tight">
            Have a project in mind? Let&apos;s make it.
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="footer-mail inline-block font-display text-[clamp(1.25rem,3vw,2rem)] font-semibold text-lime underline decoration-pink decoration-4 underline-offset-8"
          >
            {site.email}
          </a>
        </div>

        <div className="footer-cols grid gap-10 border-t-2 border-cream/25 sm:grid-cols-3">
          <div>
            <p className="font-script text-4xl leading-none text-lime">{site.handle}</p>
            <p className="footer-blurb max-w-[28ch] text-cream/85">{site.blurb}</p>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-lime">Navigate</h3>
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} action={item.action} className="footer-link hover:text-lime hover:underline">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-lime">Follow</h3>
            <ul>
              {site.socials.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link hover:text-lime hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom flex flex-wrap items-center justify-between gap-4">
<p className="font-mono text-xs opacity-80">
  © 2026 RAHMA.PSD — ALL RIGHTS RESERVED.
</p>         
          <a href="#top" className="btn-3d btn-3d--sm bg-lime font-display text-sm font-bold text-purple">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
