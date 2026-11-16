/* Brails marketing site — interactions & motion. No dependencies. */
(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Run a callback the first time an element scrolls into view (and optionally track visibility).
  const onView = (el, cb, opts = {}) => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (opts.track) cb(e.isIntersecting, e);
        else if (e.isIntersecting) { cb(e); io.unobserve(e.target); }
      });
    }, { threshold: opts.threshold ?? 0.2, rootMargin: opts.margin ?? '0px 0px -8% 0px' });
    io.observe(el);
  };

  // Loop helper: runs fn(i) every `ms` while the element is visible.
  const loopWhileVisible = (el, n, ms, fn) => {
    let i = 0, timer = null;
    const tick = () => { fn(i); i = (i + 1) % n; };
    onView(el, (vis) => {
      if (vis && !timer) { tick(); timer = setInterval(tick, ms); }
      else if (!vis && timer) { clearInterval(timer); timer = null; }
    }, { track: true, threshold: 0.25 });
  };

  /* ---------- Year ---------- */
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Nav ---------- */
  const nav = $('[data-nav]');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const dds = $$('[data-dd]', nav);
    const close = (except) => dds.forEach((d) => { if (d !== except) { d.classList.remove('is-open'); $('.dd-btn', d).setAttribute('aria-expanded', 'false'); } });
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    dds.forEach((dd) => {
      const btn = $('.dd-btn', dd);
      let t;
      const open = () => { clearTimeout(t); close(dd); dd.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
      const shut = () => { t = setTimeout(() => { dd.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 120); };
      if (fine) { dd.addEventListener('mouseenter', open); dd.addEventListener('mouseleave', shut); }
      btn.addEventListener('click', (e) => { e.stopPropagation(); dd.classList.contains('is-open') ? (dd.classList.remove('is-open'), btn.setAttribute('aria-expanded', 'false')) : open(); });
      dd.addEventListener('keydown', (e) => {
        const items = $$('.menu-item', dd);
        const idx = items.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); if (!dd.classList.contains('is-open')) open(); items[(idx + 1) % items.length].focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
        if (e.key === 'Escape') { close(); btn.focus(); }
      });
      dd.addEventListener('focusout', (e) => { if (!dd.contains(e.relatedTarget)) { dd.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
    });
    document.addEventListener('click', () => close());

    const tog = $('[data-nav-toggle]', nav);
    tog?.addEventListener('click', () => {
      const on = nav.classList.toggle('is-menu');
      tog.setAttribute('aria-expanded', String(on));
      tog.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
      document.body.style.overflow = on ? 'hidden' : '';
    });
    $$('.mnav a', nav).forEach((a) => a.addEventListener('click', () => { nav.classList.remove('is-menu'); document.body.style.overflow = ''; }));
  }

  /* ---------- Split headings into lines that slide up ---------- */
  $$('[data-split]').forEach((h) => {
    const parts = h.innerHTML.split(/<br\s*\/?>/i);
    h.innerHTML = parts.map((p, i) => `<span class="split-line"><span style="--d:${(i * 0.09 + (parseFloat(h.dataset.split) || 0)).toFixed(2)}s">${p.trim()}</span></span>`).join('');
    h.setAttribute('data-reveal', '');
    h.style.opacity = 1;
  });

  /* ---------- Reveal on scroll ---------- */
  $$('[data-stagger]').forEach((g) => {
    [...g.children].forEach((c, i) => { if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', ''); c.style.setProperty('--d', `${(i * 0.08).toFixed(2)}s`); });
  });
  const revealEls = $$('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) revealEls.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up numbers ---------- */
  $$('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = pre + target.toLocaleString() + suf; return; }
    el.textContent = pre + '0' + suf;
    onView(el, () => {
      const t0 = performance.now(), dur = 1600;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur), v = target * (1 - Math.pow(1 - p, 3));
        el.textContent = pre + Math.round(v).toLocaleString() + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
  });

  /* ---------- How it works: stops + cards light up in sequence ---------- */
  $$('[data-how]').forEach((sec) => {
    const stops = $$('.stop', sec), steps = $$('.step', sec);
    onView(sec, (vis) => sec.classList.toggle('is-running', vis && !reduce), { track: true, threshold: 0.3 });
    if (reduce) return;
    loopWhileVisible(sec, 4, 2000, (i) => {
      stops.forEach((s, j) => s.classList.toggle('is-on', j === i));
      steps.forEach((s, j) => s.classList.toggle('is-on', j === i));
    });
  });

  /* ---------- Generic sequencers ---------- */
  // Items light up one after another, hold, then reset (timelines, logs, feeds).
  const sequence = (root, sel, cls, { gap = 900, hold = 3000, loop = true } = {}) => {
    const items = $$(sel, root);
    if (!items.length) return;
    if (reduce) { items.forEach((i) => i.classList.add(cls)); return; }
    let running = false, visible = false;
    const run = async () => {
      if (running) return; running = true;
      do {
        items.forEach((i) => i.classList.remove(cls, 'is-new'));
        await wait(400);
        for (const it of items) { it.classList.add(cls, 'is-new'); await wait(gap); it.classList.remove('is-new'); }
        await wait(hold);
      } while (loop && visible);
      running = false;
    };
    onView(root, (vis) => { visible = vis; if (vis) run(); }, { track: true, threshold: 0.3 });
  };
  $$('[data-feed]').forEach((f) => sequence(f, '.evt', 'is-in', { gap: 700, hold: 3500 }));
  $$('[data-timeline]').forEach((t) => {
    sequence(t, 'li', 'is-on', { gap: 900, hold: 3500 });
  });
  $$('[data-log]').forEach((l) => sequence(l, '.log', 'is-in', { gap: 650, hold: 4000 }));

  // Highlight one item at a time (recipients, currencies).
  $$('[data-cycle]').forEach((root) => {
    const items = $$(root.dataset.cycle, root);
    if (reduce || items.length < 2) return;
    loopWhileVisible(root, items.length, +(root.dataset.ms || 2200), (i) => items.forEach((it, j) => it.classList.toggle('is-on', j === i)));
  });

  // Toasts that pop in once the panel is visible, then repeat.
  $$('[data-toast]').forEach((t) => {
    if (reduce) { t.classList.add('is-on'); return; }
    loopWhileVisible(t.parentElement, 2, 3200, (i) => t.classList.toggle('is-on', i === 0));
  });

  /* ---------- Review screen: highlight fee, rate, arrival ---------- */
  $$('[data-review]').forEach((wrap) => {
    const rows = $$('[data-hl]', wrap);
    const callouts = $$('.callout', wrap);
    const place = () => callouts.forEach((c) => {
      const row = rows.find((r) => r.dataset.hl === c.dataset.for);
      if (row) c.style.top = `${row.offsetTop + row.offsetParent.offsetTop + row.offsetHeight / 2 - c.offsetHeight / 2}px`;
    });
    place();
    window.addEventListener('resize', place);
    if (reduce) { rows.forEach((r) => r.classList.add('is-hl')); callouts.forEach((c) => c.classList.add('is-on')); return; }
    loopWhileVisible(wrap, rows.length + 1, 1800, (i) => {
      place();
      rows.forEach((r, j) => r.classList.toggle('is-hl', j < i));
      callouts.forEach((c, j) => c.classList.toggle('is-on', j < i));
    });
  });

  /* ---------- Code typing ---------- */
  const typeInto = async (el, html, speed = 14) => {
    // Types the plain text then swaps in highlighted HTML.
    const tmp = document.createElement('div'); tmp.innerHTML = html; const text = tmp.textContent;
    el.textContent = '';
    const caret = document.createElement('span'); caret.className = 'caret';
    for (let i = 0; i < text.length; i++) {
      el.textContent = text.slice(0, i + 1); el.appendChild(caret);
      await wait(text[i] === '\n' ? speed * 6 : speed);
    }
    el.innerHTML = html; el.appendChild(caret);
  };
  $$('[data-type]').forEach((win) => {
    const body = $('.code-body', win);
    const tabs = $$('[data-lang]', win);
    const sources = Object.fromEntries($$('template[data-src]', win).map((t) => [t.dataset.src, t.innerHTML.trim()]));
    const toast = $('.webhook-toast', win.parentElement);
    let current = Object.keys(sources)[0], busy = false;
    const show = async (lang, animate) => {
      current = lang;
      tabs.forEach((t) => t.classList.toggle('is-on', t.dataset.lang === lang));
      if (!animate || reduce) { body.innerHTML = sources[lang]; return; }
      busy = true; toast?.classList.remove('is-on');
      await typeInto(body, sources[lang]);
      busy = false;
      if (toast) { await wait(500); toast.classList.add('is-on'); }
    };
    body.innerHTML = sources[current];
    onView(win, () => show(current, true), { threshold: 0.4 });
    tabs.forEach((t) => t.addEventListener('click', () => { if (!busy) show(t.dataset.lang, true); }));
  });

  /* ---------- FAQ accordion ---------- */
  $$('.faq-item').forEach((item) => {
    const q = $('.faq-q', item);
    q.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      $$('.faq-item', item.parentElement).forEach((o) => { o.classList.remove('is-open'); $('.faq-q', o).setAttribute('aria-expanded', 'false'); });
      item.classList.toggle('is-open', open);
      q.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------- Copy buttons ---------- */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); } catch (e) { /* ignore */ }
    b.classList.add('is-copied'); setTimeout(() => b.classList.remove('is-copied'), 1400);
  }));

  /* ---------- Blog filters ---------- */
  const filters = $('[data-filters]');
  if (filters) {
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', filters).forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      const f = b.dataset.filter;
      $$('[data-cat]').forEach((p) => p.classList.toggle('is-hidden', f !== 'all' && p.dataset.cat !== f));
    });
  }

  /* ---------- Support search (across every collection) ---------- */
  $$('[data-search]').forEach((form) => {
    const idx = form.nextElementSibling?.matches('[data-index]') ? JSON.parse(form.nextElementSibling.textContent) : JSON.parse($('[data-index]')?.textContent || '[]');
    const input = $('input', form), box = $('[data-results]', form);
    let hits = [];
    const run = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { box.hidden = true; return; }
      const words = q.split(/\s+/);
      hits = idx.filter((r) => words.every((w) => (r.q + ' ' + r.c).toLowerCase().includes(w))).slice(0, 6);
      box.innerHTML = hits.length ? hits.map((r) => `<a href="${r.h}"><b>${r.q}</b><small>${r.c}</small></a>`).join('') : `<p>No answers match that yet. <a href="mailto:hello@onbrails.com">Email our team</a></p>`;
      box.hidden = false;
    };
    input.addEventListener('input', run);
    input.addEventListener('focus', run);
    document.addEventListener('click', (e) => { if (!form.contains(e.target)) box.hidden = true; });
    form.addEventListener('submit', (e) => { e.preventDefault(); run(); if (hits[0]) location.href = hits[0].h; });
    const q0 = new URLSearchParams(location.search).get('q');
    if (q0 && !form.getAttribute('action')) { input.value = q0; run(); }
  });

  /* ---------- Support collection accordion ---------- */
  $$('.acc-item').forEach((item) => {
    const q = $('.acc-q', item);
    q.addEventListener('click', () => { const open = !item.classList.contains('is-open'); item.classList.toggle('is-open', open); q.setAttribute('aria-expanded', String(open)); });
  });
  const openHash = () => { const t = location.hash && document.getElementById(location.hash.slice(1)); if (t?.classList.contains('acc-item')) { t.classList.add('is-open'); $('.acc-q', t).setAttribute('aria-expanded', 'true'); setTimeout(() => t.scrollIntoView({ block: 'center' }), 50); } };
  openHash(); window.addEventListener('hashchange', openHash);

  /* ---------- Newsletter ---------- */
  $$('[data-newsletter]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('input', f);
    if (!email.checkValidity()) { email.reportValidity(); return; }
    f.outerHTML = '<p class="nl-done" role="status">Thanks, you’re on the list. Look out for our next article.</p>';
  }));

  /* ---------- SMEs calculator ---------- */
  $$('[data-calc]').forEach((c) => {
    const input = $('input', c), out = $('[data-out]', c), rate = parseFloat(c.dataset.rate);
    const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const upd = () => {
      const v = parseFloat(input.value.replace(/[^\d.]/g, '')) || 0;
      out.textContent = '¥' + fmt(v / rate);
    };
    input.addEventListener('input', upd);
    input.addEventListener('blur', () => { const v = parseFloat(input.value.replace(/[^\d.]/g, '')) || 0; input.value = '₦' + fmt(v); upd(); });
    input.addEventListener('focus', () => { input.value = input.value.replace(/[^\d.]/g, ''); });
  });

  /* ---------- Legal: table of contents scroll spy ---------- */
  const toc = $('[data-toc]');
  if (toc) {
    const links = $$('a', toc);
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { links.forEach((l) => l.classList.remove('is-active')); map.get(e.target.id)?.classList.add('is-active'); } });
    }, { rootMargin: '-20% 0px -70% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Wallet walkthrough (camera + pointer + currency switch) ---------- */
  $$('[data-wt]').forEach((wt) => {
    const view = $('.wt-view', wt), cam = $('.wt-cam', wt), ptr = $('.pointer', wt);
    const tabs = $$('[data-tab]', wt);
    const data = JSON.parse($('script[type="application/json"]', wt).textContent);
    const set = (k, v) => $$(`[data-k="${k}"]`, wt).forEach((el) => (el.innerHTML = v));
    const labels = { dep: 'Deposit', snd: 'Send', swp: 'Swap', ok: 'Success', fail: 'Failed', pend: 'Pending' };
    // position of an element inside the (untransformed) camera
    const pos = (el, fx = 0.5, fy = 0.5) => {
      let x = 0, y = 0, n = el;
      while (n && n !== cam) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
      return [x + el.offsetWidth * fx, y + el.offsetHeight * fy];
    };
    let cam0 = [0, 0, 1];
    const camTo = (x, y, s) => { cam0 = [x, y, s]; cam.style.transform = `translate(${-x * s}px, ${-y * s}px) scale(${s})`; };
    const ptrTo = ([x, y]) => { const [cx, cy, s] = cam0; ptr.style.transform = `translate(${(x - cx) * s}px, ${(y - cy) * s}px)`; };
    const apply = (i) => {
      const d = data[i], flagHtml = $('.flag', tabs[i]).outerHTML;
      set('ccy', d.code); set('bal', d.bal); set('cents', '.00');
      set('rows', d.rows.map((r) => `<tr><td>#39018566</td><td>11/01/2025 | 5:55AM</td><td class="amt">${r[0]}</td><td><span class="ccy">${flagHtml}${d.code}</span></td><td><span class="act ${r[1]}">${labels[r[1]]}</span></td><td>${d.code} Wallet</td><td><span class="st ${r[2]}">${labels[r[2]]}</span></td></tr>`).join(''));
      tabs.forEach((t, j) => t.classList.toggle('on', j === i));
    };
    const fit = () => view.clientWidth / 1152;
    apply(0); camTo(0, 0, fit()); ptrTo([700, 520]);
    window.addEventListener('resize', () => camTo(cam0[0], cam0[1], cam0[2] === fit() ? fit() : cam0[2]));
    if (reduce) return;
    const swap = $$('.wt-swap', wt);
    const bal = $('[data-bal]', wt), table = $('[data-table]', wt);
    let i = 0, running = false, visible = false;
    const run = async () => {
      if (running) return; running = true;
      while (visible) {
        const s0 = fit(), zs = Math.min(1.05, s0 * 1.6);
        const vw = view.clientWidth / zs, vh = view.clientHeight / zs;
        // 1. overview
        camTo(0, 0, s0); ptrTo([760, 560]);
        await wait(1500);
        // 2. zoom to the currency tabs + balance and click the next tab
        const n = (i + 1) % data.length;
        const [tx, ty] = pos(tabs[0], 0, 0);
        camTo(Math.max(0, tx - 40), Math.max(0, ty - 90), zs);
        await wait(700);
        ptrTo(pos(tabs[n], 0.55, 0.6));
        await wait(1200);
        ptr.classList.add('is-click');
        swap.forEach((el) => el.classList.add('is-fading'));
        await wait(320);
        apply(n); i = n;
        swap.forEach((el) => el.classList.remove('is-fading'));
        setTimeout(() => ptr.classList.remove('is-click'), 600);
        // 3. point at the balance
        await wait(700);
        ptrTo(pos(bal, 0.7, 0.75));
        await wait(1700);
        // 4. pan down to the transactions
        const [, tby] = pos(table, 0, 0);
        camTo(Math.max(0, tx - 40), Math.min(tby - 40, 900 - vh), zs);
        ptrTo(pos(table, 0.45, 0.55));
        await wait(2400);
        if (!vw) break;
      }
      running = false;
    };
    onView(wt, (vis) => { visible = vis; if (vis) run(); }, { track: true, threshold: 0.35 });
  });

  /* ---------- Footer: letters lift as the blue bar passes behind them ---------- */
  $$('[data-wave]').forEach((wm) => {
    const bar = $('.footer-rule span', wm.parentElement), letters = $$('span', wm);
    if (!bar || reduce) return;
    let raf = 0;
    const tick = () => {
      const b = bar.getBoundingClientRect();
      letters.forEach((l) => { const r = l.getBoundingClientRect(); const ink = r.left + r.width * 0.12; l.classList.toggle('is-up', b.right >= ink && b.left <= r.right - r.width * 0.1); });
      raf = requestAnimationFrame(tick);
    };
    onView(wm, (vis) => { if (vis && !raf) raf = requestAnimationFrame(tick); else if (!vis && raf) { cancelAnimationFrame(raf); raf = 0; } }, { track: true, threshold: 0 });
  });

  /* ---------- Ticker: constant, calm speed (~128px/s) whatever the width ---------- */
  $$('.ticker-track').forEach((t) => {
    const set = () => { const w = t.firstElementChild?.offsetWidth || 0; if (w) t.style.animationDuration = `${(w / 128).toFixed(1)}s`; };
    set(); window.addEventListener('resize', set);
  });

  /* ---------- SMEs: mini forms appear one after another and type their values ---------- */
  $$('[data-forms]').forEach((list) => {
    const minis = $$('.mini', list);
    const vals = minis.map((m) => $$('b', m).map((b) => [b, b.textContent]));
    if (reduce) { minis.forEach((m) => m.classList.add('is-in')); return; }
    let running = false, visible = false;
    const typeText = async (b, t, dur) => { b.textContent = ''; const step = Math.max(14, dur / t.length); for (let i = 1; i <= t.length; i++) { b.textContent = t.slice(0, i); await wait(step); } };
    const run = async () => {
      if (running) return; running = true;
      do {
        minis.forEach((m) => m.classList.remove('is-in')); vals.flat().forEach(([b]) => (b.textContent = ''));
        const t0 = performance.now();
        await wait(400);
        for (let i = 0; i < minis.length; i++) {
          minis[i].classList.add('is-in');
          await wait(250);
          for (const [b, t] of vals[i]) await typeText(b, t, 420);
          await wait(Math.max(0, 400 + 2000 * (i + 1) - (performance.now() - t0)));
        }
        await wait(Math.max(1200, 10000 - (performance.now() - t0)));
      } while (visible);
      running = false;
    };
    onView(list, (vis) => { visible = vis; if (vis) run(); }, { track: true, threshold: 0.3 });
  });
})();
