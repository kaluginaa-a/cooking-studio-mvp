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

initClassList();