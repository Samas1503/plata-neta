"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Textura de billete estilo ARS dibujada en canvas (procedural, sin assets).
function makeBillTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 224;
  const ctx = c.getContext("2d")!;

  // Fondo verde billete con degradado.
  const grad = ctx.createLinearGradient(0, 0, 512, 224);
  grad.addColorStop(0, "#0d9c72");
  grad.addColorStop(0.5, "#12b981");
  grad.addColorStop(1, "#0a8a63");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 224);

  // Guilloche simplificado: líneas onduladas.
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1.5;
  for (let row = 0; row < 8; row++) {
    ctx.beginPath();
    for (let x = 0; x <= 512; x += 4) {
      ctx.lineTo(x, 28 + row * 24 + Math.sin(x / 28 + row) * 8);
    }
    ctx.stroke();
  }

  // Marco interior.
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 3;
  ctx.strokeRect(14, 14, 484, 196);
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, 472, 184);

  // Círculo central con $.
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.arc(256, 112, 62, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0d9c72";
  ctx.font = "bold 84px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$", 256, 116);

  // Denominación en esquinas.
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "bold 44px Georgia, serif";
  ctx.fillText("1000", 78, 60);
  ctx.fillText("1000", 434, 60);
  ctx.font = "bold 26px Georgia, serif";
  ctx.fillText("PESOS", 256, 196);
  ctx.font = "16px Georgia, serif";
  ctx.fillText("PLATA·NETA", 78, 196);
  ctx.fillText("ARS", 434, 196);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Escena 3D del hero: monedas de oro + billetes ondeando.
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

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;

    const key = new THREE.DirectionalLight(0xfff4e0, 2.2);
    key.position.set(4, 6, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rim.position.set(-5, -2, -4);
    scene.add(rim);

    // Moneda de oro.
    const coinGeo = new THREE.CylinderGeometry(1, 1, 0.14, 64);
    const coinMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5c542,
      metalness: 1.0,
      roughness: 0.18,
      envMapIntensity: 1.4,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
    });

    // Billete: plano con segmentos para doblar/ondear + textura canvas.
    const billGeo = new THREE.PlaneGeometry(2.4, 1.05, 12, 6);
    const billTex = makeBillTexture();
    const billMat = new THREE.MeshPhysicalMaterial({
      map: billTex,
      metalness: 0.0,
      roughness: 0.55,
      envMapIntensity: 0.5,
      side: THREE.DoubleSide,
    });
    // Guardar vértices originales para la ondulación.
    const billBase = billGeo.attributes.position!.array.slice() as Float32Array;

    const items: { mesh: THREE.Mesh; kind: "coin" | "bill" }[] = [];
    const seeds = [
      { kind: "coin", p: [-3.4, 1.4, -1], s: 0.9 },
      { kind: "coin", p: [3.2, -0.8, -0.5], s: 1.1 },
      { kind: "bill", p: [1.8, 2.2, -1.5], s: 0.9 },
      { kind: "bill", p: [-2.2, -1.6, -0.8], s: 0.85 },
      { kind: "bill", p: [3.6, 1.6, -1.4], s: 0.65 },
      { kind: "bill", p: [-4, 0.2, -2.4], s: 0.7 },
    ] as const;
    for (const { kind, p, s } of seeds) {
      const mesh =
        kind === "coin"
          ? new THREE.Mesh(coinGeo, coinMat)
          : new THREE.Mesh(billGeo.clone(), billMat);
      mesh.position.set(p[0], p[1], p[2]);
      mesh.scale.setScalar(s);
      mesh.rotation.set(Math.random() * 3, Math.random() * 3, 0);
      scene.add(mesh);
      items.push({ mesh, kind });
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
      items.forEach(({ mesh, kind }, i) => {
        const seed = seeds[i];
        if (!seed) return;
        mesh.rotation.x += 0.003 + i * 0.001;
        mesh.rotation.y += 0.005;
        mesh.position.y = seed.p[1]! + Math.sin(t * 0.9 + i * 1.7) * 0.25;

        if (kind === "bill") {
          // Ondulación del billete: seno sobre el eje X del plano.
          const pos = mesh.geometry.attributes.position!;
          for (let v = 0; v < pos.count; v++) {
            const x = billBase[v * 3]!;
            const y = billBase[v * 3 + 1]!;
            pos.setZ(v, Math.sin(x * 2.2 + t * 2 + i) * 0.12 + Math.sin(y * 3 + t) * 0.04);
          }
          pos.needsUpdate = true;
          mesh.geometry.computeVertexNormals();
        }
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
      billGeo.dispose();
      coinMat.dispose();
      billMat.dispose();
      billTex.dispose();
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
