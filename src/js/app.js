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

function handleClassListClick(event) {
  const button = event.target.closest("[data-action='show-details']");

  if (!button) {
    return;
  }

  const slotId = button.dataset.slotId;

  openClassDetails(slotId);
}

function handleClassDetailsClick(event) {
  const button = event.target.closest("[data-action='back-to-list']");

  if (!button) {
    return;
  }

  showClassListView();
}

classListElement.addEventListener("click", handleClassListClick);
classDetailsElement.addEventListener("click", handleClassDetailsClick);

initClassList();