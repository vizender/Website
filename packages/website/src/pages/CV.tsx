import { useEffect, useRef, useState } from 'react';
import { cvData, getAllSkills, getTimelineEntries, type Experience, type Project } from '../data/cvData';
import './CV.css';

const PDF_URL = '/cv/CV-2025.pdf';

export function CV() {
  const [activeSkills, setActiveSkills] = useState<Set<string>>(new Set());
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCardSkills, setHoveredCardSkills] = useState<Set<string>>(new Set());
  const [, setResizeKey] = useState(0);
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
    <div ref={pageRef} className="cv-page">
      <header className="cv-sticky-header">
        <div className="cv-banner">
          <img src="/cv/banner.png" alt="" className="cv-banner-image" />
          <div className="cv-banner-overlay" />
          <div className="cv-pdf-buttons">
            <a
              href={PDF_URL}
              download="CV-Victor-Le-Gall-2025.pdf"
              className="cv-btn cv-btn-primary"
            >
              Télécharger le PDF
            </a>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-btn cv-btn-secondary"
            >
              Ouvrir le PDF
            </a>
          </div>
          <h1 className="cv-banner-name">{cvData.name}</h1>
        </div>
      </header>

      <div className="cv-main-row">
        <aside className="cv-sticky-sidebar">
          <aside className="cv-sidebar">
            <h3 className="cv-sidebar-title">Compétences</h3>
            <ul className="cv-skills-list">
              {sortedSkills.map((skill) => (
                <li
                  key={skill}
                  className={`cv-skill ${activeSkills.has(skill) ? 'cv-skill-active' : ''} ${hoveredCardSkills.has(skill) ? 'cv-skill-hover' : ''}`}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </aside>
        </aside>

        <div className="cv-content" ref={contentRef}>
          <section className="cv-section">
            <h2 className="cv-section-title">Expériences et projets</h2>
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
          <section className="cv-section">
            <h2 className="cv-section-title">Études et diplômes</h2>
            <div className="cv-education">
              {cvData.education.map((e, i) => (
              <div key={i} className="cv-education-item">
                <span className="cv-education-year">{e.year}</span>
                <span className="cv-education-diploma">{e.diploma}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="cv-section cv-contacts">
            <h2 className="cv-section-title">Contact</h2>
            <div className="cv-contacts-grid">
              {cvData.contacts.map((c) => (
                <div key={c.label} className="cv-contact">
                  <span className="cv-contact-label">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} className="cv-contact-value">
                      {c.value}
                    </a>
                  ) : (
                    <span className="cv-contact-value">{c.value}</span>
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
      className={`cv-card cv-experience ${isHighlighted ? 'cv-card-highlighted' : ''}`}
      data-skills={experience.skills.length ? experience.skills.join(', ') : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="cv-card-dates">
        {experience.startDate} — {experience.endDate}
      </div>
      <h3 className="cv-card-title">{experience.title}</h3>
      <div className="cv-card-company">{experience.company}</div>
      {experience.skills.length > 0 && (
      <div className="cv-card-skills">
        {experience.skills.map((s) => (
          <span key={s} className="cv-tag">
            {s}
          </span>
        ))}
      </div>
      )}
      <ul className="cv-card-missions">
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
      className={`cv-card cv-project ${isHighlighted ? 'cv-card-highlighted' : ''}`}
      data-skills={project.skills.join(', ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="cv-card-dates">
        {project.startDate} — {project.endDate}
      </div>
      <h3 className="cv-card-title">{project.title}</h3>
      <p className="cv-card-description">{project.description}</p>
      <div className="cv-card-skills">
        {project.skills.map((s) => (
          <span key={s} className="cv-tag">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
