/* Demo booking assistant (EN/BG) with input validation and guardrails.
   Set window.BOT_CONFIG, then load this file. All text is rendered with textContent (no HTML injection). */
(function () {
  const C = window.BOT_CONFIG || {};
  const color = C.color || "#2f6f4f";
  const PHONE_ = { en: C.phone || "+359 00 000 000 (demo number)", bg: C.phoneBg || C.phone || "+359 00 000 000 (демо номер)" };
  const qLang = new URLSearchParams(location.search).get("lang");
  let lang = (qLang === "bg" || qLang === "en") ? qLang : (C.defaultLang || ((navigator.language || "").startsWith("bg") ? "bg" : "en"));
  const L = () => C[lang] || C.en;

  /* ---------- built-in system text ---------- */
  const S = {
    en: {
      intro: "I'm the virtual assistant (a demo), not a person.",
      tryAgain: "Sorry, I didn't catch that. Please choose one of these:",
      noSlots: "There are no free times left that day. Please pick another day:",
      badName: "Please enter a real name using letters only (2 to 40 characters).",
      badNamePet: "Please enter your name and your pet's name using letters only, like \"Ana and Rex\".",
      badPhone: "Please enter a valid phone number, like 0888 123 456 or +359 888 123 456.",
      askPhone: "And a phone number so the shop can confirm?",
      abuse: "Let's keep it friendly, please. I can help with prices, services, opening hours and bookings.",
      offTopic: "Sorry, I can only help with questions about {biz}: prices, services, opening hours, location and bookings.",
      human: "I'm a virtual assistant (a demo), not a person. For anything I can't answer, you can call {phone}.",
      privacy: "Please don't share card numbers, passwords or other private details here. I only need a name and a phone number, and payment happens in person.",
      unknown: "I'm not sure about that one, sorry. I can help with prices, services, opening hours, location and bookings, or you can call {phone} and the team will answer.",
      back: "Now, back to your booking.",
      callUs: "Having trouble? You can also call us on {phone} and we'll sort it out.",
      summary: "Please check your booking:",
      confirm: "Confirm", edit: "Edit", cancel: "Cancel", which: "What would you like to change?",
      confirmOrEdit: "Please tap Confirm to book, Edit to change something, or Cancel.",
      labels: { service: "Service", pet: "Pet", people: "People", day: "Day", time: "Time", name: "Name", phone: "Phone" },
      at: "at"
    },
    bg: {
      intro: "Аз съм виртуалният асистент (демо), а не човек.",
      tryAgain: "Извинете, не разбрах. Моля, изберете една от тези опции:",
      noSlots: "За този ден няма свободни часове. Моля, изберете друг ден:",
      badName: "Моля, въведете истинско име само с букви (от 2 до 40 символа).",
      badNamePet: "Моля, въведете вашето име и името на любимеца само с букви, например „Ана и Рекс“.",
      badPhone: "Моля, въведете валиден телефонен номер, например 0888 123 456 или +359 888 123 456.",
      askPhone: "И телефонен номер, за да потвърдим часа?",
      abuse: "Нека запазим добрия тон, моля. Мога да помогна с цени, услуги, работно време и резервации.",
      offTopic: "Извинете, мога да помогна само с въпроси за {biz}: цени, услуги, работно време, адрес и резервации.",
      human: "Аз съм виртуален асистент (демо), а не човек. За всичко, на което не мога да отговоря, можете да се обадите на {phone}.",
      privacy: "Моля, не споделяйте номера на карти, пароли или други лични данни тук. Нужни са ми само име и телефон, а плащането е на място.",
      unknown: "Не съм сигурен за това, извинете. Мога да помогна с цени, услуги, работно време, адрес и резервации, а за друго можете да се обадите на {phone}.",
      back: "Да продължим с резервацията.",
      callUs: "Нещо не се получава? Можете да ни се обадите и на {phone} и ще го уредим.",
      summary: "Моля, проверете резервацията си:",
      confirm: "Потвърди", edit: "Промени", cancel: "Отказ", which: "Какво искате да промените?",
      confirmOrEdit: "Моля, натиснете „Потвърди“, за да запазите, „Промени“, за да коригирате, или „Отказ“.",
      labels: { service: "Услуга", pet: "Любимец", people: "Брой хора", day: "Ден", time: "Час", name: "Име", phone: "Телефон" },
      at: "в"
    }
  };
  const s = () => S[lang];
  const fill = (t, o) => t.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? "");

  /* ---------- text helpers ---------- */
  const norm = t => (t || "").toLowerCase().normalize("NFKC").trim();
  const esc = k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const has = (t, k) => new RegExp("(^|[^\\p{L}\\p{N}])" + esc(k), "u").test(t);
  function lev(a, b) {
    const m = a.length, n = b.length; if (Math.abs(m - n) > 2) return 9;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
    return prev[n];
  }
  // how well text t matches a key: exact word-start match, or a near miss (typo) for longer single-word keys
  function keyScore(t, k) {
    k = norm(k); if (has(t, k)) return k.length;
    if (k.length < 5) return 0;
    const n = k.split(" ").length, tol = (k.length >= 8 && n === 1) ? 2 : 1;
    const ws = t.split(/[^\p{L}]+/u).filter(Boolean);
    for (let i = 0; i + n <= ws.length; i++) {
      const w = ws.slice(i, i + n).join(" ");
      if (lev(w, k) <= tol) return k.length * 0.8;
      if (n === 1 && k.length >= 6 && w.length > k.length && lev(w.slice(0, k.length), k) <= 1) return k.length * 0.7;
    }
    return 0;
  }
  const hasCyr = t => /[\u0400-\u04FF]/.test(t);
  const hasLat = t => /[a-z]/i.test(t);

  // Profanity / abuse. Word-start stems, plus a compacted check for spaced-out or leetspeak versions of the worst words.
  const BAD_STEMS = ["fuck","f*ck","fck","shit","bitch","cunt","pussy","asshole","arsehole","bastard","whore","slut","nigg","retard","wank","twat","motherf","dickhead","porn","penis","vagina",
    "путк","пичк","ебан","ебах","ебем","ебал","шиба","курв","хуй","хуя","педал","мамка ти","майка ти","майна ти","майната ти","тъпанар","кретен","дебил","пенис","копел"];
  const BAD_WORDS = ["dick","dicks","cock","cocks","sex","sexy","tits","boob","boobs","fag","fags","idiot","moron","jerk","suck my","kill you","stupid bot","dumb bot","kys",
    "еба","еби","пишка","пишки","пишко","кур","кура","курът","гъз","задник","лайна","лайно","идиот","простак","секс","цици","тъп бот"];
  const BAD_COMPACT = ["fuck","shit","cunt","bitch","asshole","whore","slut","путка","пичка","пишка","майнати","ебах","ебем","шибан","курва","хуй"];
  const LEET = { "0":"o","1":"i","3":"e","4":"a","5":"s","7":"t","@":"a","$":"s","!":"i" };
  const word = (t, w) => new RegExp("(^|[^\\p{L}])" + esc(w) + "($|[^\\p{L}])", "u").test(t);
  function isAbusive(raw) {
    const t = norm(raw);
    if (BAD_STEMS.some(w => has(t, w)) || BAD_WORDS.some(w => word(t, w))) return true;
    const compact = t.replace(/[013457@$!]/g, c => LEET[c]).replace(/[^\p{L}]/gu, "").replace(/(.)\1+/gu, "$1");
    return BAD_COMPACT.some(w => compact.includes(w.replace(/(.)\1+/gu, "$1")));
  }
  function maskForDisplay(raw) {
    let t = raw.replace(/\d[\d \-]{12,}\d/g, m => m.replace(/\D/g, "").length >= 14 ? m.replace(/\d/g, "•") : m);
    return isAbusive(t) ? "•••" : t;
  }
  const PRIVATE = ["card number","card no","card details","cvv","cvc","iban","pin code","password","passport number","егн","номер на карта","данни на карта","парола","номер на паспорт","лична карта"];
  const isPrivate = raw => { const t = norm(raw); return PRIVATE.some(k => t.includes(k)) || (t.match(/\d[\d \-]*\d/g) || []).some(m => m.replace(/\D/g, "").length >= 14); };
  const HUMAN = ["are you human","are you a human","are you real","real person","are you a person","are you a bot","are you a robot","talk to a human","човек ли","истински човек","бот ли","робот ли","жив човек","с човек"];

  /* ---------- UI ---------- */
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
  .db-m{max-width:85%;padding:8px 11px;border-radius:12px;margin:6px 0;font-size:14px;line-height:1.35;white-space:pre-line;overflow-wrap:anywhere}
  .db-bot{background:#fff;border:1px solid #e3e3e3}
  .db-user{background:${color};color:#fff;margin-left:auto}
  .db-chips{display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;border-top:1px solid #eee}
  .db-chip{border:1px solid ${color};color:${color};background:#fff;border-radius:16px;padding:5px 10px;font-size:13px;cursor:pointer}
  .db-chip.pri{background:${color};color:#fff}
  .db-in{display:flex;border-top:1px solid #eee}
  .db-in input{flex:1;border:none;padding:12px;font-size:14px;outline:none;min-width:0}
  .db-page{position:static;width:100%;max-width:none;height:100%;border-radius:18px}
  .db-in button{border:none;background:${color};color:#fff;padding:0 16px;cursor:pointer}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const btn = document.createElement("button"); btn.className = "db-btn"; btn.textContent = "💬"; btn.setAttribute("aria-label", "Chat");
  const box = document.createElement("div"); box.className = "db-box";
  box.innerHTML = `<div class="db-head"><div><span class="db-title"></span><small class="db-tag"></small></div>
      <div class="db-lang"><button type="button" data-l="en">EN</button><button type="button" data-l="bg">BG</button></div></div>
    <div class="db-msgs" aria-live="polite"></div><div class="db-chips"></div>
    <form class="db-in"><input maxlength="200" autocomplete="off" /><button class="db-send"></button></form>`;
  const mount = C.mount && document.querySelector(C.mount);
  if (mount) { box.classList.add("db-page", "open"); mount.appendChild(box); } else document.body.append(btn, box);
  const $ = q => box.querySelector(q);
  const msgs = $(".db-msgs"), chips = $(".db-chips"), form = $("form"), input = $("input");

  function say(text, who) {
    const d = document.createElement("div"); d.className = "db-m " + (who === "user" ? "db-user" : "db-bot");
    d.textContent = text; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }
  let q = 0; // queue bot messages so they keep order
  function botSay(t) { const delay = 300 + 250 * q++; setTimeout(() => { say(t, "bot"); q = Math.max(0, q - 1); }, delay); }
  function setChips(list, primaryFirst) {
    chips.innerHTML = "";
    (list || L().quick || []).forEach((label, i) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "db-chip" + (primaryFirst && i === 0 ? " pri" : "");
      b.textContent = label; b.onclick = () => handle(label); chips.appendChild(b);
    });
  }

  /* ---------- hours and slots ---------- */
  const toMin = x => { const [a, b] = x.split(":").map(Number); return a * 60 + b; };
  function isOpenNow() {
    const now = new Date(), h = C.hoursByDay && C.hoursByDay[now.getDay()];
    if (!h) return false;
    const m = now.getHours() * 60 + now.getMinutes(), [o, c] = h.map(toMin);
    return m >= o && m < c;
  }
  function timesFor(d) {
    const h = C.hoursByDay[d.getDay()]; if (!h) return [];
    const [o, c] = h.map(toMin), now = new Date();
    const isToday = d.toDateString() === now.toDateString(), nowM = now.getHours() * 60 + now.getMinutes() + 30;
    return (C.slots || []).filter(x => { const m = toMin(x); return m >= o && m <= c - 30 && (!isToday || m >= nowM); });
  }
  function openDates() {
    const out = [], now = new Date();
    for (let i = 0; i < 14 && out.length < 5; i++) {
      const d = new Date(now); d.setHours(12, 0, 0, 0); d.setDate(now.getDate() + i);
      if (timesFor(i === 0 ? now : d).length) out.push(d);
    }
    return out;
  }
  function dayLabel(d, lg) {
    lg = lg || lang;
    const now = new Date(), diff = Math.round((new Date(d).setHours(0,0,0,0) - new Date(now).setHours(0,0,0,0)) / 864e5);
    if (diff === 0) return lg === "bg" ? "Днес" : "Today";
    if (diff === 1) return lg === "bg" ? "Утре" : "Tomorrow";
    const w = d.toLocaleDateString(lg === "bg" ? "bg-BG" : "en-GB", { weekday: "long" });
    return w.charAt(0).toUpperCase() + w.slice(1);
  }
  function matchDay(raw) {
    const t = norm(raw).replace(/[^\p{L}\s]/gu, "").trim(); if (!t) return null;
    for (const d of booking.dates) {
      for (const lg of ["en", "bg"]) {
        const lab = norm(dayLabel(d, lg)), wd = norm(d.toLocaleDateString(lg === "bg" ? "bg-BG" : "en-GB", { weekday: "long" }));
        if (t === lab || t === wd || (t.length >= 3 && (wd.startsWith(t) || lab.startsWith(t)))) return d;
      }
    }
    return null;
  }
  function matchTime(raw, valid) {
    const m = norm(raw).replace(/\s+/g, "").match(/^(\d{1,2})(?:[:.h](\d{2}))?(am|pm|ч|ч\.)?$/);
    if (!m) return null;
    let h = +m[1]; const mm = m[2] || "00";
    if (m[3] === "pm" && h < 12) h += 12; if (m[3] === "am" && h === 12) h = 0;
    const v = String(h).padStart(2, "0") + ":" + mm;
    return valid.includes(v) ? v : null;
  }
  function matchOption(raw, step) {
    const t = norm(raw); if (!t) return -1;
    const lists = [C.en, C.bg].map(x => (x.booking.steps.find(z => z.key === step.key) || {}).options || []);
    for (const list of lists) {
      let i = list.findIndex(o => norm(o) === t); if (i >= 0) return i;
      const hits = list.map((o, j) => norm(o).startsWith(t) || (t.length >= 3 && norm(o).includes(t)) ? j : -1).filter(j => j >= 0);
      if (hits.length === 1) return hits[0];
    }
    return -1;
  }
  function validName(raw, pet) {
    const t = raw.trim().replace(/\s+/g, " ");
    if (t.length < 2 || t.length > (pet ? 60 : 40)) return null;
    if (!(pet ? /^[\p{L}][\p{L} '.,&-]*$/u : /^[\p{L}][\p{L} '.-]*$/u).test(t)) return null;
    if (/(\p{L})\1\1/iu.test(t)) return null;              // "aaaa", "ккк"
    if (t.split(" ").length > (pet ? 7 : 4)) return null;
    if (isAbusive(t)) return null;
    if (t !== t.toLowerCase()) return t;
    return t.split(" ").map(w => ["and","и","&"].includes(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }
  function validPhone(raw) {
    const t = raw.trim();
    if (!/^\+?[\d \-()]{9,18}$/.test(t)) return null;
    const digits = t.replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 13 ? t.replace(/\s+/g, " ") : null;
  }

  /* ---------- booking state ---------- */
  let booking = null, fails = 0, misses = 0;
  const steps = () => { const st = L().booking.steps.slice(); if (!st.some(x => x.key === "phone")) st.push({ key: "phone", ask: null }); return st; };
  const stepAsk = st => st.key === "phone" ? s().askPhone : (L().booking.steps.find(z => z.key === st.key) || st).ask;
  function stepChoices(st) {
    if (st.key === "day") { booking.dates = openDates(); return booking.dates.map(d => dayLabel(d)); }
    if (st.key === "time") return booking.day ? timesFor(booking.day.toDateString() === new Date().toDateString() ? new Date() : booking.day) : [];
    return (L().booking.steps.find(z => z.key === st.key) || {}).options || [];
  }
  function valueText(key) {
    const v = booking.data[key]; if (v == null) return "";
    if (key === "day") return dayLabel(v);
    if (typeof v === "number") { const st = L().booking.steps.find(z => z.key === key); return st.options[v]; }
    return v;
  }
  function ask(stepIdx) {
    booking.step = stepIdx;
    const st = steps()[stepIdx], ch = stepChoices(st);
    if (st.key === "time" && !ch.length) { booking.data.day = null; booking.day = null; return ask(steps().findIndex(x => x.key === "day")); }
    botSay(stepAsk(st));
    setChips([...ch, s().cancel]);
  }
  function retry(msg) {
    fails++;
    const st = steps()[booking.step];
    if (msg) botSay(msg); else botSay(s().tryAgain);
    if (fails >= 3) { botSay(fill(s().callUs, { phone: PHONE_[lang] })); fails = 0; }
    setChips([...stepChoices(st), s().cancel]);
  }
  function showSummary() {
    booking.step = "summary";
    const lines = steps().map(st => "• " + s().labels[st.key] + ": " + valueText(st.key));
    botSay(s().summary + "\n" + lines.join("\n"));
    setChips([s().confirm, s().edit, s().cancel], true);
  }
  function nextOrSummary() {
    if (booking.editing) { if (booking.needTime) { booking.needTime = false; return ask(steps().findIndex(x => x.key === "time")); } booking.editing = false; return showSummary(); }
    const n = booking.step + 1;
    if (n < steps().length) ask(n); else showSummary();
  }
  const QWORDS = ["how","what","when","where","which","who","why","do you","does","can i","can you","is there","are there","is it","колко","как","какв","кога","къде","кой","коя","кое","защо","има ли","може ли","мога ли","правите ли","приемате ли","работите ли"];
  const isQuestion = raw => /\?/.test(raw) || QWORDS.some(w => norm(raw).indexOf(w) === 0 && word(norm(raw), w));
  const OFF = ["bitcoin","биткойн","crypto","крипто","weather","времето","прогноза","politic","полити","news","новини","joke","виц","poem","стих","homework","домашн","recipe","рецепт","stock","акции","football","футбол","code","програм","chatgpt","translate","преведи","casino","казино","loan","кредит","dating","запознанств","president","президент","election","избори"];
  // Answer a free-form question only from this business's config. Returns true if it said something.
  function answerFree(raw, unknownToo) {
    const q = norm(raw), B = L();
    if (HUMAN.some(k => q.includes(k))) { botSay(fill(s().human, { phone: PHONE_[lang] })); return true; }
    if (OFF.some(w => has(q, w))) { botSay(fill(s().offTopic, { biz: B.name })); return true; }
    let best = -1, bestScore = 0;
    const en = C.en.faq || [], bg = C.bg.faq || [];
    for (let i = 0; i < Math.max(en.length, bg.length); i++) {
      const keys = [...((en[i] || {}).keys || []), ...((bg[i] || {}).keys || [])];
      const sc = keys.reduce((acc, k) => acc + keyScore(q, k), 0);
      if (sc > bestScore) { bestScore = sc; best = i; }
    }
    const hk = [...(C.en.hoursKeys || []), ...(C.bg.hoursKeys || []), "hours", "opening", "close", "closing", "работите", "работно време", "затваряте"];
    const hs = hk.reduce((acc, k) => acc + keyScore(q, k), 0);
    if (hs > 0 && hs >= bestScore) { botSay((isOpenNow() ? B.openNow : B.closedNow) + " " + B.hoursText); return true; }
    if (best >= 0 && bestScore >= 3) { botSay((B.faq[best] || en[best] || bg[best]).answer); return true; }
    if (unknownToo) { botSay(fill(s().unknown, { phone: PHONE_[lang] })); return true; }
    return false;
  }
  // mid-booking: answer the question, then repeat the current step
  function answerThenResume(raw) {
    if (!answerFree(raw, isQuestion(raw))) return false;
    botSay(s().back);
    if (booking.step === "summary") { showSummary(); return true; }
    if (booking.step === "pick") { botSay(s().which); setChips([...steps().map(st => s().labels[st.key]), s().cancel]); return true; }
    ask(booking.step); return true;
  }

  // switch language only for a real sentence: 2+ words in the other script, at least one a known word
  const COMMON = { en: ["the","you","your","do","does","is","are","can","have","how","what","when","where","much","price","open","book","want","need","please","hi","hello","my","for","a","an","it","there","time","today","tomorrow"],
                   bg: ["как","какво","кога","къде","колко","има","ли","искам","може","мога","да","за","на","в","се","сте","вие","час","цена","цени","моля","здравейте","здрасти","утре","днес","работите","отворени"] };
  function looksLike(raw, lg) {
    const ws = norm(raw.replace(/<[^>]*>/g, " ")).split(/[^\p{L}]+/u).filter(Boolean);
    const inScript = ws.filter(w => lg === "bg" ? /^[\u0400-\u04FF]+$/.test(w) : /^[a-z]+$/.test(w));
    if (inScript.length < 2 || inScript.length < ws.length / 2) return false;
    const known = [...COMMON[lg], ...((C[lg].faq || []).flatMap(f => f.keys)), ...(C[lg].hoursKeys || []), ...(C[lg].booking.triggers || [])];
    return inScript.some(w => w.length >= 3 && known.some(k => !k.includes(" ") && k.length >= 3 && (w === k || (k.length >= 4 && w.startsWith(k)))));
  }

  function bookingInput(raw) {
    const T = L(), t = norm(raw);
    const isCancel = [s().cancel, ...T.cancelWords, ...(C.en.cancelWords || []), ...(C.bg.cancelWords || [])].some(w => has(t, norm(w)));
    if (isCancel && !isQuestion(raw)) { booking = null; fails = 0; botSay(T.cancelled); return setChips(); }

    if (booking.step === "summary") {
      if ([S.en.confirm, S.bg.confirm, "yes", "ok", "да", "добре"].some(w => t === norm(w))) {
        const vals = {}; steps().forEach(st => vals[st.key] = valueText(st.key));
        vals.day = (lang === "bg" || /^(Today|Tomorrow)$/.test(vals.day)) ? vals.day.toLowerCase() : vals.day;
        botSay(fill(T.booking.confirm, vals)); booking = null; fails = 0; misses = 0; return setChips();
      }
      if ([S.en.edit, S.bg.edit, "change", "промени"].some(w => t === norm(w))) {
        booking.step = "pick"; botSay(s().which);
        return setChips([...steps().map(st => s().labels[st.key]), s().cancel]);
      }
      if (answerThenResume(raw)) return;
      botSay(s().confirmOrEdit); return setChips([s().confirm, s().edit, s().cancel], true);
    }
    if (booking.step === "pick") {
      const i = steps().findIndex(st => [S.en.labels[st.key], S.bg.labels[st.key]].some(l => norm(l) === t));
      if (i < 0 && answerThenResume(raw)) return;
      if (i < 0) { botSay(s().which); return setChips([...steps().map(st => s().labels[st.key]), s().cancel]); }
      booking.editing = true; booking.needTime = steps()[i].key === "day"; return ask(i);
    }

    const st = steps()[booking.step];
    if (st.key === "day") {
      const d = matchDay(raw); if (!d) return answerThenResume(raw) || retry();
      booking.data.day = d; booking.day = d; fails = 0;
      if (!timesFor(d.toDateString() === new Date().toDateString() ? new Date() : d).length) return retry(s().noSlots);
      return nextOrSummary();
    }
    if (st.key === "time") {
      const v = matchTime(raw, stepChoices(st)); if (!v) return answerThenResume(raw) || retry();
      booking.data.time = v; fails = 0; return nextOrSummary();
    }
    if (st.key === "name") {
      const pet = (T.booking.steps.find(z => z.key === "pet")) != null;
      const v = isQuestion(raw) ? null : validName(raw, pet); if (!v) return answerThenResume(raw) || retry(pet ? s().badNamePet : s().badName);
      booking.data.name = v; fails = 0; return nextOrSummary();
    }
    if (st.key === "phone") {
      const v = validPhone(raw); if (!v) return answerThenResume(raw) || retry(s().badPhone);
      booking.data.phone = v; fails = 0; return nextOrSummary();
    }
    const i = matchOption(raw, st); if (i < 0) return answerThenResume(raw) || retry();
    booking.data[st.key] = i; fails = 0; return nextOrSummary();
  }

  /* ---------- main handler ---------- */
  function handle(raw) {
    raw = (raw || "").slice(0, 200).trim(); if (!raw) return;
    say(maskForDisplay(raw), "user");

    // Rule 10: answer in the customer's language (not while typing a name or phone, which can be in any script)
    const freeStep = booking && typeof booking.step === "number" && ["name", "phone"].includes(steps()[booking.step].key);
    const NEUTRAL = ["ok","okay","oki","ок","да","не","yes","no","hi"];
    if (!freeStep && !NEUTRAL.includes(norm(raw).replace(/[^\p{L}]/gu, "")) && looksLike(raw, lang === "en" ? "bg" : "en")) {
      const want = lang === "en" ? "bg" : "en";
      if (want !== lang) { lang = want; render(false); }
    }

    if (isAbusive(raw)) { botSay(s().abuse); if (++misses >= 3) { botSay(fill(s().callUs, { phone: PHONE_[lang] })); misses = 0; } return booking ? null : setChips(); }
    if (isPrivate(raw) && !(freeStep && steps()[booking.step].key === "phone")) { botSay(s().privacy); return; }
    if (booking) return bookingInput(raw);

    const t = norm(raw);
    const wantsBooking = [...C.en.booking.triggers, ...C.bg.booking.triggers, "запиш", "записв", "booking"].some(w => has(t, w)) || word(t, "час");
    if (wantsBooking && !isQuestion(raw)) { booking = { data: {} }; fails = 0; return ask(0); }
    if (answerFree(raw, false)) { misses = 0; return setChips(); }
    if (wantsBooking) { booking = { data: {} }; fails = 0; return ask(0); }
    botSay(fill(s().unknown, { phone: PHONE_[lang] }));
    setChips();
  }

  function render(reset) {
    const T = L();
    $(".db-title").textContent = T.name; $(".db-tag").textContent = T.tagline;
    input.placeholder = T.placeholder; $(".db-send").textContent = T.send;
    box.querySelectorAll(".db-lang button").forEach(b => b.classList.toggle("on", b.dataset.l === lang));
    if (typeof window.onBotLang === "function") window.onBotLang(lang);
    if (reset) { msgs.innerHTML = ""; booking = null; fails = 0; misses = 0; botSay(T.greeting + " " + s().intro); setChips(); }
  }
  box.querySelectorAll(".db-lang button").forEach(b => b.onclick = () => { if (b.dataset.l !== lang) { lang = b.dataset.l; render(true); } });
  form.onsubmit = e => { e.preventDefault(); handle(input.value); input.value = ""; };
  let started = false;
  render(false);
  if (mount) { started = true; render(true); }
  btn.onclick = () => { box.classList.toggle("open"); if (!started) { started = true; render(true); } };
  window.DemoBot = { setLang: l => { lang = l; render(true); }, _handle: handle };
})();
