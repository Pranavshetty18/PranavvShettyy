import React from 'react';
import { EXTRACURRICULAR } from '../data/portfolioData';
import { Trophy, Activity, Zap, Compass, Shield, Flame } from 'lucide-react';
import { playClickSound, playBasketballBounceSound, playXpSound } from '../utils/audio';

interface SideQuestsSectionProps {
  onScoreXp: (amount: number) => void;
  onTriggerAchievement: (title: string, desc: string) => void;
}

export const SideQuestsSection: React.FC<SideQuestsSectionProps> = ({
  onScoreXp,
  onTriggerAchievement
}) => {
  const handleBadgeClick = (sideQuest: typeof EXTRACURRICULAR[0]) => {
    if (sideQuest.sport === 'Basketball') {
      playBasketballBounceSound();
    } else {
      playClickSound();
    }
    playXpSound();
    onScoreXp(30);
    onTriggerAchievement("Dual-Threat Athlete", `Activated speed buff: ${sideQuest.title}`);
  };

  return (
    <section id="extracurricular" className="py-16 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#8B5A2B] text-[#FFFF55] px-3 py-1 text-xs font-pixel border-2 border-[#57371a] mb-2 shadow">
          <Activity size={14} className="text-[#55FFFF]" /> ATHLETIC DIVISION
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_#000]">
          EXTRACURRICULAR // SIDE QUESTS
        </h2>
        <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans mt-2 max-w-xl">
          Competitive athleticism, court vision, and high-intensity sprint discipline powering resilient engineering stamina.
        </p>
      </div>

      {/* Side Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXTRACURRICULAR.map((quest) => (
          <div
            key={quest.id}
            onClick={() => handleBadgeClick(quest)}
            className="mc-panel-dark p-6 sm:p-8 border-4 border-black relative flex flex-col justify-between hover:border-[#FFAA00] transition-all cursor-pointer group shadow-2xl bg-[#1e1e1f]"
          >
            <div>
              {/* Badge Top Header */}
              <div className="flex items-center justify-between border-b-2 border-[#333] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#2d1b0d] border-2 border-[#FFAA00] flex items-center justify-center text-2xl shadow">
                    {quest.sport === 'Basketball' ? '🏀' : '🏃‍♂️'}
                  </div>
                  <div>
                    <h3 className="font-pixel text-xs sm:text-sm text-[#FFFF55] group-hover:text-white transition-colors">
                      {quest.title}
                    </h3>
                    <span className="text-xs text-[#55FF55] font-sans font-semibold">
                      {quest.role}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 bg-[#FFAA00] text-black text-[9px] font-pixel font-bold">
                  PRO ATHLETE
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans leading-relaxed mb-4">
                {quest.description}
              </p>

              {/* Attribute Boosts Badges */}
              <div className="mb-4">
                <span className="font-pixel text-[9px] text-[#FFAA00] tracking-wider block mb-2">
                  PASSIVE STAT BOOSTS (APPLIED TO DEV):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {quest.stats.map((st, idx) => (
                    <div key={idx} className="bg-[#111] p-2 border border-[#444] text-center">
                      <div className="text-[10px] text-[#888] font-pixel">{st.attribute}</div>
                      <div className="font-pixel text-[10px] text-[#55FF55] mt-1 font-bold">
                        {st.boost}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Achievements */}
              <div className="space-y-1.5 mb-4">
                <span className="font-pixel text-[9px] text-[#55FFFF] tracking-wider block">
                  ATHLETIC HIGHLIGHTS:
                </span>
                <ul className="space-y-1">
                  {quest.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="text-xs text-[#cbd5e1] font-sans flex items-start gap-1.5">
                      <span className="text-[#FFAA00] font-bold">▪</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Interactivity Strip */}
            <div className="pt-3 border-t border-[#333] flex items-center justify-between">
              <span className="font-pixel text-[9px] text-[#888]">
                CLICK TO ACTIVATE SPEED BUFF
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBadgeClick(quest);
                }}
                className="mc-btn px-3 py-1 text-[9px] font-pixel flex items-center gap-1.5 text-white hover:text-[#FFFF55]"
              >
                <span>⚡</span> EQUIP BUFF
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
