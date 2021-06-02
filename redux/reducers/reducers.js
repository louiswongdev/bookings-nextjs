import { combineReducers } from 'redux';

import {
  allRoomsReducer,
  roomDetailsReducer,
  newRoomReducer,
  newReviewReducer,
  checkReviewReducer,
  roomReducer,
} from './roomReducers';

import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
  bookingReducer,
} from './bookingReducers';

import {
  authReducer,
  loadedUserReducer,
  userReducer,
  forgotPasswordReducer,
} from './userReducer';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  newRoom: newRoomReducer,
  roomDetails: roomDetailsReducer,
  room: roomReducer,
  auth: authReducer,
  user: userReducer,
  loadedUser: loadedUserReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
});

export default reducer;
