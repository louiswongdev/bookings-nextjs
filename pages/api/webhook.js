import nc from 'next-connect';

import dbConnect from '../../backend/config/dbConnect';
import { webhookCheckout } from '../../backend/controllers/paymentControllers';

import onError from '../../backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

// disable the default bodyParse since we're using raw-body
export const config = {
  api: {
    bodyParser: false,
  },
};

// use our auth middle where in nc with .use() to check for user session
handler.post(webhookCheckout);

export default handler;
