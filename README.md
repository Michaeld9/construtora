# Basalto Construtora e Interiores

Landing page em duas guias: **Construtora** (`/`) e **Interiores** (`/interiores`).

Stack: Vite, React 19, Tailwind CSS v4, Motion (`motion/react`), Phosphor Icons e fonte Geist self-hosted.

## Rodar

```bash
npm install
npm run dev
```

Build de produção em `dist/` com `npm run build`.

## Antes de publicar

- **Rota `/interiores`**: o servidor precisa devolver `index.html` para rotas desconhecidas (fallback de SPA), como `try_files` no Nginx ou `_redirects` na Netlify.
- **Fotos**: vêm do Unsplash (`src/lib/images.ts`). Troque pelas fotos reais dos empreendimentos.
- **Dados ilustrativos**: números, depoimentos, preços, endereços, telefones e CNPJ são fictícios (`Stats.tsx`, `Testimonials.tsx`, `Formats.tsx`, `pages/*/index.tsx`, `Footer.tsx`).
- **Formulário**: o envio é simulado em `src/components/ContactSection.tsx`. Conecte ao CRM ou endpoint real no `onSubmit`.

## Estrutura

```
src/
  components/   Nav (abas animadas), Curtain (transição entre guias), ContactSection, Footer, Button, Img, Reveal, Counter
  pages/construtora/  Hero, Stats, Projects (scroll horizontal), Featured, Method, Bento, InteriorsBridge, Testimonials
  pages/interiores/   Hero (colagem com parallax), Marquee, Services, Portfolio (filtro + lightbox), Personalize, Formats, Quote
  lib/          router (pathname + history), images, hooks (tema, media query, pré-preenchimento do formulário)
```

Todas as animações respeitam `prefers-reduced-motion`. Tema claro/escuro segue o sistema, com alternância manual no menu.
