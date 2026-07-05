async function initClassList() {
  try {
    showStatusMessage("Загружаем расписание...");

    const slots = await api.getClassSlots();

    renderClassList(slots);
  } catch (error) {
    showStatusMessage("Не удалось загрузить расписание. Попробуйте позже.");
    clearClassList();
  }
}

async function openClassDetails(slotId) {
  try {
    showStatusMessage("Загружаем карточку класса...");

    const slot = await api.getClassSlotById(slotId);

    renderClassDetails(slot);
  } catch (error) {
    showStatusMessage(error.message || "Не удалось открыть карточку класса.");
  }
}

async function openBookingForm(slotId) {
  try {
    showStatusMessage("Загружаем форму записи...");

    const slot = await api.getClassSlotById(slotId);

    renderBookingForm(slot);
  } catch (error) {
    showStatusMessage(error.message || "Не удалось открыть форму записи.");
  }
}

function getBookingPayload(form) {
  const formData = new FormData(form);

  return {
    slotId: form.dataset.slotId,
    clientName: formData.get("clientName").trim(),
    clientPhone: formData.get("clientPhone").trim(),
    clientEmail: formData.get("clientEmail").trim(),
    participantsCount: Number(formData.get("participantsCount")),
    allergyComment: formData.get("allergyComment").trim(),
    equipmentType: formData.get("equipmentType"),
    comment: formData.get("comment").trim()
  };
}

function getPhoneDigits(phone) {
  return phone.replace(/\D/g, "");
}

function isValidPhone(phone) {
  const digits = getPhoneDigits(phone);

  if (digits.length === 10) {
    return true;
  }

  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return true;
  }

  return false;
}

function formatPhone(phone) {
  let digits = getPhoneDigits(phone);

  if (digits.length === 10) {
    digits = `7${digits}`;
  }

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
}

function validateBookingPayload(payload) {
  if (!payload.clientName) {
    return "Укажите имя.";
  }

  if (!payload.clientPhone) {
    return "Укажите телефон.";
  }

  if (!isValidPhone(payload.clientPhone)) {
    return "Введите телефон полностью, например +7 900 000-00-00.";
  }

  if (!payload.participantsCount || payload.participantsCount < 1) {
    return "Количество участников должно быть не меньше 1.";
  }

  return "";
}

async function handleBookingSubmit(event) {
  const form = event.target.closest("[data-booking-form]");

  if (!form) {
    return;
  }

  event.preventDefault();

  const payload = getBookingPayload(form);
  const validationError = validateBookingPayload(payload);

  if (validationError) {
    showBookingFormError(validationError);
    return;
  }

  try {
    payload.clientPhone = formatPhone(payload.clientPhone);

    const booking = await api.createBooking(payload);
    const slot = await api.getClassSlotById(payload.slotId);

    renderBookingSuccess(booking, slot);
  } catch (error) {
    showBookingFormError(error.message || "Не удалось оформить запись.");
  }
}

function handleClassListClick(event) {
  const button = event.target.closest("[data-action='show-details']");

  if (!button) {
    return;
  }

  const slotId = button.dataset.slotId;

  openClassDetails(slotId);
}

function handleClassDetailsClick(event) {
  const backButton = event.target.closest("[data-action='back-to-list']");

  if (backButton) {
      showClassListView();
      return;
    }

  const bookingButton = event.target.closest("[data-action='open-booking-form']");

  if (bookingButton) {
    openBookingForm(bookingButton.dataset.slotId);
  }
}

function handleBookingViewClick(event) {
  const backToDetailsButton = event.target.closest("[data-action='back-to-details']");

  if (backToDetailsButton) {
    openClassDetails(backToDetailsButton.dataset.slotId);
    return;
  }

  const backToListButton = event.target.closest("[data-action='back-to-list-after-booking']");

  if (backToListButton) {
    initClassList();
    showClassListView();
  }
}

classListElement.addEventListener("click", handleClassListClick);
classDetailsElement.addEventListener("click", handleClassDetailsClick);
bookingViewElement.addEventListener("click", handleBookingViewClick);
bookingViewElement.addEventListener("submit", handleBookingSubmit);

initClassList();