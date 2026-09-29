const DEST = {
  15: {
    name: "Турция",
    iata: "AYT",
    hotels: [
      { name: "Rixos Premium Belek", stars: 5, meal: "AI", resort: "Белек", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=70" },
      { name: "Crystal Waterworld", stars: 5, meal: "UAI", resort: "Белек", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=70" },
      { name: "Orange County Alanya", stars: 5, meal: "AI", resort: "Аланья", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=70" },
      { name: "Sueno Hotels Beach Side", stars: 4, meal: "AI", resort: "Сиде", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=70" },
      { name: "Selectum Family Resort", stars: 5, meal: "UAI", resort: "Белек", img: "https://images.unsplash.com/photo-1610641818989-c2051b5e2fcb?auto=format&fit=crop&w=800&q=70" },
      { name: "Sunmelia Beach Resort", stars: 4, meal: "HB", resort: "Кемер", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=70" },
    ],
  },
  23: {
    name: "Египет",
    iata: "HRG",
    hotels: [
      { name: "Rixos Sharm El Sheikh", stars: 5, meal: "AI", resort: "Шарм-эль-Шейх", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=70" },
      { name: "Steigenberger Alcazar", stars: 5, meal: "AI", resort: "Хургада", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=70" },
      { name: "Pickalbatros Palace", stars: 5, meal: "AI", resort: "Хургада", img: "https://images.unsplash.com/photo-1610641818989-c2051b5e2fcb?auto=format&fit=crop&w=800&q=70" },
      { name: "Jaz Mirabel Beach", stars: 5, meal: "AI", resort: "Шарм-эль-Шейх", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=70" },
    ],
  },
  41: {
    name: "ОАЭ",
    iata: "DXB",
    hotels: [
      { name: "Rixos The Palm Dubai", stars: 5, meal: "BB", resort: "Дубай", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=70" },
      { name: "Atlantis The Palm", stars: 5, meal: "BB", resort: "Дубай", img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=70" },
      { name: "Hilton Dubai Jumeirah", stars: 5, meal: "HB", resort: "Дубай", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=70" },
      { name: "Address Beach Resort", stars: 5, meal: "BB", resort: "Дубай", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=70" },
    ],
  },
  58: {
    name: "Таиланд",
    iata: "HKT",
    hotels: [
      { name: "Kata Rocks", stars: 5, meal: "BB", resort: "Пхукет", img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=70" },
      { name: "Centara Grand Mirage", stars: 5, meal: "AI", resort: "Паттайя", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=70" },
      { name: "Anantara Mai Khao", stars: 5, meal: "BB", resort: "Пхукет", img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=70" },
      { name: "Marriott Resort Pattaya", stars: 5, meal: "BB", resort: "Паттайя", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=70" },
    ],
  },
};

const TOWNS = {
  1: { name: "Москва", code: "SVO" },
  5: { name: "Санкт-Петербург", code: "LED" },
  9: { name: "Казань", code: "KZN" },
  12: { name: "Екатеринбург", code: "SVX" },
};

const OPS = ["PEGAS", "Anex", "Coral Travel", "TEZ TOUR", "FUN&SUN", "Intourist"];
const AIRLINES = ["Aeroflot", "S7", "Pobeda", "Ural Airlines", "Azur Air"];

const state = {
  params: null,
  results: [],
  selected: null,
  flightIdx: 0,
  extras: { transfer: true, insurance: false, visa: false },
  order: null,
  orders: [],
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function rub(n) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " ₽";
}

function uid() {
  return "SV-" + Math.floor(100000 + Math.random() * 899999);
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
  const dest = DEST[params.to] || DEST[15];
  const town = TOWNS[params.from] || TOWNS[1];
  return dest.hotels.map((h, i) => {
    const base = 72000 + i * 16800 + Number(params.nights) * 3900 + h.stars * 4500;
    const adults = Number(params.adults);
    const price = Math.round(base * (adults / 2) * (0.95 + ((i * 17) % 10) / 100));
    const flights = makeFlights(town.code, dest.iata, params.dateFrom, params.nights);
    return {
      id: `T-${params.to}-${i}`,
      hotel: h.name,
      stars: h.stars,
      meal: h.meal,
      resort: h.resort,
      img: h.img,
      country: dest.name,
      from: town.name,
      fromCode: town.code,
      toCode: dest.iata,
      nights: Number(params.nights),
      dateFrom: params.dateFrom,
      adults: Number(params.adults),
      operator: OPS[i % OPS.length],
      price,
      room: i % 2 === 0 ? "Standard Room" : "Deluxe Sea View",
      services: ["перелёт", "проживание", h.meal, "медицинская страховка"],
      flights,
    };
  });
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
  ["search", "detail", "book", "order"].forEach((v) => {
    document.getElementById(`view-${v}`).hidden = v !== name;
  });
  const map = {
    search: "sever.travel / search",
    detail: "sever.travel / tour",
    book: "sever.travel / booking",
    order: "sever.travel / order",
  };
  document.getElementById("chromeUrl").textContent = map[name];
  document.getElementById("ordersBtn").hidden = state.orders.length === 0;
  document.getElementById("product").scrollIntoView({ behavior: "smooth", block: "start" });
}

function filteredResults() {
  const meal = document.getElementById("filterMeal").value;
  const sort = document.getElementById("filterSort").value;
  let items = [...state.results];
  if (meal !== "all") items = items.filter((t) => t.meal === meal);
  if (sort === "price") items.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
  if (sort === "stars") items.sort((a, b) => b.stars - a.stars || a.price - b.price);
  return items;
}

function renderResults() {
  const items = filteredResults();
  const root = document.getElementById("results");
  const p = state.params;
  document.getElementById("toolbar").hidden = false;
  document.getElementById("boardTitle").textContent = `${items.length} предложений`;
  document.getElementById("boardMeta").textContent = `${TOWNS[p.from].name} → ${DEST[p.to].name} · ${p.nights} ночей`;

  if (!items.length) {
    root.innerHTML = '<div class="hint">Нет вариантов под фильтр — сбрось питание</div>';
    return;
  }

  root.innerHTML = items
    .map(
      (t, idx) => `
      <article class="card" style="animation-delay:${idx * 0.04}s">
        <img class="thumb" src="${t.img}" alt="" loading="lazy" />
        <div>
          <h3>${t.hotel} <span class="stars">${"★".repeat(t.stars)}</span></h3>
          <div class="meta">
            <span>${t.resort}</span>
            <span>${t.nights} н. · ${t.dateFrom}</span>
            <span>${t.meal}</span>
            <span class="chip">${t.operator}</span>
          </div>
        </div>
        <div class="price">
          <div>
            <b>${rub(t.price)}</b>
            <small>за номер</small>
          </div>
          <button type="button" class="book" data-open="${t.id}">Подробнее</button>
        </div>
      </article>`
    )
    .join("");

  root.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => openDetail(btn.dataset.open));
  });
}

async function openDetail(id) {
  state.selected = state.results.find((t) => t.id === id);
  state.flightIdx = 0;
  state.extras = { transfer: true, insurance: false, visa: false };
  showView("detail");
  const box = document.getElementById("view-detail");
  box.innerHTML = '<div class="wait">Актуализируем цену…</div>';
  await sleep(450 + Math.random() * 350);
  // лёгкий «пересчёт» как после checkprice
  state.selected.price = Math.round(state.selected.price * (0.985 + Math.random() * 0.03));
  renderDetail();
}

function renderDetail() {
  const t = state.selected;
  const price = currentPrice(t);
  const box = document.getElementById("view-detail");
  box.innerHTML = `
    <button type="button" class="back" data-goto="search">← к результатам</button>
    <div class="detail">
      <img class="detail-hero" src="${t.img}" alt="" />
      <div class="detail-body">
        <div class="detail-top">
          <div>
            <p class="chip">${t.operator}</p>
            <h2>${t.hotel}</h2>
            <p class="muted">${t.resort}, ${t.country} · ${"★".repeat(t.stars)} · ${t.room}</p>
          </div>
          <div class="detail-price">
            <b>${rub(price)}</b>
            <small>после актуализации</small>
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
          <button type="button" class="go" id="toBook">Забронировать · ${rub(price)}</button>
        </div>
      </div>
    </div>`;

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
  box.querySelector("#toBook").addEventListener("click", () => renderBook());
  box.querySelector("[data-goto]").addEventListener("click", () => showView("search"));
}

function renderBook() {
  const t = state.selected;
  const price = currentPrice(t);
  showView("book");
  const adults = Array.from({ length: t.adults }, (_, i) => i + 1);
  const box = document.getElementById("view-book");
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
  await sleep(900 + Math.random() * 700);

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
    extras: { ...state.extras },
  };
  state.order = order;
  state.orders.unshift(order);
  renderOrder(order);

  // имитация смены статуса через пару секунд
  setTimeout(() => {
    if (state.order?.id === order.id) {
      order.status = "confirmed";
      order.statusLabel = "Подтверждена туроператором";
      if (!document.getElementById("view-order").hidden) renderOrder(order);
    }
  }, 2800);
}

function renderOrder(order) {
  showView("order");
  const box = document.getElementById("view-order");
  box.innerHTML = `
    <button type="button" class="back" data-goto="search">← к поиску</button>
    <div class="order">
      <p class="chip status-${order.status}">${order.statusLabel}</p>
      <h2>Заявка ${order.id}</h2>
      <p class="muted">${order.createdAt} · ${order.operator}</p>
      <div class="order-grid">
        <div>
          <h3>Тур</h3>
          <p>${order.tour}</p>
          <p class="muted">${order.flight.airline}<br />${order.flight.outbound}<br />${order.flight.inbound}</p>
        </div>
        <div>
          <h3>Туристы</h3>
          <ul>${order.tourists.map((x) => `<li>${x.name} · паспорт ${x.pass}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Оплата</h3>
          <b class="big">${rub(order.price)}</b>
          <p class="muted">счёт и документы появятся после подтверждения</p>
        </div>
      </div>
      <div class="docs">
        <h3>Документы</h3>
        <div class="doc-row">
          <span>Ваучер</span>
          <span class="muted">${order.status === "confirmed" ? "готов к скачиванию" : "ожидает"}</span>
        </div>
        <div class="doc-row">
          <span>Памятка</span>
          <span class="muted">${order.status === "confirmed" ? "готов к скачиванию" : "ожидает"}</span>
        </div>
        <div class="doc-row">
          <span>Страховка</span>
          <span class="muted">${order.status === "confirmed" ? "готов к скачиванию" : "ожидает"}</span>
        </div>
      </div>
    </div>`;
  box.querySelector("[data-goto]").addEventListener("click", () => showView("search"));
}

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const params = Object.fromEntries(new FormData(e.target).entries());
  state.params = params;
  showView("search");
  document.getElementById("results").innerHTML = '<div class="wait">Подбираем предложения…</div>';
  document.getElementById("toolbar").hidden = true;
  document.getElementById("sampleTrace").textContent = JSON.stringify(buildTrace(params), null, 2);
  await sleep(500 + Math.random() * 450);
  state.results = mockSearch(params);
  renderResults();
});

["filterMeal", "filterSort"].forEach((id) => {
  document.getElementById(id).addEventListener("change", () => {
    if (state.results.length) renderResults();
  });
});

document.querySelectorAll("[data-goto='search']").forEach((el) => {
  el.addEventListener("click", () => showView("search"));
});

document.getElementById("ordersBtn").addEventListener("click", () => {
  if (state.order) renderOrder(state.order);
});

window.addEventListener("scroll", () => {
  document.querySelector(".bar").classList.toggle("is-solid", window.scrollY > 8);
});

setDefaultDate();
document.getElementById("sampleTrace").textContent = JSON.stringify(
  buildTrace({
    from: "1",
    to: "15",
    dateFrom: document.querySelector('[name="dateFrom"]').value,
    nights: "10",
    adults: "2",
  }),
  null,
  2
);
document.getElementById("searchForm").requestSubmit();
