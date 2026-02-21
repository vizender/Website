import { Link } from 'react-router-dom';

export function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <div className="flex flex-col gap-4 mt-6">
        <Link
          to="/projects/onitama"
          className="project-card block p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] transition-[border-color,background] duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-bg)]"
        >
          <h2 className="m-0 mb-2 text-xl text-[var(--color-text)]">Onitama</h2>
          <p className="m-0 text-[var(--color-text-secondary)] text-[0.95rem]">
            A chess-like abstract strategy game. Two players move pieces using shared movement cards.
          </p>
        </Link>
      </div>
    </div>
  );
}
