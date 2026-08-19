import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Sparkles, BookOpen, Wand2, ShieldCheck, Flame, Zap } from 'lucide-react';
import { playClickSound, playEnchantSound, playXpSound } from '../utils/audio';

interface EnchantmentTableSectionProps {
  onScoreXp: (amount: number) => void;
  onTriggerAchievement: (title: string, desc: string) => void;
}

export const EnchantmentTableSection: React.FC<EnchantmentTableSectionProps> = ({
  onScoreXp,
  onTriggerAchievement
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(SKILL_CATEGORIES[0].id);
  const [selectedEnchantment, setSelectedEnchantment] = useState<{
    name: string;
    level: string;
    description: string;
    glyph: string;
  } | null>(null);

  const currentCategoryData = SKILL_CATEGORIES.find(c => c.id === activeCategory) || SKILL_CATEGORIES[0];

  const handleSelectSkill = (skill: typeof currentCategoryData.skills[0]) => {
    playEnchantSound();
    playXpSound();
    setSelectedEnchantment(skill);
    onScoreXp(15);
    onTriggerAchievement("Master Enchanter", `Enchanted gear with ${skill.name} ${skill.level}`);
  };

  return (
    <section id="enchantments" className="py-16 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#5500AA] text-white px-3 py-1 text-xs font-pixel border-2 border-[#8800FF] mb-2 shadow">
          <Sparkles size={14} className="text-[#55FFFF]" /> MYSTICAL RUNES & ATTRIBUTES
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_#000]">
          SKILLS // ENCHANTMENT TABLE
        </h2>
        <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans mt-2 max-w-xl">
          Equip and inspect high-tier enchantments across backend engineering, core computer science, and AI models.
        </p>
      </div>

      {/* Main Enchantment Table Panel */}
      <div className="mc-panel-dark p-6 sm:p-8 border-4 border-black relative shadow-2xl">
        
        {/* Enchantment Table Header UI with 3D Book Visual */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-[#333] pb-6 mb-6">
          
          {/* Floating Enchantment Book Representation */}
          <div className="flex items-center gap-4">
            {/* Enchanting Table Pedestal */}
            <div className="w-16 h-16 bg-[#731c24] border-4 border-[#2b070b] relative flex items-center justify-center shadow-lg">
              {/* Obsidian corners */}
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#141021]" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-[#141021]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#141021]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#141021]" />

              {/* Floating Open Book */}
              <div className="text-2xl animate-pixel-bounce filter drop-shadow-[0_0_8px_#55FFFF]">
                📖
              </div>
            </div>

            <div>
              <h3 className="font-pixel text-sm sm:text-base text-[#FFFF55]">
                ENCHANTMENT ALTAR // LEVEL 30 READY
              </h3>
              <p className="text-xs text-[#a855f7] font-pixel mt-1 flex items-center gap-1.5">
                <span>ᔑ ʖ ᓵ ↸ ᒷ ⎓ ⊣ ⍑ ╎</span>
                <span className="text-[#9ca3af] font-sans text-xs">Standard Galactic Runes</span>
              </p>
            </div>
          </div>

          {/* Lapis Lazuli Slot & Status */}
          <div className="flex items-center gap-3 bg-[#111] px-4 py-2 border border-[#444]">
            <div className="w-6 h-6 bg-[#0000AA] border border-[#5555FF] flex items-center justify-center text-xs text-white font-pixel">
              💎
            </div>
            <div className="font-pixel text-[10px]">
              <div className="text-[#55FFFF]">LAPIS INFUSED</div>
              <div className="text-[#55FF55]">30 LEVELS CONSUMED</div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs (Minecraft Style) */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-2 text-[10px] font-pixel transition-all flex items-center gap-2 ${
                  isActive
                    ? 'mc-btn-green text-white shadow-md'
                    : 'mc-btn text-[#ccc] hover:text-[#FFFF55]'
                }`}
              >
                <span>{cat.id === 'languages-core' ? '💻' : cat.id === 'systems-backend' ? '⚙️' : cat.id === 'ai-ml-cv' ? '🧠' : '🚀'}</span>
                <span>{cat.name.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Glowing Grid (Enchantment Pills) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {currentCategoryData.skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              onClick={() => handleSelectSkill(skill)}
              className="mc-slot p-3 relative mc-enchanted group cursor-pointer hover:border-[#AA00AA] transition-all bg-[#1a1824]"
            >
              <div className="flex items-start justify-between gap-2 relative z-10">
                <div className="flex items-center gap-2">
                  {/* Runic glyph box */}
                  <div className="w-7 h-7 bg-[#2e1045] border border-[#8800FF] flex items-center justify-center font-pixel text-xs text-[#55FFFF] flex-shrink-0 group-hover:scale-110 transition-transform">
                    {skill.glyph}
                  </div>
                  <div>
                    <h4 className="font-pixel text-[11px] text-[#FFFF55] group-hover:text-white transition-colors">
                      {skill.name}
                    </h4>
                    <span className="font-pixel text-[9px] text-[#AA00AA]">
                      ENCHANTMENT LEVEL {skill.level}
                    </span>
                  </div>
                </div>

                <span className="font-pixel text-[9px] text-[#55FF55] bg-black/60 px-1.5 py-0.5 border border-[#55FF55]/40">
                  {skill.level}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#cbd5e1] font-sans mt-2 relative z-10 leading-relaxed">
                {skill.description}
              </p>

              {/* Subtle hover prompt */}
              <div className="mt-2.5 pt-1.5 border-t border-[#333] flex items-center justify-between text-[8px] font-pixel text-[#888] relative z-10">
                <span className="text-[#a855f7]">COST: 3 LEVELS</span>
                <span className="text-[#55FFFF] group-hover:text-[#FFFF55]">ENCHANT ▶</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Selected Enchantment Lore Toast / Drawer if active */}
      {selectedEnchantment && (
        <div className="mt-4 mc-tooltip p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5500AA] border-2 border-[#55FFFF] flex items-center justify-center font-pixel text-lg text-white">
              {selectedEnchantment.glyph}
            </div>
            <div>
              <div className="font-pixel text-xs text-[#FFFF55]">
                ENCHANTED WITH: {selectedEnchantment.name} {selectedEnchantment.level}
              </div>
              <div className="text-xs text-[#e2e8f0] font-sans">
                {selectedEnchantment.description}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setSelectedEnchantment(null)}
            className="mc-btn px-3 py-1.5 text-[9px] font-pixel text-white hover:text-[#FF5555] flex-shrink-0"
          >
            DISMISS ✕
          </button>
        </div>
      )}

    </section>
  );
};
