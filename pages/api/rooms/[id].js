import nc from 'next-connect';

import dbConnect from '../../../backend/config/dbConnect';
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from '../../../backend/controllers/roomControllers';

import onError from '../../../backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

// get single room
handler.get(getSingleRoom);

// update room details
handler.put(updateRoom);

// delete room
handler.delete(deleteRoom);

export default handler;
