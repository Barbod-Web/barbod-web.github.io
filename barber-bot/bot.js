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
      dayNA: "Sorry, we can't take bookings for that day. Please choose one of these:",
      notOffered: "Sorry, that's not something we offer. I can help with our services, prices, opening hours and bookings, or you can call {phone}.",
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
      dayNA: "Съжаляваме, за този ден не можем да приемем резервация. Моля, изберете един от тези дни:",
      notOffered: "Съжаляваме, това не го предлагаме. Мога да помогна с услугите, цените, работното време и резервациите, а можете и да се обадите на {phone}.",
      labels: { service: "Услуга", pet: "Любимец", people: "Брой хора", day: "Ден", time: "Час", name: "Име", phone: "Телефон" },
      at: "в"
    }
  };
  const s = () => S[lang];
  const fill = (t, o) => t.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? "");

  /* ---------- text helpers ---------- */
  const norm = t => (t || "").replace(/[\u200b-\u200d\u2060\ufeff]/g, "").toLowerCase().normalize("NFKC").trim();
  const esc = k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const has = (t, k) => new RegExp("(^|[^\\p{L}\\p{N}])" + esc(k), "u").test(t);
  function lev(a, b) {
    const m = a.length, n = b.length; if (Math.abs(m - n) > 2) return 9;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
    return prev[n];
  }
  // how well text t matches a key: exact word-start match, or a near miss (typo) for longer single-word keys
  // words that are close in spelling to a key but mean something else ("there"~"where", "have"~"shave")
  const NO_FUZZY = ["there","these","those","here","have","heard","clear","near","share","shape","shade","sheer","cheat","chess","yours","house","кара","показ","карат"];
  function keyScore(t, k) {
    k = norm(k);
    if (k.endsWith("$")) { k = k.slice(0, -1); return word(t, k) ? k.length : 0; }   // "car$" = whole word only
    if (/^[a-z]{1,4}$/.test(k)) return new RegExp("(^|[^\\p{L}])" + esc(k) + "(s|es|'s|ing|ed)?($|[^\\p{L}])", "u").test(t) ? k.length : 0; // short English keys: no "kid"->"kidding", "late"->"later"
    if (has(t, k)) return k.length;
    if (k.length < 5) return 0;
    const n = k.split(" ").length, tol = (k.length >= 8 && n === 1) ? 2 : 1;
    const ws = t.split(/[^\p{L}]+/u).filter(Boolean);
    for (let i = 0; i + n <= ws.length; i++) {
      const w = ws.slice(i, i + n).join(" ");
      if (w[0] !== k[0] || NO_FUZZY.includes(w) || w.length < 4) continue;      // typos keep the first letter
      if (lev(w, k) <= tol) return k.length * 0.8;
      if (n === 1 && k.length >= 6 && w.length > k.length && lev(w.slice(0, k.length), k) <= 1) return k.length * 0.7;
    }
    return 0;
  }
  const hasCyr = t => /[\u0400-\u04FF]/.test(t);
  const hasLat = t => /[a-z]/i.test(t);

  // Profanity / abuse. Word-start stems, plus a compacted check for spaced-out or leetspeak versions of the worst words.
  const BAD_STEMS = ["fuck","f*ck","fck","shit","bitch","cunt","pussy","asshole","arsehole","bastard","whore","slut","nigg","retard","wank","twat","motherf","dickhead","porn","penis","vagina",
    "путк","пичк","ебан","ебах","ебем","ебал","курв","хуй","хуя","педал","мамка ти","майка ти","майна ти","майната ти","тъпанар","кретен","дебил","пенис","копел","педерас","fuk","phuck","fcuk","kopele","copele","шибан","шибал","шибай","шибам","шибаш","шибе","шибн","мамата ти","майката ти"];
  const BAD_WORDS = ["dick","dicks","cock","cocks","sex","sexy","tits","boob","boobs","fag","fags","idiot","moron","jerk","suck my","kill you","stupid bot","dumb bot","kys",
    "еба","еби","пишка","пишки","пишко","кур","кура","курът","гъз","задник","лайна","лайно","идиот","простак","секс","цици","тъп бот","фак"];
  const BAD_COMPACT = ["fuck","shit","cunt","bitch","asshole","whore","slut","путка","пичка","пишка","майнати","ебах","ебем","шибан","курва","хуй"];
  const LEET = { "0":"o","1":"i","3":"e","4":"a","5":"s","7":"t","@":"a","$":"s","!":"i" };
  const word = (t, w) => new RegExp("(^|[^\\p{L}])" + esc(w) + "($|[^\\p{L}])", "u").test(t);
  // Bulgarian typed in Latin letters ("shlyokavitsa"): kolko struva -> колко струва, pi6ka -> пишка
  function translit(t) {
    const M = [["sht","щ"],["sh","ш"],["ch","ч"],["zh","ж"],["ts","ц"],["yu","ю"],["ju","ю"],["iu","ю"],["ya","я"],["ja","я"],["ia","я"],["ai","ай"],["ei","ей"],["oi","ой"],["ui","уй"],["6","ш"],["4","ч"],
               ["a","а"],["b","б"],["c","ц"],["d","д"],["e","е"],["f","ф"],["g","г"],["h","х"],["i","и"],["j","й"],["k","к"],["l","л"],["m","м"],["n","н"],["o","о"],["p","п"],
               ["q","я"],["r","р"],["s","с"],["t","т"],["u","у"],["v","в"],["w","в"],["x","кс"],["y","й"],["z","з"]];
    let out = "", i = 0; t = norm(t);
    while (i < t.length) { const m = M.find(([l]) => t.startsWith(l, i)); if (m) { out += m[1]; i += m[0].length; } else { out += t[i]; i++; } }
    return out;
  }
  // a word mixing Latin and Cyrillic look-alike letters ("пишкa", "fuсk") is folded into one script
  const HOMO_C = { a:"а", e:"е", o:"о", p:"р", c:"с", x:"х", y:"у", k:"к", m:"м", t:"т", b:"в", h:"н", i:"і" };
  const HOMO_L = Object.fromEntries(Object.entries(HOMO_C).map(([l, c]) => [c, l]).concat([["і","i"],["ѕ","s"],["ј","j"],["и","u"]]));
  function unHomoglyph(t) {
    return t.replace(/[\p{L}\d*@$!]+/gu, w => {
      if (!(/[a-z]/.test(w) && /[\u0400-\u04FF]/.test(w))) return w;
      const cyr = (w.match(/[\u0400-\u04FF]/g) || []).length, lat = (w.match(/[a-z]/g) || []).length;
      return cyr >= lat ? w.replace(/[a-z]/g, c => HOMO_C[c] || c).replace(/і/g, "и") : w.replace(/[\u0400-\u04FF]/g, c => HOMO_L[c] || c);
    });
  }
  function abusiveText(t) {
    t = t.replace(/(^|[^\p{L}])(shitzu|shitsu|shiitake|scunthorpe)(?=$|[^\p{L}])/gu, "$1");   // dog breed typed as "shitzu", etc.
    if (BAD_STEMS.some(w => has(t, w)) || BAD_WORDS.some(w => word(t, w))) return true;
    // per word (so "a bit cheaper", "who really", "wash it" are fine), plus runs of single letters ("f u c k")
    const toks = t.replace(/[013457@$!]/g, c => LEET[c]).split(/[^\p{L}*]+/u).filter(Boolean);
    const words = [], run = [];
    for (const w of toks) { if (w.replace(/\*/g, "").length <= 1) run.push(w); else { if (run.length > 2) words.push(run.join("")); run.length = 0; words.push(w); } }
    if (run.length > 2) words.push(run.join(""));
    return words.some(w0 => {
      const w = w0.replace(/(\p{L})\1+/gu, "$1");
      return [...BAD_COMPACT, "фак"].some(b0 => {
        const b = b0.replace(/(.)\1+/gu, "$1");
        if (b0 !== "фак" && (w.startsWith(b) || (b.length >= 4 && w.endsWith(b)) || (b === "fuck" && w.includes(b)))) return true;
        if (w.includes("*")) {   // masked letters: f**k, sh*t, п*тка
          const rx = new RegExp("^" + b[0] + b.slice(1, -1).split("").map(ch => "(?:" + esc(ch) + "|\\*+)").join("") + esc(b.slice(-1)));
          return rx.test(w.replace(/\*+/g, m => m)) && (w.match(/\*/g) || []).length < b.length - 1;
        }
        return false;
      });
    });
  }
  function isAbusive(raw) {
    const t = unHomoglyph(norm(raw));
    if (abusiveText(t)) return true;
    return /[a-z]/.test(t) && abusiveText(translit(t));
  }
  function maskForDisplay(raw) {
    let t = raw.replace(/\d[\d \-]{12,}\d/g, m => m.replace(/\D/g, "").length >= 14 ? m.replace(/\d/g, "•") : m);
    return isAbusive(t) ? "•••" : t;
  }
  const PRIVATE = ["card number","card no","card details","cvv","cvc","iban","pin code","password","passport number","егн","номер на карта","данни на карта","парола","номер на паспорт","лична карта"];
  const isPrivate = raw => { const t = norm(raw); return PRIVATE.some(k => t.includes(k)) || (t.match(/\d[\d \-]*\d/g) || []).some(m => m.replace(/\D/g, "").length >= 14); };
  const HUMAN = ["are you human","are you a human","are you real","real person","are you a person","are you a bot","are you a robot","talk to a human","човек ли","истински човек","бот ли","робот ли","жив човек","с човек","човек си"];
  const HUMAN_W = ["bot","robot","human","chatgpt","ai","бот","робот","изкуствен интелект"];
  const isHuman = q => HUMAN.some(k => q.includes(k)) || HUMAN_W.some(w => word(q, w));
  // things that are never in any config: say so instead of matching a loosely related FAQ
  const NOT_HERE = ["wifi","wi-fi","tattoo","piercing","coffee","toilet","discount","promo","coupon","loyalty","уайфай","wi fi","татуир","пиърсинг","кафе","тоалетн","отстъпк","промоц","купон"];

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
  // the shop's local time (Europe/Sofia by default), so a visitor whose phone is set to another zone sees the right slots
  const TZ = C.timeZone || "Europe/Sofia";
  function nowZ() {
    try {
      const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
        .formatToParts(new Date()).map(x => [x.type, x.value]));
      return new Date(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    } catch (e) { return new Date(); }
  }
  function isOpenNow() {
    const now = nowZ(), h = C.hoursByDay && C.hoursByDay[now.getDay()];
    if (!h) return false;
    const m = now.getHours() * 60 + now.getMinutes(), [o, c] = h.map(toMin);
    return m >= o && m < c;
  }
  function timesFor(d) {
    const h = C.hoursByDay[d.getDay()]; if (!h) return [];
    const [o, c] = h.map(toMin), now = nowZ();
    const isToday = d.toDateString() === now.toDateString(), nowM = now.getHours() * 60 + now.getMinutes() + 30;
    return (C.slots || []).filter(x => { const m = toMin(x); return m >= o && m <= c - 30 && (!isToday || m >= nowM); });
  }
  function openDates() {
    const out = [], now = nowZ();
    for (let i = 0; i < 14 && out.length < 5; i++) {
      const d = new Date(now); d.setHours(12, 0, 0, 0); d.setDate(now.getDate() + i);
      if (timesFor(i === 0 ? now : d).length) out.push(d);
    }
    return out;
  }
  function dayLabel(d, lg) {
    lg = lg || lang;
    const now = nowZ(), diff = Math.round((new Date(d).setHours(0,0,0,0) - new Date(now).setHours(0,0,0,0)) / 864e5);
    if (diff === 0) return lg === "bg" ? "Днес" : "Today";
    if (diff === 1) return lg === "bg" ? "Утре" : "Tomorrow";
    const w = d.toLocaleDateString(lg === "bg" ? "bg-BG" : "en-GB", { weekday: "long" });
    return w.charAt(0).toUpperCase() + w.slice(1);
  }
  const DAY_ALIAS = { tmrw: "tomorrow", tmr: "tomorrow", tmw: "tomorrow", "2morrow": "tomorrow", "2moro": "tomorrow", tomoz: "tomorrow", tonight: "today", utre: "утре", dnes: "днес" };
  const DAY_FILL = ["on","next","this","coming","please","pls","for","the","at","в","във","този","тази","следващия","следващата","моля","сутринта","следобед","вечерта","morning","afternoon","evening","ok","okay"];
  function dayWords(raw) {
    return norm(raw).replace(/2morrow|2moro/g, "tomorrow").split(/[^\p{L}]+/u).filter(w => w && !DAY_FILL.includes(w)).map(w => DAY_ALIAS[w] || w);
  }
  function dayHit(w, name) { return w === name || (w.length >= 3 && name.startsWith(w)) || (w.length >= 5 && w[0] === name[0] && lev(w, name) <= (name.length >= 8 ? 2 : 1)); }
  function matchDay(raw) {
    const ws = dayWords(raw); if (!ws.length || ws.length > 3) return null;
    for (const w of ws) for (const d of booking.dates) {
      for (const lg of ["en", "bg"]) {
        const lab = norm(dayLabel(d, lg)), wd = norm(d.toLocaleDateString(lg === "bg" ? "bg-BG" : "en-GB", { weekday: "long" }));
        if (dayHit(w, lab) || dayHit(w, wd)) return d;
      }
    }
    return null;
  }
  // a real weekday / today / tomorrow that is not on offer (closed or fully booked)
  function namesUnavailableDay(raw) {
    const ws = dayWords(raw), now = nowZ();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now); d.setDate(now.getDate() + i);
      for (const lg of ["en", "bg"]) {
        const names = [norm(d.toLocaleDateString(lg === "bg" ? "bg-BG" : "en-GB", { weekday: "long" }))];
        if (i === 0) names.push(lg === "bg" ? "днес" : "today"); if (i === 1) names.push(lg === "bg" ? "утре" : "tomorrow");
        if (ws.some(w => names.some(n => dayHit(w, n)))) return true;
      }
    }
    return false;
  }
  const NUMW = { one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10, eleven:11, twelve:12 };
  function matchTime(raw, valid) {
    let t = norm(raw).replace(/half past (\w+)/, (_, w) => (NUMW[w] || w) + ":30").replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/g, w => NUMW[w]);
    t = t.replace(/^(at|around|about|в|към|около|за)\s+/, "").replace(/\s*(please|pls|моля|o'?clock|часа|ч\.?|h)\s*$/, m => /o'?clock|часа|ч|h/.test(m) ? "" : "").replace(/\s+/g, "");
    const m = t.match(/^(\d{1,2})(?:[:.h](\d{2}))?(am|pm|ч|ч\.)?$/);
    if (!m) return null;
    let h = +m[1]; const mm = m[2] || "00";
    if (m[3] === "pm" && h < 12) h += 12; if (m[3] === "am" && h === 12) h = 0;
    const v = String(h).padStart(2, "0") + ":" + mm;
    if (valid.includes(v)) return v;
    const pm = String(h + 12).padStart(2, "0") + ":" + mm;                 // "3:30" on a day that only has 15:30
    return (!m[3] && h >= 1 && h <= 8 && valid.includes(pm)) ? pm : null;
  }
  const OPT_FILL = ["a","an","my","the","for","please","pls","just","i","want","would","like","моля","искам","за","един","една","едно"];
  function matchOption(raw, step) {
    const t0 = norm(raw); if (!t0) return -1;
    const t = t0.split(/[^\p{L}\d+&]+/u).filter(w => w && !OPT_FILL.includes(w)).join(" ") || t0;
    const r = matchOption0(t, step); if (r >= 0) return r;
    const lists = [C.en, C.bg].map(x => (x.booking.steps.find(z => z.key === step.key) || {}).options || []);
    for (const list of lists) {          // whole option inside the sentence, or a small typo ("harcut", "smal dog")
      const inside = list.map((o, j) => [norm(o), j]).filter(([o]) => (" " + t + " ").includes(" " + o + " ")).sort((a, b) => b[0].length - a[0].length);
      if (inside.length) return inside[0][1];
      const near = list.map((o, j) => [lev(norm(o), t), j]).filter(([d]) => d <= (t.length >= 8 ? 2 : 1) && t.length >= 4);
      if (near.length === 1) return near[0][1];
    }
    return -1;
  }
  function matchOption0(t, step) {
    const lists = [C.en, C.bg].map(x => (x.booking.steps.find(z => z.key === step.key) || {}).options || []);
    for (const list of lists) {
      let i = list.findIndex(o => norm(o) === t); if (i >= 0) return i;
      const hits = list.map((o, j) => norm(o).startsWith(t) || (t.length >= 3 && norm(o).includes(t)) ? j : -1).filter(j => j >= 0);
      if (hits.length === 1) return hits[0];
    }
    return -1;
  }
  const NOT_NAME = ["you","your","are","is","the","now","ignore","instructions","please","want","need","book","free","human","bot","what","how","why","give","me",
                    "вече","си","ти","вие","искам","моля","забрави","игнорирай","инструкциите","инструкции","безплатно","човек","бот","как","какво","дай","ми"];
  function validName(raw, pet) {
    const t = raw.trim().replace(/\s+/g, " ").replace(/^(my name is|my name's|name is|name:|i am|i'm|im|it's|it is|this is|казвам се|името ми е|аз съм|име:)\s+/i, "");
    if (t.toLowerCase().split(/[ ,]+/).some(w => NOT_NAME.includes(w))) return null;
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
    if (!/^\+?[\d \-().]{6,22}$/.test(t)) return null;
    const d = t.replace(/[\s\-().]/g, "").replace(/^00/, "+");
    const ok = /^\+[1-9]\d{7,13}$/.test(d) || /^0[1-9]\d{7,8}$/.test(d) || /^[89]\d{8}$/.test(d);   // +country..., 0888 123 456, 02 987 6543
    if (!ok) return null;
    const nat = d.replace(/^\+359|^\+\d{1,3}|^0/, "");
    if (/^(\d)\1+$/.test(nat) || "0123456789".includes(nat) || "9876543210".includes(nat)) return null;    // 0000000000, 123456789
    return t.replace(/\s+/g, " ");
  }

  /* ---------- booking state ---------- */
  let booking = null, fails = 0, misses = 0;
  const steps = () => { const st = L().booking.steps.slice(); if (!st.some(x => x.key === "phone")) st.push({ key: "phone", ask: null }); return st; };
  const stepAsk = st => st.key === "phone" ? s().askPhone : (L().booking.steps.find(z => z.key === st.key) || st).ask;
  function stepChoices(st) {
    if (st.key === "day") { booking.dates = openDates(); return booking.dates.map(d => dayLabel(d)); }
    if (st.key === "time") return booking.day ? timesFor(booking.day.toDateString() === nowZ().toDateString() ? nowZ() : booking.day) : [];
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
  const OFF = ["hiring","jobs","job opening","career","vacanc","what time is it","колко е часът","колко часа е","работа за мен","bitcoin","биткойн","crypto","крипто","weather","времето","прогноза","politic","полити","news","новини","joke","виц","poem","стих","homework","домашн","recipe","рецепт","stock","акции","football","футбол","code","програм","chatgpt","translate","преведи","casino","казино","loan","кредит","dating","запознанств","president","президент","election","избори"];
  // Answer a free-form question only from this business's config. Returns true if it said something.
  function answerFree(raw, unknownToo) {
    const q0 = norm(raw), B = L(), tr = shly(raw);
    const q = tr || q0;
    if (isHuman(q0) || (tr && isHuman(tr))) { botSay(fill(s().human, { phone: PHONE_[lang] })); return true; }
    if (OFF.some(w => has(q, w))) { botSay(fill(s().offTopic, { biz: B.name })); return true; }
    if ([...NOT_HERE, ...(C.notOffered || [])].some(w => keyScore(q, w) >= w.replace("$", "").length)) { botSay(fill(s().notOffered, { phone: PHONE_[lang] })); return true; }
    // several questions in one message: answer each part (max 3)
    const parts = q.split(/\?|;|\s(?:and|also|plus|и|а|също)\s/u).map(x => x.trim()).filter(x => x.length >= 3);
    const ans = [];
    for (const p of (parts.length > 1 ? parts : [q])) { const a = bestAnswer(p, tr != null); if (a && !ans.includes(a)) ans.push(a); }
    if (!ans.length && parts.length > 1) { const a = bestAnswer(q, tr != null); if (a) ans.push(a); }
    if (ans.length) { ans.slice(0, 3).forEach(a => botSay(a)); return true; }
    if (unknownToo) { botSay(fill(s().unknown, { phone: PHONE_[lang] })); return true; }
    return false;
  }
  function bestAnswer(q, fromLatin) {
    const B = L();
    let best = -1, bestScore = 0;
    const en = C.en.faq || [], bg = C.bg.faq || [];
    for (let i = 0; i < Math.max(en.length, bg.length); i++) {
      const keys = [...((en[i] || {}).keys || []), ...((bg[i] || {}).keys || [])];
      const sc = keys.reduce((acc, k) => acc + Math.max(keyScore(q, k), fromLatin ? Math.max(keyScore(q, k.replace(/ъ/g, "у")), keyScore(q, k.replace(/ъ/g, "а"))) : 0), 0);
      if (sc > bestScore) { bestScore = sc; best = i; }
    }
    const hk = [...(C.en.hoursKeys || []), ...(C.bg.hoursKeys || []), "hours", "opening hours", "close", "closing", "работите ли", "кога работите", "до колко работите", "работите в", "работите до", "работите днес", "работите утре", "работно време", "затваряте"];
    const hs = hk.reduce((acc, k) => acc + keyScore(q, k), 0);
    if (hs > 0 && hs >= bestScore) return (isOpenNow() ? B.openNow : B.closedNow) + " " + B.hoursText;
    if (best >= 0 && bestScore >= 3) return (B.faq[best] || en[best] || bg[best]).answer;
    return null;
  }
  // Latin-letter Bulgarian -> Cyrillic, only when the text is not English
  const BG_FN = ["ли","да","се","на","за","имате","може","мога","колко","къде","куде","каде","кога","искам","как","какво","работите","има","сте","ви","ми","не","дали"];
  const EN_FN = ["the","you","your","is","are","do","does","can","what","how","where","when","have","my","it","there","much","need","want","please"];
  function shly(raw) {
    const t = norm(raw);
    if (!/[a-z]/.test(t) || /[\u0400-\u04FF]/.test(t)) return null;
    if (t.split(/[^\p{L}\d]+/u).some(w => EN_FN.includes(w))) return null;
    const tr = translit(t);
    return tr.split(/[^\p{L}]+/u).some(w => BG_FN.includes(w)) ? tr : null;
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
      botSay(s().confirmOrEdit); if (++fails >= 3) { botSay(fill(s().callUs, { phone: PHONE_[lang] })); fails = 0; }
      return setChips([s().confirm, s().edit, s().cancel], true);
    }
    if (booking.step === "pick") {
      const i = steps().findIndex(st => [S.en.labels[st.key], S.bg.labels[st.key]].some(l => norm(l) === t));
      if (i < 0 && answerThenResume(raw)) return;
      if (i < 0) { botSay(s().which); if (++fails >= 3) { botSay(fill(s().callUs, { phone: PHONE_[lang] })); fails = 0; } return setChips([...steps().map(st => s().labels[st.key]), s().cancel]); }
      booking.editing = true; booking.needTime = steps()[i].key === "day"; return ask(i);
    }

    const st = steps()[booking.step];
    if (st.key === "day") {
      const d = (isQuestion(raw) && bestAnswer(norm(raw), false)) ? null : (matchDay(raw) || (shly(raw) && matchDay(shly(raw)))); if (!d) return answerThenResume(raw) || retry(namesUnavailableDay(raw) ? s().dayNA : null);
      booking.data.day = d; booking.day = d; fails = 0;
      if (!timesFor(d.toDateString() === nowZ().toDateString() ? nowZ() : d).length) return retry(s().noSlots);
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
    raw = (raw || "").replace(/[\u200b-\u200d\u2060\ufeff]/g, "").slice(0, 200).trim(); if (!raw) return;
    say(maskForDisplay(raw), "user");

    // Rule 10: answer in the customer's language (not while typing a name or phone, which can be in any script)
    const freeStep = booking && typeof booking.step === "number" && ["name", "phone"].includes(steps()[booking.step].key);
    const NEUTRAL = ["ok","okay","oki","ок","да","не","yes","no","hi"];
    if ((!freeStep || isQuestion(raw)) && !NEUTRAL.includes(norm(raw).replace(/[^\p{L}]/gu, ""))) {
      const want = shly(raw) ? "bg" : looksLike(raw, lang === "en" ? "bg" : "en") ? (lang === "en" ? "bg" : "en") : lang;
      if (want !== lang) { lang = want; render(false); }
    }

    if (isAbusive(raw)) { botSay(s().abuse); if (++misses >= 3) { botSay(fill(s().callUs, { phone: PHONE_[lang] })); misses = 0; } return booking ? null : setChips(); }
    if (isPrivate(raw) && !(freeStep && steps()[booking.step].key === "phone")) { botSay(s().privacy); return; }
    if (booking) return bookingInput(raw);

    const t = shly(raw) || norm(raw);
    const wantsBooking = [...C.en.booking.triggers, ...C.bg.booking.triggers, "запиш", "записв", "booking"].some(w => has(t, w)) || word(t, "час");
    const aboutExisting = ["cancel","reschedul","move my","change my","postpone","отказ","откаж","отмен","премест","промен"].some(w => has(t, w));   // "cancel my appointment" is not a new booking
    if (wantsBooking && !isQuestion(raw) && !aboutExisting) { booking = { data: {} }; fails = 0; return ask(0); }
    if (answerFree(raw, false)) { misses = 0; return setChips(); }
    if (wantsBooking && !aboutExisting) { booking = { data: {} }; fails = 0; return ask(0); }
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
  box.querySelectorAll(".db-lang button").forEach(b => b.onclick = () => {
    if (b.dataset.l === lang) return;
    lang = b.dataset.l;
    if (!booking) return render(true);
    render(false);                       // mid-booking: keep the booking and repeat the current step in the new language
    if (booking.step === "summary") return showSummary();
    if (booking.step === "pick") { botSay(s().which); return setChips([...steps().map(st => s().labels[st.key]), s().cancel]); }
    ask(booking.step);
  });
  form.onsubmit = e => { e.preventDefault(); handle(input.value); input.value = ""; };
  let started = false;
  render(false);
  if (mount) { started = true; render(true); }
  btn.onclick = () => { box.classList.toggle("open"); if (!started) { started = true; render(true); } };
  window.DemoBot = { setLang: l => { lang = l; render(true); }, _handle: handle };
})();
