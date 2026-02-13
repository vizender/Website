export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
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
];
