# Brails marketing website

Static website built from the Brails Figma prototype (Figma file *Brails Business Dashboard*, page *Work with AI*). Plain HTML, CSS and JavaScript with no framework, so any static host can serve it.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Cross-border payments | `cross-border-payments.html` |
| Multi-currency wallets | `multi-currency-wallets.html` |
| For SMEs | `smes.html` |
| About us | `about.html` |
| Support | `support.html` |
| Developers | `developers.html` |
| Blog | `blog.html` |
| Cookie policy | `cookie-policy.html` |
| Terms of service | `terms.html` |
| Privacy policy | `privacy.html` |
| Security | `security.html` |

## Editing

Edit the sources in `src/`, not the HTML files in the repo root. The root files are generated.

- `src/pages/*.html`: page content.
- `src/build.mjs`: shared parts (head, nav, footer, ticker, CTA, licences, legal tabs) and the **links** used across the site (`LINKS` at the top: app sign-in/sign-up URL, sales email, API docs URL, social links).
- `src/icons.mjs`: inline SVG icons and flags exported from Figma.
- `assets/css/site.css`: all styles. Design tokens are at the top.
- `assets/js/site.js`: animations and interactions.

Rebuild after editing (Node 18 or later, no dependencies):

```bash
node src/build.mjs
```

## Deploying

The repo root is the site. No build step is needed on the host because the generated HTML is committed.

- **Vercel / Netlify:** import the repo, set the framework to "Other", leave the build command empty and set the output/publish directory to `.` (root). Point the staging site at the `staging` branch.
- **GitHub Pages:** Settings → Pages → deploy from the `staging` branch, root folder.

## Notes

- Fonts: General Sans and Cabinet Grotesk are self-hosted from the Brails design system (`assets/fonts`). Cabinet Grotesk Extrabold, Geist, Geist Mono and Bricolage Grotesque (footer wordmark) load from Fontshare and Google Fonts.
- Animations respect `prefers-reduced-motion`.
- Terms and Privacy pages contain placeholder text until the final legal copy is ready.
