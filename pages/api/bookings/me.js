import nc from 'next-connect';

import dbConnect from '../../../backend/config/dbConnect';
import { myBookings } from '../../../backend/controllers/bookingControllers';
import { isAuthenticatedUser } from '../../../backend/middlewares/auth';

import onError from '../../../backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(myBookings);
// handler.get(myBookings);

export default handler;
