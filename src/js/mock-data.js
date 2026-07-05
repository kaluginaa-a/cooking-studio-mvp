// Тестовые данные имитируют ответ существующего бэкенда.
const mockClassSlots = [
  {
    id: "slot_001",
    title: "Итальянская кухня для новичков",
    description: "Готовим домашнюю пасту, томатный соус и тирамису.",
    chefName: "Мария Соколова",
    startAt: "2026-07-12T18:00:00",
    durationMinutes: 180,
    price: 3500,
    currency: "RUB",
    freePlaces: 5,
    totalPlaces: 12,
    status: "scheduled",
    image: "./images/italian.jpg"
  },
  {
    id: "slot_002",
    title: "Грузинский ужин",
    description: "Хачапури, хинкали и соусы под руководством шефа.",
    chefName: "Георгий Меладзе",
    startAt: "2026-07-14T17:30:00",
    durationMinutes: 210,
    price: 4200,
    currency: "RUB",
    freePlaces: 0,
    totalPlaces: 10,
    status: "full",
    image: "./images/georgian.jpg"
  },
  {
    id: "slot_003",
    title: "Французские десерты",
    description: "Эклеры, заварной крем и основы работы с тестом.",
    chefName: "Анна Морель",
    startAt: "2026-07-16T19:00:00",
    durationMinutes: 150,
    price: 3900,
    currency: "RUB",
    freePlaces: 3,
    totalPlaces: 8,
    status: "scheduled",
    image: "./images/desserts.jpg"
  }
];