import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";
import { drawFront, drawBack, loadFonts } from "../lib/cardTextures";
import { P, pageUrl } from "../data";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function Card3D({ ready }) {
  const mount = useRef(null);
  const intro = useRef({ k: 0 });
  const gyro = useRef(null);
  const [hint, setHint] = useState(true);
  const [needsGyro, setNeedsGyro] = useState(false);
  const [gyroOn, setGyroOn] = useState(false);

  useEffect(() => {
    const el = mount.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = el.clientWidth;
    let h = el.clientHeight;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(36, w / h, 0.1, 100);
    cam.position.set(0, 0, 7.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    // reflections for the metal
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.PointLight(0xff7a2a, 38, 30);
    key.position.set(4, 3, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xffffff, 28, 30);
    rim.position.set(-5, -3, 5);
    scene.add(rim);

    // card body – credit-card ratio
    const CW = 5.2, CH = (CW * 54) / 85.6, CD = 0.07, R = 0.28;
    const shape = new THREE.Shape();
    const x = -CW / 2, y = -CH / 2;
    shape.moveTo(x + R, y);
    shape.lineTo(x + CW - R, y);
    shape.quadraticCurveTo(x + CW, y, x + CW, y + R);
    shape.lineTo(x + CW, y + CH - R);
    shape.quadraticCurveTo(x + CW, y + CH, x + CW - R, y + CH);
    shape.lineTo(x + R, y + CH);
    shape.quadraticCurveTo(x, y + CH, x, y + CH - R);
    shape.lineTo(x, y + R);
    shape.quadraticCurveTo(x, y, x + R, y);

    const bodyGeo = new THREE.ExtrudeGeometry(shape, {
      depth: CD, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 3, curveSegments: 24,
    });
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x15151b, metalness: 0.95, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.z = -CD / 2;

    const faceGeo = new THREE.ShapeGeometry(shape, 24);
    const pos = faceGeo.attributes.position;
    const uv = [];
    for (let i = 0; i < pos.count; i++) uv.push((pos.getX(i) + CW / 2) / CW, (pos.getY(i) + CH / 2) / CH);
    faceGeo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));

    const TW = 1024, TH = Math.round((1024 * 54) / 85.6);
    const mk = () => {
      const c = document.createElement("canvas");
      c.width = TW; c.height = TH;
      return c;
    };
    const cf = mk(), cb = mk();
    const tf = new THREE.CanvasTexture(cf), tb = new THREE.CanvasTexture(cb);
    [tf, tb].forEach((t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; });

    let photo = null;
    let logo = null;
    const paint = () => {
      drawFront(cf.getContext("2d"), TW, TH, photo, logo);
      drawBack(cb.getContext("2d"), TW, TH, pageUrl(), logo);
      tf.needsUpdate = true; tb.needsUpdate = true;
    };
    paint();
    let disposed = false;
    const im = new Image();
    im.onload = () => { photo = im; if (!disposed) paint(); };
    im.src = P.photo;
    const lg = new Image();
    lg.onload = () => { logo = lg; if (!disposed) paint(); };
    lg.src = P.logo;
    loadFonts().then(() => !disposed && paint());

    const faceMat = (t) =>
      new THREE.MeshPhysicalMaterial({ map: t, roughness: 0.42, metalness: 0.2, clearcoat: 0.5, clearcoatRoughness: 0.3, envMapIntensity: 0.7 });
    const frontMat = faceMat(tf), backMat = faceMat(tb);
    const front = new THREE.Mesh(faceGeo, frontMat);
    front.position.z = CD / 2 + 0.02;
    const back = new THREE.Mesh(faceGeo, backMat);
    back.rotation.y = Math.PI;
    back.position.z = -CD / 2 - 0.02;

    const group = new THREE.Group();
    group.add(body, front, back);
    scene.add(group);

    // ambient particles
    const N = 70;
    const pg = new THREE.BufferGeometry();
    const pp = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pp[i * 3] = (Math.random() - 0.5) * 14;
      pp[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pp[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    const pmat = new THREE.PointsMaterial({ color: 0xff7a2a, size: 0.045, transparent: true, opacity: 0.7 });
    const pts = new THREE.Points(pg, pmat);
    scene.add(pts);

    // interaction state
    let tx = 0, ty = 0, rx = 0, ry = 0, spinT = 0, spin = 0;
    let drag = false, lx = 0, ly = 0, downX = 0, downT = 0, auto = true, flipped = false, autoTimer;
    const cvs = renderer.domElement;
    cvs.style.touchAction = "pan-y";

    const down = (e) => {
      drag = true; auto = false; lx = downX = e.clientX; ly = e.clientY; downT = performance.now();
      setHint(false);
      cvs.setPointerCapture?.(e.pointerId);
    };
    const move = (e) => {
      if (!drag) return;
      ty += (e.clientX - lx) * 0.012;
      tx = clamp(tx + (e.clientY - ly) * 0.006, -0.6, 0.6);
      lx = e.clientX; ly = e.clientY;
    };
    const up = (e) => {
      if (!drag) return;
      drag = false;
      if (Math.abs(e.clientX - downX) < 6 && performance.now() - downT < 280) {
        flipped = !flipped;
        ty = flipped ? Math.PI : 0;
      } else {
        const n = Math.round(ty / Math.PI);
        ty = n * Math.PI;
        flipped = Math.abs(n) % 2 === 1;
      }
      tx = 0;
      clearTimeout(autoTimer);
      autoTimer = setTimeout(() => (auto = true), 2500);
    };
    cvs.addEventListener("pointerdown", down);
    cvs.addEventListener("pointermove", move);
    cvs.addEventListener("pointerup", up);
    cvs.addEventListener("pointercancel", up);

    // device tilt
    const orient = (e) => {
      if (drag || e.gamma == null) return;
      tx = clamp((e.beta - 50) * 0.01, -0.4, 0.4);
      spinT = clamp(e.gamma * 0.012, -0.5, 0.5);
    };
    const enableTilt = async () => {
      try {
        if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
          const r = await DeviceOrientationEvent.requestPermission();
          if (r !== "granted") return;
        }
        window.addEventListener("deviceorientation", orient);
        setGyroOn(true);
        setNeedsGyro(false);
      } catch { /* denied */ }
    };
    gyro.current = enableTilt;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (typeof DeviceOrientationEvent !== "undefined" && "ontouchstart" in window) {
      if (isIOS && typeof DeviceOrientationEvent.requestPermission === "function") setNeedsGyro(true);
      else {
        window.addEventListener("deviceorientation", orient);
        setGyroOn(true);
      }
    }

    // render loop (paused off-screen)
    let visible = true, raf;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    const t0 = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = (performance.now() - t0) / 1000;
      const k = intro.current.k;
      spin += (spinT - spin) * 0.08;
      ry += (ty + spin - ry) * 0.08;
      rx += (tx - rx) * 0.08;
      const wob = auto && !reduce ? 1 : 0;
      group.rotation.y = ry + wob * Math.sin(t * 0.7) * 0.22 + (1 - k) * -2.4;
      group.rotation.x = rx + wob * Math.cos(t * 0.5) * 0.05 + (1 - k) * 0.6;
      group.scale.setScalar(0.2 + 0.8 * k);
      group.position.y = reduce ? 0 : Math.sin(t * 1.2) * 0.08;
      key.position.x = 4 * Math.cos(t * 0.6);
      key.position.y = 3 * Math.sin(t * 0.4);
      pts.rotation.y = t * 0.03;
      renderer.render(scene, cam);
    };
    loop();

    const onResize = () => {
      w = el.clientWidth; h = el.clientHeight;
      renderer.setSize(w, h);
      cam.aspect = w / h;
      cam.position.z = w < 380 ? 8.4 : 7.6;
      cam.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(autoTimer);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("deviceorientation", orient);
      cvs.removeEventListener("pointerdown", down);
      cvs.removeEventListener("pointermove", move);
      cvs.removeEventListener("pointerup", up);
      cvs.removeEventListener("pointercancel", up);
      [bodyGeo, faceGeo, pg].forEach((g) => g.dispose());
      [bodyMat, frontMat, backMat, pmat].forEach((m) => m.dispose());
      [tf, tb, envTex].forEach((t) => t.dispose());
      pmrem.dispose();
      renderer.dispose();
      el.contains(cvs) && el.removeChild(cvs);
    };
  }, []);

  // intro animation once the splash is gone
  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tw = gsap.to(intro.current, { k: 1, duration: reduce ? 0.01 : 1.7, ease: "expo.out" });
    return () => tw.kill();
  }, [ready]);

  return (
    <div className="stage" ref={mount}>
      <div className="stage-glow" />
      <div className="hint" style={{ opacity: hint && ready ? 1 : 0 }}>
        DRAG TO ROTATE · TAP TO FLIP
      </div>
      {needsGyro && !gyroOn && (
        <button className="tilt-btn" onClick={() => gyro.current?.()}>
          Enable tilt
        </button>
      )}
    </div>
  );
}
