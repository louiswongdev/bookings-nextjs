import nc from 'next-connect';

import dbConnect from '../../../../backend/config/dbConnect';
import { resetPassword } from '../../../../backend/controllers/authControllers';

import onError from '../../../../backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.put(resetPassword);

export default handler;
