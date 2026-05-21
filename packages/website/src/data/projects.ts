export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  /** Use a full page load (e.g. Vercel-proxied sub-app), not client-side routing. */
  external?: boolean;
  previewImage?: string;
  accentColor?: string;
}

export const featuredProjects: Project[] = [
  {
    id: 'onitama',
    title: 'Onitama',
    category: 'Strategy Game',
    description: 'A chess-like abstract strategy game. Two players move pieces using shared movement cards.',
    href: '/projects/onitama',
    previewImage: '/images/onitama-preview.png',
    accentColor: '#3b82f6',
  },
  {
    id: 'satisfactory-remodeller',
    title: 'Satisfactory : Remodeller',
    category: 'Production Planner',
    description:
      'Plan Satisfactory factory layouts with a visual flow graph, machine recipes, clock speeds, and power balance.',
    href: '/satisfactory-remodeller/',
    external: true,
    previewImage: '/images/satisfactory-remodeller-preview.png',
    accentColor: '#f97316',
  },
];
