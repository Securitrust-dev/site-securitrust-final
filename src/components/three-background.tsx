'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.002);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    camera.position.y = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create point cloud
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Add connecting lines
    const lineGeo = new THREE.BufferGeometry();
    const linePos: number[] = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 60;
      linePos.push(x, y, z);
      linePos.push(
        x + (Math.random() - 0.5) * 5,
        y + (Math.random() - 0.5) * 5,
        z + (Math.random() - 0.5) * 5
      );
    }
    lineGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePos, 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x0ea5e9,
      opacity: 0.2,
      transparent: true,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0005;
      lines.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0"
      style={{ background: '#02040a', zIndex: -10 }}
    />
  );
}