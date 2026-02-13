import { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Layout.css';

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

  return (
    <div className="layout">
      <nav className="nav" ref={navRef}>
        <Link to="/" className="nav-brand">
          Home
        </Link>
        <button
          type="button"
          className="nav-menu-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span className="nav-menu-icon" />
          <span className="nav-menu-icon" />
          <span className="nav-menu-icon" />
        </button>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''} ${themeDropdownOpen ? 'nav-links-theme-open' : ''}`}>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/cv" onClick={() => setMenuOpen(false)}>CV</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <div className={`theme-dropdown ${themeDropdownOpen ? 'theme-dropdown-open' : ''}`}>
            <button
              type="button"
              className="theme-toggle"
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
              <svg className="theme-dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {themeDropdownOpen && (
              <ul className="theme-dropdown-menu" role="listbox">
                <li role="option" aria-selected={theme === 'system'}>
                  <button
                    type="button"
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
      <main className="main">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}
