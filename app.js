const DEST = {
  15: {
    name: "Турция",
    hotels: [
      { name: "Rixos Premium Belek", stars: 5, meal: "AI", resort: "Белек", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=70" },
      { name: "Crystal Waterworld", stars: 5, meal: "UAI", resort: "Белек", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=70" },
      { name: "Orange County Alanya", stars: 5, meal: "AI", resort: "Аланья", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=70" },
      { name: "Sueno Hotels Beach Side", stars: 5, meal: "AI", resort: "Сиде", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=70" },
    ],
  },
  23: {
    name: "Египет",
    hotels: [
      { name: "Rixos Sharm El Sheikh", stars: 5, meal: "AI", resort: "Шарм-эль-Шейх", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=70" },
      { name: "Steigenberger Alcazar", stars: 5, meal: "AI", resort: "Хургада", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=70" },
      { name: "Pickalbatros Palace", stars: 5, meal: "AI", resort: "Хургада", img: "https://images.unsplash.com/photo-1610641818989-c2051b5e2fcb?auto=format&fit=crop&w=400&q=70" },
    ],
  },
  41: {
    name: "ОАЭ",
    hotels: [
      { name: "Rixos The Palm Dubai", stars: 5, meal: "BB", resort: "Дубай", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=70" },
      { name: "Atlantis The Palm", stars: 5, meal: "BB", resort: "Дубай", img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=400&q=70" },
      { name: "Hilton Dubai Jumeirah", stars: 5, meal: "HB", resort: "Дубай", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=70" },
    ],
  },
  58: {
    name: "Таиланд",
    hotels: [
      { name: "Kata Rocks", stars: 5, meal: "BB", resort: "Пхукет", img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=400&q=70" },
      { name: "Centara Grand Mirage", stars: 5, meal: "AI", resort: "Паттайя", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=70" },
      { name: "Anantara Mai Khao", stars: 5, meal: "BB", resort: "Пхукет", img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=70" },
    ],
  },
};

const TOWNS = {
  1: "Москва",
  5: "Санкт-Петербург",
  9: "Казань",
  12: "Екатеринбург",
};

const OPS = ["PEGAS", "Anex", "Coral Travel", "TEZ TOUR", "FUN&SUN", "Intourist"];

function setDefaultDate() {
  const input = document.querySelector('[name="dateFrom"]');
  const d = new Date();
  d.setDate(d.getDate() + 21);
  input.valueAsDate = d;
}

function rub(n) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

function buildTrace(params) {
  return {
    method: "GET_PRICE_FOR_AGENT",
    params: {
      STATEINC: Number(params.to),
      TOWNFROMINC: Number(params.from),
      CHECKIN_BEG: params.dateFrom.replaceAll("-", ""),
      NIGHTS_FROM: Number(params.nights),
      NIGHTS_TILL: Number(params.nights),
      ADULT: Number(params.adults),
      CHILD: 0,
      FILTER: 0,
    },
  };
}

function mockSearch(params) {
  const dest = DEST[params.to] || DEST[15];
  const fromName = TOWNS[params.from] || "Москва";
  return dest.hotels.map((h, i) => {
    const base = 89000 + i * 18500 + Number(params.nights) * 4200;
    const adults = Number(params.adults);
    const price = Math.round(base * (adults / 2) * (0.94 + Math.random() * 0.12));
    return {
      hotel: h.name,
      stars: h.stars,
      meal: h.meal,
      resort: h.resort,
      img: h.img,
      country: dest.name,
      from: fromName,
      nights: params.nights,
      dateFrom: params.dateFrom,
      operator: OPS[i % OPS.length],
      price,
    };
  });
}

function renderResults(items, params) {
  const root = document.getElementById("results");
  const head = document.getElementById("resultsHead");
  const dest = DEST[params.to];
  head.hidden = false;
  document.getElementById("boardTitle").textContent = `${items.length} предложений`;
  document.getElementById("boardMeta").textContent = `${TOWNS[params.from]} → ${dest?.name || ""} · ${params.nights} ночей`;

  root.innerHTML = items
    .map(
      (t, idx) => `
      <article class="card" style="animation-delay:${idx * 0.05}s">
        <img class="thumb" src="${t.img}" alt="" loading="lazy" />
        <div>
          <h3>${t.hotel} <span class="stars">${"★".repeat(t.stars)}</span></h3>
          <div class="meta">
            <span>${t.resort}</span>
            <span>вылет ${t.dateFrom}</span>
            <span>${t.meal}</span>
            <span class="chip">${t.operator}</span>
          </div>
        </div>
        <div class="price">
          <div>
            <b>${rub(t.price)}</b>
            <small>за номер</small>
          </div>
          <button type="button" class="book">Выбрать</button>
        </div>
      </article>`
    )
    .join("");
}

function seedSampleTrace() {
  const sample = {
    from: "1",
    to: "15",
    dateFrom: document.querySelector('[name="dateFrom"]').value,
    nights: "10",
    adults: "2",
  };
  document.getElementById("sampleTrace").textContent = JSON.stringify(buildTrace(sample), null, 2);
}

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const params = Object.fromEntries(new FormData(e.target).entries());
  const results = document.getElementById("results");
  document.getElementById("resultsHead").hidden = false;
  results.innerHTML = '<div class="wait">Подбираем предложения…</div>';
  document.getElementById("sampleTrace").textContent = JSON.stringify(buildTrace(params), null, 2);

  await new Promise((r) => setTimeout(r, 520 + Math.random() * 380));
  renderResults(mockSearch(params), params);
});

window.addEventListener("scroll", () => {
  document.querySelector(".bar").classList.toggle("is-solid", window.scrollY > 8);
});

setDefaultDate();
seedSampleTrace();

// стартовая выдача — сразу «живой» продукт, не пустая демка
document.getElementById("searchForm").requestSubmit();
