window.BOT_CONFIG = {
 "color": "#2f8a7a",
 "mount": "#chat",
 "slots": [
  "09:00",
  "10:30",
  "12:00",
  "14:00",
  "15:30"
 ],
 "hoursByDay": {
  "2": [
   "09:00",
   "18:00"
  ],
  "3": [
   "09:00",
   "18:00"
  ],
  "4": [
   "09:00",
   "18:00"
  ],
  "5": [
   "09:00",
   "18:00"
  ],
  "6": [
   "09:00",
   "15:00"
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
  "name": "Happy Paws Grooming",
  "tagline": "Online now · replies instantly",
  "greeting": "Hi! 🐶 I can tell you our prices, check when we're open, or book your pet's grooming.",
  "quick": [
   "Book grooming",
   "Prices",
   "Opening hours",
   "Cats too?",
   "Where are you?"
  ],
  "hoursText": "Tue–Fri 9:00–18:00, Sat 9:00–15:00, closed Sunday and Monday.",
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
     "service"
    ],
    "answer": "Our prices:\n• Bath & brush, small dog – €25\n• Full groom, small dog – €35\n• Full groom, medium dog – €45\n• Full groom, large dog – €60\n• Nail trim – €8\n(Example prices for the demo.)"
   },
   {
    "keys": [
     "cat",
     "cats",
     "kitten"
    ],
    "answer": "Yes, we groom cats too, in a quiet room away from the dogs. A cat bath and brush starts at €30."
   },
   {
    "keys": [
     "long",
     "take",
     "duration",
     "pick up",
     "pickup",
     "collect"
    ],
    "answer": "A full groom usually takes 1.5 to 2.5 hours depending on size and coat. We'll message you when your pet is ready to collect."
   },
   {
    "keys": [
     "vaccin",
     "sick",
     "puppy",
     "first time",
     "nervous",
     "anxious"
    ],
    "answer": "Puppies are welcome from 12 weeks after their vaccinations. For nervous pets we go slowly and take breaks, so just tell us when you book."
   },
   {
    "keys": [
     "where",
     "address",
     "location",
     "find",
     "parking"
    ],
    "answer": "We're at 23 Example Street (demo address), with easy parking right outside."
   },
   {
    "keys": [
     "card",
     "cash",
     "pay"
    ],
    "answer": "We take card and cash."
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
     "key": "pet",
     "ask": "Great! What size is your pet?",
     "options": [
      "Small dog",
      "Medium dog",
      "Large dog",
      "Cat"
     ]
    },
    {
     "key": "service",
     "ask": "Which service?",
     "options": [
      "Full groom",
      "Bath & brush",
      "Nail trim"
     ]
    },
    {
     "key": "day",
     "ask": "Which day works for you?"
    },
    {
     "key": "time",
     "ask": "Pick a drop-off time:"
    },
    {
     "key": "name",
     "ask": "And your name and your pet's name?"
    }
   ],
   "confirm": "Booked! ✅ {service} ({pet}) for {name}, {day} at {time}. See you then!\n(Demo only. In the live version this goes into the salon's calendar.)"
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
  "name": "Happy Paws Grooming",
  "tagline": "Онлайн · отговаря веднага",
  "greeting": "Здравейте! 🐶 Мога да ви кажа цените, работното време или да запазя час за вашия любимец.",
  "quick": [
   "Запази час",
   "Цени",
   "Работно време",
   "Котки?",
   "Къде се намирате?"
  ],
  "hoursText": "Вт–Пет 9:00–18:00, Съб 9:00–15:00, в неделя и понеделник почиваме.",
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
    "answer": "Нашите цени:\n• Къпане и разресване, малко куче – €25\n• Пълен груминг, малко куче – €35\n• Пълен груминг, средно куче – €45\n• Пълен груминг, голямо куче – €60\n• Подрязване на нокти – €8\n(Примерни цени за демото.)"
   },
   {
    "keys": [
     "котк",
     "коте"
    ],
    "answer": "Да, правим груминг и на котки, в тиха стая далеч от кучетата. Къпане и разресване на котка е от €30."
   },
   {
    "keys": [
     "колко време",
     "продължи",
     "взема",
     "вземе"
    ],
    "answer": "Пълният груминг обикновено отнема 1,5 до 2,5 часа според размера и козината. Ще ви пишем, когато любимецът ви е готов."
   },
   {
    "keys": [
     "ваксин",
     "болен",
     "кученце",
     "за първи път",
     "нервн",
     "страхлив"
    ],
    "answer": "Кученцата са добре дошли от 12-седмична възраст, след ваксините. С нервните животни работим бавно и с почивки, просто ни кажете при записването."
   },
   {
    "keys": [
     "къде",
     "адрес",
     "намира",
     "паркин"
    ],
    "answer": "Намираме се на ул. „Примерна“ 23 (демо адрес), с лесно паркиране точно отпред."
   },
   {
    "keys": [
     "карта",
     "в брой",
     "плащ"
    ],
    "answer": "Приемаме карта и плащане в брой."
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
     "key": "pet",
     "ask": "Чудесно! Какъв е вашият любимец?",
     "options": [
      "Малко куче",
      "Средно куче",
      "Голямо куче",
      "Котка"
     ]
    },
    {
     "key": "service",
     "ask": "Коя услуга?",
     "options": [
      "Пълен груминг",
      "Къпане и разресване",
      "Подрязване на нокти"
     ]
    },
    {
     "key": "day",
     "ask": "Кой ден ви е удобен?"
    },
    {
     "key": "time",
     "ask": "Изберете час, в който да доведете любимеца:"
    },
    {
     "key": "name",
     "ask": "Как се казвате вие и любимецът ви?"
    }
   ],
   "confirm": "Записахме ви! ✅ {service} ({pet}) за {name}, {day} в {time}. До скоро!\n(Само демо. В истинската версия часът влиза директно в календара на салона.)"
  },
  "fallback": "Не съм сигурен за това. Обадете ни се на +359 00 000 000 (демо номер)."
 }
};

/*FAQ*/
window.BOT_CONFIG.en.faq = [{"keys": ["thank", "thanks", "cheers", "appreciate"], "answer": "You're welcome! Anything else I can help with?"}, {"keys": ["price", "cost", "how much", "expensive", "cheap", "menu", "list"], "answer": "Our prices:\n• Bath & brush, small dog – €25\n• Full groom, small dog – €35\n• Full groom, medium dog – €45\n• Full groom, large dog – €60\n• Nail trim – €8\n• Cat bath & brush – from €30\n(Example prices for the demo.)"}, {"keys": ["service", "offer", "what do you", "groom", "bath", "nail", "trim", "haircut"], "answer": "We do full grooms (from €35), bath and brush (from €25), nail trims (€8) and cat grooming (from €30). Want to book one?"}, {"keys": ["cat", "cats", "kitten"], "answer": "Yes, we groom cats too, in a quiet room away from the dogs. A cat bath and brush starts at €30."}, {"keys": ["how long", "long does", "takes long", "duration", "pick up", "pickup", "collect", "ready"], "answer": "A full groom usually takes 1.5 to 2.5 hours depending on size and coat, and a nail trim about 15 minutes. We'll message you when your pet is ready to collect."}, {"keys": ["wait", "stay", "drop off", "drop-off"], "answer": "You don't need to wait. Drop your pet off at your booked time and we'll message you when they're ready."}, {"keys": ["vaccin", "sick", "puppy", "first time", "nervous", "anxious", "scared"], "answer": "Puppies are welcome from 12 weeks, after their vaccinations. For nervous pets we go slowly and take breaks, so just tell us when you book."}, {"keys": ["breed", "big dog", "large dog", "aggressive", "bite", "bites"], "answer": "We groom all breeds and sizes. If your dog can be snappy, tell us when you book and we'll plan a calm, quiet slot."}, {"keys": ["matted", "mats", "tangle", "knot", "shed"], "answer": "Matted coats can be brushed out or clipped short if needed. We'll always check with you first if anything changes the price."}, {"keys": ["bring", "need to", "leash", "lead", "carrier", "booklet", "passport"], "answer": "Just bring your pet on a lead or in a carrier, plus the vaccination booklet on your first visit."}, {"keys": ["where", "address", "location", "find you", "directions", "located"], "answer": "We're at 23 Example Street (demo address)."}, {"keys": ["parking", "park", "car"], "answer": "There's easy free parking right outside."}, {"keys": ["card", "cash", "pay", "payment", "apple pay", "google pay"], "answer": "We take card (including Apple Pay and Google Pay) and cash. You pay when you collect your pet, nothing up front."}, {"keys": ["cancel", "reschedul", "late", "move my", "change my"], "answer": "No problem, just message or call us at least 24 hours before and we'll move or cancel it."}, {"keys": ["english", "speak", "language"], "answer": "Yes, the team speaks Bulgarian and English."}];
window.BOT_CONFIG.bg.faq = [{"keys": ["благодар", "мерси"], "answer": "Моля! С какво друго мога да помогна?"}, {"keys": ["цен", "колко струва", "колко е", "скъп", "евтин", "ценоразпис"], "answer": "Нашите цени:\n• Къпане и разресване, малко куче – €25\n• Пълен груминг, малко куче – €35\n• Пълен груминг, средно куче – €45\n• Пълен груминг, голямо куче – €60\n• Подрязване на нокти – €8\n• Къпане и разресване на котка – от €30\n(Примерни цени за демото.)"}, {"keys": ["услуг", "предлага", "какво правите", "груминг", "къпан", "нокт", "подстриг"], "answer": "Правим пълен груминг (от €35), къпане и разресване (от €25), подрязване на нокти (€8) и груминг на котки (от €30). Искате ли да запазите час?"}, {"keys": ["котк", "коте"], "answer": "Да, правим груминг и на котки, в тиха стая далеч от кучетата. Къпане и разресване на котка е от €30."}, {"keys": ["колко време", "продължи", "трае", "отнема", "взема", "вземе", "готов"], "answer": "Пълният груминг обикновено отнема 1,5 до 2,5 часа според размера и козината, а подрязването на нокти около 15 минути. Ще ви пишем, когато любимецът ви е готов."}, {"keys": ["чакам", "остана", "оставя", "оставям"], "answer": "Не е нужно да чакате. Оставете любимеца в запазения час и ще ви пишем, когато е готов."}, {"keys": ["ваксин", "болен", "кученце", "за първи път", "нервн", "страхлив", "плаши"], "answer": "Кученцата са добре дошли от 12-седмична възраст, след ваксините. С нервните животни работим бавно и с почивки, просто ни кажете при записването."}, {"keys": ["порода", "голямо куче", "агресив", "хапе"], "answer": "Правим груминг на всички породи и размери. Ако кучето ви понякога хапе, кажете ни при записването и ще планираме спокоен час."}, {"keys": ["сплъст", "заплет", "възли", "линее", "косми"], "answer": "Сплъстената козина може да се разреши или да се подстриже късо, ако се налага. Винаги ще ви попитаме първо, ако нещо променя цената."}, {"keys": ["да нося", "донеса", "нужно ли", "каишк", "транспортн", "паспорт", "книжка"], "answer": "Просто доведете любимеца с каишка или в транспортна чанта, а при първото посещение и ваксинационната книжка."}, {"keys": ["къде", "адрес", "намира", "как да стигна", "локация"], "answer": "Намираме се на ул. „Примерна“ 23 (демо адрес)."}, {"keys": ["паркин", "паркира", "кола"], "answer": "Точно пред салона има безплатно паркиране."}, {"keys": ["карта", "кеш", "в брой", "плащ"], "answer": "Приемаме карта (включително Apple Pay и Google Pay) и плащане в брой. Плащате при вземането на любимеца, без предплащане."}, {"keys": ["отказ", "откаж", "отмен", "премест", "закъсн", "промен"], "answer": "Няма проблем, просто ни пишете или се обадете поне 24 часа предварително и ще го преместим или отменим."}, {"keys": ["английск", "говорите", "език"], "answer": "Да, екипът говори български и английски."}];
