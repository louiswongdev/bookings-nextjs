import nc from 'next-connect';

import dbConnect from '../../../backend/config/dbConnect';
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from '../../../backend/controllers/roomControllers';

import onError from '../../../backend/middlewares/errors';

import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../backend/middlewares/auth';

const handler = nc({ onError });

dbConnect();

// get single room
handler.get(getSingleRoom);

// update room details
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateRoom);

// delete room
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteRoom);

export default handler;
