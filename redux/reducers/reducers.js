import { combineReducers } from 'redux';

import {
  allRoomsReducer,
  roomDetailsReducer,
} from '../reducers/roomReducers';

import { authReducer, userReducer } from '../reducers/userReducer';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
});

export default reducer;
