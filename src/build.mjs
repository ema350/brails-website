// Builds the static site: src/pages/*.html → ./*.html (repo root).
// Run with:  node src/build.mjs
// Directives inside page sources:
//   <!--@head title="…" desc="…"-->   <!--@nav active="products"-->   <!--@footer-->
//   <!--@ticker-->  <!--@cta-->  <!--@setsail-->  <!--@licences-->  <!--@explore exclude="wallets"-->
//   <!--@legaltabs active="terms"-->   <!--@blogfeatured-->  <!--@blogposts-->  <!--@newsletter-->
//   {{icon:name}} / {{icon:name:class}}   {{flag:US}} / {{flag:US:class}}   {{APP}} {{SIGNUP}} {{SALES}} {{DOCS}} {{EMAIL}}
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { icons, flag, countries, token } from './icons.mjs';
import { collections } from './support-data.mjs';
import { posts } from './blog-data.mjs';
import { fx } from './fx-data.mjs';

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
<link rel="stylesheet" href="assets/css/v2.css">
<script>document.documentElement.classList.add('js')</script>
<script src="assets/js/site.js" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>`;

const menuItem = (href, ic, t, d) => `<a class="menu-item" href="${href}" role="menuitem"><span class="menu-ic">${icons[ic]()}</span><span><strong>${t}</strong><small>${d}</small></span></a>`;

const nav = ({ active = '', theme = '' }) => {
  const a = (k) => (active === k ? ' is-active' : '');
  return `<header class="nav${theme ? ` nav-${theme}` : ''}" data-nav>
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
    <div><h3>Company</h3><a href="about.html">About us</a><a href="blog.html">Blog</a><a href="support.html">Support</a><a href="security.html">Security</a></div>
    <div><h3>Legal</h3><a href="terms.html">Terms of service</a><a href="privacy.html">Privacy policy</a><a href="cookie-policy.html">Cookie policy</a></div>
    <div><h3>Follow us</h3><a href="{{X}}">X</a><a href="{{LINKEDIN}}">LinkedIn</a><a href="{{INSTAGRAM}}">Instagram</a><a href="{{EMAIL}}">hello@onbrails.com</a></div>
  </div>
  <div class="footer-mark" aria-hidden="true">
    <div class="footer-rule"><span></span></div>
    <div class="wordmark" data-wave>${'Brails'.split('').map((l, i) => `<span style="--i:${i}">${l}</span>`).join('')}</div>
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

const ctaFlag = (c, x, y, d) => `<span class="cta-flag" style="left:${x}%;top:${y}%;--d:${d}s">${flag(c)}</span>`;
const cta = () => `<section class="section final-cta">
  <div class="container">
    <div class="cta-card" data-reveal>
      <img src="assets/img/cta-podium.webp" alt="" class="cta-bg" loading="lazy">
      <svg class="cta-route" viewBox="-8 -8 808 300" preserveAspectRatio="none" aria-hidden="true"><path id="ctaRoute" d="M 0 0 C 100 328 700 368 792 140" stroke="rgba(255,255,255,.55)" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round" fill="none" vector-effect="non-scaling-stroke"/><circle r="7" fill="#1ac48e" class="cta-dot"><animateMotion dur="4s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".6 0 .4 1"><mpath href="#ctaRoute"/></animateMotion></circle></svg>
      <div class="cta-send" aria-hidden="true"><small>You send</small><div><strong>₦28,140,000.00</strong><span class="cur">${flag('NG', 'xs')}NGN</span></div></div>
      <div class="cta-recv" aria-hidden="true"><div class="cta-payee"><span class="avatar">HP</span><span><b>Harbor &amp; Pine LLC</b><small>Chase Bank · United States</small></span></div><div class="cta-amt"><strong>$18,400.00</strong><span class="cta-done"><i class="dot"></i>Delivered</span></div></div>
      ${ctaFlag('CN', 19.05, 11.2, 0)}${ctaFlag('KE', 79, 10.8, 0.8)}${ctaFlag('UG', 94.4, 43, 1.6)}${ctaFlag('US', 2.6, 56.2, 2.4)}${ctaFlag('NG', 91.3, 86.7, 3.2)}
      ${icons.spark('cta-spark')}
      <div class="cta-copy">
        <h2 class="display-l">Your next international<br>payment <span>starts here.</span></h2>
        <p>Open a Brails account, complete business verification and fund your first wallet.</p>
        <div class="btn-row center"><a class="btn btn-primary" href="{{SIGNUP}}">Create an account</a><a class="btn btn-secondary" href="{{SALES}}">Talk to sales</a></div>
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

const lrow = (c, t, d, tag) => `<div class="lreg" data-reveal>${flag(c, 'md')}<div><h3>${t}</h3><p>${d}</p></div><span>${tag}</span></div>`;
const lcert = (img, t, d) => `<div class="lcert"><img src="assets/img/${img}" alt="${t} certification mark" loading="lazy"><h3>${t}</h3><p>${d}</p></div>`;
const licences = () => `<section class="section section-navy">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div><p class="eyebrow on-dark">Licensed and certified</p><h2 class="h2">Regulated where we operate.</h2></div>
      <p class="lede">Regulated in Nigeria and the United States, and independently certified for security and quality.</p>
    </div>
    <div class="lic2">
      <div><p class="lic2-h">Regulated by</p><div class="lic2-regs" data-stagger>${lrow('NG', 'IMTO licence', 'Central Bank of Nigeria', 'CBN')}${lrow('US', 'MSB registration', 'FinCEN, United States', 'FinCEN')}</div></div>
      <div><p class="lic2-h">Independently certified</p><div class="lic2-certs" data-reveal>${lcert('iso-27001-logo.webp', 'ISO/IEC 27001', 'Information security')}${lcert('iso-9001-logo.webp', 'ISO 9001', 'Quality management')}${lcert('pci-dss-logo.webp', 'PCI DSS', 'Payment security standard')}</div></div>
    </div>
  </div>
</section>`;

const exploreCards = {
  payments: ['cross-border-payments.html', 'laptop-dashboard.webp', 'Cross-border payments', 'Pay suppliers and partners in ten destinations, straight to their local bank account.', 'Explore payments'],
  wallets: ['multi-currency-wallets.html', 'wallet-3d-card.webp', 'Multi-currency wallets', 'Hold USD, EUR, GBP, NGN, USDC and USDT side by side, and swap between them at live rates.', 'Explore wallets'],
  smes: ['smes.html', 'sme-portrait.webp', 'Brails for SMEs', 'Team roles, a full activity log, statements and shareable receipts for growing businesses.', 'Explore SMEs'],
};
const explore = ({ exclude }) => `<section class="section section-grey">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div><p class="eyebrow">More from Brails</p><h2 class="h2 h2-sm">Works even better together.</h2></div>
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
  const tabs = [['terms', 'terms.html', 'Terms of service'], ['privacy', 'privacy.html', 'Privacy policy'], ['cookie', 'cookie-policy.html', 'Cookie policy']];
  return `<div class="container"><nav class="legal-tabs" aria-label="Legal pages">${tabs
    .map(([k, h, t]) => `<a href="${h}"${k === active ? ' aria-current="page" class="is-active"' : ''}>${t}</a>`)
    .join('')}</nav></div>`;
};


// ---- Support ----------------------------------------------------------------------------
const esc = (t) => t.replace(/<[^>]+>/g, '');
const helpcards = () => `<div class="help-grid" data-stagger>${collections
  .map((c) => `<a class="help" href="support-${c.slug}.html"><div class="help-top"><span class="fic tone-${c.tone}">${icons[c.icon]()}</span><span class="go">${icons.arrow()}</span></div><h3>${c.label}</h3><p>${c.blurb}</p><span class="count">${c.qa.length} article${c.qa.length > 1 ? 's' : ''}</span></a>`)
  .join('')}</div>`;
const searchIndex = () => `<script type="application/json" data-index>${JSON.stringify(collections.flatMap((c) => c.qa.map(([q], i) => ({ q, c: c.label, h: `support-${c.slug}.html#q${i + 1}` }))))}</script>`;
const searchbar = (action = '') => `<form class="searchbar" data-search role="search"${action ? ` action="${action}"` : ''}>
      ${icons.search()}
      <label class="sr-only" for="q">Search support</label>
      <input id="q" name="q" type="search" placeholder="Search for answers, e.g. “add a recipient”" autocomplete="off">
      <button class="btn btn-primary" type="submit">Search</button>
      <div class="sresults" data-results hidden></div>
    </form>${searchIndex()}`;
const contact = () => `<section class="section">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div><p class="eyebrow">Get in touch</p><h2 class="h2">Still need a hand?</h2></div>
      <p class="lede">Choose the route that suits you. Signed-in customers get the fastest answers from inside the dashboard.</p>
    </div>
    <div class="contact contact-2" data-stagger>
      <div class="ccard"><img class="cill" src="assets/img/contact-email.webp" alt="" loading="lazy"><h3>Email support</h3><p>Write to us at hello@onbrails.com and our team will get back to you.</p><a class="btn btn-outline" href="{{EMAIL}}">Send an email</a></div>
      <div class="ccard"><img class="cill" src="assets/img/contact-phone.webp" alt="" loading="lazy"><h3>Talk to sales</h3><p>For pricing, higher volumes or a walkthrough of Brails for your business.</p><a class="btn btn-outline" href="{{SALES}}">Talk to sales</a></div>
    </div>
  </div>
</section>`;
const block = (b) => {
  if (typeof b === 'string') return `<p>${b}</p>`;
  if (b.h) return `<h4>${b.h}</h4>`;
  if (b.ol) return `<ol>${b.ol.map((x) => `<li>${x}</li>`).join('')}</ol>`;
  if (b.ul) return `<ul>${b.ul.map((x) => `<li>${x}</li>`).join('')}</ul>`;
  if (b.table) return `<div class="atable"><table><thead><tr>${b.table[0].map((x) => `<th>${x}</th>`).join('')}</tr></thead><tbody>${b.table.slice(1).map((r) => `<tr>${r.map((x) => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  return '';
};
const relHref = (h) => (h.startsWith('../') ? `${h.slice(3)}.html` : `support-${h}.html`);
const collectionPage = (c) => `<!--@head title="${c.label} — Brails Support" desc="${c.sub}"-->
<!--@nav active="company"-->
<section class="shero shero-compact">
  <div class="glow" aria-hidden="true"></div>
  <div class="container">
    <p class="eyebrow">Support</p>
    <h1>Support Centre</h1>
    <p class="lede" style="font-size:18px;max-width:640px">Browse our frequently asked questions and other self-help resources to find the answers you need.</p>
    ${searchbar('support.html')}
  </div>
</section>
<section class="section coll">
  <div class="container coll-grid">
    <aside class="coll-side" aria-label="Collections">
      <h2>All collections</h2>
      <nav>${collections.map((o) => `<a href="support-${o.slug}.html"${o.slug === c.slug ? ' class="is-active" aria-current="page"' : ''}>${o.label}</a>`).join('')}</nav>
    </aside>
    <div class="coll-main">
      <nav class="crumb" aria-label="Breadcrumb"><a href="support.html">All collections</a>${icons.chevron('crumb-chev')}<span>${c.label}</span></nav>
      <header class="coll-head"><span class="fic tone-${c.tone}">${icons[c.icon]()}</span><div><h1>${c.title}</h1><p>${c.sub} <span class="count">${c.qa.length} article${c.qa.length > 1 ? 's' : ''}</span></p></div></header>
      <div class="acc">${c.qa
        .map(([q, a], i) => `<div class="acc-item${i === 0 ? ' is-open' : ''}" id="q${i + 1}"><button class="acc-q" aria-expanded="${i === 0}">${q}${icons.chevronDown('acc-chev')}</button><div class="acc-a"><div><div class="acc-body">${a.map(block).join('')}</div></div></div></div>`)
        .join('')}</div>
      <div class="coll-rel"><h2>Related articles</h2><div class="rel-grid">${c.related
        .map(([t, d, h]) => `<a class="rel" href="${relHref(h)}"><b>${t}</b><p>${d}</p><span class="link">Read article ${icons.arrow()}</span></a>`)
        .join('')}</div></div>
    </div>
  </div>
</section>
<!--@contact-->
<!--@footer-->`;


// ---- Transaction calculator (Cross-border payments + SMEs heroes) -------------------------
const fxMap = Object.fromEntries(fx.map((c) => [c.code, c]));
const fxNum = (n, d) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const fxFmt = (code, n) => fxMap[code].symbol + fxNum(n, fxMap[code].decimals);
const fxRate = (send, recv) => {
  if (send === recv) return 'No conversion';
  const r = fxMap[send].perUSD / fxMap[recv].perUSD;
  return r >= 1 ? `1 ${recv} = ${fxMap[send].symbol}${fxNum(r, 2)}` : `1 ${send} = ${fxMap[recv].symbol}${fxNum(1 / r, 2)}`;
};
let fxCount = 0;
const fxPicker = (uid, side, code) => {
  const label = side === 'send' ? 'Currency you send' : 'Currency they receive';
  return `<div class="fx-pick" data-fx-pick="${side}">
          <button type="button" class="cur fx-cur" aria-haspopup="listbox" aria-expanded="false" aria-controls="${uid}-${side}" aria-label="${label}: ${fxMap[code].name}">${flag(fxMap[code].country, 'sm')}<span data-fx-code>${code}</span>${icons.chevron('fx-chev')}</button>
          <ul class="fx-menu" id="${uid}-${side}" role="listbox" aria-label="${label}" tabindex="-1" hidden>${fx.filter((c) => c[side]).map((c) => `<li role="option" id="${uid}-${side}-${c.code}" data-code="${c.code}" data-name="${c.name}" aria-selected="${c.code === code}">${flag(c.country, 'sm')}<b>${c.code}</b><span>${c.name}</span>${icons.check('fx-tick')}</li>`).join('')}</ul>
        </div>`;
};
const calc = ({ send = 'NGN', amount = '1000000', receive = 'USD', over = '', title = '', sendLabel = 'You send', receiveLabel = 'They receive', cta = 'Get started', cls = 'calc', recvCls = '', btnCls = '', rows = 'cb', reveal = '' }) => {
  const uid = `fx${++fxCount}`, a = Number(amount), out = (a / fxMap[send].perUSD) * fxMap[receive].perUSD;
  const rates = JSON.stringify(Object.fromEntries(fx.map((c) => [c.code, [c.perUSD, c.symbol, c.decimals, c.name]])));
  const field = (side, lbl, code, n, extra) => `<div class="field fx-field${extra ? ' ' + extra : ''}"><small id="${uid}-${side}-l">${lbl}</small><div class="field-row"><input data-fx-in="${side}" inputmode="decimal" autocomplete="off" value="${fxFmt(code, n)}" aria-labelledby="${uid}-${side}-l" aria-describedby="${uid}-${side}-c"><span class="sr-only" id="${uid}-${side}-c">in ${fxMap[code].name}</span>
        ${fxPicker(uid, side, code)}</div></div>`;
  const r = rows === 'sm'
    ? `<div class="rows sm"><div><span>Estimated exchange rate</span><b data-fx-rate>${fxRate(send, receive)}</b></div><div><span>Fees</span><b>Shown before you confirm</b></div><div><span>Delivery</span><b>Tracked to settlement</b></div></div>`
    : `<div class="rows"><div><span>Estimated exchange rate</span><b data-fx-rate>${fxRate(send, receive)}</b></div><div><span>Transfer fee</span><b>Shown before you confirm</b></div><div><span>Estimated arrival</span><b>1–3 business days</b></div></div>`;
  return `<form class="${cls} fx" data-fx data-send="${send}" data-receive="${receive}" data-rates='${rates}' onsubmit="return false"${reveal ? ` data-reveal style="--d:${reveal}"` : ''}>
      ${over ? `<p class="w-over" style="margin-bottom:-4px">${over}</p>` : ''}
      ${title ? `<h3 class="fx-title">${title}</h3>` : ''}
      ${field('send', sendLabel, send, a)}
      ${field('receive', receiveLabel, receive, out, recvCls)}
      ${r}
      <p class="fx-note">Indicative rates. You’ll see the live rate and fee before you confirm.</p>
      <a class="btn btn-primary btn-block${btnCls ? ' ' + btnCls : ''}" href="{{SIGNUP}}">${cta}</a>
    </form>`;
};

// ---- Blog -------------------------------------------------------------------------------
const CATS = { guides: 'Guides', product: 'Product', compliance: 'Compliance' };
const byDate = [...posts].sort((a, b) => b.date.localeCompare(a.date));
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const fmtDate = (iso, long) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${long ? MONTHS[m - 1] : MONTHS[m - 1].slice(0, 3)} ${y}`; };
const fmtDateLong = (iso) => fmtDate(iso, true);
const plain = (b) => (typeof b === 'string' ? b : Object.values(b).flat(2).join(' ')).replace(/<[^>]+>/g, '');
const readTime = (p) => Math.max(2, Math.ceil([p.title, p.excerpt, ...p.body.map(plain)].join(' ').split(/\s+/).length / 200));
const postHref = (p) => `blog-${p.slug}.html`;
const dateTag = (p) => `<time datetime="${p.date}">${fmtDate(p.date)}</time>`;
const slugify = (t) => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const postCard = (p) => `<a class="post" href="${postHref(p)}" data-cat="${p.cat}"><div class="media"><img src="assets/img/${p.img}" alt="" loading="lazy"><span class="cat">${CATS[p.cat]}</span></div><div><p class="post-date">${icons.clock('ic')}${dateTag(p)}</p><h3>${p.title}</h3><p>${p.excerpt}</p><div class="meta"><span>${readTime(p)} min read</span><span class="link">Read ${icons.arrow()}</span></div></div></a>`;

const blogfeatured = () => {
  const p = byDate.find((x) => x.featured) || byDate[0];
  return `<a class="featured" href="${postHref(p)}" data-cat="${p.cat}" data-reveal>
      <div class="media"><img src="assets/img/${p.img}" alt="${p.alt || ''}"></div>
      <div class="txt">
        <div class="lbl"><b>Featured</b> ${CATS[p.cat]}</div>
        <h2>${p.title}</h2>
        <p>${p.excerpt}</p>
        <div class="author"><span class="avatar">B</span><div><b>Brails team</b><small>${dateTag(p)} · ${readTime(p)} min read</small></div></div>
        <span class="link">Read the ${p.cat === 'guides' ? 'guide' : 'article'} ${icons.arrow()}</span>
      </div>
    </a>`;
};

const attr = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const MONTH = (iso) => { const [y, m] = iso.split('-').map(Number); return `${MONTHS[m - 1]} ${y}`; };
const blogarchive = () => {
  const groups = [];
  for (const p of byDate) { const g = MONTH(p.date); if (!groups.length || groups.at(-1).g !== g) groups.push({ g, items: [] }); groups.at(-1).items.push(p); }
  const count = (c) => byDate.filter((p) => c === 'all' || p.cat === c).length;
  const row = (p) => `<a class="arow" href="${postHref(p)}" data-cat="${p.cat}" data-text="${attr([p.title, p.excerpt, CATS[p.cat], ...p.body.map(plain)].join(' ').toLowerCase())}">
          <span class="arow-date">${dateTag(p)}</span>
          <span class="arow-main"><span class="arow-cat">${CATS[p.cat]}</span><span class="arow-title">${p.title}</span><span class="arow-ex">${p.excerpt}</span><span class="arow-meta">${dateTag(p)} · ${readTime(p)} min read</span></span>
          <span class="arow-read">${icons.clock('ic')}${readTime(p)} min read</span>
          <span class="arow-img"><img src="assets/img/${p.img}" alt="" loading="lazy"></span>
        </a>`;
  return `<div class="archive" data-archive>
    <div class="archive-bar" data-reveal>
      <div class="filters" role="group" aria-label="Filter by category">${['all', ...Object.keys(CATS)].map((c, i) => `<button type="button" data-afilter="${c}" aria-pressed="${!i}"${i ? '' : ' class="is-on"'}>${c === 'all' ? 'All' : CATS[c]} <span>${count(c)}</span></button>`).join('')}</div>
      <label class="asearch">${icons.search('ic')}<span class="sr-only">Search articles</span><input type="search" placeholder="Search articles" autocomplete="off" data-asearch></label>
    </div>
    <p class="archive-count" data-acount aria-live="polite">${byDate.length} articles</p>
    ${groups.map((g) => `<section class="agroup" data-agroup data-reveal>
      <h2 class="agroup-h">${g.g} <span>${g.items.length}</span></h2>
      <div class="alist">
        ${g.items.map(row).join('\n        ')}
      </div>
    </section>`).join('\n    ')}
    <div class="aempty" data-aempty hidden>${icons.search('ic')}<b>No articles found</b><p>Try another word, or <button type="button" data-areset>show all articles</button>.</p></div>
  </div>`;
};
const blogposts = () => `<div class="posts" data-stagger>${byDate.filter((p) => !p.featured).map(postCard).join('')}</div>`;

const newsletter = ({ top } = {}) => `<section style="padding-bottom:120px${top ? ';padding-top:120px' : ''}">
  <div class="container">
    <div class="nl2" data-reveal>
      <img class="nl2-photo" src="assets/img/newsletter-photo.webp" alt="" loading="lazy">
      <div class="nl2-copy">
        <p class="eyebrow">The Brails newsletter</p>
        <h2>Get new articles<br><span>by email.</span></h2>
        <p class="nl2-sub">Guides, product news and stories from businesses paying across borders. One email when something new is published.</p>
        <ul class="nl2-topics"><li><i style="background:#0036bb"></i>Product updates</li><li><i style="background:#149e5e"></i>Corridor guides</li><li><i style="background:#ee6002"></i>Customer stories</li></ul>
        <form class="nl-form" data-newsletter>
          <label class="sr-only" for="nl">Email address</label>
          <input id="nl" type="email" placeholder="you@company.com" required autocomplete="email">
          <button class="btn btn-primary" type="submit">Subscribe</button>
        </form>
        <p class="nl2-note">Unsubscribe anytime. We never share your email.</p>
      </div>
      <div class="nl2-toast" aria-hidden="true"><span class="nl2-check">${icons.check()}</span><span><b>You’re subscribed</b><small>Look out for our next article.</small></span></div>
    </div>
  </div>
</section>`;

const pblock = (b) => {
  if (typeof b === 'string') return `<p>${b}</p>`;
  if (b.h) return `<h2 id="${slugify(b.h)}">${b.h}</h2>`;
  if (b.note) return `<aside class="pnote">${icons.sparkles('ic')}<p>${b.note}</p></aside>`;
  return block(b);
};
const postPage = (p) => {
  const heads = p.body.filter((b) => b.h);
  const related = [...byDate.filter((x) => x !== p && x.cat === p.cat), ...byDate.filter((x) => x !== p && x.cat !== p.cat)].slice(0, 3);
  const i = byDate.indexOf(p), newer = byDate[i - 1], older = byDate[i + 1];
  const pn = (x, dir) => (x ? `<a class="pn pn-${dir}" href="${postHref(x)}"><small>${dir === 'prev' ? 'Newer article' : 'Older article'}</small><b>${x.title}</b></a>` : '<span></span>');
  return `<!--@head title="${esc(p.title)} — Brails Blog" desc="${p.excerpt}"-->
<!--@nav active="blog"-->
<div class="rprogress" data-progress aria-hidden="true"><span></span></div>
<article class="post-page">
<div class="container">
  <header class="phead">
    <nav class="crumb" aria-label="Breadcrumb" data-reveal><a href="blog.html">Blog</a>${icons.chevron('crumb-chev')}<a href="blog.html?cat=${p.cat}">${CATS[p.cat]}</a></nav>
    <h1 data-split>${p.title}</h1>
    <p class="lede" data-reveal style="--d:.15s">${p.excerpt}</p>
    <div class="pmeta" data-reveal style="--d:.25s">
      <div class="author"><span class="avatar">B</span><div><b>Brails team</b><small>Published ${`<time datetime="${p.date}">${fmtDateLong(p.date)}</time>`}</small></div></div>
      <span class="pmeta-sep" aria-hidden="true"></span>
      <span class="pmeta-item">${icons.clock('ic')}${readTime(p)} min read</span>
      <span class="pmeta-item"><span class="pcat">${CATS[p.cat]}</span></span>
    </div>
  </header>
  <figure class="pcover" data-reveal style="--d:.3s"><img src="assets/img/${p.img}" alt="${p.alt || ''}"></figure>
  <div class="pbody">
    <aside class="pside">
      ${heads.length > 1 ? `<nav class="toc ptoc" data-ptoc aria-label="On this page"><h2>On this page</h2>${heads.map((h, k) => `<a href="#${slugify(h.h)}"${k === 0 ? ' class="is-active"' : ''}>${h.h}</a>`).join('')}</nav>` : ''}
      <div class="pshare"><p>Share this article</p><div><button type="button" class="pshare-btn" data-copy-url>${icons.copy('ic')}<span>Copy link</span></button><a class="pshare-btn" data-share="linkedin" href="#" target="_blank" rel="noopener">LinkedIn</a><a class="pshare-btn" data-share="x" href="#" target="_blank" rel="noopener">X</a></div></div>
    </aside>
    <div class="prose">
      ${p.body.map(pblock).join('\n      ')}
      <div class="pend">
        <div class="author"><span class="avatar">B</span><div><b>Written by the Brails team</b><small>Questions about this article? Email <a href="{{EMAIL}}">hello@onbrails.com</a></small></div></div>
      </div>
      <nav class="pnav" aria-label="More articles">${pn(newer, 'prev')}${pn(older, 'next')}</nav>
    </div>
  </div>
</div>
</article>
<section class="section section-grey">
  <div class="container">
    <div class="posts-h" data-reveal><h2>Keep reading</h2><a class="link" href="blog-articles.html">All articles ${icons.arrow()}</a></div>
    <div class="posts" data-stagger>${related.map(postCard).join('')}</div>
  </div>
</section>
<!--@newsletter top="1"-->
<!--@footer-->`;
};

const directives = { calc, blogfeatured, blogposts, blogarchive, newsletter, head, nav, footer, ticker, cta, setsail, licences, explore, legaltabs, helpcards, contact, searchindex: searchIndex, searchbar: () => searchbar() };

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
    .replace(/\{\{token:(USDC|USDT)\}\}/g, (m, c) => token(c))
    .replace(/\{\{(\w+)\}\}/g, (m, k) => (k in LINKS ? LINKS[k] : m));
  return out;
}

const pagesDir = join(root, 'src/pages');
for (const f of readdirSync(pagesDir).filter((f) => f.endsWith('.html'))) {
  writeFileSync(join(root, f), render(readFileSync(join(pagesDir, f), 'utf8')));
  console.log('built', f);
}
for (const c of collections) {
  writeFileSync(join(root, `support-${c.slug}.html`), render(collectionPage(c)));
  console.log('built', `support-${c.slug}.html`);
}
for (const p of posts) {
  writeFileSync(join(root, postHref(p)), render(postPage(p)));
  console.log('built', postHref(p));
}
