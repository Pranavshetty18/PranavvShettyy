import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Award, CheckCircle, ExternalLink, Sparkles, BookCheck } from 'lucide-react';
import { playLevelUpSound, playXpSound } from '../utils/audio';

interface LevelingUpSectionProps {
  onScoreXp: (amount: number) => void;
  onTriggerAchievement: (title: string, desc: string) => void;
}

export const LevelingUpSection: React.FC<LevelingUpSectionProps> = ({
  onScoreXp,
  onTriggerAchievement
}) => {
  const handleLevelUpClick = (edu: typeof EDUCATION_DATA[0]) => {
    playLevelUpSound();
    playXpSound();
    onScoreXp(50);
    onTriggerAchievement("Level Up Complete!", `Mastered syllabus from ${edu.institution}`);
  };

  return (
    <section id="education" className="py-16 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#5D8B3B] text-white px-3 py-1 text-xs font-pixel border-2 border-[#2c5b1f] mb-2 shadow">
          <GraduationCap size={14} className="text-[#FFFF55]" /> KNOWLEDGE TREE
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_#000]">
          EDUCATION // LEVELING UP
        </h2>
        <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans mt-2 max-w-xl">
          Academic foundations at PES University, premier data science credentials from IIT Madras, and Stanford ML specializations.
        </p>
      </div>

      {/* Level Up Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDUCATION_DATA.map((edu) => (
          <div
            key={edu.id}
            onClick={() => handleLevelUpClick(edu)}
            className="mc-panel-dark p-6 border-4 border-black relative flex flex-col justify-between hover:border-[#55FF55] transition-all cursor-pointer group shadow-xl bg-[#1e1e1f]"
          >
            <div>
              {/* Card Top Level Badge */}
              <div className="flex items-center justify-between border-b-2 border-[#333] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#333] border border-white flex items-center justify-center text-base">
                    {edu.icon === 'university' ? '🏛️' : edu.icon === 'certificate' ? '📜' : '🧠'}
                  </div>
                  <div>
                    <span className="font-pixel text-[9px] text-[#55FF55]">
                      LEVEL {edu.level} / {edu.maxLevel}
                    </span>
                    <div className="font-pixel text-[8px] text-[#888]">
                      {edu.status.toUpperCase()}
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 bg-[#55FF55] text-black text-[9px] font-pixel font-bold">
                  {edu.grade}
                </span>
              </div>

              {/* Institution and Degree */}
              <h3 className="font-pixel text-xs sm:text-sm text-[#FFFF55] leading-snug group-hover:text-white transition-colors mb-1">
                {edu.institution}
              </h3>
              
              <div className="text-xs font-semibold text-[#55FFFF] font-sans mb-1">
                {edu.degree}
              </div>

              <div className="text-[11px] text-[#9ca3af] font-sans mb-4">
                {edu.field} • <span className="text-[#FFAA00]">{edu.period}</span>
              </div>

              {/* Level XP Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-[8px] font-pixel text-[#888] mb-1">
                  <span>PROGRESS</span>
                  <span>{Math.round((edu.level / edu.maxLevel) * 100)}% COMPLETE</span>
                </div>
                <div className="w-full bg-[#000] h-3 border border-[#555] overflow-hidden">
                  <div 
                    className="bg-[#55FF55] h-full shadow-[0_0_6px_#55FF55]"
                    style={{ width: `${(edu.level / edu.maxLevel) * 100}%` }}
                  />
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-4">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-[#cbd5e1] font-sans flex items-start gap-1.5">
                    <span className="text-[#55FF55] font-bold">✔</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card Footer Button */}
            <div className="pt-3 border-t border-[#333] flex items-center justify-between">
              <span className="font-pixel text-[8px] text-[#888]">
                VERIFIED CREDENTIAL
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLevelUpClick(edu);
                }}
                className="mc-btn-green px-2.5 py-1 text-[9px] font-pixel flex items-center gap-1"
              >
                <Sparkles size={10} />
                <span>LEVEL UP!</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
