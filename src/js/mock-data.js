// Тестовые данные имитируют ответ существующего бэкенда.
const mockClassSlots = [
  {
    id: "slot_001",
    title: "Итальянская кухня для новичков",
    description: "Готовим домашнюю пасту, томатный соус и тирамису.",
    fullDescription:
      "На занятии участники познакомятся с основами итальянской кухни, приготовят свежую пасту, классический томатный соус и нежный десерт.",
    menu: ["Домашняя паста", "Томатный соус", "Тирамису"],
    chefName: "Мария Соколова",
    chefDescription: "Шеф итальянской кухни, 8 лет опыта в ресторанах и кулинарных школах.",
    startAt: "2026-07-12T18:00:00",
    durationMinutes: 180,
    price: 3500,
    currency: "RUB",
    freePlaces: 5,
    totalPlaces: 12,
    freeEquipmentSets: 5,
    equipmentRentalPrice: 300,
    address: "Кулинарная студия «Шеф-стол», зал 1",
    status: "scheduled",
    image: "./images/italian.jpg"
  },
  {
    id: "slot_002",
    title: "Грузинский ужин",
    description: "Хачапури, хинкали и соусы под руководством шефа.",
    fullDescription:
      "Участники приготовят несколько популярных блюд грузинской кухни и узнают, как работать с тестом, начинками и специями.",
    menu: ["Хачапури", "Хинкали", "Аджика", "Соус сацебели"],
    chefName: "Георгий Меладзе",
    chefDescription: "Шеф грузинской кухни, специализируется на семейных рецептах и блюдах из теста.",
    startAt: "2026-07-14T17:30:00",
    durationMinutes: 210,
    price: 4200,
    currency: "RUB",
    freePlaces: 0,
    totalPlaces: 10,
    freeEquipmentSets: 0,
    equipmentRentalPrice: 300,
    address: "Кулинарная студия «Шеф-стол», зал 2",
    status: "full",
    image: "./images/georgian.jpg"
  },
  {
    id: "slot_003",
    title: "Французские десерты",
    description: "Эклеры, заварной крем и основы работы с тестом.",
    fullDescription:
      "Занятие для тех, кто хочет разобраться в базовых техниках французской кондитерской школы и приготовить десерты своими руками.",
    menu: ["Эклеры", "Заварной крем", "Шоколадная глазурь"],
    chefName: "Анна Морель",
    chefDescription: "Кондитер, ведёт мастер-классы по десертам и работе с заварным тестом.",
    startAt: "2026-07-16T19:00:00",
    durationMinutes: 150,
    price: 3900,
    currency: "RUB",
    freePlaces: 3,
    totalPlaces: 8,
    freeEquipmentSets: 3,
    equipmentRentalPrice: 250,
    address: "Кулинарная студия «Шеф-стол», зал 1",
    status: "scheduled",
    image: "./images/desserts.jpg"
  }
];

// Здесь будут храниться записи, созданные через mock API.
const mockBookings = [];