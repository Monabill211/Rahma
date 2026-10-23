import GlassTunnel, { type GlassItem } from "../GlassTunnel";

const DEMO_ITEMS: GlassItem[] = [
  {
    id: "01",
    title: "Neural Aesthetics",
    meta: "01 / Generative Systems",
    palette: ["#093033", "#15a39c", "#5affd5"],
  },
  {
    id: "02",
    title: "Quantum Optics",
    meta: "02 / WebGL Shaders",
    palette: ["#240b36", "#c31432", "#ff758f"],
  },
  {
    id: "03",
    title: "Spatial Audio",
    meta: "03 / Interactive Rig",
    palette: ["#0f172a", "#3b82f6", "#93c5fd"],
  },
  {
    id: "04",
    title: "Kinetic Typography",
    meta: "04 / Signed Distance Fields",
    palette: ["#1f1135", "#7a5cff", "#ffd166"],
  },
];

export default function Page() {
  return (
    <main>
      <GlassTunnel items={DEMO_ITEMS} />
    </main>
  );
}