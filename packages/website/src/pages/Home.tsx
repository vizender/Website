import { Link } from 'react-router-dom';
import './Home.css';

export function Home() {
  return (
    <div className="home">
      <h1>Welcome</h1>
      <p>Personal website — profile, blog, and projects.</p>
      <ul className="home-links">
        <li><Link to="/about">About me</Link></li>
        <li><Link to="/cv">CV</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/projects">Projects</Link></li>
      </ul>
    </div>
  );
}
