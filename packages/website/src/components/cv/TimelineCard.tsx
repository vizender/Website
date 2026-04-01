import type { Experience, Project, TimelineEntry } from '../../data/cvData';

interface TimelineCardProps {
  entry: TimelineEntry;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function TimelineCard({ entry, isHighlighted, onMouseEnter, onMouseLeave }: TimelineCardProps) {
  const { data } = entry;
  const borderClass = isHighlighted
    ? 'border-theme-accent shadow-[0_0_0_1px_var(--color-accent)]'
    : 'border-theme-border';

  return (
    <div
      className={`cv-card p-5 bg-theme-surface border rounded-xl md:hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] dark:md:hover:shadow-[0_10px_28px_rgba(0,0,0,0.4)] ${borderClass}`}
      data-cv-entry-id={data.id}
      data-skills={data.skills.length ? data.skills.join(', ') : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="text-sm text-theme-text-secondary mb-2">
        {data.startDate} — {data.endDate}
      </div>
      <h3 className="m-0 mb-1 text-lg font-semibold text-theme-text">{data.title}</h3>

      {entry.type === 'experience' ? (
        <ExperienceBody experience={entry.data} />
      ) : (
        <ProjectBody project={entry.data} />
      )}

      {data.skills.length > 0 && <SkillTags skills={data.skills} />}
    </div>
  );
}

function ExperienceBody({ experience }: { experience: Experience }) {
  return (
    <>
      <div className="text-[0.95rem] text-theme-text-secondary mb-3">{experience.company}</div>
      {experience.missions.length > 0 && (
        <ul className="m-0 pl-5 text-sm text-theme-text leading-relaxed [&_li]:mb-1 mb-3">
          {experience.missions.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}
    </>
  );
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <p className="m-0 mb-3 text-[0.95rem] text-theme-text-secondary leading-relaxed">
      {project.description}
    </p>
  );
}

function SkillTags({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <span
          key={s}
          className="py-0.5 px-2 text-xs font-medium bg-theme-border text-theme-text-secondary rounded-md"
        >
          {s}
        </span>
      ))}
    </div>
  );
}
