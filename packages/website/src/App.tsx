import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { CV } from './pages/CV';
import { Projects } from './pages/Projects';
import { ProjectOnitama } from './pages/ProjectOnitama';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/onitama" element={<ProjectOnitama />} />
      </Routes>
    </Layout>
  );
}

export default App;
