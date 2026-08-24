import { useEffect, useRef } from "react";
import * as THREE from "three";

export function BrandOrbit() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 2),
      new THREE.MeshStandardMaterial({
        color: 0xf06a00,
        roughness: 0.38,
        metalness: 0.42,
        emissive: 0x2a1202,
        emissiveIntensity: 0.25
      })
    );
    scene.add(core);

    const rings = [2.05, 2.55, 3.05].map((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.012, 12, 128),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 + index * 0.035 })
      );
      ring.rotation.x = Math.PI / 2.6;
      ring.rotation.y = index * 0.72;
      scene.add(ring);
      return ring;
    });

    const dots = Array.from({ length: 36 }, (_, index) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(index % 5 === 0 ? 0.045 : 0.026, 12, 12),
        new THREE.MeshBasicMaterial({ color: index % 5 === 0 ? 0xf06a00 : 0xffffff })
      );
      const angle = (index / 36) * Math.PI * 2;
      const radius = 2.15 + (index % 3) * 0.42;
      dot.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.2) * 0.55, Math.sin(angle) * radius);
      scene.add(dot);
      return dot;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 1.3));
    const key = new THREE.PointLight(0xf06a00, 3.2, 12);
    key.position.set(3, 2, 4);
    scene.add(key);
    const fill = new THREE.PointLight(0xffffff, 1.1, 10);
    fill.position.set(-3, -2, 3);
    scene.add(fill);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame = 0;
    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      if (!reducedMotion) {
        core.rotation.x += 0.004;
        core.rotation.y += 0.006;
        rings.forEach((ring, index) => {
          ring.rotation.z += 0.0025 + index * 0.001;
        });
        dots.forEach((dot, index) => {
          dot.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0008;
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="h-full min-h-[280px] w-full" aria-hidden />;
}
