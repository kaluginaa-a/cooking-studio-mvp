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
  },

  createBooking(payload) {
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         const slot = mockClassSlots.find((item) => item.id === payload.slotId);

         if (!slot) {
           reject({
             code: "CLASS_NOT_FOUND",
             message: "Кулинарный класс не найден."
           });
           return;
         }

         if (slot.status !== "scheduled" || slot.freePlaces <= 0) {
           reject({
             code: "NO_FREE_PLACES",
             message: "На этот класс больше нет свободных мест."
           });
           return;
         }

         if (payload.participantsCount > slot.freePlaces) {
           reject({
             code: "NO_FREE_PLACES",
             message: "Недостаточно свободных мест для выбранного количества участников."
           });
           return;
         }

         if (
           payload.equipmentType === "studio" &&
           slot.freeEquipmentSets < payload.participantsCount
         ) {
           reject({
             code: "EQUIPMENT_NOT_AVAILABLE",
             message: "Недостаточно комплектов студии для выбранного количества участников."
           });
           return;
         }

         const classPrice = slot.price * payload.participantsCount;

         const equipmentPrice =
           payload.equipmentType === "studio"
             ? slot.equipmentRentalPrice * payload.participantsCount
             : 0;

         const totalPrice = classPrice + equipmentPrice;

         const booking = {
           id: `booking_${Date.now()}`,
           ...payload,
           classPrice,
           equipmentPrice,
           totalPrice,
           currency: slot.currency,
           status: "confirmed",
           createdAt: new Date().toISOString()
         };

         mockBookings.push(booking);

         slot.freePlaces -= payload.participantsCount;

         if (payload.equipmentType === "studio") {
           slot.freeEquipmentSets -= payload.participantsCount;
         }

         if (slot.freePlaces === 0) {
           slot.status = "full";
         }

         resolve(booking);
       }, 500);
     });
  }
};