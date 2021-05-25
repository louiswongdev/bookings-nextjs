import { combineReducers } from 'redux';

import { allRoomsReducer, roomDetailsReducer } from './roomReducers';

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
});

export default reducer;
