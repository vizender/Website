import { Link } from 'react-router-dom';

export function Projects() {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-6 py-2 px-4 font-medium text-theme-text-secondary no-underline rounded-lg transition-[background,color] duration-200 hover:bg-theme-border hover:text-theme-accent"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Home
      </Link>
      <h1>Projects</h1>
      <div className="flex flex-col gap-4 mt-6">
        <Link
          to="/projects/onitama"
          className="project-card block p-5 bg-theme-surface rounded-lg border border-theme-border transition-[border-color,background] duration-200 hover:border-theme-accent hover:bg-theme-bg"
        >
          <h2 className="m-0 mb-2 text-xl text-theme-text">Onitama</h2>
          <p className="m-0 text-theme-text-secondary text-[0.95rem]">
            A chess-like abstract strategy game. Two players move pieces using shared movement cards.
          </p>
        </Link>
      </div>
    </div>
  );
}
