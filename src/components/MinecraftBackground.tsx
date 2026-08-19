import React from 'react';

interface MinecraftBackgroundProps {
  isNight?: boolean;
}

export const MinecraftBackground: React.FC<MinecraftBackgroundProps> = ({ isNight = false }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-1000">
      {/* Sky Gradient */}
      <div 
        className={`absolute inset-0 transition-colors duration-1000 ${
          isNight 
            ? 'bg-gradient-to-b from-[#0b0c16] via-[#141829] to-[#1e2338]' 
            : 'bg-gradient-to-b from-[#4fa4e4] via-[#7ec0ee] to-[#c2e4fc]'
        }`} 
      />

      {/* Minecraft Sun / Moon */}
      <div className="absolute top-10 right-12 sm:right-24 transition-transform duration-1000">
        {isNight ? (
          /* Minecraft Moon (Crescent / Full Square) */
          <div className="w-16 h-16 bg-[#e2e8f0] border-4 border-[#94a3b8] shadow-[0_0_24px_rgba(255,255,255,0.4)] relative">
            <div className="absolute top-2 left-2 w-4 h-4 bg-[#cbd5e1]" />
            <div className="absolute bottom-3 right-3 w-5 h-5 bg-[#cbd5e1]" />
            <div className="absolute top-3 right-3 w-3 h-3 bg-[#cbd5e1]" />
          </div>
        ) : (
          /* Minecraft Square Sun */
          <div className="w-20 h-20 bg-[#ffff55] border-4 border-[#ffaa00] shadow-[0_0_35px_rgba(255,255,85,0.6)] relative">
            <div className="absolute inset-2 bg-[#ffffff]/90" />
            <div className="absolute top-3 left-3 w-4 h-4 bg-[#ffffaa]" />
          </div>
        )}
      </div>

      {/* Stars at Night */}
      {isNight && (
        <div className="absolute inset-0 opacity-80">
          <div className="absolute top-8 left-1/4 w-1.5 h-1.5 bg-white shadow-[0_0_4px_white]" />
          <div className="absolute top-16 left-1/3 w-2 h-2 bg-[#ffff55] shadow-[0_0_6px_#ffff55]" />
          <div className="absolute top-24 left-10 w-1.5 h-1.5 bg-white" />
          <div className="absolute top-36 left-2/3 w-2 h-2 bg-[#55ffff]" />
          <div className="absolute top-12 right-1/4 w-1.5 h-1.5 bg-white" />
          <div className="absolute top-28 right-1/3 w-2 h-2 bg-white" />
          <div className="absolute top-44 left-1/2 w-1.5 h-1.5 bg-[#ffff55]" />
          <div className="absolute top-6 left-3/4 w-2 h-2 bg-white" />
          <div className="absolute top-52 right-16 w-1.5 h-1.5 bg-white" />
        </div>
      )}

      {/* Drifting Blocky Pixel Clouds Layer 1 (Fast) */}
      <div className="absolute top-14 left-0 w-full opacity-60">
        <div className="animate-cloud-slow flex items-center">
          <div className="w-48 h-12 bg-white/70 shadow-[0_4px_0_rgba(0,0,0,0.1)] relative">
            <div className="absolute -top-4 left-6 w-24 h-6 bg-white/70" />
            <div className="absolute -bottom-3 left-16 w-18 h-4 bg-white/60" />
          </div>
        </div>
      </div>

      {/* Drifting Blocky Pixel Clouds Layer 2 (Med) */}
      <div className="absolute top-32 left-0 w-full opacity-50">
        <div className="animate-cloud-med flex items-center">
          <div className="w-64 h-14 bg-white/65 shadow-[0_4px_0_rgba(0,0,0,0.1)] relative ml-40">
            <div className="absolute -top-5 left-10 w-32 h-6 bg-white/75" />
            <div className="absolute -top-8 left-18 w-16 h-4 bg-white/80" />
          </div>
        </div>
      </div>

      {/* Distant Pixel Mountain Horizon */}
      <div className="absolute bottom-28 sm:bottom-32 left-0 right-0 h-44 opacity-25 overflow-hidden flex items-end">
        <svg className="w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 1200 200">
          <polygon points="0,200 120,80 200,120 340,40 480,140 600,60 760,150 900,50 1020,110 1200,70 1200,200" fill={isNight ? "#172038" : "#4a78a6"} />
          <polygon points="0,200 80,120 220,160 380,90 520,170 700,100 860,160 1000,90 1200,140 1200,200" fill={isNight ? "#11182c" : "#365d85"} />
        </svg>
      </div>

      {/* Distant Minecraft Trees Silhouette */}
      <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 h-16 opacity-35 flex justify-around">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Tree Leaves Cube */}
            <div className="w-8 h-10 bg-[#2d572c] border-2 border-[#1c3a1c]" />
            {/* Wood Trunk */}
            <div className="w-2.5 h-6 bg-[#4e321e] border-x border-[#332012]" />
          </div>
        ))}
      </div>

      {/* Floating Pixel Particles (Redstone, XP orbs, Leaves) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-[#55FF55] shadow-[0_0_6px_#55FF55] animate-ping opacity-60" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/5 w-2 h-2 bg-[#55FFFF] shadow-[0_0_6px_#55FFFF] animate-ping opacity-50" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-[#FFAA00] shadow-[0_0_4px_#FFAA00] animate-bounce opacity-70" />
        <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-[#FF5555] shadow-[0_0_6px_#FF5555] opacity-50" />
      </div>

      {/* Pixel Grid scanline overlay for authentic retro CRT feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
          backgroundSize: '100% 4px, 6px 100%'
        }}
      />
    </div>
  );
};
