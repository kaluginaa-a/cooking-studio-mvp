const classListElement = document.querySelector("#classList");
const classDetailsElement = document.querySelector("#classDetails");
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

function showClassListView() {
  classDetailsElement.classList.add("class-details--hidden");
  classDetailsElement.innerHTML = "";
  classListElement.classList.remove("class-list--hidden");
  hideStatusMessage();
}

function showClassDetailsView() {
  classListElement.classList.add("class-list--hidden");
  classDetailsElement.classList.remove("class-details--hidden");
  hideStatusMessage();
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
          data-action="show-details"
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

function renderClassDetails(slot) {
  const isAvailable = isBookingAvailable(slot);
  const statusClass = isAvailable
    ? "detail-card__status"
    : "detail-card__status detail-card__status--full";

  const menuItems = slot.menu
    .map((item) => `<li class="detail-card__menu-item">${item}</li>`)
    .join("");

  classDetailsElement.innerHTML = `
    <article class="detail-card">
      <button class="detail-card__back" type="button" data-action="back-to-list">
        ← Назад к списку
      </button>

      <div class="detail-card__media">
        <img class="detail-card__image" src="${slot.image}" alt="${slot.title}" />
        <span class="${statusClass}">${getStatusText(slot)}</span>
      </div>

      <div class="detail-card__body">
        <h2 class="detail-card__title">${slot.title}</h2>

        <p class="detail-card__description">
          ${slot.fullDescription}
        </p>

        <section class="detail-card__section">
          <h3 class="detail-card__section-title">Что будем готовить</h3>
          <ul class="detail-card__menu">
            ${menuItems}
          </ul>
        </section>

        <section class="detail-card__section">
          <h3 class="detail-card__section-title">Детали класса</h3>

          <ul class="detail-card__info">
            <li><span>Шеф:</span> ${slot.chefName}</li>
            <li><span>О шефе:</span> ${slot.chefDescription}</li>
            <li><span>Дата:</span> ${formatDateTime(slot.startAt)}</li>
            <li><span>Длительность:</span> ${slot.durationMinutes} мин.</li>
            <li><span>Адрес:</span> ${slot.address}</li>
            <li><span>Цена:</span> ${formatPrice(slot.price, slot.currency)}</li>
            <li><span>Свободно:</span> ${getStatusText(slot)}</li>
          </ul>
        </section>

        <section class="detail-card__section">
          <h3 class="detail-card__section-title">Фартук и ножи</h3>

          <p class="detail-card__note">
            Можно прийти со своим фартуком и набором ножей или выбрать комплект студии.
            Доступно комплектов: ${slot.freeEquipmentSets}.
            Стоимость комплекта: ${formatPrice(slot.equipmentRentalPrice, slot.currency)}.
          </p>
        </section>
      </div>
    </article>
  `;

  showClassDetailsView();
}