import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * On mobile: tracks which timeline card is centered in the scroll container
 * and returns its skills. Only runs when isMobile is true.
 */
export function useCenteredCard(
  containerRef: React.RefObject<HTMLDivElement | null>,
  isMobile: boolean
) {
  const [centeredSkills, setCenteredSkills] = useState<Set<string>>(new Set());

  const updateCentered = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const viewportCenter = window.innerHeight / 2;
    const sections = container.querySelectorAll('[data-skills]');

    let bestEntry: { element: Element; skills: string[]; distance: number } | null = null;

    sections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - elCenter);

      // Only consider cards that are at least 20% visible in the viewport
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, window.innerHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      if (visibleHeight / rect.height < 0.2) return;

      const skillsAttr = (el as HTMLElement).getAttribute('data-skills');
      if (!skillsAttr) return;
      const skills = skillsAttr.split(',').map((s) => s.trim()).filter(Boolean);

      if (!bestEntry || distance < bestEntry.distance) {
        bestEntry = { element: el, skills, distance };
      }
    });

    setCenteredSkills(new Set(bestEntry?.skills ?? []));
  }, [containerRef]);

  useEffect(() => {
    if (!isMobile) {
      setCenteredSkills(new Set());
      return;
    }
    const container = containerRef.current;
    if (!container) return;

    updateCentered();

    const sections = container.querySelectorAll('[data-skills]');
    const observer = new IntersectionObserver(
      () => {
        requestAnimationFrame(updateCentered);
      },
      { root: null, rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));

    const scrollHandler = () => requestAnimationFrame(updateCentered);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', updateCentered);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', updateCentered);
    };
  }, [containerRef, updateCentered, isMobile]);

  return centeredSkills;
}
