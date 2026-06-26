import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface SpaceGlobeProps {
  onArrival: () => void;
}

export const SpaceGlobe: React.FC<SpaceGlobeProps> = ({ onArrival }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState('Establishing Quantum Uplink...');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // SCENE SETUP
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020205, 0.0015);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 240;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x111122, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffaa44, 2.0); // Warm sun light
    dirLight.position.set(100, 50, 100);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x0088ff, 3, 200); // Earth glow light
    blueLight.position.set(-60, 20, 40);
    scene.add(blueLight);

    // PROCEDURAL EARTH TEXTURE (Zero asset load time, futuristic theme)
    const createEarthTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Deep space background
      ctx.fillStyle = '#06060c';
      ctx.fillRect(0, 0, 1024, 512);

      // Draw grids (Latitude / Longitude)
      ctx.strokeStyle = '#122544';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 1024; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
      }
      for (let j = 0; j < 512; j += 32) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(1024, j);
        ctx.stroke();
      }

      // Draw mock neon cyan continents
      ctx.fillStyle = '#1e3a8a';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      
      // Simple custom polygon approximations of continents (Asia, Europe, Africa, Americas)
      const drawContinent = (points: [number, number][]) => {
        ctx.beginPath();
        points.forEach((p, idx) => {
          const x = (p[0] + 180) * (1024 / 360);
          const y = (90 - p[1]) * (512 / 180);
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
      };

      // Asia & India
      drawContinent([
        [60, 70], [100, 70], [140, 60], [150, 40], [120, 5], [100, -10],
        [80, 5], [77, 8], [73, 22], [70, 24], [60, 30], [50, 20],
        [40, 35], [35, 50], [45, 65]
      ]);
      // India Detail
      ctx.fillStyle = '#d97706'; // Highlight India Saffron
      ctx.shadowColor = '#ff9933';
      drawContinent([
        [68, 24], [78, 22], [80, 20], [77, 8], [72, 8], [68, 20]
      ]);
      ctx.fillStyle = '#1e3a8a';
      ctx.shadowColor = '#00f2fe';

      // Africa
      drawContinent([
        [-15, 35], [30, 30], [50, 10], [40, -15], [20, -35], [10, -35],
        [-10, 5], [-15, 15]
      ]);

      // Europe
      drawContinent([
        [-10, 60], [30, 70], [40, 50], [25, 35], [-5, 35], [-10, 45]
      ]);

      // Americas
      drawContinent([
        [-120, 60], [-80, 50], [-70, 10], [-40, -10], [-70, -50], [-75, -50],
        [-80, -20], [-100, 15], [-120, 40]
      ]);

      // Glow spot for Varanasi
      const varanasiX = (83.0062 + 180) * (1024 / 360);
      const varanasiY = (90 - 25.3176) * (512 / 180);
      ctx.fillStyle = '#ff9933';
      ctx.shadowColor = '#ff0000';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(varanasiX, varanasiY, 8, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    // GLOBE OBJECT
    const globeGeo = new THREE.SphereGeometry(60, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      map: createEarthTexture(),
      roughness: 0.8,
      metalness: 0.2
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Initial globe orientation to show Asia/India
    globe.rotation.y = -Math.PI / 1.5;
    globe.rotation.x = 0.2;

    // STARS BACKGROUND
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 1500;
    const starsPos = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      // Random coordinates in a shell around the scene
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 250 + Math.random() * 150;
      starsPos[i] = r * Math.sin(phi) * Math.cos(theta);
      starsPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starsPos[i + 2] = r * Math.cos(phi);
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // RENDER LOOP
    const animate = () => {
      globe.rotation.y += 0.001; // slow continuous rotation
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    // CINEMATIC GSAP ZOOM SEQUENCES
    const timeline = gsap.timeline({
      onUpdate: () => {
        // Compute progress percent
        setProgress(Math.round(timeline.progress() * 100));
      },
      onComplete: () => {
        // Trigger transition to parent
        gsap.to(mount, {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          onComplete: () => {
            renderer.setAnimationLoop(null);
            renderer.dispose();
            mount.removeChild(renderer.domElement);
            onArrival();
          }
        });
      }
    });

    // 1. Slow pan towards Earth
    timeline.to(camera.position, {
      z: 140,
      duration: 2.5,
      ease: 'sine.inOut',
      onStart: () => setLabel('Scanning Northern Hemisphere...')
    });

    // 2. Center specifically on India
    const varanasiYRotation = -Math.PI / 1.5 - (83.0062 * (Math.PI / 180)) + (Math.PI / 2.3);
    const varanasiXRotation = 25.3176 * (Math.PI / 180);

    timeline.to(globe.rotation, {
      x: varanasiXRotation,
      y: varanasiYRotation,
      duration: 3.0,
      ease: 'power2.inOut',
      onStart: () => setLabel('Targeting Uttar Pradesh coordinates...')
    }, '-=0.5');

    // 3. Final Zoom into Varanasi point
    timeline.to(camera.position, {
      x: 0,
      y: 0,
      z: 62.5, // just grazing the surface
      duration: 2.5,
      ease: 'power4.in',
      onStart: () => setLabel('Approaching Varanasi (Kashi)...')
    });

    // 4. Fade to white atmosphere flash for arrival transition
    timeline.to(globe.material, {
      opacity: 0,
      duration: 0.5
    }, '-=0.3');

    // RESIZE EVENT
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      timeline.kill();
    };
  }, [onArrival]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020205]">
      {/* 3D WebGL Element */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Futuristic Cinematic Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-glass max-w-md pointer-events-none">
        <h1 className="text-2xl font-display font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-saffron uppercase mb-2">
          KASHI DIGITAL TWIN
        </h1>
        <p className="text-sm font-sans tracking-wide text-gray-400 mb-6 uppercase">
          Orbital Telemetry Arrival Sequence
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Label */}
        <p className="text-xs font-mono text-orange-400 font-bold tracking-wide animate-pulse">
          {label} ({progress}%)
        </p>
      </div>
    </div>
  );
};
export default SpaceGlobe;
