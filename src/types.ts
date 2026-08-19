export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  slotIcon: 'sword' | 'redstone' | 'comparator' | 'potion' | 'book' | 'bow' | 'diamond' | 'shield';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  category: 'Backend' | 'AI / Neuromorphic' | 'Computer Vision' | 'Deep Learning';
  technologies: string[];
  description: string;
  bulletHighlights: string[];
  metrics?: string;
  githubUrl: string;
  liveUrl?: string;
  architectureDetails?: string;
  enchantments?: string[];
}

export interface QuestItem {
  id: string;
  title: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  type: 'Main Quest' | 'Side Quest' | 'Raid';
  status: 'COMPLETED' | 'IN_PROGRESS';
  rewardXp: number;
  description: string;
  highlights: string[];
  skillsGained: string[];
  icon: 'cair' | 'research' | 'code' | 'trophy';
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  tier: string;
  skills: {
    name: string;
    level: string; // e.g. "V", "IV", "III"
    description: string;
    glowColor: string;
    glyph: string;
  }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  category: 'Hackathon' | 'Athletics' | 'Academic' | 'Open Source';
  icon: 'trophy' | 'medal' | 'diamond' | 'star';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  points: number;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade: string;
  level: number;
  maxLevel: number;
  highlights: string[];
  status: 'In Progress' | 'Completed';
  credentialLink?: string;
  icon: 'university' | 'certificate' | 'stanford';
}

export interface ExtracurricularItem {
  id: string;
  title: string;
  role: string;
  sport: 'Basketball' | 'Track & Field';
  stats: {
    attribute: string;
    boost: string;
  }[];
  description: string;
  achievements: string[];
  badgeColor: string;
}
