import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="layout">
      <nav className="nav">
        <Link to="/" className="nav-brand">
          Home
        </Link>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/cv">CV</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/projects">Projects</Link>
        </div>
      </nav>
      <main className="main">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}
