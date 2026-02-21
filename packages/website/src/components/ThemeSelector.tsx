import { useState, useRef, useEffect } from 'react';
import { useTheme, type Theme } from '../context/ThemeContext';
import { ThemeIcon } from './ThemeIcon';

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function ThemeSelector({ onSelect, placement = 'bottom' }: { onSelect?: () => void; placement?: 'top' | 'bottom' }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="flex items-center justify-center gap-1 min-w-[2.25rem] h-[2.25rem] px-2 bg-transparent border border-theme-border rounded-md cursor-pointer text-theme-text-secondary transition-[color,border-color] duration-200 hover:text-theme-accent hover:border-theme-accent"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select theme"
      >
        <ThemeIcon theme={theme} />
        <svg
          className={`opacity-70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          className={`absolute right-0 min-w-40 m-0 p-1 list-none bg-theme-surface border border-theme-border rounded-lg shadow-lg z-[200] ${
            placement === 'top' ? 'bottom-[calc(100%+0.5rem)]' : 'top-[calc(100%+0.5rem)]'
          }`}
          role="listbox"
        >
          {THEME_OPTIONS.map(({ value, label }) => (
            <li key={value} role="option" aria-selected={theme === value}>
              <button
                type="button"
                className={`flex items-center gap-2 w-full py-2 px-3 bg-transparent border-none rounded-md cursor-pointer text-left text-sm transition-[background,color] duration-200 hover:bg-theme-border hover:text-theme-accent ${
                  theme === value ? 'text-theme-accent font-medium' : 'text-theme-text'
                }`}
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                  onSelect?.();
                }}
              >
                <ThemeIcon theme={value} size={16} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
