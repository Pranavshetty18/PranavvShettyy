import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playBasketballBounceSound, playClickSound, playXpSound } from '../utils/audio';

interface InteractiveCharacterProps {
  onScoreXp?: (amount: number) => void;
  onTriggerAchievement?: (title: string, desc: string) => void;
}

export const InteractiveCharacter: React.FC<InteractiveCharacterProps> = ({
  onScoreXp,
  onTriggerAchievement
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [actionState, setActionState] = useState<'idle' | 'dribbling' | 'shooting' | 'waving' | 'spinning'>('idle');
  const [bubbleText, setBubbleText] = useState<string | null>("Hey there! Click me or the ball!");
  const [dribbleCount, setDribbleCount] = useState(0);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const autoIdleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto idle action every 6 seconds to keep hero feeling alive
  useEffect(() => {
    const interval = setInterval(() => {
      if (actionState === 'idle' && !isHovered) {
        setActionState('dribbling');
        playBasketballBounceSound();
        setTimeout(() => {
          setActionState('idle');
        }, 2200);
      }
    }, 6500);

    return () => clearInterval(interval);
  }, [actionState, isHovered]);

  const speechQuotes = [
    "Compiling Java 21 microservices! ☕",
    "Swish! Sunk a clutch 3-pointer! 🏀",
    "Running Brian2 spiking neural simulations! 🧠",
    "99.99% Backend Uptime achieved! ⚡",
    "ACID compliant transactions guaranteed! 🛡️",
    "Sub-50ms latency across all API endpoints! 🚀",
    "Check out my Quest Log below! 📜"
  ];

  const triggerXpParticle = (text: string, x: number = 0, y: number = -40) => {
    const newId = Date.now() + Math.random();
    setFloatingParticles(prev => [...prev.slice(-4), { id: newId, text, x, y }]);
    setTimeout(() => {
      setFloatingParticles(prev => prev.filter(p => p.id !== newId));
    }, 1500);
  };

  const handleCharacterClick = () => {
    playClickSound();
    const nextCount = dribbleCount + 1;
    setDribbleCount(nextCount);

    // Random quote
    const randomQuote = speechQuotes[Math.floor(Math.random() * speechQuotes.length)];
    setBubbleText(randomQuote);

    if (actionState === 'idle') {
      setActionState('waving');
      triggerXpParticle("+15 XP", 20, -50);
      playXpSound();
      if (onScoreXp) onScoreXp(15);
      
      setTimeout(() => {
        setActionState('idle');
      }, 1200);
    }

    if (nextCount === 5 && onTriggerAchievement) {
      onTriggerAchievement("Point Guard in the IDE", "Interacted with Pranav's avatar 5 times!");
    }
  };

  const handleBallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBasketballBounceSound();
    setActionState('shooting');
    const newCount = dribbleCount + 1;
    setDribbleCount(newCount);
    
    setBubbleText("🏀 Nothing but net! +25 XP");
    triggerXpParticle("+25 XP 🏀", -10, -60);
    playXpSound();
    if (onScoreXp) onScoreXp(25);

    if (newCount >= 3 && onTriggerAchievement) {
      onTriggerAchievement("Three-Point Sniper", "Sunk 3 clutch shots with the interactive basketball!");
    }

    setTimeout(() => {
      setActionState('dribbling');
      playBasketballBounceSound();
      setTimeout(() => {
        setActionState('idle');
      }, 1400);
    }, 800);
  };

  const handleDribbleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBasketballBounceSound();
    setActionState(prev => prev === 'dribbling' ? 'idle' : 'dribbling');
    triggerXpParticle("+10 XP", 30, -30);
    if (onScoreXp) onScoreXp(10);
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-end select-none group cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
        if (actionState === 'idle') {
          setActionState('dribbling');
          playBasketballBounceSound();
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (actionState === 'dribbling') {
          setActionState('idle');
        }
      }}
      onClick={handleCharacterClick}
      id="hero-interactive-character"
    >
      {/* Floating XP / Combo Particles */}
      <AnimatePresence>
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -60, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute font-pixel text-xs text-[#55FF55] drop-shadow-[0_2px_4px_#000] z-40 pointer-events-none whitespace-nowrap bg-black/70 px-2 py-0.5 border border-[#55FF55]"
            style={{ left: `calc(50% + ${particle.x}px)`, top: `${particle.y}px` }}
          >
            {particle.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Comic Speech Bubble */}
      <AnimatePresence>
        {bubbleText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-20 sm:-top-24 z-30 max-w-[240px] mc-panel-dark px-3 py-2 text-center pointer-events-none"
          >
            <p className="text-[11px] font-pixel text-[#FFFF55] leading-tight">
              {bubbleText}
            </p>
            {/* Pixel speech tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0E0E0E]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Minecraft Character Model (Crisp CSS/SVG Voxel Assembly) */}
      <div className="relative w-44 h-72 sm:w-48 sm:h-80 flex flex-col items-center justify-end">
        
        {/* Shadow on block floor */}
        <div className="absolute bottom-0 w-36 h-8 bg-black/40 rounded-none border border-black/60 filter blur-[1px] transform scale-y-50" />

        {/* Character Body Container with Breathing / Action Animation */}
        <motion.div 
          className="relative flex flex-col items-center"
          animate={
            actionState === 'waving' 
              ? { y: [0, -8, 0], rotate: [0, -2, 2, 0] }
              : actionState === 'shooting'
              ? { y: [0, -24, 0] }
              : isHovered || actionState === 'dribbling'
              ? { y: [0, -4, 0] }
              : { y: [0, -2, 0] }
          }
          transition={{
            repeat: Infinity,
            duration: actionState === 'dribbling' ? 0.7 : 2.5,
            ease: "easeInOut"
          }}
        >
          {/* ================= HEAD BLOCK ================= */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 z-20">
            {/* Outer Head Shadow / Border */}
            <div className="w-full h-full bg-[#e0aa78] border-[3px] border-[#20150d] relative shadow-lg">
              
              {/* Hair (Top and Sides) */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#2c1d11] border-b-2 border-[#1c120a]">
                {/* Hair fringe pixels */}
                <div className="absolute -bottom-1.5 left-2 w-4 h-2 bg-[#2c1d11]" />
                <div className="absolute -bottom-2 left-8 w-5 h-2.5 bg-[#2c1d11]" />
                <div className="absolute -bottom-1.5 right-3 w-4 h-2 bg-[#2c1d11]" />
              </div>
              
              {/* Hair Sideburns */}
              <div className="absolute top-7 left-0 w-2.5 h-6 bg-[#2c1d11]" />
              <div className="absolute top-7 right-0 w-2.5 h-6 bg-[#2c1d11]" />

              {/* Eyebrows */}
              <div className="absolute top-11 left-4 w-5 h-1.5 bg-[#1c120a]" />
              <div className="absolute top-11 right-4 w-5 h-1.5 bg-[#1c120a]" />

              {/* Eyes (Minecraft 2x2 style pixel eyes) */}
              <div className="absolute top-13 left-4 flex">
                <div className="w-2.5 h-2.5 bg-white border border-[#2c1d11] flex items-center justify-end">
                  <div className="w-1.5 h-1.5 bg-[#4a2e18]" />
                </div>
              </div>
              <div className="absolute top-13 right-4 flex">
                <div className="w-2.5 h-2.5 bg-white border border-[#2c1d11] flex items-center justify-start">
                  <div className="w-1.5 h-1.5 bg-[#4a2e18]" />
                </div>
              </div>

              {/* Nose Pixel */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-3 h-2 bg-[#c68955] border-b border-[#a86e3f]" />

              {/* Friendly Smirk / Smile */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center">
                <div className="w-1 h-1 bg-[#7a4128]" />
                <div className="w-4 h-1.5 bg-[#965438]" />
                <div className="w-1.5 h-1 bg-[#7a4128]" />
              </div>

              {/* Glasses frame (Optional subtle nerdy CS touch) */}
              <div className="absolute top-12 left-3 w-7 h-4 border-2 border-[#1a1a1a]/80 bg-cyan-400/10 pointer-events-none" />
              <div className="absolute top-12 right-3 w-7 h-4 border-2 border-[#1a1a1a]/80 bg-cyan-400/10 pointer-events-none" />
              <div className="absolute top-13 left-10 w-4 h-1 bg-[#1a1a1a]/80 pointer-events-none" />
            </div>

            {/* Level 26 Badge Floating above Head */}
            <div className="absolute -top-4 -right-2 bg-[#55FF55] border border-black px-1.5 py-0.5 text-[9px] font-pixel text-black font-bold shadow">
              Lv.26
            </div>
          </div>

          {/* ================= TORSO & ARMS (Formal Shirt & Tie) ================= */}
          <div className="relative flex items-start justify-center mt-[-2px] z-10">
            
            {/* Left Arm (holding ball or waving) */}
            <motion.div 
              className="w-8 h-28 bg-[#f4f4f4] border-[3px] border-[#222] relative flex flex-col justify-between"
              animate={
                actionState === 'waving'
                  ? { rotate: [0, -35, -15, -35, 0], y: [-5, -15, -5] }
                  : actionState === 'dribbling'
                  ? { rotate: [0, -10, 5, 0] }
                  : { rotate: 0 }
              }
              transition={{ duration: 0.6, repeat: actionState === 'waving' ? 2 : 0 }}
            >
              {/* Shirt Sleeve Cuff */}
              <div className="w-full h-16 bg-[#eaeaea] border-b-2 border-[#ccc]" />
              {/* Hand (Skin tone) */}
              <div className="w-full h-10 bg-[#e0aa78] border-t-2 border-[#c68955] relative">
                {/* Watch / Wristband on left wrist */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#1a365d] border-b border-[#0f172a]" />
              </div>
            </motion.div>

            {/* Main Torso (Formal Collared Shirt & Tie) */}
            <div className="w-20 h-32 sm:w-22 sm:h-34 bg-[#f8f9fa] border-[3px] border-[#222] relative overflow-hidden shadow-md">
              
              {/* Collar detail */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-[#ffffff] border-b border-[#ddd] flex justify-center">
                <div className="w-4 h-3 bg-[#e2e8f0] border-r border-[#cbd5e1] rotate-12 -translate-x-1" />
                <div className="w-4 h-3 bg-[#e2e8f0] border-l border-[#cbd5e1] -rotate-12 translate-x-1" />
              </div>

              {/* Formal Tie (Navy/Slate with diagonal stripes) */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-24 bg-[#1e293b] border-x border-[#0f172a] flex flex-col items-center shadow">
                {/* Tie knot */}
                <div className="w-4 h-3.5 bg-[#0f172a] border-b border-[#334155]" />
                {/* Tie body stripes */}
                <div className="w-full h-3 bg-[#3b82f6]/40 my-1" />
                <div className="w-full h-3 bg-[#3b82f6]/40 my-1" />
                <div className="w-full h-3 bg-[#3b82f6]/40 my-1" />
                {/* Tie pointed tip */}
                <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-[#1e293b] mt-auto -mb-2" />
              </div>

              {/* Shirt Buttons */}
              <div className="absolute top-9 left-1/2 -translate-x-1/2 flex flex-col gap-4 pointer-events-none opacity-40">
                <div className="w-1.5 h-1.5 bg-[#64748b] rounded-none" />
                <div className="w-1.5 h-1.5 bg-[#64748b] rounded-none" />
                <div className="w-1.5 h-1.5 bg-[#64748b] rounded-none" />
              </div>

              {/* Shirt Pocket with Pen */}
              <div className="absolute top-7 left-2 w-3.5 h-4 border border-[#cbd5e1] bg-[#ffffff] flex items-start justify-center">
                <div className="w-1 h-2 bg-[#2563eb]" />
              </div>

              {/* Belt at bottom of torso */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#2b1810] border-t border-[#1a0f0a] flex items-center justify-center">
                {/* Gold Belt Buckle */}
                <div className="w-4 h-2.5 bg-[#FFAA00] border border-[#d97706]" />
              </div>
            </div>

            {/* Right Arm (Holding / Dribbling Basketball) */}
            <motion.div 
              className="w-8 h-28 bg-[#f4f4f4] border-[3px] border-[#222] relative flex flex-col justify-between"
              animate={
                actionState === 'shooting'
                  ? { rotate: [-10, -80, -20, 0], y: [-5, -25, 0] }
                  : actionState === 'dribbling'
                  ? { y: [0, 16, 0], rotate: [5, -15, 5] }
                  : { rotate: 5 }
              }
              transition={{ duration: actionState === 'dribbling' ? 0.7 : 0.8, repeat: actionState === 'dribbling' ? Infinity : 0 }}
            >
              <div className="w-full h-16 bg-[#eaeaea] border-b-2 border-[#ccc]" />
              <div className="w-full h-10 bg-[#e0aa78] border-t-2 border-[#c68955]" />
            </motion.div>

            {/* ================= THE BASKETBALL ================= */}
            <motion.div
              onClick={handleBallClick}
              className="absolute -right-9 sm:-right-10 z-30 cursor-pointer group/ball"
              title="Click to shoot / bounce basketball!"
              animate={
                actionState === 'shooting'
                  ? {
                      y: [-10, -140, -40, 20, 0],
                      x: [0, 40, 80, 20, 0],
                      rotate: [0, 360, 720, 1080],
                      scale: [1, 1.2, 0.9, 1]
                    }
                  : actionState === 'dribbling'
                  ? {
                      y: [0, 68, 0],
                      rotate: [0, 90, 180, 270, 360],
                      scale: [1, 1.15, 0.9, 1]
                    }
                  : isHovered
                  ? {
                      y: [0, -10, 0],
                      rotate: [0, 15, -15, 0]
                    }
                  : {
                      y: [0, -3, 0]
                    }
              }
              transition={{
                duration: actionState === 'shooting' ? 0.9 : actionState === 'dribbling' ? 0.7 : 2.5,
                repeat: actionState === 'dribbling' || (isHovered && actionState !== 'shooting') ? Infinity : 0,
                ease: actionState === 'dribbling' ? "easeInOut" : "easeInOut"
              }}
              style={{ bottom: actionState === 'dribbling' ? '10px' : '40px' }}
            >
              {/* Pixelated Minecraft Basketball (Chunky 10x10 pixel aesthetic) */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-[#e65c00] border-[3px] border-[#5a2000] shadow-md flex items-center justify-center group-hover/ball:border-[#FFFF55]">
                {/* Basketball Black Ribs / Lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Horizontal Line */}
                  <div className="w-full h-1 bg-[#3a1500]" />
                  {/* Vertical Line */}
                  <div className="absolute h-full w-1 bg-[#3a1500]" />
                  {/* Curved Seam Simulation */}
                  <div className="absolute w-8 h-8 rounded-none border border-[#3a1500] rotate-45 opacity-60" />
                </div>

                {/* Shading Highlights */}
                <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-[#ff8533] pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#b34700] pointer-events-none" />

                {/* Click me pill tooltip on hover */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/ball:opacity-100 transition-opacity bg-black text-[#55FF55] text-[8px] font-pixel px-1 py-0.5 border border-[#55FF55] whitespace-nowrap pointer-events-none">
                  BOUNCE!
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= LEGS & BOOTS (Formal Dark Trousers & Leather Boots) ================= */}
          <div className="flex gap-[2px] mt-[-2px] z-0">
            {/* Left Leg */}
            <motion.div 
              className="w-9 h-26 sm:w-10 sm:h-28 bg-[#1e293b] border-[3px] border-[#0f172a] relative flex flex-col justify-between"
              animate={actionState === 'waving' ? { y: [0, -2, 0] } : {}}
            >
              {/* Trouser Crease */}
              <div className="absolute top-0 bottom-8 left-1/2 w-[1px] bg-[#334155]" />
              
              {/* Leather Boot (Brown with thick black sole) */}
              <div className="w-full h-8 bg-[#6c3b1e] border-t-2 border-[#452410] relative mt-auto">
                {/* Boot laces */}
                <div className="absolute top-1 left-2 right-2 h-1 bg-[#e0aa78]/60" />
                {/* Boot toe cap */}
                <div className="absolute bottom-0 left-[-3px] right-[-3px] h-3 bg-[#1c110a] border-t border-[#382315]" />
              </div>
            </motion.div>

            {/* Right Leg */}
            <motion.div 
              className="w-9 h-26 sm:w-10 sm:h-28 bg-[#1e293b] border-[3px] border-[#0f172a] relative flex flex-col justify-between"
              animate={actionState === 'waving' ? { y: [0, -2, 0] } : {}}
            >
              {/* Trouser Crease */}
              <div className="absolute top-0 bottom-8 left-1/2 w-[1px] bg-[#334155]" />
              
              {/* Leather Boot */}
              <div className="w-full h-8 bg-[#6c3b1e] border-t-2 border-[#452410] relative mt-auto">
                <div className="absolute top-1 left-2 right-2 h-1 bg-[#e0aa78]/60" />
                <div className="absolute bottom-0 left-[-3px] right-[-3px] h-3 bg-[#1c110a] border-t border-[#382315]" />
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Interactive Controls Bar Below Character */}
      <div className="mt-3 flex items-center gap-1.5 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCharacterClick();
          }}
          className="mc-btn px-2 py-1 text-[9px] font-pixel hover:text-[#FFFF55] flex items-center gap-1"
          title="Wave & Talk"
        >
          <span>👋</span> WAVE
        </button>
        <button
          onClick={handleDribbleToggle}
          className={`mc-btn px-2 py-1 text-[9px] font-pixel flex items-center gap-1 ${actionState === 'dribbling' ? 'border-[#55FF55] text-[#55FF55]' : ''}`}
          title="Toggle Basketball Dribble"
        >
          <span>🏀</span> {actionState === 'dribbling' ? 'PAUSE' : 'DRIBBLE'}
        </button>
        <button
          onClick={handleBallClick}
          className="mc-btn-green px-2 py-1 text-[9px] font-pixel flex items-center gap-1"
          title="Clutch 3-Pointer Shot"
        >
          <span>🎯</span> SHOOT
        </button>
      </div>

      {/* Dribble Count / Score Pill */}
      {dribbleCount > 0 && (
        <div className="mt-1 text-[9px] font-pixel text-[#FFAA00] drop-shadow-[0_1px_2px_#000]">
          Tricks: {dribbleCount} | Score: {dribbleCount * 25} XP
        </div>
      )}
    </div>
  );
};
