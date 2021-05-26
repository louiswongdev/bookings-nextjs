import { combineReducers } from 'redux';

import {
  allRoomsReducer,
  roomDetailsReducer,
  newReviewReducer,
} from './roomReducers';

import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
} from './bookingReducers';

import {
  authReducer,
  loadedUserReducer,
  userReducer,
  forgotPasswordReducer,
} from './userReducer';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  loadedUser: loadedUserReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
});

export default reducer;
