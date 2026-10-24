import type { CSSProperties } from "react";

type P = { className?: string; style?: CSSProperties };

export function Sparkle({ className, style }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 0C12.9 7.4 16.6 11.1 24 12 16.6 12.9 12.9 16.6 12 24 11.1 16.6 7.4 12.9 0 12 7.4 11.1 11.1 7.4 12 0Z" />
    </svg>
  );
}

export function Crown({ className, style }: P) {
  return (
    <svg viewBox="0 0 64 48" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 38 12 14 24 26 32 8 40 26 52 14 56 38Z" />
      <path d="M10 44H54" />
    </svg>
  );
}

export function Planet({ className, style }: P) {
  return (
    <svg viewBox="0 0 140 90" className={className} style={style} aria-hidden="true">
      <g transform="rotate(-16 70 45)">
        <ellipse cx="70" cy="45" rx="62" ry="15" fill="none" stroke="currentColor" strokeWidth="4" />
      </g>
      <circle cx="70" cy="45" r="28" fill="currentColor" />
      <g fill="var(--color-cream)" opacity=".35">
        <circle cx="58" cy="34" r="2.5" />
        <circle cx="76" cy="30" r="1.8" />
        <circle cx="84" cy="48" r="2.2" />
        <circle cx="62" cy="52" r="1.6" />
        <circle cx="72" cy="42" r="1.2" />
      </g>
      <g transform="rotate(-16 70 45)" fill="none">
        <path d="M8 45A62 15 0 0 0 132 45" stroke="var(--color-cream)" strokeWidth="10" />
        <path d="M8 45A62 15 0 0 0 132 45" stroke="currentColor" strokeWidth="4" />
      </g>
    </svg>
  );
}

export function Eye({ className, style }: P) {
  return (
    <svg viewBox="0 0 120 80" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 36Q60 4 110 36Q60 62 10 36Z" />
      <circle cx="60" cy="35" r="11" fill="currentColor" />
      <circle cx="60" cy="35" r="4" fill="var(--color-cream)" stroke="none" />
      <path d="M16 20Q60 -6 104 20" />
      <path d="M52 50Q52 66 38 72Q30 74 26 66" />
      <path d="M70 50Q82 60 92 56Q100 52 96 46" />
    </svg>
  );
}

export function Cartouche({ className, style }: P) {
  return (
    <svg viewBox="0 0 60 110" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="52" height="94" rx="12" fill="var(--color-cream)" />
      <rect x="10" y="10" width="40" height="82" rx="8" />
      <path d="M18 30Q26 16 38 22L43 19 41 26Q38 33 30 33Z" fill="currentColor" strokeWidth="1.5" />
      <ellipse cx="30" cy="48" rx="7" ry="9" />
      <path d="M30 57V82M20 66H40" />
      <path d="M17 90q4-5 8 0t8 0 8 0" strokeWidth="2.5" />
      <path d="M8 104H52" />
    </svg>
  );
}

export function Paperclip({ className, style }: P) {
  return (
    <svg viewBox="0 0 40 100" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 70V24a8 8 0 0 1 16 0v56a13 13 0 0 1-26 0V30" transform="translate(5 0)" />
    </svg>
  );
}
