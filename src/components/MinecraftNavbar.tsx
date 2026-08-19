import React, { useState } from 'react';
import { Volume2, VolumeX, Sun, Moon, Menu, X, Compass } from 'lucide-react';
import { playClickSound, toggleSound, isSoundEnabled } from '../utils/audio';

interface MinecraftNavbarProps {
  currentXp: number;
  maxXp?: number;
  level: number;
  isNight: boolean;
  onToggleTime: () => void;
}

export const MinecraftNavbar: React.FC<MinecraftNavbarProps> = ({
  currentXp,
  maxXp = 1000,
  level,
  isNight,
  onToggleTime
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const xpPercent = Math.min(100, Math.max(5, (currentXp % 100) || 45));

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const navLinks = [
    { name: "STATS", href: "#stats" },
    { name: "QUESTS", href: "#quests" },
    { name: "INVENTORY", href: "#inventory" },
    { name: "ENCHANT", href: "#enchantments" },
    { name: "ACHIEVEMENTS", href: "#achievements" },
    { name: "LEVEL UP", href: "#education" },
    { name: "JOIN SERVER", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1e1e1f]/95 border-b-4 border-[#0e0e0e] shadow-xl backdrop-blur-sm">
      {/* Top Minecraft HUD Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left: Player Title Badge */}
        <div className="flex items-center gap-3">
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center gap-2 group"
          >
            {/* Minecraft Head Avatar Icon */}
            <div className="w-8 h-8 bg-[#e0aa78] border-2 border-black relative overflow-hidden flex-shrink-0 group-hover:border-[#55FF55] transition-colors">
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-[#2c1d11]" />
              <div className="absolute top-3 left-1 w-1.5 h-1.5 bg-white border border-[#2c1d11]">
                <div className="w-1 h-1 bg-[#4a2e18]" />
              </div>
              <div className="absolute top-3 right-1 w-1.5 h-1.5 bg-white border border-[#2c1d11]">
                <div className="w-1 h-1 bg-[#4a2e18]" />
              </div>
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#965438]" />
            </div>
            <div className="flex flex-col">
              <span className="font-pixel text-[11px] sm:text-xs text-[#FFFF55] tracking-wider group-hover:text-white transition-colors drop-shadow-[0_2px_2px_#000]">
                PRANAV_SHETTY
              </span>
              <span className="text-[10px] font-pixel text-[#55FF55]">
                Lv.{level} DEV
              </span>
            </div>
          </a>

          {/* Minecraft Hearts (Health HUD) - Hidden on ultra small screens */}
          <div className="hidden lg:flex items-center gap-1 ml-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-red-500 text-sm drop-shadow-[0_1px_1px_#000]" title="100% Health">
                ❤️
              </span>
            ))}
            <span className="font-pixel text-[9px] text-[#FFAA00] ml-1">20/20 HP</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Buttons */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="mc-btn px-2.5 py-1.5 text-[10px] font-pixel tracking-wider hover:text-[#FFFF55] transition-all"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right: Controls (Day/Night, Sound, Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="mc-btn p-1.5 text-xs flex items-center justify-center"
            title={soundOn ? "Mute 8-bit Audio" : "Enable 8-bit Audio"}
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 size={16} className="text-[#55FF55]" /> : <VolumeX size={16} className="text-[#FF5555]" />}
          </button>

          {/* Time Cycle Toggle */}
          <button
            onClick={() => {
              playClickSound();
              onToggleTime();
            }}
            className="mc-btn p-1.5 text-xs flex items-center justify-center"
            title={isNight ? "Switch to Day Time" : "Switch to Night Time"}
            aria-label="Toggle day/night"
          >
            {isNight ? <Sun size={16} className="text-[#FFAA00]" /> : <Moon size={16} className="text-[#55FFFF]" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden mc-btn p-1.5 text-xs"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Minecraft XP Experience Bar Under Navbar */}
      <div className="w-full bg-[#000000] h-2.5 relative border-t border-b border-[#222] overflow-hidden flex items-center justify-center">
        {/* Fill */}
        <div 
          className="absolute left-0 top-0 bottom-0 bg-[#55FF55] transition-all duration-300 shadow-[0_0_8px_#55FF55]"
          style={{ width: `${xpPercent}%` }}
        />
        {/* Tick markers */}
        <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-30">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="w-[1px] h-full bg-black" />
          ))}
        </div>
        {/* Level badge in center */}
        <span className="relative z-10 font-pixel text-[8px] text-[#FFFFFF] drop-shadow-[0_1px_2px_#000] font-bold">
          XP {currentXp}
        </span>
      </div>

      {/* Mobile Menu Dropdown (Minecraft Pause Menu Style) */}
      {mobileMenuOpen && (
        <div className="md:hidden mc-panel-dark mx-4 my-2 p-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b-2 border-[#333] pb-2 mb-1">
            <span className="font-pixel text-xs text-[#FFFF55] flex items-center gap-1.5">
              <Compass size={14} className="text-[#55FFFF]" /> GAME MENU
            </span>
            <span className="font-pixel text-[9px] text-[#888]">SELECT REALM</span>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="mc-btn w-full py-2 text-[11px] font-pixel text-left px-3 hover:text-[#FFFF55]"
            >
              ▶ {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
