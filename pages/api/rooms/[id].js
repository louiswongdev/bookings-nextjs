import nc from 'next-connect';

import dbConnect from '../../../backend/config/dbConnect';
import {
  getSingleRoom,
  updateRoom,
} from '../../../backend/controllers/roomControllers';

const handler = nc();

dbConnect();

// get single room
handler.get(getSingleRoom);

// update room details
handler.put(updateRoom);

export default handler;
