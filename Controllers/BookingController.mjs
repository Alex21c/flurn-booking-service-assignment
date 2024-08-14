import CustomError from "../Utils/CustomError.mjs";
import SeatsModel from "../Models/SeatsModel.mjs";

async function computeSeatPricing(seat_identifier) {
  // Note: The pricing should be returned based on the bookings previously made for
  // that seat class.
  // ● Less than 40% of seats booked - use the min_price, if min_price is not
  // available, use normal_price
  // ● 40% - 60% of seats booked - use the normal_price, if normal_price not
  // available, use max_price
  // ● More than 60% of seats booked - use the max_price, if max_price is not
  // available, use normal_price

  // fetch seat fro db
  const seat = await SeatsModel.findOne({ seat_identifier });
  // what is the seat class?
  const seatClass = seat?.seat_class;

  // how many total seats are there for current seat class?
  const totalSeatsMatchingCurrentClass = await SeatsModel.countDocuments({
    seat_class: "F",
  });
  // how many seats have been booked for current seat class?
  const totalSeats = await SeatsModel.countDocuments();

  console.log(seatClass, totalSeatsMatchingCurrentClass, totalSeats);
}

const createANewBooking = async (req, res, next) => {
  try {
    // append current user id
    req.body.bookedByUserId = req?.user?._id;

    req.body.totalAmountForTheBooking = 0;

    // just find seat pricing for any given seat
    computeSeatPricing(req.body.bookedSeatsIds.at(0));

    res.json({
      data: req.body,
    });
  } catch (error) {
    next(
      new CustomError(
        500,
        "failed to uploadDefaultDataIntoDbFromCsvFile: " + error.message
      )
    );
  }
};

const BookingController = { createANewBooking };
export default BookingController;
