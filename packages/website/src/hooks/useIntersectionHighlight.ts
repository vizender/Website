import { useEffect, useRef, useState } from 'react';

/**
 * Tracks which `data-skills` sections are visible and returns the
 * union of their skill lists as a Set.
 */
export function useIntersectionHighlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSkills, setActiveSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('[data-skills]');

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
      { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { containerRef, activeSkills };
}
