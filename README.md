# Nata Site (mínim)
Next.js (App Router) + Tailwind + Framer Motion.

## Requisits
- Node.js 18+ (recomanat 20)
- npm o pnpm

## Instal·lació
```bash
cd /d "m:\004_nata\0040_website\website"
npm install
npm run dev
```
Obre http://localhost:3000

## On posar els assets
- Vídeo loader: `public/video/loader.webm` i `public/video/loader.mp4` (muted).
- Hero: `public/img/hero-volcano.jpg`
- Miniatures works: `public/img/work-1.jpg`, `work-2.jpg`, ...
- Logo i icona: `public/svg/logo.svg`, `public/svg/strawberry.svg`

## Estructura
- `app/` -> pàgines (`/`, `/studio`), App Router.
- `components/` -> `LoadingOverlay`, `Nav`.
- `styles/globals.css` -> Tailwind + estil base.
- `public/` -> imatges, vídeos, SVGs.

## Notes
- Per desactivar temporalment el loader, comenta `<LoadingOverlay />` a `app/page.tsx`.
- Ajusta colors a `styles/globals.css`.
- Afegeix més projectes duplicant les targetes al grid o creant `/works`.
