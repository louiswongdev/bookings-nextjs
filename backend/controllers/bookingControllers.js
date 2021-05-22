import Booking from '../models/booking';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';

// create new booking  =>  /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
});

// check room availability  =>  /api/bookings/check
const checkRoomBookingAvailability = catchAsyncErrors(async (req, res) => {
  let {
    roomId,
    checkInDate: proposedCheckInDate,
    checkOutDate: proposedCheckoutDate,
  } = req.query;

  // console.log(roomId, checkInDate: proposedCheckInDate, checkOutDate);

  proposedCheckInDate = new Date(proposedCheckInDate);
  proposedCheckoutDate = new Date(proposedCheckoutDate);

  console.log(proposedCheckInDate, proposedCheckoutDate);

  const booking = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          // checkInDate in db
          $lte: proposedCheckoutDate, // user selected checkOutDate
        },
      },
      {
        checkOutDate: {
          $gte: proposedCheckInDate,
        },
      },
    ],
  });

  console.log(booking);

  let isAvailable;

  booking && booking.length === 0
    ? (isAvailable = true)
    : (isAvailable = false);

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

export {
  newBooking,
  checkRoomBookingAvailability,
  // checkBookedDatesOfRoom,
  // myBookings,
  // getBookingDetails,
  // allAdminBookings,
  // deleteBooking
};
