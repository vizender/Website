import { ProjectCard } from '../components/ProjectCard';
import { featuredProjects } from '../data/projects';

export function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <section className="p-0">
        <h1 className="text-3xl font-bold m-0 mb-8 text-[var(--color-text)] text-center">
          Featured Projects
        </h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
