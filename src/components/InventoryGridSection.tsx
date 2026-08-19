import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ExternalLink, Github, Sparkles, Layers, Box, Cpu, Eye, X } from 'lucide-react';
import { playChestOpenSound, playClickSound, playXpSound } from '../utils/audio';

interface InventoryGridSectionProps {
  onScoreXp: (amount: number) => void;
  onTriggerAchievement: (title: string, desc: string) => void;
}

export const InventoryGridSection: React.FC<InventoryGridSectionProps> = ({
  onScoreXp,
  onTriggerAchievement
}) => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(0);

  const handleOpenProject = (project: ProjectItem, index: number) => {
    playChestOpenSound();
    playXpSound();
    setActiveProject(project);
    setSelectedSlotIndex(index);
    onScoreXp(20);
    onTriggerAchievement("Inventory Master", `Inspected project: ${project.title}`);
  };

  const getSlotIconEmoji = (icon: ProjectItem['slotIcon']) => {
    switch (icon) {
      case 'sword': return '🗡️';
      case 'potion': return '🧪';
      case 'bow': return '🏹';
      case 'comparator': return '🔬';
      case 'redstone': return '⚡';
      case 'diamond': return '💎';
      case 'shield': return '🛡️';
      default: return '📦';
    }
  };

  return (
    <section id="inventory" className="py-16 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#AA00AA] text-white px-3 py-1 text-xs font-pixel border-2 border-[#550055] mb-2 shadow">
          <Box size={14} className="text-[#55FFFF]" /> CRAFTING & CODE ARTIFACTS
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_#000]">
          PROJECTS // INVENTORY GRID
        </h2>
        <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans mt-2 max-w-xl">
          Click any inventory slot or project card to inspect lore, architecture blueprints, and GitHub source code.
        </p>
      </div>

      {/* Main Minecraft Inventory UI */}
      <div className="mc-panel-dark p-6 sm:p-8 border-4 border-black relative shadow-2xl">
        
        {/* Hotbar / Slot Selector Strip */}
        <div className="mb-8">
          <div className="flex items-center justify-between border-b-2 border-[#333] pb-3 mb-4">
            <span className="font-pixel text-xs text-[#FFFF55]">
              QUICK HOTBAR SLOTS (CLICK TO INSPECT)
            </span>
            <span className="font-pixel text-[10px] text-[#55FF55]">
              4 / 4 SLOTS OCCUPIED
            </span>
          </div>

          {/* Quick Slots Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PROJECTS.map((proj, idx) => {
              const isSelected = selectedSlotIndex === idx;
              return (
                <div
                  key={proj.id}
                  onClick={() => handleOpenProject(proj, idx)}
                  className={`p-3 transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected ? 'mc-slot-active bg-[#373737]' : 'mc-slot hover:border-[#55FF55]'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#1e1e1f] border border-black flex items-center justify-center font-pixel text-lg flex-shrink-0">
                    {getSlotIconEmoji(proj.slotIcon)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-pixel text-[10px] sm:text-[11px] text-white truncate">
                      {proj.title}
                    </div>
                    <div className="text-[10px] text-[#55FF55] font-mono truncate">
                      {proj.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projects Grid Display (Card view matching inventory slots) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project, index)}
              className="mc-panel bg-[#d1d5db] p-5 text-black relative flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all group"
            >
              {/* Card Top */}
              <div>
                {/* Header with Slot Icon and Rarity Badge */}
                <div className="flex items-start justify-between gap-2 border-b-2 border-[#888] pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-[#1e1e1f] border-2 border-black flex items-center justify-center font-pixel text-xl shadow">
                      {getSlotIconEmoji(project.slotIcon)}
                    </div>
                    <div>
                      <h3 className="font-pixel text-xs sm:text-sm text-[#111827] group-hover:text-[#1d4ed8] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-semibold text-[#8B5A2B]">
                        {project.subtitle}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 text-[9px] font-pixel border border-black ${
                    project.rarity === 'Legendary' ? 'bg-[#FFAA00] text-black font-bold' : 'bg-[#AA00AA] text-white'
                  }`}>
                    {project.rarity}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm font-sans text-[#374151] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Bullet Highlights as requested */}
                <div className="space-y-1.5 mb-4">
                  <span className="font-pixel text-[9px] text-[#4b5563] tracking-wider block">
                    HIGHLIGHTS & CAPABILITIES:
                  </span>
                  <ul className="space-y-1">
                    {project.bulletHighlights.slice(0, 3).map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs font-sans text-[#1f2937] flex items-start gap-1.5">
                        <span className="text-[#5D8B3B] font-bold">▪</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2 py-0.5 bg-[#475569] text-white text-[9px] font-pixel border border-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with Buttons */}
              <div className="pt-3 border-t-2 border-[#888] flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-[#15803d] font-semibold">
                  {project.metrics}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                    }}
                    className="mc-btn px-2.5 py-1.5 text-[10px] font-pixel flex items-center gap-1.5 text-white hover:text-[#FFFF55]"
                  >
                    <Github size={12} />
                    <span>GITHUB</span>
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProject(project, index);
                    }}
                    className="mc-btn-green px-2.5 py-1.5 text-[10px] font-pixel flex items-center gap-1"
                  >
                    <Eye size={12} />
                    <span>LORE</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Minecraft Chest Item Lore Inspection Modal */}
      {activeProject && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="mc-panel-wood max-w-2xl w-full p-6 sm:p-8 relative text-white border-4 border-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playClickSound();
                setActiveProject(null);
              }}
              className="absolute top-3 right-3 mc-btn p-1 text-white hover:text-[#FF5555]"
            >
              <X size={18} />
            </button>

            {/* Chest Modal Header */}
            <div className="flex items-center gap-3 border-b-2 border-[#57371a] pb-4 mb-4">
              <div className="w-12 h-12 bg-[#1e1e1f] border-2 border-black flex items-center justify-center text-2xl">
                {getSlotIconEmoji(activeProject.slotIcon)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-pixel text-sm sm:text-base text-[#FFFF55]">
                    {activeProject.title}
                  </h3>
                  <span className="px-1.5 py-0.5 bg-[#FFAA00] text-black text-[9px] font-pixel font-bold">
                    {activeProject.rarity}
                  </span>
                </div>
                <p className="text-xs text-[#e2e8f0]">
                  {activeProject.subtitle} // Category: {activeProject.category}
                </p>
              </div>
            </div>

            {/* Modal Body: Minecraft Tooltip Style */}
            <div className="mc-tooltip p-4 space-y-4 mb-6">
              
              {/* Lore Enchantments */}
              {activeProject.enchantments && (
                <div className="space-y-1">
                  {activeProject.enchantments.map((ench, eIdx) => (
                    <div key={eIdx} className="font-pixel text-xs text-[#AA00AA] flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#FFAA00]" />
                      <span>{ench}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Full description */}
              <p className="text-xs sm:text-sm text-[#e2e8f0] font-sans leading-relaxed">
                {activeProject.description}
              </p>

              {/* Full bullet highlights */}
              <div>
                <h4 className="font-pixel text-[10px] text-[#55FFFF] mb-2">
                  KEY DELIVERABLES & TECHNICAL IMPLEMENTATION:
                </h4>
                <ul className="space-y-1.5">
                  {activeProject.bulletHighlights.map((b, i) => (
                    <li key={i} className="text-xs text-[#cbd5e1] flex items-start gap-2">
                      <span className="text-[#55FF55] font-bold">✔</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Details */}
              {activeProject.architectureDetails && (
                <div className="bg-black/50 p-2.5 border border-[#444]">
                  <div className="font-pixel text-[9px] text-[#FFAA00] mb-1">
                    SYSTEM BLUEPRINT // ARCHITECTURE:
                  </div>
                  <div className="text-xs text-[#94a3b8] font-mono">
                    {activeProject.architectureDetails}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <div className="font-pixel text-[9px] text-[#55FF55] mb-1.5">
                  STACK PREREQUISITES:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[#1e293b] text-[#55FFFF] text-[9px] font-pixel border border-[#334155]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <span className="font-pixel text-[9px] text-[#cbd5e1]">
                PRESS ESC OR CLICK OUTSIDE TO CLOSE
              </span>

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="mc-btn-green px-4 py-2 text-xs font-pixel flex items-center gap-2"
              >
                <Github size={14} />
                <span>VIEW ON GITHUB ▶</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
