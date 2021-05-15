import React from 'react';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
import Footer from './Footer';

const Layout = ({
  children,
  title = 'Book Best Hotels for your Holiday',
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <Header />
      <ToastContainer position="bottom-right" />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
