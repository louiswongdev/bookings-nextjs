import { combineReducers } from 'redux';

import { allRoomsReducer } from '../reducers/roomReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
});

export default reducer;
