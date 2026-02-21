import { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export function Layout({ children }: { children?: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setThemeDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navLinksMaxHeight = menuOpen ? (themeDropdownOpen ? 'max-h-[420px]' : 'max-h-80') : 'max-h-0';

  return (
    <div className="min-h-screen flex flex-col">
      <nav
        ref={navRef}
        className="flex items-center justify-between p-4 md:p-8 border-b border-[var(--color-border)] bg-[var(--color-surface)] md:relative"
      >
        <Link
          to="/"
          className="inline-block py-2 px-4 font-semibold text-base text-[var(--color-text)] bg-[var(--nav-brand-bg)] rounded-lg no-underline transition-[background,transform] duration-200 hover:bg-[var(--color-border)] hover:no-underline hover:scale-105 hover:-translate-y-0.5"
        >
          Home
        </Link>
        <button
          type="button"
          className="md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 p-0 bg-transparent border border-[var(--color-border)] rounded-md cursor-pointer text-[var(--color-text)]"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span className="block w-[18px] h-0.5 bg-current rounded-sm" />
          <span className="block w-[18px] h-0.5 bg-current rounded-sm" />
          <span className="block w-[18px] h-0.5 bg-current rounded-sm" />
        </button>
        <div
          className={`flex items-center gap-6 absolute md:static top-full left-0 right-0 z-[100] flex-col md:flex-row md:gap-6 p-4 md:p-0 bg-[var(--color-surface)] border-b md:border-b-0 border-[var(--color-border)] shadow-lg md:shadow-none overflow-hidden md:overflow-visible transition-[max-height,opacity] duration-300 ease-in-out md:max-h-none ${navLinksMaxHeight} ${menuOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}
        >
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="py-2 px-3 rounded-md text-[var(--color-text-secondary)] no-underline transition-[background,color,transform] duration-200 hover:bg-[var(--color-border)] hover:text-[var(--color-accent)] hover:no-underline hover:scale-105 hover:-translate-y-0.5 block md:inline-block w-full md:w-auto py-3 px-4 md:py-2 md:px-3"
          >
            About
          </Link>
          <Link
            to="/cv"
            onClick={() => setMenuOpen(false)}
            className="py-2 px-3 rounded-md text-[var(--color-text-secondary)] no-underline transition-[background,color,transform] duration-200 hover:bg-[var(--color-border)] hover:text-[var(--color-accent)] hover:no-underline hover:scale-105 hover:-translate-y-0.5 block md:inline-block w-full md:w-auto py-3 px-4 md:py-2 md:px-3"
          >
            CV
          </Link>
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="py-2 px-3 rounded-md text-[var(--color-text-secondary)] no-underline transition-[background,color,transform] duration-200 hover:bg-[var(--color-border)] hover:text-[var(--color-accent)] hover:no-underline hover:scale-105 hover:-translate-y-0.5 block md:inline-block w-full md:w-auto py-3 px-4 md:py-2 md:px-3"
          >
            Blog
          </Link>
          <Link
            to="/projects"
            onClick={() => setMenuOpen(false)}
            className="py-2 px-3 rounded-md text-[var(--color-text-secondary)] no-underline transition-[background,color,transform] duration-200 hover:bg-[var(--color-border)] hover:text-[var(--color-accent)] hover:no-underline hover:scale-105 hover:-translate-y-0.5 block md:inline-block w-full md:w-auto py-3 px-4 md:py-2 md:px-3"
          >
            Projects
          </Link>
          <div className={`relative mt-2 md:mt-0 self-start md:self-auto ${themeDropdownOpen ? '[&_.theme-chevron]:rotate-180' : ''}`}>
            <button
              type="button"
              className="flex items-center justify-center gap-1 min-w-[2.25rem] h-[2.25rem] px-2 bg-transparent border border-[var(--color-border)] rounded-md cursor-pointer text-[var(--color-text-secondary)] transition-[color,border-color] duration-200 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]"
              onClick={() => setThemeDropdownOpen((o) => !o)}
              aria-expanded={themeDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select theme"
            >
              {theme === 'system' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              ) : theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              <svg className="theme-chevron opacity-70 transition-transform duration-200" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {themeDropdownOpen && (
              <ul
                className="absolute top-[calc(100%+0.5rem)] right-0 min-w-40 m-0 p-1 list-none bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg z-[200]"
                role="listbox"
              >
                <li role="option" aria-selected={theme === 'system'}>
                  <button
                    type="button"
                    className={`flex items-center gap-2 w-full py-2 px-3 bg-transparent border-none rounded-md cursor-pointer text-left text-sm transition-[background,color] duration-200 hover:bg-[var(--color-border)] hover:text-[var(--color-accent)] ${theme === 'system' ? 'text-[var(--color-accent)] font-medium' : 'text-[var(--color-text)]'}`}
                    onClick={() => { setTheme('system'); setThemeDropdownOpen(false); setMenuOpen(false); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    System
                  </button>
                </li>
                <li role="option" aria-selected={theme === 'light'}>
                  <button
                    type="button"
                    className={`flex items-center gap-2 w-full py-2 px-3 bg-transparent border-none rounded-md cursor-pointer text-left text-sm transition-[background,color] duration-200 hover:bg-[var(--color-border)] hover:text-[var(--color-accent)] ${theme === 'light' ? 'text-[var(--color-accent)] font-medium' : 'text-[var(--color-text)]'}`}
                    onClick={() => { setTheme('light'); setThemeDropdownOpen(false); setMenuOpen(false); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    Light
                  </button>
                </li>
                <li role="option" aria-selected={theme === 'dark'}>
                  <button
                    type="button"
                    className={`flex items-center gap-2 w-full py-2 px-3 bg-transparent border-none rounded-md cursor-pointer text-left text-sm transition-[background,color] duration-200 hover:bg-[var(--color-border)] hover:text-[var(--color-accent)] ${theme === 'dark' ? 'text-[var(--color-accent)] font-medium' : 'text-[var(--color-text)]'}`}
                    onClick={() => { setTheme('dark'); setThemeDropdownOpen(false); setMenuOpen(false); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    Dark
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-1 min-h-fit p-4 md:p-8">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}
