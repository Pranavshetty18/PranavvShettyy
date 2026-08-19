import { ProjectItem, QuestItem, SkillCategory, AchievementItem, EducationItem, ExtracurricularItem } from '../types';

export const HERO_DATA = {
  name: "PRANAV SHETTY",
  title: "Computer Science Undergrad // Backend Developer // Data Science Certified",
  location: "Bengaluru, Karnataka, India",
  email: "pranavshetty1418@gmail.com",
  github: "https://github.com/Pranavshetty18",
  githubUsername: "Pranavshetty18",
  avatarQuote: "Spawning backend microservices and sinking 3-pointers.",
  status: "Ready for High-Impact Backend / Distributed Systems & AI Roles",
  level: 26,
  totalXp: 18500,
  hearts: 10,
  hunger: 10,
  armor: 8,
};

export const PLAYER_STATS = {
  attributes: [
    { name: "Backend Architecture", value: 94, color: "#55FF55", icon: "server" },
    { name: "DSA & Problem Solving", value: 90, color: "#55FFFF", icon: "brain" },
    { name: "Neuromorphic AI & ML", value: 86, color: "#FFAA00", icon: "sparkles" },
    { name: "System Design & APIs", value: 89, color: "#FF5555", icon: "cpu" },
    { name: "Database & Query Tuning", value: 88, color: "#AA00AA", icon: "database" },
  ],
  bio: "Final year Computer Science student at PES University with high proficiency in Java, Spring Boot, microservices architecture, and neuromorphic computing research at DRDO-CAIR. Passionate about architecting scalable distributed backends and exploring biologically inspired spiking neural networks.",
  equippedGear: [
    { slot: "Helmet", item: "Crown of Algorithmic Rigor", tier: "Netherite", perk: "+25% Time Complexity Optimization" },
    { slot: "Chestplate", item: "Spring Boot Enterprise Armor", tier: "Diamond", perk: "Protection IV vs Concurrency Race Conditions" },
    { slot: "Leggings", item: "PostgreSQL Indexed Greaves", tier: "Diamond", perk: "-60% Query Latency & Zero Table Locks" },
    { slot: "Boots", item: "Track & Field Sprint Cleats", tier: "Gold", perk: "Swiftness III & Sub-100ms API Response Time" },
    { slot: "Main Hand", item: "Java 21 Virtual Thread Blade", tier: "Netherite", perk: "Sharpness V, Unbreaking III, 10k RPS throughput" },
    { slot: "Off Hand", item: "Spalding Pixel Basketball", tier: "Rare", perk: "+15 Agility, Instant Clutch Playmaking" },
  ],
  vitalStats: {
    totalCommits: "850+",
    codeLines: "120k+",
    bugsSquashed: "420",
    hackathonRounds: "National Finalist",
    serverUptime: "99.99%",
  }
};

export const QUESTS: QuestItem[] = [
  {
    id: "drdo-cair-2026",
    title: "Neuromorphic Computing Research Study",
    organization: "DRDO - Centre for Artificial Intelligence and Robotics (CAIR)",
    role: "Research Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Bengaluru, India",
    type: "Main Quest",
    status: "COMPLETED",
    rewardXp: 5000,
    icon: "cair",
    description: "Investigated cutting-edge neuromorphic computing paradigms, event-based temporal coding, and Spiking Neural Networks (SNNs) to benchmark energy efficiency against traditional deep learning models.",
    highlights: [
      "Simulated biologically plausible spiking neural networks utilizing Brian2 and PyTorch SNN extensions.",
      "Engineered spike-timing-dependent plasticity (STDP) learning pipelines with reduced computational overhead.",
      "Synthesized technical research documentation on hardware-accelerated neuromorphic processing units (NPUs)."
    ],
    skillsGained: ["Neuromorphic Computing", "PyTorch", "Brian2", "Spiking Neural Networks (SNN)", "Scientific Python", "Temporal Coding"]
  },
  {
    id: "canara-bank-hackathon-2025",
    title: "Canara Bank SuRaksha Cyber Hackathon",
    organization: "Canara Bank & National Cyber Security Forum",
    role: "Core Backend Architect & Finalist",
    period: "2025",
    location: "National Finals, India",
    type: "Raid",
    status: "COMPLETED",
    rewardXp: 3500,
    icon: "trophy",
    description: "Competed as a National Finalist in designing robust fintech cybersecurity and anomaly detection architectures for digital banking channels.",
    highlights: [
      "Built real-time fraud signature detection backend microservices processing mock transactional streams.",
      "Engineered automated anomaly detection heuristic layers with sub-second alert dispatching.",
      "Presented prototype defense mechanisms before senior banking technology juries."
    ],
    skillsGained: ["Fintech Security", "Spring Boot", "Microservices", "Kafka Streams", "Real-Time Anomaly Detection"]
  },
  {
    id: "pes-open-source-backend",
    title: "Distributed Backend Architecture & APIs",
    organization: "PES University Core CS Lab",
    role: "Backend Lead Developer",
    period: "2024 – Present",
    location: "Bengaluru, India",
    type: "Main Quest",
    status: "IN_PROGRESS",
    rewardXp: 4000,
    icon: "code",
    description: "Designed resilient backend architectures with clean domain-driven patterns, PostgreSQL relational data structures, and containerized Docker environments.",
    highlights: [
      "Implemented modular MVC/DDD architectures with clean RESTful endpoints and JWT authentication.",
      "Orchestrated continuous deployment scripts with Docker and automated build checks."
    ],
    skillsGained: ["Java", "Spring Boot", "PostgreSQL", "Docker", "REST API", "Database Design"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "digital-lending-marketplace",
    title: "Digital Lending Marketplace",
    subtitle: "Enterprise Fintech Loan Engine",
    slotIcon: "sword",
    rarity: "Legendary",
    category: "Backend",
    technologies: ["Java 21", "Spring Boot", "PostgreSQL", "Docker", "JWT", "Swagger / OpenAPI"],
    description: "A robust, high-integrity digital lending backend microservice designed for borrower verification, credit scoring calculations, automated loan lifecycle tracking, and repayments.",
    bulletHighlights: [
      "Engineered high-concurrency RESTful APIs with Spring Boot and JPA/Hibernate for complete loan origination.",
      "Architected PostgreSQL relational schemas with strict ACID transactions to prevent double-disbursement anomalies.",
      "Implemented secure role-based access control (RBAC) via Spring Security and stateless JWT authentication.",
      "Containerized deployment using multi-stage Docker builds for rapid spin-up and minimal memory footprint."
    ],
    metrics: "Sub-50ms API response time, 100% test coverage on calculation engine",
    githubUrl: "https://github.com/Pranavshetty18",
    architectureDetails: "Spring Boot 3.x layered MVC architecture + PostgreSQL connection pooling + Dockerized compose runtime.",
    enchantments: ["Sharpness V (High Performance)", "Unbreaking III (ACID Safety)", "Efficiency IV (Fast Queries)"]
  },
  {
    id: "neuromorphic-research-study",
    title: "Neuromorphic Computing Study",
    subtitle: "Spiking Neural Networks & Temporal Coding",
    slotIcon: "potion",
    rarity: "Legendary",
    category: "AI / Neuromorphic",
    technologies: ["Python", "PyTorch", "Brian2", "SpikingJelly", "NumPy", "Matplotlib"],
    description: "Comprehensive scientific research project and algorithmic suite exploring event-driven spiking neural networks (SNNs) for ultra-low-power edge computation.",
    bulletHighlights: [
      "Implemented Leaky Integrate-and-Fire (LIF) neuron models for biological spike signal propagation.",
      "Benchmarked energy-per-inference metrics against standard deep feed-forward multi-layer perceptrons.",
      "Evaluated Spike-Timing-Dependent Plasticity (STDP) unsupervised learning mechanisms on temporal sequential data."
    ],
    metrics: "Demonstrated theoretical 70%+ energy savings over traditional ANN architectures",
    githubUrl: "https://github.com/Pranavshetty18",
    architectureDetails: "Differential equation ODE solvers with Brian2 runtime + PyTorch surrogate gradient backpropagation.",
    enchantments: ["Infinity (Infinite Spike Potential)", "Power V (Mathematical Depth)"]
  },
  {
    id: "football-player-detection",
    title: "Football Player Detection & Re-ID",
    subtitle: "Real-Time Computer Vision & Tracking",
    slotIcon: "bow",
    rarity: "Epic",
    category: "Computer Vision",
    technologies: ["YOLOv11", "OpenCV", "DeepSORT", "Python", "TorchVision", "FastAPI"],
    description: "An automated sports analytics computer vision pipeline capable of detecting soccer players, referees, and the ball across high-framerate broadcast video feeds.",
    bulletHighlights: [
      "Fine-tuned state-of-the-art YOLOv11 detectors for small-object identification in cluttered sports broadcast scenes.",
      "Integrated DeepSORT multi-target tracking to sustain unique player IDs across camera pans and occlusions.",
      "Generated spatial heatmaps and tactical player positional charts using OpenCV coordinate warping."
    ],
    metrics: "Real-time 60 FPS video tracking on NVIDIA GPU runtime",
    githubUrl: "https://github.com/Pranavshetty18",
    architectureDetails: "YOLOv11 object detector -> Kalman filter tracking -> Perspective transformation mapping.",
    enchantments: ["Quick Charge III (High FPS)", "Piercing IV (Precise Tracking)"]
  },
  {
    id: "xray-image-classification",
    title: "X-Ray Image Classification",
    subtitle: "Deep Learning Medical Image Diagnostics",
    slotIcon: "comparator",
    rarity: "Epic",
    category: "Deep Learning",
    technologies: ["Python", "CNN / ResNet", "PyTorch", "Albumentations", "Scikit-Learn"],
    description: "Deep convolutional neural network architecture trained to classify pathological lung anomalies and bone fracture patterns from chest and skeletal radiography scans.",
    bulletHighlights: [
      "Trained custom deep residual convolutional networks with transfer learning (ResNet50 / EfficientNet).",
      "Applied advanced Albumentations data augmentation to tackle clinical class imbalances.",
      "Visualized model interpretability using Grad-CAM attention heatmaps over localized radiographic regions."
    ],
    metrics: "94.2% Validation Accuracy on multi-class diagnostic benchmark",
    githubUrl: "https://github.com/Pranavshetty18",
    architectureDetails: "Custom Transfer Learning Backbone + Dense Classification Head + Grad-CAM Explainability.",
    enchantments: ["Looting III (Rich Feature Extraction)", "Respiration III (Lung Pathology Diagnostic)"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages-core",
    name: "Languages & Core CS",
    iconName: "Code",
    tier: "Tier IV Enchantments",
    skills: [
      { name: "Java (Core & Adv)", level: "V", description: "OOP, Concurrency, Virtual Threads, Collections, JVM Internals", glowColor: "#FFAA00", glyph: "ᔑ" },
      { name: "Python", level: "V", description: "Scientific Python, Data Structures, PyTorch, Scripting, Automation", glowColor: "#55FFFF", glyph: "ʖ" },
      { name: "C / C++", level: "IV", description: "Memory Management, Pointers, Low-level OS Primitives", glowColor: "#FF5555", glyph: "ᓵ" },
      { name: "SQL & Relational Logic", level: "V", description: "Complex Joins, Window Functions, Indexing Strategies, Schemas", glowColor: "#55FF55", glyph: "↸" },
      { name: "Data Structures & Algos", level: "V", description: "Trees, Graphs, DP, Greedy, Hash Maps, Asymptotic Analysis", glowColor: "#AA00AA", glyph: "ᒷ" },
      { name: "Operating Systems", level: "IV", description: "Process Scheduling, Thread Synchronization, Memory Paging", glowColor: "#55FFFF", glyph: "⎓" },
    ]
  },
  {
    id: "systems-backend",
    name: "Systems & Backend Engineering",
    iconName: "Server",
    tier: "Tier V Enchantments",
    skills: [
      { name: "Spring Boot", level: "V", description: "REST APIs, Spring Data JPA, Spring Security, Dependency Injection", glowColor: "#55FF55", glyph: "⊣" },
      { name: "PostgreSQL", level: "V", description: "Relational modeling, transactions, query optimization, indexing", glowColor: "#55FFFF", glyph: "⍑" },
      { name: "Docker & Containers", level: "IV", description: "Containerization, Multi-stage Builds, Compose configurations", glowColor: "#5555FF", glyph: "╎" },
      { name: "RESTful Architecture", level: "V", description: "API design, HTTP verbs, error handling, Swagger documentation", glowColor: "#FFAA00", glyph: "⋮" },
      { name: "Git & Version Control", level: "V", description: "Branching strategies, merge conflict resolution, CI/CD basics", glowColor: "#FF5555", glyph: "ꖌ" },
      { name: "Microservices Patterns", level: "IV", description: "Service decomposition, API Gateways, stateless auth", glowColor: "#AA00AA", glyph: "ꖎ" },
    ]
  },
  {
    id: "ai-ml-cv",
    name: "AI, ML & Neuromorphic",
    iconName: "Cpu",
    tier: "Tier IV Enchantments",
    skills: [
      { name: "PyTorch", level: "IV", description: "Tensors, autograd, CNN training loops, custom loss functions", glowColor: "#FF5555", glyph: "ᒲ" },
      { name: "YOLOv11 & OpenCV", level: "IV", description: "Object detection, video processing, coordinate transformations", glowColor: "#FFAA00", glyph: "リ" },
      { name: "Brian2 / SNNs", level: "IV", description: "Spiking neural networks, biological neuron equations, STDP", glowColor: "#AA00AA", glyph: "𝙹" },
      { name: "Convolutional NNs", level: "IV", description: "Feature maps, pooling, transfer learning with ResNet backbones", glowColor: "#55FF55", glyph: "!¡" },
      { name: "Pandas & NumPy", level: "V", description: "Vectorized data processing, matrices, statistical transforms", glowColor: "#55FFFF", glyph: "ᑑ" },
      { name: "Scikit-Learn", level: "V", description: "Supervised & unsupervised models, evaluation metrics, pipelines", glowColor: "#FFAA00", glyph: "∷" },
    ]
  },
  {
    id: "actively-building",
    name: "Actively Building / Exploring",
    iconName: "Zap",
    tier: "Tier III Special",
    skills: [
      { name: "Distributed Systems", level: "III", description: "Consensus, replication, partitioning, load balancing", glowColor: "#55FFFF", glyph: "ᓭ" },
      { name: "High-Concurrency APIs", level: "IV", description: "Non-blocking I/O, reactive streams, connection pooling", glowColor: "#55FF55", glyph: "ℸ" },
      { name: "Neuromorphic Hardware", level: "III", description: "Intel Loihi & SpiNNaker computational architecture benchmarks", glowColor: "#AA00AA", glyph: "⚍" },
    ]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "canara-bank-finalist",
    title: "National Finalist: Canara Bank SuRaksha Hackathon",
    subtitle: "Fintech Cybersecurity & Fraud Anomaly Detection",
    date: "2025",
    description: "Selected among top nationwide developer teams for architecting a resilient fraud-detection backend processing live banking streams.",
    category: "Hackathon",
    icon: "trophy",
    rarity: "Legendary",
    points: 1500
  },
  {
    id: "drdo-research-fellowship",
    title: "DRDO-CAIR Research Appointment",
    subtitle: "Centre for Artificial Intelligence and Robotics",
    date: "2026",
    description: "Earned prestigious research internship slot conducting exploratory research on neuromorphic temporal computing.",
    category: "Academic",
    icon: "diamond",
    rarity: "Epic",
    points: 1200
  },
  {
    id: "varsity-athletics-basketball",
    title: "State/University Athletics & Basketball Honor",
    subtitle: "Dual-Discipline Competitive Athlete",
    date: "2023 - 2026",
    description: "Represented university and competitive leagues in track & field sprint events and varsity basketball tournaments.",
    category: "Athletics",
    icon: "medal",
    rarity: "Rare",
    points: 800
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "pes-university",
    institution: "PES University, Bengaluru",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    period: "2023 – 2027",
    grade: "CGPA: 6.63 / 10.0",
    level: 7,
    maxLevel: 8,
    status: "In Progress",
    highlights: [
      "Rigorous coursework in Data Structures, Algorithms, Computer Architecture, OS, DBMS, and Software Engineering.",
      "Active participant in technical club hackathons and university athletic meets."
    ],
    icon: "university"
  },
  {
    id: "iit-madras-ds",
    institution: "IIT Madras (Indian Institute of Technology)",
    degree: "Data Science Certification Program",
    field: "Data Science, Programming & Algorithms",
    period: "2023 – 2024",
    grade: "Distinction / Completed",
    level: 8,
    maxLevel: 8,
    status: "Completed",
    highlights: [
      "Comprehensive mastery of Python, mathematical statistics, machine learning algorithms, and database querying.",
      "Completed hands-on predictive modeling and data visualization capstones."
    ],
    icon: "certificate"
  },
  {
    id: "stanford-deeplearning",
    institution: "Stanford Online / DeepLearning.AI",
    degree: "Machine Learning Specialization",
    field: "Supervised Learning, Neural Networks & Unsupervised Algorithms",
    period: "2024",
    grade: "Certified by Andrew Ng",
    level: 8,
    maxLevel: 8,
    status: "Completed",
    highlights: [
      "Mastered deep neural network mathematics, gradient descent optimization, regularization, and decision trees.",
      "Implemented algorithms from scratch in Python and vectorized NumPy."
    ],
    icon: "stanford"
  }
];

export const EXTRACURRICULAR: ExtracurricularItem[] = [
  {
    id: "basketball-athlete",
    title: "Basketball Athlete (Point Guard / Playmaker)",
    role: "Varsity & Tournament Competitor",
    sport: "Basketball",
    stats: [
      { attribute: "Court Vision & Playmaking", boost: "+20 Assist Rating" },
      { attribute: "Fast-Break Speed", boost: "+18 Sprint Velocity" },
      { attribute: "Clutch Defense", boost: "+15 Steal & Pressure" },
    ],
    description: "Competed in competitive basketball circuits. Transferred tactical court awareness, high-pressure decision making, and team synchronization directly to backend engineering workflows.",
    achievements: [
      "Represented university in inter-collegiate tournaments.",
      "Known for quick ball distribution, baseline drive penetration, and high perimeter shooting efficiency."
    ],
    badgeColor: "#FFAA00"
  },
  {
    id: "track-and-field",
    title: "Track & Field Athlete (Sprints & High Jump)",
    role: "Competitive Athletic Division",
    sport: "Track & Field",
    stats: [
      { attribute: "Explosive Acceleration", boost: "+25 Velocity" },
      { attribute: "Mental Stamina", boost: "+30 Endurance" },
      { attribute: "Sub-Second Reaction", boost: "+22 Agility" },
    ],
    description: "Disciplined competitive training in sprint sprints and field jumping. Cultivated the mental grit, strict preparation habits, and continuous incremental self-optimization necessary for elite technical engineering.",
    achievements: [
      "Consistent podium finishes in sprint dash categories.",
      "Daily conditioning regimen sustaining peak stamina and analytical focus."
    ],
    badgeColor: "#55FF55"
  }
];
