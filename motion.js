(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress = document.getElementById("scrollProgress");
  const stage = document.querySelector(".hero-stage");
  const shell = document.getElementById("productShell");
  const product = document.getElementById("product");
  const scan = document.querySelector(".product-scan");

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = window.scrollY / max;
      if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;

      if (!reduce && stage) {
        const y = Math.min(80, window.scrollY * 0.12);
        stage.style.transform = `translate3d(0, ${y}px, 0)`;
      }

      if (!reduce && product && shell) {
        const rect = product.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.min(1, Math.max(0, 1 - rect.top / (vh * 0.85)));
        const lift = (1 - visible) * 48;
        const scale = 0.94 + visible * 0.06;
        shell.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale})`;
        shell.style.opacity = String(0.35 + visible * 0.65);
        if (scan) scan.style.opacity = String(0.15 + visible * 0.55);
      }

      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (reduce) return;

  const motionTargets = document.querySelectorAll(
    ".seg-card, .cap-grid article, .contact-shell, .section-head, .product-head, .api-marquee, .funnel-track, .hero-stage"
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        if (entry.target.classList.contains("seg-card") || entry.target.classList.contains("cap-grid")) {
          // keep observing for repeat? once is enough
        }
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  motionTargets.forEach((el, i) => {
    el.classList.add("will-reveal");
    el.style.setProperty("--delay", `${(i % 4) * 0.08}s`);
    io.observe(el);
  });

  // staggered children inside product shell after dock
  if (shell) {
    const shellIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          shell.classList.add("is-docked");
          shellIo.unobserve(shell);
        });
      },
      { threshold: 0.25 }
    );
    shellIo.observe(shell);
  }

  // pulse funnel when product enters
  const track = document.getElementById("funnelTrack");
  if (track && product) {
    const fio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          track.classList.toggle("is-live", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    fio.observe(product);
  }
})();
