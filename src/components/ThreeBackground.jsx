import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Particles creation
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700; // number of particles
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      // Spread particles around
      posArray[i] = (Math.random() - 0.5) * 120;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x10B981, // Emerald 500
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

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

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.95;

      // Smooth mouse follow
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      particleMesh.rotation.y += 0.05 * (targetX - particleMesh.rotation.y);
      particleMesh.rotation.x += 0.05 * (targetY - particleMesh.rotation.x);
      
      // Base rotation + Scroll velocity warp
      particleMesh.rotation.z += 0.001 + (scrollVelocity * 0.0001);
      
      // Camera Z movement based on velocity (hyper-drive effect)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 40 - (Math.abs(scrollVelocity) * 0.1), 0.1);
      // Clamp camera Z
      if (camera.position.z < 10) camera.position.z = 10;

      // Wavy effect
      particleMesh.position.y = Math.sin(elapsedTime * 0.5) * 2 - (scrollVelocity * 0.02);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('scroll', onScroll);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom right, #09090b, #111827)' }} // obsidian/dark gradient base
    />
  );
};

export default ThreeBackground;
