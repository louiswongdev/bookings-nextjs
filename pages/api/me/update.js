import nc from 'next-connect';

import dbConnect from '../../../backend/config/dbConnect';
import { updateProfile } from '../../../backend/controllers/authControllers';
import { isAuthenticatedUser } from '../../../backend/middlewares/auth';

import onError from '../../../backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updateProfile);

export default handler;
