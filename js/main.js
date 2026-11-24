(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = matchMedia("(hover: none), (pointer: coarse)").matches;
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ================= DİL ================= */
  let lang = "tr";
  const stored = localStorage.getItem("lang");
  if (stored === "tr" || stored === "en") lang = stored;
  else lang = (navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en";

  const t = (k) => (I18N[lang] && I18N[lang][k]) || k;

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t("meta_title");
    const md = $('meta[name="description"]'); if (md) md.content = t("meta_desc");
    const ot = $('meta[property="og:title"]'); if (ot) ot.content = t("meta_title");
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$(".modal-close, .burger").forEach((el) => el.setAttribute("aria-label", t(el.classList.contains("burger") ? "menu" : "close")));
    renderProjects();
    updateLinks();
    if (!$("#modal").hidden && currentProject) fillModal(currentProject);
    splitHero();
  }

  $("#langBtn").addEventListener("click", () => {
    lang = lang === "tr" ? "en" : "tr";
    localStorage.setItem("lang", lang);
    applyLang();
  });

  /* ================= LİNKLER ================= */
  function waUrl(msg) { return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`; }
  function updateLinks() {
    $("#mailBtn").href = `mailto:${CONFIG.email}`;
    $("#waBtn").href = waUrl(t("wa_msg_general"));
    $$("[data-plan]").forEach((a) => {
      a.href = waUrl(t("wa_msg").replace("{plan}", t(a.dataset.plan)));
    });
    $("#socials").innerHTML = CONFIG.socials
      .map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener" data-cursor="hover">${s.label}</a></li>`).join("");
    bindCursorTargets();
  }

  // Yasal linkler: tıklanır görünür ama hiçbir yere gitmez
  $$(".legal-link").forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));

  /* ================= HERO HARF AYIRMA ================= */
  function splitHero() {
    $$("[data-split]").forEach((el) => {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      const txt = el.textContent.trim();
      el.innerHTML = [...txt].map((c, i) => `<span class="ch" style="--i:${i + (el.classList.contains("hl-2") ? 5 : 0)}">${c}</span>`).join("");
    });
  }

  /* ================= MOCKUP SVG ================= */
  function mock(p) {
    const [a, b, c] = p.colors;
    const W = 400, H = 340;
    let inner = "";
    if (p.type === "app") {
      inner = `
        <rect width="${W}" height="${H}" fill="${a}"/>
        <circle cx="330" cy="40" r="90" fill="${b}" opacity=".12"/>
        <g transform="translate(120 28) rotate(-6 80 140)">
          <rect width="160" height="300" rx="26" fill="${b}"/>
          <rect x="8" y="8" width="144" height="284" rx="20" fill="${c}"/>
          <rect x="52" y="14" width="56" height="8" rx="4" fill="${b}"/>
          <circle cx="80" cy="98" r="44" fill="none" stroke="${a}" stroke-width="14"/>
          <circle cx="80" cy="98" r="44" fill="none" stroke="${b}" stroke-width="14" stroke-dasharray="120 280" transform="rotate(-90 80 98)"/>
          <rect x="22" y="162" width="116" height="22" rx="11" fill="${b}" opacity=".12"/>
          <rect x="22" y="192" width="116" height="22" rx="11" fill="${a}"/>
          <rect x="22" y="222" width="80" height="22" rx="11" fill="${b}" opacity=".12"/>
          <rect x="22" y="258" width="116" height="24" rx="12" fill="${b}"/>
        </g>`;
    } else if (p.type === "dash") {
      inner = `
        <rect width="${W}" height="${H}" fill="${a}"/>
        <rect x="36" y="44" width="328" height="250" rx="14" fill="${c}" stroke="${b}" stroke-width="4"/>
        <rect x="36" y="44" width="328" height="30" rx="14" fill="${b}"/>
        <circle cx="56" cy="59" r="5" fill="${b === "#141210" ? "#FF3B30" : a}"/><circle cx="74" cy="59" r="5" fill="${c}"/>
        <rect x="52" y="92" width="80" height="58" rx="8" fill="${b}"/>
        <rect x="142" y="92" width="80" height="58" rx="8" fill="${b}" opacity=".15"/>
        <rect x="232" y="92" width="116" height="58" rx="8" fill="${b}" opacity=".15"/>
        ${[0,1,2,3,4,5,6].map((i) => `<rect x="${60 + i * 42}" y="${270 - [40,70,52,98,76,110,88][i]}" width="28" height="${[40,70,52,98,76,110,88][i]}" rx="4" fill="${i === 5 ? a : b}"/>`).join("")}`;
    } else if (p.type === "logoA") {
      inner = `
        <rect width="${W}" height="${H}" fill="${c}"/>
        <circle cx="200" cy="150" r="108" fill="${a}"/>
        <ellipse cx="200" cy="150" rx="46" ry="82" fill="${b}" transform="rotate(35 200 150)"/>
        <path d="M200 70 C 170 120, 230 180, 200 230" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round" transform="rotate(35 200 150)"/>
        <text x="200" y="305" text-anchor="middle" font-family="Archivo Black, Arial Black, sans-serif" font-size="30" letter-spacing="3" fill="${b}">ROAST STUDIO</text>`;
    } else {
      inner = `
        <rect width="${W}" height="${H}" fill="${b}"/>
        <rect x="90" y="50" width="48" height="190" fill="${a}"/>
        <rect x="262" y="50" width="48" height="190" fill="${a}"/>
        <polygon points="90,50 138,50 310,240 262,240" fill="${c}"/>
        <circle cx="330" cy="70" r="22" fill="${c}"/>
        <text x="200" y="305" text-anchor="middle" font-family="Archivo Black, Arial Black, sans-serif" font-size="30" letter-spacing="8" fill="${a}">NOVA</text>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${p.title[lang]}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }
  const visual = (p) => p.image ? `<img src="${p.image}" alt="${p.title[lang]}" loading="lazy">` : mock(p);

  /* ================= PROJELER ================= */
  let activeFilter = "all";
  function renderProjects() {
    $("#projects").innerHTML = PROJECTS.map((p) => `
      <button class="card ${activeFilter === "all" || activeFilter === p.cat ? "" : "hide"}" data-id="${p.id}" data-cat="${p.cat}" data-cursor="view" aria-label="${p.title[lang]}">
        <div class="card-visual" data-tilt>${visual(p)}</div>
        <div class="card-meta"><h3>${p.title[lang]}</h3><span>${p.tag[lang]}</span></div>
      </button>`).join("");
    $$(".card").forEach((c) => c.addEventListener("click", () => openModal(c.dataset.id, c)));
    bindCursorTargets();
    bindTilt();
  }

  $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
    activeFilter = chip.dataset.filter;
    $$(".card").forEach((c) => c.classList.toggle("hide", !(activeFilter === "all" || c.dataset.cat === activeFilter)));
  }));

  /* ================= MODAL ================= */
  let currentProject = null, lastFocus = null;
  function fillModal(p) {
    $("#mVisual").innerHTML = visual(p);
    $("#mTag").textContent = `${p.tag[lang]} · ${p.year}`;
    $("#mTitle").textContent = p.title[lang];
    $("#mProblem").textContent = p.problem[lang];
    $("#mProcess").textContent = p.process[lang];
    $("#mSolution").textContent = p.solution[lang];
    $("#mResult").textContent = p.result[lang];
    $("#mTools").innerHTML = p.tools.map((x) => `<li>${x}</li>`).join("");
  }
  function openModal(id, trigger) {
    currentProject = PROJECTS.find((p) => p.id === id);
    if (!currentProject) return;
    lastFocus = trigger || document.activeElement;
    fillModal(currentProject);
    const m = $("#modal");
    m.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add("open")));
    $(".modal-close").focus({ preventScroll: true });
    $(".modal-panel").scrollTop = 0;
  }
  function closeModal() {
    const m = $("#modal");
    if (m.hidden) return;
    m.classList.remove("open");
    document.body.classList.remove("modal-open");
    setTimeout(() => { m.hidden = true; }, reduced ? 0 : 450);
    currentProject = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  $$("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeModal(); closeMenu(); }
    if (e.key === "Tab" && !$("#modal").hidden) { // odak tuzağı
      const f = $$("button, a[href]", $(".modal-panel")).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ================= MOBİL MENÜ ================= */
  function closeMenu() {
    document.body.classList.remove("menu-open");
    $("#burger").setAttribute("aria-expanded", "false");
  }
  $("#burger").addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    $("#burger").setAttribute("aria-expanded", String(open));
  });
  $$("#nav a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ================= AKORDEON ================= */
  $$(".acc-head").forEach((h) => h.addEventListener("click", () => {
    const item = h.parentElement;
    const open = !item.classList.contains("is-open");
    $$(".acc-item").forEach((i) => { i.classList.remove("is-open"); $(".acc-head", i).setAttribute("aria-expanded", "false"); });
    if (open) { item.classList.add("is-open"); h.setAttribute("aria-expanded", "true"); }
  }));

  /* ================= İMLEÇ ================= */
  const dot = $(".cursor-dot"), ring = $(".cursor-ring"), ringLabel = $("span", ring);
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  const useCursor = !touch && !reduced;
  if (useCursor) {
    document.body.classList.add("has-cursor");
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx = lerp(rx, mx, .18); ry = lerp(ry, my, .18);
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();
  }
  function bindCursorTargets() {
    if (!useCursor) return;
    $$("[data-cursor]").forEach((el) => {
      if (el._cur) return; el._cur = true;
      const kind = el.dataset.cursor;
      el.addEventListener("mouseenter", () => {
        ring.classList.add(kind === "view" ? "is-view" : "is-hover");
        if (kind === "view") ringLabel.textContent = t("view");
      });
      el.addEventListener("mouseleave", () => ring.classList.remove("is-view", "is-hover"));
    });
  }

  /* ================= MANYETİK BUTON ================= */
  if (useCursor) {
    $$("[data-magnet]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * .35;
        const y = (e.clientY - (r.top + r.height / 2)) * .5;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ================= TILT ================= */
  function bindTilt() {
    if (!useCursor) return;
    $$("[data-tilt]").forEach((el) => {
      if (el._tilt) return; el._tilt = true;
      const host = el.classList.contains("card-visual") ? el.parentElement : el;
      host.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateY(-4px)`;
      });
      host.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ================= SCROLL REVEAL ================= */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal, .reveal-lines").forEach((el) => io.observe(el));

  /* ================= SAYAÇLAR ================= */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      cio.unobserve(en.target);
      const el = en.target, end = +el.dataset.count, dur = reduced ? 1 : 1600, st = performance.now();
      (function tick(now) {
        const p = Math.min((now - st) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      })(st);
    });
  }, { threshold: .6 });
  $$("[data-count]").forEach((el) => cio.observe(el));

  /* ================= ARKA PLAN RENK GEÇİŞİ ================= */
  const themed = $$("[data-theme]");
  function updateTheme() {
    const mid = innerHeight * .5;
    let cur = "cream";
    for (const s of themed) {
      const r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) { cur = s.dataset.theme; break; }
    }
    if (document.body.dataset.theme !== cur) document.body.dataset.theme = cur;
  }

  /* ================= SCROLL: MARQUEE, PARALAKS, SÜREÇ ================= */
  const mTrack = $("#marqueeTrack");
  const proc = $("#process"), procTrack = $("#procTrack"), procBar = $("#procBar");
  let lastY = scrollY, vel = 0, mPos = 0, dir = -1;

  function procUpdate() {
    if (innerWidth <= 900) { procTrack.style.transform = ""; return; }
    const r = proc.getBoundingClientRect();
    const total = proc.offsetHeight - innerHeight;
    const p = Math.min(Math.max(-r.top / total, 0), 1);
    const shift = Math.max(procTrack.scrollWidth - innerWidth + innerWidth * .08, 0);
    procTrack.style.transform = `translateX(${-shift * p}px)`;
    procBar.style.width = `${p * 100}%`;
  }

  (function frame() {
    const y = scrollY, dy = y - lastY; lastY = y;
    vel = lerp(vel, dy, .12);
    if (Math.abs(dy) > 0.5) dir = dy > 0 ? -1 : 1;
    if (!reduced) {
      mPos += dir * (1.2 + Math.min(Math.abs(vel) * 0.6, 14));
      const w = mTrack.scrollWidth / 2;
      if (mPos <= -w) mPos += w; if (mPos > 0) mPos -= w;
      mTrack.style.transform = `translate3d(${mPos}px,0,0)`;
      // hero paralaks
      const h = $(".hero-title");
      if (y < innerHeight * 1.2) {
        h.style.transform = `translateY(${y * -.12}px)`;
        $(".badge").style.transform = `translateY(${y * .25}px)`;
      }
    }
    procUpdate();
    updateTheme();
    requestAnimationFrame(frame);
  })();

  /* ================= YORUM SÜRÜKLE ================= */
  const rev = $("#revTrack");
  let down = false, sx = 0, sl = 0, moved = false;
  rev.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = rev.scrollLeft; });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    const d = e.clientX - sx;
    if (Math.abs(d) > 4) { moved = true; rev.classList.add("dragging"); }
    rev.scrollLeft = sl - d;
  });
  addEventListener("pointerup", () => { down = false; rev.classList.remove("dragging"); });

  /* ================= PRELOADER ================= */
  function runPreloader() {
    const num = $("#plNum"), pre = $("#preloader");
    const dur = reduced ? 1 : 1800, st = performance.now();
    (function tick(now) {
      const p = Math.min((now - st) / dur, 1);
      num.textContent = Math.floor(100 * (p * (2 - p)));
      if (p < 1) return requestAnimationFrame(tick);
      num.textContent = 100;
      setTimeout(() => {
        pre.classList.add("done");
        document.body.classList.remove("is-loading");
        document.body.classList.add("ready");
        setTimeout(() => { pre.style.display = "none"; }, 1100);
      }, 250);
    })(st);
  }

  /* ================= BAŞLAT ================= */
  splitHero();
  applyLang();
  updateTheme();
  runPreloader();
})();
