'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCylinderLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;
    cameraRef.current = camera;

    // Renderer setup - Optimized for performance
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    // Limit pixel ratio to 2 for better performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Light - Simplified
    const light = new THREE.PointLight(0xffffff, 1.5, 2.9);
    light.position.set(0, 0.75, 2);
    scene.add(light);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      'https://qfihegeffntsxrwhvnlm.supabase.co/storage/v1/object/sign/Video_securitrust/Logo-SecuriTrust-bleu-blanc-768x158.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYzAxOTEwZS02NzNlLTQ3ZmUtYTFjMC01MzlmYmQxOTczNTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJWaWRlb19zZWN1cml0cnVzdC9Mb2dvLVNlY3VyaVRydXN0LWJsZXUtYmxhbmMtNzY4eDE1OC5wbmciLCJpYXQiOjE3NjQ1ODk2OTYsImV4cCI6MjA3OTk0OTY5Nn0.WyYj0TVh8sqyK3EqrftBj7iE6ctcqtfupXbu3uaLe2c',
      (texture) => {
        // Configure texture
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 7);
        texture.rotation = Math.PI * 0.5;

        // Create material
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        });

        // Create geometry - OPTIMIZED: Reduced segments from 64,64 to 32,32 for better performance
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32, 32, true);

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.z = Math.PI * -0.5;
        meshRef.current = mesh;
        scene.add(mesh);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (meshRef.current.material instanceof THREE.Material) {
          meshRef.current.material.dispose();
        }
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[400px]"
      style={{ background: 'transparent' }}
    />
  );
};