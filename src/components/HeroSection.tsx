import React from 'react';
import { HERO_DATA } from '../data/portfolioData';
import { InteractiveCharacter } from './InteractiveCharacter';
import { playClickSound, playChestOpenSound } from '../utils/audio';
import { Terminal, Shield, Award, Sparkles, ArrowDown, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onScoreXp: (amount: number) => void;
  onTriggerAchievement: (title: string, desc: string) => void;
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScoreXp,
  onTriggerAchievement,
  onOpenResume
}) => {
  const scrollTo = (selector: string) => {
    playClickSound();
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 py-12 sm:py-16">
      
      {/* Decorative Minecraft Grass Block Ground Shelf */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Top Floating Badge */}
        <div className="mb-4 inline-flex items-center gap-2 mc-panel-dark px-3 py-1.5 shadow-md animate-pixel-bounce">
          <span className="w-2.5 h-2.5 bg-[#55FF55] border border-black animate-pulse" />
          <span className="font-pixel text-[9px] sm:text-[10px] text-[#55FF55] tracking-widest">
            SERVER ONLINE // READY TO SPAWN
          </span>
          <span className="text-[#888] text-[9px] font-pixel hidden sm:inline">| PING: 12ms</span>
        </div>

        {/* Main Hero Container: Split Layout (Text/HUD on left, Interactive Voxel Character on right) */}
        <div className="w-full mc-panel-dark p-6 sm:p-10 border-4 border-[#000] relative shadow-2xl">
          
          {/* Corner Wood/Stone Inset Screws */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-[#555] border border-black" />
          <div className="absolute top-2 right-2 w-3 h-3 bg-[#555] border border-black" />
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#555] border border-black" />
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-[#555] border border-black" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (8 cols): Title, Tagline, Bio, Action Buttons, HUD status */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left">
              
              {/* Title with authentic 3D Minecraft typography */}
              <div>
                <div className="inline-block bg-[#5D8B3B] text-white px-2 py-0.5 text-[9px] font-pixel border border-black mb-2 shadow">
                  PLAYER 1: BACKEND SPECIALIST
                </div>
                
                <h1 className="font-pixel text-2xl sm:text-4xl md:text-5xl text-[#FFFFFF] tracking-tight leading-tight drop-shadow-[4px_4px_0px_#000000]">
                  PRANAV SHETTY
                </h1>
                
                {/* Secondary pixel subtitle line */}
                <div className="mt-3 py-1 px-2.5 bg-[#2a2a2b] border-l-4 border-[#55FF55] inline-block">
                  <p className="font-pixel text-[11px] sm:text-xs text-[#55FFFF] tracking-wide leading-relaxed">
                    Computer Science Undergrad // Backend Developer // Data Science Certified
                  </p>
                </div>
              </div>

              {/* Bio Summary Text (Clean sans-serif for readability as requested) */}
              <p className="text-sm sm:text-base text-[#d1d5db] font-normal leading-relaxed max-w-xl">
                Engineering high-throughput backend services in <strong className="text-[#55FF55] font-semibold">Java & Spring Boot</strong>, exploring biologically inspired <strong className="text-[#FFAA00] font-semibold">Neuromorphic AI</strong> at <strong className="text-[#55FFFF] font-semibold">DRDO-CAIR</strong>, and sinking clutch 3-pointers on the basketball court.
              </p>

              {/* Minecraft HUD Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="mc-slot p-2 flex items-center gap-2">
                  <Terminal size={18} className="text-[#55FF55] flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-pixel text-[8px] text-[#888]">STACK</span>
                    <span className="font-pixel text-[10px] text-white">Java / Spring</span>
                  </div>
                </div>

                <div className="mc-slot p-2 flex items-center gap-2">
                  <Shield size={18} className="text-[#55FFFF] flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-pixel text-[8px] text-[#888]">RESEARCH</span>
                    <span className="font-pixel text-[10px] text-white">DRDO-CAIR</span>
                  </div>
                </div>

                <div className="mc-slot p-2 flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Award size={18} className="text-[#FFAA00] flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-pixel text-[8px] text-[#888]">HONOR</span>
                    <span className="font-pixel text-[10px] text-white">Finalist 2025</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons as requested */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollTo('#inventory')}
                  className="mc-btn-green px-5 py-3 text-xs sm:text-sm font-pixel flex items-center gap-2 shadow-lg tracking-wider"
                >
                  <span>▶</span> VIEW PROJECTS
                </button>

                <button
                  onClick={() => scrollTo('#quests')}
                  className="mc-btn px-4 py-3 text-xs font-pixel flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-[#FFAA00]" /> QUEST LOG
                </button>

                {onOpenResume && (
                  <button
                    onClick={() => {
                      playChestOpenSound();
                      onOpenResume();
                    }}
                    className="mc-btn px-4 py-3 text-xs font-pixel flex items-center gap-2 text-[#FFFF55] hover:text-white"
                    title="Open Written Book Resume"
                  >
                    <BookOpen size={14} className="text-[#FFAA00]" /> RESUME DOSSIER
                  </button>
                )}

                <button
                  onClick={() => scrollTo('#contact')}
                  className="mc-btn px-4 py-3 text-xs font-pixel flex items-center gap-2 hover:text-[#55FFFF]"
                >
                  JOIN SERVER ▶
                </button>
              </div>

              {/* Quick Prompt Tooltip */}
              <div className="text-[10px] font-pixel text-[#9ca3af] flex items-center gap-1.5 pt-1">
                <span className="text-[#FFFF55]">💡 TIP:</span>
                <span>Click Pranav's character or basketball to interact & score XP!</span>
              </div>
            </div>

            {/* Right Column (5 cols): Interactive Voxel Character with HUD Podium */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              
              {/* Podium Base (Minecraft Cobblestone / Grass Block pedestal) */}
              <div className="w-full flex flex-col items-center relative">
                
                {/* Character Interactive Component */}
                <InteractiveCharacter 
                  onScoreXp={onScoreXp}
                  onTriggerAchievement={onTriggerAchievement}
                />

                {/* Pedestal Block (Grass Layer + Dirt Layer) */}
                <div className="w-56 sm:w-64 -mt-2 z-0">
                  {/* Grass Top */}
                  <div className="h-4 bg-[#5D8B3B] border-t-2 border-x-2 border-[#2c5b1f] relative">
                    <div className="absolute -bottom-2 left-4 w-6 h-2 bg-[#5D8B3B]" />
                    <div className="absolute -bottom-1.5 left-16 w-5 h-2 bg-[#5D8B3B]" />
                    <div className="absolute -bottom-2 right-8 w-7 h-2 bg-[#5D8B3B]" />
                  </div>
                  {/* Dirt Base */}
                  <div className="h-6 bg-[#8B5A2B] border-2 border-[#57371a] flex items-center justify-center shadow-md">
                    <span className="font-pixel text-[9px] text-[#e0aa78] tracking-widest">
                      PRANAV // SQUAD LEADER
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div 
          onClick={() => scrollTo('#stats')}
          className="mt-6 flex flex-col items-center gap-1 cursor-pointer group"
        >
          <span className="font-pixel text-[9px] text-white/80 group-hover:text-[#55FF55] transition-colors">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown size={18} className="text-[#55FF55] animate-bounce" />
        </div>

      </div>

    </section>
  );
};
