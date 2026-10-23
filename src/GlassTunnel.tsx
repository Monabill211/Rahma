"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "framer-motion";

export type GlassItem = {
  id: string;
  title: string;
  meta?: string;
  /** Three hex colors that drive the card's fluid, iridescent surface. */
  palette: [string, string, string];
};

export type GlassTunnelProps = {
  items: GlassItem[];
  className?: string;
};

const SPACING = 7; // z distance between cards
const START_Z = 6; // camera start; also the "in focus" distance
const ASPECT = 1.5; // card width / height
const BG = "#071a1c";

/* ------------------------------------------------------------------ */
/* Card surface shader: domain-warped noise + rounded-rect SDF + glitch */
/* ------------------------------------------------------------------ */
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime, uFocus, uVelocity, uSeed, uAspect, uDim, uVis;
  uniform vec3 uA, uB, uC;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }
  
  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 uv = vUv;

    // Glitch: while scrolling fast, slices slide sideways and the image pixelates
    float band = floor(uv.y * 26.0 + uSeed);
    float slice = step(0.62, hash(vec2(band, uSeed)));
    float jitter = (hash(vec2(band, floor(uTime * 9.0))) - 0.5) * uVelocity * 0.10;
    uv.x += jitter * slice;
    uv = mix(uv, floor(uv * 52.0 + 0.5) / 52.0, clamp(uVelocity * 0.5, 0.0, 0.8));

    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    float t = uTime * 0.14;
    vec2 q = vec2(fbm(p * 2.0 + t + uSeed), fbm(p * 2.0 - t + 4.0 + uSeed));
    float n = fbm(p * 2.6 + q * 1.9 + t);

    vec3 col = mix(uA, uB, smoothstep(0.2, 0.7, n));
    col = mix(col, uC, smoothstep(0.5, 0.95, q.x * n * 1.9));
    col += 0.12 * cos(6.2831 * (n * 2.0 + vec3(0.0, 0.33, 0.67) + uTime * 0.05)); // iridescence
    col *= 0.55 + 0.6 * uFocus; // brighter when it is the card you are looking at
    col *= uDim;

    // Rounded-rect mask + glowing glass rim
    float d = roundedBox((vUv - 0.5) * vec2(uAspect, 1.0), vec2(uAspect, 1.0) * 0.5, 0.09);
    float aa = max(fwidth(d), 0.002);
    float mask = 1.0 - smoothstep(-aa, aa, d);
    float rim = smoothstep(-0.035, 0.0, d) * mask;
    col += rim * 0.7;

    col *= 0.95 + 0.05 * sin(vUv.y * 700.0); // faint scanlines

    float alpha = mask * mix(0.5, 0.92, uFocus) * uVis;
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

function createUniforms(
  palette: [string, string, string],
  seed: number,
  dim: number
): Record<string, THREE.IUniform> {
  return {
    uTime: { value: 0 },
    uFocus: { value: 0 },
    uVelocity: { value: 0 },
    uVis: { value: 1 },
    uSeed: { value: seed * 7.31 },
    uAspect: { value: ASPECT },
    uDim: { value: dim },
    uA: { value: new THREE.Color(palette[0]) },
    uB: { value: new THREE.Color(palette[1]) },
    uC: { value: new THREE.Color(palette[2]) },
  };
}

/* ------------------------------ Card ------------------------------ */
type Layout = { w: number; xOff: number; font: number };
type RigState = { velocity: number };

function GlassCard({
  item,
  index,
  layout,
  rig,
  calm,
}: {
  item: GlassItem;
  index: number;
  layout: Layout;
  rig: React.MutableRefObject<RigState>;
  calm: boolean;
}) {
  const group = useRef<THREE.Group>(null!);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const titleRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metaRef = useRef<any>(null);

  // Initialize uniform objects once per card instance so references stay stable
  const front = useMemo(() => createUniforms(item.palette, index, 1), [index]); // eslint-disable-line react-hooks/exhaustive-deps
  const back = useMemo(() => createUniforms(item.palette, index + 3, 0.35), [index]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update colors dynamically if palette prop changes
  useEffect(() => {
    for (const u of [front, back]) {
      (u.uA.value as THREE.Color).set(item.palette[0]);
      (u.uB.value as THREE.Color).set(item.palette[1]);
      (u.uC.value as THREE.Color).set(item.palette[2]);
    }
  }, [item.palette, front, back]);

  const w = layout.w;
  const h = w / ASPECT;
  const z = -index * SPACING;
  const sign = index % 2 === 1 ? 1 : -1; // card 0 is centered, then right, left, right...
  const x = index === 0 ? 0 : sign * layout.xOff;
  const baseY = (((index * 37) % 5) - 2) * 0.18;
  const rotY = index === 0 ? 0 : -sign * 0.38;
  const pad = w * 0.07;

  useFrame((state) => {
    if (!group.current) return;

    const d = state.camera.position.z - z; // distance in front of the camera
    const focus = 1 - THREE.MathUtils.smoothstep(Math.abs(d - START_Z), 0, 6);
    const near = THREE.MathUtils.smoothstep(d, 1.2, 3.2); // fade as the camera passes through
    const far = 1 - THREE.MathUtils.smoothstep(d, 14, 24);
    const vis = near * far;

    group.current.visible = vis > 0.01;
    if (!group.current.visible) return;

    const t = state.clock.elapsedTime * (calm ? 0.3 : 1);
    group.current.position.y = baseY + Math.sin(t * 0.6 + index * 1.7) * 0.12;
    group.current.rotation.y = rotY + (calm ? 0 : state.pointer.x * 0.08);
    group.current.scale.setScalar(0.88 + 0.12 * focus);

    for (const u of [front, back]) {
      u.uTime.value = t;
      u.uFocus.value = focus;
      u.uVelocity.value = calm ? 0 : rig.current.velocity;
      u.uVis.value = vis;
    }

    const textOpacity = vis * (0.3 + 0.7 * focus);
    if (titleRef.current) titleRef.current.fillOpacity = textOpacity;
    if (metaRef.current) metaRef.current.fillOpacity = textOpacity * 0.85;
  });

  return (
    <group ref={group} position={[x, baseY, z]} rotation={[0, rotY, 0]}>
      {/* back layer: gives the stacked-glass look */}
      <mesh position={[0.08, -0.06, -0.16]} scale={0.96} renderOrder={1}>
        <planeGeometry args={[w, h]} />
        <shaderMaterial
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={back}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* front surface */}
      <mesh renderOrder={2}>
        <planeGeometry args={[w, h]} />
        <shaderMaterial
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={front}
          transparent
          depthWrite={false}
        />
      </mesh>

      <Text
        ref={titleRef}
        position={[-w / 2 + pad, h * 0.06, 0.03]}
        anchorX="left"
        anchorY="middle"
        fontSize={0.36 * layout.font}
        maxWidth={w - pad * 2}
        lineHeight={1.05}
        letterSpacing={0.03}
        color="white"
        renderOrder={3}
        material-depthWrite={false}
      >
        {item.title.toUpperCase()}
      </Text>

      {item.meta && (
        <Text
          ref={metaRef}
          position={[-w / 2 + pad, -h / 2 + pad, 0.03]}
          anchorX="left"
          anchorY="bottom"
          fontSize={0.13 * layout.font}
          letterSpacing={0.06}
          color="#e8fffb"
          renderOrder={3}
          material-depthWrite={false}
        >
          {item.meta.toUpperCase()}
        </Text>
      )}
    </group>
  );
}

/* --------------------------- Particles ---------------------------- */
function Particles({ count = 1800, depth }: { count?: number; depth: number }) {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const palette = ["#37ffd4", "#ff4fd8", "#7a5cff", "#ffd166"].map(
      (h) => new THREE.Color(h)
    );
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16;
      p[i * 3 + 1] = (Math.random() - 0.5) * 9;
      p[i * 3 + 2] = 8 - Math.random() * depth;
      palette[Math.floor(Math.random() * palette.length)].toArray(c, i * 3);
    }
    return { positions: p, colors: c };
  }, [count, depth]);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.1) * 0.03;
    }
  });

  return (
    <points ref={ref} key={depth}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ----------------------- Camera rig (scroll) ---------------------- */
function Rig({
  progress,
  total,
  rig,
  calm,
}: {
  progress: MotionValue<number>;
  total: number;
  rig: React.MutableRefObject<RigState>;
  calm: boolean;
}) {
  useFrame((state, dt) => {
    const cam = state.camera;
    const steps = Math.max(0, total - 1);
    const target = START_Z - progress.get() * steps * SPACING;
    const prev = cam.position.z;
    cam.position.z = THREE.MathUtils.damp(prev, target, 3.5, dt);

    // scroll speed -> drives the glitch strength on the cards
    const speed = Math.abs(cam.position.z - prev) / Math.max(dt, 1e-3);
    rig.current.velocity = THREE.MathUtils.damp(
      rig.current.velocity,
      Math.min(speed / 6, 1.5),
      6,
      dt
    );

    const px = calm ? 0 : state.pointer.x * 0.5;
    const py = calm ? 0 : state.pointer.y * 0.3;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, px, 3, dt);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, py, 3, dt);
    cam.lookAt(cam.position.x * 0.4, cam.position.y * 0.4, cam.position.z - 10);
  });
  return null;
}

/* ------------------------------ Scene ----------------------------- */
function Scene({
  items,
  progress,
  calm,
}: {
  items: GlassItem[];
  progress: MotionValue<number>;
  calm: boolean;
}) {
  const { size, camera } = useThree();
  const portrait = size.width / size.height < 1;
  const rig = useRef<RigState>({ velocity: 0 });
  const layout: Layout = portrait
    ? { w: 3.4, xOff: 0.45, font: 0.72 }
    : { w: 4.8, xOff: 1.9, font: 1 };

  useEffect(() => {
    if ("fov" in camera) {
      camera.fov = portrait ? 62 : 45;
      camera.updateProjectionMatrix();
    }
  }, [camera, portrait]);

  return (
    <>
      <color attach="background" args={[BG]} />
      <Rig progress={progress} total={items.length} rig={rig} calm={calm} />
      <Particles depth={Math.max(1, items.length) * SPACING + 20} />
      {items.map((item, i) => (
        <GlassCard
          key={item.id}
          item={item}
          index={i}
          layout={layout}
          rig={rig}
          calm={calm}
        />
      ))}
    </>
  );
}

/* ------------------------- Public component ----------------------- */
export default function GlassTunnel({ items, className = "" }: GlassTunnelProps) {
  const wrapper = useRef<HTMLElement>(null);
  const calm = !!useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (items.length <= 1) return;
    setActive(Math.round(v * (items.length - 1)));
  });

  if (!items || items.length === 0) return null;

  return (
    <section
      ref={wrapper}
      style={{ height: `${items.length * 90 + 100}svh`, backgroundColor: BG }}
      className={`relative ${className}`}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 45, near: 0.1, far: 80, position: [0, 0, START_Z] }}
        >
          <Scene items={items} progress={scrollYProgress} calm={calm} />
        </Canvas>

        {/* UI layer */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 font-mono text-xs text-[#d9fff6] sm:p-8">
          <div className="flex justify-end">
            <nav className="pointer-events-auto flex items-center gap-4 rounded-full border border-white/20 bg-black/30 px-5 py-2 backdrop-blur">
              <a href="#work" className="hover:opacity-70">
                Work
              </a>
              <span aria-hidden className="h-px w-6 bg-white/40" />
              <a href="#contact" className="hover:opacity-70">
                Contact
              </a>
            </nav>
          </div>

          <div className="flex items-end justify-between">
            <ol className="hidden space-y-2 sm:block">
              {items.map((it, i) => (
                <li
                  key={it.id}
                  className={`transition-opacity duration-300 ${
                    i === active ? "opacity-100" : "opacity-35"
                  }`}
                >
                  {it.title}
                </li>
              ))}
            </ol>
            <p
              className={`ml-auto transition-opacity duration-500 ${
                active === 0 ? "opacity-70" : "opacity-0"
              }`}
            >
              Scroll to move through
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}