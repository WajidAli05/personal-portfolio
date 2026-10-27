"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { reduced } from "@/lib/gsap";

export type City = { name: string; lat: number; lon: number; home?: boolean };

const toVec = (lat: number, lon: number, r = 1) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

const arcVert = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() { vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const arcFrag = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform vec3 uColor;
  varying float vT;
  void main() {
    float head = fract(uTime * 0.28 + uOffset);
    float d = head - vT;
    float trail = smoothstep(0.32, 0.0, d) * step(0.0, d);
    float a = 0.38 + trail * 0.9;
    gl_FragColor = vec4(uColor + trail * 0.35, a);
  }
`;
const atmoVert = /* glsl */ `
  varying vec3 vN;
  void main() { vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const atmoFrag = /* glsl */ `
  varying vec3 vN;
  void main() { float i = pow(0.72 - dot(vN, vec3(0.0, 0.0, 1.0)), 3.0); gl_FragColor = vec4(0.35, 0.55, 1.0, 1.0) * i; }
`;

export function Globe({ cities }: { cities: City[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = wrap.current!, cv = canvas.current!;
    const still = reduced();
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); }
    catch { host.classList.add("no-gl"); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0, 5.3);
    const globe = new THREE.Group();
    scene.add(globe);

    // occluding core + rim glow
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(0.985, 64, 64), new THREE.MeshBasicMaterial({ color: 0x080c1c })));
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.18, 64, 64), new THREE.ShaderMaterial({ vertexShader: atmoVert, fragmentShader: atmoFrag, blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false }));
    scene.add(atmo);

    const home = cities.find((c) => c.home)!;
    const H = toVec(home.lat, home.lon, 1.0);
    const arcMats: THREE.ShaderMaterial[] = [];
    const rings: THREE.Mesh[] = [];

    // markers + arcs
    cities.forEach((c, idx) => {
      const p = toVec(c.lat, c.lon, 1.003);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(c.home ? 0.022 : 0.016, 16, 16), new THREE.MeshBasicMaterial({ color: c.home ? 0x4fdcff : 0xa5abff }));
      dot.position.copy(p);
      globe.add(dot);
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.038, 40), new THREE.MeshBasicMaterial({ color: c.home ? 0x4fdcff : 0xa5abff, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
      ring.position.copy(p.clone().multiplyScalar(1.002));
      ring.lookAt(p.clone().multiplyScalar(2));
      ring.userData.phase = idx * 0.37;
      globe.add(ring);
      rings.push(ring);
      if (c.home) return;
      const B = toVec(c.lat, c.lon, 1.0);
      const pts: THREE.Vector3[] = [];
      const ts: number[] = [];
      const N = 90;
      const angle = H.angleTo(B);
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const v = new THREE.Vector3().copy(H).lerp(B, t).normalize();
        v.multiplyScalar(1 + Math.sin(Math.PI * t) * (0.12 + angle * 0.12));
        pts.push(v);
        ts.push(t);
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const tube = new THREE.TubeGeometry(curve, 120, 0.0065, 6, false);
      const uv = tube.getAttribute("uv") as THREE.BufferAttribute;
      const aT = new Float32Array(uv.count);
      for (let i = 0; i < uv.count; i++) aT[i] = uv.getX(i);
      tube.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
      const m = new THREE.ShaderMaterial({ vertexShader: arcVert, fragmentShader: arcFrag, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uTime: { value: 0 }, uOffset: { value: idx * 0.31 }, uColor: { value: new THREE.Color(0x8fa0ff) } } });
      arcMats.push(m);
      globe.add(new THREE.Mesh(tube, m));
    });

    // land dots
    let raf = 0, visible = false, alive = true;
    const render = () => renderer.render(scene, camera);
    fetch("/data/land.bin").then((r) => r.arrayBuffer()).then((buf) => {
      if (!alive) return;
      const a = new Int16Array(buf);
      const pos = new Float32Array((a.length / 2) * 3);
      for (let i = 0; i < a.length / 2; i++) {
        const v = toVec(a[i * 2] / 100, a[i * 2 + 1] / 100, 1.0);
        pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      globe.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xb4bcff, size: 0.02, sizeAttenuation: true, transparent: true, opacity: 0.95 })));
      host.classList.add("ready");
      render();
    }).catch(() => host.classList.add("ready"));

    // face the arcs: rotate so the midpoint between home and the far cities faces the camera
    const baseY = -((home.lon + 180) * Math.PI) / 180 + Math.PI / 2 + 0.25;
    globe.rotation.set(0.32, baseY, 0);

    const size = () => {
      const r = host.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
      render();
    };
    size();

    // drag to spin, with inertia; slow auto-rotation otherwise
    let dragging = false, lastX = 0, lastY = 0, vy = 0, vx = 0, spinY = 0, spinX = 0;
    const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; host.setPointerCapture(e.pointerId); host.classList.add("grabbing"); };
    const move = (e: PointerEvent) => { if (!dragging) return; vy = (e.clientX - lastX) * 0.006; vx = (e.clientY - lastY) * 0.004; lastX = e.clientX; lastY = e.clientY; spinY += vy; spinX = Math.max(-0.6, Math.min(0.6, spinX + vx)); if (still) { globe.rotation.y = baseY + spinY; globe.rotation.x = 0.32 + spinX; render(); } };
    const up = () => { dragging = false; host.classList.remove("grabbing"); };
    host.addEventListener("pointerdown", down);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", up);

    const t0 = performance.now();
    const loop = () => {
      raf = 0;
      if (!alive || !visible) return;
      const t = (performance.now() - t0) / 1000;
      if (!dragging) { vy *= 0.94; vx *= 0.9; spinY += vy + 0.0009; spinX *= 0.985; }
      globe.rotation.y = baseY + spinY;
      globe.rotation.x = 0.32 + spinX;
      arcMats.forEach((m) => (m.uniforms.uTime.value = t));
      rings.forEach((r) => { const k = (t * 0.6 + r.userData.phase) % 1; r.scale.setScalar(1 + k * 2.2); (r.material as THREE.MeshBasicMaterial).opacity = 1 - k; });
      render();
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !still && !raf) loop(); });
    io.observe(host);
    const ro = new ResizeObserver(size);
    ro.observe(host);
    if (still) { arcMats.forEach((m) => (m.uniforms.uTime.value = 1.2)); render(); }

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointercancel", up);
      scene.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose?.(); const mat = m.material as THREE.Material | undefined; mat?.dispose?.(); });
      renderer.dispose();
    };
  }, [cities]);

  return (
    <div className="globe" ref={wrap} data-cursor="Drag" role="img" aria-label="A globe with arcs from Islamabad to client cities: Miami, Melbourne and Doha">
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  );
}
