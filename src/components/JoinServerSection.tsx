import React, { useState } from 'react';
import { HERO_DATA } from '../data/portfolioData';
import { Mail, Github, MapPin, Send, Copy, Check, Server, Wifi, Phone } from 'lucide-react';
import { playClickSound, playLevelUpSound, playXpSound } from '../utils/audio';

interface JoinServerSectionProps {
  onScoreXp: (amount: number) => void;
  onTriggerAchievement: (title: string, desc: string) => void;
}

export const JoinServerSection: React.FC<JoinServerSectionProps> = ({
  onScoreXp,
  onTriggerAchievement
}) => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState<'idle' | 'transmitting' | 'connected'>('idle');

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(HERO_DATA.email);
    setCopied(true);
    playXpSound();
    onScoreXp(10);
    onTriggerAchievement("Direct Connection", "Copied Pranav's server email to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    playClickSound();
    setSendStatus('transmitting');

    setTimeout(() => {
      setSendStatus('connected');
      playLevelUpSound();
      onScoreXp(100);
      onTriggerAchievement("Server Connected!", "Transmitted packet to Pranav's inbox!");
      
      // Also open mailto as fallback so message is actually sendable
      const mailtoLink = `mailto:${HERO_DATA.email}?subject=Hello from ${encodeURIComponent(senderName || 'Minecraft Recruiter')}&body=${encodeURIComponent(message + '\n\nFrom: ' + senderEmail)}`;
      window.location.href = mailtoLink;
    }, 1200);
  };

  return (
    <footer id="contact" className="py-16 px-4 max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#5D8B3B] text-white px-3 py-1 text-xs font-pixel border-2 border-[#2c5b1f] mb-2 shadow">
          <Server size={14} className="text-[#FFFF55]" /> MULTIPLAYER LOBBY
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_#000]">
          JOIN SERVER // DIRECT CONNECT
        </h2>
        <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans mt-2 max-w-xl">
          Connect directly to collaborate on backend microservices, distributed systems, or research inquiries.
        </p>
      </div>

      {/* Minecraft Direct Connect GUI Screen */}
      <div className="mc-panel-dark p-6 sm:p-10 border-4 border-black relative shadow-2xl space-y-8">
        
        {/* Server Status Header Bar */}
        <div className="bg-[#111] p-4 border-2 border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5D8B3B] border-2 border-black flex items-center justify-center font-pixel text-lg text-white">
              🟩
            </div>
            <div>
              <div className="font-pixel text-xs text-[#FFFF55]">
                PRANAV_SHETTY.DEV [24/7 DEDICATED HOST]
              </div>
              <div className="text-[11px] text-[#9ca3af] font-mono mt-0.5">
                Version: Java 21 / Spring Boot 3.4 // Protocol: REST/gRPC
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 5 Green Signal Ping Bars */}
            <div className="flex items-end gap-1 h-5" title="Latency: 12ms (Optimal)">
              <div className="w-1.5 h-2 bg-[#55FF55]" />
              <div className="w-1.5 h-3 bg-[#55FF55]" />
              <div className="w-1.5 h-4 bg-[#55FF55]" />
              <div className="w-1.5 h-5 bg-[#55FF55]" />
              <div className="w-1.5 h-5 bg-[#55FF55]" />
            </div>
            <span className="font-pixel text-[10px] text-[#55FF55]">12ms PING</span>
          </div>
        </div>

        {/* Server IP & Coordinates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Email / Server IP */}
          <div className="mc-slot p-3 flex flex-col justify-between bg-[#242424]">
            <div>
              <span className="font-pixel text-[8px] text-[#888] flex items-center gap-1">
                <Mail size={11} className="text-[#55FFFF]" /> SERVER IP (EMAIL)
              </span>
              <div className="font-mono text-xs text-white break-all mt-1 font-semibold">
                {HERO_DATA.email}
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="mt-3 mc-btn w-full py-1 text-[9px] font-pixel flex items-center justify-center gap-1 hover:text-[#FFFF55]"
            >
              {copied ? <Check size={12} className="text-[#55FF55]" /> : <Copy size={12} />}
              <span>{copied ? "IP COPIED!" : "COPY IP"}</span>
            </button>
          </div>

          {/* GitHub Portal */}
          <div className="mc-slot p-3 flex flex-col justify-between bg-[#242424]">
            <div>
              <span className="font-pixel text-[8px] text-[#888] flex items-center gap-1">
                <Github size={11} className="text-[#FFAA00]" /> REPOSITORY REALM
              </span>
              <div className="font-mono text-xs text-white break-all mt-1 font-semibold">
                github.com/Pranavshetty18
              </div>
            </div>
            <a
              href={HERO_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="mt-3 mc-btn-green w-full py-1 text-[9px] font-pixel flex items-center justify-center gap-1"
            >
              <span>TELEPORT ▶</span>
            </a>
          </div>

          {/* Location & Timezone */}
          <div className="mc-slot p-3 flex flex-col justify-between bg-[#242424]">
            <div>
              <span className="font-pixel text-[8px] text-[#888] flex items-center gap-1">
                <MapPin size={11} className="text-[#FF5555]" /> SPAWN CHUNK
              </span>
              <div className="font-mono text-xs text-white mt-1 font-semibold">
                Bengaluru, India (IST)
              </div>
            </div>
            <div className="mt-3 bg-black/50 py-1 text-center font-pixel text-[9px] text-[#55FF55] border border-[#444]">
              OPEN FOR WORK 🌐
            </div>
          </div>

        </div>

        {/* Transmission / Direct Message Form */}
        <form onSubmit={handleSendMessage} className="space-y-4 pt-2 border-t-2 border-[#333]">
          <div className="font-pixel text-xs text-[#FFFF55] flex items-center gap-2">
            <Send size={14} className="text-[#55FFFF]" /> TRANSMIT CHAT PACKET
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-pixel text-[9px] text-[#aaa] block mb-1">
                PLAYER USERNAME / NAME
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Steve / Hiring Manager"
                className="w-full bg-[#111] border-2 border-[#555] p-2.5 text-xs text-white font-mono focus:border-[#55FF55] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-pixel text-[9px] text-[#aaa] block mb-1">
                RETURN IP / EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="recruiter@tech.com"
                className="w-full bg-[#111] border-2 border-[#555] p-2.5 text-xs text-white font-mono focus:border-[#55FF55] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-pixel text-[9px] text-[#aaa] block mb-1">
              PACKET PAYLOAD / MESSAGE
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message details, role discussion, or project collaboration request..."
              className="w-full bg-[#111] border-2 border-[#555] p-2.5 text-xs text-white font-mono focus:border-[#55FF55] focus:outline-none"
            />
          </div>

          {/* Form Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-[10px] font-pixel text-[#888]">
              {sendStatus === 'connected' ? (
                <span className="text-[#55FF55]">✔ PACKET TRANSMITTED SUCCESSFULLY!</span>
              ) : sendStatus === 'transmitting' ? (
                <span className="text-[#FFAA00]">TRANSMITTING TO INBOX...</span>
              ) : (
                <span>DIRECT PROTOCOL // NO SPAM</span>
              )}
            </div>

            <button
              type="submit"
              disabled={sendStatus === 'transmitting'}
              className="mc-btn-green w-full sm:w-auto px-6 py-3 text-xs font-pixel flex items-center justify-center gap-2 shadow-lg"
            >
              <Send size={14} />
              <span>CONNECT ▶ TRANSMIT</span>
            </button>
          </div>
        </form>

        {/* Footer Credits */}
        <div className="border-t border-[#333] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-pixel text-[#777]">
          <div>
            Crafted for <strong className="text-white">PRANAV SHETTY</strong> © {new Date().getFullYear()}
          </div>
          <div className="text-[#55FF55]">
            BUILT WITH REACT, TAILWIND & PIXEL CRAFT
          </div>
        </div>

      </div>

    </footer>
  );
};
