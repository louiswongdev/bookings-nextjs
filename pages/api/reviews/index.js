import nc from 'next-connect';

import dbConnect from '../../../backend/config/dbConnect';
import {
  createRoomReview,
  getRoomReviews,
  deleteReview,
} from '../../../backend/controllers/roomControllers';
import { isAuthenticatedUser } from '../../../backend/middlewares/auth';

import onError from '../../../backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

// use our auth middle where in nc with .use() to check for user session
handler.use(isAuthenticatedUser).put(createRoomReview);

handler.use(isAuthenticatedUser).get(getRoomReviews);

handler.use(isAuthenticatedUser).delete(deleteReview);

export default handler;
