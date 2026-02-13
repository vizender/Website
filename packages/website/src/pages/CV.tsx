import './CV.css';

export function CV() {
  return (
    <div className="cv-page">
      <div className="cv-viewer">
        <iframe
          src="/cv/CV-2025.pdf#toolbar=0&navpanes=0&scrollbar=1"
          title="CV Victor Le Gall"
          className="cv-iframe"
        />
      </div>
      <a
        href="/cv/CV-2025.pdf"
        download="CV-Victor-Le-Gall-2025.pdf"
        className="cv-download-link"
      >
        Télécharger le PDF
      </a>
    </div>
  );
}
