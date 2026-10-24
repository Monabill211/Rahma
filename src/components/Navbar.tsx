"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import NavLink from "./NavLink";
import { Crown } from "./Stickers";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav-wrap sticky top-0 z-50">
      <nav
        className="nav-pill flex items-center justify-between gap-4 rounded-full border-2 border-purple bg-cream"
        aria-label="Main"
      >
        <a href="#top" onClick={close} className="nav-logo flex items-center gap-2 font-script text-3xl leading-none text-purple">
          <Crown className="w-6" />
          {site.handle}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                action={item.action}
                className="nav-link block rounded-full font-display text-sm font-semibold text-purple transition-colors hover:bg-lime"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-3d btn-3d--sm hidden bg-purple font-display text-sm font-semibold text-cream md:inline-flex">
          Let&apos;s talk
        </a>

        <button
          type="button"
          className="nav-toggle rounded-full border-2 border-purple bg-lime text-purple md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="block w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M5 5 19 19M19 5 5 19" /> : <path d="M4 7H20M4 12H20M4 17H20" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="nav-mobile rounded-3xl border-2 border-purple bg-cream md:hidden">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  action={item.action}
                  onNavigate={close}
                  className="block rounded-2xl font-display text-lg font-semibold text-purple hover:bg-lime"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
