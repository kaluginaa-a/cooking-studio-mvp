function formatDateTime(value) {
  const date = new Date(value);

  return date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatPrice(price, currency) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(price);
}

function getStatusText(slot) {
  if (slot.status === "full" || slot.freePlaces === 0) {
    return "Мест нет";
  }

  const places = slot.freePlaces;

  if (places % 10 === 1 && places % 100 !== 11) {
    return `${places} место`;
  }

  if (
    places % 10 >= 2 &&
    places % 10 <= 4 &&
    (places % 100 < 12 || places % 100 > 14)
  ) {
    return `${places} места`;
  }

  return `${places} мест`;
}

function isBookingAvailable(slot) {
  return slot.status === "scheduled" && slot.freePlaces > 0;
}