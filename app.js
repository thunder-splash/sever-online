const TOWNS = [
  { id: 1, name: "Москва", code: "SVO", aliases: ["мск", "moscow", "svo"] },
  { id: 5, name: "Санкт-Петербург", code: "LED", aliases: ["спб", "питер", "петербург", "led"] },
  { id: 9, name: "Казань", code: "KZN", aliases: ["kzn"] },
  { id: 12, name: "Екатеринбург", code: "SVX", aliases: ["ебург", "екб", "svx"] },
  { id: 18, name: "Новосибирск", code: "OVB", aliases: ["нск", "ovb"] },
  { id: 21, name: "Самара", code: "KUF", aliases: ["kuf"] },
  { id: 27, name: "Краснодар", code: "KRR", aliases: ["krr"] },
  { id: 33, name: "Сочи", code: "AER", aliases: ["адлер", "aer"] },
];

const DEST = {
  15: {
    name: "Турция",
    iata: "AYT",
    aliases: ["turkey", "турция", "анталия"],
    resorts: ["Белек", "Аланья", "Сиде", "Кемер", "Анталья"],
    hotels: [
      { name: "Rixos Premium Belek", stars: 5, meal: "AI", resort: "Белек", beach: "1 линия", rating: 9.2 },
      { name: "Crystal Waterworld", stars: 5, meal: "UAI", resort: "Белек", beach: "1 линия", rating: 8.9 },
      { name: "Orange County Alanya", stars: 5, meal: "AI", resort: "Аланья", beach: "2 линия", rating: 8.7 },
      { name: "Sueno Hotels Beach Side", stars: 4, meal: "AI", resort: "Сиде", beach: "1 линия", rating: 8.4 },
      { name: "Selectum Family Resort", stars: 5, meal: "UAI", resort: "Белек", beach: "1 линия", rating: 9.0 },
      { name: "Sunmelia Beach Resort", stars: 4, meal: "HB", resort: "Кемер", beach: "2 линия", rating: 8.1 },
      { name: "Granada Luxury Belek", stars: 5, meal: "UAI", resort: "Белек", beach: "1 линия", rating: 8.8 },
      { name: "Kirman Leodikya Resort", stars: 5, meal: "AI", resort: "Аланья", beach: "1 линия", rating: 8.6 },
    ],
  },
  23: {
    name: "Египет",
    iata: "HRG",
    aliases: ["egypt", "египет", "хургада", "шарм"],
    resorts: ["Хургада", "Шарм-эль-Шейх"],
    hotels: [
      { name: "Rixos Sharm El Sheikh", stars: 5, meal: "AI", resort: "Шарм-эль-Шейх", beach: "1 линия", rating: 9.1 },
      { name: "Steigenberger Alcazar", stars: 5, meal: "AI", resort: "Хургада", beach: "1 линия", rating: 8.8 },
      { name: "Pickalbatros Palace", stars: 5, meal: "AI", resort: "Хургада", beach: "1 линия", rating: 8.5 },
      { name: "Jaz Mirabel Beach", stars: 5, meal: "AI", resort: "Шарм-эль-Шейх", beach: "1 линия", rating: 8.7 },
      { name: "Sunrise Holidays Resort", stars: 5, meal: "AI", resort: "Хургада", beach: "2 линия", rating: 8.3 },
    ],
  },
  41: {
    name: "ОАЭ",
    iata: "DXB",
    aliases: ["uae", "оаэ", "дубай", "dubai"],
    resorts: ["Дубай", "Абу-Даби"],
    hotels: [
      { name: "Rixos The Palm Dubai", stars: 5, meal: "BB", resort: "Дубай", beach: "Palm", rating: 9.3 },
      { name: "Atlantis The Palm", stars: 5, meal: "BB", resort: "Дубай", beach: "Palm", rating: 9.0 },
      { name: "Hilton Dubai Jumeirah", stars: 5, meal: "HB", resort: "Дубай", beach: "JBR", rating: 8.6 },
      { name: "Address Beach Resort", stars: 5, meal: "BB", resort: "Дубай", beach: "JBR", rating: 9.1 },
      { name: "Rixos Marina Abu Dhabi", stars: 5, meal: "BB", resort: "Абу-Даби", beach: "Marina", rating: 8.8 },
    ],
  },
  58: {
    name: "Таиланд",
    iata: "HKT",
    aliases: ["thailand", "таиланд", "пхукет", "паттайя"],
    resorts: ["Пхукет", "Паттайя", "Самуи"],
    hotels: [
      { name: "Kata Rocks", stars: 5, meal: "BB", resort: "Пхукет", beach: "Kata", rating: 9.2 },
      { name: "Centara Grand Mirage", stars: 5, meal: "AI", resort: "Паттайя", beach: "1 линия", rating: 8.7 },
      { name: "Anantara Mai Khao", stars: 5, meal: "BB", resort: "Пхукет", beach: "Mai Khao", rating: 9.0 },
      { name: "Marriott Resort Pattaya", stars: 5, meal: "BB", resort: "Паттайя", beach: "1 линия", rating: 8.5 },
      { name: "Conrad Koh Samui", stars: 5, meal: "BB", resort: "Самуи", beach: "private", rating: 9.1 },
    ],
  },
  71: {
    name: "Мальдивы",
    iata: "MLE",
    aliases: ["maldives", "мальдивы"],
    resorts: ["Мале", "Северные атоллы"],
    hotels: [
      { name: "Kurumba Maldives", stars: 5, meal: "BB", resort: "Мале", beach: "lagoon", rating: 9.0 },
      { name: "Adaaran Select Meedhupparu", stars: 4, meal: "AI", resort: "Северные атоллы", beach: "reef", rating: 8.4 },
      { name: "Sun Siyam Iru Fushi", stars: 5, meal: "AI", resort: "Северные атоллы", beach: "lagoon", rating: 8.9 },
    ],
  },
};

const OPS = ["PEGAS", "Anex", "Coral Travel", "TEZ TOUR", "FUN&SUN", "Intourist"];
const AIRLINES = ["Aeroflot", "S7", "Pobeda", "Ural Airlines", "Azur Air"];
const QUICK = [
  { label: "Москва → Турция", from: 1, to: 15 },
  { label: "СПб → Египет", from: 5, to: 23 },
  { label: "Казань → Дубай", from: 9, to: 41 },
  { label: "Белек", from: 1, to: 15, hotelHint: "Белек" },
];

const state = {
  params: null,
  results: [],
  selected: null,
  flightIdx: 0,
  extras: { transfer: true, insurance: false, visa: false },
  quotedPrice: null,
  meal: "all",
  sort: "price",
  groupByResort: true,
  perPerson: false,
  compare: [],
  favs: new Set(JSON.parse(localStorage.getItem("sever-favs") || "[]")),
  order: null,
  orders: loadOrders(),
};

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem("sever-orders") || "[]");
  } catch {
    return [];
  }
}

function saveOrders() {
  localStorage.setItem("sever-orders", JSON.stringify(state.orders.slice(0, 20)));
}

function saveFavs() {
  localStorage.setItem("sever-favs", JSON.stringify([...state.favs]));
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function rub(n) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " ₽";
}

function uid() {
  return "SV-" + Math.floor(100000 + Math.random() * 899999);
}

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .trim();
}

function setDefaultDate() {
  const input = document.querySelector('[name="dateFrom"]');
  const d = new Date();
  d.setDate(d.getDate() + 21);
  input.valueAsDate = d;
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

function makeFlights(fromCode, toCode, dateFrom, nights) {
  const back = new Date(dateFrom);
  back.setDate(back.getDate() + Number(nights));
  const backStr = back.toISOString().slice(0, 10);
  return [0, 1, 2].map((i) => {
    const depH = 8 + i * 4;
    const dur = 4 + (i % 2);
    return {
      id: `FL-${i}`,
      airline: AIRLINES[i % AIRLINES.length],
      outbound: `${fromCode} ${String(depH).padStart(2, "0")}:40 → ${toCode} ${String(depH + dur).padStart(2, "0")}:10`,
      inbound: `${toCode} ${String(11 + i * 3).padStart(2, "0")}:20 → ${fromCode} ${String(15 + i * 3).padStart(2, "0")}:55`,
      dates: `${dateFrom} / ${backStr}`,
      delta: i === 0 ? 0 : i === 1 ? 6200 : -3800,
      note: i === 2 ? "1 пересадка" : "прямой",
    };
  });
}

function mockSearch(params) {
  const dest = DEST[params.to];
  const town = TOWNS.find((t) => t.id === Number(params.from));
  let hotels = [...dest.hotels];
  const hint = norm(params.hotelHint);
  if (hint) {
    const filtered = hotels.filter(
      (h) => norm(h.name).includes(hint) || norm(h.resort).includes(hint)
    );
    if (filtered.length) hotels = filtered;
  }
  // несколько операторов на часть отелей — как в реальной выдаче
  const rows = [];
  hotels.forEach((h, i) => {
    const opCount = 1 + (i % 3 === 0 ? 1 : 0);
    for (let o = 0; o < opCount; o++) {
      const base = 72000 + i * 14800 + o * 9200 + Number(params.nights) * 3900 + h.stars * 4200;
      const adults = Number(params.adults);
      const price = Math.round(base * (adults / 2) * (0.95 + ((i * 17 + o * 9) % 10) / 100));
      rows.push({
        id: `T-${params.to}-${i}-${o}`,
        hotel: h.name,
        stars: h.stars,
        meal: h.meal,
        resort: h.resort,
        beach: h.beach,
        rating: h.rating,
        country: dest.name,
        from: town.name,
        fromCode: town.code,
        toCode: dest.iata,
        nights: Number(params.nights),
        dateFrom: params.dateFrom,
        adults,
        operator: OPS[(i + o) % OPS.length],
        price,
        oldPrice: o === 1 ? Math.round(price * 1.08) : null,
        room: o === 0 ? "Standard Room" : "Deluxe Sea View",
        services: ["перелёт", "проживание", h.meal, "мед. страховка"],
        flights: makeFlights(town.code, dest.iata, params.dateFrom, params.nights),
      });
    }
  });
  return rows;
}

function displayPrice(tour) {
  return state.perPerson ? tour.price / tour.adults : tour.price;
}

function currentPrice(tour) {
  const flight = tour.flights[state.flightIdx] || tour.flights[0];
  let total = tour.price + flight.delta;
  if (state.extras.transfer) total += 4500 * tour.adults;
  if (state.extras.insurance) total += 1900 * tour.adults;
  if (state.extras.visa) total += 7800 * tour.adults;
  return total;
}

function showView(name) {
  ["search", "detail", "book", "order", "desk", "compare"].forEach((v) => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.hidden = v !== name;
  });
  const map = {
    search: "sever.travel / search",
    detail: "sever.travel / tour",
    book: "sever.travel / booking",
    order: "sever.travel / order",
    desk: "sever.travel / desk",
    compare: "sever.travel / compare",
  };
  document.getElementById("chromeUrl").textContent = map[name];
  document.getElementById("product").scrollIntoView({ behavior: "smooth", block: "start" });
  renderCompareBar();
}

function scoreMatch(query, text, aliases = []) {
  const q = norm(query);
  if (!q) return 1;
  const bag = [text, ...aliases].map(norm);
  if (bag.some((x) => x.startsWith(q))) return 3;
  if (bag.some((x) => x.includes(q))) return 2;
  return 0;
}

function searchFrom(query) {
  return TOWNS.map((t) => ({
    score: scoreMatch(query, t.name, t.aliases),
    id: t.id,
    title: t.name,
    meta: t.code,
    type: "city",
  }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "ru"))
    .slice(0, 8);
}

function searchTo(query) {
  const out = [];
  Object.entries(DEST).forEach(([id, d]) => {
    const countryScore = scoreMatch(query, d.name, d.aliases);
    if (countryScore) out.push({ score: countryScore + 0.5, id: Number(id), title: d.name, meta: "страна", type: "country", hotelHint: "" });
    d.resorts.forEach((r) => {
      const s = scoreMatch(query, r, d.aliases);
      if (s) out.push({ score: s, id: Number(id), title: r, meta: d.name, type: "resort", hotelHint: r });
    });
    d.hotels.forEach((h) => {
      const s = scoreMatch(query, h.name, [h.resort, d.name]);
      if (s) out.push({ score: s - 0.1, id: Number(id), title: h.name, meta: `${h.resort} · ${d.name}`, type: "hotel", hotelHint: h.name });
    });
  });
  return out
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "ru"))
    .slice(0, 10);
}

function bindAutocomplete({ input, list, hiddenId, hiddenHint, searcher }) {
  let items = [];
  let active = -1;

  function render() {
    if (!items.length) {
      list.hidden = true;
      list.innerHTML = "";
      return;
    }
    list.hidden = false;
    list.innerHTML = items
      .map(
        (it, i) => `
      <li class="ac-item ${i === active ? "is-active" : ""}" data-idx="${i}">
        <strong>${it.title}</strong>
        <span>${it.meta}${it.type === "hotel" ? " · отель" : it.type === "resort" ? " · курорт" : ""}</span>
      </li>`
      )
      .join("");
  }

  function pick(idx) {
    const it = items[idx];
    if (!it) return;
    input.value = it.title;
    hiddenId.value = it.id;
    if (hiddenHint) hiddenHint.value = it.hotelHint || "";
    list.hidden = true;
    items = [];
    active = -1;
  }

  input.addEventListener("input", () => {
    hiddenId.value = "";
    if (hiddenHint) hiddenHint.value = "";
    items = searcher(input.value);
    active = items.length ? 0 : -1;
    render();
  });
  input.addEventListener("focus", () => {
    items = searcher(input.value || "");
    active = 0;
    render();
  });
  input.addEventListener("keydown", (e) => {
    if (list.hidden) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      active = (active + 1) % items.length;
      render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      active = (active - 1 + items.length) % items.length;
      render();
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      pick(active);
    } else if (e.key === "Escape") list.hidden = true;
  });
  list.addEventListener("mousedown", (e) => {
    const li = e.target.closest("[data-idx]");
    if (!li) return;
    e.preventDefault();
    pick(Number(li.dataset.idx));
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".ac")) list.hidden = true;
  });
}

function setFrom(id) {
  const t = TOWNS.find((x) => x.id === id);
  if (!t) return;
  document.getElementById("fromInput").value = t.name;
  document.getElementById("fromId").value = t.id;
}

function setTo(id, title, hotelHint = "") {
  const d = DEST[id];
  if (!d) return;
  document.getElementById("toInput").value = title || d.name;
  document.getElementById("toId").value = id;
  document.getElementById("hotelHint").value = hotelHint || "";
}

function renderSuggests() {
  document.getElementById("suggestRow").innerHTML = QUICK.map(
    (q) => `<button type="button" class="suggest" data-quick='${JSON.stringify(q)}'>${q.label}</button>`
  ).join("");
  document.querySelectorAll("[data-quick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const q = JSON.parse(btn.dataset.quick);
      setFrom(q.from);
      setTo(q.to, q.hotelHint || DEST[q.to].name, q.hotelHint || "");
      document.getElementById("searchForm").requestSubmit();
    });
  });
}

function filteredResults() {
  let items = [...state.results];
  if (state.meal !== "all") items = items.filter((t) => t.meal === state.meal);
  if (state.sort === "price") items.sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") items.sort((a, b) => b.price - a.price);
  if (state.sort === "stars") items.sort((a, b) => b.stars - a.stars || a.price - b.price);
  if (state.sort === "ops") items.sort((a, b) => a.operator.localeCompare(b.operator, "ru") || a.price - b.price);
  if (state.sort === "rating") items.sort((a, b) => b.rating - a.rating || a.price - b.price);
  return items;
}

function cardHtml(t, idx) {
  const fav = state.favs.has(t.id);
  const compared = state.compare.includes(t.id);
  const price = displayPrice(t);
  const priceNote = state.perPerson ? "с человека" : "за номер";
  return `
    <article class="offer" style="animation-delay:${idx * 0.03}s">
      <div class="offer-body">
        <div class="offer-title">
          <button type="button" class="fav-inline ${fav ? "is-on" : ""}" data-fav="${t.id}" aria-label="В избранное">${fav ? "★" : "☆"}</button>
          <h3>${t.hotel}</h3>
          <span class="stars">${"★".repeat(t.stars)}</span>
          <span class="rating-inline">${t.rating.toFixed(1)}</span>
        </div>
        <div class="offer-line">
          <span>${t.resort}</span>
          <span class="dot-sep">·</span>
          <span>${t.beach}</span>
          <span class="dot-sep">·</span>
          <span>${t.nights} ночей</span>
          <span class="dot-sep">·</span>
          <span>${formatDate(t.dateFrom)}</span>
        </div>
        <div class="offer-tags">
          <span class="tag meal">${t.meal}</span>
          <span class="tag">${t.operator}</span>
          <span class="tag ghost">${t.room}</span>
          <span class="tag ghost">${t.flights[0].note}</span>
        </div>
      </div>
      <div class="offer-side">
        ${t.oldPrice ? `<span class="old">${rub(state.perPerson ? t.oldPrice / t.adults : t.oldPrice)}</span>` : ""}
        <div class="offer-price">${rub(price)}</div>
        <div class="offer-note">${priceNote}</div>
        <div class="offer-actions">
          <button type="button" class="linkish" data-open="${t.id}">Подробнее</button>
          <button type="button" class="mini ${compared ? "is-on" : ""}" data-compare="${t.id}">${compared ? "В сравнении" : "Сравнить"}</button>
        </div>
      </div>
    </article>`;
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function renderResults() {
  const items = filteredResults();
  const root = document.getElementById("results");
  const p = state.params;
  const town = TOWNS.find((t) => t.id === Number(p.from));
  document.getElementById("toolbar").hidden = false;
  document.getElementById("boardTitle").textContent = `${items.length} предложений`;
  document.getElementById("boardMeta").textContent = `${town.name} → ${DEST[p.to].name} · ${p.nights} ночей · ${p.adults} взр.`;

  if (!items.length) {
    root.innerHTML = '<div class="hint">Пусто по фильтру — нажми «Все»</div>';
    renderCompareBar();
    return;
  }

  if (state.groupByResort) {
    const groups = {};
    items.forEach((t) => {
      (groups[t.resort] ||= []).push(t);
    });
    root.innerHTML = Object.entries(groups)
      .map(([resort, rows]) => {
        const min = Math.min(...rows.map((r) => displayPrice(r)));
        return `
          <section class="resort-block">
            <div class="resort-head">
              <h3>${resort}</h3>
              <span>от ${rub(min)} · ${rows.length} вар.</span>
            </div>
            <div class="offer-list">${rows.map((t, i) => cardHtml(t, i)).join("")}</div>
          </section>`;
      })
      .join("");
  } else {
    root.innerHTML = `<div class="offer-list">${items.map((t, i) => cardHtml(t, i)).join("")}</div>`;
  }

  root.querySelectorAll("[data-open]").forEach((btn) => btn.addEventListener("click", () => openDetail(btn.dataset.open)));
  root.querySelectorAll("[data-fav]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFav(btn.dataset.fav);
    })
  );
  root.querySelectorAll("[data-compare]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCompare(btn.dataset.compare);
    })
  );
  renderCompareBar();
}

function toggleFav(id) {
  if (state.favs.has(id)) state.favs.delete(id);
  else state.favs.add(id);
  saveFavs();
  renderResults();
}

function toggleCompare(id) {
  if (state.compare.includes(id)) state.compare = state.compare.filter((x) => x !== id);
  else if (state.compare.length < 3) state.compare.push(id);
  renderResults();
}

function renderCompareBar() {
  let bar = document.getElementById("compareBar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "compareBar";
    bar.className = "compare-bar";
    document.getElementById("app").appendChild(bar);
  }
  if (!state.compare.length || document.getElementById("view-search").hidden === false && false) {
    /* keep visible on search mostly */
  }
  if (!state.compare.length) {
    bar.hidden = true;
    return;
  }
  const tours = state.compare.map((id) => state.results.find((t) => t.id === id)).filter(Boolean);
  bar.hidden = false;
  bar.innerHTML = `
    <div class="compare-bar-in">
      <span>Сравнение · ${tours.length}/3</span>
      <div class="compare-pills">${tours.map((t) => `<em>${t.hotel.split(" ").slice(0, 2).join(" ")}</em>`).join("")}</div>
      <button type="button" class="go" id="openCompare">Сравнить</button>
      <button type="button" class="ghost-btn" id="clearCompare">Сбросить</button>
    </div>`;
  bar.querySelector("#openCompare").addEventListener("click", renderCompare);
  bar.querySelector("#clearCompare").addEventListener("click", () => {
    state.compare = [];
    renderResults();
  });
}

function renderCompare() {
  const tours = state.compare.map((id) => state.results.find((t) => t.id === id)).filter(Boolean);
  showView("compare");
  const box = document.getElementById("view-compare");
    box.innerHTML = `
    <button type="button" class="back" id="cmpBack">← к результатам</button>
    <div class="cmp-grid" style="--cols:${tours.length}">
      ${tours
        .map(
          (t) => `
        <article class="cmp-card">
          <h3>${t.hotel}</h3>
          <ul>
            <li><span>Курорт</span><b>${t.resort}</b></li>
            <li><span>Питание</span><b>${t.meal}</b></li>
            <li><span>Оператор</span><b>${t.operator}</b></li>
            <li><span>Рейтинг</span><b>${t.rating}</b></li>
            <li><span>Номер</span><b>${t.room}</b></li>
            <li><span>Цена</span><b>${rub(t.price)}</b></li>
          </ul>
          <button type="button" class="go" data-open="${t.id}">Выбрать</button>
        </article>`
        )
        .join("")}
    </div>`;
  box.querySelector("#cmpBack").addEventListener("click", () => showView("search"));
  box.querySelectorAll("[data-open]").forEach((btn) => btn.addEventListener("click", () => openDetail(btn.dataset.open)));
}

async function openDetail(id) {
  state.selected = state.results.find((t) => t.id === id);
  state.flightIdx = 0;
  state.extras = { transfer: true, insurance: false, visa: false };
  state.quotedPrice = state.selected.price;
  showView("detail");
  const box = document.getElementById("view-detail");
  box.innerHTML = '<div class="wait">Актуализируем цену у туроператора…</div>';
  await sleep(450 + Math.random() * 450);
  state.selected.price = Math.round(state.selected.price * (0.97 + Math.random() * 0.08));
  renderDetail();
}

function renderDetail() {
  const t = state.selected;
  const price = currentPrice(t);
  const changed = state.quotedPrice && Math.abs(t.price - state.quotedPrice) > 50;
  const box = document.getElementById("view-detail");
  box.innerHTML = `
    <button type="button" class="back" id="backSearch">← к результатам</button>
    ${changed ? `<div class="alert">Цена изменилась: было ${rub(state.quotedPrice)}, стало ${rub(t.price)}</div>` : ""}
    <div class="detail">
      <div class="detail-body detail-body-solo">
        <div class="detail-top">
          <div>
            <p class="chip">${t.operator}</p>
            <h2>${t.hotel}</h2>
            <p class="muted">${t.resort}, ${t.country} · ${"★".repeat(t.stars)} · рейтинг ${t.rating.toFixed(1)} · ${t.room} · ${t.beach}</p>
          </div>
          <div class="detail-price">
            <b>${rub(price)}</b>
            <small>актуальная</small>
          </div>
        </div>
        <div class="block">
          <h3>В пакете</h3>
          <ul class="tags">${t.services.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div class="block">
          <h3>Перелёт</h3>
          <div class="flights">
            ${t.flights
              .map(
                (f, i) => `
              <label class="flight ${state.flightIdx === i ? "is-on" : ""}">
                <input type="radio" name="flight" value="${i}" ${state.flightIdx === i ? "checked" : ""} />
                <div>
                  <strong>${f.airline}</strong> · ${f.note}
                  <span>${f.outbound}</span>
                  <span>${f.inbound}</span>
                  <span class="muted">${f.dates}</span>
                </div>
                <em>${f.delta === 0 ? "в цене" : f.delta > 0 ? "+" + rub(f.delta) : rub(f.delta)}</em>
              </label>`
              )
              .join("")}
          </div>
        </div>
        <div class="block">
          <h3>Допуслуги</h3>
          <div class="extras">
            <label><input type="checkbox" data-extra="transfer" ${state.extras.transfer ? "checked" : ""} /> Трансфер <span>+${rub(4500 * t.adults)}</span></label>
            <label><input type="checkbox" data-extra="insurance" ${state.extras.insurance ? "checked" : ""} /> Расширенная страховка <span>+${rub(1900 * t.adults)}</span></label>
            <label><input type="checkbox" data-extra="visa" ${state.extras.visa ? "checked" : ""} /> Визовая поддержка <span>+${rub(7800 * t.adults)}</span></label>
          </div>
        </div>
        <div class="detail-actions">
          <button type="button" class="ghost-btn" id="reprice">Ещё раз актуализировать</button>
          <button type="button" class="go" id="toBook">Забронировать · ${rub(price)}</button>
        </div>
      </div>
    </div>`;

  box.querySelector("#backSearch").addEventListener("click", () => showView("search"));
  box.querySelectorAll('input[name="flight"]').forEach((el) => {
    el.addEventListener("change", () => {
      state.flightIdx = Number(el.value);
      renderDetail();
    });
  });
  box.querySelectorAll("[data-extra]").forEach((el) => {
    el.addEventListener("change", () => {
      state.extras[el.dataset.extra] = el.checked;
      renderDetail();
    });
  });
  box.querySelector("#toBook").addEventListener("click", renderBook);
  box.querySelector("#reprice").addEventListener("click", async () => {
    state.quotedPrice = t.price;
    await sleep(350);
    t.price = Math.round(t.price * (0.985 + Math.random() * 0.04));
    renderDetail();
  });
}

function renderBook() {
  const t = state.selected;
  const price = currentPrice(t);
  showView("book");
  const box = document.getElementById("view-book");
  const adults = Array.from({ length: t.adults }, (_, i) => i + 1);
  box.innerHTML = `
    <button type="button" class="back" id="backDetail">← к туру</button>
    <div class="book-layout">
      <form id="bookForm" class="book-form">
        <h2>Оформление</h2>
        <p class="muted">${t.hotel} · ${t.nights} ночей · ${t.from} → ${t.country}</p>
        ${adults
          .map(
            (n) => `
          <fieldset>
            <legend>Турист ${n}</legend>
            <div class="grid2">
              <label>Фамилия <input name="last${n}" required placeholder="Иванов" /></label>
              <label>Имя <input name="first${n}" required placeholder="Иван" /></label>
              <label>Дата рождения <input name="birth${n}" type="date" required /></label>
              <label>Паспорт <input name="pass${n}" required placeholder="12 3456789" /></label>
            </div>
          </fieldset>`
          )
          .join("")}
        <fieldset>
          <legend>Контакт</legend>
          <div class="grid2">
            <label>Телефон <input name="phone" required placeholder="+7 900 000-00-00" /></label>
            <label>Email <input name="email" type="email" required placeholder="you@mail.ru" /></label>
          </div>
        </fieldset>
        <button type="submit" class="go">Отправить бронь · ${rub(price)}</button>
      </form>
      <aside class="summary">
        <h3>Итого</h3>
        <p>${t.hotel}</p>
        <p class="muted">${t.flights[state.flightIdx].airline} · ${t.flights[state.flightIdx].note}</p>
        <ul>
          <li>Пакет <span>${rub(t.price + t.flights[state.flightIdx].delta)}</span></li>
          ${state.extras.transfer ? `<li>Трансфер <span>${rub(4500 * t.adults)}</span></li>` : ""}
          ${state.extras.insurance ? `<li>Страховка <span>${rub(1900 * t.adults)}</span></li>` : ""}
          ${state.extras.visa ? `<li>Виза <span>${rub(7800 * t.adults)}</span></li>` : ""}
        </ul>
        <b>${rub(price)}</b>
      </aside>
    </div>`;
  box.querySelector("#backDetail").addEventListener("click", () => {
    showView("detail");
    renderDetail();
  });
  box.querySelector("#bookForm").addEventListener("submit", submitBook);
}

async function submitBook(e) {
  e.preventDefault();
  const t = state.selected;
  const fd = new FormData(e.target);
  const tourists = Array.from({ length: t.adults }, (_, i) => ({
    name: `${fd.get(`last${i + 1}`)} ${fd.get(`first${i + 1}`)}`,
    birth: fd.get(`birth${i + 1}`),
    pass: fd.get(`pass${i + 1}`),
  }));
  const box = document.getElementById("view-book");
  box.innerHTML = '<div class="wait">Отправляем заявку туроператору…</div>';
  await sleep(850 + Math.random() * 550);
  const order = {
    id: uid(),
    status: "awaiting",
    statusLabel: "Ожидает подтверждения",
    createdAt: new Date().toLocaleString("ru-RU"),
    tour: t.hotel,
    operator: t.operator,
    price: currentPrice(t),
    flight: t.flights[state.flightIdx],
    tourists,
    phone: fd.get("phone"),
    email: fd.get("email"),
    route: `${t.from} → ${t.country}`,
  };
  state.order = order;
  state.orders.unshift(order);
  saveOrders();
  renderOrder(order);
  setTimeout(() => {
    const found = state.orders.find((o) => o.id === order.id);
    if (!found) return;
    found.status = "confirmed";
    found.statusLabel = "Подтверждена туроператором";
    saveOrders();
    if (state.order?.id === order.id && !document.getElementById("view-order").hidden) renderOrder(found);
  }, 2500);
}

function renderOrder(order) {
  showView("order");
  const box = document.getElementById("view-order");
  box.innerHTML = `
    <button type="button" class="back" id="backSearch2">← к поиску</button>
    <div class="order">
      <p class="chip status-${order.status}">${order.statusLabel}</p>
      <h2>Заявка ${order.id}</h2>
      <p class="muted">${order.createdAt} · ${order.operator}</p>
      <div class="order-grid">
        <div>
          <h3>Тур</h3>
          <p>${order.tour}</p>
          <p class="muted">${order.route}<br />${order.flight.airline}<br />${order.flight.outbound}</p>
        </div>
        <div>
          <h3>Туристы</h3>
          <ul>${order.tourists.map((x) => `<li>${x.name}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Сумма</h3>
          <b class="big">${rub(order.price)}</b>
        </div>
      </div>
      <div class="docs">
        <h3>Документы</h3>
        <div class="doc-row"><span>Ваучер</span><span class="muted">${order.status === "confirmed" ? "готов" : "ожидает"}</span></div>
        <div class="doc-row"><span>Памятка</span><span class="muted">${order.status === "confirmed" ? "готов" : "ожидает"}</span></div>
        <div class="doc-row"><span>Страховка</span><span class="muted">${order.status === "confirmed" ? "готов" : "ожидает"}</span></div>
      </div>
      <button type="button" class="ghost-btn" id="toDesk" style="margin-top:1rem">Открыть кабинет</button>
    </div>`;
  box.querySelector("#backSearch2").addEventListener("click", () => showView("search"));
  box.querySelector("#toDesk").addEventListener("click", renderDesk);
}

function renderDesk() {
  showView("desk");
  const box = document.getElementById("view-desk");
  if (!state.orders.length) {
    box.innerHTML = `
      <button type="button" class="back" id="deskBack">← к поиску</button>
      <div class="hint">Заявок пока нет — оформи бронь на витрине</div>`;
    box.querySelector("#deskBack").addEventListener("click", () => showView("search"));
    return;
  }
  box.innerHTML = `
    <button type="button" class="back" id="deskBack">← к поиску</button>
    <div class="desk">
      <div class="desk-head">
        <h2>Кабинет менеджера</h2>
        <p class="muted">${state.orders.length} заявок</p>
      </div>
      <div class="desk-list">
        ${state.orders
          .map(
            (o) => `
          <article class="desk-card">
            <div>
              <strong>${o.id}</strong>
              <span class="chip status-${o.status}">${o.statusLabel}</span>
              <p>${o.tour}</p>
              <p class="muted">${o.route} · ${o.operator} · ${o.createdAt}</p>
            </div>
            <div class="desk-actions">
              <b>${rub(o.price)}</b>
              <button type="button" data-open-order="${o.id}">Открыть</button>
              ${o.status !== "confirmed" ? `<button type="button" data-confirm="${o.id}">Подтвердить</button>` : `<button type="button" data-docs="${o.id}">Документы</button>`}
            </div>
          </article>`
          )
          .join("")}
      </div>
    </div>`;
  box.querySelector("#deskBack").addEventListener("click", () => showView("search"));
  box.querySelectorAll("[data-open-order]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.order = state.orders.find((x) => x.id === btn.dataset.openOrder);
      renderOrder(state.order);
    });
  });
  box.querySelectorAll("[data-confirm]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const o = state.orders.find((x) => x.id === btn.dataset.confirm);
      o.status = "confirmed";
      o.statusLabel = "Подтверждена туроператором";
      saveOrders();
      renderDesk();
    });
  });
  box.querySelectorAll("[data-docs]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.order = state.orders.find((x) => x.id === btn.dataset.docs);
      renderOrder(state.order);
    });
  });
}

document.querySelectorAll("[data-step]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.step;
    const input = document.getElementById(key === "nights" ? "nightsVal" : "adultsVal");
    const min = key === "nights" ? 5 : 1;
    const max = key === "nights" ? 21 : 4;
    input.value = Math.max(min, Math.min(max, Number(input.value) + Number(btn.dataset.dir)));
  });
});

document.getElementById("mealChips").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-meal]");
  if (!btn) return;
  state.meal = btn.dataset.meal;
  document.querySelectorAll("#mealChips .seg-btn").forEach((b) => b.classList.toggle("is-on", b === btn));
  if (state.results.length) renderResults();
});

document.getElementById("sortChips").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-sort]");
  if (!btn) return;
  if (btn.dataset.sort === "group") {
    state.groupByResort = !state.groupByResort;
    btn.classList.toggle("is-on", state.groupByResort);
    if (state.results.length) renderResults();
    return;
  }
  if (btn.dataset.sort === "pp") {
    state.perPerson = !state.perPerson;
    btn.classList.toggle("is-on", state.perPerson);
    if (state.results.length) renderResults();
  }
});

document.getElementById("sortTabs").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-sort]");
  if (!btn) return;
  state.sort = btn.dataset.sort;
  document.querySelectorAll("#sortTabs .tab").forEach((b) => b.classList.toggle("is-on", b === btn));
  if (state.results.length) renderResults();
});

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const from = document.getElementById("fromId").value;
  const to = document.getElementById("toId").value;
  if (!from || !to) {
    document.getElementById("results").innerHTML = '<div class="hint">Выбери город и направление из подсказок</div>';
    return;
  }
  const params = {
    from,
    to,
    hotelHint: document.getElementById("hotelHint").value,
    dateFrom: e.target.dateFrom.value,
    nights: e.target.nights.value,
    adults: e.target.adults.value,
  };
  state.params = params;
  state.compare = [];
  showView("search");
  document.getElementById("results").innerHTML = '<div class="wait">Ищем по справочникам и базам ТО…</div>';
  document.getElementById("toolbar").hidden = true;
  document.getElementById("sampleTrace").textContent = JSON.stringify(buildTrace(params), null, 2);
  await sleep(420 + Math.random() * 380);
  state.results = mockSearch(params);
  renderResults();
});

document.getElementById("navSearch").addEventListener("click", () => showView("search"));
document.getElementById("navDesk").addEventListener("click", renderDesk);

window.addEventListener("scroll", () => {
  document.querySelector(".bar").classList.toggle("is-solid", window.scrollY > 8);
});

bindAutocomplete({
  input: document.getElementById("fromInput"),
  list: document.getElementById("fromList"),
  hiddenId: document.getElementById("fromId"),
  searcher: searchFrom,
});
bindAutocomplete({
  input: document.getElementById("toInput"),
  list: document.getElementById("toList"),
  hiddenId: document.getElementById("toId"),
  hiddenHint: document.getElementById("hotelHint"),
  searcher: searchTo,
});

setDefaultDate();
setFrom(1);
setTo(15, "Турция");
renderSuggests();
document.getElementById("sampleTrace").textContent = JSON.stringify(
  buildTrace({ from: "1", to: "15", dateFrom: document.querySelector('[name="dateFrom"]').value, nights: "10", adults: "2" }),
  null,
  2
);
document.getElementById("searchForm").requestSubmit();
