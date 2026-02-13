import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={project.href}
      className="project-card"
      style={{ '--card-accent': project.accentColor ?? 'var(--color-accent)' } as React.CSSProperties}
    >
      <div className="project-card-preview">
        {project.previewImage ? (
          <img src={project.previewImage} alt="" />
        ) : (
          <div className="project-card-placeholder">
            <span>{project.title}</span>
          </div>
        )}
      </div>
      <div className="project-card-content">
        <span className="project-card-category">{project.category}</span>
        <h2 className="project-card-title">{project.title}</h2>
        <p className="project-card-description">{project.description}</p>
        <span className="project-card-link">
          View project →
        </span>
      </div>
    </Link>
  );
}
