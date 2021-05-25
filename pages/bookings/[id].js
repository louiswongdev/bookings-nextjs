import React from 'react';
import { getSession } from 'next-auth/client';

import BookingDetails from '../../components/booking/BookingDetails';
import Layout from '../../components/layout/Layout';
import { getBookingDetails } from '../../redux/actions/bookingActions';

import { wrapper } from '../../redux/store';

const MyBookingsPage = () => {
  return (
    <Layout title="Booking Details">
      <BookingDetails />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ params, req, store }) => {
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

    await store.dispatch(
      getBookingDetails(req.headers.cookie, req, params.id),
    );

    return {
      props: {},
    };
  },
);

export default MyBookingsPage;
