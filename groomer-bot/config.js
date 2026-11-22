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
    "answer": "Нашите цени:\n• Къпане и разресване, малко куче – €25\n• Пълен грууминг, малко куче – €35\n• Пълен грууминг, средно куче – €45\n• Пълен грууминг, голямо куче – €60\n• Подрязване на нокти – €8\n(Примерни цени за демото.)"
   },
   {
    "keys": [
     "котк",
     "коте"
    ],
    "answer": "Да, правим грууминг и на котки, в тиха стая далеч от кучетата. Къпане и разресване на котка е от €30."
   },
   {
    "keys": [
     "колко време",
     "продължи",
     "взема",
     "вземе"
    ],
    "answer": "Пълният грууминг обикновено отнема 1,5 до 2,5 часа според размера и козината. Ще ви пишем, когато любимецът ви е готов."
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
      "Пълен грууминг",
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
     "ask": "Изберете час за оставяне:"
    },
    {
     "key": "name",
     "ask": "И вашето име и името на любимеца?"
    }
   ],
   "confirm": "Записахме ви! ✅ {service} ({pet}) за {name}, {day} в {time}. До скоро!\n(Само демо. В истинската версия часът влиза директно в календара на салона.)"
  },
  "fallback": "Добър въпрос! Ще го предам на екипа. Можете да ни се обадите и на +359 00 000 000 (демо номер)."
 }
};
