import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Sparkles, X } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export interface ToastItem {
  id: number;
  title: string;
  description: string;
}

interface AchievementToastManagerProps {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}

export const AchievementToastManager: React.FC<AchievementToastManagerProps> = ({
  toasts,
  onDismiss
}) => {
  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="pointer-events-auto mc-panel-dark p-3.5 border-3 border-[#FFAA00] shadow-2xl flex items-start gap-3 bg-[#1e1e1f]"
          >
            {/* Minecraft Trophy Icon */}
            <div className="w-9 h-9 bg-[#2e1f0e] border border-[#FFAA00] flex items-center justify-center text-lg flex-shrink-0">
              🏆
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[9px] text-[#FFAA00] tracking-wider uppercase flex items-center gap-1">
                  <Sparkles size={10} /> ADVANCEMENT MADE!
                </span>
                <button
                  onClick={() => {
                    playClickSound();
                    onDismiss(toast.id);
                  }}
                  className="text-[#888] hover:text-white"
                >
                  <X size={13} />
                </button>
              </div>

              <div className="font-pixel text-xs text-white leading-tight mt-1 truncate">
                {toast.title}
              </div>
              <div className="text-[11px] text-[#cbd5e1] font-sans mt-0.5 line-clamp-2">
                {toast.description}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
