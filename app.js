const HOTELS = {
  TR: [
    { name: "Rixos Premium Belek", stars: 5, meal: "AI", resort: "Белек" },
    { name: "Crystal Waterworld", stars: 5, meal: "UAI", resort: "Белек" },
    { name: "Orange County Alanya", stars: 5, meal: "AI", resort: "Аланья" },
    { name: "Sueno Hotels Beach Side", stars: 5, meal: "AI", resort: "Сиде" },
  ],
  EG: [
    { name: "Rixos Sharm El Sheikh", stars: 5, meal: "AI", resort: "Шарм" },
    { name: "Steigenberger Alcazar", stars: 5, meal: "AI", resort: "Хургада" },
    { name: "Pickalbatros Palace", stars: 5, meal: "AI", resort: "Хургада" },
  ],
  AE: [
    { name: "Rixos The Palm Dubai", stars: 5, meal: "BB", resort: "Дубай" },
    { name: "Atlantis The Palm", stars: 5, meal: "BB", resort: "Дубай" },
    { name: "Hilton Dubai Jumeirah", stars: 5, meal: "HB", resort: "Дубай" },
  ],
  TH: [
    { name: "Kata Rocks", stars: 5, meal: "BB", resort: "Пхукет" },
    { name: "Centara Grand Mirage", stars: 5, meal: "AI", resort: "Паттайя" },
    { name: "Anantara Mai Khao", stars: 5, meal: "BB", resort: "Пхукет" },
  ],
};

const OPERATORS = ["PEGAS", "Anex", "Coral", "Tez Tour", "FUN&SUN", "Intourist"];

const COUNTRY = { TR: "Турция", EG: "Египет", AE: "ОАЭ", TH: "Таиланд" };
const CITY = { MOW: "Москва", LED: "СПб", KZN: "Казань", SVX: "Екатеринбург" };

function setDefaultDate() {
  const input = document.querySelector('[name="dateFrom"]');
  const d = new Date();
  d.setDate(d.getDate() + 21);
  input.value = d.toISOString().slice(0, 10);
}

function rub(n) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

function mockSearch(params) {
  const hotels = HOTELS[params.to] || HOTELS.TR;
  return hotels.map((h, i) => {
    const base = 89000 + i * 18500 + Number(params.nights) * 4200;
    const adults = Number(params.adults);
    const price = Math.round(base * (adults / 2) * (0.92 + Math.random() * 0.16));
    return {
      id: `AND-${params.to}-${i + 1}`,
      hotel: h.name,
      stars: h.stars,
      meal: h.meal,
      resort: h.resort,
      country: COUNTRY[params.to],
      from: CITY[params.from],
      nights: params.nights,
      dateFrom: params.dateFrom,
      operator: OPERATORS[i % OPERATORS.length],
      price,
      external: true,
    };
  });
}

function buildTrace(params) {
  return {
    method: "GET_PRICE_FOR_AGENT",
    via: "andromeda-proxy",
    params: {
      STATEINC: params.to,
      TOWNFROMINC: params.from,
      CHECKIN_BEG: params.dateFrom.replaceAll("-", ""),
      NIGHTS_FROM: Number(params.nights),
      NIGHTS_TILL: Number(params.nights),
      ADULT: Number(params.adults),
      CHILD: 0,
      FILTER: 0,
    },
    note: "Подпись и ключи агента на бэкенде; фронт получает нормализованный JSON",
  };
}

function renderResults(items) {
  const root = document.getElementById("results");
  if (!items.length) {
    root.innerHTML = '<div class="empty">По этим параметрам предложений нет</div>';
    return;
  }

  root.innerHTML = items
    .map(
      (t, idx) => `
      <article class="result" style="animation-delay:${idx * 0.06}s">
        <div class="result-main">
          <h4>${t.hotel} <span class="badge">${"★".repeat(t.stars)}</span></h4>
          <div class="result-meta">
            <span>${t.from} → ${t.resort}, ${t.country}</span>
            <span>${t.nights} ночей · вылет ${t.dateFrom}</span>
            <span>питание ${t.meal}</span>
            <span class="badge">${t.operator}</span>
            ${t.external ? '<span class="badge">external</span>' : ""}
          </div>
        </div>
        <div class="result-price">
          <span class="amount">${rub(t.price)}</span>
          <span class="note">за номер · актуализация перед бронью</span>
        </div>
      </article>`
    )
    .join("");
}

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const params = Object.fromEntries(fd.entries());

  const trace = document.getElementById("apiTrace");
  const traceBody = document.getElementById("traceBody");
  const results = document.getElementById("results");

  trace.hidden = false;
  traceBody.textContent = JSON.stringify(buildTrace(params), null, 2);
  results.innerHTML = '<div class="loading">Запрос в Andromeda…</div>';

  await new Promise((r) => setTimeout(r, 650 + Math.random() * 500));
  renderResults(mockSearch(params));
});

setDefaultDate();
