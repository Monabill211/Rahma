import type { GlassItem } from "@/components/GlassTunnel";

export type Project = GlassItem & {
  /** Folder color in the "all projects" stack. */
  paper: "cream" | "lime" | "pink" | "teal";
  blurb: string;
  /** Path inside /public, e.g. "/projects/noor/logo.png". Leave empty to show a monogram placeholder. */
  logo?: string;
  colors: { name: string; hex: string }[];
  fonts: { name: string; family: string; weight: number }[];
  /** Brand applications. Add `src` (a path inside /public) to replace the placeholder. */
  mockups: { label: string; ratio: string; src?: string }[];
};

const font = {
  display: { name: "Poppins ExtraBold", family: "var(--font-poppins)", weight: 800 },
  body: { name: "Outfit Regular", family: "var(--font-outfit)", weight: 400 },
  script: { name: "Kaushan Script", family: "var(--font-kaushan)", weight: 400 },
};

const mockups = () => [
  { label: "Poster", ratio: "3 / 4" },
  { label: "Business card", ratio: "7 / 4" },
  { label: "Social post", ratio: "1 / 1" },
  { label: "Packaging", ratio: "4 / 5" },
];

// Placeholder projects: replace titles, copy, colors and images with the real ones.
export const projects: Project[] = [
  {
    id: "p1",
    title: "Noor Cafe",
    meta: "Brand identity, 2026",
    palette: ["#6a3a9f", "#26606e", "#f74b92"],
    paper: "cream",
    blurb: "A neighborhood cafe that wanted to feel warm, a little playful and impossible to walk past.",
    colors: [
      { name: "Purple", hex: "#6a3a9f" },
      { name: "Teal", hex: "#26606e" },
      { name: "Hot pink", hex: "#f74b92" },
      { name: "Cream", hex: "#f3ebe3" },
    ],
    fonts: [font.display, font.script],
    mockups: mockups(),
  },
  {
    id: "p2",
    title: "Midnight Market",
    meta: "Poster series, 2026",
    palette: ["#26606e", "#6a3a9f", "#c4ec69"],
    paper: "lime",
    blurb: "A night market poster series with one rule: every poster has to glow from across the street.",
    colors: [
      { name: "Teal", hex: "#26606e" },
      { name: "Purple", hex: "#6a3a9f" },
      { name: "Lime", hex: "#c4ec69" },
      { name: "Cream", hex: "#f3ebe3" },
    ],
    fonts: [font.display, font.body],
    mockups: mockups(),
  },
  {
    id: "p3",
    title: "Sphinx Studio",
    meta: "Illustration, 2025",
    palette: ["#6a3a9f", "#f74b92", "#26606e"],
    paper: "cream",
    blurb: "Hand-drawn characters and icons for a creative studio, built to be reused on anything.",
    colors: [
      { name: "Purple", hex: "#6a3a9f" },
      { name: "Hot pink", hex: "#f74b92" },
      { name: "Teal", hex: "#26606e" },
      { name: "Cream", hex: "#f3ebe3" },
    ],
    fonts: [font.script, font.body],
    mockups: mockups(),
  },
  {
    id: "p4",
    title: "Ankh Records",
    meta: "Packaging, 2025",
    palette: ["#26606e", "#f74b92", "#6a3a9f"],
    paper: "pink",
    blurb: "Vinyl sleeves and merch for an indie label with a love for ancient symbols.",
    colors: [
      { name: "Teal", hex: "#26606e" },
      { name: "Hot pink", hex: "#f74b92" },
      { name: "Purple", hex: "#6a3a9f" },
      { name: "Cream", hex: "#f3ebe3" },
    ],
    fonts: [font.display, font.script],
    mockups: mockups(),
  },
  {
    id: "p5",
    title: "Cairo Sessions",
    meta: "Social media, 2025",
    palette: ["#6a3a9f", "#26606e", "#c4ec69"],
    paper: "teal",
    blurb: "A template system for a live music series, so every announcement looks like it belongs.",
    colors: [
      { name: "Purple", hex: "#6a3a9f" },
      { name: "Teal", hex: "#26606e" },
      { name: "Lime", hex: "#c4ec69" },
      { name: "Cream", hex: "#f3ebe3" },
    ],
    fonts: [font.display, font.body],
    mockups: mockups(),
  },
];
