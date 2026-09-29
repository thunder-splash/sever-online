const DEST = {
  15: {
    name: "Турция",
    hotels: [
      { name: "Rixos Premium Belek", stars: 5, meal: "AI", resort: "Белек" },
      { name: "Crystal Waterworld", stars: 5, meal: "UAI", resort: "Белек" },
      { name: "Orange County Alanya", stars: 5, meal: "AI", resort: "Аланья" },
      { name: "Sueno Hotels Beach Side", stars: 5, meal: "AI", resort: "Сиде" },
    ],
  },
  23: {
    name: "Египет",
    hotels: [
      { name: "Rixos Sharm El Sheikh", stars: 5, meal: "AI", resort: "Шарм-эль-Шейх" },
      { name: "Steigenberger Alcazar", stars: 5, meal: "AI", resort: "Хургада" },
      { name: "Pickalbatros Palace", stars: 5, meal: "AI", resort: "Хургада" },
    ],
  },
  41: {
    name: "ОАЭ",
    hotels: [
      { name: "Rixos The Palm Dubai", stars: 5, meal: "BB", resort: "Дубай" },
      { name: "Atlantis The Palm", stars: 5, meal: "BB", resort: "Дубай" },
      { name: "Hilton Dubai Jumeirah", stars: 5, meal: "HB", resort: "Дубай" },
    ],
  },
  58: {
    name: "Таиланд",
    hotels: [
      { name: "Kata Rocks", stars: 5, meal: "BB", resort: "Пхукет" },
      { name: "Centara Grand Mirage", stars: 5, meal: "AI", resort: "Паттайя" },
      { name: "Anantara Mai Khao", stars: 5, meal: "BB", resort: "Пхукет" },
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
      country: dest.name,
      from: fromName,
      nights: params.nights,
      dateFrom: params.dateFrom,
      operator: OPS[i % OPS.length],
      price,
      external: i % 2 === 0,
    };
  });
}

function renderResults(items, params) {
  const root = document.getElementById("results");
  const title = document.getElementById("boardTitle");
  const dest = DEST[params.to];
  title.textContent = `${items.length} вариантов · ${TOWNS[params.from]} → ${dest?.name || ""}`;

  if (!items.length) {
    root.innerHTML = '<div class="void">Ничего не нашли по этим параметрам</div>';
    return;
  }

  root.innerHTML = items
    .map(
      (t, idx) => `
      <article class="card" style="animation-delay:${idx * 0.05}s">
        <div>
          <h3>${t.hotel}</h3>
          <div class="meta">
            <span>${t.from} → ${t.resort}</span>
            <span>${t.nights} н. · ${t.dateFrom}</span>
            <span>${t.meal}</span>
            <span class="chip">${t.operator}</span>
            ${t.external ? '<span class="chip">external</span>' : ""}
          </div>
        </div>
        <div class="price">
          <b>${rub(t.price)}</b>
          <small>за номер</small>
        </div>
      </article>`
    )
    .join("");
}

const form = document.getElementById("searchForm");
const board = document.getElementById("board");
const rawToggle = document.getElementById("rawToggle");
const apiTrace = document.getElementById("apiTrace");

rawToggle.addEventListener("click", () => {
  apiTrace.hidden = !apiTrace.hidden;
  rawToggle.textContent = apiTrace.hidden ? "запрос API" : "скрыть запрос";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const params = Object.fromEntries(new FormData(e.target).entries());

  board.hidden = false;
  rawToggle.hidden = false;
  apiTrace.hidden = true;
  rawToggle.textContent = "запрос API";
  document.getElementById("traceBody").textContent = JSON.stringify(buildTrace(params), null, 2);
  document.getElementById("results").innerHTML = '<div class="wait">Ищем…</div>';
  board.scrollIntoView({ behavior: "smooth", block: "start" });

  await new Promise((r) => setTimeout(r, 480 + Math.random() * 420));
  renderResults(mockSearch(params), params);
});

setDefaultDate();
