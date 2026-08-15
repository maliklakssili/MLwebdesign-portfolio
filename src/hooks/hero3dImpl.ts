import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const FONT_URL = "/fonts/optimer_regular.typeface.json";

export async function initHero3D(container: HTMLDivElement, accentColor: string, text: string) {
  const accent = new THREE.Color(accentColor);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  Object.assign(renderer.domElement.style, { display: "block", width: "100%", height: "100%" });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
  camera.position.set(0, 0, 26);

  scene.add(new THREE.AmbientLight(0x6b7080, 0.85));
  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(-8, 12, 16);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xa9b4c8, 0.55);
  fill.position.set(10, -6, 8);
  scene.add(fill);
  const rim = new THREE.PointLight(accent, 90, 60);
  rim.position.set(9, 4, -8);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  const font = await new FontLoader().loadAsync(FONT_URL);
  const geo = new TextGeometry(text, {
    font,
    size: 4,
    depth: 0.7,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.055,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const w = bb.max.x - bb.min.x;
  const h = bb.max.y - bb.min.y;
  geo.translate(-(bb.min.x + w / 2), -(bb.min.y + h / 2), -0.55);

  const material = new THREE.MeshStandardMaterial({ color: 0xe9e7e2, roughness: 0.38, metalness: 0.22 });
  const mesh = new THREE.Mesh(geo, material);
  group.add(mesh);

  const mouse = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const onMove = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  if (fine) window.addEventListener("pointermove", onMove, { passive: true });

  function resize() {
    const rect = container.getBoundingClientRect();
    const cw = Math.max(rect.width, 1);
    const ch = Math.max(rect.height, 1);
    renderer.setSize(cw, ch, false);
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
    const visW = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect;
    const visH = visW / camera.aspect;
    const target = Math.min((visW * (cw < 640 ? 0.56 : 0.44)) / w, (visH * 0.3) / h);
    group.scale.setScalar(target);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  let raf = 0;
  const t0 = performance.now();
  let running = true;
  const io = new IntersectionObserver(([en]) => {
    running = en.isIntersecting;
  }, { threshold: 0 });
  io.observe(container);

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (!running) return;
    const t = (now - t0) / 1000;
    const ambY = Math.sin(t * 0.32) * (fine ? 0.13 : 0.32);
    const ambX = Math.sin(t * 0.21) * 0.055;
    cur.x += (mouse.x - cur.x) * 0.045;
    cur.y += (mouse.y - cur.y) * 0.045;
    group.rotation.y = ambY + cur.x * 0.42;
    group.rotation.x = ambX + cur.y * 0.22;
    group.position.x = cur.x * 0.5;
    group.position.y = -cur.y * 0.3 + Math.sin(t * 0.5) * 0.12;
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("pointermove", onMove);
    geo.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
