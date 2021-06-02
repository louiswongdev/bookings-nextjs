import Moment from 'moment';
import { extendMoment } from 'moment-range';

import Booking from '../models/booking';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';

const moment = extendMoment(Moment);

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

  let isAvailable;

  booking && booking.length === 0
    ? (isAvailable = true)
    : (isAvailable = false);

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

// check booked dates of a room  =>  /api/bookings/check_booked_dates
const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  // get the time difference in hours between my time zone and UTC
  // this will eliminate issues of issues with check-in days showing +1 if
  // close to midnight
  const timeDifference = moment().utcOffset() / 60;

  bookings.forEach(booking => {
    const checkInDate = moment(booking.checkInDate).add(
      timeDifference,
      'hours',
    );
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDifference,
      'hours',
    );

    const range = moment.range(moment(checkInDate), moment(checkOutDate));

    const dates = Array.from(range.by('day'));

    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

// get all bookings of current user  =>  /api/bookings/me
const myBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

// get booking details  =>  /api/bookings/:id
const getBookingDetails = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.findById(req.query.id)
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

// get all bookings - ADMIN  =>  /api/admin/bookings/
const allAdminBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find()
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

// delete booking bookings - ADMIN  =>  /api/admin/bookings/id
const deleteBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = await Booking.findById(req.query.id);

  if (!booking) {
    return next(new ErrorHandler('Booking not found with this ID', 404));
  }

  await booking.remove();

  res.status(200).json({
    success: true,
  });
});

export {
  newBooking,
  checkRoomBookingAvailability,
  checkBookedDatesOfRoom,
  myBookings,
  getBookingDetails,
  allAdminBookings,
  deleteBooking,
};
