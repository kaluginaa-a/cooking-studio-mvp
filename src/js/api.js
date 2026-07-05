// Mock API имитирует асинхронные запросы к существующему бэкенду.
const api = {
  getClassSlots() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockClassSlots);
      }, 400);
    });
  },

 getClassSlotById(slotId) {
   return new Promise((resolve, reject) => {
     setTimeout(() => {
       const slot = mockClassSlots.find((item) => item.id === slotId);

       if (!slot) {
         reject({
           code: "CLASS_NOT_FOUND",
           message: "Кулинарный класс не найден."
         });
         return;
       }

       resolve(slot);
     }, 300);
   });
 }
};