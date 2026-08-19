import React, { useState } from 'react';
import { HERO_DATA, QUESTS, PROJECTS, EDUCATION_DATA, ACHIEVEMENTS, SKILL_CATEGORIES, EXTRACURRICULAR } from '../data/portfolioData';
import { X, Download, Printer, BookOpen, ChevronLeft, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { playClickSound, playChestOpenSound } from '../utils/audio';

interface MinecraftResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MinecraftResumeModal: React.FC<MinecraftResumeModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 2;

  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="mc-panel-wood max-w-4xl w-full p-6 sm:p-8 relative text-black border-4 border-black shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 mc-btn p-1 text-white hover:text-[#FF5555] z-20"
          aria-label="Close book"
        >
          <X size={20} />
        </button>

        {/* Book Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#57371a] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3a2211] border-2 border-[#c28853] flex items-center justify-center text-xl text-white shadow">
              📖
            </div>
            <div>
              <h3 className="font-pixel text-sm sm:text-base text-[#FFFF55]">
                BOOK & QUILL: PRANAV_SHETTY_RESUME.MD
              </h3>
              <p className="text-xs text-[#e2e8f0]">
                Original Written Work // Certified Candidate Dossier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="mc-btn px-3 py-1.5 text-[10px] font-pixel flex items-center gap-1.5 text-white hover:text-[#FFFF55]"
              title="Print Resume"
            >
              <Printer size={12} />
              <span>PRINT / PDF</span>
            </button>
          </div>
        </div>

        {/* The Open Book Parchment Area */}
        <div className="mc-panel bg-[#f5e6cb] p-6 sm:p-8 border-4 border-[#8B5A2B] text-[#1e1b18] shadow-inner relative min-h-[480px]">
          
          {/* Top Page Indicator */}
          <div className="flex items-center justify-between text-[10px] font-pixel text-[#8B5A2B] border-b border-[#8B5A2B]/30 pb-2 mb-4">
            <span>RESUME DOSSIER</span>
            <span>PAGE {currentPage} OF {totalPages}</span>
          </div>

          {/* PAGE 1 CONTENT: Summary, Education, Experience & Projects */}
          {currentPage === 1 && (
            <div className="space-y-5 animate-in fade-in">
              {/* Header Info */}
              <div className="border-b-2 border-[#8B5A2B] pb-3">
                <h1 className="font-pixel text-xl sm:text-2xl text-[#1a1410] tracking-tight">
                  PRANAV SHETTY
                </h1>
                <div className="font-semibold text-xs sm:text-sm text-[#8B5A2B] mt-0.5">
                  Computer Science Undergrad • Backend Developer • Data Science Certified
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#4a3b2c] mt-2 font-mono">
                  <span>📧 {HERO_DATA.email}</span>
                  <span>📍 Bengaluru, India</span>
                  <span>🌐 {HERO_DATA.githubUsername}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="font-pixel text-xs text-[#8B5A2B] mb-1">
                  PROFESSIONAL SUMMARY
                </h4>
                <p className="text-xs sm:text-sm text-[#2d241e] font-sans leading-relaxed">
                  Final-year Computer Science student at PES University specializing in scalable backend architectures, high-concurrency microservices with Java & Spring Boot, and biologically plausible neuromorphic computing research at DRDO-CAIR. National Finalist at Canara Bank SuRaksha Cyber Hackathon 2025.
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="font-pixel text-xs text-[#8B5A2B] mb-2">
                  EDUCATION & CREDENTIALS
                </h4>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-[#1a1410]">PES University, Bengaluru</strong> — B.Tech in CSE
                      <div className="text-[#555] text-[11px]">Core CS, Algorithms, OS, Distributed Systems</div>
                    </div>
                    <span className="font-mono text-[#8B5A2B] font-bold">2023–2027 | CGPA: 6.63</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-[#1a1410]">IIT Madras</strong> — Data Science Certification
                      <div className="text-[#555] text-[11px]">Python, Statistical Modeling, Machine Learning</div>
                    </div>
                    <span className="font-mono text-[#8B5A2B] font-bold">2023–2024</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-[#1a1410]">Stanford Online / DeepLearning.AI</strong> — ML Specialization
                      <div className="text-[#555] text-[11px]">Neural Networks, Gradient Descent, Vectorization</div>
                    </div>
                    <span className="font-mono text-[#8B5A2B] font-bold">2024</span>
                  </div>
                </div>
              </div>

              {/* Experience Highlights */}
              <div>
                <h4 className="font-pixel text-xs text-[#8B5A2B] mb-2">
                  RESEARCH EXPERIENCE
                </h4>
                <div className="text-xs font-sans">
                  <div className="flex justify-between items-baseline font-bold text-[#1a1410]">
                    <span>DRDO - Centre for Artificial Intelligence and Robotics (CAIR)</span>
                    <span className="font-mono text-[#8B5A2B]">Jun 2026 – Aug 2026</span>
                  </div>
                  <div className="text-[#8B5A2B] font-semibold text-[11px] mb-1">
                    Research Intern — Neuromorphic Computing & SNNs
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[#2d241e]">
                    <li>Simulated biological spiking neural network architectures with Brian2 and PyTorch.</li>
                    <li>Evaluated Spike-Timing-Dependent Plasticity (STDP) for temporal sequence recognition.</li>
                    <li>Benchmarked low-power edge compute metrics against traditional deep ANN models.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2 CONTENT: Technical Projects, Achievements, Skills, Athletics */}
          {currentPage === 2 && (
            <div className="space-y-5 animate-in fade-in">
              {/* Featured Projects */}
              <div>
                <h4 className="font-pixel text-xs text-[#8B5A2B] mb-2">
                  KEY TECHNICAL PROJECTS
                </h4>
                
                <div className="space-y-3 text-xs font-sans">
                  <div>
                    <div className="flex justify-between items-baseline font-bold text-[#1a1410]">
                      <span>Digital Lending Marketplace</span>
                      <span className="font-mono text-[#8B5A2B]">Java, Spring Boot, PostgreSQL, Docker</span>
                    </div>
                    <ul className="list-disc list-inside text-[#2d241e] mt-0.5 space-y-0.5">
                      <li>Engineered high-concurrency RESTful loan origination APIs with ACID transaction safety.</li>
                      <li>Implemented JWT role-based access control (RBAC) and containerized with Docker.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-bold text-[#1a1410]">
                      <span>Football Player Detection & Re-Identification</span>
                      <span className="font-mono text-[#8B5A2B]">YOLOv11, OpenCV, DeepSORT</span>
                    </div>
                    <ul className="list-disc list-inside text-[#2d241e] mt-0.5 space-y-0.5">
                      <li>Real-time multi-object tracking pipeline sustaining IDs across occlusions at 60 FPS.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-bold text-[#1a1410]">
                      <span>X-Ray Image Classification</span>
                      <span className="font-mono text-[#8B5A2B]">PyTorch, CNN / ResNet, Grad-CAM</span>
                    </div>
                    <ul className="list-disc list-inside text-[#2d241e] mt-0.5 space-y-0.5">
                      <li>Trained diagnostic classifier achieving 94.2% accuracy on radiological lung anomalies.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills Matrix */}
              <div>
                <h4 className="font-pixel text-xs text-[#8B5A2B] mb-2">
                  TECHNICAL SKILLS MATRIX
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  <div className="bg-black/5 p-2 border border-[#8B5A2B]/20">
                    <strong className="text-[#8B5A2B] block text-[11px] font-pixel">LANGUAGES & BACKEND:</strong>
                    <span className="text-[#2d241e]">Java (Core/Adv), Spring Boot, Python, SQL, C/C++, PostgreSQL, Docker, REST APIs, Git</span>
                  </div>
                  <div className="bg-black/5 p-2 border border-[#8B5A2B]/20">
                    <strong className="text-[#8B5A2B] block text-[11px] font-pixel">AI, ML & SYSTEMS:</strong>
                    <span className="text-[#2d241e]">PyTorch, YOLOv11, OpenCV, Brian2, CNNs, Pandas, NumPy, Data Structures, OOP, OS</span>
                  </div>
                </div>
              </div>

              {/* Honors & Extracurricular */}
              <div>
                <h4 className="font-pixel text-xs text-[#8B5A2B] mb-2">
                  HONORS & COMPETITIVE ATHLETICS
                </h4>
                <div className="space-y-1.5 text-xs font-sans">
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#FFAA00] font-bold">🏆</span>
                    <span><strong>National Finalist</strong> — Canara Bank SuRaksha Cyber Hackathon 2025 (Fintech Cybersecurity Anomaly Engine).</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#5D8B3B] font-bold">🏀</span>
                    <span><strong>Varsity Basketball Athlete (Point Guard)</strong> — Competitive league player with high tactical playmaking rating.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#5D8B3B] font-bold">🏃‍♂️</span>
                    <span><strong>Track & Field Athlete</strong> — Competitive sprinter with rigorous daily athletic conditioning regimen.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Book Navigation Footer */}
        <div className="mt-4 flex items-center justify-between pt-2">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              playClickSound();
              setCurrentPage(p => Math.max(1, p - 1));
            }}
            className={`mc-btn px-3 py-1.5 text-[10px] font-pixel flex items-center gap-1 text-white ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:text-[#FFFF55]'}`}
          >
            <ChevronLeft size={14} />
            <span>PREV PAGE</span>
          </button>

          <span className="font-pixel text-[10px] text-white">
            PAGE {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              playClickSound();
              setCurrentPage(p => Math.min(totalPages, p + 1));
            }}
            className={`mc-btn px-3 py-1.5 text-[10px] font-pixel flex items-center gap-1 text-white ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:text-[#FFFF55]'}`}
          >
            <span>NEXT PAGE</span>
            <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
