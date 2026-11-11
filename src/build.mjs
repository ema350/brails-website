// Builds the static site: src/pages/*.html → ./*.html (repo root).
// Run with:  node src/build.mjs
// Directives inside page sources:
//   <!--@head title="…" desc="…"-->   <!--@nav active="products"-->   <!--@footer-->
//   <!--@ticker-->  <!--@cta-->  <!--@setsail-->  <!--@licences-->  <!--@explore exclude="wallets"-->
//   <!--@legaltabs active="terms"-->
//   {{icon:name}} / {{icon:name:class}}   {{flag:US}} / {{flag:US:class}}   {{APP}} {{SIGNUP}} {{SALES}} {{DOCS}} {{EMAIL}}
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { icons, flag, countries } from './icons.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---- Links: change these in one place -------------------------------------------------
export const LINKS = {
  APP: 'https://app.onbrails.com',          // Sign in
  SIGNUP: 'https://app.onbrails.com',       // Get started / Create an account
  SALES: 'mailto:hello@onbrails.com?subject=Talk%20to%20sales',
  EMAIL: 'mailto:hello@onbrails.com',
  DOCS: '#',                                 // API docs URL (to confirm)
  X: '#', LINKEDIN: '#', INSTAGRAM: '#',
};

const attrs = (s = '') => Object.fromEntries([...s.matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));

const head = ({ title = 'Brails', desc = '' }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#0036BB">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="assets/img/lagos.jpg">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@96,700&family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&display=swap">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800&display=swap">
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.classList.add('js')</script>
<script src="assets/js/site.js" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>`;

const menuItem = (href, ic, t, d) => `<a class="menu-item" href="${href}" role="menuitem"><span class="menu-ic">${icons[ic]()}</span><span><strong>${t}</strong><small>${d}</small></span></a>`;

const nav = ({ active = '' }) => {
  const a = (k) => (active === k ? ' is-active' : '');
  return `<header class="nav" data-nav>
  <div class="nav-inner">
    <a class="nav-logo" href="index.html" aria-label="Brails home">${icons.logo()}</a>
    <nav class="nav-links" aria-label="Main">
      <div class="dd${a('products')}" data-dd>
        <button class="nav-link dd-btn" aria-expanded="false" aria-haspopup="true">Products ${icons.chevron('dd-chev')}</button>
        <div class="dd-menu" role="menu">
          ${menuItem('cross-border-payments.html', 'send', 'Cross-border payments', 'Pay suppliers in ten destinations')}
          ${menuItem('multi-currency-wallets.html', 'wallet', 'Multi-currency wallets', 'Hold and swap six currencies')}
          ${menuItem('smes.html', 'building', 'For SMEs', 'Pay overseas suppliers simply')}
        </div>
      </div>
      <a class="nav-link${a('smes')}" href="smes.html">SMEs</a>
      <a class="nav-link${a('developers')}" href="developers.html">Developers</a>
      <div class="dd${a('company')}" data-dd>
        <button class="nav-link dd-btn" aria-expanded="false" aria-haspopup="true">Company ${icons.chevron('dd-chev')}</button>
        <div class="dd-menu" role="menu">
          ${menuItem('about.html', 'person', 'About us', 'Who we are and what we hold to')}
          ${menuItem('support.html', 'help', 'Support', 'Guides, answers and contact')}
        </div>
      </div>
      <a class="nav-link${a('blog')}" href="blog.html">Blog</a>
    </nav>
    <div class="nav-cta">
      <a class="btn btn-outline" href="{{APP}}">Sign in</a>
      <a class="btn btn-primary" href="{{SIGNUP}}">Get started</a>
    </div>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" data-nav-toggle>${icons.menu('i-open')}${icons.close('i-close')}</button>
  </div>
  <div class="mnav" data-mnav>
    <p class="mnav-h">Products</p>
    <a href="cross-border-payments.html">Cross-border payments</a>
    <a href="multi-currency-wallets.html">Multi-currency wallets</a>
    <a href="smes.html">For SMEs</a>
    <p class="mnav-h">Company</p>
    <a href="developers.html">Developers</a>
    <a href="about.html">About us</a>
    <a href="support.html">Support</a>
    <a href="blog.html">Blog</a>
    <div class="mnav-cta"><a class="btn btn-outline" href="{{APP}}">Sign in</a><a class="btn btn-primary" href="{{SIGNUP}}">Get started</a></div>
  </div>
</header>
<main id="main">`;
};

const footer = () => `</main>
<footer class="footer">
  <div class="footer-cols container">
    <div><h3>Products</h3><a href="cross-border-payments.html">Cross-border payments</a><a href="multi-currency-wallets.html">Multi-currency wallets</a><a href="smes.html">SMEs</a></div>
    <div><h3>Company</h3><a href="about.html">About us</a><a href="blog.html">Blog</a><a href="support.html">Support</a></div>
    <div><h3>Legal</h3><a href="terms.html">Terms of service</a><a href="privacy.html">Privacy policy</a><a href="cookie-policy.html">Cookie policy</a><a href="security.html">Security</a></div>
    <div><h3>Follow us</h3><a href="{{X}}">X</a><a href="{{LINKEDIN}}">LinkedIn</a><a href="{{INSTAGRAM}}">Instagram</a><a href="{{EMAIL}}">hello@onbrails.com</a></div>
  </div>
  <div class="footer-mark" aria-hidden="true">
    <div class="footer-rule"><span></span></div>
    <div class="wordmark">${'Brails'.split('').map((l, i) => `<span style="--i:${i}">${l}</span>`).join('')}</div>
  </div>
  <div class="footer-legal container">
    <p>© <span data-year>2026</span> Brails. All rights reserved.</p>
    <p>Brails holds an International Money Transfer Operator (IMTO) licence from the Central Bank of Nigeria and is registered with FinCEN as a Money Services Business. ISO/IEC 27001 and ISO 9001 certified. PCI DSS compliant.</p>
  </div>
</footer>
</body>
</html>`;

const tickerItems = () => countries.map(([c, n]) => `<li>${flag(c)}<span>${n}</span>${icons.spark('tick-spark')}</li>`).join('');
const ticker = () => `<section class="ticker" aria-label="Destinations: ${countries.map((c) => c[1]).join(', ')}">
  <div class="ticker-track"><ul>${tickerItems()}</ul><ul aria-hidden="true">${tickerItems()}</ul></div>
</section>`;

const cta = () => `<section class="section final-cta">
  <div class="container">
    <div class="cta-card" data-reveal>
      <img src="assets/img/podium.jpg" alt="" class="cta-bg" loading="lazy">
      ${icons.spark('cta-spark')}
      <div class="cta-copy">
        <h2 class="display-l">Your next international<br>payment starts here.</h2>
        <p>Open a Brails account, complete business verification and fund your first wallet.</p>
        <div class="btn-row center"><a class="btn btn-outline" href="{{SIGNUP}}">Create an account</a><a class="btn btn-secondary" href="{{SALES}}">Talk to sales</a></div>
      </div>
    </div>
  </div>
</section>`;

const waves = `<svg class="waves" viewBox="0 0 1600 420" preserveAspectRatio="none" aria-hidden="true">${[0, 1, 2, 3, 4, 5]
  .map((i) => `<path d="M-120 ${150 + i * 40} C 200 ${90 + i * 40}, 500 ${210 + i * 40}, 800 ${150 + i * 40} S 1400 ${90 + i * 40}, 1720 ${150 + i * 40}" stroke="rgba(255,255,255,${0.06 + i * 0.012})" stroke-width="2" fill="none"/>`)
  .join('')}</svg>`;

const setsail = () => `<section class="section setsail-wrap">
  <div class="container">
    <div class="setsail" data-reveal>
      ${waves}
      <h2>Set sail for global success with Brails.</h2>
      <p>Create an account to unlock access to seamless payment services.</p>
      <a class="btn btn-outline" href="{{SIGNUP}}">Create account</a>
    </div>
  </div>
</section>`;

const licence = (badge, t, d) => `<div class="licence" data-reveal><div class="licence-badge">${badge}</div><h3>${t}</h3><p>${d}</p></div>`;
const licences = () => `<section class="section section-navy">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div><p class="eyebrow on-dark">Licensed and certified</p><h2 class="h2">Regulated where we operate.</h2></div>
      <p class="lede">Regulated in Nigeria and the United States, and independently certified for security and quality.</p>
    </div>
    <div class="licences" data-stagger>
      ${licence(icons.governance(), 'IMTO licence', 'Central Bank of Nigeria')}
      ${licence(icons.shield32(), 'MSB registration', 'FinCEN, United States')}
      ${licence('<img src="assets/img/iso-27001.jpg" alt="ISO/IEC 27001 certification mark" loading="lazy">', 'ISO/IEC 27001', 'Information security')}
      ${licence('<img src="assets/img/iso-9001.jpg" alt="ISO 9001 certification mark" loading="lazy">', 'ISO 9001', 'Quality management')}
      ${licence('<img src="assets/img/pci-dss.jpg" alt="PCI DSS compliant mark" loading="lazy">', 'PCI DSS', 'Payment security standard')}
    </div>
  </div>
</section>`;

const exploreCards = {
  payments: ['cross-border-payments.html', 'container.jpg', 'Cross-border payments', 'Pay suppliers and partners in ten destinations, straight to their local bank account.', 'Explore payments'],
  wallets: ['multi-currency-wallets.html', 'beads.jpg', 'Multi-currency wallets', 'Hold USD, EUR, GBP, NGN, USDC and USDT side by side, and swap between them at live rates.', 'Explore wallets'],
  smes: ['smes.html', 'portrait-laptop.jpg', 'Brails for SMEs', 'Team roles, a full activity log, statements and shareable receipts for growing businesses.', 'Explore SMEs'],
};
const explore = ({ exclude }) => `<section class="section section-grey">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div><p class="eyebrow">More from Brails</p><h2 class="h2 h2-sm">Works even better together.</h2></div>
      <a class="link" href="index.html#products">All products ${icons.arrow()}</a>
    </div>
    <div class="explore" data-stagger>
      ${Object.entries(exploreCards)
        .filter(([k]) => k !== exclude)
        .map(([, [href, img, t, d, l]]) => `<a class="explore-card" href="${href}" data-reveal><div class="explore-img"><img src="assets/img/${img}" alt="" loading="lazy"></div><div><h3>${t}</h3><p>${d}</p><span class="link">${l} ${icons.arrow()}</span></div></a>`)
        .join('')}
    </div>
  </div>
</section>`;

const legaltabs = ({ active }) => {
  const tabs = [['terms', 'terms.html', 'Terms of service'], ['privacy', 'privacy.html', 'Privacy policy'], ['cookie', 'cookie-policy.html', 'Cookie policy'], ['security', 'security.html', 'Security']];
  return `<div class="container"><nav class="legal-tabs" aria-label="Legal pages">${tabs
    .map(([k, h, t]) => `<a href="${h}"${k === active ? ' aria-current="page" class="is-active"' : ''}>${t}</a>`)
    .join('')}</nav></div>`;
};

const directives = { head, nav, footer, ticker, cta, setsail, licences, explore, legaltabs };

function render(src) {
  let out = src.replace(/<!--@(\w+)([^>]*?)-->/g, (m, name, a) => {
    const fn = directives[name];
    if (!fn) throw new Error('Unknown directive ' + name);
    return fn(attrs(a));
  });
  out = out
    .replace(/\{\{icon:(\w+)(?::([\w -]+))?\}\}/g, (m, n, c) => {
      if (!icons[n]) throw new Error('Unknown icon ' + n);
      return icons[n](c);
    })
    .replace(/\{\{flag:([A-Z]{2})(?::([\w -]+))?\}\}/g, (m, c, cls) => flag(c, cls))
    .replace(/\{\{(\w+)\}\}/g, (m, k) => (k in LINKS ? LINKS[k] : m));
  return out;
}

const pagesDir = join(root, 'src/pages');
for (const f of readdirSync(pagesDir).filter((f) => f.endsWith('.html'))) {
  writeFileSync(join(root, f), render(readFileSync(join(pagesDir, f), 'utf8')));
  console.log('built', f);
}
