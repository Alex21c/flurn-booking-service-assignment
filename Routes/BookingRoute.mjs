import BookingController from "../Controllers/BookingController.mjs";
import e from "express";
import passport from "../Passport/passport-config.mjs";
import BookingInputDataValidationMiddleware from "../Middlewares/BookingInputDataValidationMiddleware.mjs";

const BookingRoute = e.Router();
BookingRoute.post(
  "/createANewBooking",
  passport.authenticate("jwt", { session: false }),
  BookingInputDataValidationMiddleware,
  BookingController.createANewBooking
);
export default BookingRoute;
