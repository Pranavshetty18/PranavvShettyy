import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Eye } from 'lucide-react';
import { playBasketballBounceSound, playClickSound } from '../utils/audio';

export const InteractiveCharacter: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number; z: number }>({ x: 194, y: 77, z: -65 });
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const ballGroupRef = useRef<THREE.Group | null>(null);
  const rightArmGroupRef = useRef<THREE.Group | null>(null);
  const leftArmGroupRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const torsoMeshRef = useRef<THREE.Mesh | null>(null);
  const tieMeshRef = useRef<THREE.Mesh | null>(null);
  const leftLegGroupRef = useRef<THREE.Group | null>(null);
  const rightLegGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const isSpinningRef = useRef<boolean>(false);
  const spinStartTimeRef = useRef<number>(0);
  const startSpinRotYRef = useRef<number>(0);
  const lastBounceSoundTimeRef = useRef<number>(0);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 360;
    const height = mountRef.current.clientHeight || 400;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0.35, 4.3);
    camera.lookAt(0, 0.05, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer with crisp pixel shading
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
    dirLight.position.set(4, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x7ec0ee, 0.65);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // 5. Grid Floor
    const gridHelper = new THREE.GridHelper(6, 16, 0x333333, 0x1f1f1f);
    gridHelper.position.y = -1.25;
    scene.add(gridHelper);

    // 6. Floating Green XP Spores
    const sporeCount = 20;
    const sporeGeo = new THREE.BoxGeometry(0.04, 0.04, 0.04);
    const sporeMat = new THREE.MeshBasicMaterial({ color: 0x55ff55, transparent: true, opacity: 0.75 });
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

    // 7. BUILD THE MINECRAFT VOXEL CHARACTER
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, 0, 0);
    scene.add(characterGroup);
    characterGroupRef.current = characterGroup;

    // Materials:
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xd9be85 });
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x231c17 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0xe0ede2 });
    const tieMat = new THREE.MeshLambertMaterial({ color: 0xb91c1c });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
    const shoeMat = new THREE.MeshLambertMaterial({ color: 0x453221 });
    const ballMat = new THREE.MeshLambertMaterial({ color: 0xb85314 });
    const seamMat = new THREE.MeshBasicMaterial({ color: 0x18100a });

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.75, 0);

    const headGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    const hairTopGeo = new THREE.BoxGeometry(0.56, 0.18, 0.56);
    const hairTopMesh = new THREE.Mesh(hairTopGeo, hairMat);
    hairTopMesh.position.set(0, 0.22, 0);
    headGroup.add(hairTopMesh);

    // Eyes: 2 horizontal rectangular black blocks
    const eyeGeo = new THREE.BoxGeometry(0.09, 0.05, 0.02);
    
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.14, 0.04, 0.28);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.14, 0.04, 0.28);
    headGroup.add(rightEye);

    characterGroup.add(headGroup);
    headGroupRef.current = headGroup;

    // --- TORSO ---
    const torsoGeo = new THREE.BoxGeometry(0.62, 0.72, 0.36);
    const torsoMesh = new THREE.Mesh(torsoGeo, shirtMat);
    torsoMesh.position.set(0, 0.12, 0);
    torsoMesh.castShadow = true;
    characterGroup.add(torsoMesh);
    torsoMeshRef.current = torsoMesh;

    // Red Tie
    const tieGeo = new THREE.BoxGeometry(0.1, 0.42, 0.03);
    const tieMesh = new THREE.Mesh(tieGeo, tieMat);
    tieMesh.position.set(0, 0.16, 0.19);
    characterGroup.add(tieMesh);
    tieMeshRef.current = tieMesh;

    // --- LEFT ARM (Pivot at shoulder) ---
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.45, 0.45, 0);

    const leftArmGeo = new THREE.BoxGeometry(0.24, 0.68, 0.32);
    const leftArmMesh = new THREE.Mesh(leftArmGeo, shirtMat);
    leftArmMesh.position.set(0, -0.32, 0);
    leftArmMesh.castShadow = true;
    leftArmGroup.add(leftArmMesh);

    characterGroup.add(leftArmGroup);
    leftArmGroupRef.current = leftArmGroup;

    // --- RIGHT ARM (Pivot at shoulder for dribbling movement) ---
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.45, 0.45, 0);

    const rightArmGeo = new THREE.BoxGeometry(0.24, 0.68, 0.32);
    const rightArmMesh = new THREE.Mesh(rightArmGeo, shirtMat);
    rightArmMesh.position.set(0, -0.32, 0.06);
    rightArmMesh.castShadow = true;
    rightArmGroup.add(rightArmMesh);

    characterGroup.add(rightArmGroup);
    rightArmGroupRef.current = rightArmGroup;

    // --- BASKETBALL GROUP ---
    const ballGroup = new THREE.Group();
    ballGroup.position.set(0.46, -0.5, 0.28);

    const ballGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const ballMesh = new THREE.Mesh(ballGeo, ballMat);
    ballMesh.castShadow = true;
    ballGroup.add(ballMesh);

    // Basketball Seams
    const seamHGeo = new THREE.TorusGeometry(0.221, 0.009, 8, 32);
    const seamHMesh = new THREE.Mesh(seamHGeo, seamMat);
    seamHMesh.rotation.x = Math.PI / 2;
    ballGroup.add(seamHMesh);

    const seamVGeo = new THREE.TorusGeometry(0.221, 0.009, 8, 32);
    const seamVMesh = new THREE.Mesh(seamVGeo, seamMat);
    ballGroup.add(seamVMesh);

    characterGroup.add(ballGroup);
    ballGroupRef.current = ballGroup;

    // --- LEGS ---
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.16, -0.24, 0);

    const legGeo = new THREE.BoxGeometry(0.26, 0.48, 0.32);
    const leftLegMesh = new THREE.Mesh(legGeo, pantsMat);
    leftLegMesh.position.set(0, -0.24, 0);
    leftLegMesh.castShadow = true;
    leftLegGroup.add(leftLegMesh);

    const shoeGeo = new THREE.BoxGeometry(0.27, 0.22, 0.38);
    const leftShoeMesh = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoeMesh.position.set(0, -0.52, 0.03);
    leftShoeMesh.castShadow = true;
    leftLegGroup.add(leftShoeMesh);

    characterGroup.add(leftLegGroup);
    leftLegGroupRef.current = leftLegGroup;

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
    rightLegGroupRef.current = rightLegGroup;

    // --- DRAG TO ROTATE & CLICK TO SPIN/CROSSOVER TRICK ---
    let dragDistance = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      dragDistance = 0;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !characterGroupRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;
      dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

      characterGroupRef.current.rotation.y += deltaX * 0.015;
      
      const newRotX = characterGroupRef.current.rotation.x + deltaY * 0.008;
      if (newRotX > -0.35 && newRotX < 0.35) {
        characterGroupRef.current.rotation.x = newRotX;
      }

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

      const rotY = characterGroupRef.current.rotation.y;
      setCoords({
        x: Math.round(194 + Math.sin(rotY) * 30),
        y: Math.round(77 + Math.sin(Date.now() * 0.002) * 5),
        z: Math.round(-65 + Math.cos(rotY) * 30)
      });
    };

    const triggerSpinTrick = () => {
      if (isSpinningRef.current || !characterGroupRef.current) return;
      playBasketballBounceSound();
      isSpinningRef.current = true;
      spinStartTimeRef.current = performance.now();
      startSpinRotYRef.current = characterGroupRef.current.rotation.y;
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current && dragDistance < 6) {
        // Simple click without dragging -> trigger spin move
        triggerSpinTrick();
      }
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events for mobile
    let touchDistance = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        touchDistance = 0;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !characterGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;
      touchDistance += Math.abs(deltaX) + Math.abs(deltaY);
      characterGroupRef.current.rotation.y += deltaX * 0.02;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      if (isDraggingRef.current && touchDistance < 8) {
        triggerSpinTrick();
      }
      isDraggingRef.current = false;
    };

    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // --- ANIMATION LOOP (Realistic Dribbling & Spin Move) ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const now = performance.now();

      // 1. Spore particle drift
      sporeData.forEach((spore) => {
        spore.mesh.position.y += spore.speedY;
        spore.mesh.position.x = spore.baseX + Math.sin(elapsedTime + spore.offset) * 0.08;
        spore.mesh.position.z = spore.baseZ + Math.cos(elapsedTime + spore.offset) * 0.08;
        if (spore.mesh.position.y > 1.6) {
          spore.mesh.position.y = -1.2;
        }
      });

      // 2. Handle Spin Move / Dribble animation
      if (characterGroupRef.current && ballGroupRef.current && rightArmGroupRef.current) {
        
        if (isSpinningRef.current) {
          // Spin / Crossover animation cycle (approx 850ms)
          const spinDuration = 850;
          const spinProgress = Math.min((now - spinStartTimeRef.current) / spinDuration, 1);
          // Ease in-out cubic
          const ease = spinProgress < 0.5 
            ? 4 * spinProgress * spinProgress * spinProgress 
            : 1 - Math.pow(-2 * spinProgress + 2, 3) / 2;

          // 360 spin
          characterGroupRef.current.rotation.y = startSpinRotYRef.current + ease * Math.PI * 2;
          // Jump arc
          characterGroupRef.current.position.y = Math.sin(spinProgress * Math.PI) * 0.28;

          // Ball crossover arc around body
          const ballAngle = ease * Math.PI * 2;
          ballGroupRef.current.position.x = Math.sin(ballAngle) * 0.55;
          ballGroupRef.current.position.z = Math.cos(ballAngle) * 0.45;
          ballGroupRef.current.position.y = -0.3 + Math.sin(spinProgress * Math.PI * 2) * 0.25;
          ballGroupRef.current.rotation.y += 0.15;
          ballGroupRef.current.rotation.x += 0.1;

          if (spinProgress >= 1) {
            isSpinningRef.current = false;
            characterGroupRef.current.position.y = 0;
          }
        } else {
          // --- REALISTIC BASKETBALL DRIBBLE CYCLE ---
          // Dribble cadence: ~2.2 bounces per second (frequency = 14)
          const dribbleFreq = 7.0;
          const dribbleTime = elapsedTime * dribbleFreq;
          // Parabolic bounce wave using absolute sine
          const bounceNorm = Math.abs(Math.sin(dribbleTime)); // 0 (floor) to 1 (hand)
          
          // Ball vertical travel: from floor (-1.02) to hand apex (-0.28)
          const floorY = -1.02;
          const handY = -0.28;
          const currentBallY = floorY + bounceNorm * (handY - floorY);
          
          ballGroupRef.current.position.y = currentBallY;
          ballGroupRef.current.position.x = 0.44 + Math.sin(elapsedTime * 2) * 0.02;
          ballGroupRef.current.position.z = 0.26;
          
          // Ball spin during dribble
          ballGroupRef.current.rotation.x += 0.08;
          ballGroupRef.current.rotation.y += 0.03;

          // Arm follows the dribble motion (pushing down and rising)
          const armAngle = -0.32 - (1 - bounceNorm) * 0.35;
          rightArmGroupRef.current.rotation.x = armAngle;
          rightArmGroupRef.current.rotation.z = -0.05 + (1 - bounceNorm) * 0.06;

          // Left arm subtle natural balance sway
          if (leftArmGroupRef.current) {
            leftArmGroupRef.current.rotation.x = 0.08 + Math.sin(elapsedTime * 3.5) * 0.06;
            leftArmGroupRef.current.rotation.z = -0.04;
          }

          // Subtle body rhythm (knees flex and slight breathing bob in sync with dribble)
          characterGroupRef.current.position.y = Math.sin(elapsedTime * 3.5) * 0.02;

          // Subtle head track toward ball
          if (headGroupRef.current) {
            headGroupRef.current.rotation.y = 0.06 + Math.sin(elapsedTime * 2) * 0.03;
            headGroupRef.current.rotation.x = 0.05 + bounceNorm * 0.03;
          }

          // Auto-rotate if toggled on
          if (!isDraggingRef.current && isAutoRotate) {
            characterGroupRef.current.rotation.y += 0.003;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

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
      
      {/* 3D Viewport Box - completely clean of buttons, banners, and comment text */}
      <div 
        className="w-full h-[380px] sm:h-[430px] bg-[#121214] border-4 border-[#0a0a0c] relative shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {/* Top-Left Minecraft F3 Coordinate HUD Box */}
        <div className="absolute top-3 left-3 z-30 bg-black/80 px-2.5 py-1.5 border border-[#333] flex items-center gap-2 pointer-events-none shadow">
          <div className="w-2 h-2 bg-[#55FF55] shadow-[0_0_4px_#55FF55]" />
          <span className="font-mono text-[11px] text-[#7EC0EE] tracking-wider font-semibold">
            X: {coords.x} &nbsp;Y: {coords.y} &nbsp;Z: {coords.z}
          </span>
        </div>

        {/* Three.js 3D WebGL Canvas Mount */}
        <div ref={mountRef} className="w-full h-full" />

        {/* Bottom-Right Controls (Reset ↻ and Inspect 👁 icons) */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5">
          <button
            onClick={handleResetCamera}
            className="w-7 h-7 bg-[#222] border border-[#555] hover:border-white text-white flex items-center justify-center transition-colors shadow"
            title="Reset Character Rotation"
          >
            <RotateCcw size={13} />
          </button>

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

        {/* Drag / Orbit hint */}
        <div className="absolute bottom-2.5 left-3 text-[8px] font-pixel text-[#666] pointer-events-none">
          DRAG TO ROTATE 360°
        </div>
      </div>

    </div>
  );
};
