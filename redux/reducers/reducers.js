import { combineReducers } from 'redux';

import {
  allRoomsReducer,
  roomDetailsReducer,
} from '../reducers/roomReducers';

import {
  authReducer,
  loadedUserReducer,
  userReducer,
  forgotPasswordReducer,
} from '../reducers/userReducer';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  loadedUser: loadedUserReducer,
  forgotPassword: forgotPasswordReducer,
});

export default reducer;
