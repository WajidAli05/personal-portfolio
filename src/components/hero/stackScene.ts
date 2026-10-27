import * as THREE from "three";
import { clamp, lerp, smoothstep } from "@/lib/motion";

// A six-layer "system stack" drawn like a technical drawing: paper slabs with
// graphite edges and line-art motifs, one cobalt highlight. Everything in the
// scene is a pure function of scroll progress p, so nothing animates on its own.

const INK = new THREE.Color("#11161C");
const INK2 = new THREE.Color("#4A5561");
const COBALT = new THREE.Color("#2D3BF0");
const PAPER = new THREE.Color("#F3F5F7");

const W = 4.4; // slab width (x)
const D = 3.0; // slab depth (z)
const T = 0.14; // slab thickness

type Seg = number[]; // flat xyz pairs

function rect(s: Seg, x0: number, z0: number, x1: number, z1: number) {
  s.push(x0, 0, z0, x1, 0, z0, x1, 0, z0, x1, 0, z1, x1, 0, z1, x0, 0, z1, x0, 0, z1, x0, 0, z0);
}
function line(s: Seg, x0: number, z0: number, x1: number, z1: number) {
  s.push(x0, 0, z0, x1, 0, z1);
}
function circle(s: Seg, cx: number, cz: number, r: number, n = 28, rz = r) {
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = ((i + 1) / n) * Math.PI * 2;
    s.push(cx + Math.cos(a0) * r, 0, cz + Math.sin(a0) * rz, cx + Math.cos(a1) * r, 0, cz + Math.sin(a1) * rz);
  }
}

// Motif builders return [graphite segments, cobalt segments].
const motifs: Array<() => [Seg, Seg]> = [
  // 0 Interface: sidebar, header, cards, a chart line
  () => {
    const g: Seg = [], c: Seg = [];
    rect(g, -2.0, -1.3, -1.35, 1.3);
    for (let i = 0; i < 5; i++) line(g, -1.9, -1.05 + i * 0.3, -1.45, -1.05 + i * 0.3);
    rect(g, -1.15, -1.3, 2.0, -0.95);
    for (let i = 0; i < 3; i++) rect(g, -1.15 + i * 1.07, -0.75, -0.2 + i * 1.07, -0.15);
    rect(g, -1.15, 0.05, 2.0, 1.3);
    const pts = [0.95, 0.75, 0.82, 0.48, 0.58, 0.3, 0.42, 0.22];
    for (let i = 0; i < pts.length - 1; i++) line(c, -1.0 + i * 0.4, pts[i] + 0.25, -0.6 + i * 0.4, pts[i + 1] + 0.25);
    return [g, c];
  },
  // 1 API: routes with arrowheads
  () => {
    const g: Seg = [], c: Seg = [];
    for (let i = 0; i < 5; i++) {
      const z = -1.0 + i * 0.5;
      line(g, -1.8, z, 1.6, z);
      line(g, 1.6, z, 1.45, z - 0.09);
      line(g, 1.6, z, 1.45, z + 0.09);
      rect(g, -2.0, z - 0.1, -1.8, z + 0.1);
    }
    rect(c, 1.7, -1.15, 2.0, 1.15);
    return [g, c];
  },
  // 2 Roles: four role nodes through one gate
  () => {
    const g: Seg = [], c: Seg = [];
    for (let i = 0; i < 4; i++) {
      const z = -1.05 + i * 0.7;
      (i === 1 ? circle(c, -1.5, z, 0.2) : circle(g, -1.5, z, 0.2));
      line(g, -1.3, z, -0.25, 0);
    }
    rect(c, -0.25, -0.35, 0.45, 0.35);
    line(g, 0.45, 0, 1.2, 0);
    rect(g, 1.2, -0.8, 2.0, 0.8);
    for (let i = 0; i < 4; i++) line(g, 1.3, -0.55 + i * 0.36, 1.9, -0.55 + i * 0.36);
    return [g, c];
  },
  // 3 Encrypted records: ciphertext rows around a padlock
  () => {
    const g: Seg = [], c: Seg = [];
    for (let row = 0; row < 7; row++) {
      let x = -2.0;
      const z = -1.2 + row * 0.4;
      let k = row * 7 + 3;
      while (x < 1.9) {
        k = (k * 37 + 11) % 97;
        const len = 0.12 + (k % 5) * 0.06;
        if (!(x > -0.55 && x < 0.55 && z > -0.6 && z < 0.7)) line(g, x, z, Math.min(1.95, x + len), z);
        x += len + 0.1;
      }
    }
    rect(c, -0.35, -0.05, 0.35, 0.5);
    circle(c, 0, -0.05, 0.22, 16, 0.3);
    return [g, c];
  },
  // 4 Audit chain: linked blocks, each with a hash stroke
  () => {
    const g: Seg = [], c: Seg = [];
    for (let i = 0; i < 6; i++) {
      const x = -1.95 + i * 0.68;
      rect(g, x, -0.3, x + 0.45, 0.3);
      line(g, x + 0.08, 0.18, x + 0.37, -0.18);
      if (i < 5) line(g, x + 0.45, 0, x + 0.68, 0);
    }
    for (let i = 0; i < 6; i++) line(g, -1.95 + i * 0.68, -0.85, -1.5 + i * 0.68, -0.85);
    rect(c, -2.0, 0.75, 2.0, 1.05);
    return [g, c];
  },
  // 5 Backups: stacked discs and a clock arc
  () => {
    const g: Seg = [], c: Seg = [];
    for (let i = 0; i < 3; i++) circle(g, -0.9, -0.3 + i * 0.32, 0.8, 40, 0.3);
    line(g, -1.7, -0.3, -1.7, 0.34);
    line(g, -0.1, -0.3, -0.1, 0.34);
    circle(c, 1.1, 0, 0.62, 32);
    line(c, 1.1, 0, 1.1, -0.42);
    line(c, 1.1, 0, 1.4, 0.12);
    return [g, c];
  },
];

type Layer = {
  group: THREE.Group;
  fill: THREE.MeshBasicMaterial;
  edge: THREE.LineBasicMaterial;
  motif: THREE.LineBasicMaterial;
  accent: THREE.LineBasicMaterial;
};

export class StackScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  private layers: Layer[] = [];
  private spine: THREE.LineSegments;
  private pulses: THREE.Points;
  private chainLinks: THREE.Mesh[] = [];
  private w = 1;
  private h = 1;
  private shiftX = 1.5;

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const slabGeo = new THREE.BoxGeometry(W, T, D);
    const edgeGeo = new THREE.EdgesGeometry(slabGeo);

    motifs.forEach((build, i) => {
      const group = new THREE.Group();
      const fill = new THREE.MeshBasicMaterial({ color: PAPER, transparent: true, opacity: 0.94, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, depthWrite: true });
      const edge = new THREE.LineBasicMaterial({ color: INK.clone(), transparent: true, opacity: 0.9 });
      const motif = new THREE.LineBasicMaterial({ color: INK2.clone(), transparent: true, opacity: 0.85 });
      const accent = new THREE.LineBasicMaterial({ color: COBALT.clone(), transparent: true, opacity: 0.95 });
      group.add(new THREE.Mesh(slabGeo, fill));
      group.add(new THREE.LineSegments(edgeGeo, edge));
      const [g, c] = build();
      const mg = new THREE.BufferGeometry();
      mg.setAttribute("position", new THREE.Float32BufferAttribute(g, 3));
      const ml = new THREE.LineSegments(mg, motif);
      ml.position.y = T / 2 + 0.004;
      group.add(ml);
      const cg = new THREE.BufferGeometry();
      cg.setAttribute("position", new THREE.Float32BufferAttribute(c, 3));
      const cl = new THREE.LineSegments(cg, accent);
      cl.position.y = T / 2 + 0.006;
      group.add(cl);
      this.scene.add(group);
      this.layers.push({ group, fill, edge, motif, accent });
    });

    // Audit chain: six small plates that fill in cobalt as the chain is "written".
    const linkGeo = new THREE.PlaneGeometry(0.45, 0.6);
    linkGeo.rotateX(-Math.PI / 2);
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(linkGeo, new THREE.MeshBasicMaterial({ color: COBALT, transparent: true, opacity: 0 }));
      m.position.set(-1.95 + i * 0.68 + 0.225, T / 2 + 0.002, 0);
      this.layers[4].group.add(m);
      this.chainLinks.push(m);
    }

    // Corner spine: dashed drafting lines connecting the slabs.
    const sg = new THREE.BufferGeometry();
    sg.setAttribute("position", new THREE.Float32BufferAttribute(new Array(4 * 2 * 3).fill(0), 3));
    this.spine = new THREE.LineSegments(sg, new THREE.LineDashedMaterial({ color: INK2, dashSize: 0.08, gapSize: 0.08, transparent: true, opacity: 0.55 }));
    this.scene.add(this.spine);

    // Request pulses riding the API routes.
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.Float32BufferAttribute(new Array(10 * 3).fill(0), 3));
    this.pulses = new THREE.Points(pg, new THREE.PointsMaterial({ color: COBALT, size: 0.11, sizeAttenuation: true }));
    this.layers[1].group.add(this.pulses);
  }

  resize(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w / h < 1.25 ? 38 : 30;
    this.camera.updateProjectionMatrix();
    // Keep the action lane right of the copy column on wide screens.
    this.shiftX = w / h > 1.5 ? 1.75 : w / h > 1.2 ? 1.25 : 0.4;
  }

  /** Index of the layer the camera is reading, 0..5 (continuous). */
  static focus(p: number) {
    return clamp((p - 0.06) / 0.76, 0, 1) * 5;
  }

  render(p: number) {
    const open = smoothstep(p, 0.0, 0.2);
    const close = smoothstep(p, 0.84, 0.97);
    const gap = lerp(lerp(0.62, 1.75, open), 0.36, close);
    const fi = StackScene.focus(p);

    this.layers.forEach((L, i) => {
      L.group.position.y = -i * gap;
      const near = Math.exp(-Math.abs(i - fi) * 0.75);
      const vis = lerp(0.3 + 0.7 * near, 1, close);
      const active = lerp(clamp(1 - Math.abs(i - fi) * 1.4, 0, 1), 0, close);
      L.edge.color.copy(INK).lerp(COBALT, active);
      L.edge.opacity = 0.35 + 0.6 * vis;
      L.fill.opacity = 0.55 + 0.4 * vis;
      L.motif.opacity = 0.2 + 0.7 * vis;
      L.accent.opacity = 0.25 + 0.7 * vis;
      // a gentle turn of each slab as it passes, settling flat at the end
      L.group.rotation.y = lerp((i - fi) * 0.035, 0, close);
    });

    // spine corners
    const pos = this.spine.geometry.getAttribute("position") as THREE.BufferAttribute;
    const top = 0, bottom = -5 * gap;
    const cs = [[-W / 2, -D / 2], [W / 2, -D / 2], [W / 2, D / 2], [-W / 2, D / 2]];
    cs.forEach(([x, z], k) => {
      pos.setXYZ(k * 2, x, top, z);
      pos.setXYZ(k * 2 + 1, x, bottom, z);
    });
    pos.needsUpdate = true;
    this.spine.computeLineDistances();
    (this.spine.material as THREE.LineDashedMaterial).opacity = lerp(0.55, 0.2, close);

    // API pulses travel with scroll
    const pp = this.pulses.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let k = 0; k < 10; k++) {
      const lane = k % 5;
      const f = (p * 3.2 + k * 0.137 + lane * 0.21) % 1;
      pp.setXYZ(k, lerp(-1.8, 1.6, f), T / 2 + 0.02, -1.0 + lane * 0.5);
    }
    pp.needsUpdate = true;

    // audit chain fills block by block through band 4
    const chainP = clamp((p - 0.66) / 0.18, 0, 1) * 6;
    this.chainLinks.forEach((m, k) => {
      (m.material as THREE.MeshBasicMaterial).opacity = clamp(chainP - k, 0, 1) * 0.28;
    });

    // camera path
    const targetY = lerp(-fi * gap, -2.5 * gap, close);
    const radius = lerp(9.4, 14.2, close);
    const elev = lerp(lerp(0.78, 0.5, open), 0.42, close);
    const az = lerp(lerp(-0.7, 0.35, fi / 5), 0.55, close);
    const target = new THREE.Vector3(0, targetY, 0);
    const cam = new THREE.Vector3(
      Math.sin(az) * Math.cos(elev) * radius,
      Math.sin(elev) * radius,
      Math.cos(az) * Math.cos(elev) * radius,
    ).add(target);
    this.camera.position.copy(cam);
    this.camera.lookAt(target);
    this.camera.updateMatrixWorld();
    // slide the view so the stack sits right of center
    const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0);
    const shift = right.multiplyScalar(-this.shiftX * lerp(1, 1.4, close));
    this.camera.position.add(shift);
    this.camera.lookAt(target.clone().add(shift));

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose?.();
    });
    this.renderer.dispose();
  }
}
