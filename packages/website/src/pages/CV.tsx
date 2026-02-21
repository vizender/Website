import { useEffect, useRef, useState } from 'react';
import { cvData, getAllSkills, getTimelineEntries, type Experience, type Project } from '../data/cvData';

const PDF_URL = '/cv/CV-2025.pdf';

const BANNER_SCROLL_THRESHOLD = 80;
const BANNER_COMPACT_HEIGHT = 120;

export function CV() {
  const [activeSkills, setActiveSkills] = useState<Set<string>>(new Set());
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCardSkills, setHoveredCardSkills] = useState<Set<string>>(new Set());
  const [, setResizeKey] = useState(0);
  const [isBannerCompact, setIsBannerCompact] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const allSkills = getAllSkills();

  /* Force re-render au resize pour éviter le bug de rendu noir de la bannière */
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setResizeKey((k) => k + 1), 100);
    };
    const mq = window.matchMedia('(max-width: 768px)');
    mq.addEventListener('change', handler);
    window.addEventListener('resize', handler);
    return () => {
      clearTimeout(timeoutId);
      mq.removeEventListener('change', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);

  /* Banner retracts to compact on scroll, stays sticky */
  useEffect(() => {
    const handler = () => {
      setIsBannerCompact(window.scrollY > BANNER_SCROLL_THRESHOLD);
    };
    handler(); // init
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Sur mobile : prioriser les compétences highlightées (visibles en premier) */
  const sortedSkills = [...allSkills].sort((a, b) => {
    const aHighlighted = activeSkills.has(a) || hoveredCardSkills.has(a);
    const bHighlighted = activeSkills.has(b) || hoveredCardSkills.has(b);
    if (aHighlighted && !bHighlighted) return -1;
    if (!aHighlighted && bHighlighted) return 1;
    return 0;
  });

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const sections = content.querySelectorAll('[data-skills]');

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveSkills((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const skills = (entry.target as HTMLElement).getAttribute('data-skills');
            if (!skills) return;
            const skillList = skills.split(',').map((s) => s.trim());
            if (entry.isIntersecting) {
              skillList.forEach((s) => next.add(s));
            } else {
              skillList.forEach((s) => next.delete(s));
            }
          });
          return next;
        });
      },
      { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={pageRef}
      className="cv-page max-w-none -mx-4 md:-mx-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] px-4 md:px-8"
      style={
        isBannerCompact
          ? ({ '--cv-header-height': `${BANNER_COMPACT_HEIGHT}px` } as React.CSSProperties)
          : undefined
      }
    >
      <header className="sticky top-0 z-20 bg-[var(--color-bg)]">
        <div
          className="relative w-full overflow-hidden rounded-xl transition-[height] duration-300 ease-out"
          style={{
            height: isBannerCompact ? BANNER_COMPACT_HEIGHT : 'var(--cv-header-height)',
            minHeight: isBannerCompact ? BANNER_COMPACT_HEIGHT : 200,
          }}
        >
          <img
            src="/cv/banner.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center translate-z-0"
            style={{ transform: 'translateZ(0)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
            }}
          />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 flex gap-4 flex-wrap z-[2]">
            <a
              href={PDF_URL}
              download="CV-Victor-Le-Gall-2025.pdf"
              className="inline-flex items-center py-2.5 px-5 rounded-lg font-medium text-[0.95rem] no-underline transition-[background,color,transform] duration-200 hover:-translate-y-0.5 bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:text-white"
            >
              Télécharger le PDF
            </a>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center py-2.5 px-5 rounded-lg font-medium text-[0.95rem] no-underline transition-[background,color,transform] duration-200 hover:-translate-y-0.5 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] hover:text-[var(--color-accent)]"
            >
              Ouvrir le PDF
            </a>
          </div>
          <h1 className="absolute bottom-4 right-4 md:bottom-6 md:right-8 m-0 text-2xl md:text-3xl font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
            {cvData.name}
          </h1>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:gap-8 items-start mt-4 md:mt-6 md:mt-8">
        <aside className="cv-competences-aside shrink-0 w-full md:w-fit sticky top-[calc(var(--cv-header-height)+0.75rem)] md:top-[calc(var(--cv-header-height)+1rem)] flex flex-col gap-4 bg-[var(--color-bg)] order-[-1] md:order-none z-10 self-stretch md:self-start">
          <aside className="flex flex-col gap-2 md:gap-4 p-3 md:p-5 md:py-5 md:px-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl md:w-fit">
            <h3 className="m-0 md:mb-4 text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
              Compétences
            </h3>
            <ul className="list-none m-0 p-0 flex flex-wrap gap-2 md:flex-col md:flex-nowrap md:items-start pl-1 md:pl-0">
              {sortedSkills.map((skill) => {
                const isActive = activeSkills.has(skill);
                const isHover = hoveredCardSkills.has(skill);
                const highlighted = isActive || isHover;
                return (
                  <li
                    key={skill}
                    className={`text-xs md:text-[0.9rem] cursor-pointer rounded transition-[color,font-weight,background] duration-200 hover:text-[var(--color-accent)] py-1 px-2 md:py-1 md:px-1 md:-mx-1 md:rounded md:whitespace-nowrap md:w-fit ${
                      highlighted
                        ? 'text-[var(--color-accent)] font-semibold bg-[var(--color-accent)] text-white md:bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] md:text-[var(--color-accent)]'
                        : 'bg-[var(--color-border)] md:bg-transparent text-[var(--color-text-secondary)]'
                    }`}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill}
                  </li>
                );
              })}
            </ul>
          </aside>
        </aside>

        <div
          className="flex-1 flex flex-col gap-6 md:gap-8 min-w-0 bg-[var(--color-bg)] relative z-0"
          ref={contentRef}
        >
          <section className="flex flex-col gap-6">
            <h2 className="m-0 mb-1 text-xl font-semibold text-[var(--color-text)] pb-2 border-b-2 border-[var(--color-accent)]">
              Expériences et projets
            </h2>
            {getTimelineEntries().map((entry) =>
              entry.type === 'experience' ? (
                <ExperienceCard
                  key={entry.data.id}
                  experience={entry.data}
                  isHighlighted={!!hoveredSkill && entry.data.skills.includes(hoveredSkill)}
                  onMouseEnter={() => setHoveredCardSkills(new Set(entry.data.skills))}
                  onMouseLeave={() => setHoveredCardSkills(new Set())}
                />
              ) : (
                <ProjectCard
                  key={entry.data.id}
                  project={entry.data}
                  isHighlighted={!!hoveredSkill && entry.data.skills.includes(hoveredSkill)}
                  onMouseEnter={() => setHoveredCardSkills(new Set(entry.data.skills))}
                  onMouseLeave={() => setHoveredCardSkills(new Set())}
                />
              )
            )}
          </section>
          <section className="flex flex-col gap-6">
            <h2 className="m-0 mb-1 text-xl font-semibold text-[var(--color-text)] pb-2 border-b-2 border-[var(--color-accent)]">
              Études et diplômes
            </h2>
            <div className="flex flex-col gap-3">
              {cvData.education.map((e, i) => (
                <div key={i} className="flex gap-4 items-baseline">
                  <span className="text-sm font-semibold text-[var(--color-accent)] min-w-16">
                    {e.year}
                  </span>
                  <span className="text-[0.95rem] text-[var(--color-text)]">{e.diploma}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-6 mb-8">
            <h2 className="m-0 mb-1 text-xl font-semibold text-[var(--color-text)] pb-2 border-b-2 border-[var(--color-accent)]">
              Contact
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {cvData.contacts.map((c) => (
                <div key={c.label} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.03em]">
                    {c.label}
                  </span>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-[0.95rem] text-[var(--color-accent)] no-underline hover:underline"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-[0.95rem] text-[var(--color-text)]">{c.value}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  experience,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
}: {
  experience: Experience;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className={`cv-card p-5 bg-[var(--color-surface)] border rounded-xl hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] origin-center ${
        isHighlighted ? 'border-[var(--color-accent)] shadow-[0_0_0_1px_var(--color-accent)]' : 'border-[var(--color-border)]'
      }`}
      data-skills={experience.skills.length ? experience.skills.join(', ') : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="text-sm text-[var(--color-text-secondary)] mb-2">
        {experience.startDate} — {experience.endDate}
      </div>
      <h3 className="m-0 mb-1 text-lg font-semibold text-[var(--color-text)]">{experience.title}</h3>
      <div className="text-[0.95rem] text-[var(--color-text-secondary)] mb-3">
        {experience.company}
      </div>
      {experience.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {experience.skills.map((s) => (
            <span
              key={s}
              className="py-0.5 px-2 text-xs font-medium bg-[var(--color-border)] text-[var(--color-text-secondary)] rounded-md"
            >
              {s}
            </span>
          ))}
        </div>
      )}
      <ul className="m-0 pl-5 text-sm text-[var(--color-text)] leading-relaxed [&_li]:mb-1">
        {experience.missions.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({
  project,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className={`cv-card p-5 bg-[var(--color-surface)] border rounded-xl hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] origin-center ${
        isHighlighted ? 'border-[var(--color-accent)] shadow-[0_0_0_1px_var(--color-accent)]' : 'border-[var(--color-border)]'
      }`}
      data-skills={project.skills.join(', ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="text-sm text-[var(--color-text-secondary)] mb-2">
        {project.startDate} — {project.endDate}
      </div>
      <h3 className="m-0 mb-1 text-lg font-semibold text-[var(--color-text)]">{project.title}</h3>
      <p className="m-0 mb-3 text-[0.95rem] text-[var(--color-text-secondary)] leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.skills.map((s) => (
          <span
            key={s}
            className="py-0.5 px-2 text-xs font-medium bg-[var(--color-border)] text-[var(--color-text-secondary)] rounded-md"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
