window.BOT_CONFIG = {
  color: "#b8893a",
  mount: "#chat",
  slots: ["10:00","11:00","13:30","15:00","16:00","18:00"],
  hoursByDay: {1:["10:00","19:00"],2:["10:00","19:00"],3:["10:00","19:00"],4:["10:00","20:00"],5:["10:00","20:00"],6:["09:00","16:00"]},
  en: {
    name: "Sharp Line Barbers", tagline: "Online now · replies instantly",
    placeholder: "Type a message...", send: "Send",
    today: "Today", tomorrow: "Tomorrow", cancel: "Cancel", cancelWords: ["cancel","stop","never mind","nevermind"], cancelled: "No problem, booking cancelled. Anything else I can help with?",
    greeting: "Hey! ✂️ Want to book a cut, see prices, or check when we're open?",
    quick: ["Book an appointment", "Prices", "Opening hours", "Walk-ins?", "Where are you?"],
    hoursKeys: ["open","hour","close"], openNow: "We're open right now!", closedNow: "We're closed right now.",
    hoursText: "Mon–Wed 10:00–19:00, Thu–Fri 10:00–20:00, Sat 9:00–16:00, closed Sunday.",
    faq: [
      { keys: ["thank","thanks","cheers","great"], answer: "You're welcome! Anything else I can help with?" },
      { keys: ["price","cost","how much","service"], answer: "Our prices:\n• Haircut – €15\n• Skin fade – €18\n• Beard trim – €10\n• Cut + beard – €23\n• Kids (under 12) – €12\n(Example prices for the demo.)" },
      { keys: ["walk","without appointment","queue","wait"], answer: "Walk-ins are welcome when a chair is free, but booking guarantees your spot, especially Fri and Sat." },
      { keys: ["where","address","location","find","parking"], answer: "We're at 8 Example Avenue (demo address), next to the main square." },
      { keys: ["card","cash","pay"], answer: "We take card and cash." },
      { keys: ["cancel","reschedule","late"], answer: "No problem, just message us at least 2 hours before and we'll move it." },
      { keys: ["beard","shave","fade","style"], answer: "Our barbers do fades, classic cuts, beard sculpting and hot-towel shaves. Want to book one?" }
    ],
    booking: {
      triggers: ["book","appointment","reserve","slot"],
      steps: [
        { key: "service", ask: "Nice. What are you after?", options: ["Haircut","Skin fade","Beard trim","Cut + beard"] },
        { key: "day", ask: "Which day works?" },
        { key: "time", ask: "Pick a time:" },
        { key: "name", ask: "Last thing, your name?" }
      ],
      confirm: "Booked! ✅ {service} for {name}, {day} at {time}. We'll send a reminder the day before.\n(Demo only. In the live version this goes into the shop's calendar.)"
    },
    fallback: "Not sure on that one. Give us a call on +359 00 000 000 (demo number) and we'll sort it."
  },
  bg: {
    name: "Sharp Line Barbers", tagline: "Онлайн · отговаря веднага",
    placeholder: "Напишете съобщение...", send: "Изпрати",
    today: "Днес", tomorrow: "Утре", cancel: "Отказ", cancelWords: ["отказ","откажи","спри","стоп","няма нужда"], cancelled: "Няма проблем, резервацията е отказана. С какво друго да помогна?",
    greeting: "Здравейте! ✂️ Искате ли да запазите час, да видите цените или кога сме отворени?",
    quick: ["Запази час", "Цени", "Работно време", "Без записване?", "Къде се намирате?"],
    hoursKeys: ["работно","отворен","затвор","кога"], openNow: "В момента сме отворени!", closedNow: "В момента сме затворени.",
    hoursText: "Пон–Ср 10:00–19:00, Чет–Пет 10:00–20:00, Съб 9:00–16:00, в неделя почиваме.",
    faq: [
      { keys: ["благодар","мерси","супер"], answer: "Моля! С какво друго мога да помогна?" },
      { keys: ["цен","колко струва","услуг"], answer: "Нашите цени:\n• Подстригване – €15\n• Скин фейд – €18\n• Оформяне на брада – €10\n• Подстригване + брада – €23\n• Деца (под 12 г.) – €12\n(Примерни цени за демото.)" },
      { keys: ["без записване","опашка","чака"], answer: "Може и без записване, ако има свободен стол, но с резервация мястото ви е гарантирано, особено в петък и събота." },
      { keys: ["къде","адрес","намира","паркин"], answer: "Намираме се на бул. „Примерен“ 8 (демо адрес), до централния площад." },
      { keys: ["карта","кеш","в брой","плащ"], answer: "Приемаме карта и плащане в брой." },
      { keys: ["отказ","отмен","премест","закъсн"], answer: "Няма проблем, просто ни пишете поне 2 часа предварително и ще го преместим." },
      { keys: ["брада","бръснене","фейд","прическ"], answer: "Правим фейдове, класически прически, оформяне на брада и бръснене с гореща кърпа. Искате ли да запазите час?" }
    ],
    booking: {
      triggers: ["запаз","резерв","записвам"],
      steps: [
        { key: "service", ask: "Чудесно. Каква услуга желаете?", options: ["Подстригване","Скин фейд","Оформяне на брада","Подстригване + брада"] },
        { key: "day", ask: "Кой ден ви е удобен?" },
        { key: "time", ask: "Изберете час:" },
        { key: "name", ask: "И последно, как се казвате?" }
      ],
      confirm: "Записахме ви! ✅ {service} за {name}, {day} в {time}. Ще ви изпратим напомняне предния ден.\n(Само демо. В истинската версия часът влиза директно в календара на салона.)"
    },
    fallback: "Не съм сигурен за това. Обадете ни се на +359 00 000 000 (демо номер) и ще го уредим."
  }
};

/*FAQ*/
window.BOT_CONFIG.en.faq = [{"keys": ["thank", "thanks", "cheers", "appreciate"], "answer": "You're welcome! Anything else I can help with?"}, {"keys": ["price", "cost", "how much", "expensive", "cheap", "menu", "list"], "answer": "Our prices:\n• Haircut – €15\n• Skin fade – €18\n• Beard trim – €10\n• Cut + beard – €23\n• Kids (under 12) – €12\n(Example prices for the demo.)"}, {"keys": ["service", "offer", "what do you", "beard", "shave", "fade", "style", "haircut", "trim"], "answer": "We do haircuts (€15), skin fades (€18), beard trims (€10), cut + beard (€23), kids' cuts (€12) and hot-towel shaves. Want to book one?"}, {"keys": ["how long", "long does", "takes long", "duration", "minutes"], "answer": "A haircut takes about 30 minutes, a skin fade about 40 minutes, and cut + beard about 50 minutes."}, {"keys": ["walk", "without appointment", "without booking", "queue", "wait"], "answer": "Walk-ins are welcome when a chair is free, but booking guarantees your spot, especially on Friday and Saturday."}, {"keys": ["where", "address", "location", "find you", "directions", "located"], "answer": "We're at 8 Example Avenue (demo address), next to the main square."}, {"keys": ["parking", "park", "car"], "answer": "There's paid street parking (blue zone) right outside and a public car park about two minutes' walk away."}, {"keys": ["card", "cash", "pay", "payment", "apple pay", "google pay"], "answer": "We take card (including Apple Pay and Google Pay) and cash. You pay at the shop after your cut, nothing up front."}, {"keys": ["cancel", "reschedul", "late", "move my", "change my"], "answer": "No problem, just message or call us at least 2 hours before and we'll move or cancel it."}, {"keys": ["kid", "kids", "child", "children", "boy", "son"], "answer": "Kids are welcome, and a kids' cut (under 12) is €12. A parent should stay during the cut."}, {"keys": ["product", "pomade", "hygien", "clean", "steril"], "answer": "We use professional styling products and sterilise every tool between clients."}, {"keys": ["gift", "voucher", "present"], "answer": "Gift vouchers are available at the shop."}, {"keys": ["english", "speak", "language"], "answer": "Yes, the team speaks Bulgarian and English."}];
window.BOT_CONFIG.bg.faq = [{"keys": ["благодар", "мерси"], "answer": "Моля! С какво друго мога да помогна?"}, {"keys": ["цен", "колко струва", "колко е", "скъп", "евтин", "ценоразпис"], "answer": "Нашите цени:\n• Подстригване – €15\n• Скин фейд – €18\n• Оформяне на брада – €10\n• Подстригване + брада – €23\n• Деца (под 12 г.) – €12\n(Примерни цени за демото.)"}, {"keys": ["услуг", "предлага", "какво правите", "брада", "бръсн", "фейд", "прическ", "подстриг"], "answer": "Правим подстригване (€15), скин фейд (€18), оформяне на брада (€10), подстригване + брада (€23), детско подстригване (€12) и бръснене с гореща кърпа. Искате ли да запазите час?"}, {"keys": ["колко време", "продължи", "трае", "минути", "отнема"], "answer": "Подстригването отнема около 30 минути, скин фейдът около 40 минути, а подстригване + брада около 50 минути."}, {"keys": ["без записване", "без час", "опашка", "чака", "директно"], "answer": "Може и без записване, ако има свободен стол, но с резервация мястото ви е гарантирано, особено в петък и събота."}, {"keys": ["къде", "адрес", "намира", "как да стигна", "локация"], "answer": "Намираме се на бул. „Примерен“ 8 (демо адрес), до централния площад."}, {"keys": ["паркин", "паркира", "кола", "синя зона"], "answer": "Отпред има платено паркиране (синя зона), а на около две минути пеша има обществен паркинг."}, {"keys": ["карта", "кеш", "в брой", "плащ"], "answer": "Приемаме карта (включително Apple Pay и Google Pay) и плащане в брой. Плащате на място след услугата, без предплащане."}, {"keys": ["отказ", "откаж", "отмен", "премест", "закъсн", "промен"], "answer": "Няма проблем, просто ни пишете или се обадете поне 2 часа предварително и ще го преместим или отменим."}, {"keys": ["дете", "деца", "детск", "момче"], "answer": "Децата са добре дошли, детското подстригване (под 12 г.) е €12. Родител трябва да остане по време на подстригването."}, {"keys": ["продукт", "вакса", "помада", "хигиен", "стерил", "чист"], "answer": "Използваме професионални продукти и стерилизираме всеки инструмент след всеки клиент."}, {"keys": ["подарък", "ваучер"], "answer": "Предлагаме ваучери за подарък на място в бръснарницата."}, {"keys": ["английск", "говорите", "език"], "answer": "Да, екипът говори български и английски."}];
