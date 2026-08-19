import React, { useState } from 'react';
import { QUESTS } from '../data/portfolioData';
import { QuestItem } from '../types';
import { Sparkles, CheckCircle, MapPin, Calendar, BookOpen, Star, ChevronRight } from 'lucide-react';
import { playClickSound, playXpSound } from '../utils/audio';

interface QuestLogSectionProps {
  onScoreXp: (amount: number) => void;
  onTriggerAchievement: (title: string, desc: string) => void;
}

export const QuestLogSection: React.FC<QuestLogSectionProps> = ({
  onScoreXp,
  onTriggerAchievement
}) => {
  const [selectedQuest, setSelectedQuest] = useState<QuestItem>(QUESTS[0]);

  const handleQuestSelect = (quest: QuestItem) => {
    playClickSound();
    setSelectedQuest(quest);
  };

  const handleClaimReward = (quest: QuestItem) => {
    playXpSound();
    onScoreXp(quest.rewardXp / 10);
    onTriggerAchievement("Quest Log Master", `Claimed reward for ${quest.organization}`);
  };

  return (
    <section id="quests" className="py-16 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#5D8B3B] text-white px-3 py-1 text-xs font-pixel border-2 border-[#2c5b1f] mb-2 shadow">
          <BookOpen size={14} className="text-[#FFFF55]" /> ACTIVE CAMPAIGNS
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_#000]">
          EXPERIENCE // QUEST LOG
        </h2>
        <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans mt-2 max-w-xl">
          Completed research internships, engineering milestones, and defense intelligence research expeditions.
        </p>
      </div>

      {/* Minecraft Quest Book Two-Pane Layout */}
      <div className="mc-panel-dark p-6 sm:p-8 border-4 border-black relative shadow-2xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Quest Selector List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="font-pixel text-xs text-[#FFFF55] pb-2 border-b border-[#333] flex items-center justify-between">
              <span>AVAILABLE QUESTS</span>
              <span className="text-[#55FF55]">{QUESTS.length} RECORDS</span>
            </div>

            <div className="space-y-2.5">
              {QUESTS.map((quest) => {
                const isSelected = selectedQuest.id === quest.id;
                return (
                  <div
                    key={quest.id}
                    onClick={() => handleQuestSelect(quest)}
                    className={`p-3 border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'mc-panel bg-[#d1d5db] text-black border-white shadow-md transform -translate-y-0.5'
                        : 'mc-panel-dark text-white border-[#444] hover:border-[#55FF55] hover:bg-[#252526]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 flex items-center justify-center font-pixel text-xs border ${
                          isSelected ? 'bg-[#5D8B3B] text-white border-black' : 'bg-[#111] text-[#55FF55] border-[#555]'
                        }`}>
                          {quest.type === 'Main Quest' ? '⚔️' : quest.type === 'Raid' ? '🏆' : '📜'}
                        </div>
                        <div>
                          <h4 className={`font-pixel text-[11px] sm:text-xs leading-snug ${isSelected ? 'text-black font-bold' : 'text-[#FFFF55]'}`}>
                            {quest.title}
                          </h4>
                          <span className={`text-[11px] font-sans ${isSelected ? 'text-[#374151]' : 'text-[#9ca3af]'}`}>
                            {quest.organization}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={16} className={isSelected ? 'text-black' : 'text-[#555]'} />
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[9px] font-pixel pt-2 border-t border-black/10">
                      <span className={isSelected ? 'text-[#15803d]' : 'text-[#55FF55]'}>
                        +{quest.rewardXp} XP
                      </span>
                      <span className={`px-1.5 py-0.5 border ${
                        quest.status === 'COMPLETED'
                          ? 'bg-[#5D8B3B] text-white border-[#2c5b1f]'
                          : 'bg-[#FFAA00] text-black border-[#d97706]'
                      }`}>
                        {quest.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Quest Detail Book Pane (7 cols) */}
          <div className="lg:col-span-7 mc-panel p-6 text-black relative flex flex-col justify-between">
            
            {/* Quest Parchment Header */}
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#8B5A2B] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-[#FFAA00] fill-[#FFAA00]" />
                  <span className="font-pixel text-[10px] text-[#8B5A2B] tracking-wider">
                    {selectedQuest.type.toUpperCase()} // QUEST ENTRY #{selectedQuest.id.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#5D8B3B] text-white px-2 py-0.5 text-[9px] font-pixel border border-black shadow">
                  <CheckCircle size={12} />
                  <span>{selectedQuest.status}</span>
                </div>
              </div>

              {/* Main Role & Org */}
              <h3 className="font-pixel text-base sm:text-lg text-[#1e293b] leading-tight mb-1">
                {selectedQuest.title}
              </h3>
              
              <div className="text-xs sm:text-sm font-semibold text-[#8B5A2B] mb-3">
                {selectedQuest.organization} — <span className="text-black font-medium">{selectedQuest.role}</span>
              </div>

              {/* Metadata strip */}
              <div className="flex flex-wrap gap-4 text-xs text-[#4b5563] mb-4 bg-black/5 p-2 border border-[#9ca3af]">
                <div className="flex items-center gap-1">
                  <Calendar size={13} className="text-[#8B5A2B]" />
                  <span>{selectedQuest.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={13} className="text-[#8B5A2B]" />
                  <span>{selectedQuest.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[#5D8B3B] font-bold">
                  <Sparkles size={13} />
                  <span>Reward: +{selectedQuest.rewardXp} XP</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm font-sans text-[#1f2937] leading-relaxed mb-4">
                {selectedQuest.description}
              </p>

              {/* Highlight Deliverables */}
              <div className="space-y-2 mb-5">
                <h5 className="font-pixel text-[10px] text-[#2b180a] tracking-wider">
                  QUEST OBJECTIVES & HIGHLIGHTS:
                </h5>
                <ul className="space-y-1.5">
                  {selectedQuest.highlights.map((h, i) => (
                    <li key={i} className="text-xs font-sans text-[#111827] flex items-start gap-2">
                      <span className="text-[#5D8B3B] font-bold text-sm leading-none mt-0.5">✔</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills / Loot Acquired */}
              <div>
                <h5 className="font-pixel text-[10px] text-[#2b180a] tracking-wider mb-2">
                  LOOT & ENCHANTMENTS ACQUIRED:
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedQuest.skillsGained.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2 py-1 bg-[#475569] text-white text-[10px] font-pixel border border-black shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Claim Button */}
            <div className="mt-6 pt-4 border-t-2 border-[#8B5A2B] flex items-center justify-between">
              <span className="font-pixel text-[9px] text-[#4b5563]">
                VERIFIED ARCHIVE // PESU & DRDO CAIR
              </span>
              <button
                onClick={() => handleClaimReward(selectedQuest)}
                className="mc-btn-green px-3 py-1.5 text-[10px] font-pixel flex items-center gap-1.5"
              >
                <span>⭐</span> CLAIM QUEST XP
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
