import nc from 'next-connect';

import dbConnect from '../../../backend/config/dbConnect';
import {
  allRooms,
  newRoom,
} from '../../../backend/controllers/roomControllers';

import onError from '../../../backend/middlewares/errors';
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../backend/middlewares/auth';

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

handler.get(allRooms);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(newRoom);

export default handler;
