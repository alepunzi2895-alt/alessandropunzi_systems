# AP Systems — Portfolio Landing

Landing page professionale per **Alessandro Punzi / AP Systems**: tech solutions e luxury services.

## Stack

- **Framework**: Next.js (App Router, `'use client'`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS-in-JS inline (`<style>`)
- **Icons**: `lucide-react`
- **Fonts**: Plus Jakarta Sans, JetBrains Mono (Google Fonts)

## Struttura progetto

```
alessandropunzi_systems/
├── portfolio-landing-pro.tsx   # Componente principale (full-page)
├── ap-systems-logo.png         # Logo AP Systems
└── README.md
```

## Componente principale

**`portfolio-landing-pro.tsx`** — `ProfessionalPortfolio` (default export)

### Sezioni

| Sezione | Descrizione |
|---|---|
| **Nav** | Sticky, backdrop blur, logo + link contatti |
| **Hero** | Headline, sottotitolo, CTA doppia (preventivo / servizi) |
| **Services** | 4 card interattive con expand on click |
| **Portfolio** | 3 progetti con stack tags |
| **Contact** | Form preventivo con invio a `/api/send-quote` |
| **Footer** | Copyright |

### State

```ts
selectedService: string | null   // card service espansa
formData: { name, email, service, budget, message }
submitted: boolean               // feedback post-invio form
```

### Form — endpoint atteso

```
POST /api/send-quote
Content-Type: application/json
Body: { name, email, service, budget, message }
```

## Servizi offerti

1. **Web Development** — React, Next.js, full-stack, SEO, e-commerce, SaaS
2. **Sistemi IA & Agenti** — agenti autonomi, chatbot, automazione, API integration
3. **Social Media & Canva** — Instagram management, contenuti Canva, growth strategy
4. **Concierge Luxury** — eventi, prenotazioni luxury, VIP experiences Ibiza

## Portfolio projects

| Progetto | Stack | Descrizione |
|---|---|---|
| **LuXy Experience** | React, Node.js, Claude API, Stripe, PostgreSQL | Concierge luxury con booking IA-powered |
| **VMScout** | React, Anthropic API, Canva API, Vercel | Visual Marketing Scout con design automatici |
| **TradeFlow AI** | Python, MT5, Turso DB, AI Agents, ML Models | Bot trading autonomo multi-strategia |

## Design system

| Token | Valore |
|---|---|
| Background | `#000000` |
| Accent principale | `#22c55e` (green-500) |
| Accent hover | `#16a34a` (green-600) |
| Testo primario | `#ffffff` |
| Testo secondario | `#d1d5db` (gray-300) |
| Border default | `rgba(34, 197, 94, 0.2)` |
| Border hover | `rgba(34, 197, 94, 0.5–1)` |

### Animazioni

- `fade-in` — `opacity 0→1` + `translateY 10px→0` in 0.6s
- `hover-lift` — `translateY(-4px)` on hover
- `border-glow` — box-shadow verde on hover
- `transition: all 0.3s ease` globale

## Setup & integrazione Next.js

1. Copiare il file nella directory `app/` o `components/` del progetto Next.js
2. Rinominare o importare come `page.tsx` nella route desiderata
3. Creare l'API route `app/api/send-quote/route.ts` per gestire il form
4. Aggiungere `ap-systems-logo.png` nella cartella `public/`
5. Installare dipendenze:

```bash
npm install lucide-react
```

## Note

- Il logo viene servito da `public/ap-systems-logo.png` (path `/ap-systems-logo.png`)
- I font Google vengono importati via `@import` inline nello `<style>` — in produzione preferire `next/font`
- La transizione globale `* { transition: all 0.3s ease }` è intenzionale per semplicità ma può impattare performance su elementi non-interattivi
