import nc from 'next-connect';

import dbConnect from '../../../backend/config/dbConnect';
import { newBooking } from '../../../backend/controllers/bookingControllers';
import { isAuthenticatedUser } from '../../../backend/middlewares/auth';

import onError from '../../../backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(newBooking);

export default handler;
