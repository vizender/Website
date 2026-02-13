# Charte graphique — Personal Website

Document de référence pour préparer les projets à intégrer au site personnel. À importer ou consulter avant de développer un nouveau projet.

---

## 1. Principe général

**Règle d'or :** Blanc, gris et noir pour la structure ; les couleurs uniquement pour les boutons, liens, surlignages et éléments décoratifs.

---

## 2. Palette de couleurs

### Variables CSS à définir

```css
/* Thème clair */
:root,
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-surface: #f5f5f5;
  --color-border: #e0e0e0;
  --color-text: #111;
  --color-text-secondary: #555;
  --color-accent: #2563eb;
  --color-accent-hover: #1d4ed8;
  --nav-brand-bg: #e8e8e8;
}

/* Thème sombre */
[data-theme="dark"] {
  --color-bg: #0f0f0f;
  --color-surface: #1a1a1a;
  --color-border: #2a2a2a;
  --color-text: #f5f5f5;
  --color-text-secondary: #999;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --nav-brand-bg: #252525;
}
```

### Rôles des couleurs

| Variable | Rôle | Usage |
|----------|------|-------|
| `--color-bg` | Fond principal | Body, pages |
| `--color-surface` | Surfaces (cartes, nav) | Cards, nav bar |
| `--color-border` | Bordures, séparateurs | Borders, dividers |
| `--color-text` | Texte principal | Titres, paragraphes |
| `--color-text-secondary` | Texte secondaire | Labels, descriptions |
| `--color-accent` | Accent (liens, boutons) | Links, CTA, highlights |
| `--color-accent-hover` | Accent au survol | Hover states |

---

## 3. Thème clair / sombre

- **Attribut :** `data-theme="light"` ou `data-theme="dark"` sur `<html>`
- **Persistance :** `localStorage` (clé `theme-preference`)
- **Toujours utiliser les variables** `var(--color-*)` pour les couleurs, jamais de valeurs en dur

---

## 4. Typographie

- **Police :** `system-ui, -apple-system, sans-serif`
- **Titres :** `font-weight: 600` ou `700`
- **Texte secondaire :** `font-size: 0.85rem` à `0.95rem`, `color: var(--color-text-secondary)`
- **Liens :** `color: var(--color-accent)`, soulignement au survol

---

## 5. Espacements et bordures

- **Border-radius :** 6px (petits éléments), 8px (boutons, inputs), 12px (cartes)
- **Padding nav :** 1rem 2rem (desktop), 1rem (mobile)
- **Padding main :** 2rem (desktop), 1rem (mobile)
- **Gap entre éléments :** 0.5rem à 1.5rem selon le contexte

---

## 6. Composants réutilisables

### Boutons

- Fond : `var(--color-accent)` pour les CTA
- Texte : blanc ou `var(--color-text)` selon contraste
- Border-radius : 8px
- Transition : `0.2s ease` sur background, transform
- Hover : `filter: brightness(1.1)` ou `transform: scale(1.02)`

### Cartes (project cards)

- Background : `var(--color-surface)`
- Border : `1px solid var(--color-border)`
- Border-radius : 12px
- Hover : bordure accent, léger scale (1.02), ombre
- Tag catégorie : `font-size: 0.75rem`, `text-transform: uppercase`, `letter-spacing: 0.05em`

### Liens

- Couleur : `var(--color-accent)`
- Hover : `text-decoration: underline`
- Dans les cartes : pas de soulignement par défaut, au survol de la carte

---

## 7. Interactions (hover)

- **Liens / boutons nav :** `transform: scale(1.03)`, `background: var(--color-border)`, `color: var(--color-accent)`
- **Cartes projet :** `transform: scale(1.02)`, `border-color: var(--color-accent)`, `box-shadow`
- **Transitions :** 0.2s à 0.3s pour les changements d’état

---

## 8. Responsive

- **Breakpoint mobile :** `768px` (max-width)
- **Grille projets :** 2 colonnes desktop, 1 colonne mobile
- **Menu mobile :** hamburger, dropdown avec les liens

---

## 9. Projets embarqués (ex. Onitama)

Pour un projet intégré au site (jeu, outil, etc.) :

### Variables dédiées (optionnel)

```css
/* Thème clair */
[data-theme="light"] {
  --project-cell-bg: #f0f0f0;
  --project-surface: #e8e8e8;
  --project-accent: #2563eb;
  --project-accent-rgb: 37, 99, 235;
}

/* Thème sombre */
[data-theme="dark"] {
  --project-cell-bg: #2a2a2a;
  --project-surface: #1f1f1f;
  --project-accent: #3b82f6;
  --project-accent-rgb: 59, 130, 246;
}
```

### Règles

- Utiliser `var(--color-accent)` ou `var(--project-accent)` pour les éléments interactifs
- Éviter les couleurs vives (cyan, vert vif, etc.) — privilégier le bleu accent du site
- Overlay fin de partie : `rgba(0, 0, 0, 0.5)` avec `z-index` élevé pour couvrir tout le contenu
- Boutons : fond accent, texte blanc, border-radius 8px

---

## 10. Checklist avant intégration

- [ ] Toutes les couleurs passent par des variables CSS
- [ ] Support du thème clair et sombre
- [ ] Pas de couleur en dur (sauf noir/blanc pour overlays)
- [ ] Bordures et radius cohérents avec la charte
- [ ] Transitions sur les états hover
- [ ] Test sur mobile (768px)
- [ ] Images/assets dans `public/` ou chemin relatif correct
