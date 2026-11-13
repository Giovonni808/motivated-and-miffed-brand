(() => {
"use strict";
const D = window.HI_DATA;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const NS = "http://www.w3.org/2000/svg";
const el = (n, a = {}, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); p && p.appendChild(e); return e; };
const nf = (n, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2200); };
const state = { visYear: 2019, co2Year: 2024, metric: "area", quake: null, tide: null, quiz: null };

/* ---------- ambient background: stars above, marine snow below ---------- */
const cv = $("#ambient"), cx = cv.getContext("2d");
let W, H, parts = [];
const stops = [[0, [10, 14, 40]], [.18, [18, 50, 84]], [.45, [8, 70, 90]], [.8, [5, 28, 48]], [1, [3, 10, 20]]];
function lerpColor(t) {
  for (let i = 1; i < stops.length; i++) if (t <= stops[i][0]) {
    const [a, ca] = stops[i - 1], [b, cb] = stops[i], k = (t - a) / (b - a);
    return ca.map((c, j) => Math.round(c + (cb[j] - c) * k));
  }
  return stops[stops.length - 1][1];
}
function resize() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  parts = Array.from({ length: Math.min(160, Math.floor(W * H / 9000)) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .3, s: Math.random() * .4 + .1, p: Math.random() * 6 }));
}
let scrollT = 0;
function drawAmbient(ts) {
  const [r, g, b] = lerpColor(scrollT);
  cx.fillStyle = `rgb(${r},${g},${b})`; cx.fillRect(0, 0, W, H);
  const stars = Math.max(0, 1 - scrollT * 5), snow = Math.min(1, scrollT * 2 + .2);
  for (const p of parts) {
    p.y += reduce ? 0 : p.s * (scrollT < .15 ? .15 : -1 * 0 + 1) * (scrollT < .15 ? 1 : 1);
    if (p.y > H) p.y = -4;
    const tw = .5 + .5 * Math.sin(ts / 700 + p.p);
    cx.globalAlpha = (scrollT < .2 ? stars * tw : snow * .45) * .9;
    cx.fillStyle = scrollT < .2 ? "#fff" : "#9fe9ff";
    cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.3); cx.fill();
  }
  cx.globalAlpha = 1;
  // sea-level glow line
  const y = H * (.12 - scrollT * 3);
  if (y > -40) { const gr = cx.createLinearGradient(0, y - 40, 0, y + 40); gr.addColorStop(0, "rgba(47,212,192,0)"); gr.addColorStop(.5, "rgba(47,212,192,.25)"); gr.addColorStop(1, "rgba(47,212,192,0)"); cx.fillStyle = gr; cx.fillRect(0, y - 40, W, 80); }
  requestAnimationFrame(drawAmbient);
}
addEventListener("resize", resize); resize(); requestAnimationFrame(drawAmbient);

/* ---------- nav, progress ---------- */
const chapters = $$("main > section, main > footer");
const dots = $("#dots");
chapters.forEach((s, i) => { if (!s.id) return; const a = document.createElement("a"); a.href = "#" + s.id; a.title = s.dataset.title || s.id; a.setAttribute("aria-label", a.title); dots.appendChild(a); });
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  scrollT = max > 0 ? scrollY / max : 0;
  $("#progressBar").style.width = scrollT * 100 + "%";
  let cur = 0; chapters.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * .5) cur = i; });
  $$("#dots a").forEach((a, i) => a.classList.toggle("on", i === cur));
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* ---------- hero counters & reveals ---------- */
function countUp(e) {
  const to = +e.dataset.count, d = +e.dataset.dec, t0 = performance.now(), dur = reduce ? 1 : 1600;
  (function f(t) { const k = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - k, 3)); e.textContent = nf(v, d); k < 1 && requestAnimationFrame(f); })(t0);
}
$$("[data-count]").forEach(countUp);
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("seen"); e.target.dispatchEvent(new Event("reveal")); io.unobserve(e.target); } }), { threshold: .25 });
$$(".card,.facts,.letters").forEach(n => io.observe(n));

/* ---------- reusable line chart with scrubbing ---------- */
function lineChart(host, series, { unit, color = "#2fd4c0", yMin, yMax, ticks = 4, onIndex, fmtY }) {
  const w = 800, h = 340, m = { l: 46, r: 16, t: 14, b: 28 };
  const xs = series.map(d => d[0]), ys = series.map(d => d[1]);
  const x0 = xs[0], x1 = xs[xs.length - 1];
  const lo = yMin ?? Math.floor(Math.min(...ys) / 10) * 10, hi = yMax ?? Math.ceil(Math.max(...ys) * 1.04);
  const X = v => m.l + (v - x0) / (x1 - x0) * (w - m.l - m.r), Y = v => h - m.b - (v - lo) / (hi - lo) * (h - m.t - m.b);
  const svg = el("svg", { viewBox: `0 0 ${w} ${h}` }); host.innerHTML = ""; host.appendChild(svg);
  const defs = el("defs", {}, svg), gid = "g" + Math.random().toString(36).slice(2, 7);
  const lg = el("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
  el("stop", { offset: 0, "stop-color": color, "stop-opacity": .35 }, lg); el("stop", { offset: 1, "stop-color": color, "stop-opacity": 0 }, lg);
  for (let i = 0; i <= ticks; i++) {
    const v = lo + (hi - lo) * i / ticks, y = Y(v);
    el("line", { x1: m.l, x2: w - m.r, y1: y, y2: y, stroke: "rgba(255,255,255,.08)" }, svg);
    el("text", { x: m.l - 8, y: y + 4, "text-anchor": "end" }, svg).textContent = fmtY ? fmtY(v) : nf(v, 0);
  }
  const step = Math.ceil((x1 - x0) / 6 / 5) * 5;
  for (let v = Math.ceil(x0 / step) * step; v <= x1; v += step) el("text", { x: X(v), y: h - 8, "text-anchor": "middle" }, svg).textContent = v;
  const pts = series.map(d => `${X(d[0])},${Y(d[1])}`).join(" ");
  el("polygon", { points: `${X(x0)},${Y(lo)} ${pts} ${X(x1)},${Y(lo)}`, fill: `url(#${gid})` }, svg);
  const line = el("polyline", { points: pts, fill: "none", stroke: color, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
  if (!reduce) { const L = line.getTotalLength?.() || 2000; line.style.strokeDasharray = L; line.style.strokeDashoffset = L; line.getBoundingClientRect(); line.style.transition = "stroke-dashoffset 1.8s ease"; host.closest(".card").addEventListener("reveal", () => line.style.strokeDashoffset = 0); io.observe(host.closest(".card")); setTimeout(() => line.style.strokeDashoffset = 0, 3000); }
  const cross = el("line", { y1: m.t, y2: h - m.b, stroke: "rgba(255,255,255,.35)", "stroke-dasharray": "3 4" }, svg);
  const dot = el("circle", { r: 6, fill: "#ffc65c", stroke: "#06121f", "stroke-width": 2 }, svg);
  let idx = series.length - 1;
  function set(i) { idx = Math.max(0, Math.min(series.length - 1, i)); const [a, b] = series[idx]; cross.setAttribute("x1", X(a)); cross.setAttribute("x2", X(a)); dot.setAttribute("cx", X(a)); dot.setAttribute("cy", Y(b)); onIndex && onIndex(idx); }
  const pick = ev => { const r = svg.getBoundingClientRect(), px = (ev.clientX - r.left) / r.width * w; const yr = x0 + (px - m.l) / (w - m.l - m.r) * (x1 - x0); set(Math.round(yr - x0)); };
  let down = false;
  svg.addEventListener("pointerdown", e => { down = true; svg.setPointerCapture(e.pointerId); pick(e); });
  svg.addEventListener("pointermove", e => { if (down || e.pointerType === "mouse") pick(e); });
  svg.addEventListener("pointerup", () => down = false);
  return { set, get idx() { return idx; } };
}
function table(host, rows, h1, h2) { host.innerHTML = `<table><thead><tr><th>${h1}</th><th>${h2}</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table>`; }
$$("[data-table]").forEach(b => b.addEventListener("click", () => {
  const w = $(b.dataset.table === "visitors" ? "#visTable" : "#co2Table"), s = b.dataset.table === "visitors" ? D.visitors : D.co2;
  if (w.hidden) table(w, s.series.map(r => [r[0], nf(r[1], 2)]), "Year", s.unit); w.hidden = !w.hidden;
}));

/* ---------- visitors ---------- */
(() => {
  const v = D.visitors, s = v.series, sl = $("#visSlider");
  sl.min = 0; sl.max = s.length - 1; sl.value = s.length - 1;
  const ch = lineChart($("#visChart"), s, { yMin: 0, yMax: 12, ticks: 4, color: "#2fd4c0", fmtY: n => nf(n, 0) + "M", onIndex: i => {
    const [y, n] = s[i]; state.visYear = y; sl.value = i;
    $("#visYear").textContent = y; $("#visVal").textContent = nf(n, 1) + " million visitors"; $("#visNote").textContent = v.notes[y] || "";
    const perRes = n / v.residents;
    $("#visInsight").innerHTML = `That is <b>${nf(perRes, 1)} visitors</b> for every resident that year.`;
  } });
  sl.addEventListener("input", () => ch.set(+sl.value));
  ch.set(s.findIndex(d => d[0] === 2019));
  $("#visSrc").textContent = "Source: " + v.source + ". Residents ≈ 1.44 million.";
})();

/* ---------- CO2 + sonification ---------- */
let soundOn = false, actx;
$("#soundToggle").addEventListener("click", e => { soundOn = !soundOn; e.target.setAttribute("aria-pressed", soundOn); e.target.textContent = soundOn ? "Sound on" : "Sound off"; });
function blip(ppm) {
  if (!soundOn) return;
  actx = actx || new (window.AudioContext || window.webkitAudioContext)();
  const o = actx.createOscillator(), g = actx.createGain(), f = 220 * Math.pow(2, (ppm - 315) / 110 * 1.5);
  o.type = "sine"; o.frequency.value = f; o.connect(g); g.connect(actx.destination);
  const t = actx.currentTime; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + .3); o.start(t); o.stop(t + .32);
}
let co2ch;
(() => {
  const s = D.co2.series, sl = $("#co2Slider"); sl.min = 0; sl.max = s.length - 1; sl.value = s.length - 1;
  co2ch = lineChart($("#co2Chart"), s, { yMin: 300, yMax: 450, ticks: 3, color: "#ff7a63", fmtY: n => nf(n, 0), onIndex: i => {
    const [y, n] = s[i]; state.co2Year = y; sl.value = i;
    $("#co2Year").textContent = y; $("#co2Val").textContent = nf(n, 1) + " ppm";
    $("#co2Note").textContent = y === 1959 ? "The record begins." : `${nf(n - s[0][1], 1)} ppm higher than in 1959 (+${nf((n / s[0][1] - 1) * 100, 0)}%).`;
  } });
  co2ch.set(s.length - 1);
  sl.addEventListener("input", () => { co2ch.set(+sl.value); blip(s[+sl.value][1]); });
  $("#playCo2").addEventListener("click", () => {
    if (!soundOn) { $("#soundToggle").click(); toast("Sound turned on"); }
    let i = 0; const tm = setInterval(() => { co2ch.set(i); blip(s[i][1]); if (++i >= s.length) clearInterval(tm); }, 140);
  });
  $("#co2Src").textContent = "Source: " + D.co2.source + ".";
})();

/* ---------- peaks ---------- */
(() => {
  const host = $("#peaks"), max = 34000;
  host.innerHTML = D.peaks.list.map(p => `<div class="peak ${p.hi ? "hi" : ""}"><b>${nf(p.top)} ft</b><div class="bar" data-h="${p.top / max * 100}"></div><span>${p.name}</span></div>`).join("");
  $("#peaksSrc").textContent = "Source: " + D.peaks.source + ".";
  $("#peaks").closest(".card").addEventListener("reveal", () => $$(".bar", host).forEach((b, i) => setTimeout(() => b.style.height = b.dataset.h + "%", i * 200)));
})();

/* ---------- islands bubble map ---------- */
(() => {
  const c = $("#islandCanvas"), g = c.getContext("2d"), isl = D.islands.list;
  const lon0 = -160.6, lon1 = -154.7, lat0 = 18.8, lat1 = 22.4, pad = 30;
  const px = o => pad + (o.lon - lon0) / (lon1 - lon0) * (c.width - 2 * pad), py = o => c.height - pad - (o.lat - lat0) / (lat1 - lat0) * (c.height - 2 * pad);
  const tot = k => isl.reduce((a, b) => a + b[k], 0);
  let cur = {}, target = {}; isl.forEach(i => cur[i.id] = 0);
  function setTarget() { const k = state.metric, T = tot(k), scale = k === "area" ? 1 : 1; isl.forEach(i => target[i.id] = Math.max(i[k] / T, 0)); }
  const radius = f => Math.max(4, Math.sqrt(f) * 150);
  let hover = null;
  function draw() {
    g.clearRect(0, 0, c.width, c.height);
    isl.forEach(i => cur[i.id] += (target[i.id] - cur[i.id]) * (reduce ? 1 : .08));
    [...isl].sort((a, b) => cur[b.id] - cur[a.id]).forEach(i => {
      const r = radius(cur[i.id]), x = px(i), y = py(i);
      g.beginPath(); g.arc(x, y, r, 0, 6.3);
      g.fillStyle = i === hover ? "rgba(255,198,92,.85)" : state.metric === "pop" ? "rgba(255,122,99,.6)" : "rgba(47,212,192,.5)"; g.fill();
      g.lineWidth = 2; g.strokeStyle = "rgba(255,255,255,.55)"; g.stroke();
      g.fillStyle = "#eaf4f7"; g.font = "600 17px system-ui"; g.textAlign = "center";
      const ly = (i.id === "kahoolawe" || i.id === "lanai") ? y + r + 16 : y - r - 8;
      g.fillText(i.name, x, ly);
    });
    requestAnimationFrame(draw);
  }
  function insight() {
    const k = state.metric, T = tot(k), top = [...isl].sort((a, b) => b[k] - a[k])[0];
    const oa = isl.find(i => i.id === "oahu"), hi = isl.find(i => i.id === "hawaii");
    $("#islandInsight").innerHTML = k === "area"
      ? `<b>${nf(hi.area / tot("area") * 100)}%</b> of the land is the Big Island. Oʻahu is just <b>${nf(oa.area / tot("area") * 100)}%</b>.`
      : `<b>${nf(oa.pop / tot("pop") * 100)}%</b> of residents live on Oʻahu. The Big Island holds <b>${nf(hi.pop / tot("pop") * 100)}%</b>.`;
  }
  $$("[data-metric]").forEach(b => b.addEventListener("click", () => { state.metric = b.dataset.metric; $$("[data-metric]").forEach(x => x.classList.toggle("on", x === b)); setTarget(); insight(); }));
  c.addEventListener("pointermove", e => { const r = c.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width * c.width, my = (e.clientY - r.top) / r.height * c.height; hover = isl.find(i => Math.hypot(mx - px(i), my - py(i)) < radius(cur[i.id]) + 6) || null; if (hover) $("#islandInsight").innerHTML = `<b>${hover.name}</b> (${hover.nick}): ${nf(hover.area)} sq mi, ${nf(hover.pop)} people.`; });
  setTarget(); insight(); isl.forEach(i => cur[i.id] = 0);
  c.closest(".card").addEventListener("reveal", setTarget); draw();
  $("#islandSrc").textContent = "Source: " + D.islands.source + ". Bubble area is proportional to the share of the state total. Positions use real latitude and longitude.";
})();

/* ---------- rain gauges ---------- */
(() => {
  const L = D.rain.list, max = 450;
  $("#gauges").innerHTML = L.map((r, i) => `<button class="gauge" data-i="${i}" aria-label="${r.name}: ${r.v} inches per year"><div class="tube"><i></i></div><b>${r.v}"</b>${r.name}</button>`).join("");
  const fill = (b, on) => $("i", b).style.height = on ? Math.max(3, L[+b.dataset.i].v / max * 100) + "%" : "0";
  $$(".gauge").forEach(b => b.addEventListener("click", () => { const i = +b.dataset.i; fill(b, false); setTimeout(() => fill(b, true), 60); $("#rainInsight").innerHTML = `<b>${L[i].name}</b> gets about <b>${L[i].v} inches</b> a year, ${nf(L[i].v / 17, 1)}× Honolulu's ${L[4].v}.`; }));
  $("#gauges").closest(".card").addEventListener("reveal", () => $$(".gauge").forEach((b, i) => setTimeout(() => fill(b, true), i * 150)));
  $("#rainInsight").innerHTML = `Waiʻaleʻale gets about <b>26×</b> more rain than Honolulu.`;
  $("#rainSrc").textContent = "Source: " + D.rain.source + ".";
})();

/* ---------- live: earthquakes + tide ---------- */
(() => {
  const c = $("#quakeCanvas"), g = c.getContext("2d"), isl = D.islands.list;
  const lon0 = -161, lon1 = -154.5, lat0 = 18.4, lat1 = 22.6;
  const X = lon => (lon - lon0) / (lon1 - lon0) * c.width, Y = lat => c.height - (lat - lat0) / (lat1 - lat0) * c.height;
  let quakes = [];
  function draw(ts) {
    g.clearRect(0, 0, c.width, c.height);
    isl.forEach(i => { g.beginPath(); g.arc(X(i.lon), Y(i.lat), Math.max(4, Math.sqrt(i.area) * .8), 0, 6.3); g.fillStyle = "rgba(255,255,255,.1)"; g.fill(); g.fillStyle = "#a9c1ca"; g.font = "13px system-ui"; g.textAlign = "center"; g.fillText(i.name, X(i.lon), Y(i.lat) + Math.max(4, Math.sqrt(i.area) * .8) + 16); });
    quakes.forEach(q => {
      const r = 2 + Math.max(0, q.mag) * 2.6, p = reduce ? 0 : ((ts / 1400 + q.mag) % 1);
      g.beginPath(); g.arc(X(q.lon), Y(q.lat), r, 0, 6.3); g.fillStyle = `rgba(255,${q.depth < 10 ? 122 : 198},${q.depth < 10 ? 99 : 92},.55)`; g.fill();
      if (q.mag >= 3) { g.beginPath(); g.arc(X(q.lon), Y(q.lat), r + p * 16, 0, 6.3); g.strokeStyle = `rgba(255,198,92,${.7 - p * .7})`; g.stroke(); }
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  const start = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=${lat0}&maxlatitude=${lat1}&minlongitude=${lon0}&maxlongitude=${lon1}&starttime=${start}&minmagnitude=1&orderby=time&limit=2000`;
  const tideUrl = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=water_level&application=hawaii_visualized&station=1612340&date=latest&datum=MLLW&units=english&time_zone=lst_ldt&format=json";
  Promise.allSettled([fetch(url).then(r => r.json()), fetch(tideUrl).then(r => r.json())]).then(([q, t]) => {
    let msg = "";
    if (q.status === "fulfilled" && q.value.features) {
      quakes = q.value.features.map(f => ({ lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1], depth: f.geometry.coordinates[2], mag: f.properties.mag || 0, place: f.properties.place }));
      const big = [...quakes].sort((a, b) => b.mag - a.mag)[0];
      state.quake = { n: quakes.length, big };
      msg = `<b>${nf(quakes.length)}</b> earthquakes in the last 30 days (magnitude 1+).` + (big ? ` Largest: <b>M${nf(big.mag, 1)}</b>, ${big.place}.` : "");
    } else msg = "The earthquake feed could not be reached from this network. Try again later.";
    if (t.status === "fulfilled" && t.value.data && t.value.data[0]) { state.tide = t.value.data[0].v; msg += ` Honolulu water level right now: <b>${nf(+state.tide, 2)} ft</b> above MLLW.`; }
    $("#quakeInsight").innerHTML = msg;
  });
  $("#quakeLegend").innerHTML = `<span><i style="width:10px;height:10px;background:#ff7a63"></i>Shallow (under 10 km)</span><span><i style="width:10px;height:10px;background:#ffc65c"></i>Deeper</span><span>Dot size = magnitude. Rings mark M3+.</span>`;
})();

/* ---------- endemic facts & letters ---------- */
$("#facts").innerHTML = [
  ["~90%", "of native flowering plants grow naturally nowhere else on Earth."],
  ["~1/3", "of U.S. species listed as threatened or endangered live in Hawaiʻi."],
  ["50+", "known honeycreeper species evolved from one ancestor. Roughly 17 survive."],
  ["2,400 mi", "from Honolulu to the nearest continent's coast, among the most remote places on Earth."]
].map(f => `<div class="fact"><b>${f[0]}</b><span>${f[1]}</span></div>`).join("");
const say = { A: "ah", E: "eh", I: "ee", O: "oh", U: "oo", H: "heh", K: "keh", L: "leh", M: "meh", N: "neh", P: "peh", W: "weh or veh", "ʻ": "glottal stop, like the pause in uh-oh" };
$("#letters").innerHTML = D.alphabet.map((l, i) => `<button class="letter ${i < 5 ? "v" : ""}" data-l="${l}">${l}<small>${i < 5 ? "vowel" : "cons."}</small></button>`).join("") + `<p class="insight" id="sayLine" style="flex-basis:100%">Gold borders mark vowels. Vowels can also carry a kahakō (macron), like ā, which lengthens the sound.</p>`;
$$(".letter").forEach(b => b.addEventListener("click", () => { $$(".letter").forEach(x => x.classList.toggle("on", x === b)); $("#sayLine").innerHTML = `<b>${b.dataset.l}</b> sounds like "${say[b.dataset.l]}".`; }));

/* ---------- quiz ---------- */
(() => {
  const Q = D.quiz, host = $("#quiz"); let i = 0, scores = [];
  const score = (g, a, q) => Math.max(0, Math.round(100 * (1 - Math.abs(g - a) / (Math.abs(q.max - q.min) * .35))));
  function ask() {
    const q = Q[i], mid = (q.min + q.max) / 2;
    host.innerHTML = `<p class="meta">Question ${i + 1} of ${Q.length}</p><p class="q">${q.q}</p><div class="val"><span id="qv">${nf(mid, q.step < 1 ? 1 : 0)}</span> ${q.unit}</div><input type="range" id="qs" min="${q.min}" max="${q.max}" step="${q.step}" value="${mid}" aria-label="Your guess"><div class="actions"><button class="btn" id="lock">Lock in guess</button></div><div class="result" id="qr"></div>`;
    $("#qs").addEventListener("input", e => $("#qv").textContent = nf(+e.target.value, q.step < 1 ? 1 : 0));
    $("#lock").addEventListener("click", () => {
      const g = +$("#qs").value, s = score(g, q.ans, q); scores.push(s);
      $("#qr").innerHTML = `You guessed <b>${nf(g, q.step < 1 ? 1 : 0)}</b>. Answer: <b>${nf(q.ans, q.ans % 1 ? 2 : 0)} ${q.unit}</b>. <b>+${s}</b> points. ${q.fact}`;
      $("#qs").disabled = true; const b = $("#lock"); b.textContent = i + 1 < Q.length ? "Next question" : "See my score";
      b.replaceWith(b.cloneNode(true)); $("#lock").addEventListener("click", () => { i++; i < Q.length ? ask() : finish(); });
    });
  }
  function finish() {
    const t = Math.round(scores.reduce((a, b) => a + b, 0) / Q.length); state.quiz = t;
    const tag = t > 85 ? "Kamaʻāina level" : t > 65 ? "Island regular" : t > 40 ? "Curious malihini" : "Fresh off the plane";
    host.innerHTML = `<p class="meta">Your score</p><div class="score">${t}/100</div><p class="q">${tag}</p><div class="actions"><button class="btn" data-share="quiz">Share my score</button><button class="btn ghost" id="again">Play again</button></div>`;
    $("#again").addEventListener("click", () => { i = 0; scores = []; ask(); });
    bindShare(host);
  }
  ask();
})();

/* ---------- share cards ---------- */
function cardFor(k) {
  const v = D.visitors.series, c = D.co2.series;
  switch (k) {
    case "visitors": { const d = v.find(x => x[0] === state.visYear); return { kicker: "Visitors to Hawaiʻi", big: nf(d[1], 1) + "M", sub: `visitors in ${d[0]}, for about ${D.visitors.residents} million residents.`, hash: "malihini" }; }
    case "co2": { const d = c.find(x => x[0] === state.co2Year); return { kicker: "Keeling Curve, Mauna Loa", big: nf(d[1], 0) + " ppm", sub: `CO₂ in ${d[0]}. It was 316 ppm in 1959.`, hash: "ea" }; }
    case "peaks": return { kicker: "Mauna Kea", big: "33,500 ft", sub: "from the ocean floor to the summit. Taller than Everest.", hash: "mauna" };
    case "islands": return state.metric === "pop"
      ? { kicker: "Where Hawaiʻi lives", big: "70%", sub: "of residents live on Oʻahu, on 9% of the land.", hash: "moku" }
      : { kicker: "Hawaiʻi's land", big: "63%", sub: "of the state's land is the Big Island.", hash: "moku" };
    case "rain": return { kicker: "Rainfall", big: "26×", sub: "more rain at Waiʻaleʻale than in Honolulu.", hash: "ua" };
    case "quakes": return state.quake ? { kicker: "Hawaiʻi's ground, last 30 days", big: nf(state.quake.n), sub: "earthquakes recorded around the islands.", hash: "honua" } : { kicker: "Hawaiʻi's ground", big: "Live", sub: "See Hawaiʻi's earthquakes in real time.", hash: "honua" };
    case "quiz": return { kicker: "Hawaiʻi data quiz", big: state.quiz + "/100", sub: "How well do you know Hawaiʻi's numbers? Beat my score.", hash: "ike" };
    default: return { kicker: "Interactive data story", big: "Hawaiʻi, by the numbers", sub: "Scroll from the summit of Mauna Kea to the sea floor.", hash: "top" };
  }
}
function paintCard(cd) {
  const c = $("#shareCanvas"), g = c.getContext("2d"), W = c.width, H = c.height;
  const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#14224f"); gr.addColorStop(.5, "#0b5a6e"); gr.addColorStop(1, "#04121f");
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 90; i++) { g.globalAlpha = Math.random() * .6; g.fillStyle = "#fff"; g.beginPath(); g.arc(Math.random() * W, Math.random() * H * .6, Math.random() * 2 + .5, 0, 6.3); g.fill(); }
  g.globalAlpha = 1; g.textAlign = "left";
  g.fillStyle = "#ffc65c"; g.font = "600 38px system-ui"; g.fillText(cd.kicker.toUpperCase(), 80, 200);
  let size = 260; g.font = `600 ${size}px Georgia,serif`; while (g.measureText(cd.big).width > W - 160) { size -= 10; g.font = `600 ${size}px Georgia,serif`; }
  const grad = g.createLinearGradient(80, 0, W - 80, 0); grad.addColorStop(0, "#ffc65c"); grad.addColorStop(1, "#ff7a63"); g.fillStyle = grad; g.fillText(cd.big, 80, 520);
  g.fillStyle = "#eaf4f7"; g.font = "500 54px system-ui";
  const words = cd.sub.split(" "); let line = "", y = 640;
  words.forEach(w => { const t = line + w + " "; if (g.measureText(t).width > W - 160) { g.fillText(line, 80, y); line = w + " "; y += 70; } else line = t; }); g.fillText(line, 80, y);
  g.strokeStyle = "#2fd4c0"; g.lineWidth = 4; g.beginPath(); for (let x = 80; x <= W - 80; x += 8) { const yy = H - 220 + Math.sin(x / 60) * 14; x === 80 ? g.moveTo(x, yy) : g.lineTo(x, yy); } g.stroke();
  g.fillStyle = "#a9c1ca"; g.font = "600 40px Georgia,serif"; g.fillText("Hawaiʻi, Visualized", 80, H - 110);
  g.font = "28px system-ui"; g.fillText(location.host ? location.host + location.pathname.replace(/index\.html$/, "") : "Scroll the story", 80, H - 66);
}
let curCard = null;
function bindShare(root = document) { $$("[data-share]", root).forEach(b => { if (b.dataset.bound) return; b.dataset.bound = 1; b.addEventListener("click", () => { curCard = cardFor(b.dataset.share); paintCard(curCard); $("#shareDlg").showModal(); }); }); }
bindShare();
const shareUrl = () => location.origin && location.origin !== "null" ? location.origin + location.pathname + (curCard ? "#" + curCard.hash : "") : location.href;
$("#shareBtn").addEventListener("click", async () => {
  const blob = await new Promise(r => $("#shareCanvas").toBlob(r, "image/png")), file = new File([blob], "hawaii-visualized.png", { type: "image/png" });
  const data = { title: "Hawaiʻi, Visualized", text: `${curCard.kicker}: ${curCard.big}. ${curCard.sub}`, url: shareUrl() };
  try { if (navigator.canShare && navigator.canShare({ files: [file] })) await navigator.share({ ...data, files: [file] }); else if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.text + " " + data.url); toast("Copied text and link"); } } catch (e) { /* user cancelled */ }
});
$("#dlBtn").addEventListener("click", () => { const a = document.createElement("a"); a.download = "hawaii-visualized.png"; a.href = $("#shareCanvas").toDataURL("image/png"); a.click(); });
$("#copyLink").addEventListener("click", () => navigator.clipboard.writeText(shareUrl()).then(() => toast("Link copied"), () => toast("Copy failed")));
})();
