import { Link } from 'react-router-dom';
import './Projects.css';

export function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <div className="projects-list">
        <Link to="/projects/onitama" className="project-card">
          <h2>Onitama</h2>
          <p>A chess-like abstract strategy game. Two players move pieces using shared movement cards.</p>
        </Link>
      </div>
    </div>
  );
}
