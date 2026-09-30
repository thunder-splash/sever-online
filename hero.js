(() => {
  const panel = document.getElementById("heroPanel");
  if (!panel) return;

  const cards = [...panel.querySelectorAll(".float-card")];
  let zTop = 10;
  let dragging = null;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let origX = 0;
  let origY = 0;
  let lastTap = 0;

  function place(card, xPct, yPct, rot = 0, animate = true) {
    card.style.setProperty("--x", `${xPct}%`);
    card.style.setProperty("--y", `${yPct}%`);
    card.style.setProperty("--r", `${rot}deg`);
    card.classList.toggle("is-anim", animate);
  }

  function readPos(card) {
    const x = parseFloat(getComputedStyle(card).getPropertyValue("--x")) || 0;
    const y = parseFloat(getComputedStyle(card).getPropertyValue("--y")) || 0;
    return { x, y };
  }

  function onPointerDown(e) {
    const card = e.currentTarget;
    if (e.button != null && e.button !== 0) return;
    dragging = card;
    moved = false;
    card.classList.add("is-dragging");
    card.classList.remove("is-anim");
    card.style.zIndex = String(++zTop);
    const rect = panel.getBoundingClientRect();
    const pos = readPos(card);
    startX = e.clientX;
    startY = e.clientY;
    origX = (pos.x / 100) * rect.width;
    origY = (pos.y / 100) * rect.height;
    card.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const rect = panel.getBoundingClientRect();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    let nx = ((origX + dx) / rect.width) * 100;
    let ny = ((origY + dy) / rect.height) * 100;
    nx = Math.max(-6, Math.min(74, nx));
    ny = Math.max(-6, Math.min(74, ny));
    const tilt = Math.max(-12, Math.min(12, dx * 0.1));
    place(dragging, nx, ny, tilt, false);
  }

  function onPointerUp(e) {
    if (!dragging) return;
    const card = dragging;
    card.classList.remove("is-dragging");
    const r = (Math.random() * 6 - 3).toFixed(1);
    card.style.setProperty("--r", `${r}deg`);
    card.releasePointerCapture?.(e.pointerId);
    dragging = null;

    // tap / double-tap flip (touch-friendly)
    if (!moved) {
      const now = Date.now();
      if (now - lastTap < 320) {
        card.classList.toggle("is-flipped");
        card.style.zIndex = String(++zTop);
        lastTap = 0;
      } else {
        lastTap = now;
      }
    }
  }

  cards.forEach((card) => {
    card.addEventListener("pointerdown", onPointerDown);
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerup", onPointerUp);
    card.addEventListener("pointercancel", onPointerUp);
    card.addEventListener("dblclick", (e) => {
      e.preventDefault();
      card.classList.toggle("is-flipped");
      card.style.zIndex = String(++zTop);
    });
  });

  document.getElementById("cardsStack")?.addEventListener("click", () => {
    cards.forEach((card, i) => {
      place(card, 28 + i * 1.4, 32 + i * 1.6, (i - 1.5) * 2.5, true);
      card.style.zIndex = String(10 + i);
      card.classList.remove("is-flipped");
    });
  });

  document.getElementById("cardsScatter")?.addEventListener("click", () => {
    const spots = [
      [6, 12, -7],
      [52, 14, 6],
      [10, 54, 5],
      [48, 56, -4],
    ];
    cards.forEach((card, i) => {
      const [x, y, r] = spots[i % spots.length];
      place(card, x + Math.random() * 8, y + Math.random() * 8, r, true);
      card.style.zIndex = String(10 + i);
    });
  });

  document.getElementById("cardsReset")?.addEventListener("click", () => {
    const home = [
      [12, 14, -4],
      [48, 28, 3],
      [22, 58, 5],
      [58, 62, -2],
    ];
    cards.forEach((card, i) => {
      const [x, y, r] = home[i] || [20, 20, 0];
      place(card, x, y, r, true);
      card.classList.remove("is-flipped");
      card.style.zIndex = String(10 + i);
    });
  });

  // scroll reveals for sections
  const toReveal = document.querySelectorAll(
    ".seg-card, .cap-grid article, .contact-shell, .section-head"
  );
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    toReveal.forEach((el, i) => {
      el.classList.add("will-reveal");
      el.style.setProperty("--delay", `${(i % 3) * 0.07}s`);
      io.observe(el);
    });
  }
})();
