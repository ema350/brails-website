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
| Blog: all articles | `blog-articles.html` |
| Blog posts | `blog-<slug>.html` (one per post) |
| Cookie policy | `cookie-policy.html` |
| Terms of service | `terms.html` |
| Privacy policy | `privacy.html` |
| Security | `security.html` |

## Editing

Edit the sources in `src/`, not the HTML files in the repo root. The root files are generated.

- `src/pages/*.html`: page content.
- `src/build.mjs`: shared parts (head, nav, footer, ticker, CTA, licences, legal tabs) and the **links** used across the site (`LINKS` at the top: app sign-in/sign-up URL, sales email, API docs URL, social links).
- `src/blog-data.mjs`: blog posts (title, category, publish date, cover image and article body). The blog cards, the All articles page and each post page are generated from this file; read time is worked out from the word count. To add a post, add an entry and rebuild.
- `src/icons.mjs`: inline SVG icons and flags exported from Figma.
- `assets/css/site.css`: all styles. Design tokens are at the top.
- `assets/js/site.js`: animations and interactions.

Rebuild after editing (Node 18 or later, no dependencies):

```bash
node src/build.mjs
```

## Deploying

The repo root is the site. Vercel runs `node src/build.mjs` on every push (set in `vercel.json`), so an edit to any file in `src/` reaches the site without rebuilding locally. You can edit copy straight on GitHub: open the file in `src/`, click the pencil icon and commit to `staging`. The staging link updates about a minute later.

Edit the files in `src/`, not the generated `.html` files at the repo root: the build overwrites those.

- **Vercel:** build settings come from `vercel.json` (build command `node src/build.mjs`, output directory `.`). Point the staging site at the `staging` branch.
- **Netlify:** set the build command to `node src/build.mjs` and the publish directory to `.` (root).
- **GitHub Pages:** Settings → Pages → deploy from the `staging` branch, root folder.

## Notes

- Fonts: General Sans and Cabinet Grotesk are self-hosted from the Brails design system (`assets/fonts`). Cabinet Grotesk Extrabold, Geist, Geist Mono and Bricolage Grotesque (footer wordmark) load from Fontshare and Google Fonts.
- Animations respect `prefers-reduced-motion`.
- Terms and Privacy pages contain placeholder text until the final legal copy is ready.
