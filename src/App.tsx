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
import { AchievementToastManager, ToastItem } from './components/AchievementToastManager';
import { MinecraftResumeModal } from './components/MinecraftResumeModal';
import { playAchievementSound, playLevelUpSound, playClickSound, playBasketballBounceSound, toggleAudio, isAudioMuted } from './utils/audio';
import { Keyboard, BookOpen, Volume2, VolumeX, Moon, Sun } from 'lucide-react';

export default function App() {
  const [xp, setXp] = useState<number>(450);
  const [level, setLevel] = useState<number>(26);
  const [isNight, setIsNight] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Initial welcome toast on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerAchievement("Spawned in Portfolio", "Welcome to Pranav Shetty's Minecraft Developer World!");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

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
        triggerAchievement("Time Set", isNight ? "Set world time to Day (06:00)" : "Set world time to Night (22:00)");
      } else if (e.key.toLowerCase() === 'm') {
        const muted = toggleAudio();
        triggerAchievement("Audio Master", muted ? "Muted 8-bit sound effects" : "Enabled 8-bit sound effects");
      } else if (e.key.toLowerCase() === 'b') {
        playBasketballBounceSound();
        handleScoreXp(25);
        triggerAchievement("Fastbreak Point", "Key 'B' activated instant basketball trick! +25 XP");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNight]);

  const triggerAchievement = (title: string, description: string) => {
    playAchievementSound();
    const newToast: ToastItem = {
      id: Date.now() + Math.random(),
      title,
      description
    };
    setToasts((prev) => [...prev.slice(-2), newToast]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const handleScoreXp = (amount: number) => {
    setXp((prev) => {
      const nextXp = prev + amount;
      // Level up check (every 500 XP)
      if (Math.floor(nextXp / 500) > Math.floor(prev / 500)) {
        setLevel((lvl) => lvl + 1);
        playLevelUpSound();
        triggerAchievement("LEVEL UP!", `Reached Developer Level ${level + 1}!`);
      }
      return nextXp;
    });
  };

  const handleDismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen relative text-white font-sans selection:bg-[#5D8B3B] selection:text-white">
      
      {/* Dynamic Pixel Parallax Background */}
      <MinecraftBackground isNight={isNight} />

      {/* Real-time Minecraft Achievement Advancement Toasts */}
      <AchievementToastManager 
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

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
          onTriggerAchievement={triggerAchievement}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. Player Stats (About / Inventory Stats) */}
        <PlayerStatsSection 
          onScoreXp={handleScoreXp}
        />

        {/* 3. Quest Log (Experience & DRDO-CAIR Research) */}
        <QuestLogSection 
          onScoreXp={handleScoreXp}
          onTriggerAchievement={triggerAchievement}
        />

        {/* 4. Projects (Inventory Grid & Item Lore Modal) */}
        <InventoryGridSection 
          onScoreXp={handleScoreXp}
          onTriggerAchievement={triggerAchievement}
        />

        {/* 5. Achievements (Achievement Unlocked Toast & Canara Bank Finalist) */}
        <AchievementsSection 
          onScoreXp={handleScoreXp}
          onTriggerAchievement={triggerAchievement}
        />

        {/* 6. Skills (Enchantment Table with glowing glints) */}
        <EnchantmentTableSection 
          onScoreXp={handleScoreXp}
          onTriggerAchievement={triggerAchievement}
        />

        {/* 7. Education & Certifications (Leveling Up) */}
        <LevelingUpSection 
          onScoreXp={handleScoreXp}
          onTriggerAchievement={triggerAchievement}
        />

        {/* 8. Extracurricular (Side Quests & Athletics) */}
        <SideQuestsSection 
          onScoreXp={handleScoreXp}
          onTriggerAchievement={triggerAchievement}
        />

        {/* 9. Contact / Footer (Join Server Direct Connect) */}
        <JoinServerSection 
          onScoreXp={handleScoreXp}
          onTriggerAchievement={triggerAchievement}
        />

      </main>

      {/* Fixed Hotkey Bar at Bottom Right */}
      <div className="fixed bottom-3 right-3 z-40 hidden md:flex items-center gap-2 mc-panel-dark px-3 py-1.5 border-2 border-[#444] text-[9px] font-pixel text-[#aaa] shadow-lg opacity-85 hover:opacity-100 transition-opacity">
        <Keyboard size={12} className="text-[#55FFFF]" />
        <span>HOTKEYS:</span>
        <span className="text-[#FFFF55] bg-black/60 px-1 border border-[#555]">[1-4] NAV</span>
        <span className="text-[#FFFF55] bg-black/60 px-1 border border-[#555]">[R] RESUME</span>
        <span className="text-[#FFFF55] bg-black/60 px-1 border border-[#555]">[B] BASKETBALL</span>
        <span className="text-[#FFFF55] bg-black/60 px-1 border border-[#555]">[T] TIME</span>
      </div>

    </div>
  );
}
