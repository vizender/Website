# Charte graphique — Personal Website

## 1. Palette de couleurs

| Rôle | Thème clair | Thème sombre |
|-----|-------------|--------------|
| Fond | `#ffffff` | `#0f0f0f` |
| Surface | `#f5f5f5` | `#1a1a1a` |
| Bordure | `#e0e0e0` | `#2a2a2a` |
| Texte principal | `#111` | `#f5f5f5` |
| Texte secondaire | `#555` | `#999` |
| Accent | `#2563eb` | `#3b82f6` |

**Règle :** Blanc, gris et noir pour la structure ; les couleurs uniquement pour les boutons, liens, surlignages et éléments décoratifs.

## 2. Thème clair / sombre

- Variables CSS (custom properties) pour toutes les couleurs dépendantes du thème
- Interrupteur dans la barre de navigation
- Préférence persistée dans `localStorage`
- Attribut sur `html` : `data-theme="light"` ou `data-theme="dark"`

## 3. Page d'accueil

- Section « Featured Projects »
- Cartes de projets en grille responsive (2 colonnes desktop, 1 mobile)
- Chaque carte : aperçu visuel, tag catégorie, titre, description courte, lien « View project »
- Cartes : fond clair, coins arrondis, bordure discrète (accent au survol)
- Fond de page sombre ; les cartes ressortent en surfaces claires

## 4. Navigation

- Barre supérieure : Home, About, CV, Blog, Projects
- Pas de liens dupliqués sur la page d'accueil
- Interrupteur de thème dans la nav

## 5. CV

- PDF français : `/cv/CV-2025.pdf`
- Page CV : lien de téléchargement ou ouverture dans un nouvel onglet

## 6. Thème Onitama

- Remplacer le cyan (`#4fc3f7`) par l'accent bleu du site
- **Thème clair :** cellules `#f0f0f0`, bordures `#ddd`, accent `#2563eb`
- **Thème sombre :** cellules `#2a2a2a`, bordures `#444`, accent `#3b82f6`
- Mouvements valides / sélection : couleur accent
- Boutons : fond accent, texte sombre
