"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/accueil-v2/ui/button";
import logoContours from "@/assets/accueil-v2/securitrust-logo-contours.json";

function CyberShield({ paused, colors, onReady }: { paused: boolean; colors: [string, string, string]; onReady: () => void }) {
  const group = useRef<THREE.Group>(null);
  const clock = useRef(0);
  const ready = useRef(false);
  const { shield, lines, points, texture } = useMemo(() => {
    const shapes = logoContours.filter(contour => !contour.hole).map(contour => {
      const shape = new THREE.Shape();
      contour.points.forEach((point, index) => {
        const x = point[0] ?? 0; const y = point[1] ?? 0;
        if (index === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
      });
      shape.closePath();
      return shape;
    });
    for (const contour of logoContours.filter(contour => contour.hole)) {
      const hole = new THREE.Path();
      contour.points.forEach((point, index) => {
        const x = point[0] ?? 0; const y = point[1] ?? 0;
        if (index === 0) hole.moveTo(x, y); else hole.lineTo(x, y);
      });
      hole.closePath();
      const first = contour.points[0];
      const owner = shapes.find(shape => first && THREE.ShapeUtils.isClockWise(shape.getPoints()) !== THREE.ShapeUtils.isClockWise(hole.getPoints()));
      owner?.holes.push(hole);
    }
    const geometry = new THREE.ExtrudeGeometry(shapes, { depth: 0.28, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.012, bevelThickness: 0.018 });
    const dots: THREE.Vector3[] = [];
    for (let i = 0; i < 44; i++) {
      const angle = i * 2.399;
      const radius = 2.5 + (i % 5) * 0.27;
      dots.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.78, -0.4 - (i % 4) * 0.35));
    }
    const connections: number[] = [];
    dots.forEach((point, i) => dots.slice(i + 1).forEach(other => {
      if (point.distanceTo(other) < 1.8) connections.push(...point.toArray(), ...other.toArray());
    }));
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(connections, 3));
    const pointGeometry = new THREE.BufferGeometry().setFromPoints(dots);
    const surface = document.createElement("canvas"); surface.width = 256; surface.height = 256;
    const ctx = surface.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#808080"; ctx.fillRect(0, 0, 256, 256);
      for (let y = 0; y < 256; y += 4) { ctx.fillStyle = y % 8 ? "#707070" : "#909090"; ctx.fillRect(0, y, 256, 1); }
    }
    const map = new THREE.CanvasTexture(surface); map.wrapS = map.wrapT = THREE.RepeatWrapping;
    return { shield: geometry, lines: lineGeometry, points: pointGeometry, texture: map };
  }, []);
  useEffect(() => () => { shield.dispose(); lines.dispose(); points.dispose(); texture.dispose(); }, [shield, lines, points, texture]);
  useFrame((state, delta) => {
    if (!ready.current) { ready.current = true; onReady(); }
    if (!group.current || paused) return;
    clock.current += Math.min(delta, 0.05);
    const targetY = -0.32 + state.pointer.x * 0.18;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * 0.09, 3, delta);
    group.current.position.y = Math.sin(clock.current * 0.55) * 0.09;
  });
  return <>
    <ambientLight intensity={0.7} />
    <directionalLight position={[3, 5, 6]} intensity={3} color={colors[0]} />
    <pointLight position={[-4, -2, 3]} intensity={12} color={colors[1]} />
    <Environment resolution={64}><Lightformer position={[0, 4, 3]} scale={[8, 4, 1]} intensity={3} /><Lightformer position={[-4, 0, 2]} rotation-y={Math.PI / 3} scale={[4, 8, 1]} color={colors[0]} intensity={4} /></Environment>
    <group ref={group} rotation={[0, -0.32, -0.08]}>
      <lineSegments geometry={lines}><lineBasicMaterial color={colors[0]} transparent opacity={0.32} /></lineSegments>
      <points geometry={points}><pointsMaterial size={0.055} color={colors[0]} sizeAttenuation /></points>
      <mesh geometry={shield}><meshStandardMaterial color={colors[0]} metalness={0.55} roughness={0.3} roughnessMap={texture} /></mesh>
    </group>
  </>;
}

export default function CyberScene() {
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [colors, setColors] = useState<[string, string, string] | null>(null);
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const canvas = document.createElement("canvas"); canvas.width = 1; canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resolve = (token: string) => {
      ctx.fillStyle = css.getPropertyValue(token).trim(); ctx.fillRect(0, 0, 1, 1);
      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    };
    setColors([resolve("--accent"), resolve("--success"), resolve("--cyber-metal")]);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(media.matches);
  }, []);
  return <div className="cyber-scene" data-scene-ready={ready || undefined}>
    {colors && <Canvas camera={{ position: [0, 0, 8.7], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} aria-label="Logo SecuriTrust en trois dimensions" frameloop={paused ? "demand" : "always"}>
      <CyberShield paused={paused} colors={colors} onReady={() => setReady(true)} />
    </Canvas>}
    <Button variant="ghost" size="icon" className="scene-motion" aria-label={paused ? "Animer le bouclier" : "Mettre l’animation en pause"} title={paused ? "Animer le bouclier" : "Mettre l’animation en pause"} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</Button>
  </div>;
}