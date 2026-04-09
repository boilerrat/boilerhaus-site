# Boilerhaus Website

The public-facing website for [boilerhaus.org](https://boilerhaus.org).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4, [@boilerhaus-ui/boilerhaus-ui](https://github.com/BoilerHAUS/boilerhaus-ui) design system tokens
- **Typography:** Barlow Condensed (display), DM Sans (body) — self-hosted via `next/font`
- **Deployment:** Docker

## Project Structure

```text
src/
  app/
    layout.tsx              ← root layout (fonts, metadata)
    page.tsx                ← landing page
    globals.css             ← design tokens, layout, component styles
    legal/
      page.tsx              ← legal index + privacy/legal notice
      privacy/
        page.tsx            ← privacy policy
```

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run start    # serve production build
```

## Legal Pages

- [Privacy Policy](https://boilerhaus.org/legal/privacy)
- [Legal Notice](https://boilerhaus.org/legal)

## Ownership

See [docs/WEBSITE-OWNERSHIP.md](docs/WEBSITE-OWNERSHIP.md) for domain, hosting, and access details.
