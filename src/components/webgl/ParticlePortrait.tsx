"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger, reduced } from "@/lib/gsap";
import { useUI } from "@/lib/store";

const vert = /* glsl */ `
  attribute vec3 aHome;
  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute float aRand;
  uniform float uProgress;
  uniform float uScroll;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uForce;
  uniform float uSize;
  uniform float uPR;
  uniform float uLight;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d0 = aRand * 0.45;
    float p = smoothstep(d0, d0 + 0.55, uProgress);
    vec3 pos = mix(aScatter, aHome, p);
    // breathing wobble once assembled
    pos.x += sin(uTime * 0.9 + aRand * 40.0) * 0.006 * p;
    pos.y += cos(uTime * 1.1 + aRand * 25.0) * 0.006 * p;
    // cursor repulsion
    vec2 dv = pos.xy - uMouse;
    float dist = length(dv);
    float f = smoothstep(0.42, 0.0, dist) * uForce;
    pos.xy += normalize(dv + 1e-5) * f * 0.28;
    pos.z += f * 0.45;
    // dissolve while scrolling away
    pos = mix(pos, aScatter * 1.4 + vec3(0.0, 0.8, 0.0), uScroll * uScroll);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPR * (1.0 + f * 1.6) / -mv.z;
    vec3 base = mix(aColor, aColor * 0.62 + vec3(0.02, 0.03, 0.12), uLight);
    vColor = base + f * mix(vec3(0.25, 0.3, 0.6), vec3(0.05, 0.1, 0.45), uLight);
    vAlpha = (0.35 + 0.65 * p) * (1.0 - uScroll * 0.85);
  }
`;
const frag = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.15, r) * vAlpha;
    gl_FragColor = vec4(vColor, a);
  }
`;

export function ParticlePortrait({ src, alt }: { src: string; alt: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const introDone = useUI((s) => s.introDone);
  const api = useRef<{ assemble: () => void } | null>(null);

  useEffect(() => {
    const host = wrap.current!, cv = canvas.current!;
    const still = reduced();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      host.classList.add("no-gl");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0, 4.2);
    const group = new THREE.Group();
    scene.add(group);

    const uniforms = {
      uProgress: { value: still ? 1 : 0 },
      uScroll: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uForce: { value: 0 },
      uSize: { value: 0 },
      uPR: { value: renderer.getPixelRatio() },
      uLight: { value: useUI.getState().theme === "light" ? 1 : 0 },
    };
    const unsub = useUI.subscribe((s) => {
      uniforms.uLight.value = s.theme === "light" ? 1 : 0;
      if (still && built) renderer.render(scene, camera);
    });
    let points: THREE.Points | null = null;
    let raf = 0, visible = true, alive = true, built = false;
    const mouse = new THREE.Vector2(9, 9), tilt = new THREE.Vector2(0, 0);
    let forceTarget = 0, rows = 220;
    const t0 = performance.now();

    const size = () => {
      const r = host.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
      // point diameter ~1.35x the grid spacing on screen (gl_PointSize divides by depth)
      const pxPerUnit = r.height / (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z);
      uniforms.uSize.value = pxPerUnit * (2.6 / rows) * 1.35 * camera.position.z;
    };

    const build = (img: HTMLImageElement) => {
      const small = window.innerWidth < 720;
      const W = small ? 120 : 170;
      const H = Math.round(W * (img.naturalHeight / img.naturalWidth));
      rows = H;
      const c2 = document.createElement("canvas");
      c2.width = W; c2.height = H;
      const ctx = c2.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, W, H);
      const px = ctx.getImageData(0, 0, W, H).data;
      const home: number[] = [], scat: number[] = [], col: number[] = [], rnd: number[] = [];
      const scale = 2.6 / H;
      const col3 = new THREE.Color();
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          if (px[i + 3] < 140) continue;
          const r = px[i] / 255, g = px[i + 1] / 255, b = px[i + 2] / 255;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          for (let k = 0; k < (small ? 1 : 1); k++) {
            const jx = (Math.random() - 0.5) * 0.6, jy = (Math.random() - 0.5) * 0.6;
            home.push((x + jx - W / 2) * scale, -(y + jy - H / 2) * scale - 0.05, (lum - 0.5) * 0.18);
            const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), rad = 2.2 + Math.random() * 2.6;
            scat.push(rad * Math.sin(ph) * Math.cos(th), rad * Math.sin(ph) * Math.sin(th) * 0.7, rad * Math.cos(ph) * 0.6 - 0.5);
            // lift shadows and tint toward the palette so the figure reads on navy
            col3.setRGB(r, g, b).lerp(new THREE.Color(0.55, 0.6, 1.0), 0.18);
            const lift = 0.12 + 0.18 * (1 - lum);
            col.push(Math.min(1, col3.r + lift * 0.6), Math.min(1, col3.g + lift * 0.7), Math.min(1, col3.b + lift));
            rnd.push(Math.random());
          }
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(home, 3));
      geo.setAttribute("aHome", new THREE.Float32BufferAttribute(home, 3));
      geo.setAttribute("aScatter", new THREE.Float32BufferAttribute(scat, 3));
      geo.setAttribute("aColor", new THREE.Float32BufferAttribute(col, 3));
      geo.setAttribute("aRand", new THREE.Float32BufferAttribute(rnd, 1));
      const mat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, transparent: true, depthWrite: false, blending: THREE.NormalBlending });
      points = new THREE.Points(geo, mat);
      group.add(points);
      built = true;
      useUI.getState().setParticles(rnd.length);
      host.classList.add("ready");
      size();
      renderer.render(scene, camera);
      if (!still) loop();
    };

    const loop = () => {
      if (!alive) return;
      raf = 0;
      if (!visible || !built) return;
      const t = (performance.now() - t0) / 1000;
      uniforms.uTime.value = t;
      uniforms.uForce.value += (forceTarget - uniforms.uForce.value) * 0.08;
      (uniforms.uMouse.value as THREE.Vector2).lerp(mouse, 0.18);
      group.rotation.y += (tilt.x * 0.35 - group.rotation.y) * 0.05;
      group.rotation.x += (-tilt.y * 0.2 - group.rotation.x) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    api.current = {
      assemble: () => {
        if (still) return;
        gsap.to(uniforms.uProgress, { value: 1, duration: 2.6, ease: "power3.inOut", delay: 0.15 });
      },
    };

    const img = new Image();
    img.decoding = "async";
    img.onload = () => build(img);
    img.src = src;

    // pointer -> plane z=0 in group space (approx, ignoring the small tilt)
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      const hView = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      mouse.set(nx * hView * camera.aspect * 0.5, ny * hView * 0.5);
      tilt.set(nx, ny);
      forceTarget = 1;
    };
    const onLeave = () => { forceTarget = 0; tilt.set(0, 0); mouse.set(9, 9); };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && built && !still) loop();
    });
    io.observe(host);
    const ro = new ResizeObserver(() => { size(); if (still && built) renderer.render(scene, camera); });
    ro.observe(host);

    let st: ScrollTrigger | undefined;
    if (!still) {
      st = ScrollTrigger.create({
        trigger: host, start: "top top+=80", end: "bottom top",
        onUpdate: (s) => { uniforms.uScroll.value = s.progress; },
      });
    }

    return () => {
      alive = false;
      unsub();
      if (raf) cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect(); st?.kill();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      points?.geometry.dispose();
      (points?.material as THREE.Material | undefined)?.dispose();
      renderer.dispose();
    };
  }, [src]);

  useEffect(() => {
    if (introDone) {
      // the image may still be loading; retry briefly until the scene exists
      let n = 0;
      const t = setInterval(() => { if (api.current || n++ > 40) { api.current?.assemble(); clearInterval(t); } }, 50);
      return () => clearInterval(t);
    }
  }, [introDone]);

  return (
    <div className="portrait-gl" ref={wrap} data-cursor="Move">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="pg-fallback" src={src} alt={alt} width={874} height={1142} />
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  );
}
