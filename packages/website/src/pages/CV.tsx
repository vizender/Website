import './CV.css';

export function CV() {
  return (
    <div className="cv-page">
      <h1>CV</h1>
      <p className="cv-intro">
        Téléchargez mon CV au format PDF (français).
      </p>
      <a
        href="/cv/CV-2025.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="cv-download-link"
      >
        Ouvrir le CV (PDF)
      </a>
      <span className="cv-separator"> ou </span>
      <a
        href="/cv/CV-2025.pdf"
        download="CV-Victor-Le-Gall-2025.pdf"
        className="cv-download-link"
      >
        Télécharger
      </a>
    </div>
  );
}
