import { useEffect, useRef, useState } from 'react';

type ScrollCompactThreshold = number | { enter: number; exit: number };
const COMPACT_SETTLE_LOCK_MS = 260;

export function useScrollCompact(threshold: ScrollCompactThreshold) {
  const [isCompact, setIsCompact] = useState(false);
  const settleLockUntilRef = useRef(0);

  useEffect(() => {
    const enterThreshold = typeof threshold === 'number' ? threshold : threshold.enter;
    const exitThreshold = typeof threshold === 'number' ? threshold : threshold.exit;

    const lockCompact = () => {
      settleLockUntilRef.current = Date.now() + COMPACT_SETTLE_LOCK_MS;
    };

    const handler = () => {
      const y = window.scrollY;
      setIsCompact((prev) => {
        const isLocked = Date.now() < settleLockUntilRef.current;

        if (prev) {
          if (isLocked) return true;
          return y > exitThreshold;
        }

        const shouldEnterCompact = y > enterThreshold;
        if (shouldEnterCompact) lockCompact();
        return shouldEnterCompact;
      });
    };

    const wheelHandler = (event: WheelEvent) => {
      if (event.deltaY <= 0) return;

      // First downward gesture should commit to compact mode immediately.
      setIsCompact((prev) => {
        if (prev) return prev;
        lockCompact();
        return true;
      });

      // Keep scroll strictly away from 0 to prevent bounce-back after reflow.
      if (window.scrollY <= exitThreshold) {
        window.scrollTo({ top: exitThreshold + 1, behavior: 'auto' });
      }
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('wheel', wheelHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('wheel', wheelHandler);
    };
  }, [threshold]);

  return isCompact;
}
