const classListElement = document.querySelector("#classList");
const classDetailsElement = document.querySelector("#classDetails");
const bookingViewElement = document.querySelector("#bookingView");
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
  bookingViewElement.classList.add("booking-view--hidden");
  bookingViewElement.innerHTML = "";
  classListElement.classList.remove("class-list--hidden");
  hideStatusMessage();
}

function showClassDetailsView() {
  classListElement.classList.add("class-list--hidden");

  bookingViewElement.classList.add("booking-view--hidden");
  bookingViewElement.innerHTML = "";

  classDetailsElement.classList.remove("class-details--hidden");
  hideStatusMessage();
}

function showBookingView() {
  classListElement.classList.add("class-list--hidden");
  classDetailsElement.classList.add("class-details--hidden");

  bookingViewElement.classList.remove("booking-view--hidden");
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
        <button
          class="detail-card__booking-button"
          type="button"
          data-action="open-booking-form"
          data-slot-id="${slot.id}"
          ${isAvailable ? "" : "disabled"}
        >
          ${isAvailable ? "Записаться" : "Запись недоступна"}
        </button>
      </div>
    </article>
  `;

  showClassDetailsView();
}

function renderBookingForm(slot) {
  bookingViewElement.innerHTML = `
    <article class="booking-card">
      <button class="booking-card__back" type="button" data-action="back-to-details" data-slot-id="${slot.id}">
        ← Назад к карточке
      </button>

      <div class="booking-card__header">
        <h2 class="booking-card__title">Запись на класс</h2>
        <p class="booking-card__subtitle">${slot.title}</p>
      </div>

      <form class="booking-form" data-booking-form data-slot-id="${slot.id}">
        <div class="form-field">
          <label for="clientName">Имя *</label>
          <input id="clientName" name="clientName" type="text" placeholder="Анна" required />
        </div>

        <div class="form-field">
          <label for="clientPhone">Телефон *</label>
          <input id="clientPhone" name="clientPhone" type="tel" autocomplete="tel" placeholder="+7 900 000-00-00" required />
        </div>

        <div class="form-field">
          <label for="clientEmail">Email</label>
          <input id="clientEmail" name="clientEmail" type="email" placeholder="anna@example.com" />
        </div>

        <div class="form-field">
          <label for="participantsCount">Количество участников *</label>
          <input
            id="participantsCount"
            name="participantsCount"
            type="number"
            min="1"
            max="${slot.freePlaces}"
            value="1"
            required
          />
        </div>

        <div class="form-field">
          <label for="allergyComment">Аллергии или пищевые ограничения</label>
          <textarea
            id="allergyComment"
            name="allergyComment"
            rows="3"
            placeholder="Например: аллергия на орехи"
          ></textarea>
        </div>

        <fieldset class="form-fieldset">
          <legend>Фартук и ножи</legend>

          <label class="radio-card">
            <input type="radio" name="equipmentType" value="own" checked />
            <span>Приду со своим фартуком и набором ножей</span>
          </label>

          <label class="radio-card">
            <input type="radio" name="equipmentType" value="studio" />
            <span>Нужен комплект студии</span>
          </label>

          <p class="booking-card__hint">
            Доступно комплектов студии: ${slot.freeEquipmentSets}.
          </p>
        </fieldset>

        <div class="form-field">
          <label for="comment">Комментарий</label>
          <textarea
            id="comment"
            name="comment"
            rows="3"
            placeholder="Дополнительные пожелания"
          ></textarea>
        </div>

        <p id="bookingFormError" class="booking-form__error booking-form__error--hidden"></p>

        <button class="booking-form__submit" type="submit">
          Подтвердить запись
        </button>
      </form>
    </article>
  `;

  showBookingView();
}

function showBookingFormError(message) {
  const errorElement = document.querySelector("#bookingFormError");

  if (!errorElement) {
    return;
  }

  errorElement.textContent = message;
  errorElement.classList.remove("booking-form__error--hidden");
}

function renderBookingSuccess(booking, slot) {
  bookingViewElement.innerHTML = `
    <article class="booking-card booking-card--success">
      <div class="booking-success">
        <div class="booking-success__icon">✓</div>

        <h2 class="booking-success__title">Вы записаны!</h2>

        <p class="booking-success__text">
          Запись на класс «${slot.title}» успешно создана.
        </p>

        <ul class="booking-success__info">
          <li><span>Имя:</span> ${booking.clientName}</li>
          <li><span>Телефон:</span> ${booking.clientPhone}</li>
          <li><span>Участников:</span> ${booking.participantsCount}</li>
          <li><span>Стоимость занятия:</span> ${formatPrice(booking.classPrice, booking.currency)}</li>
           ${
             booking.equipmentPrice > 0
               ? `<li><span>Комплект студии:</span> ${formatPrice(booking.equipmentPrice, booking.currency)}</li>`
               : ""
           }
           <li class="booking-success__total">
             <span>Итого:</span> ${formatPrice(booking.totalPrice, booking.currency)}
           </li>
          <li><span>Статус:</span> подтверждена</li>
        </ul>

        <button class="booking-form__submit" type="button" data-action="back-to-list-after-booking">
          Вернуться к списку
        </button>
      </div>
    </article>
  `;

  showBookingView();
}