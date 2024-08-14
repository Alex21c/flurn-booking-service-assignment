import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  bookedSeatsIds: [{ type: Number, required: true }],
  bookedByUserId: { type: mongoose.Types.ObjectId, ref: "users" },
  totalAmountForTheBooking: { type: Number, required: true },
  currencySymbol: { type: Number, required: true, default: "₹" },
});

const BookingModel = mongoose.model("bookings", bookingSchema);
export default BookingModel;
