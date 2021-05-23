import React from 'react';
import { getSession } from 'next-auth/client';

import MyBookings from '../../components/booking/MyBookings';
import Layout from '../../components/layout/Layout';
import { myBookings } from '../../redux/actions/bookingActions';

import { wrapper } from '../../redux/store';

const MyBookingsPage = () => {
  return (
    <Layout title="My Bookings">
      <MyBookings />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    const session = await getSession({ req });

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    // we're server side right now and we need to pass in our client cookie to our
    // auth middleware. Otherwise we won't be able to access req.user in myBookings
    // in bookingControllers. In auth middleware, getSession({req}) will grab the session
    // based on info from headers.cookie

    await store.dispatch(myBookings(req.headers.cookie, req));

    return {
      props: {},
    };
  },
);

export default MyBookingsPage;
