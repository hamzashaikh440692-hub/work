(() => {
  'use strict';

  /* ================= CONTENT ================= */
  const SERVICES = [
    { name: 'Graphic Designing', icon: '✎', desc: 'Brand identity, posters, social media creatives and print material, designed to stay clear and consistent everywhere they appear.' },
    { name: 'Product Designing', icon: '◎', desc: 'Form, function and detail for physical products, from the first sketch through to a refined, production-ready concept.' },
    { name: 'Concept to Final Manufacturing', icon: '⚙', desc: 'One team takes your idea through concept, prototyping and the steps needed to get it made at scale.' },
    { name: 'Mechanical & Industrial Engineering', icon: '✱', desc: 'Mechanical design, analysis and industrial solutions that work reliably in real-world conditions.' },
    { name: 'DFM (Design for Manufacturing)', icon: '▣', desc: 'Designs adjusted early so they can be produced efficiently, at lower cost and with fewer problems on the factory floor.' },
    { name: '3D Animation', icon: '◆', desc: 'Realistic and stylised 3D animation for product stories, adverts, explainers and presentations.' },
    { name: '2D Animation', icon: '◐', desc: 'Motion graphics and 2D animation for explainers, social content and brand intros.' },
    { name: 'Product Modeling', icon: '⬡', desc: 'Accurate 3D models of your product, ready for renders, prototypes or manufacturing files.' }
  ];

  const PROJECTS = [
    { title: 'Tech launch explainer',  cat: '2d',    label: '2D Animation',       thumb: 'p1' },
    { title: 'Product spin reel',      cat: '3d',    label: '3D Animation',       thumb: 'p2' },
    { title: 'AI concept film',        cat: 'ai',    label: 'AI Generated',       thumb: 'p3' },
    { title: 'Hand-drawn loop',        cat: 'frame', label: 'Frame By Frame',     thumb: 'p4' },
    { title: 'Motion brand intro',     cat: '2d',    label: '2D Animation',       thumb: 'p5' },
    { title: 'Mechanical teaser',      cat: '3d',    label: '3D Animation',       thumb: 'p6' },
    { title: 'Generative ad loop',     cat: 'ai',    label: 'AI Generated',       thumb: 'p7' },
    { title: 'Stop-motion short',      cat: 'frame', label: 'Frame By Frame',     thumb: 'p8' },
    { title: 'Character explainer',    cat: '2d',    label: '2D Animation',       thumb: 'p9' },
    { title: 'Architectural walkthrough', cat: '3d', label: '3D Animation',       thumb: 'p10' },
    { title: 'AI product visuals',     cat: 'ai',    label: 'AI Generated',       thumb: 'p11' },
    { title: 'Rotoscope music clip',   cat: 'frame', label: 'Frame By Frame',     thumb: 'p12' }
  ];
  const HOME_LIMIT = 6;

  const QUOTES = [
    { text: 'They turned a rough sketch into a product film that felt premium from the first second. Our launch was the talk of the event.', who: 'Marketing Director, Consumer brand' },
    { text: 'The 3D product animation made our catalogue come alive. Fast turnaround, clear communication and beautiful results.', who: 'Founder, Hardware startup' },
    { text: 'One team handled the animation, the engineering notes and the final files. No handoffs, no lost details.', who: 'Product Lead, Manufacturing client' }
  ];

  const FAQ = [
    { q: 'What does a typical project look like?', a: 'Every project starts with a short discovery call, then a storyboard or first concept, production and a final handover. Timelines depend on scope and are agreed before we begin.' },
    { q: 'Can you combine 2D, 3D and AI in one project?', a: 'Yes. Many of our projects mix styles, for example 3D product shots with 2D motion graphics or AI generated backgrounds, always checked for consistency.' },
    { q: 'Do you work with clients outside our country?', a: 'Yes. Most of our work is remote, with regular video reviews and shared files. We have worked with clients on several continents.' },
    { q: 'How do I get a quote?', a: 'Send us a short brief through the contact form. Attaching a script, sketch or reference makes the quote more accurate, and we reply within two working days.' }
  ];

  /* ================= BUILD ================= */
  const svcCard = (s, i, opts = {}) => `
    <article class="svc-card tilt reveal${opts.delay ? ' d' + opts.delay : ''}" data-name="${s.name}">
      <div class="icon" aria-hidden="true">${s.icon}</div>
      <span class="svc-num">${String(i + 1).padStart(2, '0')}</span>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="svc-foot">
        ${opts.page === 'services'
          ? `<a href="#/contact?service=${encodeURIComponent(s.name)}">Request a quote →</a>`
          : `<a href="#/services?service=${encodeURIComponent(s.name)}">Learn more →</a>`}
      </div>
    </article>`;

  document.getElementById('homeServices').innerHTML = SERVICES.slice(0, 3).map((s, i) => svcCard(s, i, { delay: i })).join('');
  const allSvc = document.getElementById('allServices');
  allSvc.innerHTML = SERVICES.map((s, i) => svcCard(s, i, { page: 'services' })).join('') + '<p class="empty" id="empty">No services match your search. Try another word, or contact us directly.</p>';

  const marqueeItems = SERVICES.map((s) => `<span>${s.name}</span>`).join('');
  document.getElementById('marqueeTrack').innerHTML = marqueeItems + marqueeItems;

  const workCard = (p) => `
    <article class="work enter tilt" data-cat="${p.cat}">
      <div class="thumb ${p.thumb}"></div>
      <div class="shade"></div>
      <span class="play" aria-hidden="true"></span>
      <div class="meta"><div class="cat">${p.label}</div><h3>${p.title}</h3></div>
    </article>`;

  function mountPortfolio(filtersEl, gridEl, emptyEl, limit) {
    let current = 'all';
    const render = () => {
      let list = current === 'all' ? PROJECTS : PROJECTS.filter((p) => p.cat === current);
      if (limit) list = list.slice(0, limit);
      gridEl.innerHTML = list.map(workCard).join('');
      emptyEl.classList.toggle('show', list.length === 0);
    };
    filtersEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filtersEl.querySelectorAll('.filter-btn').forEach((b) => b.classList.toggle('on', b === btn));
      current = btn.dataset.filter;
      render();
    });
    render();
  }
  mountPortfolio(document.getElementById('filters'), document.getElementById('workGrid'), document.getElementById('emptyWork'), HOME_LIMIT);
  mountPortfolio(document.getElementById('pfFilters'), document.getElementById('pfGrid'), document.getElementById('pfEmpty'), 0);

  const serviceSelect = document.getElementById('service');
  serviceSelect.innerHTML = '<option value="">Choose one</option>' + SERVICES.map((s) => `<option>${s.name}</option>`).join('');

  const faqBox = document.getElementById('faq');
  faqBox.innerHTML = FAQ.map((f) => `
    <div class="faq-item reveal tilt">
      <button class="faq-q" aria-expanded="false"><span>${f.q}</span><i>+</i></button>
      <div class="faq-a"><div>${f.a}</div></div>
    </div>`).join('');

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ================= ROUTING ================= */
  const pages = { home: 'page-home', portfolio: 'page-portfolio', services: 'page-services', contact: 'page-contact' };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function parseRoute() {
    const raw = (location.hash || '#/home').replace(/^#\//, '');
    const [path, query] = raw.split('?');
    const route = pages[path] ? path : 'home';
    return { route, params: new URLSearchParams(query || '') };
  }

  const serviceSelectEl = serviceSelect;
  const search = document.getElementById('search');
  const count = document.getElementById('count');

  function showRoute() {
    const { route, params } = parseRoute();
    Object.entries(pages).forEach(([key, id]) => { document.getElementById(id).hidden = key !== route; });
    document.querySelectorAll('[data-link]').forEach((a) => a.classList.toggle('active', a.dataset.link === route));
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = { home: 'Agency — Animation Studio', portfolio: 'Portfolio — Agency', services: 'Services — Agency', contact: 'Contact — Agency' }[route];

    if (route === 'contact' && params.get('service')) {
      const wanted = params.get('service');
      const opt = Array.from(serviceSelectEl.options).find((o) => o.textContent === wanted);
      if (opt) serviceSelectEl.value = opt.textContent;
    }
    if (route === 'services') {
      if (params.get('service')) search.value = '';
      applySearch();
    }
    if (route === 'services' && params.get('service')) {
      const wanted = params.get('service');
      requestAnimationFrame(() => {
        const card = allSvc.querySelector(`.svc-card[data-name="${CSS.escape(wanted)}"]`);
        if (!card) return;
        card.classList.add('focus');
        card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        setTimeout(() => card.classList.remove('focus'), 2400);
      });
    }
    requestAnimationFrame(() => { observeReveals(); applyLineMode(); updatePf(); });
  }
  window.addEventListener('hashchange', showRoute);

  /* ================= HEADER / MENU / TO-TOP / PROGRESS ================= */
  const header = document.getElementById('siteHeader');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const toTop = document.getElementById('toTop');
  const progress = document.getElementById('progress');

  function closeMenu() {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('[data-scroll]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.getElementById(a.dataset.scroll);
    if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', y > 20);
    toTop.classList.toggle('show', y > 600);
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  }, { passive: true });

  /* cursor glow + 3D tilt (desktop only) */
  if (!coarse && !reduce) {
    document.body.classList.add('fine-pointer');
    const glow = document.getElementById('glow');
    window.addEventListener('pointermove', (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, { passive: true });

    document.querySelectorAll('.step, .hours').forEach((el) => el.classList.add('tilt'));
    const backTimers = new WeakMap();
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest && e.target.closest('.tilt');
      if (!card) return;
      if (card.classList.contains('step') && !card.classList.contains('on')) return;
      clearTimeout(backTimers.get(card));
      card.classList.remove('tilt-back');
      card.classList.add('tilting');
      const r = card.getBoundingClientRect();
      const ox = card._dx || 0, oy = card._dy || 0;
      const cx = r.left + r.width / 2 - ox, cy = r.top + r.height / 2 - oy;
      const x = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
      const y = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
      card._dx = x * 14; card._dy = y * 10;
      card.style.transform = `perspective(900px) translate3d(${card._dx.toFixed(1)}px, ${card._dy.toFixed(1)}px, 0) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
    });
    document.addEventListener('pointerout', (e) => {
      const card = e.target.closest && e.target.closest('.tilt');
      if (!card || card.contains(e.relatedTarget)) return;
      card._dx = 0; card._dy = 0;
      card.classList.remove('tilting');
      card.classList.add('tilt-back');
      card.style.transform = '';
      backTimers.set(card, setTimeout(() => card.classList.remove('tilt-back'), 420));
    });
  }

  /* ================= PROCESS LINE (own pinned section, not the hero) ================= */
  const processWrap = document.getElementById('processWrap');
  const processSticky = document.getElementById('processSticky');
  const stepsBox = document.getElementById('steps');
  const lineSvg = document.getElementById('lineSvg');
  const path = document.getElementById('drawnLine');
  const steps = Array.from(document.querySelectorAll('#steps .step'));
  const mobileQuery = window.matchMedia('(max-width: 860px)');
  let lineLength = 0;

  // smooth wave through a list of points
  function wave(pts) {
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i - 1], [x2, y2] = pts[i];
      const mx = (x2 - x1) / 2, my = (y2 - y1) / 2;
      d += ` C ${(x1 + mx).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - mx).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }
    return d;
  }

  // Desktop: the line lives in the free band UNDER the cards, never over the heading or text.
  function desktopPath(W, H) {
    const bottom = stepsBox.getBoundingClientRect().bottom - processSticky.getBoundingClientRect().top;
    const avail = Math.max(40, H - bottom);
    const base = bottom + avail / 2;
    const amp = Math.max(5, Math.min(26, avail / 2 - 16));
    const n = 8, pts = [];
    for (let i = 0; i <= n; i++) pts.push([-30 + i * (W + 60) / n, base + (i % 2 ? amp : -amp)]);
    return wave(pts);
  }
  // Mobile: thin wave down the left gutter, beside the cards.
  function mobilePath(W, H) {
    const n = 10;
    let d = `M 10 10`;
    for (let i = 1; i <= n; i++) {
      const y1 = 10 + (i - 1) * (H - 20) / n, y2 = 10 + i * (H - 20) / n, my = (y2 - y1) / 2;
      const x1 = i % 2 ? 6 : 14, x2 = i % 2 ? 14 : 6;
      d += ` C ${x1} ${(y1 + my).toFixed(1)}, ${x2} ${(y2 - my).toFixed(1)}, ${x2} ${y2.toFixed(1)}`;
    }
    return d;
  }

  function applyLineMode() {
    const W = lineSvg.clientWidth, H = lineSvg.clientHeight;
    if (!W || !H) return;                       // page hidden
    lineSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    path.setAttribute('d', mobileQuery.matches ? mobilePath(W, H) : desktopPath(W, H));
    lineLength = path.getTotalLength();
    path.style.strokeDasharray = lineLength;
    path.style.strokeDashoffset = lineLength;
    updateLine();
  }

  function updateLine() {
    if (parseRoute().route !== 'home' || !lineLength) return;
    const mobile = mobileQuery.matches;
    const r = processWrap.getBoundingClientRect();
    let p;
    if (mobile) p = (window.innerHeight * 0.75 - r.top) / r.height;
    else { const range = processWrap.offsetHeight - window.innerHeight; p = range > 0 ? -r.top / range : 1; }
    p = Math.max(0, Math.min(1, p));
    if (reduce) p = 1;
    path.style.strokeDashoffset = lineLength - lineLength * p;
    steps.forEach((el, i) => {
      const on = reduce ? true
        : mobile ? el.getBoundingClientRect().top < window.innerHeight * 0.8
        : p >= (i + 0.5) / steps.length * 0.9;
      el.classList.toggle('on', on);
    });
  }

  const pfWrap = document.getElementById('pfWrap');
  const pfImg = document.getElementById('pfImg');
  function updatePf() {
    if (parseRoute().route !== 'portfolio') return;
    let p;
    if (mobileQuery.matches) p = window.scrollY / Math.max(1, pfWrap.offsetHeight);
    else { const range = pfWrap.offsetHeight - window.innerHeight; p = range > 0 ? -pfWrap.getBoundingClientRect().top / range : 0; }
    p = Math.max(0, Math.min(1, p));
    pfImg.style.transform = reduce ? '' : `scale(${(1 + (mobileQuery.matches ? 0.18 : 0.32) * p).toFixed(3)})`;
  }
  window.addEventListener('scroll', updatePf, { passive: true });
  window.addEventListener('resize', updatePf);
  mobileQuery.addEventListener('change', applyLineMode);
  window.addEventListener('scroll', updateLine, { passive: true });
  window.addEventListener('resize', applyLineMode);
  window.addEventListener('load', applyLineMode);

  /* ================= REVEALS + COUNTERS ================= */
  const counterToken = new WeakMap();
  const runCounters = (root) => {
    root.querySelectorAll('[data-count]').forEach((el) => {
      const token = {};
      counterToken.set(el, token);
      const target = Number(el.dataset.count);
      if (reduce) { el.textContent = target; return; }
      const start = performance.now();
      const tick = (now) => {
        if (counterToken.get(el) !== token) return;
        const t = Math.min(1, (now - start) / 1600);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  const resetCounters = (root) => {
    root.querySelectorAll('[data-count]').forEach((el) => { counterToken.set(el, {}); el.textContent = '0'; });
  };
  // every time the stats come into view the numbers count up again; when they leave they reset
  const statsIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? runCounters(en.target) : resetCounters(en.target)));
  }, { threshold: 0.4 });
  statsIO.observe(document.getElementById('stats'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });

  function observeReveals() {
    document.querySelectorAll('.page:not([hidden]) .reveal:not(.in)').forEach((el) => io.observe(el));
  }

  /* ================= TESTIMONIALS ================= */
  const quotesBox = document.getElementById('quotes');
  quotesBox.innerHTML = QUOTES.map((q) => `<figure class="quote tilt"><p>“${q.text}”</p><small>— ${q.who}</small></figure>`).join('');
  const quoteEls = Array.from(quotesBox.querySelectorAll('.quote'));
  const dotsBox = document.getElementById('qDots');
  dotsBox.innerHTML = QUOTES.map((_, i) => `<button aria-label="Testimonial ${i + 1}"></button>`).join('');
  const dotEls = Array.from(dotsBox.querySelectorAll('button'));
  let qi = 0, qTimer = null;

  function setQuote(i) {
    qi = (i + QUOTES.length) % QUOTES.length;
    quoteEls.forEach((el, k) => el.classList.toggle('on', k === qi));
    dotEls.forEach((el, k) => el.classList.toggle('on', k === qi));
  }
  function startQuotes() { clearInterval(qTimer); if (!reduce) qTimer = setInterval(() => setQuote(qi + 1), 5200); }
  document.getElementById('qPrev').addEventListener('click', () => { setQuote(qi - 1); startQuotes(); });
  document.getElementById('qNext').addEventListener('click', () => { setQuote(qi + 1); startQuotes(); });
  dotEls.forEach((el, k) => el.addEventListener('click', () => { setQuote(k); startQuotes(); }));
  quotesBox.addEventListener('mouseenter', () => clearInterval(qTimer));
  quotesBox.addEventListener('mouseleave', startQuotes);
  setQuote(0); startQuotes();

  /* ================= FAQ ================= */
  faqBox.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.parentElement;
    const open = !item.classList.contains('open');
    faqBox.querySelectorAll('.faq-item').forEach((i) => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = '0px';
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (open) {
      item.classList.add('open');
      const body = item.querySelector('.faq-a');
      body.style.maxHeight = body.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  /* ================= SERVICES SEARCH ================= */
  function applySearch() {
    const q = (search.value || '').trim().toLowerCase();
    let shown = 0;
    allSvc.querySelectorAll('.svc-card').forEach((card, i) => {
      const s = SERVICES[i];
      const match = !q || (s.name + ' ' + s.desc).toLowerCase().includes(q);
      card.hidden = !match;
      if (match) shown++;
    });
    document.getElementById('empty').classList.toggle('show', shown === 0);
    count.textContent = `${shown} of ${SERVICES.length} services`;
  }
  search.addEventListener('input', applySearch);

  /* ================= CONTACT FORM ================= */
  const form = document.getElementById('contactForm');
  const rules = {
    name:    (v) => v.trim().length >= 2 || 'Please enter your name',
    email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address',
    service: (v) => v !== '' || 'Please choose a service',
    message: (v) => v.trim().length >= 10 || 'Tell us a little more (10+ characters)'
  };
  function check(name) {
    const el = form.elements.namedItem(name);
    const group = el.closest('.f-group');
    const res = rules[name](el.value);
    const help = group.querySelector('.f-help');
    if (res !== true) { group.classList.add('err'); help.textContent = res; return false; }
    group.classList.remove('err'); help.textContent = ''; return true;
  }
  Object.keys(rules).forEach((n) => form.elements.namedItem(n).addEventListener('blur', () => check(n)));

  const fileInput = document.getElementById('file');
  const fileDrop = document.getElementById('fileDrop');
  const fileText = document.getElementById('fileText');
  fileInput.addEventListener('change', () => {
    fileText.innerHTML = fileInput.files[0] ? `Attached: <b>${fileInput.files[0].name}</b>` : 'Drop a brief, script or sketch here, or <b>browse</b> to attach it';
  });
  ['dragenter', 'dragover'].forEach((ev) => fileDrop.addEventListener(ev, (e) => { e.preventDefault(); fileDrop.classList.add('drag'); }));
  ['dragleave', 'drop'].forEach((ev) => fileDrop.addEventListener(ev, (e) => { e.preventDefault(); fileDrop.classList.remove('drag'); }));
  fileDrop.addEventListener('drop', (e) => {
    if (e.dataTransfer.files.length) { fileInput.files = e.dataTransfer.files; fileInput.dispatchEvent(new Event('change')); }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) return;
    const btn = document.getElementById('sendBtn');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      form.querySelectorAll('.f-row, .f-group, .file-drop, #sendBtn').forEach((el) => { el.hidden = true; });
      document.getElementById('formSuccess').classList.add('show');
    }, 900);
  });

  /* ================= GO ================= */
  applyLineMode();
  showRoute();
  observeReveals();
})();
