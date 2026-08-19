import React, { useState, useEffect } from 'react';
import { MinecraftBackground } from './components/MinecraftBackground';
import { MinecraftNavbar } from './components/MinecraftNavbar';
import { HeroSection } from './components/HeroSection';
import { PlayerStatsSection } from './components/PlayerStatsSection';
import { QuestLogSection } from './components/QuestLogSection';
import { InventoryGridSection } from './components/InventoryGridSection';
import { AchievementsSection } from './components/AchievementsSection';
import { EnchantmentTableSection } from './components/EnchantmentTableSection';
import { LevelingUpSection } from './components/LevelingUpSection';
import { SideQuestsSection } from './components/SideQuestsSection';
import { JoinServerSection } from './components/JoinServerSection';
import { MinecraftResumeModal } from './components/MinecraftResumeModal';
import { playLevelUpSound, toggleAudio } from './utils/audio';
import { Keyboard } from 'lucide-react';

export default function App() {
  const [xp, setXp] = useState<number>(450);
  const [level, setLevel] = useState<number>(26);
  const [isNight, setIsNight] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '1') {
        document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '2') {
        document.querySelector('#quests')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '3') {
        document.querySelector('#inventory')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '4') {
        document.querySelector('#enchantments')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key.toLowerCase() === 'r') {
        setIsResumeOpen(prev => !prev);
      } else if (e.key.toLowerCase() === 't') {
        setIsNight(prev => !prev);
      } else if (e.key.toLowerCase() === 'm') {
        toggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScoreXp = (amount: number) => {
    setXp((prev) => {
      const nextXp = prev + amount;
      if (Math.floor(nextXp / 500) > Math.floor(prev / 500)) {
        setLevel((lvl) => lvl + 1);
        playLevelUpSound();
      }
      return nextXp;
    });
  };

  return (
    <div className="min-h-screen relative text-white font-sans selection:bg-[#5D8B3B] selection:text-white">
      
      {/* Dynamic Pixel Parallax Background */}
      <MinecraftBackground isNight={isNight} />

      {/* Minecraft Written Book & Quill Resume Modal */}
      <MinecraftResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Minecraft HUD Navigation Bar */}
      <MinecraftNavbar 
        currentXp={xp}
        level={level}
        isNight={isNight}
        onToggleTime={() => setIsNight(!isNight)}
      />

      {/* Main Page Scrollable Content */}
      <main className="relative z-10 space-y-12 pb-16">
        
        {/* 1. Hero Section with Interactive Character & Basketball */}
        <HeroSection 
          onScoreXp={handleScoreXp}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. Player Stats (About / Inventory Stats) */}
        <PlayerStatsSection 
          onScoreXp={handleScoreXp}
        />

        {/* 3. Quest Log (Experience & DRDO-CAIR Research) */}
        <QuestLogSection 
          onScoreXp={handleScoreXp}
        />

        {/* 4. Projects (Inventory Grid & Item Lore Modal) */}
        <InventoryGridSection 
          onScoreXp={handleScoreXp}
        />

        {/* 5. Achievements (Achievements Section) */}
        <AchievementsSection 
          onScoreXp={handleScoreXp}
        />

        {/* 6. Skills (Enchantment Table with glowing glints) */}
        <EnchantmentTableSection 
          onScoreXp={handleScoreXp}
        />

        {/* 7. Education & Certifications (Leveling Up) */}
        <LevelingUpSection 
          onScoreXp={handleScoreXp}
        />

        {/* 8. Extracurricular (Side Quests & Athletics) */}
        <SideQuestsSection 
          onScoreXp={handleScoreXp}
        />

        {/* 9. Contact / Footer (Join Server Direct Connect) */}
        <JoinServerSection 
          onScoreXp={handleScoreXp}
        />

      </main>

      {/* Fixed Hotkey Bar at Bottom Right */}
      <div className="fixed bottom-3 right-3 z-40 hidden md:flex items-center gap-2 mc-panel-dark px-3 py-1.5 border-2 border-[#444] text-[9px] font-pixel text-[#aaa] shadow-lg opacity-85 hover:opacity-100 transition-opacity">
        <Keyboard size={12} className="text-[#55FFFF]" />
        <span>HOTKEYS:</span>
        <span className="text-[#FFFF55] bg-black/60 px-1 border border-[#555]">[1-4] NAV</span>
        <span className="text-[#FFFF55] bg-black/60 px-1 border border-[#555]">[R] RESUME</span>
        <span className="text-[#FFFF55] bg-black/60 px-1 border border-[#555]">[T] TIME</span>
        <span className="text-[#FFFF55] bg-black/60 px-1 border border-[#555]">[M] MUTE</span>
      </div>

    </div>
  );
}
