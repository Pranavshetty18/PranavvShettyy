import React from 'react';
import { PLAYER_STATS } from '../data/portfolioData';
import { Shield, Zap, Award, Flame, CheckCircle2, UserCheck } from 'lucide-react';
import { playClickSound, playXpSound } from '../utils/audio';

interface PlayerStatsSectionProps {
  onScoreXp: (amount: number) => void;
}

export const PlayerStatsSection: React.FC<PlayerStatsSectionProps> = ({ onScoreXp }) => {
  return (
    <section id="stats" className="py-16 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#8B5A2B] text-[#FFFF55] px-3 py-1 text-xs font-pixel border-2 border-[#57371a] mb-2 shadow">
          <span>📜</span> PROFILE ARCHIVE
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_#000]">
          PLAYER STATS & ATTRIBUTES
        </h2>
        <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans mt-2 max-w-xl">
          Detailed character sheet, skill proficiencies, and equipped gear loadout.
        </p>
      </div>

      {/* Main Minecraft Survival GUI Panel */}
      <div className="mc-panel-dark p-6 sm:p-8 border-4 border-black relative shadow-2xl">
        
        {/* Panel Header Strip */}
        <div className="border-b-2 border-[#333] pb-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#333] border-2 border-white flex items-center justify-center font-pixel text-sm text-[#55FF55]">
              ⚔️
            </div>
            <div>
              <h3 className="font-pixel text-sm sm:text-base text-[#FFFF55]">
                PRANAV SHETTY [BACKEND ARCHITECT]
              </h3>
              <p className="text-xs text-[#9ca3af]">
                Class: Core Engineer // Faction: PES University CSE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-pixel text-[10px] bg-[#111] px-3 py-1.5 border border-[#444]">
            <span className="text-[#55FF55]">STATUS:</span>
            <span className="text-white">ACTIVE QUESTING</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (5 cols): Player Bio Card & Equipped Gear */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Bio Card */}
            <div className="mc-panel p-4 text-black">
              <h4 className="font-pixel text-xs text-[#2b180a] mb-2 flex items-center gap-2">
                <UserCheck size={14} className="text-[#8B5A2B]" /> PLAYER BIOGRAPHY
              </h4>
              <p className="text-xs sm:text-sm font-sans text-[#222] leading-relaxed">
                {PLAYER_STATS.bio}
              </p>
              <div className="mt-3 pt-3 border-t border-[#888] flex items-center justify-between text-[10px] font-pixel text-[#444]">
                <span>CAMPUS: PESU BENGALURU</span>
                <span className="text-[#5D8B3B] font-bold">CGPA: 6.63</span>
              </div>
            </div>

            {/* Equipment Loadout / Inventory Slots */}
            <div>
              <h4 className="font-pixel text-xs text-[#FFFF55] mb-3 flex items-center gap-2">
                <Shield size={14} className="text-[#55FFFF]" /> EQUIPPED GEAR
              </h4>

              <div className="grid grid-cols-1 gap-2">
                {PLAYER_STATS.equippedGear.map((gear, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      playClickSound();
                      playXpSound();
                      onScoreXp(5);
                    }}
                    className="mc-slot p-2.5 flex items-center justify-between group cursor-pointer hover:border-[#55FF55] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {/* Slot Icon representation */}
                      <div className="w-7 h-7 bg-[#2a2a2a] border border-black flex items-center justify-center font-pixel text-xs text-[#FFAA00]">
                        {gear.slot === "Helmet" ? "🪖" : 
                         gear.slot === "Chestplate" ? "🛡️" : 
                         gear.slot === "Leggings" ? "👖" : 
                         gear.slot === "Boots" ? "👢" : 
                         gear.slot === "Main Hand" ? "🗡️" : "🏀"}
                      </div>
                      <div>
                        <div className="font-pixel text-[10px] text-white group-hover:text-[#FFFF55] transition-colors">
                          {gear.item}
                        </div>
                        <div className="text-[10px] text-[#55FF55] font-mono">
                          {gear.perk}
                        </div>
                      </div>
                    </div>
                    <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-black/60 text-[#55FFFF] border border-[#55FFFF]/40">
                      {gear.tier}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Attribute XP Bars & Vitals */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Attribute Progress Bars (Minecraft XP style) */}
            <div>
              <h4 className="font-pixel text-xs text-[#55FFFF] mb-4 flex items-center gap-2">
                <Zap size={14} className="text-[#FFAA00]" /> CORE ATTRIBUTE PROFICIENCIES
              </h4>

              <div className="space-y-4">
                {PLAYER_STATS.attributes.map((attr, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-pixel text-[11px] text-white">
                        {attr.name}
                      </span>
                      <span className="font-pixel text-[10px] text-[#55FF55]">
                        Lv.{Math.floor(attr.value / 10)} // {attr.value}%
                      </span>
                    </div>

                    {/* XP Progress Bar */}
                    <div className="w-full bg-[#000000] h-5 border-2 border-[#555] relative overflow-hidden flex items-center">
                      {/* Bar Fill */}
                      <div 
                        className="h-full transition-all duration-700 relative"
                        style={{ 
                          width: `${attr.value}%`,
                          backgroundColor: attr.color,
                          boxShadow: `0 0 10px ${attr.color}88`
                        }}
                      >
                        {/* Shimmer line */}
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12" />
                      </div>

                      {/* Notches */}
                      <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-40">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="w-[1px] h-full bg-black" />
                        ))}
                      </div>

                      {/* Floating Text inside bar */}
                      <span className="absolute right-2 font-pixel text-[8px] text-black font-bold">
                        {attr.value >= 90 ? "MASTERED" : "HIGH TIER"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vital Statistics Bento Grid */}
            <div className="mt-2">
              <h4 className="font-pixel text-xs text-[#FFAA00] mb-3 flex items-center gap-2">
                <Flame size={14} className="text-[#FF5555]" /> SERVER TELEMETRY & VITALS
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="mc-panel-dark p-3 border-2 border-[#444] text-center">
                  <div className="font-pixel text-lg text-[#55FF55]">
                    {PLAYER_STATS.vitalStats.projectsCompleted}
                  </div>
                  <div className="font-pixel text-[8px] text-[#888] mt-1">
                    PROJECTS BUILT
                  </div>
                </div>

                <div className="mc-panel-dark p-3 border-2 border-[#444] text-center">
                  <div className="font-pixel text-lg text-[#55FFFF]">
                    {PLAYER_STATS.vitalStats.codeLines}
                  </div>
                  <div className="font-pixel text-[8px] text-[#888] mt-1">
                    LINES OF CODE
                  </div>
                </div>

                <div className="mc-panel-dark p-3 border-2 border-[#444] text-center">
                  <div className="font-pixel text-lg text-[#FFAA00]">
                    {PLAYER_STATS.vitalStats.serverUptime}
                  </div>
                  <div className="font-pixel text-[8px] text-[#888] mt-1">
                    TARGET UPTIME
                  </div>
                </div>

                <div className="mc-panel-dark p-3 border-2 border-[#444] text-center col-span-2 sm:col-span-3">
                  <div className="font-pixel text-xs text-[#FFFF55] flex items-center justify-center gap-2">
                    <Award size={16} className="text-[#FFAA00]" /> 
                    <span>NATIONAL FINALIST: CANARA BANK CYBER HACKATHON 2025</span>
                  </div>
                  <div className="text-[11px] text-[#aaa] mt-1 font-sans">
                    Recognized among top developer teams nationwide for real-time fintech anomaly detection backend.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
