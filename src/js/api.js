// Mock API имитирует асинхронные запросы к существующему бэкенду.
const api = {
  getClassSlots() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockClassSlots);
      }, 400);
    });
  }
};