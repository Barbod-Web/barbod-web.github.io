window.BOT_CONFIG = {
 "color": "#b05a6e",
 "mount": "#chat",
 "slots": [
  "09:30",
  "11:00",
  "12:30",
  "14:00",
  "16:00",
  "18:00"
 ],
 "hoursByDay": {
  "1": [
   "09:00",
   "20:00"
  ],
  "2": [
   "09:00",
   "20:00"
  ],
  "3": [
   "09:00",
   "20:00"
  ],
  "4": [
   "09:00",
   "20:00"
  ],
  "5": [
   "09:00",
   "20:00"
  ],
  "6": [
   "10:00",
   "18:00"
  ]
 },
 "en": {
  "placeholder": "Type a message...",
  "send": "Send",
  "today": "Today",
  "tomorrow": "Tomorrow",
  "cancel": "Cancel",
  "cancelWords": [
   "cancel",
   "stop",
   "never mind",
   "nevermind"
  ],
  "cancelled": "No problem, booking cancelled. Anything else I can help with?",
  "hoursKeys": [
   "open",
   "hour",
   "close"
  ],
  "openNow": "We're open right now!",
  "closedNow": "We're closed right now.",
  "name": "Bloom Beauty Studio",
  "tagline": "Online now · replies instantly",
  "greeting": "Hi! 💅 I can show you our prices, check when we're open, or book your appointment.",
  "quick": [
   "Book an appointment",
   "Prices",
   "Opening hours",
   "Gel polish?",
   "Where are you?"
  ],
  "hoursText": "Mon–Fri 9:00–20:00, Sat 10:00–18:00, closed Sunday.",
  "faq": [
   {
    "keys": [
     "thank",
     "thanks",
     "cheers",
     "great"
    ],
    "answer": "You're welcome! Anything else I can help with?"
   },
   {
    "keys": [
     "price",
     "cost",
     "how much",
     "service",
     "menu"
    ],
    "answer": "Our prices:\n• Classic manicure – €20\n• Gel polish – €28\n• Pedicure – €30\n• Lash lift – €35\n• Brow shape + tint – €15\n(Example prices for the demo.)"
   },
   {
    "keys": [
     "gel",
     "nail",
     "polish",
     "acrylic",
     "design"
    ],
    "answer": "Yes! We do gel polish, nail art and extensions, and gel lasts about 3 weeks. Want to book one?"
   },
   {
    "keys": [
     "lash",
     "brow",
     "face",
     "facial",
     "wax"
    ],
    "answer": "We do lash lifts, brow shaping and tinting, and waxing. Lash lifts take about 45 minutes."
   },
   {
    "keys": [
     "where",
     "address",
     "location",
     "find",
     "parking"
    ],
    "answer": "We're at 5 Example Street (demo address), near the city centre."
   },
   {
    "keys": [
     "card",
     "cash",
     "pay",
     "voucher",
     "gift"
    ],
    "answer": "We take card and cash, and gift vouchers are available at the studio."
   },
   {
    "keys": [
     "reschedul",
     "late",
     "move"
    ],
    "answer": "No problem, just message us at least 3 hours before and we'll move your appointment."
   }
  ],
  "booking": {
   "triggers": [
    "book",
    "appointment",
    "reserve",
    "slot"
   ],
   "steps": [
    {
     "key": "service",
     "ask": "Lovely! Which treatment?",
     "options": [
      "Manicure",
      "Gel polish",
      "Pedicure",
      "Lash lift",
      "Brows"
     ]
    },
    {
     "key": "day",
     "ask": "Which day suits you?"
    },
    {
     "key": "time",
     "ask": "Pick a time:"
    },
    {
     "key": "name",
     "ask": "And your name?"
    }
   ],
   "confirm": "Booked! ✅ {service} for {name}, {day} at {time}. We'll send you a reminder the day before.\n(Demo only. In the live version this goes into the studio's calendar.)"
  },
  "fallback": "I'm not sure about that one. Please call us on +359 00 000 000 (demo number)."
 },
 "bg": {
  "placeholder": "Напишете съобщение...",
  "send": "Изпрати",
  "today": "Днес",
  "tomorrow": "Утре",
  "cancel": "Отказ",
  "cancelWords": [
   "отказ",
   "откажи",
   "спри",
   "стоп",
   "няма нужда"
  ],
  "cancelled": "Няма проблем, резервацията е отказана. С какво друго да помогна?",
  "hoursKeys": [
   "работно",
   "отворен",
   "затвор",
   "кога"
  ],
  "openNow": "В момента сме отворени!",
  "closedNow": "В момента сме затворени.",
  "name": "Bloom Beauty Studio",
  "tagline": "Онлайн · отговаря веднага",
  "greeting": "Здравейте! 💅 Мога да ви покажа цените, работното време или да ви запазя час.",
  "quick": [
   "Запази час",
   "Цени",
   "Работно време",
   "Гел лак?",
   "Къде се намирате?"
  ],
  "hoursText": "Пон–Пет 9:00–20:00, Съб 10:00–18:00, в неделя почиваме.",
  "faq": [
   {
    "keys": [
     "благодар",
     "мерси",
     "супер"
    ],
    "answer": "Моля! С какво друго мога да помогна?"
   },
   {
    "keys": [
     "цен",
     "колко струва",
     "услуг"
    ],
    "answer": "Нашите цени:\n• Класически маникюр – €20\n• Гел лак – €28\n• Педикюр – €30\n• Ламиниране на мигли – €35\n• Оформяне и боядисване на вежди – €15\n(Примерни цени за демото.)"
   },
   {
    "keys": [
     "гел",
     "нокт",
     "лак",
     "маникюр",
     "дизайн"
    ],
    "answer": "Да! Правим гел лак, дизайн и удължаване на нокти, а гел лакът издържа около 3 седмици. Искате ли да запазите час?"
   },
   {
    "keys": [
     "мигл",
     "вежд",
     "лице",
     "кола маска",
     "епилац"
    ],
    "answer": "Правим ламиниране на мигли, оформяне и боядисване на вежди и кола маска. Ламинирането отнема около 45 минути."
   },
   {
    "keys": [
     "къде",
     "адрес",
     "намира",
     "паркин"
    ],
    "answer": "Намираме се на ул. „Примерна“ 5 (демо адрес), близо до центъра."
   },
   {
    "keys": [
     "карта",
     "в брой",
     "плащ",
     "ваучер",
     "подарък"
    ],
    "answer": "Приемаме карта и плащане в брой, а в студиото предлагаме и ваучери за подарък."
   },
   {
    "keys": [
     "премест",
     "закъсн",
     "друг час"
    ],
    "answer": "Няма проблем, просто ни пишете поне 3 часа предварително и ще преместим часа ви."
   }
  ],
  "booking": {
   "triggers": [
    "запаз",
    "резерв",
    "записвам"
   ],
   "steps": [
    {
     "key": "service",
     "ask": "Чудесно! Коя процедура?",
     "options": [
      "Маникюр",
      "Гел лак",
      "Педикюр",
      "Ламиниране на мигли",
      "Вежди"
     ]
    },
    {
     "key": "day",
     "ask": "Кой ден ви е удобен?"
    },
    {
     "key": "time",
     "ask": "Изберете час:"
    },
    {
     "key": "name",
     "ask": "И как се казвате?"
    }
   ],
   "confirm": "Записахме ви! ✅ {service} за {name}, {day} в {time}. Ще ви изпратим напомняне предния ден.\n(Само демо. В истинската версия часът влиза директно в календара на студиото.)"
  },
  "fallback": "Не съм сигурен за това. Обадете ни се на +359 00 000 000 (демо номер)."
 }
};

/*FAQ*/
window.BOT_CONFIG.en.faq = [{"keys": ["thank", "thanks", "cheers", "appreciate", "bye", "goodbye", "see you"], "answer": "You're welcome! Anything else I can help with?"}, {"keys": ["price", "cost", "how much", "expensive", "cheap", "menu", "list", "fee", "fees", "rate", "rates", "charge", "tariff"], "answer": "Our prices:\n• Classic manicure – €20\n• Gel polish – €28\n• Pedicure – €30\n• Lash lift – €35\n• Brow shape + tint – €15\n(Example prices for the demo.)"}, {"keys": ["service", "offer", "what do you", "treatment", "manicure", "pedicure"], "answer": "We do classic manicures (€20), gel polish (€28), pedicures (€30), lash lifts (€35) and brow shaping with tint (€15). Want to book one?"}, {"keys": ["gel", "nail", "polish", "acrylic", "design", "extension", "art"], "answer": "Yes! We do gel polish, nail art and extensions. Removing old gel is included when you book a new set."}, {"keys": ["lash", "brow", "eyebrow", "tint", "wax"], "answer": "We do lash lifts (€35, about 45 minutes) and brow shaping with tint (€15, about 20 minutes)."}, {"keys": ["how long", "long does", "takes long", "duration", "minutes", "last"], "answer": "A classic manicure takes about 45 minutes, gel polish and pedicure about 1 hour each, a lash lift about 45 minutes and brows about 20 minutes. Gel polish lasts about 3 weeks."}, {"keys": ["where", "address", "location", "find you", "directions", "located", "closest", "nearest", "near", "metro", "bus", "station", "close to"], "answer": "We're at 5 Example Street (demo address), near the city centre."}, {"keys": ["parking", "park", "car$", "by car", "my car", "car park", "drive"], "answer": "There's paid street parking (blue zone) nearby, and a bus stop about a minute away."}, {"keys": ["card", "cash", "pay", "payment", "apple pay", "google pay"], "answer": "We take card (including Apple Pay and Google Pay) and cash. You pay at the studio after your treatment, nothing up front."}, {"keys": ["gift", "voucher", "present"], "answer": "Gift vouchers are available at the studio."}, {"keys": ["cancel", "reschedul", "late", "move my", "change my"], "answer": "No problem, just message or call us at least 3 hours before and we'll move or cancel your appointment."}, {"keys": ["hygien", "clean", "steril", "safe", "allerg"], "answer": "Every tool is sterilised between clients and nail files are single-use. If you have allergies, tell us when you book and we'll choose suitable products."}, {"keys": ["for men", "guys", "male", "husband", "boyfriend"], "answer": "Yes, men are welcome for manicures, pedicures and brows."}, {"keys": ["english", "speak", "language"], "answer": "Yes, the team speaks Bulgarian and English."}];
window.BOT_CONFIG.bg.faq = [{"keys": ["благодар", "мерси", "чао", "до скоро", "довиждане"], "answer": "Моля! С какво друго мога да помогна?"}, {"keys": ["цен", "колко струва", "колко е", "скъп", "евтин", "ценоразпис", "такса", "таксата", "тарифа"], "answer": "Нашите цени:\n• Класически маникюр – €20\n• Гел лак – €28\n• Педикюр – €30\n• Ламиниране на мигли – €35\n• Оформяне и боядисване на вежди – €15\n(Примерни цени за демото.)"}, {"keys": ["услуг", "предлага", "какво правите", "процедур", "маникюр", "педикюр"], "answer": "Правим класически маникюр (€20), гел лак (€28), педикюр (€30), ламиниране на мигли (€35) и оформяне и боядисване на вежди (€15). Искате ли да запазите час?"}, {"keys": ["гел", "нокт", "лак", "дизайн", "удължаване"], "answer": "Да! Правим гел лак, дизайн и удължаване на ноктите. Премахването на стария гел е включено при нов маникюр."}, {"keys": ["мигл", "вежд", "боядисв", "кола маска", "епилац"], "answer": "Правим ламиниране на мигли (€35, около 45 минути) и оформяне и боядисване на вежди (€15, около 20 минути)."}, {"keys": ["колко време", "продължи", "трае", "минути", "отнема", "издържа"], "answer": "Класическият маникюр отнема около 45 минути, гел лакът и педикюрът около час, ламинирането на мигли около 45 минути, а веждите около 20 минути. Гел лакът издържа около 3 седмици."}, {"keys": ["къде", "кде", "адрес", "намира", "как да стигна", "локация", "център", "центъра", "близо", "метро", "спирка"], "answer": "Намираме се на ул. „Примерна“ 5 (демо адрес), близо до центъра."}, {"keys": ["паркин", "паркира", "кола$", "колата$", "с кола", "синя зона"], "answer": "Наблизо има платено паркиране (синя зона), а спирка на градския транспорт е на около минута."}, {"keys": ["карта", "кеш", "в брой", "плащ"], "answer": "Приемаме карта (включително Apple Pay и Google Pay) и плащане в брой. Плащате на място след процедурата, без предплащане."}, {"keys": ["подарък", "ваучер"], "answer": "Предлагаме ваучери за подарък на място в студиото."}, {"keys": ["отказ", "откаж", "отмен", "премест", "закъсн", "промен"], "answer": "Няма проблем, просто ни пишете или се обадете поне 3 часа предварително и ще преместим или отменим часа ви."}, {"keys": ["хигиен", "чист", "стерил", "безопас", "алерг"], "answer": "Всеки инструмент се стерилизира след всеки клиент, а пилите са за еднократна употреба. Ако имате алергии, кажете ни при записването и ще изберем подходящи продукти."}, {"keys": ["за мъже", "мъж", "съпруг", "приятел$", "приятеля$", "приятелят$", "гадже"], "answer": "Да, мъжете са добре дошли за маникюр, педикюр и вежди."}, {"keys": ["английск", "говорите", "език"], "answer": "Да, екипът говори български и английски."}];
/* things this business does not offer: the bot says so instead of matching a loosely related answer */
window.BOT_CONFIG.notOffered = ["massage", "haircut", "hair cut", "hairdresser", "hair colour", "hair color", "hair dye", "beard", "shave", "масаж", "подстригване", "фризьор", "боядисване на коса", "коса$", "брада"];
window.BOT_CONFIG.timeZone = "Europe/Sofia";
