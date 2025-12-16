'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PhoneScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000510);
    scene.fog = new THREE.Fog(0x000510, 10, 50);

    const camera = new THREE.PerspectiveCamera(
      35,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: false, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 10, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0x70e1f5, 1.5, 20);
    fillLight.position.set(-5, 3, 5);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0x70e1f5, 2);
    rimLight.position.set(0, 5, -5);
    rimLight.angle = Math.PI / 6;
    rimLight.penumbra = 0.5;
    scene.add(rimLight);

    // Starfield background
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 100;
      starPositions[i + 1] = (Math.random() - 0.5) * 100;
      starPositions[i + 2] = (Math.random() - 0.5) * 50 - 20;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Phone group
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);

    // Phone body (black frame) - using standard BoxGeometry
    const phoneBodyGeometry = new THREE.BoxGeometry(3, 6, 0.3, 4, 4, 4);
    const phoneBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.3,
      metalness: 0.8
    });
    const phoneBody = new THREE.Mesh(phoneBodyGeometry, phoneBodyMaterial);
    phoneBody.castShadow = true;
    phoneBody.receiveShadow = true;
    phoneGroup.add(phoneBody);

    // Phone screen (glowing)
    const screenGeometry = new THREE.PlaneGeometry(2.7, 5.5);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      emissive: 0x70e1f5,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.2
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.16;
    phoneGroup.add(screen);

    // Dynamic Island (notch)
    const islandGeometry = new THREE.CapsuleGeometry(0.4, 0.15, 4, 8);
    islandGeometry.rotateZ(Math.PI / 2);
    const islandMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.2,
      metalness: 0.8
    });
    const island = new THREE.Mesh(islandGeometry, islandMaterial);
    island.position.set(0, 2.4, 0.17);
    phoneGroup.add(island);

    // Screen glow effect
    const glowGeometry = new THREE.PlaneGeometry(3.2, 6);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x70e1f5,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = 0.17;
    phoneGroup.add(glow);

    // UI Card on screen (credit score card simulation)
    const cardGeometry = new THREE.PlaneGeometry(2.3, 1.8, 1, 1);
    const cardMaterial = new THREE.MeshStandardMaterial({
      color: 0x70e1f5,
      emissive: 0x70e1f5,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: 0.9
    });
    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    card.position.set(0, 0.5, 0.18);
    phoneGroup.add(card);

    // Bottom navigation bar simulation
    const navBarGeometry = new THREE.PlaneGeometry(2.5, 0.6);
    const navBarMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0.8,
      roughness: 0.4
    });
    const navBar = new THREE.Mesh(navBarGeometry, navBarMaterial);
    navBar.position.set(0, -2.5, 0.18);
    phoneGroup.add(navBar);

    // Nav icons (3 small spheres)
    const iconGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const iconMaterial = new THREE.MeshStandardMaterial({
      color: 0x70e1f5,
      emissive: 0x70e1f5,
      emissiveIntensity: 0.5
    });
    [-0.6, 0, 0.6].forEach((x) => {
      const icon = new THREE.Mesh(iconGeometry, iconMaterial);
      icon.position.set(x, -2.5, 0.19);
      phoneGroup.add(icon);
    });

    // Floating particles around phone
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 150;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 3;
      particlePositions[i] = Math.cos(angle) * radius;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = Math.sin(angle) * radius;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x70e1f5,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Circular rings around phone
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(5 + i * 1.5, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x70e1f5,
        transparent: true,
        opacity: 0.2 - i * 0.05,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -i * 0.3;
      scene.add(ring);
    }

    // Floating cubes (data visualization)
    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const cubeGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
      const cubeMaterial = new THREE.MeshStandardMaterial({
        color: 0x70e1f5,
        emissive: 0x70e1f5,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      const angle = (i / 8) * Math.PI * 2;
      cube.position.set(
        Math.cos(angle) * 5,
        Math.sin(i * 0.5) * 2,
        Math.sin(angle) * 5
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(cube);
      cubes.push(cube);
    }

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate phone group gently
      phoneGroup.rotation.y = Math.sin(time * 0.3) * 0.1;
      phoneGroup.rotation.x = Math.sin(time * 0.2) * 0.05;

      // Float phone up and down
      phoneGroup.position.y = Math.sin(time * 0.5) * 0.3;

      // Screen pulsing glow
      screenMaterial.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.2;
      cardMaterial.emissiveIntensity = 0.4 + Math.sin(time * 3) * 0.15;
      glowMaterial.opacity = 0.15 + Math.sin(time * 2) * 0.05;

      // Rotate particles
      particles.rotation.y += 0.001;

      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(time + i) * 0.005;
      });

      // Gentle camera movement
      camera.position.x = Math.sin(time * 0.2) * 0.5;
      camera.position.y = Math.sin(time * 0.3) * 0.5;
      camera.lookAt(0, 0, 0);

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