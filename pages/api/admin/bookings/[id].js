import nc from 'next-connect';

import dbConnect from '../../../../backend/config/dbConnect';
import { deleteBooking } from '../../../../backend/controllers/bookingControllers';
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../backend/middlewares/auth';

import onError from '../../../../backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

// prettier-ignore
handler
  .use(isAuthenticatedUser, authorizeRoles('admin'))
  .delete(deleteBooking);

export default handler;
