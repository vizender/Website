export interface Experience {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  skills: string[];
  missions: string[];
}

export interface Project {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  skills: string[];
}

export interface Contact {
  label: string;
  value: string;
  href?: string;
}

export const cvData = {
  name: 'Victor Le Gall',
  experiences: [
    {
      id: 'safran',
      startDate: 'Mars 2025',
      endDate: 'Aujourd\'hui',
      title: 'Ingénieur Calcul de Structures',
      company: 'Safran Landing Systems — Vélizy',
      skills: ['Python', 'VBA', 'Matlab', 'Abaqus', 'Excel'],
      missions: [
        'Optimisation des outils d\'analyse des trains d\'atterrissage A320',
        'Contrôle et analyse d\'outils FEA (Abaqus et équivalent) via scripts Python',
        'Analyse et optimisation des outils existants',
        'Création et validation d\'un nouvel outil d\'analyse basé sur Excel, VBA, Matlab et Abaqus',
      ],
    },
    {
      id: 'cimpa',
      startDate: 'Août 2023',
      endDate: 'Déc 2023',
      title: 'Stage d\'ingénierie',
      company: 'CIMPA GmbH — Hamburg',
      skills: ['CATIA V5'],
      missions: [
        'Mise en place de la disposition des équipements en usine d\'assemblage de l\'Airbus A321 XLR, en respectant les normes de sécurité',
        'Modélisation d\'un système de levage pour installer de l\'équipement sur un avion avec CATIA V5',
      ],
    },
    {
      id: 'bdtech',
      startDate: 'Sep 2022',
      endDate: 'Juin 2023',
      title: 'Vice-Président',
      company: 'Association Technologique BD Tech — EPF',
      skills: ['CATIA V5', 'Arduino', 'Impression 3D'],
      missions: [
        'Gestion d\'une association étudiante technologique',
        'Mise en place de projets associatifs',
        'Cours d\'introduction à CATIA, à l\'impression 3D et à Arduino aux étudiants',
      ],
    },
    {
      id: 'travaux-saisonniers',
      startDate: '2020',
      endDate: '2025',
      title: 'Travaux saisonniers',
      company: 'Divers',
      skills: [],
      missions: [
        'Service en salle — Restaurant "La p\'tite table", Perros-Guirec (2020)',
        'Accueil des touristes — Office du tourisme de Perros-Guirec (2021)',
        'Steward polyvalent — Brittany Ferries (2022)',
        'Espace Boulangerie — Super U Tergastel (2024)',
        'Caissier — Super U Tregastel (Fév 2025)',
      ],
    },
  ] as Experience[],
  projects: [
    {
      id: 'actuateur',
      startDate: 'Fév 2024',
      endDate: 'Juin 2024',
      title: 'Modélisation d\'un actuateur de gouverne d\'avion',
      description: 'Projet EPF — Analyse orientée système de systèmes, modélisation et simulation.',
      skills: ['CATIA V5', 'Matlab', 'Simulink'],
    },
    {
      id: 'aerospike',
      startDate: 'Fév 2023',
      endDate: 'Juin 2023',
      title: 'Modélisation d\'un moteur de fusée Aérospike',
      description: 'Projet EPF — Modélisation et optimisation du flux d\'échappement.',
      skills: ['CATIA V5', 'COMSOL'],
    },
  ] as Project[],
  education: [
    { year: '2024', diploma: 'Anglais avancé — TOEIC (975/990)' },
    { year: '2020', diploma: 'Licence de pilote LAPL-A' },
    { year: '2019', diploma: 'Bac S-SI Mention Bien' },
  ],
  contacts: [
    { label: 'Email', value: 'victor@legall.cc', href: 'mailto:victor@legall.cc' },
    { label: 'Téléphone', value: '06 45 35 02 70', href: 'tel:+33645350270' },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/victor-le-gall',
      href: 'https://linkedin.com/in/victor-le-gall',
    },
    { label: 'Localisation', value: 'Cachan, France' },
    { label: 'Permis', value: 'Permis B — véhiculé' },
  ] as Contact[],
};

// Entrée unifiée (expérience ou projet) pour l'affichage chronologique
export type TimelineEntry =
  | { type: 'experience'; data: Experience }
  | { type: 'project'; data: Project };

const MONTH_MAP: Record<string, string> = {
  jan: '01', janv: '01', janvier: '01',
  fév: '02', févr: '02', février: '02', fev: '02',
  mar: '03', mars: '03',
  avr: '04', avril: '04',
  mai: '05',
  juin: '06', jun: '06',
  juil: '07', juillet: '07',
  aoû: '08', août: '08', aout: '08',
  sep: '09', sept: '09', septembre: '09',
  oct: '10', octobre: '10',
  nov: '11', novembre: '11',
  déc: '12', décem: '12', décembre: '12', dec: '12',
};

function parseDateToSortKey(dateStr: string): string {
  const lower = dateStr.toLowerCase().trim();
  if (lower.includes('aujourd')) return '9999-12';
  const yearMatch = lower.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1] : '0000';
  for (const [key, month] of Object.entries(MONTH_MAP)) {
    if (lower.includes(key)) return `${year}-${month}`;
  }
  return `${year}-01`;
}

export function getTimelineEntries(): TimelineEntry[] {
  const entries: TimelineEntry[] = [
    ...cvData.experiences.map((data) => ({ type: 'experience' as const, data })),
    ...cvData.projects.map((data) => ({ type: 'project' as const, data })),
  ];
  return entries.sort((a, b) => {
    if (a.data.id === 'travaux-saisonniers') return 1;
    if (b.data.id === 'travaux-saisonniers') return -1;
    const keyA = parseDateToSortKey(a.data.endDate);
    const keyB = parseDateToSortKey(b.data.endDate);
    return keyB.localeCompare(keyA);
  });
}

// Toutes les compétences uniques pour la sidebar
export function getAllSkills(): string[] {
  const skillSet = new Set<string>();
  cvData.experiences.forEach((exp) => exp.skills.forEach((s) => skillSet.add(s)));
  cvData.projects.forEach((proj) => proj.skills.forEach((s) => skillSet.add(s)));
  return Array.from(skillSet).sort();
}
