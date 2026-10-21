"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Escena 3D del hero: monedas y gemas flotando sobre el gradiente.
export function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 6, 8);
    scene.add(key);
    const fill = new THREE.PointLight(0x34d399, 40);
    fill.position.set(-6, -3, 4);
    scene.add(fill);

    // "Moneda": cilindro achatado, metálico, verde esmeralda (plata).
    const coinGeo = new THREE.CylinderGeometry(1, 1, 0.14, 48);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.85,
      roughness: 0.25,
    });
    const gemGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.4,
      roughness: 0.15,
      flatShading: true,
    });

    const items: THREE.Mesh[] = [];
    const seeds = [
      { g: coinGeo, m: coinMat, p: [-3.4, 1.4, -1], s: 0.9 },
      { g: coinGeo, m: coinMat, p: [3.2, -0.8, -0.5], s: 1.2 },
      { g: coinGeo, m: coinMat, p: [1.8, 2.2, -2], s: 0.6 },
      { g: gemGeo, m: gemMat, p: [-2.2, -1.6, -0.8], s: 0.8 },
      { g: gemGeo, m: gemMat, p: [3.6, 1.6, -1.4], s: 0.55 },
      { g: gemGeo, m: gemMat, p: [-4, 0.2, -2.4], s: 0.5 },
    ] as const;
    for (const { g, m, p, s } of seeds) {
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(p[0], p[1], p[2]);
      mesh.scale.setScalar(s);
      mesh.rotation.set(Math.random() * 3, Math.random() * 3, 0);
      scene.add(mesh);
      items.push(mesh);
    }

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      items.forEach((mesh, i) => {
        const seed = seeds[i];
        if (!seed) return;
        mesh.rotation.x += 0.004 + i * 0.001;
        mesh.rotation.y += 0.006;
        mesh.position.y = seed.p[1]! + Math.sin(t * 0.9 + i * 1.7) * 0.25;
      });
      camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      coinGeo.dispose();
      gemGeo.dispose();
      coinMat.dispose();
      gemMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}
