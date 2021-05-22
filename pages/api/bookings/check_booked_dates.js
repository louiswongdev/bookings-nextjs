import nc from 'next-connect';

import dbConnect from '../../../backend/config/dbConnect';
import { checkBookedDatesOfRoom } from '../../../backend/controllers/bookingControllers';

import onError from '../../../backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.get(checkBookedDatesOfRoom);

export default handler;
