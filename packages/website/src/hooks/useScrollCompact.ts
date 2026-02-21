import { useEffect, useState } from 'react';

export function useScrollCompact(threshold: number) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handler = () => setIsCompact(window.scrollY > threshold);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return isCompact;
}
