import nc from 'next-connect';

import dbConnect from '../../../../backend/config/dbConnect';
import {
  getUserDetails,
  updateUserDetails,
} from '../../../../backend/controllers/authControllers';
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
  .get(getUserDetails);

handler
  .use(isAuthenticatedUser, authorizeRoles('admin'))
  .put(updateUserDetails);

export default handler;
