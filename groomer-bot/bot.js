/* Demo chat widget (EN/BG). Set window.BOT_CONFIG, then load this file. */
(function () {
  const C = window.BOT_CONFIG || {};
  const color = C.color || "#2f6f4f";
  const qLang = new URLSearchParams(location.search).get("lang");
  let lang = (qLang === "bg" || qLang === "en") ? qLang : (C.defaultLang) || ((navigator.language || "").startsWith("bg") ? "bg" : "en");
  const L = () => C[lang] || C.en;
  const css = `
  .db-btn{position:fixed;right:20px;bottom:20px;width:58px;height:58px;border-radius:50%;background:${color};color:#fff;border:none;font-size:26px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);z-index:9999}
  .db-box{position:fixed;right:20px;bottom:90px;width:330px;max-width:calc(100vw - 40px);height:460px;background:#fff;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);display:none;flex-direction:column;overflow:hidden;font-family:system-ui,sans-serif;z-index:9999}
  .db-box.open{display:flex}
  .db-head{background:${color};color:#fff;padding:12px 14px;font-weight:600;display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
  .db-head small{display:block;font-weight:400;opacity:.85}
  .db-lang{display:flex;border:1px solid rgba(255,255,255,.6);border-radius:12px;overflow:hidden;flex-shrink:0}
  .db-lang button{background:transparent;color:#fff;border:none;padding:3px 8px;font-size:12px;cursor:pointer}
  .db-lang button.on{background:#fff;color:${color};font-weight:600}
  .db-msgs{flex:1;overflow-y:auto;padding:12px;background:#f6f6f6}
  .db-m{max-width:85%;padding:8px 11px;border-radius:12px;margin:6px 0;font-size:14px;line-height:1.35;white-space:pre-line}
  .db-bot{background:#fff;border:1px solid #e3e3e3}
  .db-user{background:${color};color:#fff;margin-left:auto}
  .db-chips{display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;border-top:1px solid #eee}
  .db-chip{border:1px solid ${color};color:${color};background:#fff;border-radius:16px;padding:5px 10px;font-size:13px;cursor:pointer}
  .db-in{display:flex;border-top:1px solid #eee}
  .db-in input{flex:1;border:none;padding:12px;font-size:14px;outline:none}
  .db-page{position:static;width:100%;max-width:none;height:100%;border-radius:18px}
  .db-in button{border:none;background:${color};color:#fff;padding:0 16px;cursor:pointer}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const btn = document.createElement("button"); btn.className = "db-btn"; btn.textContent = "💬"; btn.setAttribute("aria-label","Chat");
  const box = document.createElement("div"); box.className = "db-box";
  box.innerHTML = `<div class="db-head"><div><span class="db-title"></span><small class="db-tag"></small></div>
      <div class="db-lang"><button type="button" data-l="en">EN</button><button type="button" data-l="bg">BG</button></div></div>
    <div class="db-msgs"></div><div class="db-chips"></div>
    <form class="db-in"><input /><button class="db-send"></button></form>`;
  const mount = C.mount && document.querySelector(C.mount);
  if (mount) { box.classList.add("db-page", "open"); mount.appendChild(box); } else document.body.append(btn, box);
  const $ = s => box.querySelector(s);
  const msgs = $(".db-msgs"), chips = $(".db-chips"), form = $("form"), input = $("input");
  let booking = null;

  function say(text, who) {
    const d = document.createElement("div"); d.className = "db-m " + (who === "user" ? "db-user" : "db-bot");
    d.textContent = text; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }
  const esc = k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const has = (t, k) => new RegExp("(^|[^\\p{L}\\p{N}])" + esc(k), "u").test(t);
  const botSay = (t, delay) => setTimeout(() => say(t, "bot"), delay ?? 350);
  function setChips(list) {
    chips.innerHTML = "";
    (list || L().quick || []).forEach(q => { const b = document.createElement("button"); b.type="button"; b.className="db-chip"; b.textContent=q; b.onclick=()=>handle(q); chips.appendChild(b); });
  }
  function isOpenNow() {
    const now = new Date(), h = C.hoursByDay && C.hoursByDay[now.getDay()];
    if (!h) return false;
    const m = now.getHours()*60 + now.getMinutes();
    const [o, c] = h.map(t => { const [a,b]=t.split(":").map(Number); return a*60+b; });
    return m >= o && m < c;
  }
  const toMin = x => { const [a,b] = x.split(":").map(Number); return a*60+b; };
  function openDays() {
    const out = [], T = L(), loc = lang === "bg" ? "bg-BG" : "en-GB", now = new Date();
    for (let i = 0; i < 8 && out.length < 3; i++) {
      const d = new Date(now); d.setDate(now.getDate() + i);
      if (!C.hoursByDay[d.getDay()] || !timesFor(d).length) continue;
      const label = i === 0 ? T.today : i === 1 ? T.tomorrow : d.toLocaleDateString(loc, { weekday: "long" });
      out.push({ label, date: d });
    }
    return out;
  }
  function timesFor(d) {
    const h = C.hoursByDay[d.getDay()]; if (!h) return [];
    const [o, c] = h.map(toMin), now = new Date();
    const isToday = d.toDateString() === now.toDateString(), nowM = now.getHours()*60 + now.getMinutes() + 30;
    return (C.slots || []).filter(x => { const m = toMin(x); return m >= o && m <= c - 30 && (!isToday || m >= nowM); });
  }
  function stepOptions(s) {
    if (s.key === "day") { booking.days = openDays(); return booking.days.map(x => x.label); }
    if (s.key === "time") { const p = (booking.days || []).find(x => x.label === booking.data.day); return p ? timesFor(p.date) : (C.slots || []); }
    return s.options || [];
  }
  function bookingFlow(text) {
    const T = L(), B = T.booking, steps = B.steps;
    if (text && T.cancelWords.some(w => has(text.toLowerCase(), w))) { booking = null; botSay(T.cancelled); return setChips(); }
    if (text) booking.data[steps[booking.step].key] = text;
    booking.step++;
    if (booking.step < steps.length) { const s = steps[booking.step]; botSay(s.ask); setChips([...stepOptions(s), T.cancel]); }
    else { botSay(B.confirm.replace(/\{(\w+)\}/g, (_, k) => { const v = booking.data[k] || ""; return k === "day" && (lang === "bg" || v === T.today || v === T.tomorrow) ? v.toLowerCase() : v; })); booking = null; setChips(); }
  }
  function handle(text) {
    text = (text || "").trim(); if (!text) return;
    say(text, "user");
    if (booking) return bookingFlow(text);
    const t = text.toLowerCase(), T = L();
    if (T.booking && T.booking.triggers.some(w => has(t, w))) { booking = { step: -1, data: {} }; return bookingFlow(null); }
    if (T.hoursKeys.some(k => has(t, k))) { botSay((isOpenNow() ? T.openNow : T.closedNow) + " " + T.hoursText); return setChips(); }
    for (const f of T.faq || []) if (f.keys.some(k => has(t, k))) { botSay(f.answer); return setChips(); }
    botSay(T.fallback); setChips();
  }
  function render(reset) {
    const T = L();
    $(".db-title").textContent = T.name; $(".db-tag").textContent = T.tagline;
    input.placeholder = T.placeholder; $(".db-send").textContent = T.send;
    box.querySelectorAll(".db-lang button").forEach(b => b.classList.toggle("on", b.dataset.l === lang));
    if (reset) { msgs.innerHTML = ""; booking = null; botSay(T.greeting, 100); setChips(); }
  }
  box.querySelectorAll(".db-lang button").forEach(b => b.onclick = () => { if (b.dataset.l !== lang) { lang = b.dataset.l; render(true); } });
  form.onsubmit = e => { e.preventDefault(); handle(input.value); input.value = ""; };
  let started = false;
  render(false);
  if (mount) { started = true; render(true); }
  btn.onclick = () => { box.classList.toggle("open"); if (!started) { started = true; render(true); } };
  window.DemoBot = { setLang: l => { lang = l; render(true); } };
})();
