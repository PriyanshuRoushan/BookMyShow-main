export const validateBooking = async (req, res, next) => {
  // Seat availability is checked and changed atomically in the booking transaction.
  next();
};
