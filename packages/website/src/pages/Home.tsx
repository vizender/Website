import { ProjectCard } from '../components/ProjectCard';
import { featuredProjects } from '../data/projects';
import './Home.css';

export function Home() {
  return (
    <div className="home">
      <section className="featured-projects">
        <h1 className="featured-projects-title">Featured Projects</h1>
        <div className="featured-projects-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
