'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LaptopScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000510, 10, 100);

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x1a2332, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x70e1f5, 1.5);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -10;
    mainLight.shadow.camera.right = 10;
    mainLight.shadow.camera.top = 10;
    mainLight.shadow.camera.bottom = -10;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x70e1f5, 0.5, 20);
    fillLight.position.set(0, 2, 5);
    scene.add(fillLight);

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 200;
      starPositions[i + 1] = Math.random() * 100 + 20;
      starPositions[i + 2] = (Math.random() - 0.5) * 200;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Lunar ground with roughness
    const groundGeometry = new THREE.PlaneGeometry(50, 50, 100, 100);
    const vertices = groundGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i + 2] = Math.random() * 0.3 - 0.15 + Math.sin(vertices[i] * 0.5) * 0.2;
    }
    groundGeometry.computeVertexNormals();
    
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2e35,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: false
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Lunar mountains (low poly)
    const createMountain = (x: number, z: number, height: number, scale: number) => {
      const mountainGeometry = new THREE.ConeGeometry(scale, height, 6);
      const vertices = mountainGeometry.attributes.position.array;
      for (let i = 0; i < vertices.length; i += 3) {
        vertices[i] += (Math.random() - 0.5) * scale * 0.3;
        vertices[i + 1] += (Math.random() - 0.5) * height * 0.2;
        vertices[i + 2] += (Math.random() - 0.5) * scale * 0.3;
      }
      mountainGeometry.computeVertexNormals();
      
      const mountainMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a3e45,
        roughness: 0.95,
        metalness: 0.05,
        flatShading: true
      });
      const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
      mountain.position.set(x, height / 2, z);
      mountain.castShadow = true;
      mountain.receiveShadow = true;
      return mountain;
    };

    scene.add(createMountain(-8, -15, 6, 4));
    scene.add(createMountain(-12, -12, 5, 3.5));
    scene.add(createMountain(10, -18, 7, 5));
    scene.add(createMountain(15, -14, 5.5, 4));
    scene.add(createMountain(-6, -20, 4, 3));

    // Rocks scattered on ground
    const createRock = (x: number, z: number, size: number) => {
      const rockGeometry = new THREE.DodecahedronGeometry(size, 0);
      const vertices = rockGeometry.attributes.position.array;
      for (let i = 0; i < vertices.length; i += 3) {
        vertices[i] *= 0.7 + Math.random() * 0.6;
        vertices[i + 1] *= 0.7 + Math.random() * 0.6;
        vertices[i + 2] *= 0.7 + Math.random() * 0.6;
      }
      rockGeometry.computeVertexNormals();
      
      const rockMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a3e45,
        roughness: 0.9,
        metalness: 0.1,
        flatShading: true
      });
      const rock = new THREE.Mesh(rockGeometry, rockMaterial);
      rock.position.set(x, size / 2, z);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true;
      rock.receiveShadow = true;
      return rock;
    };

    const rockPositions = [
      [-3, 2, 0.3], [4, 3, 0.25], [-2, 4, 0.35], [3, 1, 0.2],
      [-1, -1, 0.15], [2, -2, 0.2], [-4, -1, 0.25]
    ];
    rockPositions.forEach(([x, z, size]) => scene.add(createRock(x, z, size)));

    // Laptop - Screen (with glow)
    const screenGeometry = new THREE.BoxGeometry(2.8, 1.8, 0.05);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x70e1f5,
      emissiveIntensity: 0.3
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 1.5, 0);
    screen.rotation.x = -0.3;
    screen.castShadow = true;
    scene.add(screen);

    // Screen display with "SAGE" text simulation
    const displayGeometry = new THREE.PlaneGeometry(2.6, 1.6);
    const displayMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      emissive: 0x70e1f5,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.5
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, 1.5, 0.03);
    display.rotation.x = -0.3;
    scene.add(display);

    // Screen glow
    const glowGeometry = new THREE.PlaneGeometry(3, 2);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x70e1f5,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0, 1.5, 0.05);
    glow.rotation.x = -0.3;
    scene.add(glow);

    // Laptop keyboard base
    const baseGeometry = new THREE.BoxGeometry(2.9, 0.15, 2);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.4,
      metalness: 0.7
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 0.575, 0.8);
    base.castShadow = true;
    base.receiveShadow = true;
    scene.add(base);

    // Keyboard details
    const keyboardGeometry = new THREE.PlaneGeometry(2.6, 1.6);
    const keyboardMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.6,
      metalness: 0.3
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.65, 0.8);
    keyboard.rotation.x = -Math.PI / 2;
    scene.add(keyboard);

    // Planet in background
    const planetGeometry = new THREE.SphereGeometry(8, 32, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a2332,
      roughness: 0.8,
      metalness: 0.2,
      emissive: 0x0a1520,
      emissiveIntensity: 0.2
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(20, 15, -50);
    scene.add(planet);

    // Planet ring
    const ringGeometry = new THREE.TorusGeometry(10, 0.3, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.5,
      metalness: 0.5,
      transparent: true,
      opacity: 0.6,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.2
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.copy(planet.position);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 20;
      particlePositions[i + 1] = Math.random() * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x70e1f5,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate planet slowly
      planet.rotation.y += 0.001;
      ring.rotation.z += 0.002;

      // Float particles
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Screen glow pulsing
      displayMaterial.emissiveIntensity = 0.6 + Math.sin(time * 2) * 0.2;
      glowMaterial.opacity = 0.2 + Math.sin(time * 2) * 0.1;

      // Gentle camera sway
      camera.position.x = Math.sin(time * 0.3) * 0.3;
      camera.position.y = 3 + Math.sin(time * 0.5) * 0.2;
      camera.lookAt(0, 1, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
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
      className="w-full h-full"
      style={{ minHeight: '500px' }}
    />
  );
}
