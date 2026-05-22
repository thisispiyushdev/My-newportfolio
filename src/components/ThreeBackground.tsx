"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 35;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const mountElement = mountRef.current;
    if (mountElement) {
      mountElement.appendChild(renderer.domElement);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 2, 100); // Cyan light
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9d4edd, 2, 100); // Purple light
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    // Objects
    // Surrounding Starfield
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a shell/cloud
      const radius = 25 + Math.random() * 50;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i+2] = radius * Math.cos(phi);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xcbff00, // Cyberlime particles
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    // Interaction & Animation state
    // Scroll Velocity Tracker
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity = delta;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    const clock = new THREE.Clock();

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth decay scroll velocity
      scrollVelocity *= 0.95;

      // Particles orbit
      particleMesh.rotation.y = elapsedTime * 0.015;
      particleMesh.rotation.x = elapsedTime * 0.01;

      // Warp camera and speed up on scroll velocity
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 35 - Math.min(Math.abs(scrollVelocity) * 0.15, 15), 0.1);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      if (mountElement && mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-500 bg-radial-light dark:bg-radial-dark"
    />
  );
}
