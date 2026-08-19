import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playBasketballBounceSound, playClickSound, playLevelUpSound, playXpSound } from '../utils/audio';
import { Sparkles, RotateCcw, Eye, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveCharacterProps {
  onScoreXp?: (amount: number) => void;
  onTriggerAchievement?: (title: string, desc: string) => void;
}

export const InteractiveCharacter: React.FC<InteractiveCharacterProps> = ({
  onScoreXp,
  onTriggerAchievement
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number; z: number }>({ x: 194, y: 77, z: -65 });
  const [trickMode, setTrickMode] = useState<string>('idle');
  const [trickCount, setTrickCount] = useState<number>(0);
  const [bubbleText, setBubbleText] = useState<string | null>("Hey! Drag to rotate or click for tricks!");
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const ballMeshRef = useRef<THREE.Group | null>(null);
  const rightArmRef = useRef<THREE.Group | null>(null);
  const leftArmRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const triggerXpParticle = (text: string, x: number = 0, y: number = -40) => {
    const newId = Date.now() + Math.random();
    setFloatingParticles(prev => [...prev.slice(-4), { id: newId, text, x, y }]);
    setTimeout(() => {
      setFloatingParticles(prev => prev.filter(p => p.id !== newId));
    }, 1500);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 360;
    const height = mountRef.current.clientHeight || 400;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 4.2);
    camera.lookAt(0, 0.1, 0);
    cameraRef.current = camera;

    // 3. Renderer with pixelated crispness
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting (Simulating warm directional sun + ambient + soft fill)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
    dirLight.position.set(4, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x7ec0ee, 0.6);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // 5. Grid Floor (Minecraft style wireframe grid)
    const gridHelper = new THREE.GridHelper(6, 16, 0x333333, 0x1f1f1f);
    gridHelper.position.y = -1.25;
    scene.add(gridHelper);

    // 6. Floating Green XP Spores / Particles (like in the reference image)
    const sporeCount = 24;
    const sporeGeo = new THREE.BoxGeometry(0.04, 0.04, 0.04);
    const sporeMat = new THREE.MeshBasicMaterial({ color: 0x55ff55, transparent: true, opacity: 0.8 });
    const sporeGroup = new THREE.Group();

    const sporeData: { mesh: THREE.Mesh; speedY: number; baseX: number; baseZ: number; offset: number }[] = [];

    for (let i = 0; i < sporeCount; i++) {
      const spore = new THREE.Mesh(sporeGeo, sporeMat);
      const x = (Math.random() - 0.5) * 4;
      const y = -1.2 + Math.random() * 2.8;
      const z = (Math.random() - 0.5) * 3;
      spore.position.set(x, y, z);
      sporeGroup.add(spore);
      sporeData.push({
        mesh: spore,
        speedY: 0.003 + Math.random() * 0.006,
        baseX: x,
        baseZ: z,
        offset: Math.random() * Math.PI * 2
      });
    }
    scene.add(sporeGroup);

    // 7. BUILD THE MINECRAFT VOXEL CHARACTER (Matching the exact uploaded screenshot)
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, 0, 0);
    scene.add(characterGroup);
    characterGroupRef.current = characterGroup;

    // Materials Palette matching screenshot:
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xd9be85 }); // tan yellow-beige skin
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x231c17 }); // dark brown-black hair
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 }); // solid black rectangular eyes
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0xe0ede2 }); // pale mint-white shirt
    const tieMat = new THREE.MeshLambertMaterial({ color: 0xb91c1c }); // bright red tie
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x18181b }); // dark charcoal pants
    const shoeMat = new THREE.MeshLambertMaterial({ color: 0x453221 }); // dark brown shoes
    const ballMat = new THREE.MeshLambertMaterial({ color: 0xb85314 }); // basketball orange-brown
    const seamMat = new THREE.MeshBasicMaterial({ color: 0x18100a }); // basketball black seams

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.75, 0);

    // Head Cube
    const headGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Hair Top (Box haircut sitting on top of head)
    const hairTopGeo = new THREE.BoxGeometry(0.56, 0.18, 0.56);
    const hairTopMesh = new THREE.Mesh(hairTopGeo, hairMat);
    hairTopMesh.position.set(0, 0.22, 0);
    headGroup.add(hairTopMesh);

    // Eyes: 2 horizontal rectangular black blocks (exactly as in screenshot)
    const eyeGeo = new THREE.BoxGeometry(0.09, 0.05, 0.02);
    
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.14, 0.04, 0.28);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.14, 0.04, 0.28);
    headGroup.add(rightEye);

    characterGroup.add(headGroup);

    // --- TORSO ---
    const torsoGeo = new THREE.BoxGeometry(0.62, 0.72, 0.36);
    const torsoMesh = new THREE.Mesh(torsoGeo, shirtMat);
    torsoMesh.position.set(0, 0.12, 0);
    torsoMesh.castShadow = true;
    characterGroup.add(torsoMesh);

    // Red Tie (protruding down center of chest)
    const tieGeo = new THREE.BoxGeometry(0.1, 0.42, 0.03);
    const tieMesh = new THREE.Mesh(tieGeo, tieMat);
    tieMesh.position.set(0, 0.16, 0.19);
    characterGroup.add(tieMesh);

    // --- LEFT ARM (Straight down at side) ---
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.45, 0.42, 0);

    const leftArmGeo = new THREE.BoxGeometry(0.24, 0.68, 0.32);
    const leftArmMesh = new THREE.Mesh(leftArmGeo, shirtMat);
    leftArmMesh.position.set(0, -0.3, 0);
    leftArmMesh.castShadow = true;
    leftArmGroup.add(leftArmMesh);

    characterGroup.add(leftArmGroup);
    leftArmRef.current = leftArmGroup;

    // --- RIGHT ARM (Bent forward holding the basketball) ---
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.45, 0.42, 0);

    // Upper & Forearm angled forward
    const rightArmGeo = new THREE.BoxGeometry(0.24, 0.62, 0.32);
    const rightArmMesh = new THREE.Mesh(rightArmGeo, shirtMat);
    rightArmMesh.position.set(0, -0.24, 0.08);
    rightArmMesh.rotation.x = -0.35; // angled forward
    rightArmMesh.castShadow = true;
    rightArmGroup.add(rightArmMesh);

    characterGroup.add(rightArmGroup);
    rightArmRef.current = rightArmGroup;

    // --- BASKETBALL GROUP ---
    const ballGroup = new THREE.Group();
    ballGroup.position.set(0.42, -0.22, 0.22); // held by right arm

    // Sphere
    const ballGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const ballMesh = new THREE.Mesh(ballGeo, ballMat);
    ballMesh.castShadow = true;
    ballGroup.add(ballMesh);

    // Basketball Seams (Equator and Prime Meridian rings)
    const seamHGeo = new THREE.TorusGeometry(0.221, 0.009, 8, 32);
    const seamHMesh = new THREE.Mesh(seamHGeo, seamMat);
    seamHMesh.rotation.x = Math.PI / 2;
    ballGroup.add(seamHMesh);

    const seamVGeo = new THREE.TorusGeometry(0.221, 0.009, 8, 32);
    const seamVMesh = new THREE.Mesh(seamVGeo, seamMat);
    ballGroup.add(seamVMesh);

    characterGroup.add(ballGroup);
    ballMeshRef.current = ballGroup;

    // --- LEGS (Dark trousers & brown shoes) ---
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.16, -0.24, 0);

    // Pants
    const legGeo = new THREE.BoxGeometry(0.26, 0.48, 0.32);
    const leftLegMesh = new THREE.Mesh(legGeo, pantsMat);
    leftLegMesh.position.set(0, -0.24, 0);
    leftLegMesh.castShadow = true;
    leftLegGroup.add(leftLegMesh);

    // Shoe
    const shoeGeo = new THREE.BoxGeometry(0.27, 0.22, 0.38);
    const leftShoeMesh = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoeMesh.position.set(0, -0.52, 0.03);
    leftShoeMesh.castShadow = true;
    leftLegGroup.add(leftShoeMesh);

    characterGroup.add(leftLegGroup);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.16, -0.24, 0);

    const rightLegMesh = new THREE.Mesh(legGeo, pantsMat);
    rightLegMesh.position.set(0, -0.24, 0);
    rightLegMesh.castShadow = true;
    rightLegGroup.add(rightLegMesh);

    const rightShoeMesh = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoeMesh.position.set(0, -0.52, 0.03);
    rightShoeMesh.castShadow = true;
    rightLegGroup.add(rightShoeMesh);

    characterGroup.add(rightLegGroup);

    // --- MOUSE DRAG / TOUCH INTERACTION ---
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !characterGroupRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      characterGroupRef.current.rotation.y += deltaX * 0.015;
      
      // Pitch slightly constrained
      const newRotX = characterGroupRef.current.rotation.x + deltaY * 0.008;
      if (newRotX > -0.4 && newRotX < 0.4) {
        characterGroupRef.current.rotation.x = newRotX;
      }

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

      // Update real-time F3 HUD coordinates
      const rotY = characterGroupRef.current.rotation.y;
      setCoords({
        x: Math.round(194 + Math.sin(rotY) * 30),
        y: Math.round(77 + Math.sin(Date.now() * 0.002) * 5),
        z: Math.round(-65 + Math.cos(rotY) * 30)
      });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !characterGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      characterGroupRef.current.rotation.y += deltaX * 0.02;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Floating Spores animation
      sporeData.forEach((spore) => {
        spore.mesh.position.y += spore.speedY;
        spore.mesh.position.x = spore.baseX + Math.sin(elapsedTime + spore.offset) * 0.1;
        spore.mesh.position.z = spore.baseZ + Math.cos(elapsedTime + spore.offset) * 0.1;
        if (spore.mesh.position.y > 1.6) {
          spore.mesh.position.y = -1.2;
        }
      });

      // Character Breathing & Subtle Idle Sway
      if (characterGroupRef.current) {
        if (!isDraggingRef.current && isAutoRotate) {
          // Slow subtle idle rotation
          characterGroupRef.current.rotation.y += 0.003;
        }

        // Idle breathing bob
        characterGroupRef.current.position.y = Math.sin(elapsedTime * 2) * 0.03;

        // Ball subtle bounce / spin in hand
        if (ballMeshRef.current) {
          ballMeshRef.current.rotation.y += 0.015;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
    };
  }, [isAutoRotate]);

  // Trick / Spin Animation Triggers
  const handleSpinTrick = () => {
    playBasketballBounceSound();
    playXpSound();
    const nextCount = trickCount + 1;
    setTrickCount(nextCount);
    setTrickMode('spinning');

    triggerXpParticle("+30 XP 🏀", 0, -40);
    if (onScoreXp) onScoreXp(30);

    const quotes = [
      "🏀 360 Spin Move executed! +30 XP",
      "🔥 Crossover into step-back 3!",
      "⚡ Java Backend throughput: 50,000 req/sec!",
      "🧠 SNN Spike frequency stabilized!",
      "🏆 National Finalist momentum activated!"
    ];
    setBubbleText(quotes[Math.floor(Math.random() * quotes.length)]);

    if (nextCount === 3 && onTriggerAchievement) {
      onTriggerAchievement("Ankle Breaker", "Performed 3 signature 3D spin moves with Pranav's avatar!");
    }

    if (characterGroupRef.current && ballMeshRef.current) {
      const startRotY = characterGroupRef.current.rotation.y;
      const startTime = Date.now();
      const duration = 900;

      const spinLoop = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);

        if (characterGroupRef.current) {
          characterGroupRef.current.rotation.y = startRotY + ease * Math.PI * 4; // 2 full spins
          characterGroupRef.current.position.y = Math.sin(progress * Math.PI) * 0.35; // Jump
        }

        if (progress < 1) {
          requestAnimationFrame(spinLoop);
        } else {
          setTrickMode('idle');
          playLevelUpSound();
        }
      };

      requestAnimationFrame(spinLoop);
    }
  };

  const handleResetCamera = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    if (characterGroupRef.current) {
      characterGroupRef.current.rotation.set(0, 0, 0);
      setCoords({ x: 194, y: 77, z: -65 });
    }
  };

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center">
      
      {/* 3D Viewport Box matching the exact screenshot design */}
      <div 
        className="w-full h-[380px] sm:h-[430px] bg-[#121214] border-4 border-[#0a0a0c] relative shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onClick={handleSpinTrick}
      >
        {/* Top-Left Minecraft F3 Coordinate HUD Box (Exact match from screenshot) */}
        <div className="absolute top-3 left-3 z-30 bg-black/80 px-2.5 py-1.5 border border-[#333] flex items-center gap-2 pointer-events-none shadow">
          <div className="w-2 h-2 bg-[#55FF55] shadow-[0_0_4px_#55FF55]" />
          <span className="font-mono text-[11px] text-[#7EC0EE] tracking-wider font-semibold">
            X: {coords.x} &nbsp;Y: {coords.y} &nbsp;Z: {coords.z}
          </span>
        </div>

        {/* Top-Right "CLICK TO SPIN / TRICK" Button (Exact match from screenshot) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSpinTrick();
          }}
          className="absolute top-3 right-3 z-30 mc-btn-green px-2.5 py-1.5 text-[9px] sm:text-[10px] font-pixel flex items-center gap-1.5 shadow-lg tracking-wider text-white hover:text-[#FFFF55] transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles size={12} className="text-[#FFFF55]" />
          <span>CLICK TO SPIN / TRICK</span>
        </button>

        {/* Floating Comic Speech Bubble */}
        <AnimatePresence>
          {bubbleText && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-14 left-1/2 -translate-x-1/2 z-30 max-w-[260px] mc-panel-dark px-3 py-2 text-center pointer-events-none shadow-xl"
            >
              <p className="text-[10px] sm:text-[11px] font-pixel text-[#FFFF55] leading-tight">
                {bubbleText}
              </p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0E0E0E]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating XP / Combo Particles */}
        <AnimatePresence>
          {floatingParticles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -70, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 font-pixel text-xs text-[#55FF55] drop-shadow-[0_2px_6px_#000] z-40 pointer-events-none whitespace-nowrap bg-black/80 px-2 py-0.5 border border-[#55FF55]"
            >
              {particle.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Three.js 3D WebGL Canvas Mount */}
        <div ref={mountRef} className="w-full h-full" />

        {/* Bottom-Right Controls (Reset ↻ and Inspect 👁 buttons matching screenshot) */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5">
          {/* Reset Camera View */}
          <button
            onClick={handleResetCamera}
            className="w-7 h-7 bg-[#222] border border-[#555] hover:border-white text-white flex items-center justify-center transition-colors shadow"
            title="Reset Character Rotation"
          >
            <RotateCcw size={13} />
          </button>

          {/* Toggle Auto Rotation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              setIsAutoRotate(prev => !prev);
            }}
            className={`w-7 h-7 bg-[#222] border ${isAutoRotate ? 'border-[#55FF55] text-[#55FF55]' : 'border-[#555] text-[#aaa]'} hover:border-white flex items-center justify-center transition-colors shadow`}
            title={isAutoRotate ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
          >
            <Eye size={13} />
          </button>
        </div>

        {/* Drag Hint at Bottom Center */}
        <div className="absolute bottom-2.5 left-3 text-[8px] font-pixel text-[#666] pointer-events-none">
          DRAG TO ROTATE 360°
        </div>
      </div>

      {/* Quick Action Bar under the 3D frame */}
      <div className="w-full mt-2.5 flex items-center justify-between px-1">
        <span className="font-pixel text-[9px] text-[#FFAA00]">
          Tricks: {trickCount} | Score: {trickCount * 30} XP
        </span>

        <button
          onClick={handleSpinTrick}
          className="font-pixel text-[9px] text-[#55FFFF] hover:text-[#FFFF55] transition-colors"
        >
          SHOOT / TRICK ▶
        </button>
      </div>

    </div>
  );
};
