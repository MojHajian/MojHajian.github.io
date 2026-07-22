/* =========================================================
   Main — nav, theme, menus, reveal, counters, hero canvas
   ========================================================= */
(function () {
  "use strict";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav scrolled state ---------- */
  const nav = $("#nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Theme toggle ---------- */
  const themeToggle = $("#themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const root = document.documentElement;
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- Mobile menu ---------- */
  const burger = $("#navBurger");
  const mobileMenu = $("#mobileMenu");
  if (burger && mobileMenu) {
    const setMenu = (open) => {
      mobileMenu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    burger.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("is-open")));
    $$("a", mobileMenu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  }

  /* ---------- More projects toggle ---------- */
  const moreToggle = $("#moreToggle");
  const moreProjects = $("#moreProjects");
  if (moreToggle && moreProjects) {
    moreToggle.addEventListener("click", () => {
      const open = moreProjects.hasAttribute("hidden");
      if (open) moreProjects.removeAttribute("hidden");
      else moreProjects.setAttribute("hidden", "");
      moreToggle.setAttribute("aria-expanded", String(open));
      moreToggle.textContent = open ? "Show fewer projects" : "Show more projects";
      if (open) {
        // reveal the newly shown cards
        $$(".reveal", moreProjects).forEach((el) => el.classList.add("is-in"));
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    // stagger index within shared parents
    revealEls.forEach((el) => {
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal")) : [el];
      el.style.setProperty("--i", sibs.indexOf(el));
      io.observe(el);
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__links a");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const linkFor = (id) => navLinks.find((a) => a.getAttribute("href") === "#" + id);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove("is-active"));
            const l = linkFor(entry.target.id);
            if (l) l.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Stat counters ---------- */
  const counters = $$(".stat__num[data-count]");
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (prefersReduced) { el.textContent = String(target); return; }
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      const cObs = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((c) => cObs.observe(c));
    }
  }

  /* ---------- Hero neural-network canvas ---------- */
  const canvas = $("#heroCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, nodes = [], raf = null, running = false;

    const themeColors = () => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      return light
        ? { node: "rgba(79,70,229,0.75)", line: "99,102,241" }
        : { node: "rgba(139,147,255,0.85)", line: "120,130,255" };
    };

    const count = () => {
      const area = w * h;
      const n = Math.round(area / 22000);
      return Math.max(26, Math.min(n, 78));
    };

    const seed = () => {
      nodes = [];
      const N = count();
      for (let i = 0; i < N; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 1.0,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      const { node, line } = themeColors();
      ctx.clearRect(0, 0, w, h);
      const maxDist = Math.min(w, h) * 0.16 + 90;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const o = (1 - dist / maxDist) * 0.5;
            ctx.strokeStyle = `rgba(${line},${o.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of nodes) {
        ctx.fillStyle = node;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(step); } };
    const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = null; };

    resize();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 180); });

    if (prefersReduced) {
      draw(); // single static frame
    } else {
      // pause when hero scrolled away
      if ("IntersectionObserver" in window) {
        const heroObs = new IntersectionObserver(
          (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
          { threshold: 0 }
        );
        heroObs.observe(canvas);
      } else {
        start();
      }
      document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    }
  }
})();
