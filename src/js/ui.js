const classListElement = document.querySelector("#classList");
const statusMessageElement = document.querySelector("#statusMessage");

function hideStatusMessage() {
  statusMessageElement.classList.add("status-message--hidden");
}

function showStatusMessage(message) {
  statusMessageElement.textContent = message;
  statusMessageElement.classList.remove("status-message--hidden");
}

function clearClassList() {
  classListElement.innerHTML = "";
}

function renderClassCard(slot) {
  const isAvailable = isBookingAvailable(slot);
  const statusClass = isAvailable
    ? "class-card__status"
    : "class-card__status class-card__status--full";

  return `
    <article class="class-card">
      <div class="class-card__media">
        <img class="class-card__image" src="${slot.image}" alt="${slot.title}" />
        <span class="${statusClass}">${getStatusText(slot)}</span>
      </div>

      <div class="class-card__body">
        <h3 class="class-card__title">${slot.title}</h3>

        <p class="class-card__description">${slot.description}</p>

        <ul class="class-card__info">
          <li><span class="class-card__meta-label">Шеф:</span> ${slot.chefName}</li>
          <li><span class="class-card__meta-label">Дата:</span> ${formatDateTime(slot.startAt)}</li>
          <li><span class="class-card__meta-label">Длительность:</span> ${slot.durationMinutes} мин.</li>
          <li><span class="class-card__meta-label">Цена:</span> ${formatPrice(slot.price, slot.currency)}</li>
        </ul>

        <button
          class="class-card__button"
          type="button"
          data-slot-id="${slot.id}"
          ${isAvailable ? "" : "disabled"}
        >
          ${isAvailable ? "Подробнее" : "Запись недоступна"}
        </button>
      </div>
    </article>
  `;
}

function renderClassList(slots) {
  if (slots.length === 0) {
    showStatusMessage("Пока нет доступных кулинарных классов.");
    clearClassList();
    return;
  }

  hideStatusMessage();
  classListElement.innerHTML = slots.map(renderClassCard).join("");
}