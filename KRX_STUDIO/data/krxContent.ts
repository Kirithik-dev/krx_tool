export interface BlackboxDomain {
  index: string;
  title: string;
  description: string;
}

export interface PhilosophyPrinciple {
  index: string;
  title: string;
  statement: string;
}

export interface EngineeringArea {
  title: string;
  description: string;
}

export interface ExplorationDomain {
  index: string;
  title: string;
  description: string;
  interests: string[];
}

export interface HorizonArea {
  title: string;
  description: string;
}

export interface ContactChannel {
  id: 'email' | 'github' | 'linkedin';
  label: string;
  /** Assign a real mailto: or https:// URL when ready to display publicly */
  href: string | null;
  displayLabel?: string;
}

export const KRX_CONTENT = {
  brandMark: 'KRX',

  opening: {
    eyebrow: 'KRX',
    headlineLines: ['Beyond the interface.', 'Into the architecture.'],
    statement:
      'Engineering intelligence. Building systems. Exploring what technology can become.',
    description:
      'An independent space for software engineering, artificial intelligence, system architecture, and experimental digital creation. Built around curiosity, first principles, and the pursuit of things worth building.',
    toolkitAction: 'Enter the Toolkit',
    heroVideo: '/src/assets/videos/krx_hero_architecture.mp4',
    heroImage: '/src/assets/posters/krx_hero_architecture.jpg',
    heroImageAlt:
      'Monumental cantilevered concrete architecture gliding beneath an atmospheric overcast dusk sky',
  },

  foundation: {
    eyebrow: 'The Foundation',
    headline: 'Curiosity is the beginning. Construction is the answer.',
    lead: 'KRX exists at the intersection of engineering, intelligence, and imagination. A space dedicated to understanding how systems work, discovering how they can work better, and turning ambitious ideas into functional experiences.',
    paragraph:
      'From low-level logic to intelligent applications, from software architecture to interactive environments, the objective remains constant: understand deeply, build deliberately, and never stop experimenting.',
    disciplinesLabel: 'Disciplines',
    disciplines: [
      'Software Engineering',
      'Artificial Intelligence',
      'Data Structures & Algorithms',
      'System Architecture',
      'Full-Stack Development',
      'Creative Technology',
    ],
    microcopy: 'Every system begins with a question.',
    videoSrc: '/src/assets/videos/krx_foundation_corridor.mp4',
    imageSrc: '/src/assets/posters/krx_foundation_corridor.jpg',
    imageAlt:
      'Sunlit architectural courtyard corridor with structural columns, glass, and deep shadows',
  },

  philosophy: {
    eyebrow: 'Philosophy',
    headline: 'Build with intention. Think beyond convention.',
    closingStatement:
      'Restraint is not the absence of ambition. It is ambition under control.',
    microcopy: 'Complexity is easy. Coherence is engineered.',
    videoSrc: '/src/assets/videos/krx_philosophy_clockwork.mp4',
    imageSrc: '/src/assets/posters/krx_philosophy_clockwork.jpg',
    imageAlt:
      'Macro cinematography of precision brass and steel mechanical clockwork gears in motion',
    principles: [
      {
        index: '01',
        title: 'First Principles',
        statement:
          'Understand the mechanism before touching the solution. Break complex problems into fundamentals. Build from what is true, not what is familiar.',
      },
      {
        index: '02',
        title: 'Systems Over Shortcuts',
        statement:
          'Good software is not a collection of working features. It is a system whose parts understand their responsibilities and work together.',
      },
      {
        index: '03',
        title: 'Depth Over Appearance',
        statement:
          'An interface can impress in seconds. An architecture must survive years. Prioritize what happens beneath the surface.',
      },
      {
        index: '04',
        title: 'Experimentation Without Fear',
        statement:
          'Explore unfamiliar technologies. Challenge existing assumptions. Treat failure as information, not an endpoint.',
      },
      {
        index: '05',
        title: 'Precision in Execution',
        statement:
          'Every decision has consequences. Every component has a purpose. Remove unnecessary complexity and give every detail a reason to exist.',
      },
      {
        index: '06',
        title: 'Continuous Evolution',
        statement:
          'Never become attached to the limits of current knowledge. Learn, rebuild, question, and evolve.',
      },
    ] as PhilosophyPrinciple[],
  },

  blackbox: {
    eyebrow: 'BLACKBOX / 001',
    headlineLines: ['Beyond what is known.', 'Inside what is possible.'],
    description:
      'A space for exploring the unknown, understanding complex systems, investigating emerging technologies, and experimenting with ideas that challenge conventional thinking.',
    videoSrc: '/src/assets/videos/krx_blackbox_facility.mp4',
    imageSrc: '/src/assets/posters/krx_blackbox_facility.jpg',
    imageAlt:
      'Dark computing infrastructure racks and storage blades with restrained optical indicator lights in deep shadow',
    domains: [
      {
        index: '01',
        title: 'INTELLIGENCE',
        description:
          'Artificial intelligence, machine learning, intelligent agents, and the evolving relationship between humans and machines.',
      },
      {
        index: '02',
        title: 'SYSTEMS',
        description:
          'Software architecture, computational systems, algorithms, infrastructure, and the engineering principles behind complex technologies.',
      },
      {
        index: '03',
        title: 'EXPERIMENTS',
        description:
          'Unconventional ideas, technical experimentation, creative coding, prototypes, and exploring possibilities beyond conventional solutions.',
      },
      {
        index: '04',
        title: 'FRONTIERS',
        description:
          'Emerging technologies, scientific discoveries, future computing, and ideas that could redefine what technology becomes.',
      },
    ] as BlackboxDomain[],
  },

  engineering: {
    eyebrow: 'Engineering',
    headline: 'Understand the machine. Design the system.',
    microcopy: 'Code is the language. Architecture is the thinking.',
    videoSrc: '/src/assets/videos/krx_engineering_hardware.mp4',
    imageSrc: '/src/assets/posters/krx_engineering_hardware.jpg',
    imageAlt:
      'Macro hardware cinematography of dark electronic circuit boards and illuminated amber processor contacts',
    areas: [
      {
        title: 'Software Engineering',
        description:
          'Writing software that remains understandable as complexity grows. Strong foundations, clean boundaries, predictable behavior, and maintainable architecture.',
      },
      {
        title: 'Artificial Intelligence',
        description:
          'Exploring intelligent systems, model integration, autonomous workflows, and the evolving relationship between human reasoning and machine intelligence.',
      },
      {
        title: 'System Architecture',
        description:
          'Understanding how components communicate, how state flows, how systems fail, and how reliable structures emerge from carefully designed boundaries.',
      },
      {
        title: 'Full-Stack Development',
        description:
          'Connecting interfaces, application logic, databases, authentication, and infrastructure into coherent working systems.',
      },
      {
        title: 'Creative Engineering',
        description:
          'Combining computation, interaction, animation, and visual storytelling to create experiences that extend beyond conventional interfaces.',
      },
    ] as EngineeringArea[],
  },

  exploration: {
    eyebrow: 'The Experimental Frontier',
    headline: 'Questions worth pursuing. Territories worth exploring.',
    microcopy: 'Do not inherit limitations. Understand them.',
    videoSrc: '/src/assets/videos/krx_exploration_aerial.mp4',
    imageSrc: '/src/assets/posters/krx_exploration_aerial.jpg',
    imageAlt:
      'Aerial drone footage gliding above dark mountain ridges veiled in atmospheric mist',
    domains: [
      {
        index: '01',
        title: 'Software Development',
        description: 'Building robust, maintainable, and scalable applications.',
        interests: ['Type Safety', 'Clean Abstractions', 'Long-Term Maintainability', 'State Clarity'],
      },
      {
        index: '02',
        title: 'Artificial Intelligence',
        description:
          'Exploring intelligent agents, LLM applications, reasoning workflows, and AI-assisted development.',
        interests: ['Intelligent Agents', 'LLM Workflows', 'Structured Reasoning', 'AI Tooling'],
      },
      {
        index: '03',
        title: 'Intelligent Systems',
        description:
          'Investigating how software can perceive context, make decisions, coordinate actions, and adapt.',
        interests: ['Context Perception', 'Decision Pipelines', 'Adaptive Behavior', 'Orchestration'],
      },
      {
        index: '04',
        title: 'Web Technologies',
        description:
          'Exploring modern frontend architecture, interactive experiences, rendering, performance, and application design.',
        interests: ['Frontend Architecture', 'Browser Rendering', 'Performance', 'Interactive Design'],
      },
      {
        index: '05',
        title: 'System Architecture',
        description:
          'Studying distributed systems, data flow, modularity, security, and engineering trade-offs.',
        interests: ['Data Flow', 'Modularity', 'Security Boundaries', 'Trade-Off Analysis'],
      },
      {
        index: '06',
        title: 'Creative Computing',
        description:
          'Exploring particle systems, real-time rendering, procedural visuals, simulation, and interactive digital environments.',
        interests: ['Particle Systems', 'Real-Time Rendering', 'Procedural Visuals', 'Simulation'],
      },
    ] as ExplorationDomain[],
  },

  horizon: {
    eyebrow: 'Horizon',
    headline: 'The horizon is not a destination. It is an invitation.',
    intro:
      'Technology is constantly changing. The objective is not simply to keep pace, but to understand the underlying shifts and build something meaningful with them.',
    closingLine: 'Still learning. Still building. Never finished.',
    microcopy: 'Build what does not yet exist.',
    videoSrc: '/src/assets/videos/krx_horizon_dawn.mp4',
    imageSrc: '/src/assets/posters/krx_horizon_dawn.jpg',
    imageAlt:
      'Dark mountain ridge silhouetted against an amber and gold dawn sunrise horizon',
    areas: [
      {
        title: 'The Builder',
        description:
          'Turning ideas into functioning systems. Moving from experimentation to implementation, one deliberate decision at a time.',
      },
      {
        title: 'The Researcher',
        description:
          'Understanding emerging technologies, intelligent architectures, computational methods, and the possibilities they create.',
      },
      {
        title: 'The Future',
        description:
          'Exploring autonomous software, intelligent environments, advanced interactive systems, and new ways of building.',
      },
    ] as HorizonArea[],
  },

  closing: {
    eyebrow: 'Contact',
    headline: 'Good ideas deserve to be built.',
    invitation:
      'For technical conversations, collaborations, interesting problems, or opportunities to create something meaningful.',
    channels: [
      { id: 'email', label: 'Email', href: null },
      { id: 'github', label: 'GitHub', href: null },
      { id: 'linkedin', label: 'LinkedIn', href: null },
    ] as ContactChannel[],
    closingStatement: 'Think clearly. Build relentlessly. Leave something behind.',
    philosophySignoff: 'Less noise. More substance. Relentless creation.',
    signature: 'KRX',
  },
} as const;
