# Eneon ES — Website

Marketing site for **Eneon ES**, a Calgary-based Battery Energy Storage System (BESS) company. Built from scratch as a full redesign of the existing eneon-es.com site.

## Tech stack

- **Framework** — Next.js 16 (App Router) with Turbopack
- **Language** — TypeScript
- **UI** — React 19
- **Styling** — Tailwind CSS v4 (`@theme` token block) + custom design tokens
- **Typography** — Inter Tight + JetBrains Mono (via `next/font/google`)
- **Icons** — `lucide-react` (locked to stroke width 1.25 via `Icon` atom)
- **Forms** — HTML-first with `zod` validation and Next.js server actions
- **Utilities** — `clsx` + `tailwind-merge` via `cn()` helper

Design system uses a navy/accent/paper color ramp, 0px border radius, 1px hairline borders, an 11-step type scale, and a signature blueprint-grid background used on hero sections.

## Local setup

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Then open http://localhost:3000.

```bash
# production build
npm run build
npm start

# lint
npm run lint
```

Node 20+ recommended.

## Project structure

```
app/                     Next.js App Router pages + route handlers
  about/                 Company story
  accessibility/         WCAG 2.2 AA statement
  careers/               Open roles + culture
  connect/               Eneon Connect software platform
  contact/               Contact form + HQ info
  insights/              Knowledge Hub (index + [slug])
  privacy/               Privacy policy
  product/               Flagship BESS product
  projects/              Project index + case study [slug]
  quote/                 Request a Quote form
  sizing-tool/           Sizing tool landing (in development)
  solutions/             Solutions index + 4 verticals [slug]
  team/                  Leadership
  terms/                 Terms of use
  actions/               Server actions (form submissions)
  error.tsx              Client error boundary
  not-found.tsx          404 page
  layout.tsx             Root layout + metadata
  sitemap.ts             Dynamic sitemap.xml
  robots.ts              robots.txt

components/
  atoms/                 Button, Icon, Tag, EyebrowLabel, StatDigit, CertBadge, etc.
  blocks/                SplitFeature, FeatureGrid, StatBlock, CalloutBlock, CTABlock,
                         SpecTable, Timeline, TeamCard, LogoStrip, ProjectCard, Breadcrumbs
  layout/                PageShell, Section, Container, SectionHeader, SiteNav, MobileMenu, Footer
  forms/                 ContactForm, QuoteForm, primitives
  media/                 Image, Video, HeroMedia
  feedback/              Form field feedback states
  seo/                   JsonLd component + schema.org builders

content/                 Typed TypeScript data layer
  home.ts, product.ts, solutions.ts, projects.ts,
  insights.ts, team.ts, careers.ts, company.ts,
  timeline.ts, partners.ts, certifications.ts

lib/
  cn.ts                  clsx + tailwind-merge
  nav.ts                 Site navigation map
  validation.ts          Shared zod schemas
```

## Pages

| Route                         | Description |
|-------------------------------|-------------|
| `/`                           | Home — hero, stats, intro, solutions, product, Connect, projects, callout, CTA |
| `/product`                    | Flagship BESS product — specs, pillars, certs, Connect teaser |
| `/connect`                    | Eneon Connect software platform — telemetry, modules, integrations |
| `/solutions`                  | Solutions index (4 verticals) |
| `/solutions/[slug]`           | Microgrids, utility, commercial, solar+storage (SSG) |
| `/projects`                   | Projects index with stats |
| `/projects/[slug]`            | Case study template (SSG) |
| `/about`                      | Company story, timeline, partners, HQ |
| `/team`                       | Leadership |
| `/insights`                   | Knowledge Hub index |
| `/insights/[slug]`            | Insight / whitepaper / case study detail (SSG) |
| `/careers`                    | Culture + open positions |
| `/contact`                    | Contact form + HQ info |
| `/quote`                      | Request a Quote form |
| `/sizing-tool`                | Sizing tool landing (in development) |
| `/privacy`, `/terms`, `/accessibility` | Legal pages |
| `/sitemap.xml`, `/robots.txt` | SEO infrastructure |

## Branching

- **`main`** — production-ready only. Only merge from `dev` after the QA checklist passes.
- **`dev`** — active development branch. All commits land here first.

## Research

Phase 1–5 research, audit, competitor analysis, design system, and build plan live in `/research/` at the project root (one level above this Next.js app), and are excluded from the deployed build. Brand assets live in `/brand_assets/` and are also excluded.
