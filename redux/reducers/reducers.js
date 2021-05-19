import { combineReducers } from 'redux';

import {
  allRoomsReducer,
  roomDetailsReducer,
} from '../reducers/roomReducers';

import { authReducer } from '../reducers/userReducer';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
});

export default reducer;
