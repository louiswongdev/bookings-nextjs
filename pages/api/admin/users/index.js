import nc from 'next-connect';

import dbConnect from '../../../../backend/config/dbConnect';
import { allAdminUsers } from '../../../../backend/controllers/authControllers';
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
  .get(allAdminUsers);

export default handler;
