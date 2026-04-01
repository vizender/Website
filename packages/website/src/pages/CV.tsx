import { useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { cvData, getAllSkills, getTimelineEntries, type TimelineEntry } from '../data/cvData';
import { useScrollCompact } from '../hooks/useScrollCompact';
import { useCenteredCard } from '../hooks/useCenteredCard';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { TimelineCard } from '../components/cv/TimelineCard';

const PDF_URL = '/cv/CV-2025.pdf';
const BANNER_SCROLL_ENTER_THRESHOLD = 0;
const BANNER_SCROLL_EXIT_THRESHOLD = 0;
const BANNER_COMPACT_HEIGHT = 240;

export function CV() {
  const isBannerCompact = useScrollCompact({
    enter: BANNER_SCROLL_ENTER_THRESHOLD,
    exit: BANNER_SCROLL_EXIT_THRESHOLD,
  });
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { focusedSkills, focusedEntryId } = useCenteredCard(timelineContainerRef, !isDesktop);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCardSkills, setHoveredCardSkills] = useState<Set<string>>(new Set());

  const allSkills = useMemo(() => getAllSkills(), []);
  const timelineEntries = useMemo(() => getTimelineEntries(), []);

  /**
   * Mobile: skills tied to scroll focus or a hovered card go first.
   * Desktop: card hover reorders so those skills jump to the front; competence hover keeps alphabetical
   * order so chips don’t move under the cursor (avoids hover flicker).
   */
  const sortedSkills = useMemo(() => {
    if (isDesktop && hoveredSkill !== null) {
      return allSkills;
    }

    return [...allSkills].sort((a, b) => {
      const aHighlighted = isDesktop
        ? hoveredCardSkills.has(a)
        : focusedSkills.has(a) || hoveredCardSkills.has(a);
      const bHighlighted = isDesktop
        ? hoveredCardSkills.has(b)
        : focusedSkills.has(b) || hoveredCardSkills.has(b);
      if (aHighlighted && !bHighlighted) return -1;
      if (!aHighlighted && bHighlighted) return 1;
      return 0;
    });
  }, [allSkills, isDesktop, hoveredSkill, hoveredCardSkills, focusedSkills]);

  /** Slightly tighter chip spacing on phone while something is focused (helps limit height growth when chips are larger). */
  const mobileSkillsTightLayout =
    !isDesktop && (focusedEntryId !== null || hoveredCardSkills.size > 0);

  const skillHighlighted = (skill: string) =>
    isDesktop
      ? hoveredSkill === skill || hoveredCardSkills.has(skill)
      : focusedSkills.has(skill) || hoveredCardSkills.has(skill);

  const entryHighlighted = (entry: TimelineEntry) =>
    isDesktop
      ? !!hoveredSkill && entry.data.skills.includes(hoveredSkill)
      : focusedEntryId === entry.data.id;

  return (
    <div
      className="cv-page max-w-none -mx-4 md:-mx-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] px-4 md:px-8"
      style={
        isBannerCompact
          ? ({ '--cv-header-height': `${BANNER_COMPACT_HEIGHT}px` } as CSSProperties)
          : undefined
      }
    >
      <header className="sticky top-0 z-20 bg-theme-bg -mx-4 md:-mx-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)]">
        <div
          className="relative w-full overflow-hidden rounded-none transition-[height] duration-300 ease-out"
          style={{
            height: isBannerCompact ? BANNER_COMPACT_HEIGHT : 'var(--cv-header-height)',
            minHeight: isBannerCompact ? BANNER_COMPACT_HEIGHT : 200,
            overflowAnchor: 'none',
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
          <Link
            to="/"
            className="absolute top-4 left-4 md:top-6 md:left-8 z-[2] inline-flex items-center gap-2 py-3 px-5 font-medium no-underline rounded-lg transition-[background,color] duration-200 bg-black/40 text-white hover:bg-black/60 hover:text-white border border-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 flex flex-col md:flex-row items-start gap-2 md:gap-4 z-[2]">
            <a
              href={PDF_URL}
              download="CV-Victor-Le-Gall-2025.pdf"
              className="inline-flex items-center py-2.5 px-5 rounded-lg font-medium text-[0.95rem] no-underline transition-[background,color,transform] duration-200 hover:-translate-y-0.5 bg-theme-accent text-white hover:bg-theme-accent-hover hover:text-white"
            >
              Télécharger le PDF
            </a>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center py-2.5 px-5 rounded-lg font-medium text-[0.95rem] no-underline transition-[background,color,transform] duration-200 hover:-translate-y-0.5 bg-theme-surface text-theme-text border border-theme-border hover:bg-theme-border hover:text-theme-accent"
            >
              Ouvrir le PDF
            </a>
          </div>
          <h1 className="absolute bottom-4 right-4 md:bottom-6 md:right-8 m-0 text-2xl md:text-3xl font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
            {cvData.name}
          </h1>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start mt-4 md:mt-8">
        <aside className="cv-competences-aside shrink-0 w-full md:shrink-[2] md:basis-[220px] md:min-w-[12ch] md:max-w-[240px] sticky top-[var(--cv-header-height)] md:top-[calc(var(--cv-header-height)+1rem)] flex flex-col gap-4 order-[-1] md:order-none z-10 self-stretch md:self-start px-4 md:px-0 pt-4 md:pt-0 pb-4 md:pb-0 bg-theme-bg">
          <div className="flex w-full flex-col gap-2 md:gap-4 p-3 md:p-5 bg-theme-surface border border-theme-border rounded-xl">
            <h3 className="m-0 md:mb-4 text-sm font-semibold text-theme-text-secondary uppercase tracking-[0.05em] whitespace-nowrap">
              Compétences
            </h3>
            <ul
              className={`list-none m-0 p-0 flex flex-wrap md:flex-row md:flex-wrap md:items-start pl-1 md:pl-0 ${
                mobileSkillsTightLayout ? 'gap-1.5' : 'gap-2.5'
              } md:gap-2.5`}
            >
              {sortedSkills.map((skill) => {
                const highlighted = skillHighlighted(skill);
                return (
                  <li
                    key={skill}
                    className={`text-xs md:text-[0.9rem] cursor-pointer rounded py-1 px-2 md:py-1 md:px-1 md:-mx-1 md:rounded md:whitespace-nowrap md:w-fit md:inline-flex md:items-center font-medium transition-[color,background-color] duration-200 md:origin-center md:transition-[color,background-color,transform] md:duration-500 md:ease-out hover:text-theme-accent ${
                      highlighted
                        ? 'bg-theme-accent text-white md:scale-105 md:font-semibold md:bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] md:text-theme-accent'
                        : 'bg-theme-border text-theme-text-secondary md:scale-100 md:bg-transparent md:font-normal'
                    }`}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill}
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div
          className="flex-1 flex flex-col gap-6 md:gap-8 min-w-0 bg-theme-bg relative z-0"
          ref={timelineContainerRef}
        >
          <section className="flex flex-col gap-6">
            <h2 className="m-0 mb-1 text-xl font-semibold text-theme-text pb-2 border-b-2 border-theme-accent">
              Expériences et projets
            </h2>
            <div className="flex flex-col gap-2 md:gap-6">
              {timelineEntries.map((entry) => (
                <div key={entry.data.id}>
                  <TimelineCard
                    entry={entry}
                    isHighlighted={entryHighlighted(entry)}
                    onMouseEnter={() => setHoveredCardSkills(new Set(entry.data.skills))}
                    onMouseLeave={() => setHoveredCardSkills(new Set())}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className="m-0 mb-1 text-xl font-semibold text-theme-text pb-2 border-b-2 border-theme-accent">
              Études et diplômes
            </h2>
            <div className="flex flex-col gap-3">
              {cvData.education.map((e, i) => (
                <div key={i} className="flex gap-4 items-baseline">
                  <span className="text-sm font-semibold text-theme-accent min-w-16">{e.year}</span>
                  <span className="text-[0.95rem] text-theme-text">{e.diploma}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6 mb-8">
            <h2 className="m-0 mb-1 text-xl font-semibold text-theme-text pb-2 border-b-2 border-theme-accent">
              Contact
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {cvData.contacts.map((c) => (
                <div key={c.label} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-theme-text-secondary uppercase tracking-[0.03em]">
                    {c.label}
                  </span>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-[0.95rem] text-theme-accent no-underline hover:underline"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-[0.95rem] text-theme-text">{c.value}</span>
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
