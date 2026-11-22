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
  "fallback": "Good question! I'll pass it on to the team. You can also call us on +359 00 000 000 (demo number)."
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
  "fallback": "Добър въпрос! Ще го предам на екипа. Можете да ни се обадите и на +359 00 000 000 (демо номер)."
 }
};
