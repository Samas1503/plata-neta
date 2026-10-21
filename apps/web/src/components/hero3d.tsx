"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Escena 3D del hero: monedas y gemas con materiales físicos + env map.
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // Environment map para reflejos realistas (RoomEnvironment, sin HDR externo).
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;

    const key = new THREE.DirectionalLight(0xfff4e0, 2.2);
    key.position.set(4, 6, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rim.position.set(-5, -2, -4);
    scene.add(rim);

    // Moneda: oro/pesos con bevel — físico, no plástico.
    const coinGeo = new THREE.CylinderGeometry(1, 1, 0.14, 64);
    const coinMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5c542,
      metalness: 1.0,
      roughness: 0.18,
      envMapIntensity: 1.4,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
    });
    // Gema: vidrio cristal con transmisión.
    const gemGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x7dd3fc,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 1.2,
      ior: 1.45,
      envMapIntensity: 1.6,
      flatShading: true,
    });
    // Esmeralda mate para contraste.
    const emeraldMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      metalness: 0.3,
      roughness: 0.4,
      envMapIntensity: 0.8,
      sheen: 0.5,
      sheenColor: 0x6ee7b7,
    });

    const items: THREE.Mesh[] = [];
    const seeds = [
      { g: coinGeo, m: coinMat, p: [-3.4, 1.4, -1], s: 0.9 },
      { g: coinGeo, m: coinMat, p: [3.2, -0.8, -0.5], s: 1.2 },
      { g: coinGeo, m: coinMat, p: [1.8, 2.2, -2], s: 0.6 },
      { g: gemGeo, m: gemMat, p: [-2.2, -1.6, -0.8], s: 0.8 },
      { g: gemGeo, m: emeraldMat, p: [3.6, 1.6, -1.4], s: 0.55 },
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
      emeraldMat.dispose();
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_center,black_40%,transparent_100%)]"
      aria-hidden="true"
    />
  );
}
