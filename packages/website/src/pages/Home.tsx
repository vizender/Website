import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { featuredProjects } from '../data/projects';

export function Home() {
  return (
    <>
      <section className="home-banner -mx-4 md:-mx-8 mb-12 md:mb-16 px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-12">
          <div className="home-banner-name text-center md:text-left">
            <span className="block text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-theme-text">
              Victor
            </span>
            <span className="block text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-theme-text">
              Le Gall
            </span>
            <span className="block text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-semibold tracking-widest text-theme-accent uppercase">
              Engineer
            </span>
          </div>
          <div className="flex flex-row md:flex-col gap-4 shrink-0 justify-center items-center md:items-stretch">
            <Link
              to="/projects"
              className="home-banner-btn inline-flex items-center justify-center py-4 px-6 md:px-8 rounded-xl font-semibold text-base md:text-lg min-w-[140px] md:min-w-[200px] no-underline transition-[background,color,transform] duration-200 hover:-translate-y-0.5"
            >
              View All Projects
            </Link>
            <Link
              to="/cv"
              className="home-banner-btn-secondary inline-flex items-center justify-center py-4 px-6 md:px-8 rounded-xl font-semibold text-base md:text-lg min-w-[140px] md:min-w-[200px] no-underline transition-[background,color,transform] duration-200 hover:-translate-y-0.5"
            >
              CV
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto">
        <section className="p-0">
        <h2 className="text-2xl font-bold m-0 mb-8 text-theme-text">
          Featured Projects
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        </section>
      </div>
    </>
  );
}
