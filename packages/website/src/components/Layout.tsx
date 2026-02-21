import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ThemeSelector } from './ThemeSelector';

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 min-h-fit p-4 md:p-8">
        {children ?? <Outlet />}
      </main>

      <footer className="mt-auto flex items-center justify-between gap-4 p-4 md:p-8 border-t border-theme-border bg-theme-surface text-theme-text-secondary">
        <Link
          to="/about"
          className="text-sm no-underline transition-[color] duration-200 hover:text-theme-accent"
        >
          About
        </Link>
        <ThemeSelector placement="top" />
      </footer>
    </div>
  );
}
