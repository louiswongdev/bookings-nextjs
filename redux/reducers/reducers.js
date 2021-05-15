import { combineReducers } from 'redux';

import {
  allRoomsReducer,
  roomDetailsReducer,
} from '../reducers/roomReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
});

export default reducer;
