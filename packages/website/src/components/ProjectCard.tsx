import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={project.href}
      className="project-card group flex flex-col bg-theme-surface border border-theme-border rounded-xl overflow-hidden no-underline text-inherit origin-center transition-[border-color,box-shadow,transform,background] duration-200 hover:border-[var(--card-accent,var(--color-accent))] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:bg-theme-bg"
      style={{ '--card-accent': project.accentColor ?? 'var(--color-accent)' } as React.CSSProperties}
    >
      <div className="aspect-[16/10] bg-theme-border overflow-hidden">
        {project.previewImage ? (
          <img src={project.previewImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-theme-border to-theme-surface text-theme-text-secondary text-base">
            <span>{project.title}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <span className="inline-block py-1 px-2.5 text-xs font-medium uppercase tracking-[0.05em] bg-theme-border rounded-md text-theme-text-secondary mb-3">
          {project.category}
        </span>
        <h2 className="m-0 mb-2 text-xl font-semibold text-theme-text">{project.title}</h2>
        <p className="m-0 mb-4 text-sm text-theme-text-secondary leading-relaxed">
          {project.description}
        </p>
        <span className="text-sm font-medium text-[var(--card-accent,var(--color-accent))] group-hover:underline">
          View project →
        </span>
      </div>
    </Link>
  );
}
