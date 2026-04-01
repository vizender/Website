import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** Focal line at page top (fraction of viewport): sits on the first cards below the banner. */
const FOCAL_START_RATIO = 0.37;
/** Focal line after scrolling (fraction of viewport): ~two-thirds reading line. */
const FOCAL_END_RATIO = 2 / 3;
/**
 * Scroll distance (px) over which the focal line moves from start → end.
 * Longer = more vertical scroll where mid-list cards can “own” the highlight before the line locks to 2/3.
 */
const SCROLL_FOCAL_BLEND_PX = 520;
/**
 * When the geometric winner is a card lower on the page (typical scroll down): stay on the current
 * card until the next one is clearly closer to the focal line — widens the second item’s window before the third takes over.
 */
const SWITCH_HYSTERESIS_DOWN_PX = 54;
/**
 * When the winner is higher on the page (typical scroll up): same idea so item 2 isn’t dropped
 * back to item 1 after a tiny nudge; slightly lower than DOWN so item 3 still releases to item 2 reasonably fast.
 */
const SWITCH_HYSTERESIS_UP_PX = 36;
const MIN_VISIBLE_FRACTION = 0.2;

const CARD_SELECTOR = '[data-cv-entry-id]';

function parseSkillsAttr(el: Element): string[] {
  const raw = (el as HTMLElement).getAttribute('data-skills');
  if (!raw) return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

function visibleFraction(rect: DOMRect): number {
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, window.innerHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return visibleHeight / rect.height;
}

/** Smooth 0→1 with zero derivative at 0 and 1. */
function smoothScrollBlend(scrollY: number): number {
  if (scrollY <= 0) return 0;
  if (scrollY >= SCROLL_FOCAL_BLEND_PX) return 1;
  const w = scrollY / SCROLL_FOCAL_BLEND_PX;
  return w * w * (3 - 2 * w);
}

type FocusState = { entryId: string | null; skills: string[] };

const EMPTY_FOCUS: FocusState = { entryId: null, skills: [] };

type Candidate = {
  entryId: string;
  skills: string[];
  rect: DOMRect;
  center: number;
};

function pickClosestToFocal(candidates: Candidate[], focalY: number): Candidate {
  const containing = candidates.filter(
    (c) => focalY >= c.rect.top && focalY <= c.rect.bottom
  );
  const pool = containing.length > 0 ? containing : candidates;

  let best = pool[0];
  let bestDist = Math.abs(focalY - best.center);
  for (let i = 1; i < pool.length; i++) {
    const c = pool[i];
    const d = Math.abs(focalY - c.center);
    if (d < bestDist - 1e-6 || (Math.abs(d - bestDist) <= 1e-6 && c.rect.top < best.rect.top)) {
      best = c;
      bestDist = d;
    }
  }
  return best;
}

/**
 * On mobile: one focal line moves from an upper position (top entries) to ~2/3 viewport as you
 * scroll a short distance; the highlighted card is always the closest to that line (with a
 * directional hysteresis so item 2 keeps a longer band in both scroll directions).
 */
export function useCenteredCard(
  containerRef: React.RefObject<HTMLDivElement | null>,
  isMobile: boolean
): { focusedSkills: Set<string>; focusedEntryId: string | null } {
  const [focus, setFocus] = useState<FocusState>(EMPTY_FOCUS);
  const lastEntryIdRef = useRef<string | null>(null);

  const focusedSkills = useMemo(() => new Set(focus.skills), [focus.skills]);

  const updateFocus = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollY = window.scrollY;
    const t = smoothScrollBlend(scrollY);
    const ratio = FOCAL_START_RATIO + t * (FOCAL_END_RATIO - FOCAL_START_RATIO);
    const focalY = window.innerHeight * ratio;
    const sections = container.querySelectorAll(CARD_SELECTOR);

    const candidates: Candidate[] = [];

    sections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (visibleFraction(rect) < MIN_VISIBLE_FRACTION) return;

      const entryId = (el as HTMLElement).getAttribute('data-cv-entry-id');
      if (!entryId) return;

      const center = rect.top + rect.height / 2;
      const skills = parseSkillsAttr(el);

      candidates.push({ entryId, skills, rect, center });
    });

    if (candidates.length === 0) {
      lastEntryIdRef.current = null;
      setFocus((prev) => (prev.entryId === null && prev.skills.length === 0 ? prev : EMPTY_FOCUS));
      return;
    }

    if (candidates.length === 1) {
      const only = candidates[0];
      if (only.entryId !== lastEntryIdRef.current) {
        lastEntryIdRef.current = only.entryId;
        setFocus({ entryId: only.entryId, skills: only.skills });
      }
      return;
    }

    let best = pickClosestToFocal(candidates, focalY);

    const lockedId = lastEntryIdRef.current;
    if (lockedId) {
      const locked = candidates.find((c) => c.entryId === lockedId);
      if (locked) {
        const lockedDist = Math.abs(focalY - locked.center);
        const bestDist = Math.abs(focalY - best.center);
        const movingUpDocument = best.rect.top < locked.rect.top;
        const hyst = movingUpDocument ? SWITCH_HYSTERESIS_UP_PX : SWITCH_HYSTERESIS_DOWN_PX;
        if (best.entryId !== lockedId && bestDist >= lockedDist - hyst) {
          best = locked;
        }
      }
    }

    if (best.entryId === lastEntryIdRef.current) return;

    lastEntryIdRef.current = best.entryId;
    setFocus({ entryId: best.entryId, skills: best.skills });
  }, [containerRef]);

  const rafRef = useRef<number>(0);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current !== 0) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      updateFocus();
    });
  }, [updateFocus]);

  useEffect(() => {
    if (!isMobile) {
      if (rafRef.current !== 0) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      lastEntryIdRef.current = null;
      setFocus(EMPTY_FOCUS);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    updateFocus();

    const onScroll = () => scheduleUpdate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onScroll) : null;
    ro?.observe(container);

    return () => {
      if (rafRef.current !== 0) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro?.disconnect();
    };
  }, [containerRef, isMobile, updateFocus, scheduleUpdate]);

  return { focusedSkills, focusedEntryId: focus.entryId };
}
