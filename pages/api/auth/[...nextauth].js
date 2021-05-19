import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import User from '../../../backend/models/user';
import dbConnect from '../../../backend/config/dbConnect';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        dbConnect();

        const { email, password } = credentials;

        // check if email and password were entered
        if (!email || !password) {
          throw new Error('Please enter email and password');
        }

        // find user in database
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          throw new Error('Invalid email or password');
        }

        // check if password is correct
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
          throw new Error('Invalid email or password');
        }

        // convert to JSON to get rid of mongoose object properties
        const newUser = { ...user.toJSON() };

        // remove password property from user obj before sending to JWT callback
        const noPassword = ({ password, ...rest }) => rest;
        const userWithoutPassword = noPassword(newUser);

        return Promise.resolve(userWithoutPassword);
      },
    }),
  ],

  // JWT callback is called whenever a jwt token is created
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    // token received in session is the token passed from jwt callback
    session: async (session, token) => {
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
});
