import React from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { Trophy, Award, Medal, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { playAchievementSound, playClickSound } from '../utils/audio';

interface AchievementsSectionProps {
  onTriggerAchievement: (title: string, desc: string) => void;
  onScoreXp: (amount: number) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  onTriggerAchievement,
  onScoreXp
}) => {
  const handleTestToast = (ach: typeof ACHIEVEMENTS[0]) => {
    playAchievementSound();
    onTriggerAchievement(ach.title, ach.description);
    onScoreXp(ach.points / 20);
  };

  return (
    <section id="achievements" className="py-16 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#FFAA00] text-black px-3 py-1 text-xs font-pixel border-2 border-[#b37400] mb-2 shadow font-bold">
          <Trophy size={14} className="text-black" /> HALL OF FAME
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_#000]">
          ACHIEVEMENT UNLOCKED!
        </h2>
        <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans mt-2 max-w-xl">
          National hackathon recognitions, research fellowships, and competitive athletic honors.
        </p>
      </div>

      {/* Main Achievement Toasts Display */}
      <div className="mc-panel-dark p-6 sm:p-8 border-4 border-black relative shadow-2xl space-y-6">
        
        {/* Featured Banner: Canara Bank SuRaksha Cyber Hackathon 2025 */}
        <div className="mc-panel bg-[#1c1917] p-6 text-white border-4 border-[#FFAA00] relative overflow-hidden shadow-xl">
          {/* Glowing Animated Background Glint */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Trophy size={200} className="text-[#FFAA00]" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              {/* Trophy Icon Box */}
              <div className="w-16 h-16 bg-[#292524] border-2 border-[#FFAA00] flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                🏆
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-pixel text-[10px] text-[#FFAA00] tracking-widest uppercase">
                    FEATURED RAID // NATIONAL RECOGNITION
                  </span>
                  <span className="px-2 py-0.5 bg-[#5D8B3B] text-white text-[8px] font-pixel border border-black">
                    VERIFIED 2025
                  </span>
                </div>

                <h3 className="font-pixel text-base sm:text-xl text-[#FFFF55] leading-snug">
                  National Finalist — Canara Bank SuRaksha Cyber Hackathon 2025
                </h3>

                <p className="text-xs sm:text-sm text-[#e2e8f0] font-sans mt-2 max-w-2xl leading-relaxed">
                  Competed at the national level building high-throughput backend anomaly detection systems for real-time banking cybersecurity and transactional fraud prevention.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 flex-shrink-0 w-full md:w-auto">
              <div className="font-pixel text-xs text-[#55FF55]">
                +1,500 REPUTATION XP
              </div>
              <button
                onClick={() => handleTestToast(ACHIEVEMENTS[0])}
                className="mc-btn-green w-full md:w-auto px-4 py-2 text-[10px] font-pixel flex items-center justify-center gap-1.5"
              >
                <span>🔔</span> POP TOAST
              </button>
            </div>
          </div>
        </div>

        {/* All Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              onClick={() => handleTestToast(ach)}
              className="mc-slot p-4 flex flex-col justify-between hover:border-[#FFAA00] transition-all cursor-pointer group bg-[#262626]"
            >
              <div>
                {/* Minecraft Toast Header style */}
                <div className="flex items-center justify-between border-b border-[#444] pb-2 mb-3">
                  <span className="font-pixel text-[9px] text-[#FFAA00] flex items-center gap-1">
                    <Sparkles size={11} /> ADVANCEMENT
                  </span>
                  <span className="font-pixel text-[8px] text-[#888]">
                    {ach.date}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#1a1a1a] border border-[#555] flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                    {ach.icon === 'trophy' ? '🏆' : ach.icon === 'diamond' ? '💎' : '🏅'}
                  </div>

                  <div>
                    <h4 className="font-pixel text-[11px] text-[#FFFF55] leading-tight group-hover:text-white transition-colors">
                      {ach.title}
                    </h4>
                    <p className="text-[11px] text-[#9ca3af] font-sans mt-1">
                      {ach.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#cbd5e1] font-sans mt-3 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#444] flex items-center justify-between text-[9px] font-pixel">
                <span className="text-[#55FF55]">+{ach.points} XP</span>
                <span className="text-[#55FFFF] group-hover:underline">CLICK TO PING ▶</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
